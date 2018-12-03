import IndexDBRest from './indexdbRest'
import adjustFormData from './adjustFormData';
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
    certsImport: "++id, phone, &cert.sn"
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

    let adjustedFormData;

    switch (type) {
        case GET_LIST:
            const { page, perPage } = params.pagination
            const s = [params.sort.field, params.sort.order]
            const r = [(page - 1) * perPage, page * perPage - 1]
            const query = {
                filter: adjustFormData(type, resource, params.filter),
                sort: s,
                range: r
            }

            return indexdbRest.getCollection(resource, query).then(r => {
                console.log(r)
                return {
                    data: r.result,
                    total: r.totalCount
                }
            });
        case GET_ONE:
            const gID = parseInt(params.id, 10)
            return indexdbRest.getOne(resource, gID).then(r => ({ data: r.result }))
            //c4w 11.21
        case GET_MANY:           
            return indexdbRest.getCollection(resource, {   
                    filter:{id: ['in',params.ids] },
                    sort: ['id','DESC'],
                    range: [0,20]
            }).then(r => {
                return {
                    data: r.result,
                    total: r.totalCount
                }
            })
        case CREATE:
            let d = params.data
            adjustedFormData = adjustFormData(type, resource, d);
            return indexdbRest.create(resource, adjustedFormData)
                .then(r => ({ data: r.result }))
                .catch(e => new Promise((_, reject) => {
                    reject(new Error("密钥对已存在！"));
                }));

        case UPDATE:
            const uID = parseInt(params.id, 10)
            let uData = params.data

            try {
                adjustedFormData = adjustFormData(type, resource, uData);
            }
            catch (e) {
                return new Promise((_, reject) => {
                    reject(e);
                })
            }

            return indexdbRest.update(resource, uID, adjustedFormData).then(r => ({ data: r.result }))
        case DELETE:
            const dID = parseInt(params.id, 10)
            return indexdbRest.delete(resource, dID).then(r => ({ data: r.result }))
        default:
            throw new Error(`Unsupported data provider request type ${type}`)
    }
}