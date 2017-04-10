import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dashboard from './Dashboard';
import * as actions from '../dashboardActions';

export class DashboardContainer extends Component {
  componentWillMount() {
    console.log('DashboardContainer.componentWillMount', this.props);
    this.props.getDefaultDashboard(this.props.auth.user.id);
    //this.props.getDefaultDashboard();
  }

  render() {
    return (
      <Dashboard config={this.props.defaultDashboard} />
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    defaultDashboard: state.dashboard
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getDefaultDashboard: actions.loadDefaultDashboard
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);