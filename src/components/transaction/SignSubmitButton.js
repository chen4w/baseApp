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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon } from '@material-ui/core';
import { showNotification, GET_ONE, fetchStart, fetchEnd, CREATE } from 'react-admin';
import { push } from 'react-router-redux';
import indexDataProvider from '../../dataprovider/ra-data-indexdb'
import { Transaction } from 'rclink'
import settings from '../../settings';
import buildGraphQLProvider from '../../adaptator';

//Transaction加载protobuf定义
Transaction.setTxMsgType().then(data => {
    console.log('setTxMsgType:' + data);
}).catch(e => {
    console.error("setTxMsgType err:\n", e);
})
const xhr = new XMLHttpRequest();
const postURL = settings.RepChain.default.url_api + 'transaction/postTranStream';
class SignSubmitButton extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.state = { dataProvider: null };
    }
    componentDidMount() {
        let me = this;
        buildGraphQLProvider({
            clientOptions: { uri: settings.Prisma.endpoint }
        }).then(dataProvider => {
            me.dataProvider = dataProvider;
        }
        );
    }
    componentWillUnmount(){
        window.removeEventListener("message", this.receiveMessage, false);       
    }
    handleClick = async (p1) => {
        const { push, record, showNotification, fetchStart, fetchEnd } = this.props;
        const updatedRecord = { ...record };
        fetchStart()
        let prvKP = await indexDataProvider(GET_ONE, 'keypairs', { id: record.keypair })
            .then((data) => {
                return data.data.kp.prvKeyPEM;
            })
            .catch(e => {
                showNotification('' + e, 'warning')
            })
            .finally(fetchEnd)
        let itype = parseInt(record.type2, 10);
        let t = new Transaction({
            type: itype, name: record.cname,
            function: record.action, args: [record.ipt]
        })
        let txSignedBuffer = t.createSignedTransaction(prvKP, "ecdsa-with-SHA1")

        //post signed transaction
        try {
            let formData = new FormData();
            formData.append('signedTrans', new Blob([txSignedBuffer]));
            xhr.open('POST', postURL, false);
            xhr.send(formData);
            //save record
            record.type = itype;
            record.txId = t.getTxMsg().txid;
            record.signature = t.getTxMsg().signature.toString('hex');
            //record.timeStamp = new Date();
            this.dataProvider(CREATE, 'Transaction', { data: record })
            showNotification('resources.Transaction.notification.send_success',
                'info', { messageArgs: { txId: record.txId } })
            push('/Transaction');
        } catch (e) {
            showNotification('' + e, 'warning')
        }
        fetchEnd()
    }

    render() {
        return <Button variant='contained' color='primary'
            onClick={this.handleClick}>
            <Icon style={{ marginRight: '8px' }}>
                save
                    </Icon>
            签名提交
                </Button>
    }
}

SignSubmitButton.propTypes = {
    fetchStart: PropTypes.func,
    fetchEnd: PropTypes.func,
    push: PropTypes.func,
    record: PropTypes.object,
    showNotification: PropTypes.func,
};

export default connect(null, {
    showNotification,
    fetchStart,
    fetchEnd,
    push,
})(SignSubmitButton);