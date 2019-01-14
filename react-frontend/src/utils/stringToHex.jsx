const stringToHex = str => {
  let val = "";
  for (let i = 0; i < str.length; i++) {
    val += str.charCodeAt(i).toString(16);
  }
  return val;
};

export default stringToHex;
