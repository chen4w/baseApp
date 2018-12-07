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
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '@material-ui/core';
import get from 'lodash/get';
import fileDownload from 'js-file-download';
import SaveIcon from '@material-ui/icons/Save';

class SaveAsButton extends Component{
    handleClick = () => {
        const {record, source} = this.props;
        let fileName;
        switch(source){
            case 'cert.certPEM':
                fileName = record.cert.sn + '.cer';
                break;
            case 'kp.pubKeyPEM':
                fileName = record.kp.sn + '.pub';
                break;
            case 'kp.prvKeyPEM':
                fileName = record.kp.sn + '.pkcs8';
                break;
            default:
        } 
        fileDownload(get(record, source), fileName);
    }

    render(){
        return (
            <Button
                variant='contained'
                color='primary'
                onClick={this.handleClick}
                style={{maxWidth: '198px', maxHeight: '50px'}}
            >
                <SaveIcon  style={{marginRight: '8px'}}>Save</SaveIcon >
                导出保存
            </Button>
        )
    }
}

SaveAsButton.propTypes = {
    record: PropTypes.object,
    source: PropTypes.string,
}

export default SaveAsButton;