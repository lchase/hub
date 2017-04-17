import React, {Component} from 'react';
import Sidebar from './Sidebar';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import Rightbar from './Rightbar';
import $ from 'jquery';

export default class Content extends Component {
  
  componentDidMount() {
    $(document.body).addClass('hold-transition skin-blue sidebar-mini');
    // class="hold-transition skin-blue sidebar-mini"
  }

  componentWillUnmount() {
    $(document.body).removeClass('hold-transition skin-blue sidebar-mini');
  }

  render() {
    return (
      <div className="wrapper">
        <PageHeader />
        <Sidebar />
        <div className="content-wrapper">
          <section className="content-header">
            <h1>
              Page Header
              <small>Optional description *</small>
            </h1>
            <ol className="breadcrumb">
              <li><a href="#"><i className="fa fa-dashboard"></i> Level</a></li>
              <li className="active">Here</li>
            </ol>
          </section>
        
          <section className="content">
            {this.props.children}
          </section>
        </div>
        <PageFooter />
        <Rightbar />
      </div>
    );
  }
}