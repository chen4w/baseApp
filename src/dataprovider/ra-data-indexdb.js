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
import db from './db'

export default (type, resource, params) => {
    switch(type){
        case GET_LIST: 
            const {page, perPage} = params.pagination
            const filter =  params.filter
            const {field, order} = params.sort
            const range = [(page-1)*perPage, page*perPage - 1]

            let collection = JSON.stringify(filter) === '{}' ? db.table(resource).toCollection() : db.table(resource).where(filter)
            if(order === 'DESC')
                collection = collection.reverse()
            return collection.sortBy(field).then(rs => (
                        {
                            data: rs.slice(range[0], range[1] + 1),
                            total: rs.length
                        }
                    ))
        case GET_ONE:
            const gID = parseInt(params.id, 10)
            return db.table(resource).get(gID).then(r => ({data: r}))
        case CREATE:
            let d = params.data
            d.status = false
            d.createdAt = new Date()

            return db.table(resource).add(d).then(rID => db.table(resource).get(rID)).then(r => ({data: r}))
        case UPDATE:
            const uID = parseInt(params.id, 10)
            const uData = params.data
            return db.table(resource).update(uID, uData).then(r => {
                if(r)
                    return db.table(resource).get(uID).then(r => ({data: r}))
                else
                    throw new Error(`Update ${resource} id:${uID} failed, the resource doesn't exist or provided data is the same with the orogin one`)
            })
        case DELETE:
            const dID = parseInt(params.id, 10)
            let prevR
            return db.transaction('rw', db.table(resource), async () => {
                await db.table(resource).get(dID).then(r => {
                    if(!r)
                        throw new Error(`Not found the ${resource} id:${dID}`)
                    prevR = r
                })
                await db.table(resource).delete(dID)
                return db.table(resource).get(dID).then(r => {
                    if(r)
                        throw new Error(`Delete operation failed for the ${resource} id:${dID}`)
                    return {data: prevR}
                })
            })
        default:
            throw new Error(`Unsupported data provider request type ${type}`)
    }
}