import React, { Component } from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

export default class AffixRenderer extends Component {
  render() {
    const { value, colDef } = this.props;

    const type = colDef?.type || '';
    const affix = colDef?.symbol || '';

    if (type === 'prefix') {
      return (
        <div>
          {affix}
          {value}
        </div>
      );
    }

    return (
      <div>
        {value}
        {affix}
      </div>
    );
  }
}
