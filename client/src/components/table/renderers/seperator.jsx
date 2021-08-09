import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

export default class SeperatorRenderer extends Component {
  render() {
    const { value, type } = this.props;

    const types = [
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

    if (type) {
      return (
        <NumberFormat
          value={value}
          displayType={'text'}
          thousandSeparator={true}
          thousandSeparator={types[type]?.thousandSeparator}
          decimalSeparator={types[type]?.decimalSeparator}
          decimalScale={types[type]?.decimalScale}
          fixedDecimalScale={true}
          isNumericString={true}
        />
      );
    } else {
      return <div></div>;
    }
  }
}
