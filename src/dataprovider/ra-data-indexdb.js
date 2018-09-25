import {Crypto} from 'rclink'
import {IndexDBRest} from 'rclink'
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
    keypairs: "++id, &sn, alg, createdAt, status, ownerID",
    certificates: "++id, &sn, ownerID, &accountAddr, &keypairSN",
}

// Init For test
const initData = {
    keypairs: [
        {sn: '1316EC91876CDEE5', alg: {name: 'EC', param: 'secp256k1'}, createdAt: new Date(), status: true, ownerID: 1},
        {sn: '2316EC91876CDEE5', alg: {name: 'RSA', param: '1024'}, createdAt: new Date(), status: true, ownerID: 1},
        {sn: '3316EC91876CDEE5', alg: {name: 'RSA', param: '2048'}, createdAt: new Date(), status: true, ownerID: 1},
        {sn: '4316EC91876CDEE5', alg: {name: 'EC', param: 'secp256k1'}, createdAt: new Date(), status: true, ownerID: 1},
        {sn: '5316EC91876CDEE5', alg: {name: 'EC', param: 'secp256r1'}, createdAt: new Date(), status: true, ownerID: 1},
        {sn: '6316EC91876CDEE5', alg: {name: 'EC', param: 'secp256r1'}, createdAt: new Date(), status: true, ownerID: 1},
        {sn: '7316EC91876CDEE5', alg: {name: 'EC', param: 'secp256r1'}, createdAt: new Date(), status: true, ownerID: 1},
        {sn: '8316EC91876CDEE5', alg: {name: 'EC', param: 'secp256k1'}, createdAt: new Date(), status: true, ownerID: 1},
        {sn: '9316EC91876CDEE5', alg: {name: 'EC', param: 'secp256k1'}, createdAt: new Date(), status: true, ownerID: 1},
        {sn: '1416EC91876CDEE5', alg: {name: 'EC', param: 'secp256k1'}, createdAt: new Date(), status: true, ownerID: 1},
        {sn: '1516EC91876CDEE5', alg: {name: 'EC', param: 'secp256k1'}, createdAt: new Date(), status: true, ownerID: 1},
        {sn: '1616EC91876CDEE5', alg: {name: 'EC', param: 'secp256k1'}, createdAt: new Date(), status: true, ownerID: 1},
        {sn: '1716EC91876CDEE5', alg: {name: 'EC', param: 'secp256k1'}, createdAt: new Date(), status: true, ownerID: 1},
        {sn: '1816EC91876CDEE5', alg: {name: 'EC', param: 'secp256k1'}, createdAt: new Date(), status: true, ownerID: 1},
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
            const query = {
                filter: params.filter,
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
            const keypair = Crypto.CreateKeypair(d.alg.name, d.alg.param)
            const prvKeyPEM = Crypto.GetKeyPEM(keypair.prvKeyObj)
            const pubKeyPEM = Crypto.GetKeyPEM(keypair.pubKeyObj)
            d.prvKeyPEM = prvKeyPEM
            d.pubKeyPEM = pubKeyPEM
            d.sn = Crypto.GetHashVal(Crypto.GetHashVal(prvKeyPEM), 'RIPEMD160').toString('base64')
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