import React from 'react';
import PropTypes from 'prop-types';
import { queries } from '../graphql';
import { LogReport } from '../components';
import { exportFile } from 'modules/common/components';

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

export default LogReportContainer;
