/*
Copyright  2018 Blockchain Technology and Application Joint Lab, Fintech Research Center of ISCAS.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */
import crypto from 'crypto';
import {KEYUTIL, KJUR} from 'jsrsasign';
import Jsrsasign from 'jsrsasign';
import JsrsasignUtil from 'jsrsasign-util';
import Uuidv1 from 'uuid/v1';
import Moment from 'moment';

const settings = require('config');


getHashBytes = function (alg, data) {
    let hash = crypto.createHash(alg);
    hash.update(data);
    return hash.digest();
}

/**
 * Sign data with private key
 * @param alg 算法
 * @param prvKey 私钥
 * @param data 签名的数据
 * @return
 */
exports.Sign = function (alg, prvKey, data) {
    let sign = crypto.createSign(alg);
    sign.update(getHashBytes('sha256', data));
    let signature = sign.sign({key: prvKey});
    return signature;
}

/**
 * 鉴定签名是否正确
 * @param alg 算法
 * @param pubKey 公钥
 * @param signature 签名后的数据
 * @param data 签名的数据
 * @return result true or false
 */
exports.verifySign = function (alg, pubKey, signature, data) {
    let verify = crypto.createVerify(alg);
    verify.update(getHashBytes('sha256', data));
    let result = verify.verify({key: pubKey}, signature);
    return result;
}

savePrvKeyFile = function (file_name, prv_key_hex) {
    JsrsasignUtil.saveFileBinByHex(file_name, prv_key_hex);
}

saveCertFile = function (file_name, cert_pem) {
    JsrsasignUtil.saveFile(file_name, cert_pem);
}

//鉴定私钥的密码是否正确
VerifyPrvKeyWithPass = function (prv_key_pem, password) {
    let result;
    try {
        KEYUTIL.getKey(prv_key_pem, password)
        result = true;
    }
    catch (e) {
        console.log(e)
        result = false;
    }
    return result;
}

//Create key pair with ECCDSA (secp256r1)
//Meanwhile save encrypted PSK#8 PEM private key in a local binary file 
CreateKeyPair = function (password, identity) {
    let key_pair = KEYUTIL.generateKeypair('EC', 'secp256k1');
    let prv_key_obj = key_pair.prvKeyObj;
    let prv_key_pem = KEYUTIL.getPEM(prv_key_obj, 'PKCS8PRV', password);

    let prv_key_hex = Jsrsasign.pemtohex(prv_key_pem);
    return prv_key_pem;
}

CreatePrvKeyByImport = function (prv_key_pem2hex, identity) {
    return Jsrsasign.hextopem(prv_key_pem2hex, 'ENCRYPTED PRIVATE KEY');
}

//Generate X509 PEM certificate signed by self
//With keyPair info created within CreateKeyPair functionality
GenCertificateWithPemPrvKey = function (password, user_info, prv_key_pem) {
    let certificate_file_save_location = settings.get('Crypto.certificate_file_location');
    if (!VerifyPrvKeyWithPass(prv_key_pem, password))
        throw new Error('解密私钥失败');
    let prv_key_obj = KEYUTIL.getKey(prv_key_pem, password);

    let pub_key_obj = KEYUTIL.getKey({xy: prv_key_obj.pubKeyHex, curve: 'secp256k1'});
    let tbs = new KJUR.asn1.x509.TBSCertificate();
    tbs.setSerialNumberByParam({'int': parseInt(Uuidv1().replace(/-/g, ''), 16)});
    tbs.setSignatureAlgByParam({'name': 'SHA256withECDSA'});
    let issuer_str = '/CN=PicCopyRightRegisterAPP/C=China/OU=SDR/O=ISCAS/L=BJ';
    let uer_str = '/CN=PicCopyRightRegisterUer/C=China';
    tbs.setIssuerByParam({'str': issuer_str});
    tbs.setSubjectByParam({'str': uer_str});
    tbs.setSubjectPublicKey(pub_key_obj);
    let time = Moment.utc();
    tbs.setNotBeforeByParam({'type': 'gen', 'str': time.format('YYYYMMDDhhmmss') + 'Z'});
    time = Moment.utc(time).year(time.year() + 1);
    tbs.setNotAfterByParam({'type': 'gen', 'str': time.format('YYYYMMDDhhmmss') + 'Z'});

    let cert = new KJUR.asn1.x509.Certificate({'tbscertobj': tbs, 'prvkeyobj': prv_key_obj});
    cert.sign();
    let cert_pem = cert.getPEMString();

    console.log("cert_pem: ", cert_pem);

    const identity = user_info.phone;
    return cert_pem;
}


GenCertificateWithBinPrvkeyFile = function (password, user_info) {

    const identity = user_info.phone;
    let prv_key_hex = JsrsasignUtil.readFileHexByBin(settings.get('Crypto.prvkey_file_location') + '/' + identity + '.prvkey');
    let prv_key_pem = Jsrsasign.hextopem(prv_key_hex, 'ENCRYPTED PRIVATE KEY');

    return GenCertificateWithPemPrvKey(password, user_info, prv_key_pem);
}


exports.VerifyPrvKeyWithPass = VerifyPrvKeyWithPass;
exports.CreateKeyPair = CreateKeyPair;
exports.CreatePrvKeyByImport = CreatePrvKeyByImport;
exports.GenCertificateWithPemPrvKey = GenCertificateWithPemPrvKey;
exports.GenCertificateWithBinPrvkeyFile = GenCertificateWithBinPrvkeyFile;
