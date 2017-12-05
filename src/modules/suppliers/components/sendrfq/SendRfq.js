import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Tabs, Input, Tag, Icon } from 'antd';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import AddMore from '../list/AddMore';

const propTypes = {
  company: PropTypes.object,
  location: PropTypes.object
};
const TabPane = Tabs.TabPane;

class SendRfq extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }
  onEditorStateChange = editorState => {
    this.setState({ editorState });
  };
  render() {
    const { suppliers } = this.props.location.state;
    const { editorState } = this.state;
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));

    const supplierItems = suppliers.map((el, i) => (
      <Tag key={i}>{el.basicInfo.enName}</Tag>
    ));

    return (
      <div className="card-container">
        <Tabs type="card">
          <TabPane tab="Publish RFQ" key="1">
            <label>Sending RFQ to: </label>
            {supplierItems}
            <AddMore withTag={true} />
            <Editor
              editorState={editorState}
              onEditorStateChange={this.onEditorStateChange}
            />
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
