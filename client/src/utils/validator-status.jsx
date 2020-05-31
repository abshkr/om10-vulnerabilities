const validatorStatus = (isValidating, match) => {
  if (isValidating) {
    return 'validating';
  } else if (match) {
    return 'warning';
  } else {
    return 'success';
  }
};

export default validatorStatus;
