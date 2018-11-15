import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { showNotification, fetchStart, fetchEnd } from 'react-admin';
import { push } from 'react-router-redux';

const xhr = new XMLHttpRequest();
const uploadFile = file => {
    var formData = new FormData();
    formData.append('file-to-upload', file.rawFile);
    xhr.open('POST', '/upload', true);
    console.log(file.rawFile)
    xhr.send(formData);
}

class UploadSaveButton extends Component {
    handleClick = () => {
        const { push, record, showNotification, fetchStart, fetchEnd } = this.props;
        const formRecord = { ...record };
        fetchStart();
        const newPictures = formRecord.pictures.filter(
            p => p.rawFile instanceof File
        );

        Promise.all(newPictures.map(uploadFile))
            .then(() => {
                showNotification('resources.File.notification.upload_success');
                push('/File');
            })
            .catch(e => {
                console.error("Bad thing happened:\n", e);
                showNotification('' + e, 'warning')
            })
            .finally(fetchEnd)
    }

    render() {
        return (<Button
            variant='contained'
            color='primary'
            onClick={this.handleClick}
            style={{ maxWidth: '198px', maxHeight: '50px' }}
        >
            <SaveIcon  style={{ marginRight: '8px' }}>Save</SaveIcon >
            保存
    </Button>)
    }
}

UploadSaveButton.propTypes = {
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
})(UploadSaveButton);