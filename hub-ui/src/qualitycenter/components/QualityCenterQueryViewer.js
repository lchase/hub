import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../qualityCenterActions';

export class QualityCenterQueryViewer extends Component {

  render() {
    console.log("QualityCenterQueryViewer this.props: ");
    console.log(this.props);
    return <div>QualityCenterQueryViewer!</div>
    //TODO: pass in required props for the quality center query viewer widget or have this be a container that pulls the required values,
    //and pass in only minimal data instead like ids

    // return <div>
    //   <ul>
    //     {this.props.queries.forEach(query => <li>Query Expression</li>)};
    //   </ul>
    // </div>
  }
}

function mapStateToProps(state) {
  return {
    //TODO: register QC reducer and map it to this component's props
    // auth: state.auth,
    // preference: state.preference,
    // dashboard: state.dashboard
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getQcQueries: actions.loadQcQueries
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QualityCenterQueryViewer);