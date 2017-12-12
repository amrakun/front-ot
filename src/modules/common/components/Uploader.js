import React from 'react';
import PropTypes from 'prop-types';
import { Upload, message, Button, Icon } from 'antd';

class Uploader extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(info) {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);

      return this.props.onReceiveFile(info.file, info.fileList);
    }

    if (info.file.status === 'removed') {
      return this.props.onReceiveFile(info.file, info.fileList);
    }

    if (info.file.status === 'error') {
      return message.error(`${info.file.name} file upload failed.`);
    }
  }

  render() {
    const { REACT_APP_API_URL } = process.env;
    const uploadUrl = `${REACT_APP_API_URL}/upload-file`;

    const { initialFile, initialFiles } = this.props;

    const defaultFileList = (initialFiles || []).map((file, index) => ({
      uid: index,
      ...file
    }));

    if (initialFile) {
      defaultFileList.push({ uid: 1, ...initialFile });
    }

    const extendedProps = {
      ...this.props,
      action: uploadUrl,
      defaultFileList,
      onChange: this.onChange
    };

    return (
      <Upload {...extendedProps}>
        <Button>
          <Icon type="upload" /> Click to upload
        </Button>
      </Upload>
    );
  }
}

Uploader.propTypes = {
  onReceiveFile: PropTypes.func,
  initialFile: PropTypes.object,
  initialFiles: PropTypes.array
};

export default Uploader;
