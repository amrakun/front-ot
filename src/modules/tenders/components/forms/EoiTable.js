import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Button, Icon } from 'antd';
import {
  eoiProductsColumns,
  initialDocuments,
  initialPerDocuments
} from '../../constants';

const { Column } = Table;

class EoiTable extends Component {
  constructor(props, context) {
    super(props, context);

    const { requestedDocuments = [] } = props;

    const documents = [];
    const perDocumentStates = {};

    requestedDocuments.forEach(document => {
      const key = Math.random();
      const extendedDocument = { key, value: document };

      documents.push(extendedDocument);

      perDocumentStates[`document__${key}`] = extendedDocument;
    });

    this.state = {
      documents,
      ...perDocumentStates
    };

    if (this.state.documents.length === 0) {
      this.state.documents = initialDocuments;
      this.state.perDocumentStates = initialPerDocuments;
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addRow = this.addRow.bind(this);
  }

  onChange() {
    const documents = [];

    Object.keys(this.state).forEach(key => {
      if (key.startsWith('document__')) {
        documents.push(this.state[key].value);
      }
    });

    this.props.onChange(documents);
  }

  onInputChange(e, key) {
    const stateKey = `document__${key}`;
    const document = this.state[stateKey] || {};

    document.value = e.target.value;

    this.setState({ [stateKey]: document }, () => this.onChange());
  }

  addRow() {
    const { documents } = this.state;

    documents.push({ key: Math.random(), value: '' });

    this.setState({ documents });
  }

  render() {
    const { __ } = this.context;
    const { documents } = this.state;

    return (
      <>
        <Table
          className="margin form-table"
          dataSource={documents}
          pagination={false}
          size="middle"
          scroll={{ x: 600, y: '65vh' }}
        >
          <Column
            title={__(eoiProductsColumns.document)}
            key="document"
            dataIndex={'document'}
            render={(text, record) => {
              return (
                <Input
                  defaultValue={record.value}
                  onChange={e => this.onInputChange(e, record.key)}
                />
              );
            }}
          />
        </Table>

        <Button
          className="dashed-button-big"
          size="large"
          onClick={this.addRow}
        >
          <Icon type="plus" /> Add row
        </Button>
      </>
    );
  }
}

EoiTable.propTypes = {
  requestedDocuments: PropTypes.array,
  onChange: PropTypes.func
};

EoiTable.contextTypes = {
  __: PropTypes.func
};

export default EoiTable;
