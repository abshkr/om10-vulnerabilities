import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR, { SWRConfig } from 'swr';
import { Form, Row, Col, notification, Descriptions, Card, Button, Modal } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import _ from 'lodash';

import { DataTable, PartnershipManager, OrderManager } from '../../../../components';

import api, { LOAD_SCHEDULES, STAGING_BAY } from '../../../../api';
import { adjustPreloadQuantity, fetcher } from '../../../../utils';

import {
  ProductEditor,
  UnitEditor,
  ScheduleEditor,
  PreloadEditor,
  DelvNoEditor,
  CustomerEditor,
  DelvlocEditor,
} from './fields';

import TripAllocations from '../../forms/trip-allocations';
import CompartmentAllocations from '../../forms/compartment-allocations';

const Compartments = ({ form, value, tanker, drawer, supplier, customer, config, setInit }) => {
  const { setFieldsValue, getFieldValue } = form;

  const { t } = useTranslation();
  const IS_CREATING = !value;

  const { data: units } = useSWR(LOAD_SCHEDULES.UNIT_TYPES);
  const { data: customersBySupplier } = useSWR(`${STAGING_BAY.SUPP_CUSTOMERS}?supplier=${supplier}`);
  const { data: customerProductsBySupplier } = useSWR(
    `${STAGING_BAY.SUPP_CUSTOMER_PRODUCTS}?supplier=${supplier}`
  );
  const { data: delvLocsBySupplier } = useSWR(`${STAGING_BAY.SUPP_DELVLOCS}?supplier=${supplier}`);
  // const { data: customersBySupplier } = useSWR(`${STAGING_BAY.SUPP_CUSTOMERS}?supplier=${'-1'}`);
  // const { data: delvLocsBySupplier } = useSWR(`${STAGING_BAY.SUPP_DELVLOCS}?supplier=${'-1'}`);

  const { data: pickup } = useSWR(
    `${STAGING_BAY.PICKUP_SPECS_EXTRA}?shls_trip_no=${value?.shls_trip_no}&supplier_code=${value?.supplier_code}`
  );

  const [compartments, setCompartments] = useState([]);
  const [products, setProducts] = useState([]);
  const [tableAPI, setTableAPI] = useState(null);

  // this section is for debugging purpose
  // useEffect(() => {
  //   console.log('xxxxxxxxxxxxxxxxxx products', products);
  // }, [products]);

  useEffect(() => {
    setCompartments([]);
    setProducts([]);
    // console.log('yyyyyyyyyyyyyyyyyy products, value', products, value);

    if (value) {
      api
        .get(STAGING_BAY.COMPARTMENTS, {
          params: {
            shls_trip_no: value.shls_trip_no,
            supplier_code: value.supplier_code,
          },
        })
        .then((res) => {
          setCompartments(res.data.records);
          if (setInit) {
            setInit(res.data.records);
          }

          setFieldsValue({
            compartments: res.data.records,
          });
        });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    // this seems the place that caused the disappearance of product list
    // IS_CREATING could be true even in EDIT mode when the form is just opened, because "value" is NULL or undefined then
    // and the drawer is also undefined. API will return nothing when it is called with undefined drawer/customer
    // if (IS_CREATING) {
    // So we add one more check on drawer here - only calls API when drawer is not NULL and IS_CREATING is true,
    // which will never happen in EDIT_MODE, so the issue is solved.
    if (IS_CREATING && drawer) {
      api
        .get(LOAD_SCHEDULES.DRAWER_PRODUCTS, {
          params: config?.site_customer_product
            ? {
                drawer_code: drawer,
                customer: value ? value.shls_cust : customer,
              }
            : {
                drawer_code: drawer,
              },
        })
        .then((res) => {
          setProducts(res.data.records);
          // console.log('zzzzzzzzzzzzzzzzzzz res.data.records, value', res.data.records, IS_CREATING, drawer, tanker, customer);
        });
    }
  }, [drawer, tanker, customer]);

  useEffect(() => {
    setCompartments([]);
    setProducts([]);

    if (!value && tanker) {
      api
        .get(STAGING_BAY.COMPARTMENTS_BY_TANKER, {
          params: {
            tnkr_code: tanker,
          },
        })
        .then((res) => {
          setCompartments(res.data.records);
          if (setInit) {
            setInit(res.data.records);
          }

          setFieldsValue({
            compartments: res.data.records,
          });
        });
    }

    if (!IS_CREATING) {
      api
        .get(LOAD_SCHEDULES.DRAWER_PRODUCTS, {
          params: config?.site_customer_product
            ? {
                drawer_code: value.supplier_code,
                customer: value ? value.shls_cust : customer,
              }
            : {
                drawer_code: value.supplier_code,
              },
        })
        .then((res) => setProducts(res.data.records));
    }
  }, [value, tanker, setFieldsValue, setCompartments]);

  const getStagedLoadType = (load) => {
    let type = load?.plss_staged_loadtype;
    if (type === '' || (type !== '2' && type !== '3' && type !== '4')) {
      if (!pickup) {
        // means we need get the type by other attributes in the load object
        // pre schedule
        // "plss_staged_trip": "900172",
        // "plss_staged_supp": "7640102",
        // "plss_staged_cmpt": "4",
        // "plss_staged_order": "",
        if (
          load?.plss_staged_trip !== '' &&
          load?.plss_staged_supp !== '' &&
          load?.plss_staged_cmpt !== '' &&
          load?.plss_staged_order === ''
        ) {
          type = '2';
        }
        // pre order
        // "plss_staged_trip": "900173",
        // "plss_staged_supp": "7640102",
        // "plss_staged_cmpt": "",
        // "plss_staged_order": "",
        if (
          load?.plss_staged_trip !== '' &&
          load?.plss_staged_supp !== '' &&
          load?.plss_staged_cmpt === '' &&
          load?.plss_staged_order === ''
        ) {
          type = '3';
        }
        // open order
        // "plss_staged_trip": "900175" or "",
        // "plss_staged_supp": "7640102",
        // "plss_staged_cmpt": "",
        // "plss_staged_order": "42",
        if (
          load?.plss_staged_supp !== '' &&
          load?.plss_staged_cmpt === '' &&
          load?.plss_staged_order !== ''
        ) {
          type = '4';
        }
      } else {
        const item = _.find(
          pickup?.records,
          (o) =>
            o?.plss_pickup_supp === load?.plss_pickup_supp &&
            o?.plss_pickup_trip === load?.plss_pickup_trip &&
            o?.plss_pickup_cmpt === load?.plss_pickup_cmpt
        );
        if (item) {
          type = item?.plss_staged_loadtype2;
        }
      }
    }

    return type;
  };

  const getTotalQtyScheduled = (compartments, selection) => {
    let sumScheduled = 0;
    compartments.forEach((cmpt) => {
      let tripUsed = false;
      if (selection?.plss_staged_loadtype === '2') {
        if (
          cmpt?.plss_staged_trip === selection?.plss_staged_trip &&
          cmpt?.plss_staged_supp === selection?.plss_staged_supp &&
          cmpt?.plss_staged_cmpt === selection?.plss_staged_cmpt &&
          cmpt?.prod_code === selection?.prod_code &&
          cmpt?.prod_name === selection?.prod_name
        ) {
          tripUsed = true;
        }
      }
      if (selection?.plss_staged_loadtype === '3') {
        if (
          cmpt?.plss_staged_trip === selection?.plss_staged_trip &&
          cmpt?.plss_staged_supp === selection?.plss_staged_supp &&
          cmpt?.prod_code === selection?.prod_code &&
          cmpt?.prod_name === selection?.prod_name
        ) {
          tripUsed = true;
        }
      }
      if (selection?.plss_staged_loadtype === '4') {
        if (
          cmpt?.plss_staged_supp === selection?.plss_staged_supp &&
          cmpt?.prod_code === selection?.prod_code &&
          cmpt?.prod_name === selection?.prod_name &&
          cmpt?.plss_staged_order === selection?.plss_staged_order
        ) {
          console.log(selection);
          tripUsed = true;
        }
      }
      if (tripUsed) {
        sumScheduled += parseInt(cmpt?.qty_scheduled);
      }
    });
    console.log('...........onCellUpdat00e', compartments, selection, sumScheduled);

    return sumScheduled;
  };

  const getStagedAvailQty = (load) => {
    if (!load?.plss_staged_availqty) {
      let qty = load?.plss_staged_specqty;
      if (pickup?.records) {
        const item = _.find(
          pickup?.records,
          (o) =>
            o?.plss_pickup_supp === load?.plss_pickup_supp &&
            o?.plss_pickup_trip === load?.plss_pickup_trip &&
            o?.plss_pickup_cmpt === load?.plss_pickup_cmpt
        );
        if (item) {
          if (item?.plss_staged_loadtype2 === '4') {
            qty = parseInt(item?.plss_staged_availqty) + parseInt(item?.plss_staged_availord);
          } else {
            qty = item?.plss_staged_availqty;
          }
        }
      }
      return qty;
    } else {
      return load?.plss_staged_availqty;
    }
  };

  const adjustStagedAvailQty = (load) => {
    let qty = load?.plss_staged_availqty;
    if (load?.plss_staged_loadtype === '4') {
      /*
                NULL                                       AS PLSS_PICKUP_TRIP,
                NULL                                       AS PLSS_PICKUP_SUPP,
                NULL                                       AS PLSS_PICKUP_CMPT,
                NULL                                       AS PLSS_STAGED_TRIP,
                CUSTOMER.CUST_SUPP                         AS PLSS_STAGED_SUPP,
                NULL                                       AS PLSS_STAGED_CMPT,
                OPD.OSPROD_PRODCODE                        AS PLSS_STAGED_PRODCODE,
                OPD.OSPROD_PRODCMPY                        AS PLSS_STAGED_PRODCMPY,
                OPD.ORDER_PROD_UNIT                        AS PLSS_STAGED_UNITS,
                (OPD.ORDER_PROD_QTY - OPD.OPROD_SCHEDULED) AS PLSS_STAGED_AVAILQTY,
                (OPD.ORDER_PROD_QTY - OPD.OPROD_SCHEDULED) AS PLSS_STAGED_SPECQTY,
                NVL(OO_QTY.QTY_PRELOADED,0)                AS PLSS_STAGED_PRLDQTY,
                OPD.ORDER_PROD_KEY                         AS PLSS_STAGED_ORDER,
                CO.ORDER_CUST                              AS PLSS_STAGED_CUST,
      */

      if (pickup?.records) {
        // when creating a pickup schedule, the OO-based staged trips and their OOs must be ONE to ONE relations
        const item = _.find(
          pickup?.records,
          (o) =>
            o?.plss_staged_supp === load?.plss_staged_supp &&
            o?.plss_staged_prodcode === load?.plss_staged_prodcode &&
            o?.plss_staged_prodcmpy === load?.plss_staged_prodcmpy &&
            o?.plss_staged_order === load?.plss_staged_order
        );
        if (item) {
          qty = parseInt(item?.plss_staged_availqty) + parseInt(item?.plss_staged_availord);
        }
        console.log('............adjustStagedAvailQty...', qty, load, item);
      }
    }
    return qty;
  };

  const onCellUpdate = (value) => {
    if (value?.colDef?.field === 'qty_scheduled') {
      const current = form.getFieldValue('compartments');
      const valueDrop = current[value.rowIndex];
      valueDrop.plss_staged_loadtype = getStagedLoadType(valueDrop);
      valueDrop.plss_staged_availqty = getStagedAvailQty(valueDrop);
      const sumScheduled = getTotalQtyScheduled(current, valueDrop);

      if (sumScheduled > valueDrop?.plss_staged_availqty) {
        let warning = '';
        let details = [];
        const qtyExceeded = sumScheduled - parseInt(valueDrop?.plss_staged_availqty);
        const pickupNumber = valueDrop?.plss_pickup_trip;
        const pickupCompartment = valueDrop?.plss_pickup_cmpt;
        if (valueDrop?.plss_staged_loadtype === '2') {
          warning = t('descriptions.stagingPreScheduleExceeded', {
            SRC_TRIP: valueDrop?.plss_staged_trip,
            SRC_CMPT: valueDrop?.plss_staged_cmpt,
            QTY_EXCEED: qtyExceeded,
            DST_TRIP: pickupNumber,
            DST_CMPT: pickupCompartment,
          });
          details = [
            { title: t('fields.loadType'), value: t('operations.preSchedule') },
            { title: t('fields.schdTripNo'), value: valueDrop?.plss_staged_trip },
            { title: t('fields.product'), value: valueDrop?.prod_code + ' - ' + valueDrop?.prod_name },
            { title: t('fields.compartment'), value: valueDrop?.plss_staged_cmpt },
            { title: t('fields.availableToSchedule'), value: valueDrop?.plss_staged_availqty },
          ];
        }
        // source is a pre-order
        if (valueDrop?.plss_staged_loadtype === '3') {
          warning = t('descriptions.stagingPreOrderExceeded', {
            SRC_TRIP: valueDrop?.plss_staged_trip,
            SRC_PROD: valueDrop?.prod_code,
            QTY_EXCEED: qtyExceeded,
            DST_TRIP: pickupNumber,
            DST_CMPT: pickupCompartment,
          });
          details = [
            { title: t('fields.loadType'), value: t('operations.preOrder') },
            { title: t('fields.schdTripNo'), value: valueDrop?.plss_staged_trip },
            { title: t('fields.product'), value: valueDrop?.prod_code + ' - ' + valueDrop?.prod_name },
            { title: t('fields.availableToSchedule'), value: valueDrop?.plss_staged_availqty },
          ];
        }
        // source is an open order
        if (valueDrop?.plss_staged_loadtype === '4') {
          warning = t('descriptions.stagingOpenOrderExceeded', {
            SRC_ORDER: valueDrop?.order_cust_ordno,
            SRC_PROD: valueDrop?.prod_code,
            QTY_EXCEED: qtyExceeded,
            DST_TRIP: pickupNumber,
            DST_CMPT: pickupCompartment,
          });
          details = [
            { title: t('fields.loadType'), value: t('operations.openOrder') },
            { title: t('fields.schdOrderId'), value: valueDrop?.order_cust_ordno },
            { title: t('fields.customer'), value: valueDrop?.trip_customer },
            { title: t('fields.product'), value: valueDrop?.prod_code + ' - ' + valueDrop?.prod_name },
            { title: t('fields.availableToSchedule'), value: valueDrop?.plss_staged_availqty },
          ];
        }

        notification.warning({
          message: t('messages.validationFailed'),
          description: (
            <>
              <div>{warning}</div>
              <div>
                <Descriptions bordered size="small" layout="horizontal" style={{ marginTop: 0 }} column={1}>
                  {details?.map((note, index) => (
                    <Descriptions.Item key={index} label={note.title} span={1}>
                      {note.value}
                    </Descriptions.Item>
                  ))}
                </Descriptions>
              </div>
            </>
          ),
          // duration: 0,
          style: {
            width: 500,
            height: 'calc(100vh - 480px)',
            overflowY: 'scroll',
          },
        });
      }

      // adjust the schedule qty if it exceeds
      let scheduled = parseInt(value?.data?.qty_scheduled);
      if (sumScheduled > valueDrop?.plss_staged_availqty) {
        const exceeded = sumScheduled - parseInt(valueDrop?.plss_staged_availqty);
        scheduled = scheduled - exceeded;
        current[value.rowIndex].qty_scheduled = scheduled;
        current[value.rowIndex].plss_staged_specqty = scheduled;
      }

      console.log('...........onCellUpdate', value?.data?.qty_scheduled, value?.data?.qty_preload, value);
      const preload = adjustPreloadQuantity(
        config?.sitePreloadDeductFromPreset,
        value?.data?.safefill,
        scheduled,
        value?.data?.qty_preload
      );
      current[value.rowIndex].qty_preload = preload;
      current[value.rowIndex].plss_staged_prldqty = preload;
      console.log('....................222preload check', preload, current[value.rowIndex]);
      setCompartments([]);
      setCompartments(current);
    }
  };

  const rowEditingStopped = (values) => {
    // console.log(values)

    const current = form.getFieldValue('compartments');
    let scheduled = current[values.rowIndex].qty_scheduled;

    if (parseInt(scheduled) === 0 && current[values.rowIndex].prod_code !== '') {
      scheduled = parseInt(current[values.rowIndex].safefill);
    } else if (current[values.rowIndex].prod_code === '' || !current[values.rowIndex].prod_code) {
      scheduled = 0;
    }
    current[values.rowIndex].qty_scheduled = scheduled;
    current[values.rowIndex].plss_staged_specqty = scheduled;

    /* const preload = adjustPreloadQuantity(
      config?.sitePreloadDeductFromPreset, 
      current[values.rowIndex].safefill, 
      current[values.rowIndex].qty_scheduled, 
      current[values.rowIndex].qty_preload
    );
    current[values.rowIndex].qty_preload = preload;
    current[values.rowIndex].plss_staged_prldqty = preload;
    console.log('....................222preload check', preload, scheduled, current[values.rowIndex]); */

    setCompartments([]);
    setCompartments(current);
  };

  const checkAllocation = () => {
    const supplier = getFieldValue('supplier_code');
    const drawer = getFieldValue('drawer_code');
    const carrier = getFieldValue('carrier_code');
    const cmpts = getFieldValue('compartments');
    //    const customer = _.uniq(_.map(cmpts, 'plss_staged_cust'));

    if (!value) {
      // onChange(undefined);
    }
    // const item = _.find(options?.records, (o) => o?.cust_acnt === account);
    // const modal = Modal.info();
    //modal.update({
    Modal.confirm({
      title: t('operations.checkAllocation'),
      okText: t('operations.ok'),
      cancelText: t('operations.cancel'),
      centered: true,
      width: '80vw',
      maskClosable: false,
      closable: true,
      keyboard: true,
      okButtonProps: {
        hidden: false,
      },
      cancelButtonProps: {
        hidden: true,
      },
      content: (
        <SWRConfig
          value={{
            refreshInterval: 0,
            fetcher,
          }}
        >
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            {
              <CompartmentAllocations
                supplier={supplier}
                drawer={drawer}
                carrier={carrier}
                // customer={customer}
                disabled={!value ? false : true}
                config={config}
                compartments={cmpts}
              />
            }
          </div>
        </SWRConfig>
      ),
      onOk: () => {
        console.log('...................okProduct');
        if (!value) {
          // onChange(account);
        }
      },
      onCancel: () => {
        console.log('...................cancelProduct');
        if (!value) {
          // onChange(account);
        }
      },
    });
  };

  const checkTripAllocation = () => {
    const supplier = getFieldValue('supplier_code');
    const drawer = getFieldValue('drawer_code');
    const carrier = getFieldValue('carrier_code');
    const cmpts = getFieldValue('compartments');
    const customer = _.uniq(_.map(cmpts, 'plss_staged_cust'));

    if (!value) {
      // onChange(undefined);
    }
    // const item = _.find(options?.records, (o) => o?.cust_acnt === account);
    // const modal = Modal.info();
    //modal.update({
    Modal.confirm({
      title: t('operations.checkAllocation'),
      okText: t('operations.ok'),
      cancelText: t('operations.cancel'),
      centered: true,
      width: '70vw',
      maskClosable: false,
      closable: true,
      keyboard: true,
      okButtonProps: {
        hidden: false,
      },
      cancelButtonProps: {
        hidden: true,
      },
      content: (
        <SWRConfig
          value={{
            refreshInterval: 0,
            fetcher,
          }}
        >
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            {
              <TripAllocations
                supplier={supplier}
                drawer={drawer}
                carrier={carrier}
                customer={customer}
                disabled={!value ? false : true}
                config={config}
              />
            }
          </div>
        </SWRConfig>
      ),
      onOk: () => {
        console.log('...................okProduct');
        if (!value) {
          // onChange(account);
        }
      },
      onCancel: () => {
        console.log('...................cancelProduct');
        if (!value) {
          // onChange(account);
        }
      },
    });
  };

  const checkExistence = (valueDrop, valueGrid, tripNumber = '') => {
    console.log('checkExistence............', valueDrop, valueGrid, tripNumber);

    if (valueDrop?.prod_code === '') {
      return false;
    }
    let existed = false;
    let warning = '';
    let details = [];

    valueGrid.plss_staged_loadtype = getStagedLoadType(valueGrid);

    existed =
      valueGrid?.plss_staged_loadtype !== '' &&
      valueGrid?.prod_code !== '' &&
      (valueGrid?.plss_staged_trip !== '' ||
        (valueGrid?.plss_staged_order !== '' && valueGrid?.plss_staged_cust !== ''));

    if (existed) {
      warning = t('descriptions.stagingCmptOccupied', { TRIP: tripNumber, CMPT: valueGrid?.compartment });
      details =
        valueGrid?.plss_staged_order !== '' && valueGrid?.plss_staged_loadtype === '4'
          ? [
              { title: t('fields.loadType'), value: t('operations.openOrder') },
              { title: t('fields.schdOrderId'), value: valueGrid?.order_cust_ordno },
              { title: t('fields.customer'), value: valueGrid?.trip_customer },
              { title: t('fields.product'), value: valueGrid?.prod_code + ' - ' + valueGrid?.prod_name },
            ]
          : valueGrid?.plss_staged_loadtype === '2'
          ? [
              { title: t('fields.loadType'), value: t('operations.preSchedule') },
              { title: t('fields.schdTripNo'), value: valueGrid?.plss_staged_trip },
              { title: t('fields.product'), value: valueGrid?.prod_code + ' - ' + valueGrid?.prod_name },
              { title: t('fields.compartment'), value: valueGrid?.plss_staged_cmpt },
            ]
          : [
              { title: t('fields.loadType'), value: t('operations.preOrder') },
              { title: t('fields.schdTripNo'), value: valueGrid?.plss_staged_trip },
              { title: t('fields.product'), value: valueGrid?.prod_code + ' - ' + valueGrid?.prod_name },
            ];
      notification.warning({
        message: t('messages.validationFailed'),
        description: (
          <>
            <div>{warning}</div>
            <div>
              <Descriptions bordered size="small" layout="horizontal" style={{ marginTop: 0 }} column={1}>
                {details?.map((note, index) => (
                  <Descriptions.Item key={index} label={note.title} span={1}>
                    {note.value}
                  </Descriptions.Item>
                ))}
              </Descriptions>
            </div>
          </>
        ),
        // duration: 0,
        style: {
          width: 500,
          height: 'calc(100vh - 400px)',
          overflowY: 'scroll',
        },
      });
    }

    return existed;
  };

  const checkDuplication = (indexDrop, valueDrop, indexGrid, valueGrid, tripNumber = '') => {
    console.log('checkDuplication............', indexDrop, valueDrop, indexGrid, valueGrid, tripNumber);
    if (valueDrop?.prod_code === '') {
      return false;
    }
    let duplicated = false;
    let warning = '';
    let details = [];

    valueGrid.plss_staged_loadtype = getStagedLoadType(valueGrid);

    // if it is a pre-schedule, compare the value dropped with all existing compartemnts to make sure the valueDrop not used before
    if (valueDrop?.plss_staged_loadtype === '2') {
      /*
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
      */
      duplicated =
        valueDrop?.plss_staged_loadtype === valueGrid?.plss_staged_loadtype &&
        valueDrop?.prod_code &&
        valueDrop?.prod_code === valueGrid?.prod_code &&
        valueDrop?.plss_staged_trip !== '' &&
        valueDrop?.plss_staged_trip === valueGrid?.plss_staged_trip &&
        valueDrop?.plss_staged_cmpt !== '' &&
        valueDrop?.plss_staged_cmpt === valueGrid?.plss_staged_cmpt;
      warning = t('descriptions.stagingPreScheduleStaged', {
        SRC_TRIP: valueDrop?.plss_staged_trip,
        SRC_CMPT: valueDrop?.plss_staged_cmpt,
        DST_TRIP: tripNumber,
        DST_CMPT: valueGrid?.compartment,
      });
      // details = `trip: ${valueDrop?.plss_staged_trip} - ${valueGrid?.plss_staged_trip}; product: ${valueDrop?.prod_code} - ${valueGrid?.prod_code}; compartment: ${valueDrop?.plss_staged_cmpt} - ${valueGrid?.plss_staged_cmpt}`;
      details = [
        { title: t('fields.loadType'), value: t('operations.preSchedule') },
        { title: t('fields.schdTripNo'), value: valueDrop?.plss_staged_trip },
        { title: t('fields.product'), value: valueDrop?.prod_code + ' - ' + valueDrop?.prod_name },
        { title: t('fields.compartment'), value: valueDrop?.plss_staged_cmpt },
      ];
    } else {
      // if it is not a pre-schedule, compare the value dropped with the targeted compartemnt to make sure the valueDrop not used before
      if (indexDrop === indexGrid) {
        // source is a pre-order
        if (valueDrop?.plss_staged_loadtype === '3') {
          /*
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
          */
          duplicated =
            valueDrop?.plss_staged_loadtype === valueGrid?.plss_staged_loadtype &&
            valueDrop?.prod_code &&
            valueDrop?.prod_code === valueGrid?.prod_code &&
            valueDrop?.plss_staged_trip !== '' &&
            valueDrop?.plss_staged_trip ===
              valueGrid?.plss_staged_trip /* &&
            (valueDrop?.plss_staged_cmpt !== '' && valueDrop?.plss_staged_cmpt === valueGrid?.plss_staged_cmpt ) */;
          warning = t('descriptions.stagingPreOrderStaged', {
            SRC_TRIP: valueDrop?.plss_staged_trip,
            SRC_PROD: valueDrop?.prod_code,
            DST_TRIP: tripNumber,
            DST_CMPT: valueGrid?.compartment,
          });
          // details = `trip: ${valueDrop?.plss_staged_trip} - ${valueGrid?.plss_staged_trip}; product: ${valueDrop?.prod_code} - ${valueGrid?.prod_code}`;
          details = [
            { title: t('fields.loadType'), value: t('operations.preOrder') },
            { title: t('fields.schdTripNo'), value: valueDrop?.plss_staged_trip },
            { title: t('fields.product'), value: valueDrop?.prod_code + ' - ' + valueDrop?.prod_name },
          ];
        }
        // source is an open order
        if (valueDrop?.plss_staged_loadtype === '4') {
          /*
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
          */
          duplicated =
            valueDrop?.plss_staged_loadtype === valueGrid?.plss_staged_loadtype &&
            valueDrop?.prod_code &&
            valueDrop?.prod_code === valueGrid?.prod_code &&
            valueDrop?.plss_staged_order !== '' &&
            valueDrop?.plss_staged_order === valueGrid?.plss_staged_order &&
            valueDrop?.plss_staged_cust !== '' &&
            valueDrop?.plss_staged_cust === valueGrid?.plss_staged_cust;
          warning = t('descriptions.stagingOpenOrderStaged', {
            SRC_ORDER: valueDrop?.order_cust_ordno,
            SRC_PROD: valueDrop?.prod_code,
            DST_TRIP: tripNumber,
            DST_CMPT: valueGrid?.compartment,
          });
          // details = `order: ${valueDrop?.order_cust_ordno} - ${valueGrid?.order_cust_ordno}; product: ${valueDrop?.prod_code} - ${valueGrid?.prod_code}; customer: ${valueDrop?.plss_staged_cust} - ${valueGrid?.plss_staged_cust}`;
          details = [
            { title: t('fields.loadType'), value: t('operations.openOrder') },
            { title: t('fields.schdOrderId'), value: valueDrop?.order_cust_ordno },
            { title: t('fields.customer'), value: valueDrop?.trip_customer },
            { title: t('fields.product'), value: valueDrop?.prod_code + ' - ' + valueDrop?.prod_name },
          ];
        }
      }
    }

    if (duplicated) {
      notification.warning({
        // message: t('validate.lineItemValidation'),
        message: t('messages.validationFailed'),
        description: (
          <>
            <div>{warning}</div>
            <div>
              <Descriptions bordered size="small" layout="horizontal" style={{ marginTop: 0 }} column={1}>
                {details?.map((note, index) => (
                  <Descriptions.Item key={index} label={note.title} span={1}>
                    {note.value}
                  </Descriptions.Item>
                ))}
              </Descriptions>
            </div>
          </>
        ),
        // duration: 0,
        style: {
          width: 500,
          height: 'calc(100vh - 400px)',
          overflowY: 'scroll',
        },
      });
    }

    return duplicated;
  };

  const checkAvailableQuantity = (valueDrop, valueGrid, gridNodes, tripNumber = '') => {
    // if (valueDrop?.prod_code === '') {
    //   return 0;
    // }
    let warning = '';
    let details = [];

    valueGrid.plss_staged_loadtype = getStagedLoadType(valueGrid);

    valueDrop.plss_staged_availqty = adjustStagedAvailQty(valueDrop);

    // need check the available qty scheduled for a staged trip, mainly pre-order or open order
    // PLSS_STAGED_LOADTYPE
    // 2: Pre Schedule
    // 3: Pre Order
    // 4: Open Order
    const sumScheduled = getTotalQtyScheduled(gridNodes, valueDrop);
    /* let sumScheduled = 0;
    gridNodes.forEach((node) => {
      const cmpt = node;
      let tripUsed = false;
      if (valueDrop?.plss_staged_loadtype === '2') {
        if (
          cmpt?.plss_staged_trip === valueDrop?.plss_staged_trip &&
          cmpt?.plss_staged_supp === valueDrop?.plss_staged_supp &&
          cmpt?.plss_staged_cmpt === valueDrop?.plss_staged_cmpt &&
          cmpt?.prod_code === valueDrop?.prod_code &&
          cmpt?.prod_name === valueDrop?.prod_name
        ) {
          tripUsed = true;
        }
      }
      if (valueDrop?.plss_staged_loadtype === '3') {
        if (
          cmpt?.plss_staged_trip === valueDrop?.plss_staged_trip &&
          cmpt?.plss_staged_supp === valueDrop?.plss_staged_supp &&
          cmpt?.prod_code === valueDrop?.prod_code &&
          cmpt?.prod_name === valueDrop?.prod_name
        ) {
          tripUsed = true;
        }
      }
      if (valueDrop?.plss_staged_loadtype === '4') {
        if (
          cmpt?.plss_staged_supp === valueDrop?.plss_staged_supp &&
          cmpt?.prod_code === valueDrop?.prod_code &&
          cmpt?.prod_name === valueDrop?.prod_name &&
          cmpt?.plss_staged_order === valueDrop?.plss_staged_order
        ) {
          console.log(valueDrop);
          tripUsed = true;
        }
      }
      if (tripUsed) {
        sumScheduled += parseInt(cmpt?.qty_scheduled);
      }
    }); */
    // for open order item, it already takes care of thq qty scheduled by previous loads in SQL
    // (OPD.ORDER_PROD_QTY - OPD.OPROD_SCHEDULED) AS PLSS_STAGED_SPECQTY
    const availToSchedule = parseInt(valueDrop?.plss_staged_availqty) - sumScheduled;

    if (availToSchedule <= 0) {
      if (valueDrop?.plss_staged_loadtype === '2') {
        warning = t('descriptions.stagingPreScheduleConsumed', {
          SRC_TRIP: valueDrop?.plss_staged_trip,
          SRC_CMPT: valueDrop?.plss_staged_cmpt,
          DST_TRIP: tripNumber,
          DST_CMPT: valueGrid?.compartment,
        });
        details = [
          { title: t('fields.loadType'), value: t('operations.preSchedule') },
          { title: t('fields.schdTripNo'), value: valueDrop?.plss_staged_trip },
          { title: t('fields.product'), value: valueDrop?.prod_code + ' - ' + valueDrop?.prod_name },
          { title: t('fields.compartment'), value: valueDrop?.plss_staged_cmpt },
          { title: t('fields.availableToSchedule'), value: valueDrop?.plss_staged_availqty },
        ];
      }
      // source is a pre-order
      if (valueDrop?.plss_staged_loadtype === '3') {
        warning = t('descriptions.stagingPreOrderConsumed', {
          SRC_TRIP: valueDrop?.plss_staged_trip,
          SRC_PROD: valueDrop?.prod_code,
          DST_TRIP: tripNumber,
          DST_CMPT: valueGrid?.compartment,
        });
        details = [
          { title: t('fields.loadType'), value: t('operations.preOrder') },
          { title: t('fields.schdTripNo'), value: valueDrop?.plss_staged_trip },
          { title: t('fields.product'), value: valueDrop?.prod_code + ' - ' + valueDrop?.prod_name },
          { title: t('fields.availableToSchedule'), value: valueDrop?.plss_staged_availqty },
        ];
      }
      // source is an open order
      if (valueDrop?.plss_staged_loadtype === '4') {
        warning = t('descriptions.stagingOpenOrderConsumed', {
          SRC_ORDER: valueDrop?.order_cust_ordno,
          SRC_PROD: valueDrop?.prod_code,
          DST_TRIP: tripNumber,
          DST_CMPT: valueGrid?.compartment,
        });
        details = [
          { title: t('fields.loadType'), value: t('operations.openOrder') },
          { title: t('fields.schdOrderId'), value: valueDrop?.order_cust_ordno },
          { title: t('fields.customer'), value: valueDrop?.trip_customer },
          { title: t('fields.product'), value: valueDrop?.prod_code + ' - ' + valueDrop?.prod_name },
          { title: t('fields.availableToSchedule'), value: valueDrop?.plss_staged_availqty },
        ];
      }

      notification.warning({
        message: t('messages.validationFailed'),
        description: (
          <>
            <div>{warning}</div>
            <div>
              <Descriptions bordered size="small" layout="horizontal" style={{ marginTop: 0 }} column={1}>
                {details?.map((note, index) => (
                  <Descriptions.Item key={index} label={note.title} span={1}>
                    {note.value}
                  </Descriptions.Item>
                ))}
              </Descriptions>
            </div>
          </>
        ),
        // duration: 0,
        style: {
          width: 500,
          height: 'calc(100vh - 480px)',
          overflowY: 'scroll',
        },
      });
    }

    return availToSchedule;
  };

  const onDragFinished = (index, valueDrop) => {
    const payload = [];

    // get the trip number of pickup schedule:
    const tripNumber = getFieldValue('shls_trip_no');

    // const rowNode = tableAPI.getRowNode(index);
    // when getRowNodeId is defined, system will treat index as the node ID.
    // For example, because we have defined data?.compartment as node ID, index 0 will be treated as compartment 0, which will cause the issue.
    // so here we use forEachNodeAfterFilterAndSort to get the node which loops through rows by index
    let rowNode = undefined;
    let indexDrop = index;
    let indexGrid = index;
    const nodes = [];
    tableAPI.forEachNodeAfterFilterAndSort((node, tableIndex) => {
      if (tableIndex === index) {
        rowNode = node;
      }
      nodes.push(node?.data);
    });
    const data = rowNode?.data;
    console.log('................ valueDrop', index, valueDrop);
    console.log('................ data', index, data);

    // do validation only when valueDrop.prod_code is not blank
    // the empty product code in valurDrop means to delete the current data
    if (valueDrop?.prod_code !== '') {
      // check the current compartment
      let existed = checkExistence(valueDrop, data, tripNumber);
      if (existed) {
        return;
      }
      let duplicated = checkDuplication(indexDrop, valueDrop, indexGrid, data, tripNumber);
      if (duplicated) {
        return;
      }
      // check the other compartments
      duplicated = false;
      tableAPI.forEachNodeAfterFilterAndSort((node, tableIndex) => {
        if (tableIndex !== index) {
          const flag = checkDuplication(indexDrop, valueDrop, tableIndex, node?.data, tripNumber);
          if (flag) {
            duplicated = true;
          }
        }
      });
      if (duplicated) {
        return;
      }
    }

    // check the available quantity
    const availToSchedule = checkAvailableQuantity(valueDrop, data, nodes, tripNumber);
    if (availToSchedule <= 0) {
      return;
    }

    const productCode = valueDrop?.prod_code || '';
    const productName = valueDrop?.prod_name || '';
    const sourceType = valueDrop?.plss_staged_loadtype || '-1';

    const quantityScheduled = !valueDrop?.prod_code
      ? data?.qty_scheduled
      : data?.qty_scheduled > 0
      ? // ? data?.qty_scheduled
        _.min([parseInt(data?.safefill), data?.qty_scheduled, availToSchedule])
      : _.min([parseInt(data?.safefill), availToSchedule]);

    let quantityPreloaded = 0;
    if (sourceType === '2') {
      quantityPreloaded = !valueDrop?.prod_code
        ? data?.qty_preload
        : data?.qty_preload > 0
        ? data?.qty_preload
        : _.min([parseInt(data?.safefill), parseInt(valueDrop?.plss_staged_prldqty)]);
    }

    /* const customerScheduled = !valueDrop?.prod_code
      ? data?.plss_staged_cust
      : data?.plss_staged_cust !== ''
      ? data?.plss_staged_cust
      : valueDrop?.plss_staged_cust;

    const delvlocScheduled = !valueDrop?.prod_code
      ? data?.plss_staged_delvloc
      : data?.plss_staged_delvloc !== ''
      ? data?.plss_staged_delvloc
      : valueDrop?.plss_staged_delvloc; */

    const customerScheduled = !valueDrop?.prod_code
      ? data?.plss_staged_cust
      : !valueDrop?.plss_staged_cust // === ''
      ? data?.plss_staged_cust
      : valueDrop?.plss_staged_cust;

    const delvlocScheduled = !valueDrop?.prod_code
      ? data?.plss_staged_delvloc
      : !valueDrop?.plss_staged_delvloc // === ''
      ? data?.plss_staged_delvloc
      : valueDrop?.plss_staged_delvloc;

    tableAPI.forEachNodeAfterFilterAndSort((rowNode, tableIndex) => {
      if (tableIndex === index) {
        payload.push({
          ...rowNode?.data,
          prod_code: productCode,
          prod_name: productName,
          qty_scheduled: quantityScheduled,
          prod_cmpy: supplier,
          qty_preload: quantityPreloaded,
          schdspec_shlstrip: value?.shls_trip_no || tripNumber,
          schdspec_shlssupp: supplier,
          order_cust_ordno: valueDrop?.order_cust_ordno,
          trip_order_no: valueDrop?.trip_order_no,
          trip_customer: valueDrop?.trip_customer,
          trip_delvloc: valueDrop?.trip_delvloc,
          plss_pickup_trip: value?.shls_trip_no || tripNumber,
          plss_pickup_supp: supplier,
          plss_pickup_cmpt: rowNode?.data?.compartment,
          plss_staged_trip: valueDrop?.plss_staged_trip,
          plss_staged_supp: valueDrop?.plss_staged_supp,
          plss_staged_cmpt: valueDrop?.plss_staged_cmpt,
          plss_staged_prodcode: valueDrop?.plss_staged_prodcode,
          plss_staged_prodcmpy: valueDrop?.plss_staged_prodcmpy,
          plss_staged_units: valueDrop?.plss_staged_units,
          plss_staged_specqty: quantityScheduled,
          plss_staged_availqty: valueDrop?.plss_staged_availqty,
          plss_staged_prldqty: quantityPreloaded,
          plss_staged_order: valueDrop?.plss_staged_order,
          plss_staged_cust: customerScheduled,
          plss_staged_delvloc: delvlocScheduled,
          plss_staged_loadtype: valueDrop?.plss_staged_loadtype,
          customer_editable: !valueDrop?.plss_staged_cust,
          delvloc_editable: !valueDrop?.plss_staged_delvloc,
        });
      } else {
        payload.push(rowNode?.data);
      }
    });

    // console.log('....................1, tableAPI', tableAPI, payload);
    tableAPI.updateRowData({ update: payload });
    // console.log('....................2, payload', payload, value, valueDrop);

    form.setFieldsValue({
      compartments: payload,
    });

    setCompartments(payload);
  };

  const fields = [
    {
      headerName: t('fields.equipment'),
      field: 'eqpt_code',
      resizable: true,
      width: 130,
      suppressSizeToFit: true,
      pinned: 'left',
    },

    {
      headerName: t('fields.compartment'),
      field: 'compartment',
      resizable: true,
      width: 130,
      suppressSizeToFit: true,
      pinned: 'left',
    },

    {
      headerName: t('fields.code'),
      field: 'prod_code',
      resizable: true,
      width: 120,
      suppressSizeToFit: true,
    },

    {
      headerName: t('fields.product'),
      field: 'prod_name',
      resizable: true,
      width: 300,
      suppressSizeToFit: true,
      editable: false,
      cellRenderer: 'DraggableRenderer',

      cellRendererParams: {
        onDragFinished,
        compartments,
        t,
      },
    },

    {
      headerName: t('fields.schedule'),
      field: 'qty_scheduled',
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
      editable: true,
      cellClass: 'editable-ag-grid-cell',
      cellEditor: 'ScheduleEditor',
      cellEditorParams: {
        min: 0,
        max: 15000,
        form: form,
      },
    },

    {
      headerName: t('fields.unit'),
      field: 'unit_name',
      resizable: true,
      width: 90,
      suppressSizeToFit: true,
      editable: true,
      cellClass: 'editable-ag-grid-cell',
      cellEditor: 'UnitEditor',
      cellEditorParams: {
        values: units?.records || [],
        form: form,
      },
    },

    {
      headerName: t('fields.ddTripOrdNo'),
      field: 'trip_order_no',
      resizable: true,
      width: 180,
      suppressSizeToFit: true,
      hide: false,
    },

    {
      headerName: t('fields.orderNo'),
      field: 'order_id',
      resizable: true,
      width: 110,
      suppressSizeToFit: true,
      hide: true,
    },

    {
      headerName: t('fields.orderNo'),
      field: 'order_cust_ordno',
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
      hide: true,
      editable: config?.accessOpenOrderFromSchdules,
      cellClass: config?.accessOpenOrderFromSchdules ? 'editable-ag-grid-cell' : '',
      cellEditor: 'InputPopupEditor',
      cellEditorParams: {
        form: form,
        grid: 'compartments',
        columnPairs: [
          'order_cust_ordno:order_cust_ordno',
          'oitem_order_id:order_id',
          'oitem_prod_code:prod_code',
          'oitem_prod_name:prod_name',
          'qty_left:qty_scheduled',
        ],
        tableAPI: tableAPI,
        // maxLength: 20,
        t,
        width: '90vw',
        height: '90vh',
        popupDisabled: !supplier,
        popupManager: OrderManager,
        popupTitle: t('descriptions.schdOrderTitle'),
        popupParams: {
          order_supp_code: supplier,
        },
      },
    },

    {
      headerName: t('fields.safeFill'),
      field: 'safefill',
      resizable: true,
      width: 110,
      suppressSizeToFit: true,
    },

    {
      headerName: t('fields.preloaded'),
      field: 'qty_preload',
      resizable: true,
      width: 90,
      suppressSizeToFit: true,
      editable: config?.siteSchdPreloadEditableNew, // true,
      cellClass: config?.siteSchdPreloadEditableNew ? 'editable-ag-grid-cell' : '',
      cellEditor: 'PreloadEditor',
      cellEditorParams: {
        min: 0,
        max: 999999,
        form: form,
        flag: config?.sitePreloadDeductFromPreset,
      },
      /* cellEditor: 'NumericEditor',
      cellEditorParams: {
        ranges: {
          max: 999999999,
          min: 0,
        },
        t,
      },*/
    },

    {
      headerName: t('fields.prevProduct'),
      field: 'prev_prod_name',
      resizable: true,
      width: 140,
      suppressSizeToFit: true,
    },

    {
      headerName: t('fields.customer'),
      field: 'trip_customer',
      resizable: true,
      width: 140,
      suppressSizeToFit: true,
      hide: true,
    },

    {
      headerName: t('fields.customer'),
      field: 'plss_staged_cust',
      resizable: true,
      width: 140,
      suppressSizeToFit: true,
      editable: true,
      cellClass: 'editable-ag-grid-cell',
      cellRenderer: 'ListRenderer',
      cellRendererParams: {
        values: _.uniq(
          _.map(customersBySupplier?.records, (item) => {
            return { code: item.cust_acnt, name: item.cust_desc };
          })
        ),
      },
      cellEditor: 'CustomerEditor',
      cellEditorParams: {
        values: _.uniq(
          _.map(customersBySupplier?.records, (item) => {
            return { code: item.cust_acnt, name: item.cust_desc };
          })
        ),
        editableColumn: 'customer_editable',
        products: customerProductsBySupplier?.records,
        flag: config?.site_customer_product,
        tableAPI: tableAPI,
      },
    },

    {
      headerName: t('fields.deliveryLocation'),
      field: 'trip_delvloc',
      resizable: true,
      width: 180,
      suppressSizeToFit: true,
      hide: true,
    },

    {
      headerName: t('fields.deliveryLocation'),
      field: 'plss_staged_delvloc',
      resizable: true,
      width: 180,
      suppressSizeToFit: true,
      editable: true,
      cellClass: 'editable-ag-grid-cell',
      cellRenderer: 'ListRenderer',
      cellRendererParams: {
        values: _.uniq(
          _.map(delvLocsBySupplier?.records, (item) => {
            return { code: item.delv_code, name: item.delv_desc };
          })
        ),
      },
      cellEditor: 'DelvlocEditor',
      cellEditorParams: {
        values: _.uniq(
          _.map(delvLocsBySupplier?.records, (item) => {
            return { code: item.delv_code, name: item.delv_desc, parent: item.delv_cust_acct };
          })
        ),
        editableColumn: 'delvloc_editable',
        parentColumn: 'plss_staged_cust',
        tableAPI: tableAPI,
      },
    },

    {
      headerName: t('fields.soldTo'),
      field: 'schd_sold_to_num',
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
      editable: true,
      cellClass: 'editable-ag-grid-cell',
      // cellEditor: 'SoldToEditor',
      // cellEditorParams: {
      //   values: soldTo?.records.filter((o)=>(o.partner_cmpy_code === supplier)) || [],
      //   form: form,
      // },
      cellEditor: 'InputPopupEditor',
      cellEditorParams: {
        form: form,
        grid: 'compartments',
        columnPairs: '',
        tableAPI: tableAPI,
        maxLength: 20,
        t,
        popupDisabled: !supplier,
        popupManager: PartnershipManager,
        popupTitle: t('fields.soldTo') + ' - ' + t('pageNames.partnership'),
        popupParams: {
          partner_code: '',
          partner_type: 'AG',
          partner_cmpy_code: supplier,
          partner_cust_acct: '',
        },
      },
    },

    {
      headerName: t('fields.shipTo'),
      field: 'schd_ship_to_num',
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
      editable: true,
      cellClass: 'editable-ag-grid-cell',
      // cellEditor: 'ShipToEditor',
      // cellEditorParams: {
      //   values: shipTo?.records.filter((o)=>(o.partner_cmpy_code === supplier)) || [],
      //   form: form,
      // },
      cellEditor: 'InputPopupEditor',
      cellEditorParams: {
        form: form,
        grid: 'compartments',
        columnPairs: '',
        tableAPI: tableAPI,
        maxLength: 20,
        t,
        popupDisabled: !supplier,
        popupManager: PartnershipManager,
        popupTitle: t('fields.shipTo') + ' - ' + t('pageNames.partnership'),
        popupParams: {
          partner_code: '',
          partner_type: 'WE',
          partner_cmpy_code: supplier,
          partner_cust_acct: '',
        },
      },
    },

    {
      headerName: t('fields.delvNo'),
      field: 'schd_deliv_num',
      resizable: true,
      width: 90,
      editable: true,
      cellClass: 'editable-ag-grid-cell',
      suppressSizeToFit: true,
      cellEditor: 'DelvNoEditor',
      cellEditorParams: {
        form: form,
      },
    },
  ];

  const productFields = [
    {
      headerName: t('fields.productCode'),
      field: 'prod_code',
      resizable: true,
      suppressSizeToFit: true,
      pinned: 'left',
      width: 125,
      dndSource: true,
    },

    {
      headerName: t('fields.productName'),
      field: 'prod_name',
      resizable: true,
      suppressSizeToFit: true,
    },
  ];

  const components = {
    ProductEditor,
    UnitEditor,
    ScheduleEditor,
    PreloadEditor,
    DelvNoEditor,
    CustomerEditor,
    DelvlocEditor,
  };

  return (
    <Row gutter={[8, 8]}>
      {/* <Col flex={1}>
        <DataTable data={products} columns={productFields} parentHeight="320px" minimal />
      </Col> */}
      <Col flex={4}>
        <Card
          size="small"
          title={t('tabColumns.stagingDestination')}
          hoverable
          headStyle={{ paddingRight: 10, fontWeight: 'bold' }}
          style={{ marginTop: 8 }}
          extra={
            <Button
              type="primary"
              icon={<EyeOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              disabled={compartments?.length === 0}
              onClick={checkAllocation}
            >
              {t('operations.checkAllocation')}
            </Button>
          }
        >
          <Form.Item name="compartments">
            <DataTable
              data={compartments}
              columns={fields}
              parentHeight="320px"
              components={components}
              minimal
              apiContext={setTableAPI}
              rowEditingStopped={rowEditingStopped}
              onCellUpdate={onCellUpdate}
              getRowNodeId={(data) => {
                return data?.compartment;
              }}
            />
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default Compartments;
