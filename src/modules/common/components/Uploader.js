import React from 'react';
import PropTypes from 'prop-types';
import { Upload, message, Button, Icon } from 'antd';
import { uploadUrl } from 'modules/common/constants';
import { T } from 'modules/common/components';

class Uploader extends React.Component {
  constructor(props) {
    super(props);

    const { defaultFileList } = this.props;

    const fileList = (defaultFileList || []).map((file, index) => ({
      uid: index,
      ...file
    }));

    this.state = { fileList };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { multiple, onChange } = this.props;
    const { file, fileList } = e;

    if (file.status === 'error') {
      return message.error(`${file.name} file upload failed.`);
    }

    if (file.status === 'removed') {
      this.setState({ fileList });
      return onChange(null);
    }

    if (fileList.length > 0) {
      if (multiple) {
        this.setState({ fileList });
        return onChange(
          fileList.map(f => ({ name: f.name, url: f.response || f.url }))
        );
      } else {
        this.setState({ fileList: [file] });
        return onChange([{ name: file.name, url: file.response }]);
      }
    }

    return null;
  }

  render() {
    const { label = 'Click to upload' } = this.props;

    const extendedProps = {
      ...this.props,
      action: uploadUrl,
      onChange: this.onChange,
      fileList: this.state.fileList
    };

    return (
      <Upload {...extendedProps}>
        <Button>
          <Icon type="upload" /> <T id="upload">{label}</T>
        </Button>
      </Upload>
    );
  }
}

Uploader.propTypes = {
  defaultFileList: PropTypes.array,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  onChange: PropTypes.func
};

export default Uploader;
