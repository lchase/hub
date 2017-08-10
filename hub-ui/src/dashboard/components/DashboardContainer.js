import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dashboard from './Dashboard';
import * as actions from '../dashboardActions';

import { preferenceKeys } from '../../preference';

import RegisteredWidgets from '../WidgetRegistry';

//TODO: define expected props
export class DashboardContainer extends Component {
  // componentWillMount() {
  //   console.log('DashboardContainer.componentWillMount', this.props);
  //   this.props.getDashboards(this.props.auth.user.id);
  // }

  componentDidMount() {
    console.log('DashboardContainer.componentDidMount, this.props: ', this.props);
    //Load the data that is needed to display the current dashboard
    this.props.getDashboards();
  }

  componentWillReceiveProps(nextProps) {
    console.log('DashboardContainer.componentWillReceiveProps, nextProps: ', nextProps);
    // if (nextProps.userLogin !== this.props.userLogin) {
    //   this.props.fetchData(nextProps.userLogin);
    // }
  }

  render() {
    if (this.isLoading()) {
      return (
        <div>LOADING</div>
      )
    } else {
      return (
        this.createDashboardComponentFromModel()
      )
    }
  }

  /**
   * Returns true if this component is still waiting on all of its necessary data to be loaded from the server.
   */
  isLoading() {
    return this.props.preference[preferenceKeys.sidebarExpanded] === undefined ||
      this.props.preference[preferenceKeys.selectedDashboardId] === undefined ||
      this.props.dashboard === undefined || this.props.dashboard.dashboards === undefined;
  }
  
  //TODO: load properties required by the specific component
  //TODO: pass in a set of components and their order/layout
  createDashboardComponentFromModel() {
    let dashboardId = this.props.preference[preferenceKeys.selectedDashboardId].value;
    if (Object.keys(this.props.dashboard.dashboards).length > 0 &&
      this.props.dashboard.dashboards.hasOwnProperty(dashboardId)) {
      //TODO: remove the hardcoded dashboard id reference - look it up via user preferences
      let widgetComponents =
        this.createWidgets(this.props.dashboard.dashboards[dashboardId],
          this.props.dashboard.dashboardWidgets);
      return <Dashboard widgetComponents={widgetComponents} />
    } else {
      return <div>No dashboard available, please create one.</div>
    }
  }

  /**
   * Returns an array of widget component objects with the following properties:
   * id - the id of the widget
   * slug - the widget react component to be rendered
   */
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
    getDashboards: actions.loadDashboards
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);