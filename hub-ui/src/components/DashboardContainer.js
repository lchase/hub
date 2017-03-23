import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dashboard from './Dashboard';
import db from '../dashboard';

export class DashboardContainer extends Component {
  componentWillMount() {
    console.log('DashboardContainer.componentWillMount', this.props);
    this.props.getDefaultDashboard(this.props.auth.user.email);
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
    getDefaultDashboard: db.actions.loadDefaultDashboard
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);