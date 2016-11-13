import React, { Component } from 'react';
import { connect } from 'react-redux';

export class FollowBox extends Component {
  render() {
    return (
      <div className="box box-primary">
        <div className="box-body box-profile">
          <img src="assets/img/placeholder-user-image.png" className="profile-user-img img-responsive img-circle" alt="User Image" />
          <h3 className="profile-username text-center">{this.props.user.firstName} {this.props.user.lastName}</h3>

          <p className="text-muted text-center">Software Engineer</p>

          <ul className="list-group list-group-unbordered">
            <li className="list-group-item">
              <b>Followers</b> <a className="pull-right">1,322</a>
            </li>
            <li className="list-group-item">
              <b>Following</b> <a className="pull-right">543</a>
            </li>
            <li className="list-group-item">
              <b>Friends</b> <a className="pull-right">13,287</a>
            </li>
          </ul>
          <a href="#" className="btn btn-primary btn-block"><b>Follow</b></a>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(FollowBox);