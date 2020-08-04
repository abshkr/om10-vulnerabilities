import _ from 'lodash';

const buildMeterTransfer = (arm, cmptNo) => {
  const meter = {
    trsf_mtr_opn_amb: null,
    trsf_mtr_opn_cor: null,
    trsf_mtr_open_kg: null,
    trsf_mtr_cls_amb: null,
    trsf_mtr_cls_cor: null,
    trsf_mtr_close_kg: null,
    injector_or_meter: arm?.meter_type_code,
    trsf_mtr_cd: arm?.stream_mtrcode,
    trsf_mtr_typ: `${arm?.meter_type_code} - ${arm?.meter_type_desc}`,
    trsf_cmpt_no: cmptNo,
  };

  return meter;
};

const buildMeterTransfersByArm = (prodArms, armCode, prodCmpy, prodCode, cmptNo) => {
  const arms = _.filter(prodArms, (o) => (
    o.stream_armcode === armCode && o.rat_prod_prodcmpy === prodCmpy && o.rat_prod_prodcode === prodCode
  ));

  const meters = [];
  if (arms?.length > 0) {
    _.forEach(arms, (arm) => {
      meters.push({
        trsf_mtr_opn_amb: null,
        trsf_mtr_opn_cor: null,
        trsf_mtr_open_kg: null,
        trsf_mtr_cls_amb: null,
        trsf_mtr_cls_cor: null,
        trsf_mtr_close_kg: null,
        injector_or_meter: arm?.meter_type_code,
        trsf_mtr_cd: arm?.stream_mtrcode,
        trsf_mtr_typ: `${arm?.meter_type_code} - ${arm?.meter_type_desc}`,
        trsf_cmpt_no: cmptNo,
      });
    });
  }

  return meters;
};

const buildMeterTransfers = (prodArms, transfers) => {
  let meters = [];
  for (let index = 0; index < transfers.length; index++) {
    const transfer = transfers[index];

    if (!transfer?.trsf_arm_cd.includes(' ')) {
      const armMeters = buildMeterTransfersByArm(
        prodArms, 
        transfer?.trsf_arm_cd, 
        transfer?.trsf_prod_cmpy, 
        transfer?.trsf_prod_code, 
        transfer?.trsf_cmpt_no
      );
      meters = _.concat(meters, armMeters);
    }
  }

  return meters;
};

// export default buildMeterTransfers;
export {
  buildMeterTransfer,
  buildMeterTransfersByArm,
  buildMeterTransfers
};
