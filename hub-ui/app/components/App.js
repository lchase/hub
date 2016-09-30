import React, {Component} from 'react';
import DevTools from '../containers/DevTools';

export default class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
        <DevTools />
      </div>
    )
  }
}