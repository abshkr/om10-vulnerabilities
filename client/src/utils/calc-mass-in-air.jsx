import _ from 'lodash';

const calcWiA = (mass, std, dens, factor) => {
  // WiA = WiV - GSV x 0.0011
  let WiV = mass;
  let GSV = std;
  let Dstd = dens;

  const AIR = !factor ? 0.0011 : factor;
  let WiA = undefined;

  if (!Dstd) {
    if ((WiV !== 0 && !WiV) || (GSV !== 0 && !GSV)) {
      WiA = '';
    } else {
      // WiA = _.round(_.toNumber(WiV) - _.toNumber(GSV) * AIR, precision);
      WiA = _.toNumber(WiV) - _.toNumber(GSV) * AIR;
    }
  } else {
    if (GSV !== 0 && !GSV) {
      WiA = '';
    } else {
      // WiA = _.round(_.toNumber(GSV) * (_.toNumber(Dstd) / 1000.0 - AIR), precision);
      WiA = _.toNumber(GSV) * (_.toNumber(Dstd) / 1000.0 - AIR);
    }
  }

  return WiA;
};

export default calcWiA;
