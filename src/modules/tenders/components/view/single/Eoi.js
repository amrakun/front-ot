/* eslint-disable react/display-name */

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Table, message, Button, Icon, Tabs } from 'antd';
import { readFileUrl } from 'modules/common/utils';
import Tender from './Tender';
import { TenderMessagesSingle } from 'modules/tender_messages/containers/';
import { ListForTender } from 'modules/tender_log/containers/';

const { TabPane } = Tabs;

class Eoi extends Tender {
  constructor(props, context) {
    super(props);

    this.state = {
      ...this.state,
      regretLetterContent: context.systemConfig.regretLetterTemplate || '',
    };

    this.handleEoiShortList = this.handleEoiShortList.bind(this);
    this.handleEoiBidderList = this.handleEoiBidderList.bind(this);
    this.downloadRespondedFiles = this.downloadRespondedFiles.bind(this);
  }

  downloadRespondedFiles() {
    const { REACT_APP_API_URL } = process.env;
    const { tenderDetail } = this.props;

    window.open(`${REACT_APP_API_URL}/download-tender-files?tenderId=${tenderDetail._id}`, '__blank');
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
        render: record => (record.isSubmitted ? 'Yes' : 'No'),
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
                href="#file"
                target="__blank"
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
              href="#download"
              onClick={() => window.open(readFileUrl(record.file.url))}
              target="__blank"
            >
              Download
            </a>
          );
        },
      },
      { title: 'Notes', dataIndex: 'notes', key: '4' },
    ];
  }

  renderResponseModal(record) {
    const { supplier, respondedDocuments } = record;

    const { basicInfo, businessInfo, healthInfo, shareholderInfo } = supplier;

    const { certificateOfRegistration, corporateStructure, totalNumberOfEmployees } =
      basicInfo || {};

    const { doesHaveCodeEthicsFile } = businessInfo || {};
    const { areHSEResourcesClearlyIdentifiedFile } = healthInfo || {};
    const { attachments } = shareholderInfo || {};

    const dataSource = [
      ...(respondedDocuments || []),
      {
        name: 'State registration certifcate (copy)',
        file: certificateOfRegistration,
        isSubmitted: certificateOfRegistration !== null,
      },
      {
        name: 'HSE policy & procedures (copy)',
        file: areHSEResourcesClearlyIdentifiedFile,
        isSubmitted: areHSEResourcesClearlyIdentifiedFile !== null,
      },
      {
        name: 'Business Code of Conduct (copy)',
        file: doesHaveCodeEthicsFile,
        isSubmitted: doesHaveCodeEthicsFile !== null,
      },
      {
        name: 'Ownership/ shareholder information',
        file: attachments,
        isSubmitted: true,
      },
      {
        name: 'Organization structure & Total manpower',
        file: null,
        isSubmitted: true,
        notes: `${corporateStructure}, ${totalNumberOfEmployees} employees`,
      },
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
      </Button>,
      <Button onClick={this.downloadRespondedFiles} key={2}>
        Download files
        <Icon type="file-excel" />
      </Button>,
    ];

    return (
      <div>
        <Tabs defaultActiveKey={'1'}>
          <TabPane tab="Main" key="1">
            {this.renderStats()}
            {this.renderTable({ tableOperations })}
          </TabPane>
          <TabPane tab="Messages" key="2">
            <TenderMessagesSingle
              tenderDetail={this.props.tenderDetail}
              queryParams={this.props.queryParams}
            />
          </TabPane>
          <TabPane tab="Log" key="3">
            <ListForTender _id={this.props.tenderDetail._id} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

Eoi.propTypes = {
  data: PropTypes.array,
};

Eoi.contextTypes = {
  systemConfig: PropTypes.object,
};

export default withRouter(Eoi);
