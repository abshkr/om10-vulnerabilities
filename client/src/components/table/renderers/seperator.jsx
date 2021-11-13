import React, { Component } from 'react';
// import NumberFormat from 'react-number-format';
import { DecimalThousandSeparator } from 'components';

export default class SeperatorRenderer extends Component {
  render() {
    const { value, type } = this.props;
    // console.log('.................sep', type);
/*     const types = [
      {
        thousandSeparator: ' ',
        decimalSeparator: ',',
        decimalScale: '3',
      },
      {
        thousandSeparator: ' ',
        decimalSeparator: ',',
        decimalScale: '3',
      },
      {
        thousandSeparator: ' ',
        decimalSeparator: ',',
        decimalScale: '3',
      },
      {
        thousandSeparator: ' ',
        decimalSeparator: ',',
        decimalScale: '3',
      },
      {
        thousandSeparator: '.',
        decimalSeparator: ',',
        decimalScale: '3',
      },
      {
        thousandSeparator: '.',
        decimalSeparator: ',',
        decimalScale: '3',
      },
      {
        thousandSeparator: '.',
        decimalSeparator: ',',
        decimalScale: '3',
      },
      {
        thousandSeparator: '.',
        decimalSeparator: ',',
        decimalScale: '3',
      },
      {
        thousandSeparator: ' ',
        decimalSeparator: ',',
        decimalScale: '3',
      },
      {
        thousandSeparator: ',',
        decimalSeparator: '.',
        decimalScale: '2',
      },
      {
        thousandSeparator: ',',
        decimalSeparator: '.',
        decimalScale: '2',
      },
      {
        thousandSeparator: ',',
        decimalSeparator: '.',
        decimalScale: '2',
      },
    ];
 */
    return (
      <div style={{ display: 'flex' }}>
        <DecimalThousandSeparator
          text={value}
          type={type}
        ></DecimalThousandSeparator>
      </div>
    );

    /* if (type && type >= 0 && type < types?.length) {
      return (
        <NumberFormat
          value={value}
          displayType={'text'}
          thousandSeparator={true}
          thousandSeparator={types[type]?.thousandSeparator}
          decimalSeparator={types[type]?.decimalSeparator}
          // decimalScale={types[type]?.decimalScale}
          fixedDecimalScale={true}
          isNumericString={true}
        />
      );
    } else {
      return <div>{value}</div>;
    } */
  }
}
