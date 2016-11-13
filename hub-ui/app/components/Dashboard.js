import React, { Component } from 'react';
import ChatWidget from './chat/ChatWidget';
var ReactGridLayout = require('react-grid-layout');

export default class Dashboard extends Component {
  render() {
    // layout is an array of objects, see the demo for more complete usage
    var layout = [
      {i: 'a', x: 0, y: 0, w: 4, h: 4, static: true},
      {i: 'b', x: 4, y: 0, w: 4, h: 4, minW: 2, maxW: 4},
      {i: 'c', x: 4, y: 1, w: 4, h: 4}
    ];
    return (
      <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={90} width={1200}>
        <div key={'a'}>
          <ChatWidget />
        </div>
        <div key={'b'}>
          <ChatWidget />
        </div>
        <div key={'c'}>
          <ChatWidget />
        </div>
      </ReactGridLayout>
    )
  }
}