import CKEditor from 'ckeditor4-react';
import colors from 'modules/common/styles/colors';
import React from 'react';

class EditorCK extends React.Component {
  constructor(props) {
    super(props);

    CKEditor.editorUrl = '/ckeditor/ckeditor.js';
  }

  render() {
    const {
      content,
      onChange,
      height = 400,
      insertItems,
      removeButtons,
      toolbar,
      toolbarCanCollapse,
    } = this.props;

    const onFileUploadRequest = function(event) {
      var fileLoader = event.data.fileLoader;
      fileLoader.xhr.withCredentials = true;
    };

    return (
      <CKEditor
        data={content}
        onChange={onChange}
        onFileUploadRequest={onFileUploadRequest}
        config={{
          height,
          uiColor: colors.bgLight,
          dialog_backgroundCoverColor: '#30435C',
          allowedContent: true,
          extraPlugins: 'codemirror,strinsert',
          strinsert: insertItems,
          autoGrowOnStartup: true,
          toolbar: toolbar || [
            {
              name: 'document',
              groups: ['mode', 'document', 'doctools'],
              items: ['Source', 'NewPage', 'Preview'],
            },
            {
              name: 'insert',
              items: ['Image', 'Table', 'HorizontalRule', 'EmojiPanel', 'SpecialChar'],
            },
            {
              name: 'paragraph',
              groups: ['list', 'indent', 'blocks', 'align', 'bidi'],
              items: [
                'NumberedList',
                'BulletedList',
                'Outdent',
                'Indent',
                'Blockquote',
                'CreateDiv',
                'JustifyLeft',
                'JustifyCenter',
                'JustifyRight',
                'JustifyBlock',
              ],
            },
            {
              name: 'basicstyles',
              groups: ['basicstyles', 'cleanup'],
              items: ['Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat'],
            },
            { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
            { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
            { name: 'others', items: [insertItems ? 'strinsert' : '-'] },
            { name: 'colors', items: ['TextColor', 'BGColor'] },
            { name: 'tools', items: ['Maximize'] },
          ],
          removeButtons,
          codemirror: {
            enableCodeFormatting: false,
            enableCodeFolding: false,
            showSearchButton: false,
            showCommentButton: false,
            showUncommentButton: false,
            showFormatButton: false,
          },
          toolbarCanCollapse,
          filebrowserImageUploadUrl: `${process.env.REACT_APP_API_URL}/upload-file`,
        }}
      />
    );
  }
}

export default EditorCK;
