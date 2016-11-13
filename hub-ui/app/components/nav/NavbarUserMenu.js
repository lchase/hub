import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import cap from 'lodash.capitalize';

export class NavbarUserMenu extends Component {
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
    console.log('NavbarUserMenu', this.props);
    return (
      <li className="dropdown user user-menu">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
          <img src="assets/img/placeholder-user-image.png" className="user-image" alt="User Image" />
          <span className="hidden-xs">{this.getDisplayUserName()}</span>
        </a>
        <ul className="dropdown-menu">
          <li className="user-header">
            <img src="assets/img/placeholder-user-image.png" className="img-circle" alt="User Image" />
            <p>
              {this.getDisplayUserName()} - Web Developer*
              <small>Member since Nov. 2012</small>
            </p>
          </li>
          <li className="user-body">
            <div className="row">
              <div className="col-xs-4 text-center">
                <a href="#">Followers</a>
              </div>
              <div className="col-xs-4 text-center">
                <a href="#">Sales</a>
              </div>
              <div className="col-xs-4 text-center">
                <a href="#">Friends</a>
              </div>
            </div>
          </li>
          <li className="user-footer">
            <div className="pull-left">
              <Link to="/profile" className="btn btn-default btn-flat">Profile</Link>
            </div>
            <div className="pull-right">
              <Link to="/login" className="btn btn-default btn-flat">Sign out</Link>
            </div>
          </li>
        </ul>
      </li>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(NavbarUserMenu);