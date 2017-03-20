import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dashboard from './Dashboard';
import * as DashboardActions from '../actions/dashboard'; 

export class DashboardContainer extends Component {
  componentWillMount() {
    //TODO: update API to handle default dashboard retrieval.  Pass dashboard into child component.
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
    getDefaultDashboard: DashboardActions.loadDefaultDashboard
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);