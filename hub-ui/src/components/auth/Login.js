import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import FormInput from '../forms/FormInput';
import { bindActionCreators } from 'redux'

import auth from '../../auth';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = "Please enter a password.";
  }
  console.log('validate', errors);
  return errors;
};

const form = reduxForm({
  form: 'login',
  validate: validate
});

class Login extends Component {
  handleFormSubmit(values) {
    console.log('Login.handleFormSubmit(...)', values);
    console.log(this.props.login);
    this.props.login(values);
  };

  renderAlert() {
    if (this.props.errorMessage) {
      let message = this.props.message || this.props.errorMessage;
      return (
        <div className="alert alert-error alert-dismissible">
          <span>{message}</span>
        </div>
      )
    }
  }

  render() {
    // This property function (and empty default implementation) is added by the reduxForm I think,
    // it doesn't come back undefined after the reduxForm(...) decorates the component
    const { handleSubmit } = this.props;

    return (
      <div className="login-box">
        <div className="login-logo">
          <Link to="/"><b>Hub</b><img src="/public/img/hub-48.png" /></Link>
        </div>
  
        <div className="login-box-body">
          <p className="login-box-msg">Sign in to start your session</p>

          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            {this.renderAlert()}
            <Field name="email" component={FormInput} type="email" className="form-control" label="Email" placeholder="Email" inlineIco="glyphicon-envelope" />
            <Field name="password" component={FormInput} type="password" className="form-control" placeholder="Password" inlineIco="glyphicon-lock" />
            
            <div className="row">
              <div className="col-xs-8">
                <div>
                  <label>
                    <Field name="rememberMe" component="input" type="checkbox" /> Remember Me
                  </label>
                </div>
              </div>
              
              <div className="col-xs-4">
                <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
              </div>
              
            </div>
          </form>

          <a href="#">I forgot my password</a><br />
          <Link to="/register" className="text-center">Register a new membership</Link>

        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message || state.auth.error,
    ajaxInProgress: state.auth.ajaxInProgress
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    login: auth.actions.loginUser
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(form(Login));