import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { TitleRender } from './fields';
import { DataTable } from '../../../../components';
import columns from './columns';

const components = {
  TitleRender,
};

const MappingList = ({ fields, srcValues, destValues }) => {
  const { t } = useTranslation();

  const fields = columns(t);

  const mappingFields1 = [
    { src: 'schdspec_shlstrip', dest: 'plss_staged_trip' },
    { src: 'schdspec_shlssupp', dest: 'plss_staged_supp' },
    { src: 'compartment', dest: 'plss_staged_cmpt' },
    { src: 'prod_code', dest: 'plss_staged_prodcode' },
    { src: 'prod_cmpy', dest: 'plss_staged_prodcmpy' },
    { src: 'unit_code', dest: 'plss_staged_units' },
    { src: 'qty_scheduled', dest: 'plss_staged_specqty' },
    { src: 'qty_preload', dest: 'plss_staged_prldqty' },
    { src: 'order_id', dest: 'plss_staged_order' },
    { src: '', dest: 'plss_staged_cust' },
    { src: '', dest: 'plss_staged_delvloc' },
    { src: '', dest: 'plss_staged_loadtype' },
  ];

  const mappingFields2 = [
    { src: '', dest: 'plss_staged_trip' },
    { src: '', dest: 'plss_staged_supp' },
    { src: '', dest: 'plss_staged_cmpt' },
    { src: 'prod_code', dest: 'plss_staged_prodcode' },
    { src: 'prod_cmpy', dest: 'plss_staged_prodcmpy' },
    { src: 'unit_code', dest: 'plss_staged_units' },
    { src: 'qty_scheduled', dest: 'plss_staged_specqty' },
    { src: '', dest: 'plss_staged_prldqty' },
    { src: '', dest: 'plss_staged_order' },
    { src: '', dest: 'plss_staged_cust' },
    { src: '', dest: 'plss_staged_delvloc' },
    { src: '', dest: 'plss_staged_loadtype' },
  ];

  const mappingFields3 = [
    { src: '', dest: 'plss_staged_trip' },
    { src: '', dest: 'plss_staged_supp' },
    { src: '', dest: 'plss_staged_cmpt' },
    { src: 'oitem_prod_code', dest: 'plss_staged_prodcode' },
    { src: 'oitem_prod_cmpy', dest: 'plss_staged_prodcmpy' },
    { src: 'oitem_prod_unit', dest: 'plss_staged_units' },
    { src: '', dest: 'plss_staged_specqty' },
    { src: '', dest: 'plss_staged_prldqty' },
    { src: 'oitem_order_id', dest: 'plss_staged_order' },
    { src: '', dest: 'plss_staged_cust' },
    { src: '', dest: 'plss_staged_delvloc' },
    { src: '', dest: 'plss_staged_loadtype' },
  ];

  return (
    <DataTable
      data={data}
      columns={fields}
      parentHeight="320px"
      components={components}
      minimal
      editType="fullRow"
    />
  );
};

