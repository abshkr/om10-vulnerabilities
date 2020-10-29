import { REGEX } from '../constants';

const validateRegexp = (code) => {
  let message = '';
  let pattern = '';

  switch (code.toUpperCase()) {
    case 'ALPHA':
      pattern = REGEX.ALPHA;
      message = 'regexpTextAlpha';
      break;
    case 'ALPHANUMERIC':
      pattern = REGEX.ALPHANUMERIC;
      message = 'regexpTextAlphaNumeric';
      break;
    case 'ALPHANUMERIC_SINGLEQUOTATION':
      pattern = REGEX.ALPHANUMERIC_SINGLEQUOTATION;
      message = 'regexpTextAlphaNumericSingleQuote';
      break;
    case 'ALPHANUMERIC_SLASH':
      pattern = REGEX.ALPHANUMERIC_SLASH;
      message = 'regexpTextAlphaNumericSlash';
      break;
    case 'ALPHANUMERIC_SLASHBRACKETS':
      pattern = REGEX.ALPHANUMERIC_SLASHBRACKETS;
      message = 'regexpTextAlphaNumericSlashBrackets';
      break;
    case 'ALPHANUMERIC_DOT':
      pattern = REGEX.ALPHANUMERIC_DOT;
      message = 'regexpTextAlphaNumericDot';
      break;
    case 'ALPHANUMERIC_MOST':
      pattern = REGEX.ALPHANUMERIC_MOST;
      message = 'regexpTextAlphaNumericMost';
      break;
    case 'ALPHANUMERIC_SPECIAL':
      pattern = REGEX.ALPHANUMERIC_SPECIAL;
      message = 'regexpTextAlphaNumericSpecial';
      break;
    case 'ALPHANUMERIC_SPECIAL_NOSQ':
      pattern = REGEX.ALPHANUMERIC_SPECIAL_NOSQ;
      message = 'regexpTextAlphaNumericSpecialNoSingleQuote';
      break;
    case 'ALPHANUMERIC_MULTILINGUAL':
      pattern = REGEX.ALPHANUMERIC_MULTILINGUAL;
      message = 'regexpTextAlphaNumericMultilingual';
      break;
    case 'BAYCODE':
      pattern = REGEX.BAYCODE;
      message = 'regexpTextBaycode';
      break;
    case 'CURRENCY':
      pattern = REGEX.CURRENCY;
      message = 'regexpTextCurrency';
      break;
    case 'DOCUMENT':
      pattern = REGEX.DOCUMENT;
      message = 'regexpTextDocument';
      break;
    case 'EMAIL':
      pattern = REGEX.EMAIL;
      message = 'regexpTextEmail';
      break;
    case 'INTEGER':
      pattern = REGEX.INTEGER;
      message = 'regexpTextInteger';
      break;
    case 'INTEGER_NONZERO':
      pattern = REGEX.INTEGER_NONZERO;
      message = 'regexpTextIntegerNonZero';
      break;
    case 'INTEGER_NEGATIVE':
      pattern = REGEX.INTEGER_NEGATIVE;
      message = 'regexpTextIntegerNegative';
      break;
    case 'INTEGER_NON_NEGATIVE':
      pattern = REGEX.INTEGER_NON_NEGATIVE;
      message = 'regexpTextIntegerNonNegative';
      break;
    case 'INTEGER_POSITIVE':
      pattern = REGEX.INTEGER_POSITIVE;
      message = 'regexpTextIntegerPositive';
      break;
    case 'INTEGER_NON_POSITIVE':
      pattern = REGEX.INTEGER_NON_POSITIVE;
      message = 'regexpTextIntegerNonPositive';
      break;
    case 'NUMERIC':
      pattern = REGEX.NUMERIC;
      message = 'regexpTextNumeric';
      break;
    case 'NUMERIC_NEGATIVE':
      pattern = REGEX.NUMERIC_NEGATIVE;
      message = 'regexpTextNumericNegative';
      break;
    case 'NUMERIC_POSITIVE':
      pattern = REGEX.NUMERIC_POSITIVE;
      message = 'regexpTextNumericPositive';
      break;
    case 'NUMERIC_NON_POSITIVE':
      pattern = REGEX.NUMERIC_NON_POSITIVE;
      message = 'regexpTextNumericNonPositive';
      break;
    case 'NUMERIC_NON_NEGATIVE':
      pattern = REGEX.NUMERIC_NON_NEGATIVE;
      message = 'regexpTextNumericNonNegative';
      break;
    case 'PASSWORD_LOW':
      pattern = REGEX.PASSWORD_LOW;
      message = 'regexpTextPasswordLow';
      break;
    case 'PASSWORD_MEDIUM':
      pattern = REGEX.PASSWORD_MEDIUM;
      message = 'regexpTextPasswordMedium';
      break;
    case 'PASSWORD_STRONG':
      pattern = REGEX.PASSWORD_STRONG;
      message = 'regexpTextPasswordStrong';
      break;
    case 'COLOR_VALUE':
      pattern = REGEX.COLOR_VALUE;
      message = 'regexpTextColorValue';
      break;
    default:
      pattern = REGEX.ALPHANUMERIC;
      message = 'regexpTextAlphaNumeric';
  }

  return { pattern: pattern, message: message };
};

export default validateRegexp;
