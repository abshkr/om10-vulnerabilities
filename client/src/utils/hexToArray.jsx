const hexToArray = hex => {
  hex = hex.replace(/\s|:/gm, "");
  let a = [];
  // eslint-disable-next-line
  if (hex.length & (1 == 1)) hex = "0" + hex;
  for (let i = 0; i < hex.length; i += 2) {
    a[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return a;
};

export default hexToArray;
