import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Tabs, Input, Tag, Icon } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import AddMore from '../list/AddMore';

const propTypes = {
  company: PropTypes.object,
  location: PropTypes.object
};
const TabPane = Tabs.TabPane;

class SendRfq extends React.Component {
  render() {
    const { suppliers } = this.props.location.state;
    const supplierItems = suppliers.map((el, i) => <Tag key={i}>{el}</Tag>);

    return (
      <div className="card-container">
        <Tabs type="card">
          <TabPane tab="Publish RFQ" key="1">
            <label>Sending RFQ to: </label>
            {supplierItems}
            <AddMore withTag={true} />
            <Editor />
          </TabPane>
          <TabPane tab="Form" key="2">
            Form
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

SendRfq.propTypes = propTypes;

export default withRouter(SendRfq);
