import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dashboard from './Dashboard';
import * as actions from '../dashboardActions';

import preference from '../../preference';

import PlaceholderWidget from '../../widgets/placeholder/components/PlaceholderWidget';

export class DashboardContainer extends Component {
  componentWillMount() {
    console.log('DashboardContainer.componentWillMount', this.props);
    this.props.getDefaultDashboard(this.props.auth.user.id);
  }

  render() {
    //TODO: figure out a way to prevent rendering of the DashboardContainer before data like user prefs has been loaded
    if (this.props.preference[preference.keys.sidebarExpanded] === undefined) {
      return (
        <div>LOADING</div>
      )
    } else {
      return (
        <Dashboard component={{slug: PlaceholderWidget, value: 'This is my header'}}/>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    preference: state.preference,
    dashboard: state.dashboard
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getDefaultDashboard: actions.loadDefaultDashboard
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);