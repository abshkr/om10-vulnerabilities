import React from 'react';
// import { useConfig } from 'hooks';
import { NumericFormat } from 'react-number-format';

/*
1,234,567.89	Australia,[49][50] Cambodia, Canada (English-speaking; unofficial), China, Hong Kong, Iran, Ireland, Israel, Japan, Korea, Macau (in Chinese and English text), Malaysia, Malta, Mexico, Namibia, New Zealand, Pakistan, Peru (currency numbers), Philippines, Singapore, South Africa (English-speaking; unofficial), Taiwan, Thailand, United Kingdom and other Commonwealth states (except Mozambique), United States.
1234567.89	SI style (English version), Canada (English-speaking; official), China, Estonia (currency numbers), Hong Kong (in education), Namibia, South Africa (English-speaking: official), Sri Lanka, Switzerland (officially encouraged for currency numbers only[51]), United Kingdom (in education), United States (in education).
1234567,89	SI style (French version), Albania, Belgium (French), Bulgaria, Canada (French-speaking), Costa Rica,[52] Croatia[53] Czech Republic, Estonia, Finland, France, Hungary, Kosovo, Latin Europe, Latvia, Lithuania, Macau (in Portuguese text), Mozambique, Norway, Peru, Poland, Portugal, Russia, Serbia, Slovakia, South Africa (in Afrikaans text), Spain (official use since 2010, according to the RAE), Sweden, Switzerland (officially encouraged, except currency numbers[51]), Ukraine, Vietnam (in education).
1,234,567·89	Malaysia, New Zealand, Philippines, Singapore, United Kingdom (older, typically handwritten; in education)
1,234.567,89	Croatia (alternative to spaces; commas and periods alternate with powers of 1000)[53]
1.234.567,89	Argentina, Austria, Belgium (Dutch), Bosnia and Herzegovina, Brazil, Chile, Colombia, Croatia (informal), Denmark, Germany, Greece, Indonesia, Italy, Netherlands, Romania, Slovenia, Serbia (informal), Spain (used until 2010, inadvisable use according to the RAE),[54][55] Turkey, Uruguay, Vietnam.
12,34,567.89	Bangladesh, India, Nepal, Pakistan (see Indian Numbering System).
1234567.89	Bangladesh, India, Nepal, Pakistan (see Indian Numbering System).
1'234'567.89	Switzerland (computing), Liechtenstein.
1'234'567,89	Switzerland (handwriting), Italy (handwriting).
1.234.567'89	Spain (handwriting, used until 1980s, inadvisable use according to the RAE).
123,4567.89	China (based on powers of 10 000—see Chinese numerals[citation needed]).
1234567.89	China (based on powers of 10 000—see Chinese numerals[citation needed]).
*/
const DecimalThousandSeparator = ({ text, type }) => {
  // const config = useConfig();
  // const seperatorType = (config.decimal_thousand_separator || type) - 1;
  const seperatorType = (type === undefined ? 13 : type) - 1;
  // console.log('................separater', seperatorType);
  const types = [
    // 1 - canadianEnglish           1 234 567.89 ?
    // 1 - canadianFrench            1 234 567,89
    // Canadian (English and French)   4 294 967 295,000
    {
      thousandSeparator: ' ',
      decimalSeparator: ',',
      decimalScale: '3',
    },
    // 2 - danish                    1.234.567,89 ?
    // Danish 4 294 967 295,000
    {
      thousandSeparator: ' ',
      decimalSeparator: ',',
      decimalScale: '3',
    },
    // 3 - finnish                   1 234 567,89
    // Finnish 4 294 967 295,000
    {
      thousandSeparator: ' ',
      decimalSeparator: ',',
      decimalScale: '3',
    },
    // 4 - french                    1 234 567,89
    // French 4 294 967 295,000
    {
      thousandSeparator: ' ',
      decimalSeparator: ',',
      decimalScale: '3',
    },
    // 5 - german                    1.234.567,89
    // German 4 294 967.295,000
    {
      thousandSeparator: '.',
      decimalSeparator: ',',
      decimalScale: '3',
    },
    // 6 - italian                   1.234.567,89
    // Italian 4.294.967.295,000
    {
      thousandSeparator: '.',
      decimalSeparator: ',',
      decimalScale: '3',
    },
    // 7 - norwegian                 1 234 567,89 ?
    // Norwegian 4.294.967.295,000
    {
      thousandSeparator: '.',
      decimalSeparator: ',',
      decimalScale: '3',
    },
    // 8 - spanish                   1 234 567,89 ?
    // Spanish 4.294.967.295,000
    {
      thousandSeparator: '.',
      decimalSeparator: ',',
      decimalScale: '3',
    },
    // 9 - swedish                   1 234 567,89
    // Swedish 4 294 967 295,000
    {
      thousandSeparator: ' ',
      decimalSeparator: ',',
      decimalScale: '3',
    },
    // 10 - gbEnglish                1,234,567.89
    // GB-English 4,294,967,295.00
    {
      thousandSeparator: ',',
      decimalSeparator: '.',
      decimalScale: '2',
    },
    // 11 - usEnglish                1,234,567.89
    // US-English 4,294,967,295.00
    {
      thousandSeparator: ',',
      decimalSeparator: '.',
      decimalScale: '2',
    },
    // 12 - thai                     1,234,567.89
    // Thai 4,294,967,295.00
    {
      thousandSeparator: ',',
      decimalSeparator: '.',
      decimalScale: '2',
    },
  ];
  if (seperatorType >= 0 && seperatorType < types?.length) {
    return (
      <NumericFormat
        value={text}
        displayType={'text'}
        // thousandSeparator={true}
        thousandSeparator={types[seperatorType]?.thousandSeparator}
        decimalSeparator={types[seperatorType]?.decimalSeparator}
        // decimalScale={types[seperatorType]?.decimalScale}
        fixedDecimalScale={true}
        valueIsNumericString={true}
      />
    );
  } else {
    return <span>{text}</span>;
  }
};

export default DecimalThousandSeparator;
