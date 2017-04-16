import React, { Component } from 'react';

export class WidgetContainer extends Component {

  render() {
    return (
      <div>
        {this.props.widget}
      </div>
    )
  }
}