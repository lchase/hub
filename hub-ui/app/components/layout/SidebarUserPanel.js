import React, { Component } from 'react';
import { connect } from 'react-redux';
import cap from 'lodash.capitalize';

export class SidebarUserPanel extends Component {
  constructor() {
    super(...arguments);

    this.getDisplayUserName.bind(this);
  }
  
  getDisplayUserName() {
    if (this.props.auth && this.props.auth.user) {
      return cap(this.props.auth.user.firstName) + ' ' + cap(this.props.auth.user.lastName);
    }
  }
  
  render() {
    return (
      <div className="user-panel">
        <div className="pull-left image">
          <img src="assets/img/placeholder-user-image.png" className="img-circle" alt="User Image" />
        </div>
        <div className="pull-left info">
          <p>{this.getDisplayUserName()}</p>
          <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(SidebarUserPanel);