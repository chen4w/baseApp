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
var rp = require('request-promise');

class RestAPI {
    /**
     * 
     * @param {*} address 服务地址
     */
    constructor(address) {
        this._address = address;
    }
    /**
     * 返回含区块高度的概要信息
     */
    chaininfo() {
        var url = this._address + 'chaininfo';
        return rp({
            "method": "GET",
            "uri": url,
            "json": true
        })
    }
    //TODO repChain应该提供流式接口,走protobuf序列化
    /**
     * 根据区块高度获取区块数据
     * @param {*} height 区块高度
     */
    block(height) {
        var url = this._address + 'block/' + height;
        return rp({
            "method": "GET",
            "uri": url,
            "json": true
        })
    }

    blockStream(height) {
        var url = this._address + 'block/stream/' + height;
        return rp({
            "method": "GET",
            "uri": url,
            encoding: null
        })
    }

    /**
     * 发送签名交易给RepChain节点
     * @param {Buffer | String} tx 待发送的交易，支持使用交易字节流数据或对其hex格式编码后的字符串
     * @returns {Promise} rp 接收交易后RepChain节点的返回信息
     */
    sendTX(tx) {
        let options
        if (typeof tx === 'string') {
            options = {
                method: 'POST',
                uri: this._address + 'transaction/postTranByString',
                body: tx,
                headers: {
                    'content-type': 'application/json',
                },
                json: true,
            }
        }
        else {
            // Todo: 待完成提交字节流形式的交易数据
            options = {
                method: 'POST',
                headers: { 'Content-Type': 'multipart/form-data'},
                uri: this._address + 'transaction/postTranStream',
                formData: {
                    signedTrans: tx.buffer,
                },
            }
        }
        return rp(options);
    }
}
module.exports.RestAPI = RestAPI;