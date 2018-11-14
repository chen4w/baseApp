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
    started: {
        color: 'green',
    },
    starting:{
        color: '#3f51b5'
    },
    stopping:{
        color: 'yellow'
    },
    stopped: {
        color: 'red',
    },
};

class ApproveButton extends Component {
    handleApprove = () => {
        const { reviewApprove, record } = this.props;
        reviewApprove(record.id, record);
    };

    handleReject = () => {
        const { reviewReject, record } = this.props;
        reviewReject(record.id, record);
    };

    render() {
        const { record, classes } = this.props;
        return (
            <span>
                <IconButton
                    onClick={this.handleApprove}
                    disabled={record.status === 'starting' || record.status === 'started'}
                >
                    <ThumbUp
                        className={
                            record.status === 'started' ? classes.starting : ''
                        }
                    />
                </IconButton>
                <IconButton
                    onClick={this.handleReject}
                    disabled={record.status === 'stopping' || record.status === 'stopped'}
                >
                    <ThumbDown
                        className={
                            record.status === 'stopped' ? classes.rejected : ''
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
