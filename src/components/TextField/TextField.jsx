import React, { Component } from 'react';

class TextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: props.heading,
      text: props.text
    };
  }
  render() {
    const { heading, text } = this.state;

    return (
      <div className='textfield'>
        <h2 className='font-weight-bold'>{heading}</h2>
        <p className='font-weight-light'>{text}</p>
      </div>
    );
  }
}

export default TextField;
