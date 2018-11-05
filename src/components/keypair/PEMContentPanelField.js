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