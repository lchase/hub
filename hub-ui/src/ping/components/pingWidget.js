import React from 'react';
import { ping } from '../pingActions'
import { connect } from 'react-redux';

export class PingWidget extends React.Component {
  getHeaderText() {
    if (this.props.isPinging) {
      return "Ping";
    }
    return "Pong";
  }

  sendPingEvent() {
    console.log("Sending ping event...");
    this.props.sendPingEvent();
  }

  //TODO: this is not getting called.  Need to have the UI reflect the changes
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.isPinging != nextProps.isPinging) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div className="box box-success" style={{ height: '100%', overflow: 'hidden' }}>
        <div className="box-header ui-sortable-handle" style={{cursor: 'move'}}>
          <i className="fa fa-comments-o"/>

          <h3 className="box-title">{this.getHeaderText()}</h3>

          <div className="box-tools pull-right" data-toggle="tooltip" title="Status">
            <div className="btn-group" data-toggle="btn-toggle">
              <button type="button" className="btn btn-default btn-sm active"><i className="fa fa-square text-green"/>
              </button>
              <button type="button" className="btn btn-default btn-sm" onClick={this.sendPingEvent.bind(this)}><i className="fa fa-square text-red"/></button>
            </div>
          </div>
        </div>
        <div className="slimScrollDiv" style={{ position: 'relative', overflow: 'hidden', width: 'auto', height: '250px'}}>
          <div className="box-body chat" id="chat-box" style={{overflow: 'hidden', width: 'auto', height: '250px' }}>

            <div className="item">
              <img src="assets/img/placeholder-user-image.png" alt="user image" className="online" />

              <p className="message">
                <a href="#" className="name">
                  <small className="text-muted pull-right"><i className="fa fa-clock-o"/> 2:15</small>
                  Mike Doe
                </a>
                I would like to meet you to discuss the latest news about
                the arrival of the new theme. They say it is going to be one the
                best themes on the market
              </p>
              <div className="attachment">
                <h4>Attachments:</h4>

                <p className="filename">
                  Theme-thumbnail-image.jpg
                </p>

                <div className="pull-right">
                  <button type="button" className="btn btn-primary btn-sm btn-flat">Open</button>
                </div>
              </div>

            </div>
            <div className="item">
              <img src="assets/img/placeholder-user-image.png" alt="user image" className="offline" />

              <p className="message">
                <a href="#" className="name">
                  <small className="text-muted pull-right"><i className="fa fa-clock-o"/> 5:15</small>
                  Alexander Pierce
                </a>
                I would like to meet you to discuss the latest news about
                the arrival of the new theme. They say it is going to be one the
                best themes on the market
              </p>
            </div>
            <div className="item">
              <img src="assets/img/placeholder-user-image.png" alt="user image" className="offline" />

              <p className="message">
                <a href="#" className="name">
                  <small className="text-muted pull-right"><i className="fa fa-clock-o"/> 5:30</small>
                  Susan Doe
                </a>
                I would like to meet you to discuss the latest news about
                the arrival of the new theme. They say it is going to be one the
                best themes on the market
              </p>
            </div>

          </div>
          <div className="slimScrollBar" style={{
            background: 'rgb(0, 0, 0)',
            width: '7px',
            position: 'absolute',
            top: '0px',
            opacity: 0.4,
            display: 'block',
            borderRadius: '7px',
            zIndex: 99,
            right: '1px',
            height: '184.911px'
          }}></div>
          <div className="slimScrollRail" style={{
            width: '7px',
            height: '100%',
            position: 'absolute',
            top: '0px',
            display: 'none',
            borderRadius: '7px',
            background: 'rgb(51, 51, 51)',
            opacity: 0.2,
            zIndex: 90,
            right: '1px'
          }}></div>
        </div>

        <div className="box-footer">
          <div className="input-group">
            <input className="form-control" placeholder="Type message..." />

            <div className="input-group-btn">
              <button type="button" className="btn btn-success"><i className="fa fa-plus"/></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PingWidget.propTypes = {
  isPinging: React.PropTypes.bool
};

//TODO: move the following to container???
function mapDispatchToProps(dispatch) {
  return {
    sendPingEvent: () => { dispatch(ping()) }
  }
}

function mapStateToProps(state) {
  return { isPinging: state.ping.isPinging }
}

export default connect(mapStateToProps, mapDispatchToProps)(PingWidget);