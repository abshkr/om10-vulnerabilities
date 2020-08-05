import _ from 'lodash';

const pwdComplexity = (password, confirmed_pwd, passwordComplexity) => {
  if (password !== confirmed_pwd) {
    return false;
  }

  const a = password.match(/[a-z]/g)?.length > 0;
  const A = password.match(/[A-Z]/g)?.length > 0;
  const n = password.match(/[0-9]/g)?.length > 0;
  const P = password.match(/[^a-zA-Z0-9]/g)?.length > 0;
  
  if (passwordComplexity === '6') {
    // can have alphanumeric
    return (a||A||n||P) ? true : false;
  } else if (passwordComplexity === '7') {
    // must have lowercase uppercase and number
    return (a && A && n) ? true: false;
  } else if (passwordComplexity === '15') {
    // must have lowercase uppercase number and punctuation
    return (a && A && n && P) ? true : false;
  }

  return true;
}

const complexityDesc = (passwordComplexity, t) => {
  if (passwordComplexity === '6') {
    return t("descriptions.complexitySimple");
  } else if (passwordComplexity === '7') {
    return t("descriptions.complexityMedium");
  } else if (passwordComplexity === '15') {
    return t("descriptions.complexityComplex");
  }
}

export { pwdComplexity, complexityDesc };
  