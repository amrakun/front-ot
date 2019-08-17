import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Form, Input, Tag, Divider, Button, Icon, Col, Row, message } from 'antd';
import { readFileUrl } from 'modules/common/utils';
import { dateTimeFormat } from 'modules/common/constants';
import { Uploader } from 'modules/common/components';
import { EditorCK } from 'modules/common/components/';
import { renderRecipient, renderSupplierName } from '../utils';

const { Item } = Form;

const Sender = ({ senderBuyer, senderSupplier }) => {
  if (senderBuyer) {
    return (
      <Row>
        <Col span={2}>From: </Col>
        <Col span={22}>
          <Tag>OT</Tag>
        </Col>
      </Row>
    );
  }

  if (senderSupplier) {
    return (
      <Row>
        <Col span={2}>From: </Col>
        <Col span={22}>{renderSupplierName(senderSupplier)}</Col>
      </Row>
    );
  }
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
      recipientSuppliers: [],
      replyToId: null,
    };

    this.onEmailContentChange = e => this.setState({ editorHTMLContent: e.editor.getData() });
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
      const { fileName, fileURL, replyToId, editorHTMLContent, recipientSuppliers } = this.state;

      if (err) {
        return message.error(err);
      }

      reply(
        {
          ...values,
          tenderId: tenderMessageDetail.tenderId,
          replyToId: replyToId,
          recipientSupplierIds: recipientSuppliers.map(sup => sup._id),
          body: editorHTMLContent,
          attachment: fileName && fileURL ? { name: fileName, url: fileURL } : undefined,
        },
        () => {
          this.setState({ replyToId: null, recipientSuppliers: [] });
          message.success('Success');
        }
      );
    });
  }

  renderReplyForm() {
    const { form, tenderMessageDetail } = this.props;
    const { recipientSuppliers } = this.state;

    if (recipientSuppliers.length === 0) {
      return null;
    }

    const { getFieldDecorator } = form;

    return (
      <Row>
        <Col span={2}>Reply: </Col>
        <Col span={22} style={{ maxWidth: '800px' }}>
          <Form
            layout="vertical"
            onSubmit={this.handleSubmit}
            style={{ backgroundColor: '#f9f9f9', padding: '5px 10px', marginBottom: '20px' }}
          >
            <Item label="To">{recipientSuppliers.map(renderSupplierName)}</Item>

            <Item label="Subject">
              {getFieldDecorator('subject', {
                initialValue: tenderMessageDetail.subject,
                rules: [{ required: true }],
              })(<Input placeholder="subject" autoFocus={true} />)}
            </Item>

            <Item label="Attachment">
              <Uploader onChange={this.onFileChange.bind(this)} />
            </Item>

            <Item label="Message">
              <EditorCK
                content={this.state.editorHTMLContent}
                onChange={this.onEmailContentChange}
              />
            </Item>

            <Item>
              <div style={{ float: 'right' }}>
                <Button
                  type="danger"
                  style={{ marginRight: '5px' }}
                  onClick={() => this.setState({ replyToId: null, recipientSuppliers: [] })}
                >
                  Cancel
                </Button>

                <Button type="primary" htmlType="submit">
                  Send
                </Button>
              </div>
            </Item>
          </Form>
        </Col>
      </Row>
    );
  }

  renderTopReplyButtons() {
    const { tenderMessageDetail, currentUser } = this.props;

    if (!tenderMessageDetail) {
      return null;
    }

    if (currentUser.isSupplier) {
      return null;
    }

    const { senderSupplier, relatedMessages } = tenderMessageDetail;

    let replyButton;

    if (senderSupplier) {
      const reply = () => {
        this.setState({
          replyToId: tenderMessageDetail._id,
          recipientSuppliers: [senderSupplier],
        });
      };

      replyButton = (
        <Button style={{ marginRight: '5px' }} onClick={reply}>
          Reply
        </Button>
      );
    }

    let replyAllButton;

    const { rootMessage, list = [] } = relatedMessages;

    if (rootMessage) {
      const replyAll = () => {
        let editorHTMLContent = tenderMessageDetail.body;

        for (const message of list) {
          editorHTMLContent += `<p>---------------------------------------------------------------------------------------------------------------</p> ${
            message.body
          }`;
        }

        this.setState({
          editorHTMLContent,
          recipientSuppliers: rootMessage.recipientSuppliers,
        });
      };

      replyAllButton = <Button onClick={replyAll}>Reply All</Button>;
    }

    return (
      <>
        <div style={{ textAlign: 'right' }}>
          {replyButton}
          {replyAllButton}
        </div>

        <Divider />
      </>
    );
  }

  renderRecipient(tenderMessage) {
    const { currentUser } = this.context;

    return renderRecipient({ tenderMessage, currentUser, isDetailed: true });
  }

  renderMessage(tenderMessage) {
    return (
      <>
        <Row>
          <Col span={2}>Date: </Col>
          <Col span={22}>
            <p>{moment(tenderMessage.createdAt).format(dateTimeFormat)}</p>
          </Col>
        </Row>

        <Sender {...tenderMessage} />

        <Row>
          <Col span={2}>To: </Col>
          <Col span={22}>
            <p>{this.renderRecipient(tenderMessage)}</p>
          </Col>
        </Row>

        <Row>
          <Col span={2}>Subject: </Col>
          <Col span={22}>
            <p>{tenderMessage.subject}</p>
          </Col>
        </Row>

        <Attachment attachment={tenderMessage.attachment} />

        <Row>
          <Col span={2}>Content: </Col>
          <Col span={22} style={{ maxWidth: '800px' }}>
            <div dangerouslySetInnerHTML={{ __html: tenderMessage.body }} />
          </Col>
        </Row>
      </>
    );
  }

  render() {
    const { tenderMessageDetail } = this.props;

    if (!tenderMessageDetail) return null;

    return (
      <div>
        {this.renderTopReplyButtons()}
        {this.renderReplyForm()}

        {this.renderMessage(tenderMessageDetail)}

        <Divider />

        {tenderMessageDetail.relatedMessages.list.map(tenderMessage => {
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
}

TenderMessageDetail.contextTypes = {
  currentUser: PropTypes.object,
};

const Wrapped = Form.create({})(TenderMessageDetail);

export default Wrapped;
