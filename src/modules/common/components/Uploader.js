import React from 'react';
import PropTypes from 'prop-types';
import { Upload, message, Button, Icon } from 'antd';
import { uploadUrl } from 'modules/common/constants';
import { _t } from 'modules/common/components';

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
    const {
      initialFile,
      initialFiles,
      label = 'Click to upload',
      onReceiveFile
    } = this.props;

    const extendedProps = {
      ...this.props,
      action: uploadUrl
    };

    if (onReceiveFile) {
      const defaultFileList = (initialFiles || []).map((file, index) => ({
        uid: index,
        ...file
      }));

      if (initialFile) {
        defaultFileList.push({ uid: 1, ...initialFile });
      }

      extendedProps.onChange = this.onChange;
      extendedProps.defaultFileList = defaultFileList;
    }

    return (
      <Upload {...extendedProps}>
        <Button>
          <Icon type="upload" /> <_t id="upload">{label}</_t>
        </Button>
      </Upload>
    );
  }
}

Uploader.propTypes = {
  onReceiveFile: PropTypes.func,
  initialFile: PropTypes.object,
  initialFiles: PropTypes.array,
  label: PropTypes.string
};

export default Uploader;
