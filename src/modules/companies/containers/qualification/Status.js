import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries } from '../../graphql';
import { SupplierStatus } from '../../components';
import { Loading } from 'modules/common/components';
import { message } from 'antd';

const StatusContainer = props => {
  let { supplierPrequalificationQuery } = props;

  if (supplierPrequalificationQuery.loading) {
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
      ...supplierPrequalificationQuery.companyDetail
    }
  };
  return <SupplierStatus {...updatedProps} />;
};

StatusContainer.propTypes = {
  supplierPrequalificationQuery: PropTypes.object
};

export default compose(
  graphql(gql(queries.supplierPrequalification), {
    name: 'supplierPrequalificationQuery',
    options: ({ match }) => {
      return {
        variables: {
          _id: match.params.id
        },
        notifyOnNetworkStatusChange: true
      };
    }
  })
)(StatusContainer);
