import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Card, Form, Button } from 'antd';
import { BaseForm } from 'modules/common/components';
import EoiTable from './EoiTable';
import MainInfo from './MainInfo';
import { initialDocuments } from '../../constants';

class EoiForm extends BaseForm {
  constructor(props, context) {
    super(props, context);

    this.emailTemplate = context.systemConfig.eoiTemplate;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeMainInfo = this.onChangeMainInfo.bind(this);
    this.onChangeDocuments = this.onChangeDocuments.bind(this);

    const { data } = props;
    const { suppliers, attachments, content, requestedDocuments } = data || {};

    this.state = {
      requestedDocuments:
        (requestedDocuments || []).length > 0
          ? requestedDocuments
          : initialDocuments,
      suppliers: suppliers || [],
      attachments: attachments || [],
      content: content || ''
    };
  }

  onChangeMainInfo(mainInfoState) {
    this.setState(mainInfoState);
  }

  onChangeDocuments(requestedDocuments) {
    this.setState({ requestedDocuments });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { requestedDocuments, content, attachments, suppliers } = this.state;

    this.save({
      type: 'eoi',
      content,
      attachments,
      supplierIds: suppliers.map(s => s._id),
      requestedDocuments
    });
  }

  render() {
    const { data } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <div>
          <MainInfo
            data={data}
            renderField={this.renderField.bind(this)}
            renderOptions={this.renderOptions.bind(this)}
            onChange={this.onChangeMainInfo}
          />
        </div>

        <Card title="Form" className="margin">
          <EoiTable
            requestedDocuments={data.requestedDocuments}
            onChange={this.onChangeDocuments}
          />
        </Card>

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="margin"
        >
          Send
        </Button>
      </Form>
    );
  }
}

EoiForm.propTypes = {
  data: PropTypes.object
};

EoiForm.contextTypes = {
  systemConfig: PropTypes.object,
  __: PropTypes.func
};

const form = Form.create()(EoiForm);

export default withRouter(form);
