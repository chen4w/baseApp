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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import get from 'lodash/get';
import PEMTextField from './PEMTextField';
import SaveAsButton from './SaveAsButton';



class PEMContentPanelField extends Component {

    render() {
        const {record, source} = this.props;
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{fontSize: '14px'}} >
                    显示PEM格式证书信息
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{display: 'block'}}>
                    <PEMTextField record={record} source={source} />
                    <SaveAsButton record={record} source={source} />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}

PEMContentPanelField.propTypes = {
    record: PropTypes.object,
    record: PropTypes.string,
}

export default PEMContentPanelField;