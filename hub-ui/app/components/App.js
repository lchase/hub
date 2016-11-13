import React, {Component} from 'react';
import DevTools from '../containers/DevTools';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PreferenceActions from '../actions/preference';
import _ from 'lodash';

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
    console.log('App.isSidebarExpanded', this.props);
    console.log('App.isSidebarExpanded', this.props.preference);
    let sidebarPref = _.find(this.props.preference, entry => {
      console.log('App.isSidebarExpanded', entry.attributes.name);
      return entry.attributes.name === 'sidebar-expanded'
    });
    console.log('App.isSidebarExpanded', sidebarPref);
    if (sidebarPref) {
      console.log('isSidebarExpanded', sidebarPref.attributes.value)
      return sidebarPref.attributes.value === "1";
    } else {
      return true; // By default we should show the menu.
    }
  }  
  
  render() {
    return (
      <div>
        {this.props.children}
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
    loadPreferences: PreferenceActions.loadPreferences
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);