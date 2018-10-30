import {Crypto} from 'rclink';
import {CREATE, UPDATE} from 'react-admin';

const adjustFormData = (type, resource, formData) => {
    let d = formData;
    switch(type){
        case CREATE:
            if(resource === 'keypairs'){
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
            }
            break;
        case UPDATE:
            if(resource === 'keypairs'){
                try {
                    d.kp.prvKeyPEM = Crypto.GetKeyPEM(Crypto.ImportKey(d.kp.prvKeyPEM, d.kp.pwdOld), d.kp.pwd1);
                    delete d.kp.pwdOld;
                    delete d.kp.pwd1;
                    delete d.kp.pwd2;
                }
                catch(e){
                    console.error(e);
                    if(e === 'malformed plain PKCS8 private key(code:001)')
                        throw new Error('您输入的旧密码错误');
                    else
                        throw new Error(e);
                }
            }
            break;
        default:
            break;
    }

    return d;
}

export default adjustFormData;