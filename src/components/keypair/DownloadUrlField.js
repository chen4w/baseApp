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
import get from 'lodash/get';
import PropTypes from 'prop-types';
import fileDownload from 'js-file-download';

class DownloadUrlField extends Component{
    handleClick = () => {
        const {record, source} = this.props;
        let suffix;
        let plainData;
        if(source === 'kp.sn'){
            plainData = get(record, 'kp.prvKeyPEM') + get(record, 'cert.certPEM');
            suffix = '.pem';
        }
        else if(source === 'cert.sn'){
            plainData = get(record, 'cert.certPEM');
            suffix = '.cer';
        }
        fileDownload(plainData, get(record, source) + suffix);
    }

    render(){
        const {record, source, title} = this.props;
        return (
            <a 
                href='javascript:void(0)' 
                title={title}
                onClick={this.handleClick}
            >
                {get(record, source)}
            </a>
        );
    }
}

DownloadUrlField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
    title: PropTypes.string
}
DownloadUrlField.defaultProps = {addLabel: true}

export default DownloadUrlField