export default MappingList;
/*
pre-schedule
{
    "eqpt_code": "55684",
    "eqpt_id": "963410246",
    "compartment": "1",
    "eqpt_cmpt": "1",
    "prod_code": "400000922",
    "prod_name": "LSFO 380",
    "prod_cmpy": "7640102",
    "unit_code": "5",
    "unit_name": "l (amb)",
    "safefill": "6000",
    "qty_scheduled": "6000",
    "qty_preload": "0",
    "schdspec_shlstrip": "900116",
    "schdspec_shlssupp": "7640102",
    "schd_sold_to_num": "",
    "schd_ship_to_num": "",
    "order_cust_ordno": "",
    "schd_order": "",
    "schd_deliv_num": "",
    "prod_class": "400000922",
    "plss_pickup_trip": "",
    "plss_pickup_supp": "",
    "plss_pickup_cmpt": "",
    "plss_staged_trip": "900116",
    "plss_staged_supp": "7640102",
    "plss_staged_cmpt": "1",
    "plss_staged_prodcode": "400000922",
    "plss_staged_prodcmpy": "7640102",
    "plss_staged_units": "5",
    "plss_staged_specqty": "6000",
    "plss_staged_prldqty": "0",
    "plss_staged_order": "",
    "plss_staged_cust": "",
    "plss_staged_delvloc": "",
    "plss_staged_loadtype": "2",
    "order_id": "",
    "trip_order_no": "900116",
    "trip_customer": "",
    "trip_delvloc": "",
    "qty_loaded": "",
    "qty_amb": "",
    "qty_std": "",
    "qty_kg": ""
}

data:
{
    "eqpt_code": "ZZZ999",
    "eqpt_id": "963410319",
    "compartment": "1",
    "eqpt_cmpt": "1",
    "prod_code": "",
    "prod_name": "",
    "prod_cmpy": "",
    "unit_code": "5",
    "unit_name": "l (amb)",
    "safefill": "9000",
    "qty_scheduled": "0",
    "qty_preload": "0",
    "schdspec_shlstrip": "",
    "schdspec_shlssupp": "",
    "schd_sold_to_num": "",
    "schd_ship_to_num": "",
    "order_cust_ordno": "",
    "schd_order": "",
    "schd_deliv_num": "",
    "prod_class": "",
    "plss_pickup_trip": "",
    "plss_pickup_supp": "",
    "plss_pickup_cmpt": "",
    "plss_staged_trip": "",
    "plss_staged_supp": "",
    "plss_staged_cmpt": "",
    "plss_staged_prodcode": "",
    "plss_staged_prodcmpy": "",
    "plss_staged_units": "",
    "plss_staged_specqty": "",
    "plss_staged_prldqty": "",
    "plss_staged_order": "",
    "plss_staged_cust": "",
    "plss_staged_delvloc": "",
    "plss_staged_loadtype": "",
    "order_id": "",
    "trip_order_no": "",
    "trip_customer": "",
    "trip_delvloc": "",
    "qty_loaded": "0",
    "qty_amb": "0",
    "qty_std": "0",
    "qty_kg": "0",
    "prev_prod_code": "400003045",
    "prev_prod_name": "Kerosene"
}

from pre-order:
{
    "unit_code": "5",
    "qty_scheduled": "9000",
    "prod_code": "400003045",
    "prod_name": "KEROSENE",
    "prod_cmpy": "7640102",
    "prod_class": "400003045",
    "prod_image": "",
    "qty_loaded": "",
    "unit_name": "l (amb)",
    "qty_preloaded": "",
    "schpspid_shlstrip": "900113",
    "schpspid_shlssupp": "7640102",
    "order_cust_ordno": "",
    "schp_order": "",
    "plss_pickup_trip": "",
    "plss_pickup_supp": "",
    "plss_pickup_cmpt": "",
    "plss_staged_trip": "900113",
    "plss_staged_supp": "7640102",
    "plss_staged_cmpt": "",
    "plss_staged_prodcode": "400003045",
    "plss_staged_prodcmpy": "7640102",
    "plss_staged_units": "5",
    "plss_staged_specqty": "9000",
    "plss_staged_prldqty": "",
    "plss_staged_order": "",
    "plss_staged_cust": "11561639",
    "plss_staged_delvloc": "",
    "plss_staged_loadtype": "3",
    "order_id": "",
    "trip_order_no": "900113",
    "trip_customer": "11561639 - MAXWELL 1991 CO LTD",
    "trip_delvloc": "",
    "qty_amb": "",
    "qty_std": "",
    "qty_kg": ""
}

data:
{
    "eqpt_code": "ZZZ999",
    "eqpt_id": "963410319",
    "compartment": "2",
    "eqpt_cmpt": "2",
    "prod_code": "",
    "prod_name": "",
    "prod_cmpy": "",
    "unit_code": "5",
    "unit_name": "l (amb)",
    "safefill": "9000",
    "qty_scheduled": "0",
    "qty_preload": "0",
    "schdspec_shlstrip": "",
    "schdspec_shlssupp": "",
    "schd_sold_to_num": "",
    "schd_ship_to_num": "",
    "order_cust_ordno": "",
    "schd_order": "",
    "schd_deliv_num": "",
    "prod_class": "",
    "plss_pickup_trip": "",
    "plss_pickup_supp": "",
    "plss_pickup_cmpt": "",
    "plss_staged_trip": "",
    "plss_staged_supp": "",
    "plss_staged_cmpt": "",
    "plss_staged_prodcode": "",
    "plss_staged_prodcmpy": "",
    "plss_staged_units": "",
    "plss_staged_specqty": "",
    "plss_staged_prldqty": "",
    "plss_staged_order": "",
    "plss_staged_cust": "",
    "plss_staged_delvloc": "",
    "plss_staged_loadtype": "",
    "order_id": "",
    "trip_order_no": "",
    "trip_customer": "",
    "trip_delvloc": "",
    "qty_loaded": "0",
    "qty_amb": "0",
    "qty_std": "0",
    "qty_kg": "0",
    "prev_prod_code": "400003048",
    "prev_prod_name": "F/O A"
}

from open-order:
{
    "unit_code": "5",
    "qty_scheduled": "0",
    "prod_code": "400003048",
    "prod_name": "F/O A",
    "prod_cmpy": "7640102",
    "prod_desc": "400003048 - F/O A",
    "prod_class": "400003048",
    "prod_image": "",
    "qty_loaded": "0",
    "unit_name": "l (amb)",
    "qty_preloaded": "0",
    "order_cust_ordno": "900036",
    "schp_order": "37",
    "plss_pickup_trip": "",
    "plss_pickup_supp": "",
    "plss_pickup_cmpt": "",
    "plss_staged_trip": "",
    "plss_staged_supp": "7640102",
    "plss_staged_cmpt": "",
    "plss_staged_prodcode": "400003048",
    "plss_staged_prodcmpy": "7640102",
    "plss_staged_units": "5",
    "plss_staged_specqty": "12345678",
    "plss_staged_prldqty": "0",
    "plss_staged_order": "37",
    "plss_staged_cust": "11561639",
    "plss_staged_delvloc": "",
    "plss_staged_loadtype": "4",
    "order_id": "37",
    "trip_order_no": "/900036",
    "trip_customer": "11561639 - MAXWELL 1991 CO LTD",
    "trip_delvloc": "",
    "qty_amb": "0",
    "qty_std": "0",
    "qty_kg": "0",
    "schp_specqty": "12345678",
    "qty_planned": "12345678",
    "order_prod_key": "37",
    "oitem_schd_qty": "73000",
    "oitem_load_qty": "73000",
    "oitem_delv_qty": "73000",
    "oitem_prod_qty": "12345678",
    "oprod_ch_no": "0",
    "oprd_line_itemno": "",
    "draw_prod_cmpy": "76401",
    "draw_prod_code": "400003048",
    "draw_prod_name": "F/O A",
    "draw_prod_desc": "400003048 - F/O A",
    "draw_prod_class": "400003048"
}

data:
{
    "eqpt_code": "ZZZ999",
    "eqpt_id": "963410319",
    "compartment": "4",
    "eqpt_cmpt": "4",
    "prod_code": "",
    "prod_name": "",
    "prod_cmpy": "",
    "unit_code": "5",
    "unit_name": "l (amb)",
    "safefill": "9000",
    "qty_scheduled": "0",
    "qty_preload": "0",
    "schdspec_shlstrip": "",
    "schdspec_shlssupp": "",
    "schd_sold_to_num": "",
    "schd_ship_to_num": "",
    "order_cust_ordno": "",
    "schd_order": "",
    "schd_deliv_num": "",
    "prod_class": "",
    "plss_pickup_trip": "",
    "plss_pickup_supp": "",
    "plss_pickup_cmpt": "",
    "plss_staged_trip": "",
    "plss_staged_supp": "",
    "plss_staged_cmpt": "",
    "plss_staged_prodcode": "",
    "plss_staged_prodcmpy": "",
    "plss_staged_units": "",
    "plss_staged_specqty": "",
    "plss_staged_prldqty": "",
    "plss_staged_order": "",
    "plss_staged_cust": "",
    "plss_staged_delvloc": "",
    "plss_staged_loadtype": "",
    "order_id": "",
    "trip_order_no": "",
    "trip_customer": "",
    "trip_delvloc": "",
    "qty_loaded": "0",
    "qty_amb": "0",
    "qty_std": "0",
    "qty_kg": "0",
    "prev_prod_code": "400003048",
    "prev_prod_name": "F/O A"
}
*/

