import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import _ from 'lodash';

import Forms from './forms';
import { NOMINATION_TRANSACTIONS } from '../../../../../api';

const NominationTransactions = ({ access, params, config, cbFunction, closeForm }) => {
  /* let params2 = {
    mvitm_move_id: '5089', 
    mvitm_key: '99887766', 
    mvitm_terminal: 'CNS',
    mvitm_item_id: '508903', 
    mvitm_item_key: '3',
    mvitm_status: 'NEW', 
    mvitm_type: 'Transfer',
    mvitm_tas_ref: null, 
    mvitm_dtim_effect: '2020-06-01 00:00:00',
    mvitm_carrier: '76401', 
    mvitm_tanker: 'Generic Nom Vol',
    mvitm_dtim_expiry: '2020-07-01 00:00:00', 
    mvitm_plant_from: 'T048',
    mvitm_prodcmpy_from: '7640104',
    mvitm_prodcode_from: '400003057',
    mvitm_prodname_from: '400003057 - GTL', 
    mvitm_arm: null,
    mvitm_tank_from: null, 
    mvitm_plant_to: '22',
    mvitm_prodcmpy_to: '7640104',
    mvitm_prodcode_to: '400000257',
    mvitm_prodname_to: '400000257 - MFO 380',
    mvitm_tank_to: 'PL0257', 
    mvitm_prod_qty: '21212266',
    mvitm_qty_schd: '0',
    mvitm_prod_unit: 'l(amb)',
    mvitm_avail_qty: 1234,
  }; */
  //const [pageState, setPageState] = useState(_.toLower(params?.mvitm_type));
  const [pageState, setPageState] = useState(
    String(params?.mvitm_type) === '0'? 'receipt' 
                              : (String(params?.mvitm_type) === '1'? 'disposal' : 'transfer')
  );
  const [visible, setVisible] = useState(true);
  const [nomTanker, setNomTanker] = useState(null);

  const { data: options } = useSWR(
    `${NOMINATION_TRANSACTIONS.CARRIER_BY_TANKER}?tnkr_code=${'Generic Nom Vol'}`
  );

  useEffect(() => {
    if (!!options && options?.records?.length>0) {
      setNomTanker(options?.records?.[0]);
      console.log("nomTanker", nomTanker);
    }
  }, [options, nomTanker, setNomTanker]);


  console.log('access', access);
  console.log('params in MOT4NOM', params);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
  };

  return (
    <>
      <Forms
        value={params}
        visible={visible}
        handleFormState={handleFormState}
        access={access}
        pageState={pageState}
        defaultTanker={nomTanker}
        config={config}
        cbFunction={cbFunction}
        closeForm={closeForm}
      />
    </>
  );
};

export default NominationTransactions;
