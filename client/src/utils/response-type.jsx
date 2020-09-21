const responseType = (type, t) => {
  if (type === 'OK') {
    return t('messages.response200');
  }
  if (type === 'Base Request') {
    return t('messages.response400');
  }
  if (type === 'Unauthorized') {
    return t('messages.response401');
  }
  if (type === 'Method Not Allowed') {
    return t('messages.response405');
  }
  if (type === 'Invalid Token') {
    return t('messages.response498');
  }
  if (type === 'Internal Server Error') {
    return t('messages.response500');
  }
  if (type === 'Unknown Error') {
    return t('messages.responseOther');
  }

  return t('messages.responseOther');
};

export default responseType;