/*
{
    "shls_ld_type": "2",
    "shls_terminal": "CNS",
    "supplier_code": "7640102",
    "shls_trip_no": 900130,
    "drawer_code": "7640102",
    "carrier_code": "11561639",
    "tnkr_code": "ZZZ999",
    "driver": "",
    "shls_caldate": "2023-05-28 20:54:11",
    "compartments": [
        {
            "eqpt_code": "ZZZ999",
            "eqpt_id": "963410319",
            "compartment": "1",
            "eqpt_cmpt": "1",
            "prod_code": "400000922",
            "prod_name": "LSFO 380",
            "prod_cmpy": "7640102",
            "unit_code": "5",
            "unit_name": "l (amb)",
            "safefill": "9000",
            "qty_scheduled": 6000,
            "qty_preload": 0,
            "schdspec_shlssupp": "7640102",
            "schd_sold_to_num": "",
            "schd_ship_to_num": "",
            "order_cust_ordno": "",
            "schd_order": "",
            "schd_deliv_num": "",
            "prod_class": "",
            "plss_pickup_supp": "7640102",
            "plss_pickup_cmpt": "1",
            "plss_staged_trip": "900116",
            "plss_staged_supp": "7640102",
            "plss_staged_cmpt": "1",
            "plss_staged_prodcode": "400000922",
            "plss_staged_prodcmpy": "7640102",
            "plss_staged_units": "5",
            "plss_staged_specqty": 6000,
            "plss_staged_prldqty": 0,
            "plss_staged_order": "",
            "plss_staged_cust": "",
            "plss_staged_delvloc": "",
            "plss_staged_loadtype": "2",
            "order_id": "",
            "trip_order_no": "900116",
            "trip_customer": "",
            "trip_delvloc": "",
            "qty_loaded": "0",
            "qty_amb": "0",
            "qty_std": "0",
            "qty_kg": "0",
            "prev_prod_code": "400003045",
            "prev_prod_name": "Kerosene"
        },
        {
            "eqpt_code": "ZZZ999",
            "eqpt_id": "963410319",
            "compartment": "2",
            "eqpt_cmpt": "2",
            "prod_code": "400003047",
            "prod_name": "AGOB0 UABASEB2/B5",
            "prod_cmpy": "7640102",
            "unit_code": "5",
            "unit_name": "l (amb)",
            "safefill": "9000",
            "qty_scheduled": 8888,
            "qty_preload": 0,
            "schdspec_shlssupp": "7640102",
            "schd_sold_to_num": "",
            "schd_ship_to_num": "",
            "order_cust_ordno": "",
            "schd_order": "",
            "schd_deliv_num": "",
            "prod_class": "",
            "plss_pickup_supp": "7640102",
            "plss_pickup_cmpt": "2",
            "plss_staged_trip": "900117",
            "plss_staged_supp": "7640102",
            "plss_staged_cmpt": "",
            "plss_staged_prodcode": "400003047",
            "plss_staged_prodcmpy": "7640102",
            "plss_staged_units": "5",
            "plss_staged_specqty": 8888,
            "plss_staged_prldqty": 0,
            "plss_staged_order": "",
            "plss_staged_cust": "",
            "plss_staged_delvloc": "",
            "plss_staged_loadtype": "3",
            "order_id": "",
            "trip_order_no": "900117",
            "trip_customer": "",
            "trip_delvloc": "",
            "qty_loaded": "0",
            "qty_amb": "0",
            "qty_std": "0",
            "qty_kg": "0",
            "prev_prod_code": "400003048",
            "prev_prod_name": "F/O A"
        },
        {
            "eqpt_code": "ZZZ999",
            "eqpt_id": "963410319",
            "compartment": "3",
            "eqpt_cmpt": "3",
            "prod_code": "400003045",
            "prod_name": "KEROSENE",
            "prod_cmpy": "7640102",
            "unit_code": "5",
            "unit_name": "l (amb)",
            "safefill": "9000",
            "qty_scheduled": 9000,
            "qty_preload": 0,
            "schdspec_shlssupp": "7640102",
            "schd_sold_to_num": "",
            "schd_ship_to_num": "",
            "order_cust_ordno": "900035",
            "schd_order": "",
            "schd_deliv_num": "",
            "prod_class": "",
            "plss_pickup_supp": "7640102",
            "plss_pickup_cmpt": "3",
            "plss_staged_trip": "",
            "plss_staged_supp": "7640102",
            "plss_staged_cmpt": "",
            "plss_staged_prodcode": "400003045",
            "plss_staged_prodcmpy": "7640102",
            "plss_staged_units": "5",
            "plss_staged_specqty": 9000,
            "plss_staged_prldqty": 0,
            "plss_staged_order": "36",
            "plss_staged_cust": "11561639",
            "plss_staged_delvloc": "",
            "plss_staged_loadtype": "4",
            "order_id": "",
            "trip_order_no": "/900035",
            "trip_customer": "11561639 - MAXWELL 1991 CO LTD",
            "trip_delvloc": "",
            "qty_loaded": "0",
            "qty_amb": "0",
            "qty_std": "0",
            "qty_kg": "0",
            "prev_prod_code": "400003045",
            "prev_prod_name": "Kerosene"
        },
        {
            "eqpt_code": "ZZZ999",
            "eqpt_id": "963410319",
            "compartment": "4",
            "eqpt_cmpt": "4",
            "prod_code": "400003048",
            "prod_name": "F/O A",
            "prod_cmpy": "7640102",
            "unit_code": "5",
            "unit_name": "l (amb)",
            "safefill": "9000",
            "qty_scheduled": 9000,
            "qty_preload": 0,
            "schdspec_shlssupp": "7640102",
            "schd_sold_to_num": "",
            "schd_ship_to_num": "",
            "order_cust_ordno": "900035",
            "schd_order": "",
            "schd_deliv_num": "",
            "prod_class": "",
            "plss_pickup_supp": "7640102",
            "plss_pickup_cmpt": "4",
            "plss_staged_trip": "",
            "plss_staged_supp": "7640102",
            "plss_staged_cmpt": "",
            "plss_staged_prodcode": "400003048",
            "plss_staged_prodcmpy": "7640102",
            "plss_staged_units": "5",
            "plss_staged_specqty": 9000,
            "plss_staged_prldqty": 0,
            "plss_staged_order": "36",
            "plss_staged_cust": "11561639",
            "plss_staged_delvloc": "",
            "plss_staged_loadtype": "4",
            "order_id": "",
            "trip_order_no": "/900035",
            "trip_customer": "11561639 - MAXWELL 1991 CO LTD",
            "trip_delvloc": "",
            "qty_loaded": "0",
            "qty_amb": "0",
            "qty_std": "0",
            "qty_kg": "0",
            "prev_prod_code": "400003048",
            "prev_prod_name": "F/O A"
        }
    ],
    "shls_exp2": "2023-05-30 20:54:11"
}
*/
