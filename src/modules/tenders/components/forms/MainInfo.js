import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select, DatePicker, Card, Row, Col } from 'antd';
import moment from 'moment';
import { EditorCK, Uploader } from 'modules/common/components';
import { days, dateTimeFormat } from 'modules/common/constants';
import { AddCompany } from 'modules/companies/components';
import SupplierSearcher from 'modules/companies/containers/Searcher';

class MainInfo extends React.Component {
  constructor(props, context) {
    super(props, context);

    const {
      data: { content, attachments, suppliers },
    } = props;

    this.state = {
      content,
      attachments: (attachments || []).map(a => ({ ...a })),
      newlyInvitedSuppliers: [],
      suppliers: (suppliers || []).map(s => ({ ...s })),
    };

    this.onEmailContentChange = this.onEmailContentChange.bind(this);
    this.onEmailAttachmentsChange = this.onEmailAttachmentsChange.bind(this);
    this.onChangeSuppliers = this.onChangeSuppliers.bind(this);
    this.onInviteSupplier = this.onInviteSupplier.bind(this);
  }

  onEmailContentChange(e) {
    const content = e.editor.getData();

    this.setState({ content });

    this.props.onChange({ content });
  }

  onEmailAttachmentsChange(attachments) {
    this.setState({ attachments });

    this.props.onChange({ attachments });
  }

  onChangeSuppliers(suppliers) {
    this.props.onChange({ suppliers });
  }

  onInviteSupplier(supplier) {
    this.setState({ newlyInvitedSuppliers: [supplier] });

    this.props.onChange({ suppliers: [...this.state.suppliers, supplier] });
  }

  renderExtraContent() {
    const { renderExtraContent } = this.props;

    if (renderExtraContent) {
      return renderExtraContent();
    }

    return null;
  }

  renderSuppliers() {
    const { showSuppliers, data } = this.props;
    const { suppliers, newlyInvitedSuppliers } = this.state;

    if (!showSuppliers) {
      return null;
    }

    return (
      <div>
        <label>
          Requesting suppliers: <strong>{suppliers.length}</strong>
        </label>
        <br />

        <div
          style={{
            margin: '6px 0 16px 0',
            maxHeight: '200px',
            overflow: 'scroll',
          }}
        >
          <SupplierSearcher
            title="Add an existing supplier"
            onSelect={this.onChangeSuppliers}
            initialChosenSuppliers={data.suppliers}
            newlyInvitedSuppliers={newlyInvitedSuppliers}
          />

          <AddCompany showInvite onAdd={supplier => this.onInviteSupplier(supplier)} />
        </div>
      </div>
    );
  }

  render() {
    const { renderField, renderOptions, data } = this.props;
    const { content, attachments } = this.state;
    const { publishDate, closeDate } = data;

    const dateRange = publishDate ? [moment(publishDate), moment(closeDate)] : null;

    const fieldProps = {
      hasFeedback: false,
    };

    return (
      <Row gutter={24}>
        <Col span={9}>
          <Card title="Main info" className="no-pad-bottom">
            {this.renderExtraContent()}
            {this.renderSuppliers()}

            {renderField({
              ...fieldProps,
              label: 'Number',
              name: 'number',
              control: <Input />,
            })}
            {renderField({
              ...fieldProps,
              label: 'Description',
              name: 'name',
              control: <Input />,
            })}
            {renderField({
              ...fieldProps,
              label: 'Date range',
              name: 'dateRange',
              initialValue: dateRange,
              control: (
                <DatePicker.RangePicker
                  style={{ width: '100% ' }}
                  showTime={{ format: 'HH:mm' }}
                  format={dateTimeFormat}
                  placeholder={['Publish date', 'Close date']}
                />
              ),
            })}
            {renderField({
              ...fieldProps,
              label: 'Reminder',
              name: 'reminderDay',
              optional: true,
              control: <Select>{renderOptions(days)}</Select>,
            })}
            {renderField({
              hasFeedback: false,
              optional: true,
              label: 'Officer name',
              name: 'sourcingOfficer',
              control: <Input />,
            })}
            {renderField({
              hasFeedback: false,
              optional: true,
              label: 'File',
              name: 'file',
              dataType: 'file',
              control: <Uploader />,
            })}
          </Card>
        </Col>

        <Col span={15}>
          <Card title="Email content">
            <EditorCK content={content || ''} onChange={this.onEmailContentChange} />
          </Card>

          <Card title="Attachments">
            <Uploader
              onChange={this.onEmailAttachmentsChange}
              defaultFileList={attachments}
              multiple={true}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

MainInfo.propTypes = {
  // editing tender object
  data: PropTypes.object,
  renderField: PropTypes.func,
  renderOptions: PropTypes.func,
  showSuppliers: PropTypes.bool,
  onChange: PropTypes.func,
  renderExtraContent: PropTypes.func,
};

export default MainInfo;
