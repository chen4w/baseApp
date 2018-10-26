import {Crypto} from 'rclink'
import {IndexDBRest} from 'rclink'
import FlatPlainObj from 'flat-plain-object'
import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    DELETE_MANY,
} from 'react-admin/lib';

const log = (type, resource, params) => {
    console.log(`indexdbRest query:\n type: ${type}\n resource: ${resource}\n params: ${JSON.stringify(params)}`)
}

const schema = {
    users: "++id, &userName, &email",
    keypairs: "++id, createdAt, status, ownerID, &kp.sn, &cert.sn",
}

// Init For test
const initData = {};
/*
    keypairs: [
        {kp: {sn: '1316EC91876CDEE5', alg: {name: 'EC', param: 'secp256r1'}}, cert: {sn: '12345678'}, createdAt: new Date(), status: false, ownerID: 1},
        {kp: {sn: '2316EC91876CDEE5', alg: {name: 'EC', param: 'secp256r1'}}, cert: {sn: '22345678'}, createdAt: new Date(), status: true, ownerID: 1},
        {kp: {sn: '3316EC91876CDEE5', alg: {name: 'EC', param: 'secp256k1'}}, cert: {sn: '32345678'}, createdAt: new Date(), status: true, ownerID: 1},
        {kp: {sn: '4316EC91876CDEE5', alg: {name: 'RSA', param: '1024'}}, cert: {sn: '42345678'}, createdAt: new Date(), status: true, ownerID: 1},
        {kp: {sn: '5316EC91876CDEE5', alg: {name: 'RSA', param: '2048'}}, cert: {sn: '52345678'}, createdAt: new Date(), status: true, ownerID: 1},
        {kp: {sn: '6316EC91876CDEE5', alg: {name: 'EC', param: 'secp256k1'}}, cert: {sn: '62345678'}, createdAt: new Date(), status: true, ownerID: 1},
        {kp: {sn: '7316EC91876CDEE5', alg: {name: 'EC', param: 'secp256k1'}}, cert: {sn: '72345678'}, createdAt: new Date(), status: false, ownerID: 1},
        {kp: {sn: '8316EC91876CDEE5', alg: {name: 'EC', param: 'secp256k1'}}, cert: {sn: '82345678'}, createdAt: new Date(), status: true, ownerID: 1},
        {kp: {sn: '9316EC91876CDEE5', alg: {name: 'EC', param: 'secp256k1'}}, cert: {sn: '92345678'}, createdAt: new Date(), status: true, ownerID: 1},
        {kp: {sn: '1416EC91876CDEE5', alg: {name: 'EC', param: 'secp256k1'}}, cert: {sn: '13345678'}, createdAt: new Date(), status: true, ownerID: 1},
        {kp: {sn: '1516EC91876CDEE5', alg: {name: 'EC', param: 'secp256k1'}}, cert: {sn: '14345678'}, createdAt: new Date(), status: true, ownerID: 1},
        {kp: {sn: '1616EC91876CDEE5', alg: {name: 'EC', param: 'secp256k1'}}, cert: {sn: '15345678'}, createdAt: new Date(), status: true, ownerID: 1},
        {kp: {sn: '1716EC91876CDEE5', alg: {name: 'EC', param: 'secp256k1'}}, cert: {sn: '16345678'}, createdAt: new Date(), status: true, ownerID: 1},
    ]
}
*/

