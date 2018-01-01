import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  resetPassword: PropTypes.func.isRequired
};

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = { newPassword: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.resetPassword(this.state.newPassword);
  }

  handlePasswordChange(e) {
    e.preventDefault();

    this.setState({ newPassword: e.target.value });
  }

  render() {
    return <div>reset password</div>;
  }
}

ResetPassword.propTypes = propTypes;

export default ResetPassword;
