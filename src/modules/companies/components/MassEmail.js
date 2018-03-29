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
      emailModalVisible: false,
      response: null
    };

    this.sendEmail = this.sendEmail.bind(this);
    this.showEmailModal = this.showEmailModal.bind(this);
    this.hideEmailModal = this.hideEmailModal.bind(this);
    this.handleEmailContentChange = this.handleEmailContentChange.bind(this);
    this.handleEmailSubjectChange = this.handleEmailSubjectChange.bind(this);
    this.afterSend = this.afterSend.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { suppliers } = this.props;

    if (prevProps.suppliers !== suppliers) {
      const suppliersMap = {};
      suppliers.forEach(
        supplier => (suppliersMap[supplier._id] = supplier.basicInfo.enName)
      );
      this.suppliersMap = suppliersMap;
    }
  }

  handleOk(response) {
    if (response) this.hideEmailModal();
    else this.sendEmail();
  }

  sendEmail() {
    const { emailContent, emailSubject } = this.state;
    const { suppliers, sendMassEmail } = this.props;

    const supplierIds = suppliers.map(supplier => supplier._id);

    sendMassEmail(
      {
        supplierIds,
        content: emailContent,
        subject: emailSubject
      },
      this.afterSend
    );
  }

  afterSend(response) {
    this.setState({ response });
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

  renderEditor() {
    const { emailContent } = this.state;

    return [
      <Input
        key={0}
        onChange={this.handleEmailSubjectChange}
        placeholder="Subject"
      />,
      <Editor
        key={1}
        content={emailContent}
        onEmailContentChange={this.handleEmailContentChange}
      />
    ];
  }

  renderResponse() {
    const { response } = this.state;

    return (
      <table className="mass-email-response">
        <tbody>
          {Object.keys(response.status).map(key => (
            <tr key={key}>
              <td>{this.suppliersMap[key]}</td>
              <td>{response.status[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    const { suppliers } = this.props;
    const { emailModalVisible, response } = this.state;

    return [
      <Button key={0} onClick={this.showEmailModal}>
        Send email
      </Button>,
      <Modal
        key={1}
        title={`Sending email to ${suppliers.length} suppliers`}
        visible={emailModalVisible}
        onCancel={this.hideEmailModal}
        onOk={() => this.handleOk(response)}
        width="50%"
        okText={response ? 'Close' : 'Send'}
      >
        {response ? this.renderResponse() : this.renderEditor()}
      </Modal>
    ];
  }
}

MassEmail.propTypes = {
  sendMassEmail: PropTypes.func,
  suppliers: PropTypes.array
};

export default withRouter(MassEmail);
