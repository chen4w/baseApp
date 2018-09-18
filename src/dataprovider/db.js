import Dexie from 'dexie'

let db = new Dexie("BAR")

db.version(1).stores({
    users: "++id, &userName, &email",
    keypairs: "++id, &sn, alg, createdAt, status, ownerID",
    certificates: "++id, &sn, ownerID, &accountAddr, &keypairSN",
})

db.open().catch(e => {
    console.log("IndexDB open failed: ", e.stack)
})

// Init for test 
db.on('populate', () => {
    db.keypairs.add({sn: '9316EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: true, ownerID: 1})
    db.keypairs.add({sn: '9416EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: true, ownerID: 1})
    db.keypairs.add({sn: '9616EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: false, ownerID: 2})
    db.keypairs.add({sn: '9716EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: false, ownerID: 2})
    db.keypairs.add({sn: '9816EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: false, ownerID: 2})
    db.keypairs.add({sn: '9916EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: false, ownerID: 2})
    db.keypairs.add({sn: '9626EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: false, ownerID: 2})
    db.keypairs.add({sn: '9636EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: false, ownerID: 2})
    db.keypairs.add({sn: '9646EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: false, ownerID: 2})
    db.keypairs.add({sn: '9656EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: false, ownerID: 2})
    db.keypairs.add({sn: '9666EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: false, ownerID: 2})
    db.keypairs.add({sn: '9676EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: false, ownerID: 2})
    db.keypairs.add({sn: '9686EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: false, ownerID: 2})
    db.keypairs.add({sn: '9696EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: false, ownerID: 2})
    db.keypairs.add({sn: '9617EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: false, ownerID: 2})
    db.keypairs.add({sn: '9618EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: false, ownerID: 2})
    db.keypairs.add({sn: '9619EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: false, ownerID: 2})
})


export default db