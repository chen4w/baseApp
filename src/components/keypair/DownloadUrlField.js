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
        const {record, source} = this.props;
        return (
            <a 
                href='javascript:void(0)' 
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
    source: PropTypes.string.isRequired
}
DownloadUrlField.defaultProps = {addLabel: true}

export default DownloadUrlField