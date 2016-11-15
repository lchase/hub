import React, { Component } from 'react';
import SvgConnector from './SvgConnector';

export default class SvgComp extends Component {
  handleClick(e) {
    console.log(e);
  }

  render() {
    return (
      <svg width="1000" height="1000">
        <circle cx="50" cy="50" r="15" stroke="#2196F3" strokeWidth="4" fill="#BBDEFB" />
        <circle cx="150" cy="100" r="15" stroke="#2196F3" strokeWidth="4" fill="#BBDEFB" />
        <circle cx="150" cy="50" r="15" stroke="#2196F3" strokeWidth="4" fill="#BBDEFB" />

        <circle cx="250" cy="50" r="15" stroke="#2196F3" strokeWidth="4" fill="#BBDEFB" />
        <circle cx="250" cy="100" r="15" stroke="#4CAF50" strokeWidth="4" fill="#C8E6C9" />
        <circle cx="250" cy="150" r="15" stroke="#FFC107" strokeWidth="4" fill="#FFECB3" />
        
        <circle cx="250" cy="200" r="15" stroke="#2196F3" strokeWidth="4" fill="#BBDEFB" />
        <circle onClick={this.handleClick.bind(this)} cx="250" cy="300" r="15" stroke="#2196F3" strokeWidth="4" fill="#BBDEFB" />

        <circle cx="350" cy="250" r="15" stroke="#2196F3" strokeWidth="4" fill="#BBDEFB" />
        <circle cx="350" cy="100" r="15" stroke="#2196F3" strokeWidth="4" fill="#BBDEFB" />

        <circle cx="450" cy="50" r="15" stroke="#2196F3" strokeWidth="4" fill="#BBDEFB" />
        <circle cx="550" cy="50" r="15" stroke="#2196F3" strokeWidth="4" fill="#BBDEFB" />

        <SvgConnector x1={150} y1={65} x2={150} y2={85} />
        <SvgConnector x1={65} y1={50} x2={135} y2={50} />
        <SvgConnector x1={65} y1={50} x2={135} y2={100} />
        <SvgConnector x1={165} y1={100} x2={235} y2={150} />
        <SvgConnector x1={165} y1={100} x2={235} y2={200} />
        <SvgConnector x1={165} y1={100} x2={235} y2={300} />
        <SvgConnector x1={165} y1={100} x2={235} y2={50} />
        <SvgConnector x1={165} y1={100} x2={235} y2={100} />

        <SvgConnector x1={265} y1={200} x2={335} y2={250} />
        <SvgConnector x1={165} y1={100} x2={335} y2={250} midAdjust={-50} />

        <SvgConnector x1={265} y1={50} x2={335} y2={100} />
        <SvgConnector x1={265} y1={100} x2={335} y2={100} />
        <SvgConnector x1={265} y1={150} x2={335} y2={100} />

        <SvgConnector x1={365} y1={100} x2={435} y2={50} />
        <SvgConnector x1={365} y1={250} x2={435} y2={50} />
        <SvgConnector x1={265} y1={300} x2={435} y2={50} midAdjust={50} />
        <SvgConnector x1={465} y1={50} x2={535} y2={50} />

        <text x="50" y="30" fill="#2196F3" fontFamily="Tahoma" textAnchor="middle" fontSize="16" fontWeight="normal">
          Text Test
        </text>
      </svg>
    )
  }
}