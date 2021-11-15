import React, { Component } from 'react';
import { Select, Tag } from 'antd';
import _ from 'lodash';

export default class TagListRenderer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }


  render() {
    const { data, dataColumn, flagColumn } = this.props;
    //console.log("quantity renderer, props", this.props);
    const clnTexts = data?.[dataColumn];
    const texts = clnTexts?.split(', ');
    const clnFlags = data?.[flagColumn];
    const flags = !clnFlags ? _.fill(Array(texts?.length, '1')) :  clnFlags?.split(', ');

    return (
      <div style={{ display: 'flex' }}>
        {texts?.map((item, index) => {
            const flag = flags?.[index];
            console.log('......................taglist', item, index, flags?.[index], flag);
            if ( flag === '1') {
                return (<Tag key={index} color='blue'>{item}</Tag>);
            } else {
                return (<Tag key={index} color='red'>{item}</Tag>);
            }
        })}
      </div>
    );
  }
}
