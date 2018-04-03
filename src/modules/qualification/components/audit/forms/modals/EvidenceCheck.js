import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import ModalWrapper from './ModalWrapper';
import { checkLists } from '../constants';

const EvidenceCheck = (props, { __ }) => {
  let evidenceChecks = {};

  function handleEvidenceChange(values, name) {
    evidenceChecks[name] = values;
  }

  function handleOk() {
    const doc = {};

    Object.keys(evidenceChecks).forEach(key => {
      evidenceChecks[key] &&
        evidenceChecks[key].forEach(item => (doc[item] = true));
    });

    props.save(doc);
  }

  const renderCheckBoxGroup = name => {
    const checkList = checkLists[name];

    return [
      <h3 style={{ margin: '16px 0 8px 0' }} key={0}>
        {__(checkList.title)}
      </h3>,
      <Checkbox.Group
        key={1}
        options={checkList.options.map(item => ({
          label: __(item.label),
          value: item.value
        }))}
        className="horizontal"
        onChange={values => handleEvidenceChange(values, name)}
      />
    ];
  };

  return (
    <ModalWrapper {...props} handleOk={handleOk}>
      <div>
        <strong>
          {__('Please send your evidences for each question to')}&nbsp;
          <a href="mailto:narantsatsral@ot.mn" target="_top">
            narantsatsral@ot.mn
          </a>
          {__(
            ', and tick the boxes to confirm that you have sent each evidence.'
          )}
        </strong>

        {renderCheckBoxGroup('coreHseq')}
        {renderCheckBoxGroup('humanResource')}
        {renderCheckBoxGroup('businessIntegrity')}
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
