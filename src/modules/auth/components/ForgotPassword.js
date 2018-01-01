import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  forgotPassword: PropTypes.func.isRequired
};

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = { email: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { email } = this.state;

    this.props.forgotPassword({ email }, err => {
      if (!err) {
        window.location.href = '/sign-in';
      }
    });
  }

  handleEmailChange(e) {
    e.preventDefault();
    this.setState({ email: e.target.value });
  }

  render() {
    return <div>reset</div>;
  }
}

ForgotPassword.propTypes = propTypes;

export default ForgotPassword;
