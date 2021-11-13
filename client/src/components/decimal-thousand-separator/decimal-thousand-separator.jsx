import React from 'react';
import { useConfig } from 'hooks';
import NumberFormat from 'react-number-format';

const DecimalThousandSeparator = ({ text, type }) => {
  const config = useConfig();
  const seperatorType = config.decimal_thousand_separator || type;
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
  if (seperatorType && seperatorType >= 0 && seperatorType < types?.length) {
    return (
      <NumberFormat
        value={text}
        displayType={'text'}
        thousandSeparator={true}
        thousandSeparator={types[seperatorType]?.thousandSeparator}
        decimalSeparator={types[seperatorType]?.decimalSeparator}
        // decimalScale={types[seperatorType]?.decimalScale}
        fixedDecimalScale={true}
        isNumericString={true}
      />
    );
  } else {
    return <span>{text}</span>;
  }
};

export default DecimalThousandSeparator;
