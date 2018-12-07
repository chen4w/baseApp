/*
 * Copyright  2018 Linkel Technology Co., Ltd, Beijing
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BA SIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import {Crypto} from 'rclink';
import {
    GET_LIST,
    CREATE,
    UPDATE,
} from 'react-admin';

const adjustFormData = (type, resource, formData) => {
    let d = formData ;
    switch(type){
        case GET_LIST:
            // 此时，formData是filter对象
            // 深拷贝, 以防止改变原filter对象引起组件异常
            d = JSON.parse(JSON.stringify(formData))
            if(resource === 'keypairs')
                if(d && d.cert){
                    if(d.cert.validityEnd === 'expired'){
                        d.cert.validityEnd = ['below', new Date().toISOString()];
                    }
                    else if(d.cert.validityEnd === 'unExpired'){
                        d.cert.validityEnd = ['aboveOrEqual', new Date().toISOString()];
                    }
                }
                if(d && d.createdAtLocale){
                    const filterDate = new Date(d.createdAtLocale);
                    d.createdAtLocale = filterDate.toLocaleDateString();
                }
            break;
        case CREATE:
            if(resource === 'keypairs'){
                d.createdAt = new Date().toISOString();
                d.createdAtLocale = new Date().toLocaleString();

                let prvKeyPEM;
                let pubKeyPEM;
                let certPEM;

                if(d.keypairImported){
                    const pemInfo = d.keypairImported.src;
                    const prvKeyRex = /-*BEGIN.*\s+PRIVATE.*\s+KEY-*(\r\n)*[\w+=\/\r\n]*-*END.*\s+PRIVATE.*\s+KEY-*(\r\n)*/i;
                    const certRex = /-*BEGIN.*\s+CERTIFICATE-*(\r\n)*[\w+=\/\r\n]*-*END.*\s+CERTIFICATE-*(\r\n)*/i;
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
                        distinguishName: cert.getSubjectString(), 
                        validityStart: new Date(cert.getNotBeforeUnixTimestamp() * 1000)
                            .toISOString(),
                        validityEnd: new Date(cert.getNotAfterUnixTimestamp() * 1000)
                            .toISOString(), 
                        certPEM: certPEM};
                    
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

                    const startUnixTime = parseInt(d.cert.validityStart.getTime() / 1000)
                    const endUnixTime = parseInt(d.cert.validityEnd.getTime() / 1000)
                    let certDN = '';
                    if(d.cert.distinguishNameAttributes.length == 0)
                        throw new Error("证书拥有者/发行者识别名不能为空")
                    for(let attr of d.cert.distinguishNameAttributes){
                        certDN += '/' + attr.name + '=' + attr.value;
                    }
                    delete d.cert.distinguishNameAttributes;
                    d.cert.distinguishName = certDN;
                    certPEM = Crypto.CreateSelfSignedCertificate({
                        serialNumber: d.cert.sn, 
                        sigAlg: d.cert.sigAlg, 
                        DN: d.cert.distinguishName, 
                        notBefore: startUnixTime, 
                        notAfter: endUnixTime, 
                        keypair: keypair
                    });
                    d.cert.certPEM = certPEM
                    d.cert.validityStart = d.cert.validityStart.toISOString()
                    d.cert.validityEnd = d.cert.validityEnd.toISOString()
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
                    if(e.message === '提供的私钥信息无效或解密密码无效')
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