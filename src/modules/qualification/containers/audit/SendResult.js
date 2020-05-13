import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql, compose } from 'react-apollo';
import { message } from 'antd';
import SendResult from '../../components/audit/SendResult';
import { exportFile } from 'modules/common/components';
import { queries, mutations } from '../../graphql';
import client from 'apolloClient';

class SendResultContainer extends React.Component {
  render() {
    const {
      responseId,
      isQualified,
      location,
      history,
      auditsBuyerSendFiles,
      saveResultFormMutation,
    } = this.props;

    const hideModal = () => {
      history.push('/audit/responses?refetch');
    };

    const generateVariables = formValues => {
      const supplierId = location.state.supplierId;
      const auditId = location.state.auditId;

      return {
        ...formValues,
        supplierId,
        auditId,
        auditResult: isQualified,
      };
    };

    const review = (name, formValues) => {
      exportFile({
        query: queries[name],
        name,
        variables: generateVariables(formValues),
      });
    };

    const generateReport = formValues =>
      client.query({
        query: gql(queries.auditReport),
        name: 'auditReport',
        variables: generateVariables(formValues),
      });

    const generateImprovementPlan = formValues =>
      client.query({
        query: gql(queries.auditImprovementPlan),
        name: 'auditImprovementPlan',
        variables: generateVariables(formValues),
      });

    const sendReport = formValues => {
      if (isQualified) {
        return generateReport(formValues)
          .then(() =>
            auditsBuyerSendFiles({
              variables: {
                responseIds: [responseId],
                report: true,
              },
            })
          )
          .then(() => {
            message.success('Succesfully sent!');
          })
          .catch(error => {
            message.error(error.message);
          });
      }

      generateReport(formValues)
        .then(() => generateImprovementPlan(formValues))
        .then(() =>
          auditsBuyerSendFiles({
            variables: {
              responseIds: [responseId],
              reassessmentDate: formValues.reassessmentDate,
              reminderDay: formValues.reminderDay,
              report: true,
            },
          })
        )
        .then(() => {
          message.success('Succesfully sent!');
        })
        .catch(error => {
          message.error(error.message);
        });
    };

    const saveResultForm = args => {
      saveResultFormMutation({
        variables: {
          responseId,
          ...args,
        },
      })
        .then(({ data }) => {
          message.success('Saved');
        })
        .catch(error => {
          message.error(error.message);
        });
    };

    const updatedProps = {
      ...this.props,
      sendReport,
      saveResultForm,
      review,
      hideModal,
    };

    return <SendResult {...updatedProps} />;
  }
}

SendResultContainer.propTypes = {
  auditsBuyerSendFiles: PropTypes.func,
};

export default compose(
  graphql(gql(mutations.auditsBuyerSendFiles), {
    name: 'auditsBuyerSendFiles',
  }),
  graphql(gql(mutations.auditsBuyerSaveResultForm), {
    name: 'saveResultFormMutation',
  })
)(SendResultContainer);
