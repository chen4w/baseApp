import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '@material-ui/core';
import get from 'lodash/get';
import fileDownload from 'js-file-download';

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
                <Icon style={{marginRight: '8px'}}>saveas</Icon>
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