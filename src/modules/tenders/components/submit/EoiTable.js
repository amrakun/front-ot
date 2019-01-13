import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Checkbox, Input } from 'antd';
import { Uploader, T } from 'modules/common/components';
import { eoiProductsColumns } from '../../constants';

const { Column } = Table;

class EoiTable extends Component {
  constructor(props, context) {
    super(props, context);

    const { requestedDocuments, respondedDocuments } = props;

    const documents = [];
    const perDocumentStates = {};

    // data initialization
    if (requestedDocuments) {
      requestedDocuments.forEach((doc, i) => {
        const documentResponse = respondedDocuments[i] || {};
        const key = Math.random();

        const document = {
          key,
          document: doc,
          notes: documentResponse.notes,
          file: documentResponse.file,
          isSubmitted: documentResponse.isSubmitted
        };

        documents.push(document);

        perDocumentStates[`document__${key}`] = document;
      });
    }

    this.state = {
      documents,
      perDocumentStates
    };

    this.onChange = this.onChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }

  onChange() {
    const documents = [];

    // collect documents table values
    Object.keys(this.state).forEach(key => {
      if (key.startsWith('document__')) {
        documents.push({ ...this.state[key] });
      }
    });

    return this.props.onChange(documents);
  }

  onInputChange(e, name, recordKey) {
    const stateKey = `document__${recordKey}`;
    const document = this.state[stateKey] || {};

    let value;

    if (e.target) {
      if (e.target.value) {
        // input
        value = e.target.value;
      } else {
        // checkbox
        value = e.target.checked;
      }
    } else {
      //file
      value = e;
    }

    document[name] = value;

    this.setState({ [stateKey]: document }, () => this.onChange());
  }

  onFileChange(files, name, recordKey) {
    const stateKey = `document__${recordKey}`;
    const document = this.state[stateKey] || {};

    document[name] = files ? files[0] : null;

    this.setState({ [stateKey]: document }, () => this.onChange());
  }

  renderCell(options) {
    const { name, title, type, width = 140 } = options;
    const { __ } = this.context;

    const render = (text, record) => {
      let defaultValue = record[name];

      const inputProps = {
        defaultValue,
        type,
        onChange: e => this.onInputChange(e, name, record.key)
      };

      if (name === 'document') {
        if (defaultValue) {
          defaultValue = __(record[name]);
        }

        inputProps.disabled = true;
      }

      let control = <Input {...inputProps} />;

      if (type === 'uploader') {
        control = (
          <Uploader
            defaultFileList={[record[name]]}
            onChange={files => this.onFileChange(files, name, record.key)}
          />
        );
      }

      if (type === 'checkbox') {
        control = (
          <Checkbox
            defaultChecked={record[name]}
            onChange={e => this.onInputChange(e, name, record.key)}
          >
            <T id="submitted">Submitted</T>
          </Checkbox>
        );
      }

      return control;
    };

    return (
      <Column
        title={title}
        key={name}
        dataIndex={name}
        render={render}
        width={width}
      />
    );
  }

  render() {
    const { __ } = this.context;
    const { documents } = this.state;

    return (
      <Table
        className="margin form-table"
        dataSource={documents}
        pagination={false}
        size="middle"
        scroll={{ x: 600, y: '65vh' }}
      >
        {this.renderCell({
          name: 'document',
          title: __(eoiProductsColumns.document)
        })}

        {this.renderCell({
          name: 'isSubmitted',
          title: __(eoiProductsColumns.isSubmitted),
          type: 'checkbox'
        })}

        {this.renderCell({
          name: 'file',
          title: __('Upload'),
          type: 'uploader',
          width: '100px'
        })}

        {this.renderCell({
          name: 'notes',
          title: __(eoiProductsColumns.notes)
        })}
      </Table>
    );
  }
}

EoiTable.propTypes = {
  requestedDocuments: PropTypes.array,
  respondedDocuments: PropTypes.array,
  onChange: PropTypes.func
};

EoiTable.contextTypes = {
  __: PropTypes.func
};

export default EoiTable;
