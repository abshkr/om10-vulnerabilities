import { md, util } from "node-forge";
import Blowfish from "egoroof-blowfish";
import stringToHex from "./stringToHex";
import hexToArray from "./hexToArray";

const passwordHash = (username, password) => {
  const ui = username.length % 5;
  const pi = password.length % 5;
  let md5 = md.md5.create();
  md5.update(username);
  const m = md5
    .digest()
    .toHex()
    .substr(pi, pi + 5);
  md5 = md.md5.create();
  md5.update(password);
  const c = md5
    .digest()
    .toHex()
    .substr(ui, ui + 5);
  const s = m + password + c;
  const sha256 = md.sha256.create();
  sha256.update(s);
  return sha256.digest().toHex();
};

const hashKey = (username, password) => {
  const md5 = md.md5.create();
  md5.update(username);
  let m = md5.digest().toHex();
  m = m.substr(m.length / 2, m.length) + m.substr(0, m.length / 2);
  let sha256 = md.sha256.create();
  sha256.update(m);
  m = sha256.digest().toHex();
  const passData = util.hexToBytes(stringToHex(password));
  const bf = new Blowfish(new Uint8Array(hexToArray(m)).buffer);
  return util.bytesToHex(bf.encode(passData));
};

export const login = (lang, username, password) => {
  const user = username;
  const psw = passwordHash(username, password);
  const hash = hashKey(username, password);

  const payload = {
    lang,
    user,
    psw,
    hash
  };

  return payload;
};
