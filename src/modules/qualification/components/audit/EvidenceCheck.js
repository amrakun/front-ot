import React from 'react';
import PropTypes from 'prop-types';
import ModalWrapper from './ModalWrapper';
import { labels } from './constants';

const EvidenceCheck = (props, { __ }) => {
  const { auditResponse, send, hideModal } = props;

  const renderAnswer = supplierAnswer => {
    if (typeof supplierAnswer === 'undefined') {
      return null;
    }

    if (typeof supplierAnswer === 'boolean') {
      return supplierAnswer ? 'Yes' : 'No';
    }

    return supplierAnswer;
  };

  const renderGroup = (name, label) => {
    const sectionValues = auditResponse[name] || {};
    const keys = Object.keys(sectionValues);

    return (
      <>
        <tr>
          <th width="80%">{name === 'coreHseqInfo' ? null : label}</th>
          <th width="10%" />
          <th width="10%" />
        </tr>

        {keys.map((key, index) => {
          const dbValues = sectionValues[key] || {};

          return (
            <tr key={index}>
              <td>{(labels[key] || {}).title}</td>
              <td>{renderAnswer(dbValues.supplierAnswer)}</td>
              <td>Yes</td>
            </tr>
          );
        })}
      </>
    );
  };

  return (
    <ModalWrapper title="Confirmation" visible={true} handleOk={send} hideModal={hideModal}>
      <table>
        <thead>
          <tr>
            <th>{__('Core HSEQ')}</th>
            <th>{__('Score')}</th>
            <th>{__('Attached')}</th>
          </tr>
        </thead>
        <tbody>
          {renderGroup('coreHseqInfo', 'Core HSEQ')}
          {renderGroup('hrInfo', 'Human resource management')}
          {renderGroup('businessInfo', 'BusinesIntegrity')}
        </tbody>
      </table>
    </ModalWrapper>
  );
};

EvidenceCheck.contextTypes = {
  __: PropTypes.func,
};

export default EvidenceCheck;
