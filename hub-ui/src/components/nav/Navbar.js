import React, {Component} from 'react';
import NavbarNotifications from './NavbarNotifications';
import NavbarMessages from './NavbarMessages';
import NavbarTasks from './NavbarTasks';
import NavbarUserMenu from './NavbarUserMenu';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import preference from '../../preference';

export class Navbar extends Component {
  constructor() {
    super(...arguments);

    this.isSidebarExpanded.bind(this);
  }

  handleSidebarToggle() {
    console.log('handle sidebar toggle CLICKED');
    this.props.toggleSidebar(this.props.preference, !this.isSidebarExpanded(), this.props.auth.user.id);
  }
  
  isSidebarExpanded() {
    if (this.props.preference[preference.keys.sidebarExpanded] === undefined) {
      console.log('NAVBAR PREFERENCE PROPS UNDEFINED!');
    } else {
      console.log('NAVBAR.isSidebarExpanded value:');
      console.log(this.props.preference[preference.keys.sidebarExpanded].value);
      console.log(this.props.preference[preference.keys.sidebarExpanded].value == 'true');
      if (this.props.preference[preference.keys.sidebarExpanded]) {
        return this.props.preference[preference.keys.sidebarExpanded].value == 'true';
      } else {
        return false;
      }
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
    toggleSidebar: preference.actions.toggleSidebar
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);