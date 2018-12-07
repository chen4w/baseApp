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
import { showNotification, UPDATE, fetchStart, fetchEnd} from 'react-admin';
import { push } from 'react-router-redux';
import indexDataProvider from '../../dataprovider/ra-data-indexdb'

class EditSaveButton extends Component {
    handleClick = () => {
        const { push, record, showNotification, fetchStart, fetchEnd } = this.props;
        const updatedRecord = { ...record};
        fetchStart()
        indexDataProvider(UPDATE, 'keypairs', {id: record.id, data: updatedRecord})
            .then(() => {
                showNotification('密钥对信息更新成功');
                push('/keypairs');
            })
            .catch( e => {
                console.error("Bad thing happened:\n" ,e);
                showNotification('' + e, 'warning')
            })
            .finally(fetchEnd)
    }

    render() {
        return  <Button variant='contained' color='primary' 
                    onClick={this.handleClick}
                    style={{marginTop: '40px', maxWidth: '98px', maxHeight: '50px'}}>
                    <Icon style={{marginRight: '8px'}}>
                    save
                    </Icon>
                    保存
                </Button>
    }
}

EditSaveButton.propTypes = {
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
})(EditSaveButton);