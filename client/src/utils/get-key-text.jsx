const getKeyText = (code, name) => {
  let txt = code;
  if (name !== undefined && name !== null && name.trim() !== '' && name !== code) {
    txt = `${code} - ${name}`;
  }
  return txt;
};

export default getKeyText;
