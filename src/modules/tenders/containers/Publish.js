import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries } from '../graphql';
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
  let { companyDetailQuery, location, match } = props;

  console.log('tenders/containers/Publish.js', match.params.id);

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
      break;
  }

  if (companyDetailQuery.loading) {
    return <div />;
  }

  const save = (name, doc) => {
    console.log('', name, doc);
  };

  const updatedProps = {
    ...props,
    save,
    data: tender
  };

  return <Publish {...updatedProps} />;
};

PublishContainer.propTypes = propTypes;

export default compose(
  graphql(gql(queries.companyDetail), {
    name: 'companyDetailQuery'
  })
)(PublishContainer);
