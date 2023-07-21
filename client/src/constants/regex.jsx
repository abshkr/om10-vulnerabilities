export const ALPHANUMERIC_I = /^[a-z0-9]+$/i;
export const EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const URL = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
export const PASSWORD_COMPLEXITY = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/; // should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long

export const ALPHA = /^([A-Za-z]+[ \t\v\n\r\f]*)+$/;
export const ALPHANUMERIC = /^([A-Za-z0-9-_]+[ \t\v\n\r\f]*)+$/;
export const ALPHA_NOSPACE = /^([A-Za-z]+)+$/;
export const ALPHANUMERIC_NOSPACE = /^([A-Za-z0-9-_]+)+$/;
// export const ALPHANUMERIC_SINGLEQUOTATION = /^([A-Za-z0-9-_\\']+[ \t\v\n\r\f]*)+$/;
export const ALPHANUMERIC_SINGLEQUOTATION = /^([A-Za-z0-9-_\']+[ \t\v\n\r\f]*)+$/;
export const ALPHANUMERIC_SLASH = /^([A-Za-z0-9-_\/]+[ \t\v\n\r\f]*)+$/;
// export const ALPHANUMERIC_SLASHBRACKETS = /^([A-Za-z0-9-_/\\[\\]\\<\\>\\(\\)\\{\\}]+[ \t\v\n\r\f]*)+$/;
export const ALPHANUMERIC_SLASHBRACKETS = /^([A-Za-z0-9-_\/\[\]\<\>\(\)\{\}]+[ \t\v\n\r\f]*)+$/;
// export const ALPHANUMERIC_DOT = /^([A-Za-z0-9-_\\.]+[ \t\v\n\r\f]*)+$/;
export const ALPHANUMERIC_DOT = /^([A-Za-z0-9-_\.]+[ \t\v\n\r\f]*)+$/;
// export const ALPHANUMERIC_MOST = /^([A-Za-z0-9-_/\\&\\[\\]\\<\\>\\(\\)\\{\\}]+[ \t\v\n\r\f]*)+$/;
export const ALPHANUMERIC_MOST = /^([A-Za-z0-9-_\/\&\[\]\<\>\(\)\{\}]+[ \t\v\n\r\f]*)+$/;
// export const ALPHANUMERIC_SPECIAL = /^([A-Za-z0-9-_/\\\\\'\\&\\[\\]\\<\\>\\(\\)\\{\\}\\,\\.]+[ \t\v\n\r\f]*)+$/;
export const ALPHANUMERIC_SPECIAL = /^([A-Za-z0-9-_\/\\\'\&\[\]\<\>\(\)\{\}\,\.]+[ \t\v\n\r\f]*)+$/;
// export const ALPHANUMERIC_SPECIAL_NOSQ = /^([A-Za-z0-9-_/\\\\\&\\[\\]\\<\\>\\(\\)\\{\\}\\,\\.]+[ \t\v\n\r\f]*)+$/;
export const ALPHANUMERIC_SPECIAL_NOSQ = /^([A-Za-z0-9-_\/\\\&\[\]\<\>\(\)\{\}\,\.]+[ \t\v\n\r\f]*)+$/;
export const ALPHANUMERIC_MULTILINGUAL = /^[\u0001-\ufffd]+$/;
export const ALPHANUMERIC_HOSTCOMM = /^([^\>\`\'\&\<])*$/;

export const COLOR_VALUE = /^#([0-9a-fA-F]{6})$/;

//export const BAYCODE = /^BAY[0-9]+$/;
//export const BAYCODE = /^BAY[0-9][0-9][A-Z0-9]$/;
export const BAYCODE = /^BAY[A-Za-z0-9]+$/;
export const ARMCODE = /^A[0-9]+$/;
export const FEIN = /^([0-9]{9})+$/;
export const SSN = /^([0-9]{9})+$/;
// export const CFEIN = /^([0-9]{9})([FSU]{1})+$/;
export const CFEIN = /^((([0-9]{9})([FS]{1}))|(([0]{9})([U]{1})))+$/;

export const CURRENCY = /^[0-9]+(\.[0-9]{1,2})?$/;
// export const DOCUMENT = /^([^\\x00-\\xff]|[\\x00-\\xff])*$/;
export const DOCUMENT = /^([^\x00-\xff]|[\x00-\xff])*$/;
// export const EMAIL2 = /^[\\w.-]+@\\w[\\w.-]+\\.[\\w.-]*[a-z][a-z]*([\\;\\:][ \t\v\n\r\f]*[\\w.-]+@\\w[\\w.-]+\\.[\\w.-]*[a-z][a-z]*)*$/;
export const EMAIL2 = /^[\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]*([\;\:][ \t\v\n\r\f]*[\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]*)*$/;

export const INTEGER = /^(-?[0-9]+[ \t\v\n\r\f]*)+$/;
export const INTEGER_NONZERO = /^([1-9][0-9]*[ \t\v\n\r\f]*)+$/;
// export const INTEGER_NEGATIVE = /^-[1-9]\\d*$/;
export const INTEGER_NEGATIVE = /^-[1-9]\d*$/;
// export const INTEGER_NON_NEGATIVE = /^(([1-9]\\d*)|(0))$/;
export const INTEGER_NON_NEGATIVE = /^(([1-9]\d*)|(0))$/;
// export const INTEGER_POSITIVE = /^[1-9]\\d*$/;
export const INTEGER_POSITIVE = /^[1-9]\d*$/;
// export const INTEGER_NON_POSITIVE = /^((-[1-9]\\d*)|(0))$/;
export const INTEGER_NON_POSITIVE = /^((-[1-9]\d*)|(0))$/;

// export const NUMERIC = /^(-?(([1-9]\\d*)|(0)))(\\.\\d+)?$/;
// export const NUMERIC_NEGATIVE = /^(-((([1-9]\\d*)(\\.\\d+)?)|((0)?(\\.((\\d*[1-9]\\d*)|([1-9]\\d*)))+)))$/;
// export const NUMERIC_POSITIVE = /^((([1-9]\\d*)(\\.\\d+)?)|((0)?(\\.((\\d*[1-9]\\d*)|([1-9]\\d*)))+))$/;
// export const NUMERIC_NON_POSITIVE = /^((-(([1-9]\\d*)|(0)?)(\\.\\d+)?)|(0+(\\.0+)?))$/;
// export const NUMERIC_NON_NEGATIVE = /^(([1-9]\\d*)|(0)?)(\\.\\d+)?$/;
export const NUMERIC = /^(-?(([1-9]\d*)|(0)))(\.\d+)?$/;
export const NUMERIC_CHARS = /^[0-9]*$/;
export const NUMERIC_NEGATIVE = /^(-((([1-9]\d*)(\.\d+)?)|((0)?(\.((\d*[1-9]\d*)|([1-9]\d*)))+)))$/;
export const NUMERIC_POSITIVE = /^((([1-9]\d*)(\.\d+)?)|((0)?(\.((\d*[1-9]\d*)|([1-9]\d*)))+))$/;
export const NUMERIC_NON_POSITIVE = /^((-(([1-9]\d*)|(0)?)(\.\d+)?)|(0+(\.0+)?))$/;
export const NUMERIC_NON_NEGATIVE = /^(([1-9]\d*)|(0)?)(\.\d+)?$/;

export const PASSWORD_LOW = /^[A-Za-z0-9]+$/;

export const PASSWORD_MEDIUM = /^\w*(?=\w*\d)(?=\w*[a-z])(?=\w*[A-Z])\w*$/;
export const PASSWORD_STRONG = /^.*(?=.{4,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).*$/;
