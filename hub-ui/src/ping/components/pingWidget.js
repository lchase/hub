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