import React from 'react';
import { message } from 'antd';
import { gql, graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { AuditSendForm } from '../../components';
import { mutations } from '../../graphql';
import { generator } from 'modules/companies/containers';
import { queries as companyQueries } from 'modules/companies/graphql';
import { queries as userQueries } from 'modules/auth/graphql';

class AuditContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitted: false,
    };
  }

  render() {
    const { selectedCompaniesQuery, buyersQuery, addAuditMutation } = this.props;
    const { isSubmitted } = this.state;

    const save = doc => {
      const [publishDate, closeDate] = doc.dateRange;

      this.setState({ isSubmitted: true });

      addAuditMutation({ variables: { ...doc, publishDate, closeDate } })
        .then(() => {
          this.setState({ isSubmitted: false });
          message.success('Successfully sent audit');
        })
        .catch(error => {
          this.setState({ isSubmitted: false });
          message.error(error.message);
        });
    };

    if (buyersQuery.loading || selectedCompaniesQuery.loading) {
      return null;
    }

    const extendedProps = {
      ...this.props,
      data: { suppliers: selectedCompaniesQuery.companies || [] },
      buyers: buyersQuery.users,
      save,
      isSubmitted,
    };

    return <AuditSendForm {...extendedProps} />;
  }
}

AuditContainer.propTypes = {
  companiesQuery: PropTypes.object,
  addAuditMutation: PropTypes.func,
};

const WithData = compose(
  graphql(gql(mutations.addAudit), {
    name: 'addAuditMutation',
  }),
  graphql(gql(companyQueries.simpleCompanies), {
    name: 'selectedCompaniesQuery',
    options: ({ location }) => {
      return {
        variables: {
          _ids: (location.state || {}).supplierIds,
        },
        notifyOnNetworkStatusChange: true,
      };
    },
  }),
  graphql(gql(userQueries.simpleUsers), {
    name: 'buyersQuery',
  })
)(AuditContainer);

export default generator(WithData, 'audit');
