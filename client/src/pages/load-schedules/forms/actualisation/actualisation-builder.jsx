import _ from 'lodash';
import moment from 'moment';
import { SETTINGS } from '../../../../constants';

/*
{
    "shls_ld_type": "2",
    "unload": false,
    "shls_terminal": "CNS",
    "supplier_code": "7640102",
    "carrier_code": "11561639",
    "tnkr_code": "ZZZ996",
    "shls_caldate": "2023-08-25 11:42:56",
    "shls_sold_to_num": "",
    "shls_ship_to_num": "",
    "shls_trip_no": "900194",
    "shls_shift": "",
    "shls_priority": "",
    "drawer_code": "7640102",
    "shls_cust": "11561639",
    "driver_company": "",
    "driver": "",
    "shls_isotainer_num": "",
    "shl_fleet_data": "",
    "shls_load_security_info": "",
    "compartments": [
        {
            "eqpt_code": "ZZZ996",
            "eqpt_id": "963410348",
            "compartment": 1,
            "eqpt_cmpt": "1",
            "prod_code": "400003045",
            "prod_name": "KEROSENE",
            "prod_cmpy": "7640102",
            "unit_code": "5",
            "unit_name": "l (amb)",
            "safefill": "10000",
            "qty_scheduled": 3600,
            "qty_preload": 3600,
            "schdspec_shlstrip": 900194,
            "schdspec_shlssupp": "7640102",
            "schd_sold_to_num": "",
            "schd_ship_to_num": "",
            "order_id": "",
            "schd_deliv_num": "",
            "prod_class": "400003045"
        },
        {
            "eqpt_code": "ZZZ996",
            "eqpt_id": "963410348",
            "compartment": 2,
            "eqpt_cmpt": "2",
            "prod_code": "400004487",
            "prod_name": "G91",
            "prod_cmpy": "7640102",
            "unit_code": "5",
            "unit_name": "l (amb)",
            "safefill": "10000",
            "qty_scheduled": 1000,
            "qty_preload": 1000,
            "schdspec_shlstrip": 900194,
            "schdspec_shlssupp": "7640102",
            "schd_sold_to_num": "",
            "schd_ship_to_num": "",
            "order_id": "",
            "schd_deliv_num": "",
            "prod_class": "ULG91 E10 SHELLADD"
        },
        {
            "eqpt_code": "ZZZ996",
            "eqpt_id": "963410348",
            "compartment": 3,
            "eqpt_cmpt": "3",
            "prod_code": "",
            "prod_name": "",
            "prod_cmpy": "",
            "unit_code": "5",
            "unit_name": "l (amb)",
            "safefill": "10000",
            "schdspec_shlssupp": "",
            "schd_sold_to_num": "",
            "schd_ship_to_num": "",
            "order_id": "",
            "schd_deliv_num": "",
            "prod_class": ""
        }
    ],
    "shls_exp2": "2024-08-01 11:42:56"
}
*/

const buildPayloadToActualise = (values, bases) => {
  const payload = {};
  const qtyFactor = 1000;

  console.log('buildPayloadToActualise', values, bases);

  payload.supplier = values?.supplier_code;
  payload.drawer = values?.drawer_code;
  payload.trip_no = values?.shls_trip_no;
  payload.tanker = values?.tnkr_code;
  payload.driver = values?.driver;
  const trsa_time = moment().format(SETTINGS.DATE_TIME_FORMAT);
  payload.start_time = trsa_time;
  payload.end_time = trsa_time;
  payload.load_security = values?.shls_load_security_info;
  payload.seal_range = '';

  let tidx = 0;
  let midx = 0;
  let bidx = 0;
  payload.transfers = [];
  for (tidx = 0; tidx < values?.compartments?.length; tidx++) {
    const titem = values?.compartments?.[tidx];
    // does this compartment have manual product?
    const mItem = _.find(bases, (base) => String(base.schd_comp_id) === String(titem.compartment));
    if (!mItem) {
      // no manual product to load
      continue;
    }
    /*
              "eqpt_code": "ZZZ996",
            "eqpt_id": "963410348",
            "compartment": 2,
            "eqpt_cmpt": "2",
            "prod_code": "400004487",
            "prod_name": "G91",
            "prod_cmpy": "7640102",
            "unit_code": "5",
            "unit_name": "l (amb)",
            "safefill": "10000",
            "qty_scheduled": 1000,
            "qty_preload": 1000,
            "schdspec_shlstrip": 900194,
            "schdspec_shlssupp": "7640102",
            "schd_sold_to_num": "",
            "schd_ship_to_num": "",
            "order_id": "",
            "schd_deliv_num": "",
            "prod_class": "ULG91 E10 SHELLADD"

    */
    // may need figure out the arm
    titem.trsf_arm_cd = '';

    const transfer = {};
    transfer.nr_in_tkr = titem.compartment;
    transfer.arm_code = titem.trsf_arm_cd;
    transfer.drawer_code = titem.prod_cmpy;
    transfer.product_code = titem.prod_code;

    // now need to get the density, temp, quantities from bases
    titem.trsf_density = 0.0;
    titem.trsf_temp = 0.0;
    titem.trsf_qty_amb = 0.0;
    titem.trsf_qty_cor = 0.0;
    titem.trsf_load_kg = 0.0;
    for (let mbidx = 0; mbidx < bases?.length; mbidx++) {
      const mbitem = bases?.[mbidx];
      if (String(titem.compartment) === String(mbitem.schd_comp_id)) {
        titem.trsf_density +=
          (_.toNumber(mbitem.tank_density) * _.toNumber(mbitem.pitem_ratio_value)) /
          _.toNumber(mbitem.pitem_ratio_total_manual);
        titem.trsf_temp +=
          (_.toNumber(mbitem.tank_temp) * _.toNumber(mbitem.pitem_ratio_value)) /
          _.toNumber(mbitem.pitem_ratio_total_manual);
        titem.trsf_qty_amb += _.toNumber(mbitem.base_qty_amb);
        titem.trsf_qty_cor += _.toNumber(mbitem.base_qty_cor);
        titem.trsf_load_kg += _.toNumber(mbitem.base_load_kg);
      }
    }
    transfer.dens = titem.trsf_density;
    transfer.temperature = titem.trsf_temp;
    transfer.amb_vol = titem.trsf_qty_amb;
    transfer.cor_vol = titem.trsf_qty_cor;
    transfer.liq_kg = titem.trsf_load_kg;

    transfer.meters = [];

    transfer.bases = [];
    for (bidx = 0; bidx < bases?.length; bidx++) {
      const bitem = bases?.[bidx];
      if (String(titem.compartment) === String(bitem.schd_comp_id)) {
        const base = {};
        base.tank_code = bitem.tank_code;
        base.base_code = bitem.pitem_base_code;
        base.base_class = bitem.pitem_bclass_name;
        base.base_class_code = bitem.pitem_base_class;
        base.dens = bitem.tank_density;
        base.temperature = bitem.tank_temp;
        base.amb_vol = bitem.base_qty_amb;
        base.cor_vol = bitem.base_qty_cor;
        base.liq_kg = bitem.base_load_kg;
        transfer.bases.push(base);
      }
    }

    payload.transfers.push(transfer);
  }

  return payload;
};

export default buildPayloadToActualise;
