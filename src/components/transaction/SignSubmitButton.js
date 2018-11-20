import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon } from '@material-ui/core';
import { showNotification, GET_ONE, fetchStart, fetchEnd } from 'react-admin';
import { push } from 'react-router-redux';
import indexDataProvider from '../../dataprovider/ra-data-indexdb'
import { Transaction } from 'rclink'
//Transaction加载protobuf定义
Transaction.setTxMsgType().then(data => {
    console.log('setTxMsgType:' + data);
}).catch(e => {
    console.error("setTxMsgType err:\n", e);
})

class SignSubmitButton extends Component {
    handleClick = () => {
        const { push, record, showNotification, fetchStart, fetchEnd } = this.props;
        const updatedRecord = { ...record };
        fetchStart()
        indexDataProvider(GET_ONE, 'keypairs', { id: record.keypair })
            .then((data) => {
                console.log(data);
                let t = new Transaction({
                    type: parseInt(record.type, 10), name: record.cname,
                    function: record.action, args: [record.ipt]
                })
                let txSignedBuffer = t.createSignedTransaction(data.data.kp.prvKeyPEM, "ecdsa-with-SHA1")
                console.log('len:'+txSignedBuffer.length);
            })
            .catch(e => {
                console.error("Bad thing happened:\n", e);
                showNotification('' + e, 'warning')
            })
            .finally(fetchEnd)
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