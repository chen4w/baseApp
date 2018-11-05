import React from 'react'
import get from 'lodash/get'
import PropTypes from 'prop-types'

const PEMTextField = ({source, record={}}) => <pre>{get(record, source)}</pre>
PEMTextField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired
}
PEMTextField.defaultProps = {addLabel: true}

export default PEMTextField