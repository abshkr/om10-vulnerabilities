const decimalThousandSeparator = (separator, t) => {
  if (separator === '1') {
    return t('separators.canadianEnglishFrench');
  } else if (separator === '2') {
    return t('separators.danish');
  } else if (separator === '3') {
    return t('separators.finnish');
  } else if (separator === '4') {
    return t('separators.french');
  } else if (separator === '5') {
    return t('separators.german');
  } else if (separator === '6') {
    return t('separators.italian');
  } else if (separator === '7') {
    return t('separators.norwegian');
  } else if (separator === '8') {
    return t('separators.spanish');
  } else if (separator === '9') {
    return t('separators.swedish');
  } else if (separator === '10') {
    return t('separators.gbEnglish');
  } else if (separator === '11') {
    return t('separators.usEnglish');
  } else if (separator === '12') {
    return t('separators.thai');
  }
};

export default decimalThousandSeparator;
