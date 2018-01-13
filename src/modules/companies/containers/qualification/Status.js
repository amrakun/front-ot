import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries } from '../../graphql';
import { Status } from '../../components';
import { Loading } from 'modules/common/components';
import { message } from 'antd';

const StatusContainer = props => {
  let { companyByUserQuery } = props;

  if (companyByUserQuery.loading) {
    return <Loading />;
  }

  const save = (name, doc) => {
    console.log(name, doc);
    message.success('Successful');
  };

  const updatedProps = {
    ...props,
    save,
    company: {
      ...companyByUserQuery.companyByUser
    }
  };
  return <Status {...updatedProps} />;
};

StatusContainer.propTypes = {
  companyByUserQuery: PropTypes.object
};

export default compose(
  graphql(gql(queries.companyPrequalificationDetail), {
    name: 'companyByUserQuery'
  })
)(StatusContainer);
