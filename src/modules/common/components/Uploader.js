import React from 'react';
import PropTypes from 'prop-types';
import { message, Upload, Button, Icon } from 'antd';
import { uploadUrl } from 'modules/common/constants';

class Uploader extends React.Component {
  constructor(props) {
    super(props);

    const defaultFileList = this.props.defaultFileList || [];

    const fileList = defaultFileList.map((file, index) => ({
      uid: index,
      ...file
    }));

    this.state = { fileList };

    this.beforeUpload = this.beforeUpload.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  beforeUpload(file, fileList) {
    let status = true;

    for (const { name } of fileList || []) {
      if (
        name.includes('@') ||
        name.includes('+') ||
        name.includes('*') ||
        name.includes('$')
      ) {
        message.error(
          this.context.__('Invalid file name. Do not use @+*$ in file name')
        );

        status = false;

        break;
      }
    }

    return status;
  }

  onChange(e) {
    const { multiple, onChange } = this.props;
    const { file, fileList } = e;

    if (file.status === 'error') {
      return message.error(`${file.name} file upload failed.`);
    }

    if (file.status === 'removed') {
      this.setState({ fileList });
      return onChange(fileList);
    }

    if (fileList.length > 0) {
      if (multiple) {
        this.setState({ fileList });

        return onChange(
          fileList
            .filter(f => f.status !== 'uploading')
            .map(f => ({ name: f.name, url: f.response || f.url }))
        );
      }

      this.setState({ fileList: [file] });

      if (file.status !== 'uploading') {
        return onChange([{ name: file.name, url: file.response }]);
      }
    }

    return null;
  }

  render() {
    const { label = 'Click to upload' } = this.props;
    const { __ } = this.context;

    const extendedProps = {
      ...this.props,
      action: uploadUrl,
      onChange: this.onChange,
      beforeUpload: this.beforeUpload,
      fileList: this.state.fileList
    };

    const disabled = this.props.disabled;

    return (
      <Upload {...extendedProps}>
        <Button disabled={disabled}>
          {__(label)} <Icon type="upload" />
        </Button>
      </Upload>
    );
  }
}

Uploader.propTypes = {
  defaultFileList: PropTypes.array,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
};

Uploader.contextTypes = {
  __: PropTypes.func
};

export default Uploader;
