import React from 'react';
import { withRouter } from 'react-router';
import { Button, Modal, Input } from 'antd';
import { Editor } from 'modules/common/components';
import PropTypes from 'prop-types';

class MassEmail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailContent: '',
      emailSubject: '',
      emailModalVisible: false
    };

    this.sendEmail = this.sendEmail.bind(this);
    this.showEmailModal = this.showEmailModal.bind(this);
    this.hideEmailModal = this.hideEmailModal.bind(this);
    this.handleEmailContentChange = this.handleEmailContentChange.bind(this);
    this.handleEmailSubjectChange = this.handleEmailSubjectChange.bind(this);
  }

  sendEmail() {
    const { emailContent, emailSubject } = this.state;
    const { supplierIds, sendMassEmail } = this.props;

    sendMassEmail({
      supplierIds,
      content: emailContent,
      subject: emailSubject
    });

    this.hideEmailModal();
  }

  handleEmailContentChange(value) {
    this.setState({ emailContent: value });
  }

  handleEmailSubjectChange(e) {
    this.setState({ emailSubject: e.target.value });
  }

  showEmailModal() {
    this.setState({ emailModalVisible: true });
  }

  hideEmailModal() {
    this.setState({ emailModalVisible: false });
  }

  render() {
    const { supplierIds } = this.props;
    const { emailModalVisible, emailContent } = this.state;

    return [
      <Button key={0} onClick={this.showEmailModal}>
        Send email
      </Button>,
      <Modal
        key={1}
        title={`Sending email to ${supplierIds.length} suppliers`}
        visible={emailModalVisible}
        onCancel={this.hideEmailModal}
        onOk={this.sendEmail}
        width="50%"
        okText="Send"
      >
        <Input onChange={this.handleEmailSubjectChange} placeholder="Subject" />
        <Editor
          content={emailContent}
          onEmailContentChange={this.handleEmailContentChange}
        />
      </Modal>
    ];
  }
}

MassEmail.propTypes = {
  sendMassEmail: PropTypes.func,
  supplierIds: PropTypes.array
};

export default withRouter(MassEmail);
