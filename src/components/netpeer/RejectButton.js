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
import Button from '@material-ui/core/Button';
import ThumbDown from '@material-ui/icons/ThumbDown';
import { translate } from 'react-admin';
import compose from 'recompose/compose';
import { reviewReject as reviewRejectAction } from './reviewActions';

class AcceptButton extends Component {
    handleApprove = () => {
        const { reviewReject, record } = this.props;
        reviewReject(record.id, record);
    };

    render() {
        const { record, translate } = this.props;
        return record && record.status === 'pending' ? (
            <Button color="primary" onClick={this.handleApprove}>
                <ThumbDown
                    color="primary"
                    style={{ paddingRight: '0.5em', color: 'red' }}
                />
                {translate('resources.reviews.action.reject')}
            </Button>
        ) : (
            <span />
        );
    }
}

AcceptButton.propTypes = {
    record: PropTypes.object,
    reviewReject: PropTypes.func,
    translate: PropTypes.func,
};

const enhance = compose(
    translate,
    connect(
        null,
        {
            reviewReject: reviewRejectAction,
        }
    )
);

export default enhance(AcceptButton);
