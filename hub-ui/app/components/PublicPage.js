import React, { Component } from 'react';
import $ from 'jquery';

export default class PublicPage extends React.Component {
  componentDidMount() {
    console.log('mounted');
    console.log($(document.body));
    $(document.body).addClass('hold-transition login-page');
    // class="hold-transition skin-blue sidebar-mini"
  }

  componentWillUnmount() {
    console.log('unmounting');
    console.log($(document.body));
    $(document.body).removeClass('hold-transition login-page');
  }  
  
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}