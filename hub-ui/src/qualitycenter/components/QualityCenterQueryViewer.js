import React, { Component } from 'react';

export default class QualityCenterQueryBuilder extends Component {

  render() {
    console.log("QualityCenterQueryBuilder this.props: ");
    console.log(this.props);
    return <div>QualityCenterQueryBuilder!</div>
    //TODO: pass in required props for the quality center query viewer widget or have this be a container that pulls the required values,
    //and pass in only minimal data instead like ids

    // return <div>
    //   <ul>
    //     {this.props.queries.forEach(query => <li>Query Expression</li>)};
    //   </ul>
    // </div>
  }
}