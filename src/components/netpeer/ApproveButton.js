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
