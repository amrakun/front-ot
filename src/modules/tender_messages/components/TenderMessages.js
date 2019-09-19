import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Button, Table, Icon, Card, Modal, Divider } from 'antd';
import { withRouter } from 'react-router-dom';
import { CreateTenderMessage } from '../containers/';
import TenderMessageDetail from '../containers/TenderMessageDetail';
import { Paginator } from 'modules/common/components';
import { renderDate, renderRecipient } from '../utils';

const ROUTE_ENUM = {
  index: 0,
  view: 1,
  new: 2,
  edit: 3,
  reply: 4,
};

const senderUsername = record => {
  const { senderSupplier, senderBuyer } = record;

  if (senderSupplier) {
    return senderSupplier.basicInfo.enName;
  }

  if (senderBuyer) {
    return 'OT';
  }
};

const AttachmentIcon = attachment => (attachment ? <Icon type="paper-clip" /> : undefined);

class Messages extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      route: 'index',
      tenderMessageDetail: undefined,
      windowWidth: 0,
      windowHeight: 0,
    };

    this.isNew = this.isNew.bind(this);
    this.renderActions = this.renderActions.bind(this);
    this.setAsRead = this.setAsRead.bind(this);
    this.downloadFiles = this.downloadFiles.bind(this);

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.renderRecipient = this.renderRecipient.bind(this);
  }

  renderRecipient(record) {
    const { currentUser } = this.context;

    return renderRecipient({ tenderMessage: record, currentUser });
  }

  columns() {
    const columns = [
      {
        title: 'Date',
        render: renderDate,
        width: 150,
        key: 9,
      },
      {
        title: 'From',
        render: senderUsername,
        width: 150,
        key: 1,
      },
      {
        title: 'To',
        render: this.renderRecipient,
        width: 150,
        key: 2,
      },
      {
        title: 'New',
        width: 60,
        render: this.isNew,
        key: 3,
      },
      {
        title: 'Subject',
        dataIndex: 'subject',
        width: 200,
        render: subject => {
          return <p style={{ padding: 0, margin: 0, maxWidth: '200px' }}>{subject}</p>;
        },
        key: 5,
      },
      {
        title: <Icon type="paper-clip" />,
        width: 30,
        dataIndex: 'attachment',
        render: AttachmentIcon,
        key: 6,
      },
      {
        title: 'Actions',
        key: 8,
        width: 100,
        render: this.renderActions,
      },
    ];
    return columns;
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
  }

  renderActions(tenderMessageDetail) {
    const { currentUser } = this.context;
    const { senderBuyer, senderSupplier } = tenderMessageDetail;

    let replyButton = null;

    if ((currentUser.isSupplier && senderBuyer) || (!currentUser.isSupplier && senderSupplier)) {
      replyButton = (
        <>
          <Divider type="vertical" />
          <Button
            key={`${tenderMessageDetail._id}reply`}
            onClick={this.goto.bind(this, ROUTE_ENUM.reply, tenderMessageDetail)}
          >
            Reply
          </Button>
        </>
      );
    }

    return (
      <>
        <Button
          key={`${tenderMessageDetail._id}view`}
          onClick={this.goto.bind(this, ROUTE_ENUM.view, tenderMessageDetail)}
        >
          View
        </Button>
        {replyButton}
      </>
    );
  }

  isNew(record) {
    const { isRead, senderSupplier, senderBuyer } = record;
    const { currentUser } = this.context;

    if (currentUser.isSupplier && senderBuyer) {
      return isRead ? undefined : <Icon type="info-circle" />;
    }

    if (!currentUser.isSupplier && senderSupplier) {
      return isRead ? undefined : <Icon type="info-circle" />;
    }
  }

  goto(route, tenderMessageDetail) {
    this.setState({ route, tenderMessageDetail });

    if (route === ROUTE_ENUM.view) {
      this.setAsRead(tenderMessageDetail);

      this.props.writeTenderLog({
        variables: {
          tenderId: this.props.tenderDetail._id,
          action: 'view',
          description: `Viewed message with subject "${tenderMessageDetail.subject}"`,
        },
      });
    }
  }

  downloadFiles() {
    const { REACT_APP_API_URL } = process.env;
    const { tenderDetail, writeTenderLog } = this.props;

    writeTenderLog({
      variables: {
        tenderId: tenderDetail._id,
        action: 'download',
        description: 'Tender message files have been downloaded',
      },
    });

    window.open(
      `${REACT_APP_API_URL}/download-tender-message-files?tenderId=${tenderDetail._id}`,
      '__blank'
    );
  }

  setAsRead(tenderMessageDetail) {
    if (!tenderMessageDetail.isRead) {
      const { senderSupplier, senderBuyer } = tenderMessageDetail;
      const { currentUser } = this.context;
      if (
        // supplier -> buyer
        (!currentUser.isSupplier && senderSupplier) ||
        // buyer -> supplier
        (currentUser.isSupplier && senderBuyer)
      ) {
        const { tenderMessageSetAsRead } = this.props;
        tenderMessageSetAsRead({ variables: { _id: tenderMessageDetail._id } });
      }
    }
  }

  renderNested() {
    const { currentUser } = this.context;
    const { route, tenderMessageDetail } = this.state;
    const _id = tenderMessageDetail ? tenderMessageDetail._id : null;
    const modalWidth = this.state.windowWidth * 0.8;

    return (
      <>
        <Modal
          visible={route === ROUTE_ENUM.new}
          footer={null}
          maskClosable={false}
          onCancel={this.goto.bind(this, ROUTE_ENUM.index, null)}
          title="New message"
          width={modalWidth}
        >
          <CreateTenderMessage
            key={Math.random()}
            currentUser={currentUser}
            tenderDetail={this.props.tenderDetail}
            onComplete={this.goto.bind(this, ROUTE_ENUM.index, null)}
            width={modalWidth}
          />
        </Modal>

        <Modal
          visible={route === ROUTE_ENUM.view}
          footer={null}
          maskClosable={false}
          onCancel={this.goto.bind(this, ROUTE_ENUM.index, null)}
          title="View"
          width={modalWidth}
        >
          {_id ? <TenderMessageDetail currentUser={currentUser} _id={_id} /> : null}
        </Modal>

        <Modal
          visible={route === ROUTE_ENUM.reply}
          footer={null}
          maskClosable={false}
          onCancel={this.goto.bind(this, ROUTE_ENUM.index, null)}
          title="Reply"
          width={modalWidth}
        >
          <CreateTenderMessage
            key={_id}
            currentUser={currentUser}
            replyTo={this.state.tenderMessageDetail}
            tenderDetail={this.props.tenderDetail}
            onComplete={this.goto.bind(this, ROUTE_ENUM.index, null)}
          />
        </Modal>
      </>
    );
  }

  render() {
    const { tenderMessagesQuery, tenderMessageTotalCountQuery } = this.props;
    const { tenderMessages } = tenderMessagesQuery;
    const totalCount = tenderMessageTotalCountQuery.tenderMessageTotalCount || 0;

    return (
      <>
        <Row>
          <div className="table-operations">
            <Button type="default" onClick={this.downloadFiles}>
              Download files
            </Button>

            <Button
              type="primary"
              icon="plus"
              onClick={this.goto.bind(this, ROUTE_ENUM.new, undefined)}
            >
              Create message
            </Button>
          </div>
        </Row>
        <Row>
          <Card>
            <Table
              columns={this.columns()}
              rowKey={({ _id }) => _id}
              rowClassName={({ isRead }) => (isRead ? undefined : 'message-new')}
              pagination={false}
              dataSource={tenderMessages}
            />
            <Paginator total={totalCount} />
          </Card>
        </Row>
        <Row>
          <Card>{this.renderNested()}</Card>
        </Row>
      </>
    );
  }
}

Messages.propTypes = {
  tenderDetail: PropTypes.object,
  tenderMessagesQuery: PropTypes.object,
  suppliers: PropTypes.array,
  tenderMessageSetAsRead: PropTypes.func,
  tenderMessageTotalCountQuery: PropTypes.object,
  writeTenderLog: PropTypes.func,
};

Messages.contextTypes = {
  currentUser: PropTypes.object,
};

export default withRouter(Messages);
