/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Card, Row, Col, Button, Icon, DatePicker } from 'antd';
import { Uploader, Search } from 'modules/common/components';
import { Common, Sidebar } from 'modules/companies/components';
import { dateFormat } from 'modules/common/constants';
import moment from 'moment';

class DueDiligence extends Common {
  constructor(props) {
    super(props);

    this.reports = {};
  }

  handleUpload(files, id) {
    this.reports[id] = { ...this.reports[id], file: files[0] };
  }

  handleDateChange(date, id) {
    this.reports[id] = { ...this.reports[id], expireDate: date };
  }

  render() {
    const { data, addDueDiligence, exportExcel } = this.props;
    const { selectedCompanies } = this.state;

    const columns = this.getWrappedColumns([
      {
        title: 'Report',
        render: record => (
          <Uploader onChange={files => this.handleUpload(files, record._id)} />
        )
      },
      {
        title: 'Expiration date',
        render: record => {
          const lastDueDiligence = record.lastDueDiligence || {};
          const date = lastDueDiligence.expireDate;

          return (
            <DatePicker
              defaultValue={date && moment(date)}
              format={dateFormat}
              onChange={value => this.handleDateChange(value, record._id)}
            />
          );
        }
      },
      {
        title: 'Last report file',
        render: record => {
          const lastDueDiligence = record.lastDueDiligence || {};
          const file = lastDueDiligence.file;

          return file ? (
            <a href={file.url} target="_blank">
              View
            </a>
          ) : (
            '-'
          );
        }
      },
      {
        title: 'Submission date',
        render: record => {
          const lastDueDiligence = record.lastDueDiligence || {};
          const file = lastDueDiligence.file;

          return file ? moment(lastDueDiligence.date).format(dateFormat) : '-';
        }
      }
    ]);

    return (
      <Row gutter={16}>
        <Sidebar suppliersCount={data && data.length} />

        <Col span={19}>
          <Card title="Suppliers">
            <div className="table-operations">
              <Search />

              <Button onClick={exportExcel}>
                Export excel
                <Icon type="file-excel" />
              </Button>
              <Button
                type="primary"
                onClick={() => addDueDiligence(this.reports)}
              >
                Save
              </Button>
            </div>

            {this.renderTable({
              rowSelection: {
                selectedCompanies,
                onChange: this.onSelectedCompaniesChange
              },
              columns
            })}
          </Card>
        </Col>
      </Row>
    );
  }
}

export default withRouter(DueDiligence);
