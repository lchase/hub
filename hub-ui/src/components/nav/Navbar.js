import React, {Component} from 'react';
import NavbarNotifications from './NavbarNotifications';
import NavbarMessages from './NavbarMessages';
import NavbarTasks from './NavbarTasks';
import NavbarUserMenu from './NavbarUserMenu';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PreferenceActions from '../../actions/preference';
import _ from 'lodash';

export class Navbar extends Component {
  constructor() {
    super(...arguments);

    this.isSidebarExpanded.bind(this);
  }

  handleSidebarToggle() {
    this.props.toggleSidebar(!this.isSidebarExpanded(), this.props.auth.user.id);
  }
  
  isSidebarExpanded() {
    let sidebarPref = _.find(this.props.preference, entry => entry.attributes.name === 'sidebar-expanded');
    if (sidebarPref) {
      return sidebarPref.attributes.value === "1";
    } else {
      return true; // By default we should show the menu.
    }
  }

  render() {
    console.log('Navbar.render, isSidebarExpanded()', this.isSidebarExpanded());
    
    return (
        <nav className="navbar navbar-static-top" role="navigation">    
          <a onClick={this.handleSidebarToggle.bind(this)} href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span className="sr-only">Toggle navigation</span>
          </a>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <NavbarMessages />              
              <NavbarNotifications />
              <NavbarTasks />
              <NavbarUserMenu />
              <li>
                <a href="#" data-toggle="control-sidebar"><i className="fa fa-gears"></i></a>
              </li>
            </ul>
          </div>
        </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    preference: state.preference
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleSidebar: PreferenceActions.toggleSidebar
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);