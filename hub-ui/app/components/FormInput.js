import React from 'react';

export default class FormInput extends React.Component {
  render() {
    console.log(this.props);

    var containerClassName = "form-group has-feedback";
    if (this.props.meta.touched && this.props.meta.error) {
      containerClassName += " has-error";
    }

    return (
      <div className={containerClassName}>
        <input {...this.props.input} placeholder={this.props.placeholder} className={this.props.className} type={this.props.type} />
        {this.props.inlineIco && <span className={"glyphicon " + this.props.inlineIco + " form-control-feedback"}></span>}
        
        {this.props.meta.touched && this.props.meta.error && <span className="help-block">{this.props.meta.error}</span>}
        
      </div>
    )
  }
}