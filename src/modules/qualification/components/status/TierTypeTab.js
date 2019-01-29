import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Form, Button, Icon } from 'antd';
import TierTypeForm from './TierTypeForm';

class TierTypeTab extends React.Component {
  render() {
    const { companyInfo, title, data, saveTierType, previousTab } = this.props;

    return (
      <div>
        <TierTypeForm
          title={title}
          initialValue={data}
          saveTierType={saveTierType}
          companyInfo={companyInfo}
          renderButtons={save => (
            <div>
              <Button onClick={previousTab}>
                <Icon type="left" /> Back
              </Button>

              <Button
                style={{ float: 'right', marginLeft: '8px' }}
                type="primary"
                htmlType="submit"
                onClick={save}
              >
                Save
                <Icon type="right" />
              </Button>
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
  saveTierType: PropTypes.func,
};

const TierTypeTabForm = Form.create()(TierTypeTab);

export default withRouter(TierTypeTabForm);
