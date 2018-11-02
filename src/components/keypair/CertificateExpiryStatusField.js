import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import {Chip} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {red, green} from '@material-ui/core/colors';

const CertificateExpiryStatusField = ({source, record={}}) => {
    const certValidityEnd = get(record, source);
    let chipLabel;
    let chipColor;
    if(certValidityEnd >= new Date().toISOString()){
        chipLabel = '有效期内';
        chipColor = green[500]; 
    }
    else{
        chipLabel = '已过期';
        chipColor = red[800];
    }

    const StyledChip = withStyles({
        root: {
            backgroundColor: chipColor,
        },
        label: {
            color: 'white'
        }
    })(Chip)

    return (
        <StyledChip label={chipLabel} />
    );
}
CertificateExpiryStatusField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired
}
CertificateExpiryStatusField.defaultProps = {addLabel: true}

export default CertificateExpiryStatusField