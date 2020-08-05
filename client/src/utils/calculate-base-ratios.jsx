import _ from 'lodash';

const calcBaseRatios = (prodQty, baseRatio, totalRatio) => {
    const qty = _.toNumber(prodQty);
    const ratio = _.toNumber(baseRatio);
    const total = _.toNumber(totalRatio);

    // console.log('calcBaseQuantity1', prodQty, baseRatio, totalRatio);
    // console.log('calcBaseQuantity2', qty, ratio, total);
    // console.log('calcBaseQuantity3', (qty * ratio / total));

    if (total !== 0 && qty !== NaN) {
      return (qty * ratio / total);
    }
    else {
      return 0;
    }
  };
  
 export default calcBaseRatios;
  