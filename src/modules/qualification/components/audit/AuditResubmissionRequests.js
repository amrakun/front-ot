/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Card, Row, Col, Button, Modal, DatePicker } from 'antd';
import { Common, Sidebar } from 'modules/companies/components';
import { dateTimeFormat } from 'modules/common/constants';
import { Search } from 'modules/common/components';

class Requests extends Common {
  renderEnablePopup() {
    const { showPopup, currentRecordId } = this.state;
    const { toggleState } = this.props;

    const hideModal = () => this.setState({ showPopup: false });
    const onOkClick = () => toggleState(currentRecordId, this.state.editableDate);

    const onDateChange = date => {
      this.setState({ editableDate: date.toDate() });
    };

    if (!showPopup) {
      return null;
    }

    return (
      <Modal title="Enable" visible={true} onOk={onOkClick} onCancel={hideModal}>
        <div>
          <label>Date: </label>
          <DatePicker format={dateTimeFormat} showTime onChange={onDateChange} />
        </div>
      </Modal>
    );
  }

  render() {
    const { toggleState, totalCount } = this.props;

    const columns = this.getWrappedColumns(
      [
        {
          key: 'isQualified',
          title: 'Is qualified',
          dataIndex: 'qualificationStatusDisplay',
        },
      ],
      [
        {
          key: 'actions',
          title: 'Actions',
          render: record => {
            const onDisableClick = () => toggleState(record._id);
            const onEnableClick = () =>
              this.setState({ showPopup: true, currentRecordId: record._id });

            const { isEditable, showToggleButton } = record.qualificationState;

            if (!showToggleButton) {
              return;
            }

            if (isEditable) {
              return (
                <Button type="danger" size="small" onClick={onDisableClick}>
                  Disable
                </Button>
              );
            } else {
              return (
                <Button type="primary" size="small" onClick={onEnableClick}>
                  Enable
                </Button>
              );
            }
          },
        },
      ]
    );

    return (
      <Row gutter={16}>
        <Sidebar suppliersCount={totalCount} />

        <Col span={19}>
          <Card title="Suppliers">
            <div className="table-operations">
              <Search />
              <div style={{ clear: 'both' }} />
            </div>
            {this.renderTable({ columns })}
            {this.renderEnablePopup()}
          </Card>
        </Col>
      </Row>
    );
  }
}

export default withRouter(Requests);
