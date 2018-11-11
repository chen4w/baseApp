import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import ThumbUp from '@material-ui/icons/PlayCircleFilled';
import ThumbDown from '@material-ui/icons/Stop';

import {
    reviewApprove as reviewApproveAction,
    reviewReject as reviewRejectAction,
} from './reviewActions';

const styles = {
    accepted: {
        color: 'green',
    },
    rejected: {
        color: 'red',
    },
};

const xhr = new XMLHttpRequest(); 
const commitNodeStatusHandler = (cnodename,cstatus) =>{
    if(cstatus=='start'){
        xhr.open('GET', '/startNode/'+cnodename+'/start', true);
    }else if(cstatus == 'stop'){
        xhr.open('GET', '/startNode/'+cnodename+'/stop', true);
    }
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    //console.log('cstatus='+cstatus);
    xhr.send();
}

class ApproveButton extends Component {
    handleApprove = () => {
        const { reviewApprove, record } = this.props;
        commitNodeStatusHandler(record.nodename,'start');
    };

    handleReject = () => {
        const { reviewReject, record } = this.props;
        commitNodeStatusHandler(record.nodename,'stop');
    };

    render() {
        const { record, classes } = this.props;
        return (
            <span>
                <IconButton
                    onClick={this.handleApprove}
                    disabled={record.status === 'accepted'}
                >
                    <ThumbUp
                        className={
                            record.status === 'accepted' ? classes.accepted : ''
                        }
                    />
                </IconButton>
                <IconButton
                    onClick={this.handleReject}
                    disabled={record.status === 'rejected'}
                >
                    <ThumbDown
                        className={
                            record.status === 'rejected' ? classes.rejected : ''
                        }
                    />
                </IconButton>
            </span>
        );
    }
}

ApproveButton.propTypes = {
    classes: PropTypes.object,
    record: PropTypes.object,
    reviewApprove: PropTypes.func,
    reviewReject: PropTypes.func,
};

export default connect(
    null,
    {
        reviewApprove: reviewApproveAction,
        reviewReject: reviewRejectAction,
    }
)(withStyles(styles)(ApproveButton));
