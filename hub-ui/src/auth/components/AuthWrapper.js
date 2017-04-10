import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * Wraps a component and checks if the user is authenticated.  If not, will re-route the user to the
 * login page, otherwise will render the wrapped component.
 */
export default function(ComposedComponent) {
  class Authentication extends Component {

    componentWillMount() {
      //console.log('Authentication', this.props);
      if (!this.props.authenticated) {
        this.context.router.push('login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('login');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authentication.contextTypes = {
    router: React.PropTypes.object
  };

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}