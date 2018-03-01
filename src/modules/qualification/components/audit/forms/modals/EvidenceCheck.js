import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import ModalWrapper from './ModalWrapper';
import { evidenceCheckList } from '../constants';
const EvidenceCheck = (props, { __ }) => {
  let evidenceChecks = [];

  function handleEvidenceChange(values) {
    evidenceChecks = values;
  }

  function handleOk() {
    const doc = {};
    evidenceChecks.forEach(item => (doc[item] = true));

    props.save(doc);
  }

  const evidenceCheckListModified = evidenceCheckList.map((item, i) => {
    return __(item.label);
  });

  return (
    <ModalWrapper {...props} handleOk={handleOk}>
      <div>
        <strong>
          {__('Please send your evidences for each question to "')}
          <a href="mailto:narantsatsral@ot.mn" target="_top">
            narantsatsral@ot.mn
          </a>
          {__(
            '", and tick the boxes to confirm that you have sent each evidence.'
          )}
        </strong>
        <Checkbox.Group
          options={evidenceCheckListModified}
          className="horizontal margin evidence-check"
          onChange={handleEvidenceChange}
        />
      </div>
    </ModalWrapper>
  );
};

EvidenceCheck.propTypes = {
  save: PropTypes.func
};

EvidenceCheck.contextTypes = {
  __: PropTypes.func
};

export default EvidenceCheck;