export default (type, resource, params) => {
    const indexdbRest = new IndexDBRest("BAR", 1, schema, initData) 
    log(type, resource, params)
    switch(type){
        case GET_LIST: 
            const {page, perPage} = params.pagination
            const s = [params.sort.field, params.sort.order]
            const r = [(page-1)*perPage, page*perPage - 1]  
            const f = FlatPlainObj(params.filter, '.') 
            const query = {
                filter: f,
                sort: s,
                range: r
            }

            return indexdbRest.getCollection(resource, query).then(r => {
                return {
                    data: r.result,
                    total: r.totalCount
                }
            })
        case GET_ONE:
            const gID = parseInt(params.id, 10)
            return indexdbRest.getOne(resource, gID).then(r => ({ data: r.result}))
        case CREATE:
            let d = params.data
            d.status = false
            d.createdAt = new Date()

            let prvKeyPEM;
            let pubKeyPEM;
            let certPEM;

            if(d.keypairImported){
                const pemInfo = d.keypairImported.src;
                const prvKeyRex = /-*BEGIN.*\s+PRIVATE.*\s+KEY-*\r\n[\w+=\/\r\n]*-*END.*\s+PRIVATE.*\s+KEY-*\r\n/i;
                const certRex = /-*BEGIN.*\s+CERTIFICATE-*\r\n[\w+=\/\r\n]*-*END.*\s+CERTIFICATE-*\r\n/i;
                prvKeyPEM = prvKeyRex.exec(pemInfo)[0];
                certPEM = certRex.exec(pemInfo)[0];
                const pubKeyObj = Crypto.ImportKey(certPEM);
                pubKeyPEM = Crypto.GetKeyPEM(pubKeyObj);

                d.kp = {alg: {name: pubKeyObj.type || 'RSA', param: pubKeyObj.curveName 
                    || ((pubKeyObj.n && pubKeyObj.n.t === 40) ? 1024 : 2048)}};
                d.kp.prvKeyPEM = prvKeyPEM;
                d.kp.pubKeyPEM = pubKeyPEM;
                d.kp.sn = Crypto.GetHashVal(Crypto.GetHashVal(pubKeyPEM), 'RIPEMD160').toString('hex')

                const cert = Crypto.ImportCertificate(certPEM);
                d.cert = {sn: parseInt(cert.getSerialNumberHex(), 16), sigAlg: cert.getSignatureAlgorithmField(),
                    distinguishName: cert.getSubjectString(), validityStart: new Date(cert.getNotBeforeUnixTimestamp() * 1000),
                    validityEnd: new Date(cert.getNotAfterUnixTimestamp() * 1000), certPEM: certPEM};
                
                delete d.keypairImported;
            }
            else{
                const keypair = Crypto.CreateKeypair(d.kp.alg.name, d.kp.alg.param)
                prvKeyPEM = Crypto.GetKeyPEM(keypair.prvKeyObj, d.kp.pwd1)
                //d.kp.pwd = Crypto.GetHashVal(d.kp.pwd1).toString('hex')
                delete d.kp.pwd1
                delete d.kp.pwd2
                pubKeyPEM = Crypto.GetKeyPEM(keypair.pubKeyObj)
                d.kp.prvKeyPEM = prvKeyPEM
                d.kp.pubKeyPEM = pubKeyPEM
                d.kp.sn = Crypto.GetHashVal(Crypto.GetHashVal(pubKeyPEM), 'RIPEMD160').toString('hex')

                // Todo: fix timestamp bug
                const startUnixTime = parseInt(d.cert.validityStart.getTime() / 1000)
                const endUnixTime = parseInt(d.cert.validityEnd.getTime() / 1000)
                certPEM = Crypto.CreateSelfSignedCertificate(d.cert.sn, d.cert.sigAlg, d.cert.distinguishName, 
                    startUnixTime, endUnixTime, keypair)
                d.cert.certPEM = certPEM
            }

            return indexdbRest.create(resource, d).then(r => ({data: r.result}))
        case UPDATE:
            const uID = parseInt(params.id, 10)
            let uData = params.data
            const pwdOld = uData.kp.pwdOld

            try {
                uData.kp.prvKeyPEM = Crypto.GetKeyPEM(Crypto.ImportKey(uData.kp.prvKeyPEM, pwdOld), uData.kp.pwd1) 
                delete uData.kp.pwdOld
                delete uData.kp.pwd1
                delete uData.kp.pwd2
            }
            catch(e){
                console.error(e)
                return new Promise((_, reject) => {
                    if(e === 'malformed plain PKCS8 private key(code:001)')
                        reject(new Error('您输入的旧密码错误'))
                    else
                        reject(new Error(e))
                }
                )
            }

            return indexdbRest.update(resource, uID, uData).then(r => ({data: r.result}))
        case DELETE:
            const dID = parseInt(params.id, 10)
            return indexdbRest.delete(resource, dID).then(r => ({data: r.result}))
        default:
            throw new Error(`Unsupported data provider request type ${type}`)
    }
}