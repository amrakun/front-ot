import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import router from 'modules/common/router';

const propTypes = {
  total: PropTypes.number,
  paramPrefix: PropTypes.string,
  history: PropTypes.object,
  location: PropTypes.object
};

class Paginator extends React.Component {
  onChange(current, pageSize) {
    const { history } = this.props;

    router.setParams(history, {
      [this.pageParamName()]: current,
      [this.perPageParamName()]: pageSize
    });
  }

  pageParamName() {
    return `${this.props.paramPrefix || ''}page`;
  }

  perPageParamName() {
    return `${this.props.paramPrefix || ''}perPage`;
  }

  render() {
    const { location, total } = this.props;
    const queryParams = queryString.parse(location.search);

    let perPage = queryParams[this.perPageParamName()];
    let page = queryParams[this.pageParamName()];

    perPage = perPage ? parseInt(perPage, 10) : 15;
    page = page ? parseInt(page, 10) : 1;

    return (
      <Pagination
        className="pagination"
        showSizeChanger
        showQuickJumper
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        onChange={(current, pageSize) => this.onChange(current, pageSize)}
        onShowSizeChange={(current, pageSize) =>
          this.onChange(current, pageSize)
        }
        pageSizeOptions={[
          '15',
          '20',
          '30',
          '50',
          '100',
          '200',
          '500',
          '1000',
          '5000'
        ]}
        current={page}
        pageSize={perPage}
        total={total}
      />
    );
  }
}

Paginator.propTypes = propTypes;

export default withRouter(Paginator);
