import React from 'react';
import PropTypes from 'prop-types';
import { gql, compose, graphql } from 'react-apollo';
import { queries, mutations } from '../../graphql';
import { PrequalificationForms } from '../../components';
import { Loading } from 'modules/common/components';
import { message, notification, Icon } from 'antd';

class PrequalificationContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.send = this.send.bind(this);
    this.save = this.save.bind(this);
    this.skip = this.skip.bind(this);
  }

  skip({ reason }, callback) {
    const { skip } = this.props;
    const { __ } = this.context;

    skip({ variables: { reason } })
      .then(() => {
        message.success(__('Success'));
        callback();
      })
      .catch(error => {
        message.error(error.message);
      });
  }

  send() {
    const { sendToBuyer, history } = this.props;
    const { __ } = this.context;

    sendToBuyer()
      .then(() => {
        notification.open({
          message: __('Done!'),
          description: __(
            'You have successfully submitted your pre-qualification form.'
          ),
          icon: <Icon type="smile" style={{ color: 'rgb(0,153,168)' }} />,
          duration: 10
        });

        history.push('/capacity-building');
      })
      .catch(error => {
        message.error(error.message);
      });
  }

  save(name, doc) {
    const { companyByUserQuery } = this.props;
    const { __ } = this.context;

    const companyByUser = companyByUserQuery.companyByUser;
    const disabled = !companyByUser.isPrequalificationInfoEditable;

    if (disabled) {
      return message.error(__('Changes disabled'));
    }

    let formsComplete = true;

    Object.keys(companyByUser).forEach(key => {
      if (key.includes('Info') && !companyByUser[key] && key !== 'healthInfo') {
        formsComplete = false;
      }
    });

    const mutation = this.props[`${name}Edit`];

    mutation({ variables: { [name]: doc } })
      .then(() => {
        companyByUserQuery.refetch();
        message.success(__('Saved'));

        if (name === 'healthInfo') {
          if (formsComplete) {
            return this.send();
          }

          return message.error(
            __('Please complete all forms before submitting')
          );
        }
      })

      .catch(error => {
        message.error(error.message);
      });
  }

  render() {
    const { companyByUserQuery } = this.props;

    if (companyByUserQuery.loading) {
      return <Loading />;
    }

    const companyByUser = companyByUserQuery.companyByUser;
    const disabled = !companyByUser.isPrequalificationInfoEditable;

    const updatedProps = {
      ...this.props,
      save: this.save,
      send: this.send,
      skip: this.skip,
      disabled,
      company: {
        ...companyByUser
      }
    };

    return <PrequalificationForms {...updatedProps} />;
  }
}

PrequalificationContainer.propTypes = {
  companyByUserQuery: PropTypes.object,
  history: PropTypes.object,
  skip: PropTypes.func,
  sendToBuyer: PropTypes.func
};

PrequalificationContainer.contextTypes = {
  currentUser: PropTypes.object,
  __: PropTypes.func
};

export default compose(
  graphql(gql(queries.companyPrequalificationDetail), {
    name: 'companyByUserQuery'
  }),

  // mutations
  graphql(gql(mutations.financialInfo), {
    name: 'financialInfoEdit'
  }),

  graphql(gql(mutations.businessInfo), {
    name: 'businessInfoEdit'
  }),

  graphql(gql(mutations.environmentalInfo), {
    name: 'environmentalInfoEdit'
  }),

  graphql(gql(mutations.healthInfo), {
    name: 'healthInfoEdit'
  }),

  graphql(gql(mutations.companiesSendPrequalificationInfo), {
    name: 'sendToBuyer'
  }),

  graphql(gql(mutations.companiesSkipPrequalification), {
    name: 'skip'
  })
)(PrequalificationContainer);
