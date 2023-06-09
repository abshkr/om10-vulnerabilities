import _ from 'lodash';

const adjustPreloadQuantity = (flag, cmptSafefill, qtyScheduled, qtyPreload) => {
  const safefill = !cmptSafefill ? 0 : _.toNumber(cmptSafefill);
  const value = !qtyPreload ? 0 : _.round(_.toNumber(qtyPreload), 0);
  let scheduled = !qtyScheduled ? 0 : _.round(_.toNumber(qtyScheduled), 0);

  console.log('................adjustPreloadQuantity.......', flag, cmptSafefill, qtyScheduled, qtyPreload);
  console.log('................adjustPreloadQuantity22.......', safefill, scheduled, value);
  if (scheduled > safefill) {
    scheduled = safefill;
  }

  let max = 0;
  if (flag) {
    // flag === true: RTC always deduct the returns from preset (Scheduled qty) [RULE: preload <= min(safeFill, preset)].
    // max = _.min([safefill, scheduled, loaded]);
    max = _.min([safefill, scheduled]);
  } else {
    // flag === false: Load the preset amount and do not deduct the returns [RULE: preloaded + scheduled (preset) <= safefill].
    max = safefill - scheduled;
  }

  const preload = value <= max ? value : max;
  console.log('................adjustPreloadQuantity333.......', safefill, scheduled, value, max, preload);

  return preload;
};

export default adjustPreloadQuantity;
