import React from 'react';
import { useConfig } from 'hooks';
import NumberFormat from 'react-number-format';

const DecimalThousandSeparator = ({ text }) => {
  const config = useConfig();
  const seperatorType = config.decimal_thousand_separator;

  if (seperatorType) {
    switch (seperatorType) {
      case '1':
        return (
          <NumberFormat
            value={text}
            displayType={'text'}
            thousandSeparator={true}
            thousandSeparator=" "
            decimalSeparator=","
            decimalScale="3"
            fixedDecimalScale={true}
            isNumericString={true}
          />
        );
      case '2':
        return (
          <NumberFormat
            value={text}
            displayType={'text'}
            thousandSeparator={true}
            thousandSeparator=" "
            decimalSeparator=","
            decimalScale="3"
            fixedDecimalScale={true}
            isNumericString={true}
          />
        );
      case '3':
        return (
          <NumberFormat
            value={text}
            displayType={'text'}
            thousandSeparator={true}
            thousandSeparator=" "
            decimalSeparator=","
            decimalScale="3"
            fixedDecimalScale={true}
            isNumericString={true}
          />
        );
      case '4':
        return (
          <NumberFormat
            value={text}
            displayType={'text'}
            thousandSeparator={true}
            thousandSeparator=" "
            decimalSeparator=","
            decimalScale="3"
            fixedDecimalScale={true}
            isNumericString={true}
          />
        );
      case '5':
        return (
          <NumberFormat
            value={text}
            displayType={'text'}
            thousandSeparator={true}
            thousandSeparator="."
            decimalSeparator=","
            decimalScale="3"
            fixedDecimalScale={true}
            isNumericString={true}
          />
        );
      case '6':
        return (
          <NumberFormat
            value={text}
            displayType={'text'}
            thousandSeparator={true}
            thousandSeparator="."
            decimalSeparator=","
            decimalScale="3"
            fixedDecimalScale={true}
            isNumericString={true}
          />
        );
      case '7':
        return (
          <NumberFormat
            value={text}
            displayType={'text'}
            thousandSeparator={true}
            thousandSeparator="."
            decimalSeparator=","
            decimalScale="3"
            fixedDecimalScale={true}
            isNumericString={true}
          />
        );
      case '8':
        return (
          <NumberFormat
            value={text}
            displayType={'text'}
            thousandSeparator={true}
            thousandSeparator="."
            decimalSeparator=","
            decimalScale="3"
            fixedDecimalScale={true}
            isNumericString={true}
          />
        );
      case '9':
        return (
          <NumberFormat
            value={text}
            displayType={'text'}
            thousandSeparator={true}
            thousandSeparator=" "
            decimalSeparator=","
            decimalScale="3"
            fixedDecimalScale={true}
            isNumericString={true}
          />
        );
      case '10':
        return (
          <NumberFormat
            value={text}
            displayType={'text'}
            thousandSeparator={true}
            decimalSeparator="."
            thousandSeparator=","
            decimalScale="2"
            fixedDecimalScale={true}
            isNumericString={true}
          />
        );
      case '11':
        return (
          <NumberFormat
            value={text}
            displayType={'text'}
            thousandSeparator={true}
            decimalSeparator="."
            thousandSeparator=","
            decimalScale="2"
            fixedDecimalScale={true}
            isNumericString={true}
          />
        );
      case '12':
        return (
          <NumberFormat
            value={text}
            displayType={'text'}
            thousandSeparator={true}
            decimalSeparator="."
            thousandSeparator=","
            decimalScale="2"
            fixedDecimalScale={true}
            isNumericString={true}
          />
        );
    }
  } else {
    return <span>Error</span>;
  }
};

export default DecimalThousandSeparator;
