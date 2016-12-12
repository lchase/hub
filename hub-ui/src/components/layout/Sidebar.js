import React, { Component } from 'react';
import { Link } from 'react-router';
import SidebarUserPanel from './SidebarUserPanel';
import SidebarSearch from './SidebarSearch';
import NavLink from '../nav/NavLink';

export default class Sidebar extends Component {
  render() {
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <SidebarUserPanel />
          <SidebarSearch />
          <ul className="sidebar-menu">
            <li className="header">HEADER</li>
            <NavLink to='/'><i className="fa fa-dashboard"></i> <span>Dashboard</span></NavLink>
          </ul>  
        </section>  
      </aside>
    );
  }
}

/*
// v2.0.0
            <li className="active"><a href="#"><i className="fa fa-link"></i> <span>Link</span></a></li>
            <li><a href="#"><i className="fa fa-link"></i> <span>Another Link</span></a></li>
            <li className="treeview">
              <a href="#"><i className="fa fa-link"></i> <span>Multilevel</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right"></i>
                </span>
              </a>
              <ul className="treeview-menu">
                <li><a href="#">Link in level 2</a></li>
                <li><a href="#">Link in level 2</a></li>
              </ul>
            </li>
*/