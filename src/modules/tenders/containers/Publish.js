import React from 'react';
import PropTypes from 'prop-types';
import { Publish } from '../components';
import {
  eoiTemplate, //fetch from DB
  rfqTemplate, //fetch from DB
  mockTender //fetch from DB
} from '../constants';
import { newRfqPath, newEoiPath } from '../../common/constants';

const propTypes = {
  location: PropTypes.object,
  companyDetailQuery: PropTypes.object,
  match: PropTypes.object
};

const PublishContainer = props => {
  let { location } = props;
  let tender = {};

  switch (location.pathname) {
    case newEoiPath:
      tender = eoiTemplate;
      break;
    case newRfqPath:
      tender = rfqTemplate;
      break;
    default:
      //edit path
      tender = mockTender;
  }

  const save = doc => {
    console.log('tedners/containers/Publish', doc);
  };

  const updatedProps = {
    ...props,
    save,
    data: tender
  };

  return <Publish {...updatedProps} />;
};

PublishContainer.propTypes = propTypes;

export default PublishContainer;
