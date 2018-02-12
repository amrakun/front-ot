import React from 'react';
import PropTypes from 'prop-types';
import { BaseList } from '../../components';
import { queries, mutations } from '../../graphql';
import generator from './generator';
import { exportFile } from 'modules/common/components';
import { gql, graphql } from 'react-apollo';
import { message } from 'antd';

class BaseListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      exportLoading: false
    };
  }

  render() {
    const { queryParams, sendEmail } = this.props;

    const exportCompanies = companies => {
      this.setState({ exportLoading: true });
      exportFile({
        query: queries.exportCompanies,
        variables: {
          search: queryParams.search,
          region: queryParams.region,
          status: queryParams.status,
          productCodes: queryParams.productCodes,
          _ids: companies
        },
        onFinish: () => this.setState({ exportLoading: false })
      });
    };

    const exportCompany = _id => {
      exportFile({
        query: queries.exportCompany,
        name: 'exportCompany',
        variables: { _id }
      });
    };

    const sendMassEmail = variables => {
      sendEmail({ variables })
        .then(() => {
          message.success('Successfully sent emails');
        })
        .catch(error => {
          message.error(error.message);
        });
    };

    const extendedProps = {
      ...this.props,
      exportCompany,
      exportCompanies,
      sendMassEmail,
      exportLoading: this.state.exportLoading
    };

    return <BaseList {...extendedProps} />;
  }
}

BaseListContainer.propTypes = {
  companiesQuery: PropTypes.object,
  queryParams: PropTypes.object,
  sendEmail: PropTypes.func
};

const WithData = graphql(gql(mutations.sendEmail), {
  name: 'sendEmail'
})(BaseListContainer);

export default generator(WithData, 'companies');
