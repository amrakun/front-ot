import React from 'react';
import PropTypes from 'prop-types';
import { queries } from '../graphql';
import { LogReport } from '../components';
import { exportFile } from 'modules/common/components';
import { withCurrentUser } from 'modules/auth/containers';

class LogReportContainer extends React.Component {
  constructor(props) {
    super(props);

    this.export = this.export.bind(this);
  }

  export(name, variables) {
    this.setState({ exportLoading: true });

    exportFile({
      query: queries[name],
      name: `${name}Query`,
      variables,
      onFinish: () => this.setState({ exportLoading: false })
    });
  }

  render() {
    const { currentUser } = this.props;

    if (currentUser.isSupplier) {
      return null;
    }

    const updatedProps = {
      ...this.props,
      export: this.export
    };

    return <LogReport {...updatedProps} />;
  }
}

LogReportContainer.propTypes = {
  location: PropTypes.object
};

export default withCurrentUser(LogReportContainer);
