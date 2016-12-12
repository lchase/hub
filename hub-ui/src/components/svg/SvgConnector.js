import React, { Component } from 'react';

export default class SvgConnector extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      endPointsEnabled: true
    }
  }

  renderEndpoints() {
    var results = [];
    if (this.state.endPointsEnabled) {
      results.push()
    }
  }

  handleMouseOver() {
    /*this.setState({
      endPointsEnabled: true
    })*/
  }

  handleMouseOut() {
    /*this.setState({
      endPointsEnabled: false
    })*/   
  }

  render() {
    let { x1, y1, x2, y2, midAdjust } = this.props;
    let strokeColor = "#64B5F6";
    let strokeLineWidth = 2;
    let strokeCircleWidth = 2;
    let circleRadius = 4;

    let circles = [];
    if (this.state.endPointsEnabled) {
      circles.push(<circle key={x1+'-'+y1} cx={x1} cy={y1} r={circleRadius} stroke={strokeColor} strokeWidth={strokeCircleWidth} fill="white" />);
      circles.push(<circle key={x2+'-'+y2} cx={x2} cy={y2} r={circleRadius} stroke={strokeColor} strokeWidth={strokeCircleWidth} fill="white" />);
    }

    if (x1 == x2 || y1 == y2) {
      return (
        <g onMouseOver={this.handleMouseOver.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}>
          <path d={'M'+x1+' '+y1+' L '+x2+' '+y2} stroke={strokeColor} strokeWidth={strokeLineWidth} fill="transparent"/>
          {circles}
        </g>
      )
    } else {

      let midX = x1+(x2-x1)/2 + (midAdjust || 0);
      let radius = 15;
      let yDir = y2 > y1 ? 1 : -1; 

      return (
        <g onMouseOver={this.handleMouseOver.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}>
          <path d={'M'+x1+' '+y1+' L '+(midX-radius)+' '+y1} stroke={strokeColor} strokeWidth={strokeLineWidth} fill="transparent"/>
          <path d={'M'+(midX-radius)+' '+y1+' Q '+midX+' '+y1+' '+midX+' '+(y1+(yDir*radius))} strokeWidth={strokeLineWidth} stroke={strokeColor} fill="transparent"/>
          <path d={'M'+midX+' '+(y1+(yDir*radius))+' L '+midX+' '+(y2-(yDir*radius))} stroke={strokeColor} strokeWidth={strokeLineWidth} fill="transparent"/>
          
          <path d={'M'+midX+' '+(y2-(yDir*radius))+' Q '+midX+' '+y2+' '+(midX+radius)+' '+y2} strokeWidth={strokeLineWidth} stroke={strokeColor} fill="transparent"/>
          
          <path d={'M'+(midX+radius)+' '+y2+' L '+x2+' '+y2} stroke={strokeColor} strokeWidth={strokeLineWidth} fill="transparent"/>

          {circles}
        </g>
      )
    }
  }
}