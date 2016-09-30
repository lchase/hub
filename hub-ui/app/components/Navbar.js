import React, {Component} from 'react';
import NavbarNotifications from './NavbarNotifications';
import NavbarMessages from './NavbarMessages';
import NavbarTasks from './NavbarTasks';
import NavbarUserMenu from './NavbarUserMenu';

export default class Navbar extends Component {
  render() {
    return (
        <nav className="navbar navbar-static-top" role="navigation">    
          <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
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