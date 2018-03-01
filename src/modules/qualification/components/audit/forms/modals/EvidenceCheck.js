import React from 'react';
import { Checkbox } from 'antd';
import ModalWrapper from './ModalWrapper';
import { evidenceCheckList } from '../constants';
import PropTypes from 'prop-types';

const EvidenceCheck = ({ props }, { __ }) => {
  let evidenceChecks = [];

  function handleEvidenceChange(values) {
    evidenceChecks = values;
  }

  function handleOk() {
    const doc = {};
    evidenceChecks.forEach(item => (doc[item] = true));

    props.save(doc);
  }

  return (
    <ModalWrapper {...props} handleOk={handleOk}>
      <div>
        <strong>
          Please send your evidences for each question to &#34;
          <a href="mailto:narantsatsral@ot.mn" target="_top">
            narantsatsral@ot.mn
          </a>&#34; , and tick the boxes to confirm that you have sent each
          evidence.
        </strong>
        <Checkbox.Group
          options={evidenceCheckList}
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
