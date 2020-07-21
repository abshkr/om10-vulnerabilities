import React, { Component } from 'react';
import { Avatar } from 'antd';

export default class ProductRender extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      value: this.props.value,
      image: this.props.data.prod_image,
    };
  }

  getValue() {
    return this.state.value;
  }

  render() {
    return (
      <div style={{ width: '100%',  display: 'flex' }}>
        <Avatar 
          size="small"
          src={`api/assets/products/${this.state.image}`} 
          shape="square" 
          style={{
            marginRight:"5px", 
            // visibility:this.state.image? "visible": "hidden"
          }}
        /> 
        {this.state.value}
      </div>
    );
  }
}
