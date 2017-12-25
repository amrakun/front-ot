import React from 'react';
import PropTypes from 'prop-types';
import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { stateToHTML } from 'draft-js-export-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class EmailEditor extends React.Component {
  constructor(props) {
    super(props);

    const { contentBlocks, entityMap } = htmlToDraft(props.content);
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );

    this.state = {
      editorState: EditorState.createWithContent(contentState)
    };

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  onEditorStateChange(editorState) {
    this.setState({ editorState });
    this.props.onEmailContentChange(
      stateToHTML(editorState.getCurrentContent())
    );
  }

  render() {
    const { editorState } = this.state;

    return (
      <Editor
        editorState={editorState}
        onEditorStateChange={this.onEditorStateChange}
      />
    );
  }
}

EmailEditor.propTypes = {
  onEmailContentChange: PropTypes.func,
  content: PropTypes.string
};

export default EmailEditor;
