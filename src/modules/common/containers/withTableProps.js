import React from 'react';

const generator = Component => {
  class Container extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        pagination: {
          pageSize: 10,
          current: 1
        }
      };

      this.handleTableChange = this.handleTableChange.bind(this);
    }

    handleTableChange(pagination) {
      this.setState({ pagination });
    }

    render() {
      const { pagination } = this.state;

      const updatedProps = {
        ...this.props,
        pagination: {
          total: 10,
          pageSize: pagination.pageSize,
          current: pagination.current
        },
        loading: false,
        onChange: (pagination, filters, sorter) =>
          this.handleTableChange(pagination, filters, sorter)
      };

      return <Component {...updatedProps} />;
    }
  }

  return Container;
};

export default generator;
