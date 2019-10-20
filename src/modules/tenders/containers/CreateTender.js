import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { queries as companyQueries } from 'modules/companies/graphql';
import { alert } from 'modules/common/utils';
import { Loading } from 'modules/common/components';
import { RfqForm, EoiForm } from '../components';
import { mutations, queries } from '../graphql';

class CreateTenderContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitted: false,
    };
  }

  save = doc => {
    const { type, tendersAdd, history, queryParams } = this.props;
    const [publishDate, closeDate] = doc.dateRange;

    this.setState({ isSubmitted: true });

    tendersAdd({
      variables: { ...doc, productCodes: queryParams.productCodes, publishDate, closeDate },
    })
      .then(tender => {
        this.setState({ isSubmitted: false });

        alert.success('Successfully created a tender!');

        history.push(`/${type}?refetch`, {
          newTenderId: tender.data.tendersAdd._id,
        });
      })
      .catch(error => {
        this.setState({ isSubmitted: false });
        alert.error(error.message);
      });
  };

  render() {
    const { type, simpleCompaniesQuery, buyersQuery } = this.props;

    if (simpleCompaniesQuery.error) {
      return null;
    }

    if (simpleCompaniesQuery.loading) {
      return <Loading />;
    }

    const updatedProps = {
      ...this.props,
      save: this.save,
      tenderCreation: true,
      data: { suppliers: simpleCompaniesQuery.companies || [] },
      isSubmitted: this.state.isSubmitted,
      buyers: buyersQuery.users || [],
    };

    if (type === 'eoi') {
      return <EoiForm {...updatedProps} />;
    }

    return <RfqForm {...updatedProps} />;
  }
}

CreateTenderContainer.propTypes = {
  type: PropTypes.string,
  tendersAdd: PropTypes.func,
  simpleCompaniesQuery: PropTypes.object,
  buyersQuery: PropTypes.object,
  history: PropTypes.object,
};

export default compose(
  graphql(gql(mutations.tendersAdd), {
    name: 'tendersAdd',
  }),

  graphql(gql(companyQueries.simpleCompanies), {
    name: 'simpleCompaniesQuery',
    options: ({ location }) => {
      return {
        variables: {
          _ids: (location.state || {}).supplierIds,
        },
        notifyOnNetworkStatusChange: true,
      };
    },
  }),

  graphql(gql(queries.buyers), {
    name: 'buyersQuery',
  })
)(CreateTenderContainer);
