import React from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import FormInput from './FormInput';

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

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = "Please enter a password confirmation.";
  }

  if (values.password !== values.passwordConfirmation ) {
    errors.password = 'Passwords do not match';
  }

  return errors;
};

class Signup extends React.Component {
  
  componentDidMount() {
    console.log($(document.body));
    $(document.body).addClass('hold-transition register-page');
    // className="hold-transition skin-blue sidebar-mini"
  }

  componentWillUnmount() {
    console.log($(document.body));
    $(document.body).removeClass('hold-transition register-page');
  }  

  handleFormSubmit(values) {
    console.log(values);
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

          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <Field name="fullName" component={FormInput} type="text" className="form-control" label="Full name" placeholder="Full name" inlineIco="glyphicon-user" />
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

export default reduxForm({
  form: 'signup',
  validate
})(Signup);