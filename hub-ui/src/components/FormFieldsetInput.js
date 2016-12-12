import React from 'react';

export default class FormFieldsetInput extends React.Component {
  render() {
    console.log(this.props);

    return (
      <fieldset className="form-group">
        <label>{this.props.label}</label>
        <input {...this.props.input} type={this.props.type} placeholder={this.props.placeholder} className="form-control" />
        {this.props.meta.touched ? this.props.meta.error : ''}
      </fieldset>
    )
  }
}