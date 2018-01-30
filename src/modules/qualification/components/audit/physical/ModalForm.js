/* eslint-disable react/display-name */

import React from 'react';
import { withRouter } from 'react-router';
import { Modal, Form, Radio } from 'antd';
import { Uploader, Field } from 'modules/common/components';
import PropTypes from 'prop-types';

class Audit extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { form, onSubmit, hideModal, data } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        let inputs = {
          isQualified: values.isQualified
        };

        if (data) {
          inputs.reportFile = values.reportFile
            ? values.reportFile[0].url
            : data.reportFile;
          inputs.improvementPlanFile = values.improvementPlanFile
            ? values.improvementPlanFile[0].url
            : data.improvementPlanFile;
        } else {
          inputs.reportFile = values.reportFile[0].url;
          inputs.improvementPlanFile = values.improvementPlanFile[0].url;
        }

        onSubmit(inputs);
        hideModal();
      }
    });
  }

  getChildContext() {
    return {
      form: this.props.form
    };
  }

  render() {
    const { visible, hideModal } = this.props;
    const data = this.props.data || {};
    const optional = Object.keys(data).length > 1;

    return (
      <Modal
        title="Insert physical audit"
        visible={visible}
        onCancel={hideModal}
        onOk={this.handleSubmit}
        okText="Insert"
      >
        <Form>
          <Field
            label="Result"
            name="isQualified"
            initialValue={
              typeof data.isQualified === 'boolean' ? data.isQualified : true
            }
            hasFeedback={false}
            optional={optional}
            control={
              <Radio.Group>
                <Radio value={true}>Qualified with improvement plan</Radio>
                <Radio value={false}>Not qualified with improvement plan</Radio>
              </Radio.Group>
            }
          />
          <Field
            label={
              optional ? (
                <span>
                  Report -{' '}
                  <a href={data.reportFile} target="_blank">
                    View current
                  </a>
                </span>
              ) : (
                'Report'
              )
            }
            name="reportFile"
            dataType="file"
            hasFeedback={false}
            optional={optional}
            control={<Uploader />}
          />
          <Field
            label={
              optional ? (
                <span>
                  Improvement plan -{' '}
                  <a href={data.improvementPlanFile} target="_blank">
                    View current
                  </a>
                </span>
              ) : (
                'improvement plan'
              )
            }
            name="improvementPlanFile"
            dataType="file"
            hasFeedback={false}
            optional={optional}
            control={<Uploader />}
          />
        </Form>
      </Modal>
    );
  }
}

Audit.childContextTypes = {
  form: PropTypes.object
};

Audit.propTypes = {
  form: PropTypes.object,
  onSubmit: PropTypes.func,
  visible: PropTypes.bool,
  hideModal: PropTypes.func,
  data: PropTypes.object
};

const FormWrapped = Form.create()(Audit);

export default withRouter(FormWrapped);
