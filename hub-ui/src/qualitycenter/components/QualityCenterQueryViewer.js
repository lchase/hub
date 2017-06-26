import React, { Component } from 'react';

export default class QualityCenterQueryBuilder extends Component {

  render() {
    console.log("QualityCenterQueryBuilder this.props: ");
    console.log(this.props);
    return <div>
      <ul>
        {this.props.queries.forEach(query => <li>Query Expression</li>)};
      </ul>
    </div>
  }
}