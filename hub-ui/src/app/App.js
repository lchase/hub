import React, {Component} from 'react';
import DevTools from './DevTools';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import preference from '../preference';
import _ from 'lodash';

import enUS from 'antd/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd';

export class App extends Component {
  constructor() {
    super(...arguments);
    this.isSidebarExpanded.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.user) {
      this.props.loadPreferences(this.props.auth.user.id);
    }
  }

  componentDidUpdate() {
    console.log('App.componentDidUpdate called');
    if (this.isSidebarExpanded()) {
      document.body.classList.remove('sidebar-collapse');
    } else {
      document.body.classList.add('sidebar-collapse');
    }
    //document.body.classList.toggle('sidebar-collapse', !this.isSidebarExpanded())
  }
  componentWillUnmount() {
    document.body.classList.remove('sidebar-collapse')
  }

  isSidebarExpanded() {
    return this.props.preference['sidebarExpanded'];
  }  
  
  render() {
    return (
      <div>
        <LocaleProvider locale={enUS}>
          {this.props.children}
        </LocaleProvider>
        <DevTools visibleOnLoad={false} />
      </div>
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
    loadPreferences: preference.actions.loadPreferences
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);