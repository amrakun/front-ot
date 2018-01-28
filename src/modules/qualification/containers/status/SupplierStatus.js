import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries, mutations } from '../../graphql';
import { SupplierStatus } from '../../components';
import { Loading } from 'modules/common/components';
import { message } from 'antd';

const StatusContainer = props => {
  const {
    supplierPrequalificationQuery,
    qualificationDetailQuery,
    tierTypeSave,
    prequalify
  } = props;

  if (
    supplierPrequalificationQuery.loading ||
    qualificationDetailQuery.loading
  ) {
    return <Loading />;
  }

  const { companyDetail } = supplierPrequalificationQuery;

  const saveTierType = value => {
    const variables = { supplierId: companyDetail._id, tierType: value };
    const { history } = props;

    tierTypeSave({ variables })
      .then(() => {
        message.success('Saved');
        supplierPrequalificationQuery.refetch().then(() => {
          history.push('/prequalification-status');
        });
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const save = (name, doc) => {
    const mutation = props[`${name}Edit`];

    Object.keys(doc).forEach(key => {
      if (doc[key] === undefined) {
        doc[key] = false;
      }
    });

    mutation({ variables: { supplierId: companyDetail._id, [name]: doc } })
      .then(() => {
        message.success('Saved');
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const prequalifySupplier = () => {
    prequalify({ variables: { supplierId: companyDetail._id } })
      .then(() => {
        supplierPrequalificationQuery.refetch();
        message.success('Pre-qualified!');
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const updatedProps = {
    ...props,
    save,
    saveTierType,
    prequalifySupplier,
    company: {
      ...qualificationDetailQuery.qualificationDetail
    },
    supplierInputs: {
      ...companyDetail
    }
  };
  return <SupplierStatus {...updatedProps} />;
};

StatusContainer.propTypes = {
  supplierPrequalificationQuery: PropTypes.object,
  qualificationDetailQuery: PropTypes.object,
  tierTypeSave: PropTypes.func,
  prequalify: PropTypes.func
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
  }),

  graphql(gql(queries.qualificationDetail), {
    name: 'qualificationDetailQuery',
    options: ({ match }) => {
      return {
        variables: {
          supplierId: match.params.id
        },
        notifyOnNetworkStatusChange: true
      };
    }
  }),

  graphql(gql(mutations.qualifyFinancialInfo), {
    name: 'financialInfoEdit'
  }),

  graphql(gql(mutations.qualifyBusinessInfo), {
    name: 'businessInfoEdit'
  }),

  graphql(gql(mutations.qualifyEnvironmentalInfo), {
    name: 'environmentalInfoEdit'
  }),

  graphql(gql(mutations.qualifyHealthInfo), {
    name: 'healthInfoEdit'
  }),

  graphql(gql(mutations.qualifySaveTierType), {
    name: 'tierTypeSave'
  }),

  graphql(gql(mutations.qualificationsPrequalify), {
    name: 'prequalify'
  })
)(StatusContainer);
