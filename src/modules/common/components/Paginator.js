import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import router from 'modules/common/router';

const propTypes = {
  total: PropTypes.number,
  history: PropTypes.object,
  location: PropTypes.object
};

class Paginator extends React.Component {
  onChange(current, pageSize) {
    const { history } = this.props;

    router.setParams(history, { page: current, perPage: pageSize });
  }

  render() {
    const { location, total } = this.props;
    const queryParams = queryString.parse(location.search);

    let { perPage, page } = queryParams;

    perPage = perPage ? parseInt(perPage, 10) : 15;
    page = page ? parseInt(page, 15) : 1;

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
        pageSizeOptions={['15', '20', '30', '50', '100', '200', '500']}
        current={page}
        pageSize={perPage}
        total={total}
      />
    );
  }
}

Paginator.propTypes = propTypes;

export default withRouter(Paginator);
