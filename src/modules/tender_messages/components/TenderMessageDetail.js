import React from 'react';
import moment from 'moment';
import { Form, Input, Tag, Divider, Button, Icon, Col, Row, message } from 'antd';
import { readFileUrl } from 'modules/common/utils';
import { dateTimeFormat } from 'modules/common/constants';
import { Uploader } from 'modules/common/components';
import { Editor } from 'modules/common/components/';

const { Item } = Form;

const renderUser = user => (
  <Tag key={user.email}>
    {user.username}
    {'<'}
    {user.email}
    {'>'}
  </Tag>
);

const renderCompany = ({ _id, basicInfo: { enName, email } }) => (
  <Tag key={_id}>
    {enName}
    {' <'}
    {email}
    {'>'}
  </Tag>
);

const Sender = ({ senderBuyer, senderSupplier }) => {
  if (senderBuyer) {
    return (
      <Row>
        <Col span={2}>From: </Col>
        <Col span={22}><Tag>OT</Tag></Col>
      </Row>
    );
  }

  if (senderSupplier) {
    return (
      <Row>
        <Col span={2}>From: </Col>
        <Col span={22}>{renderCompany(senderSupplier)}</Col>
      </Row>
    );
  }
};

const Receivers = ({ recipientSuppliers, tender }) => {
  if (recipientSuppliers && recipientSuppliers.length > 0) {
    return (
      <Row>
        <Col span={2}>To: </Col>
        <Col span={22}>{recipientSuppliers.map(renderCompany)}</Col>
      </Row>
    );
  }
  return (
    <Row>
      <Col span={2}>To: </Col>
      <Col span={22}>{renderUser({ username: 'Tender', email: tender.number })}</Col>
    </Row>
  );
};

const Attachment = ({ attachment }) => {
  if (!attachment || !attachment.url) {
    return null;
  }

  return (
    <Row>
      <Col span={2}>Attachment: </Col>

      <Col span={22}>
        <p>
          <a href={readFileUrl(attachment.url)}>
            <Icon type="paper-clip" />
            Download attachment
          </a>
        </p>
      </Col>
    </Row>
  );
};

class TenderMessageDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: undefined,
      fileURL: undefined,
      editorHTMLContent: '',
      recipientSupplierIds: [],
      replyToId: null,
    }

    this.onEmailContentChange = editorHTMLContent => this.setState({ editorHTMLContent });
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onFileChange(files) {
    this.setState({
      fileName: files[0].name,
      fileURL: files[0].url,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      const { reply, tenderMessageDetail } = this.props;
      const { fileName, fileURL } = this.state;

      if (err) {
        return message.error(err);
      }

      reply({
        ...values,
        tenderId: tenderMessageDetail.tenderId,
        replyToId: this.state.replyToId,
        recipientSupplierIds: this.state.recipientSupplierIds,
        body: this.state.editorHTMLContent,
        attachment: fileName && fileURL ? { name: fileName, url: fileURL } : undefined
      }, () => {
        this.setState({ replyToId: null, recipientSupplierIds: [] });
        message.success('Success');
      });
    });
  }

  renderReplyForm(tenderMessage) {
    const { replyToId } = this.state;

    if (tenderMessage._id === replyToId) {
      const { getFieldDecorator } = this.props.form;

      return (
        <Row>
          <Col span={2}>Reply: </Col>
          <Col span={22} style={{ maxWidth: '800px' }}>
            <Form layout="vertical" onSubmit={this.handleSubmit} style={{ backgroundColor: '#f9f9f9', padding: '5px 10px' }}>
              <Item label="Subject">
                {getFieldDecorator('subject', {
                  rules: [{ required: true }],
                })(<Input placeholder="subject" autoFocus={true} />)}
              </Item>

              <Item label="Attachment">
                <Uploader onChange={this.onFileChange.bind(this)} />
              </Item>

              <Item label="Message">
                <Editor
                  content={this.state.editorHTMLContent}
                  onEmailContentChange={this.onEmailContentChange}
                />
              </Item>

              <Item>
                <div style={{ float: 'right' }}>
                  <Button
                    type="danger"
                    style={{ marginRight: '5px' }}
                    onClick={() => this.setState({ replyToId: null, recipientSupplierIds: [] })}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="primary"
                    htmlType="submit"
                  >
                    Send
                  </Button>
                </div>
              </Item>
            </Form>
          </Col>
        </Row>
      )
    }
  }

  renderReplyButtons(tenderMessage) {
    const { currentUser } = this.props;
    const { senderSupplier } = tenderMessage;

    if (!currentUser.isSupplier && senderSupplier) {
      const reply = () => {
        this.setState({
          replyToId: tenderMessage._id,
          recipientSupplierIds: [senderSupplier._id]
        });
      }

      return (
        <div style={{ float: 'right' }}>
          <Button onClick={reply}>Reply</Button>
        </div>
      )
    }
  }

  renderMessage(tenderMessage) {
    return (
      <>
        <Row>
          <Col span={2}>Date: </Col>
          <Col span={22}><p>{moment(tenderMessage.createdAt).format(dateTimeFormat)}</p></Col>

          {this.renderReplyButtons(tenderMessage)}
        </Row>

        <Sender {...tenderMessage} />
        <Receivers {...tenderMessage} />

        <Row>
          <Col span={2}>Subject: </Col>
          <Col span={22}><p>{tenderMessage.subject}</p></Col>
        </Row>

        <Attachment attachment={tenderMessage.attachment} />

        <Row>
          <Col span={2}>Content: </Col>
          <Col span={22} style={{ maxWidth: '800px' }}>
            <div dangerouslySetInnerHTML={{ __html: tenderMessage.body }} />
          </Col>
        </Row>
        {this.renderReplyForm(tenderMessage)}
      </>
    );
  }

  render() {
    const { tenderMessageDetail } = this.props;

    if (!tenderMessageDetail) return null;

    return (
      <div>
        {this.renderMessage(tenderMessageDetail)}
        <Divider />

        {tenderMessageDetail.relatedMessages.map((tenderMessage) => {
          return (
            <div key={tenderMessage._id}>
              {this.renderMessage(tenderMessage)}
              <Divider />
            </div>
          );
        })}
      </div>
    );
  }
};

const Wrapped = Form.create({})(TenderMessageDetail);
export default Wrapped;