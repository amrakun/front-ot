import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Form } from 'antd';
import { BaseForm } from 'modules/common/components';
import TierTypeForm from './TierTypeForm';

class TierTypeTab extends BaseForm {
  render() {
    const {
      statusData,
      title,
      data,
      saveTierType,
      prequalifySupplier
    } = this.props;

    return (
      <div>
        <TierTypeForm
          title={title}
          initialValue={data}
          prequalifySupplier={prequalifySupplier}
          saveTierType={saveTierType}
          companyInfo={statusData}
          renderButtons={save => (
            <div>
              {this.renderGoBack()}
              {this.renderSubmit('Save & submit', save)}
            </div>
          )}
        />
      </div>
    );
  }
}

TierTypeTab.propTypes = {
  title: PropTypes.string,
  data: PropTypes.string,
  prequalifySupplier: PropTypes.func,
  saveTierType: PropTypes.func
};

const TierTypeTabForm = Form.create()(TierTypeTab);

export default withRouter(TierTypeTabForm);
