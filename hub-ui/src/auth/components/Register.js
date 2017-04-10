import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import FormInput from '../../components/forms/FormInput';
import auth from '../../auth';

const form = reduxForm({
  form: 'register',
  validate
});

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.firstName) {
    errors.firstName = "Please enter a first name.";
  }

  if (!values.lastName) {
    errors.lastName = "Please enter a last name.";
  }

  if (!values.password) {
    errors.password = "Please enter a password.";
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = "Please enter a password confirmation.";
  }

  if (values.password !== values.passwordConfirmation ) {
    errors.password = 'Passwords do not match';
  }

  return errors;
};

export class Register extends Component {

  handleFormSubmit(values) {
    console.log('Register.handleFormSubmit(...)', values);

    this.props.registerUser(values);
  }

  renderAlert() {
    console.log('renderAlert()', this.props.errorMessage)
    
    if (this.props.ajaxInProgress) {
      return (
        <div className="alert alert-info alert-dismissible">
          <span>Working...</span>
        </div>          
      );
    }
    if (this.props.errors.length > 0) {
      let message = this.props.errors[0];
      return (
        <div className="alert alert-error alert-dismissible">
          <span><strong>Error!</strong> {message}</span>
        </div>
      );
    }
  }
  
  render() {

    // This property function (and empty default implementation) is added by the reduxForm I think,
    // it doesn't come back undefined after the reduxForm(...) decorates the component
    const { handleSubmit } = this.props;

    return (
      <div className="register-box">
        <div className="register-logo">
          <Link to="/"><b>Hub</b><img src="/public/img/hub-48.png" /></Link>
        </div>

        <div className="register-box-body">
          <p className="login-box-msg">Register a new membership</p>

          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            {this.renderAlert()}
            <Field name="firstName" component={FormInput} type="text" className="form-control" label="First Name" placeholder="Full name" inlineIco="glyphicon-user" />
            <Field name="lastName" component={FormInput} type="text" className="form-control" label="Last Name" placeholder="Last name" inlineIco="glyphicon-user" />
            <Field name="email" component={FormInput} type="email" className="form-control" label="Email" placeholder="Email" inlineIco="glyphicon-envelope" />
            <Field name="password" component={FormInput} type="password" className="form-control" label="Password" placeholder="Password" inlineIco="glyphicon-lock" />
            <Field name="passwordConfirmation" component={FormInput} type="password" className="form-control" label="Retype password" placeholder="Retype password" inlineIco="glyphicon-log-in" />
            
            <div className="row">
              <div className="col-xs-offset-8 col-xs-4">
                <button type="submit" className="btn btn-primary btn-block btn-flat">Register</button>
              </div>
            </div>
          </form>

          <Link to="/login" className="text-center">I already have a membership</Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors,
    ajaxInProgress: state.auth.ajaxInProgress
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    registerUser: (user) => dispatch(auth.actions.registerUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(form(Register));