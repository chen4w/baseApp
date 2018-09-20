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
        {sn: '9316EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: true, ownerID: 1},
        {sn: '9416EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: true, ownerID: 1},
        {sn: '9616EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: false, ownerID: 2},
        {sn: '9716EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: false, ownerID: 2},
        {sn: '9816EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: false, ownerID: 2},
        {sn: '9916EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: false, ownerID: 2},
        {sn: '9626EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: false, ownerID: 2},
        {sn: '9636EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: false, ownerID: 2},
        {sn: '9646EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: false, ownerID: 2},
        {sn: '9656EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: false, ownerID: 2},
        {sn: '9666EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: false, ownerID: 2},
        {sn: '9676EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: false, ownerID: 2},
        {sn: '9686EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: false, ownerID: 2},
        {sn: '9696EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: false, ownerID: 2},
        {sn: '9617EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: false, ownerID: 2},
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