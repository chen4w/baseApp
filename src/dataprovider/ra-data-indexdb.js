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
const initData = {
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

            const keypair = Crypto.CreateKeypair(d.kp.alg.name, d.kp.alg.param)
            const prvKeyPEM = Crypto.GetKeyPEM(keypair.prvKeyObj)
            const pubKeyPEM = Crypto.GetKeyPEM(keypair.pubKeyObj)
            d.kp.prvKeyHex = keypair.prvKeyObj.prvKeyHex
            d.kp.prvKeyPEM = prvKeyPEM
            d.kp.pubKeyHex = keypair.pubKeyObj.pubKeyHex
            d.kp.pubKeyPEM = pubKeyPEM
            d.kp.sn = Crypto.GetHashVal(Crypto.GetHashVal(pubKeyPEM), 'RIPEMD160').toString('hex')

            let startUnixTimeStr = d.cert.validityStart.getTime().toString()
            startUnixTimeStr = startUnixTimeStr.slice(0, -3)
            let endUnixTimeStr = d.cert.validityEnd.getTime().toString()
            endUnixTimeStr = endUnixTimeStr.slice(0, -3)

            const certPEM = Crypto.CreateSelfSignedCertificate(d.cert.sn, d.cert.sigAlg, d.cert.distinguishName, 
                startUnixTimeStr, endUnixTimeStr, keypair)
            d.cert.certPEM = certPEM

            return indexdbRest.create(resource, d).then(r => ({data: r.result}))
        case UPDATE:
            const uID = parseInt(params.id, 10)
            const uData = params.data
            return indexdbRest.update(resource, uID, uData).then(r => ({data: r.result}))
        case DELETE:
            const dID = parseInt(params.id, 10)
            let prevR
            return indexdbRest.delete(resource, dID).then(r => ({data: r.result}))
        default:
            throw new Error(`Unsupported data provider request type ${type}`)
    }
}