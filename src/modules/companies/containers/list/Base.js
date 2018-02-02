import React from 'react';
import PropTypes from 'prop-types';
import { BaseList } from '../../components';
import { queries } from '../../graphql';
import generator from './generator';
import { exportFile } from 'modules/common/components';

class BaseListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      exportLoading: false
    };
  }

  render() {
    const { queryParams } = this.props;

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

    const extendedProps = {
      ...this.props,
      exportCompany,
      exportCompanies,
      exportLoading: this.state.exportLoading
    };

    return <BaseList {...extendedProps} />;
  }
}

BaseListContainer.propTypes = {
  companiesQuery: PropTypes.object,
  queryParams: PropTypes.object
};

export default generator(BaseListContainer, 'companies');
