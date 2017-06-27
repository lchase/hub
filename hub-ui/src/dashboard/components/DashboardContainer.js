import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dashboard from './Dashboard';
import * as actions from '../dashboardActions';

import preference from '../../preference';

import RegisteredWidgets from '../WidgetRegistry';

export class DashboardContainer extends Component {
  componentWillMount() {
    console.log('DashboardContainer.componentWillMount', this.props);
    //TODO: not sure if this is the best place for this - this will trigger the rest call to load the dashboard data from hub-api
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
        this.createDashboardComponentFromModel()
      )
    }
  }
  
  //TODO: load properties required by the specific component
  //TODO: pass in a set of components and their order/layout
  createDashboardComponentFromModel() {
    if (this.props.dashboard && this.props.dashboard.dashboards && Object.keys(this.props.dashboard.dashboards).length > 0) {
      //TODO: remove the hardcoded dashboard id reference
      let widgetComponents = this.createWidgets(this.props.dashboard.dashboards[1], this.props.dashboard.dashboardWidgets);
      return <Dashboard widgetComponents={widgetComponents} />
    }
    //TODO: this bit of render logic should probably be in Dashboard, not this DashboardContainer
    return <div>No dashboard available, please create one.</div>
  }

  createWidgets(dashboard, dashboardWidgets) {
    console.log('DashboardContainer.createWidgets - dashboard value: ');
    console.log(dashboard);
    let dashboardWidgetIds = dashboard.relationships.widgets.data.map(widget => {
      return widget.id;
    });

    return dashboardWidgetIds.map(widgetId => {
      return this.createWidgetComponent(dashboardWidgets[widgetId]);
    });
  }

  createWidgetComponent(widget) {
    return {id: widget.id, slug: RegisteredWidgets[widget.attributes.widgetType]};
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