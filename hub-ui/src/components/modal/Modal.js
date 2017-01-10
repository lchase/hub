import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import '../../../assets/style/main.less';

class Modal extends Component {
  handleOnClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  handleOnActionButton() {
    if (this.props.handleOnActionButton) {
      this.props.handleOnActionButton();
    }
  }

  render() {
    let { open, children, title, actionButtonText } = this.props;

    const styles = {};

    if (open) {
      styles.display = 'block';
    }

    return (
      <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={5000}
          transitionLeaveTimeout={3000}
          transitionAppear={true}
          transitionAppearTimeout={5000}>
        <div key="myModal" id="myModal" className="modal fadeIn" tabIndex="-1" role="dialog" style={styles}>
        
          <div key="modal-dialog" className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" onClick={this.handleOnClose.bind(this)}>&times;</span></button>
                <h4 className="modal-title">{title}</h4>
              </div>
              <div className="modal-body">
                {children}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.handleOnClose.bind(this)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={this.handleOnActionButton.bind(this)}>{actionButtonText}</button>
              </div>
            </div>
          </div>
          
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

Modal.propTypes = {
  onClose: React.PropTypes.func,
  open: React.PropTypes.bool,
  title: React.PropTypes.string,
  actionButtonText: React.PropTypes.string
};

export default Modal;