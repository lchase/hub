import React, {Component} from 'react';
import DevTools from './DevTools';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import preference, { preferenceKeys } from '../preference';

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
  }
  componentWillUnmount() {
    document.body.classList.remove('sidebar-collapse')
  }

  isSidebarExpanded() {
    let sidebarExpanded = this.props.preference[preferenceKeys.sidebarExpanded];
    if (sidebarExpanded && sidebarExpanded.value) {
      return sidebarExpanded.value.toLowerCase() === 'true';
    }
    return true;
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