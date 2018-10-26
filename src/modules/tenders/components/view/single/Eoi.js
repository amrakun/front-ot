/* eslint-disable react/display-name */

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Table, message, Button, Icon } from 'antd';
import { readFileUrl } from 'modules/common/utils';
import Tender from './Tender';

class Eoi extends Tender {
  constructor(props, context) {
    super(props);

    this.state = {
      ...this.state,
      regretLetterContent: context.systemConfig.regretLetterTemplate || ''
    };

    this.handleEoiShortList = this.handleEoiShortList.bind(this);
    this.handleEoiBidderList = this.handleEoiBidderList.bind(this);
  }

  handleEoiShortList() {
    const { selectedCompanies } = this.state;

    if (selectedCompanies.length < 1) {
      message.error('Please select atleast one supplier!');
    } else {
      this.props.downloadReport(this.state.selectedCompanies, 'eoiShortList');
    }
  }

  handleEoiBidderList() {
    const { selectedCompanies } = this.state;

    if (selectedCompanies.length < 1) {
      message.error('Please select atleast one supplier!');
    } else {
      this.props.downloadReport(this.state.selectedCompanies, 'eoiBidderList');
    }
  }

  responseColumns() {
    return [
      { title: 'Document file name', dataIndex: 'name', key: '3' },
      {
        title: 'Submitted',
        key: '2',
        render: record => (record.isSubmitted ? 'Yes' : 'No')
      },
      {
        title: 'Picture',
        key: '5',
        render: record => {
          const file = record.file;

          if (Array.isArray(file)) {
            return file.map((f, index) => (
              <a
                key={index}
                onClick={() => window.open(readFileUrl(f.url))}
                target="_blank"
                style={{ marginRight: '6px' }}
              >
                File
                {index + 1}
              </a>
            ));
          }

          if (!file) {
            return '-';
          }

          return (
            <a
              onClick={() => window.open(readFileUrl(record.file.url))}
              target="_blank"
            >
              Download
            </a>
          );
        }
      },
      { title: 'Notes', dataIndex: 'notes', key: '4' }
    ];
  }

  renderResponseModal(record) {
    const { supplier, respondedDocuments } = record;

    const { basicInfo, businessInfo, healthInfo, shareholderInfo } = supplier;

    const {
      certificateOfRegistration,
      corporateStructure,
      totalNumberOfEmployees
    } = basicInfo || {};

    const { doesHaveCodeEthicsFile } = businessInfo || {};
    const { areHSEResourcesClearlyIdentifiedFile } = healthInfo || {};
    const { attachments } = shareholderInfo || {};

    const dataSource = [
      ...(respondedDocuments || []),
      {
        name: 'State registration certifcate (copy)',
        file: certificateOfRegistration,
        isSubmitted: certificateOfRegistration !== null
      },
      {
        name: 'HSE policy & procedures (copy)',
        file: areHSEResourcesClearlyIdentifiedFile,
        isSubmitted: areHSEResourcesClearlyIdentifiedFile !== null
      },
      {
        name: 'Business Code of Conduct (copy)',
        file: doesHaveCodeEthicsFile,
        isSubmitted: doesHaveCodeEthicsFile !== null
      },
      {
        name: 'Ownership/ shareholder information',
        file: attachments,
        isSubmitted: true
      },
      {
        name: 'Organization structure & Total manpower',
        file: null,
        isSubmitted: true,
        notes: `${corporateStructure}, ${totalNumberOfEmployees} employees`
      }
    ];

    return (
      <Table
        columns={[...this.responseColumns()]}
        rowKey={() => Math.random()}
        dataSource={dataSource}
      />
    );
  }

  render() {
    const tableOperations = [
      <Button onClick={this.handleEoiShortList} key={1}>
        EOI short list
        <Icon type="file-excel" />
      </Button>,
      <Button onClick={this.handleEoiBidderList} key={0}>
        EOI bidder list
        <Icon type="file-excel" />
      </Button>
    ];

    return (
      <div>
        {this.renderStats()}
        {this.renderTable({ tableOperations })}
      </div>
    );
  }
}

Eoi.propTypes = {
  data: PropTypes.array
};

Eoi.contextTypes = {
  systemConfig: PropTypes.object
};

export default withRouter(Eoi);
