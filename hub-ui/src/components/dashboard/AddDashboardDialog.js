import React, { Component } from 'react';
import Modal from '../modal/Modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { showCreateDashboardDialog, hideCreateDashboardDialog } from '../../dashboard';
import { Field, reduxForm } from 'redux-form';
import FormInput from '../forms/FormInput';

const validate = values => {
  const errors = {};

  /*
  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = "Please enter a password.";
  }
  console.log('validate', errors);
  */
  return errors;
};

const form = reduxForm({
  form: 'createDashboard',
  validate: validate
});

export class AddDashboardDialog extends Component {
  constructor() {
    super(...arguments);
  }

  handleOnClose() {
    this.props.hide();
  }

  handleOnActionButton() {
    console.log('fire the create action which will use the form field info to submit a backend call...');
    alert('fire the create action which will use the form field info to submit a backend call...');
    this.props.hide();
  }

  renderAlert() {
    return null;
  }

  render() {
    return (
      <span>
        <button className="btn btn-primary btn-sm btn-flat" onClick={this.props.show}>New Dashboard</button>
        <Modal open={this.props.open} title="Create Dashboard" onClose={this.handleOnClose.bind(this)} actionButtonText="Create" handleOnActionButton={this.handleOnActionButton.bind(this)}>
          <form>
            {this.renderAlert()}
            <Field name="name" component={FormInput} type="text" className="form-control" label="Name" placeholder="Name" inlineIco="glyphicon-pencil" />
            <Field name="description" component={FormInput} type="text" className="form-control" placeholder="Description" inlineIco="glyphicon-pencil" />

            <div className="row">
              <div className="col-xs-8">
                <div>
                  <label>
                    <Field name="isShared" component="input" type="checkbox" /> Share?
                  </label>
                </div>
              </div>

              <div className="col-xs-4">
                <button type="submit" className="btn btn-primary btn-block btn-flat">Create</button>
              </div>

            </div>
          </form>
        </Modal>
      </span>
    );
  }
}

function mapStateToProps(state) {
  return {
    open: state.dashboard.showCreateDashboardDialog
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    show: showCreateDashboardDialog,
    hide: hideCreateDashboardDialog
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(form(AddDashboardDialog));