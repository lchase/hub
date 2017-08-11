import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGridLayout from 'react-grid-layout';

import ChatWidget from '../../components/chat/ChatWidget';
import AddDashboardDialog from './AddDashboardDialog';
import { DatePicker, Progress, Card } from 'antd';

const defaultWidgetWidth = 3;
const defaultWidgetHeight = 3;

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
    console.log('Dashboard.constructor', props);
  }

  render() {
    return (
      <ReactGridLayout className="layout" cols={12} rowHeight={30} width={1200}>
        {this.props.widgetComponents.map(component => {
          let Widget = component.slug;
          //let componentProps = component.props;
          // return <Widget key={component.id}>
          // </Widget>
          return <div key={component.id}
                      data-grid={{
                        x: component.column * defaultWidgetWidth,
                        y: component.row * defaultWidgetHeight,
                        w: defaultWidgetWidth,
                        h: defaultWidgetHeight,
                        minW: 2,
                        maxW: 4}}>
            <Widget key={component.id}>

            </Widget>
          </div>
        })}
      </ReactGridLayout>
    );

    //TODO: test render the component, show an error in UI if component rendering failed

    //NOTE: It is important that "TestComponent" or any user-defined component (i.e. one that is not built in to react) start with a
    //capital letter in order to be instantiated correctly.
    // See https://facebook.github.io/react/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized
    //let TestComponent = this.props.component.slug;
    // return <TestComponent {...this.props}>
    //   {this.props.component.value}
    // </TestComponent>;

    // return (
    //   <ul>
    //     {this.props.widgetComponents.map(component => {
    //       let Widget = component.slug;
    //       //let componentProps = component.props;
    //       return <Widget key={component.id}>
    //       </Widget>
    //     })}
    //   </ul>
    // );

  }
}

Dashboard.propTypes = {
  widgetComponents: PropTypes.array.isRequired
};

/*

      <DatePicker />
      <Card title="Card title" extra={<a href="#">More</a>} style={{ width: 300 }}>
        <div>
          <Progress percent={30} strokeWidth={5} />
          <Progress percent={50} strokeWidth={5} status="active" />
          <Progress percent={70} strokeWidth={5} status="exception" />
          <Progress percent={100} strokeWidth={5} />
          <Progress percent={50} strokeWidth={5} showInfo={false} />
          <Progress type="circle" percent={30} width={80} />
          <Progress type="circle" percent={70} width={80} status="exception" />
          <Progress type="circle" percent={100} width={80} />
        </div>
      </Card>
      <AddDashboardDialog />
      <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={90} width={1200}>
        <div key={'a'}>
          <ChatWidget />
        </div>
        <div key={'b'}>
          <PingWidget />
        </div>
        <div key={'c'}>
          <ChatWidget />
        </div>
      </ReactGridLayout>

*/