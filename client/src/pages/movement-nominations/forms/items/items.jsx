import React, { useState, useEffect } from 'react';
import {
  PlusOutlined,
  MinusOutlined,
  EyeOutlined,
  CarryOutOutlined,
  LockOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Button, Form, Drawer, Modal, notification, Card } from 'antd';
import useSWR, { mutate } from 'swr';
import moment from 'dayjs';
import _ from 'lodash';

import Schedules from './schedules';
import TransactionList from './transaction-list';
import NominationTransactions from './nomination-transactions';

import { DataTable } from '../../../../components';
import api, { MOVEMENT_NOMIATIONS, BASE_PRODUCTS } from '../../../../api';

import useColumns from './columns';

const Items = ({
  setTableAPIContext,
  value,
  config,
  cbFunction,
  setReceiptCount,
  setReceiptTotal,
  setReceiptUnit,
}) => {
  const { t } = useTranslation();

  const url = value ? `${MOVEMENT_NOMIATIONS.ITEMS}?mv_id=${value?.mv_id}` : null;

  const { data: payload, mutate: revalidate } = useSWR(url, { revalidateOnFocus: false });
  const { data: nomItemStatus, isValidating } = useSWR(MOVEMENT_NOMIATIONS.STATUS);
  const { data: bases } = useSWR(BASE_PRODUCTS.READ);
  const urlTran = value ? `${MOVEMENT_NOMIATIONS.TRANSACTIONS}?mv_id=${value?.mv_id}&mv_all=${'ALL'}` : null;
  const { data: allTransactions } = useSWR(urlTran, { revalidateOnFocus: false });

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [tableAPI, setTableAPI] = useState(null);
  const [size, setSize] = useState([]);

  const [scheduleVisible, setScheduleVisible] = useState(false);
  const [transactionVisible, setTransactionVisible] = useState(false);
  const [makeTransactionVisible, setMakeTransactionVisible] = useState(false);
  const [transItem, setTransItem] = useState({});

  const [buttonState, setButtonState] = useState({
    makeSchedule: false,
    viewSchedule: false,
    makeTransaction: false,
    viewTransaction: false,
    editLineItem: false,
  });

  const disabled = selected?.length === 0 || !selected;
  //const canModifyFurther = selected[0]?.mvitm_status_name === 'NEW' || disabled;
  const canModifyFurther = selected?.[0]?.mvitm_status === 0 || disabled;
  const removeItemDisabled = disabled || selected?.[0]?.mvitm_status !== 0;
  const fields = useColumns(value, selected, config);

  const onExitClicked = () => {
    if (!config?.siteFormCloseAlert) {
      setMakeTransactionVisible(false);
      return;
    }

    Modal.confirm({
      title: t('prompts.cancel'),
      okText: t('operations.leave'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.stay'),
      content: (
        <Card
          style={{ marginTop: 15, padding: 5, marginBottom: 15 }}
          size="small"
          title={t('validate.warning')}
        >
          {t('descriptions.cancelWarning')}
        </Card>
      ),
      centered: true,
      onOk: () => {
        setMakeTransactionVisible(false);
      },
    });
  };

  const handleButtonState = (state) => {
    /** 
    0	NEW
    1	PARTIALLY SCHEDULED
    2	FULLY SCHEDULED
    3	FULLY MOVED
    4	OUTSTANDING
    5	FULLY DELIVERED
    6	EXPIRED
    7	PARTIALLY MOVED
    8	PARTIALLY DELIVERED
    */
    switch (state) {
      case 0: //'NEW':
        return {
          makeSchedule: true,
          viewSchedule: false,
          makeTransaction: true,
          viewTransaction: false,
          editLineItem: false,
        };

      case 1: //'PARTIALLY SCHEDULED':
        return {
          makeSchedule: true,
          viewSchedule: true,
          makeTransaction: true,
          viewTransaction: false,
          editLineItem: true,
        };

      case 2: //'FULLY SCHEDULED':
        return {
          makeSchedule: false,
          viewSchedule: true,
          makeTransaction: true,
          viewTransaction: false,
          editLineItem: true,
        };

      case 3: //'FULLY MOVED':
        return {
          makeSchedule: false,
          viewSchedule: true,
          makeTransaction: false,
          viewTransaction: true,
          editLineItem: true,
        };

      case 4: //'OUTSTANDING':
        return {
          makeSchedule: true,
          viewSchedule: true,
          makeTransaction: true,
          viewTransaction: true,
          editLineItem: true,
        };

      case 5: //'FULLY DELIVERED':
        return {
          makeSchedule: false,
          viewSchedule: true,
          makeTransaction: false,
          viewTransaction: true,
          editLineItem: true,
        };

      case 6: //'EXPIRED':
        return {
          makeSchedule: false,
          viewSchedule: true,
          makeTransaction: false,
          viewTransaction: true,
          editLineItem: true,
        };

      case 7: //'PARTIALLY MOVED':
        return {
          makeSchedule: true,
          viewSchedule: true,
          makeTransaction: true,
          viewTransaction: true,
          editLineItem: true,
        };

      case 8: //'PARTIALLY DELIVERED':
        return {
          makeSchedule: true,
          viewSchedule: true,
          makeTransaction: true,
          viewTransaction: true,
          editLineItem: true,
        };

      default:
        return {
          makeSchedule: false,
          viewSchedule: false,
          makeTransaction: false,
          viewTransaction: false,
          editLineItem: false,
        };
    }
  };

  const getNominationItemTransactions = async (item) => {
    const results = await api.get(
      `${MOVEMENT_NOMIATIONS.TRANSACTIONS}?mv_id=${item?.mvitm_move_id}&line_id=${item?.mvitm_line_id}`
    );

    return results?.data;
  };

  const getNominationItemReceipts = (transactions, bases) => {
    const result = {
      base: undefined,
      unit: undefined,
      amb: 0,
      std: 0,
      mass: 0,
    };
    for (let i = 0; i < transactions?.length; i++) {
      const tran = transactions?.[i];
      const transfers = tran?.transfers;
      for (let j = 0; j < transfers?.length; j++) {
        const trsf = transfers?.[j];
        const tranbases = trsf?.base_prods;
        for (let k = 0; k < tranbases?.length; k++) {
          const trsb = tranbases?.[k];
          if (result.base === undefined) {
            result.base = trsb?.base_code;
            // get its unit
            const item = _.find(bases, (o) => o?.base_code === trsb?.base_code);
            if (!item) {
              result.unit = 11;
            } else {
              let unitId = 11;
              if (item?.base_stock_unit === '0') {
                // volume unit
                if (config?.siteOwnershipVolumeMode === 'GOV') {
                  unitId = 5;
                }
                if (config?.siteOwnershipVolumeMode === 'GSV') {
                  unitId = 11;
                }
              }
              if (item?.base_stock_unit === '1') {
                // volume unit
                if (config?.siteOwnershipMassMode === 'WiV') {
                  unitId = 17; // 35;
                }
                if (config?.siteOwnershipMassMode === 'WiA') {
                  unitId = 17; // 36;
                }
              }
              result.unit = unitId;
            }
          }
          result.amb += _.toNumber(trsb?.trsb_avl);
          result.std += _.toNumber(trsb?.trsb_cvl);
          result.mass += _.toNumber(trsb?.trsb_kg);
        }
      }
    }
    return result;
  };

  const getNominationItem = async (key, item) => {
    const results = await api.get(`${MOVEMENT_NOMIATIONS.NOMITEM}?mv_id=${key}&mvitm_item_id=${item}`);

    return results?.data;
  };

  const countNominationItemTrips = async (item) => {
    const results = await api.get(`${MOVEMENT_NOMIATIONS.COUNT_NOMITEM_TRIPS}?mvitm_item_id=${item}`);

    return results?.data;
  };

  const gotoMakeTransactions = async () => {
    const currItem = selected?.[0];

    const lines = await getNominationItem(value?.mv_id, currItem?.mvitm_item_id);

    const oldItem = lines?.records?.[0];
    console.log('..............gotoMakeTransactions', oldItem, currItem);
    /*
      view-only columns in items table:
        mvitm_line_id,
        mvitm_key,
        mvitm_terminal,
        mvitm_item_id,
        mvitm_completed,
        mvitm_status,
        mvitm_shiploc_from,
        mvitm_shiptext_from,
        mvitm_shiptext_from2,
        mvitm_shiploc_to,
        mvitm_shiptext_to,
        mvitm_shiptext_to2,
        mvitm_qty_schd,
        mvitm_qty_move,
        mvitm_qty_delv,
      editable columns in items table:
        mvitm_type,
        mvitm_item_key,
        mvitm_prod_qty,
        mvitm_prod_unit,
        mvitm_plant_from,
        mvitm_prodcmpy_from,
        mvitm_prodcode_from,
        mvitm_prodname_from,
        mvitm_tank_from,
        mvitm_plant_to,
        mvitm_prodcmpy_to,
        mvitm_prodcode_to,
        mvitm_prodname_to,
        mvitm_tank_to,
        mvitm_comments,
    */
    let itemChanged = false;
    if (
      oldItem?.mvitm_type !== currItem?.mvitm_type ||
      oldItem?.mvitm_item_key !== currItem?.mvitm_item_key ||
      _.toNumber(oldItem?.mvitm_prod_qty) !== _.toNumber(currItem?.mvitm_prod_qty) ||
      oldItem?.mvitm_prod_unit !== currItem?.mvitm_prod_unit ||
      oldItem?.mvitm_plant_from !== currItem?.mvitm_plant_from ||
      oldItem?.mvitm_prodcmpy_from !== currItem?.mvitm_prodcmpy_from ||
      oldItem?.mvitm_prodcode_from !== currItem?.mvitm_prodcode_from ||
      oldItem?.mvitm_prodname_from !== currItem?.mvitm_prodname_from ||
      oldItem?.mvitm_tank_from !== currItem?.mvitm_tank_from ||
      oldItem?.mvitm_plant_to !== currItem?.mvitm_plant_to ||
      oldItem?.mvitm_prodcmpy_to !== currItem?.mvitm_prodcmpy_to ||
      oldItem?.mvitm_prodcode_to !== currItem?.mvitm_prodcode_to ||
      oldItem?.mvitm_prodname_to !== currItem?.mvitm_prodname_to ||
      oldItem?.mvitm_tank_to !== currItem?.mvitm_tank_to ||
      oldItem?.mvitm_comments !== currItem?.mvitm_comments
    ) {
      itemChanged = true;
    }

    if (itemChanged) {
      notification.warning({
        message:
          t('messages.nominationItemChanged') +
          ' [' +
          t('fields.line') +
          ': ' +
          currItem?.mvitm_item_id +
          ']',
        description: t('descriptions.nominationItemChanged'),
      });
      return;
    }

    currItem.mvitm_carrier = value?.mv_carrier;
    currItem.mvitm_tanker = value?.mv_vehicle;
    if (!currItem.mvitm_tanker) {
      currItem.mvitm_tanker = 'Generic Nom Vol';
    }
    if (!currItem.mvitm_key) {
      currItem.mvitm_key = value?.mv_key;
    }
    if (!currItem.mvitm_terminal) {
      currItem.mvitm_terminal = value?.mv_terminal;
    }
    if (currItem.mvitm_prodname_from === '') {
      currItem.mvitm_prodname_from = currItem?.mvitm_prodcode_from;
    }
    if (currItem.mvitm_prodname_to === '') {
      currItem.mvitm_prodname_to = currItem?.mvitm_prodcode_to;
    }
    // const serverCurrent = moment(config?.serverTime, SETTINGS.DATE_TIME_FORMAT);

    currItem.mvitm_dtim_effect = ''; //moment();
    currItem.mvitm_dtim_expiry = ''; //moment();
    console.log('params for MT4NOM', currItem, selected);
    setTransItem(currItem);
    setMakeTransactionVisible(true);
  };

  const getNextLineNo = () => {
    let nextNo = 0;
    tableAPI.forEachNode((rowNode, index) => {
      if (nextNo < _.toNumber(rowNode?.data?.mvitm_line_id)) {
        nextNo = _.toNumber(rowNode?.data?.mvitm_line_id);
      }
    });
    return nextNo + 1;
  };

  const handleItemAdd = () => {
    const length = getNextLineNo();

    // get status name
    const status = _.find(nomItemStatus?.records, (o) => String(o.movstatus_type_id) === '0');
    // console.log('............handleItemAdd', nomItemStatus, status);

    const line = {
      mvitm_line_id: String(length),
      mvitm_item_id: '',
      mvitm_key: value?.mv_key,
      mvitm_terminal: value?.mv_terminal,
      mvitm_type: 0,
      mvitm_type_name: 'Receipt',
      mvitm_item_key: String(length),
      mvitm_status: 0,
      mvitm_status_name: !status ? 'NEW' : status?.movstatus_type_name,
      mvitm_prod_qty: '0',
      mvitm_prod_unit: 5,
      mvitm_prod_unit_str: 'l (amb)',
      mvitm_plant_from: '',
      mvitm_prodcmpy_from: '',
      mvitm_prodcode_from: '',
      mvitm_tank_from: '',
      mvitm_shiploc_from: '',
      mvitm_shiptext_from: '',
      mvitm_shiptext_from2: '',
      mvitm_plant_to: t('placeholder.selectPlease'),
      mvitm_prodcmpy_to: t('placeholder.selectPlease'),
      mvitm_prodcode_to: t('placeholder.selectPlease'),
      mvitm_tank_to: '',
      mvitm_shiploc_to: '',
      mvitm_shiptext_to: '',
      mvitm_shiptext_to2: '',
      mvitm_comments: '',
      mvitm_qty_schd: '0',
      mvitm_qty_move: '0',
      mvitm_qty_delv: '0',
      editable: true,
      cellClass: 'editable-ag-grid-cell',
    };

    setSize(length);

    tableAPI.updateRowData({ add: [line] });
  };

  const handleItemRemove = () => {
    tableAPI.updateRowData({ remove: selected });
  };

  const handleItemSelect = async (items) => {
    console.log('handleItemSelect', items);
    if (items && items[0]) {
      const trips = await countNominationItemTrips(items?.[0]?.mvitm_item_id);
      items[0].trip_number = _.toNumber(trips?.records?.[0]?.cnt);
      items[0].editable = items?.[0]?.mvitm_status === 0 && !items?.[0]?.mvitm_completed;
      if (!items?.[0]?.mvitm_key) {
        items[0].mvitm_key = value?.mv_key;
      }
    }
    console.log('handleItemSelect222', items);
    setSelected(items);
  };

  const onEditingFinished = (value) => {
    let nomitem = value.data;

    console.log('onEditingFinished', value, value.colDef);

    // calculate the into-transit gain/loss
    if (value.colDef.field === 'mvitm_receipt_expected') {
      if (nomitem?.mvitm_status === 0) {
        nomitem.mvitm_into_transit_gl = 0;
      } else {
        nomitem.mvitm_into_transit_gl = nomitem?.mvitm_qty_move - nomitem?.mvitm_receipt_expected;
      }
    }

    // set the product name by product code
    if (value.colDef.field === 'mvitm_prodcode_from') {
      const prodFromList = value.colDef?.cellRendererParams?.values;
      if (prodFromList) {
        const prodFrom = _.filter(prodFromList, (o) => o.code === value?.value);
        nomitem.mvitm_prodname_from = prodFrom?.[0]?.code + ' - ' + prodFrom?.[0]?.name;
      } else {
        nomitem.mvitm_prodname_from = value?.value;
      }
    }

    // set the product name by product code
    if (value.colDef.field === 'mvitm_prodcode_to') {
      const prodToList = value.colDef?.cellRendererParams?.values;
      if (prodToList) {
        const prodTo = _.filter(prodToList, (o) => o.code === value?.value);
        nomitem.mvitm_prodname_to = prodTo?.[0]?.code + ' - ' + prodTo?.[0]?.name;
      } else {
        nomitem.mvitm_prodname_to = value?.value;
      }
    }

    if (value.colDef.field === 'mvitm_prodcmpy_from') {
      nomitem.mvitm_prodcode_from = t('placeholder.selectPlease');
    }

    if (value.colDef.field === 'mvitm_prodcmpy_to') {
      nomitem.mvitm_prodcode_to = t('placeholder.selectPlease');
    }

    if (value.colDef.field === 'mvitm_type') {
      if (value.value === 0) {
        nomitem.mvitm_plant_from = '';
        nomitem.mvitm_prodcmpy_from = '';
        nomitem.mvitm_prodcode_from = '';
        nomitem.mvitm_tank_from = '';

        nomitem.mvitm_plant_to = t('placeholder.selectPlease');
        nomitem.mvitm_prodcmpy_to = t('placeholder.selectPlease');
        nomitem.mvitm_prodcode_to = t('placeholder.selectPlease');
        nomitem.mvitm_tank_to = ''; //t('placeholder.selectPlease');
      }

      if (value.value === 1) {
        nomitem.mvitm_plant_from = t('placeholder.selectPlease');
        nomitem.mvitm_prodcmpy_from = t('placeholder.selectPlease');
        nomitem.mvitm_prodcode_from = t('placeholder.selectPlease');
        nomitem.mvitm_tank_from = ''; //t('placeholder.selectPlease');

        nomitem.mvitm_tank_to = '';
        nomitem.mvitm_prodcode_to = '';
        nomitem.mvitm_plant_to = '';
        nomitem.mvitm_prodcmpy_to = '';
      }

      if (value.value === 2) {
        nomitem.mvitm_plant_from = t('placeholder.selectPlease');
        nomitem.mvitm_prodcmpy_from = t('placeholder.selectPlease');
        nomitem.mvitm_prodcode_from = t('placeholder.selectPlease');
        nomitem.mvitm_tank_from = ''; //t('placeholder.selectPlease');

        nomitem.mvitm_plant_to = t('placeholder.selectPlease');
        nomitem.mvitm_prodcmpy_to = t('placeholder.selectPlease');
        nomitem.mvitm_prodcode_to = t('placeholder.selectPlease');
        nomitem.mvitm_tank_to = ''; //t('placeholder.selectPlease');
      }
    }

    tableAPI.updateRowData({ update: [nomitem] });

    //setSelected([nomitem]);
    handleItemSelect([nomitem]);
  };

  const onToggle = () => {
    Modal.confirm({
      title: t('prompts.update'),
      okText: t('operations.update'),
      okType: 'danger',
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        const itemValue = {
          mvitm_move_id: value?.mv_id,
          mvitm_line_id: selected?.[0]?.mvitm_line_id,
          mvitm_completed: !selected?.[0]?.mvitm_completed,
        };

        await api
          .post(MOVEMENT_NOMIATIONS.TOGGLE_ITEM, itemValue)
          .then((response) => {
            mutate(url);
            setSelected([]);
            const buttonStates = handleButtonState(-1);
            setButtonState(buttonStates);

            notification.success({
              message: t('messages.updateSuccess'),
              description: `${t('messages.updateSuccess')}`,
            });
          })

          .catch((error) => {
            notification.error({
              message: error.message,
              description: t('descriptions.updateFailed'),
            });
          });
      },
    });
  };

  useEffect(() => {
    if (payload?.records) {
      // console.log('..................I am here 1', payload?.records);
      setData(payload?.records);
      // get the coumts of receipt items
      // get the total receipt volumes
      // let receiptTotal = 0;
      let receiptCount = 0;
      // let receiptUnit = undefined;
      _.forEach(payload?.records, (o) => {
        if (o?.mvitm_type === 0) {
          receiptCount += 1;
          // receiptTotal += !o?.mvitm_qty_move ? 0 : _.toNumber(o?.mvitm_qty_move);
          // receiptUnit = _.toNumber(o?.mvitm_prod_unit);
        }
      });
      // console.log('..................I am here 1a', receiptCount, receiptTotal);
      setReceiptCount(receiptCount);
      // setReceiptTotal(receiptTotal);
      // setReceiptUnit(receiptUnit);
    }

    setSize(payload?.records?.length || 0);
  }, [payload, setData]);

  useEffect(() => {
    if (allTransactions?.records && bases?.records) {
      // console.log('..................I am here 1', payload?.records);
      // get the total receipt volumes
      let receiptTotal = 0;
      let receiptUnit = undefined;
      const result = getNominationItemReceipts(allTransactions?.records, bases?.records);
      if (receiptUnit === undefined) {
        receiptUnit = result.unit;
      }
      receiptTotal = receiptUnit === 11 ? result.std : receiptUnit === 17 ? result.mass : result.amb;
      // console.log('..................I am here 1a', receiptCount, receiptTotal);
      setReceiptTotal(receiptTotal);
      setReceiptUnit(receiptUnit);
    }
  }, [allTransactions, bases]);

  useEffect(() => {
    if (tableAPI) {
      setTableAPIContext(tableAPI);
    }
  }, [tableAPI, setTableAPIContext]);

  useEffect(() => {
    if (selected?.[0]) {
      const buttonStates = handleButtonState(selected?.[0]?.mvitm_status);

      if (!selected?.[0]?.mvitm_item_id) {
        buttonStates.makeSchedule = false;
        buttonStates.viewSchedule = false;
        buttonStates.makeTransaction = false;
        buttonStates.viewTransaction = false;
      }

      if (selected?.[0]?.mvitm_completed) {
        buttonStates.makeTransaction = false;
      }

      setButtonState(buttonStates);
    }
  }, [selected]);

  useEffect(() => {
    if (value) {
      setSelected([]);
    }
  }, [value]);

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleItemAdd} style={{ marginRight: 5 }}>
        {t('operations.addLineItem')}
      </Button>

      <Button
        type="danger"
        icon={<MinusOutlined />}
        disabled={removeItemDisabled}
        onClick={handleItemRemove}
        style={{ marginBottom: 10 }}
      >
        {t('operations.deleteLineItem')}
      </Button>

      <Button
        type="primary"
        icon={<CarryOutOutlined />}
        style={{ float: 'right', marginRight: 5 }}
        disabled={!buttonState?.makeTransaction || disabled || !value}
        onClick={() => gotoMakeTransactions()}
      >
        {t('operations.makeTransaction')}
      </Button>

      <Button
        type="primary"
        icon={<EyeOutlined />}
        style={{ float: 'right', marginRight: 5 }}
        disabled={(!buttonState?.viewTransaction && !(selected?.[0]?.trip_number > 0)) || disabled}
        onClick={() => setTransactionVisible(true)}
      >
        {t('operations.viewTransaction')}
      </Button>

      <Button
        type="primary"
        icon={<EyeOutlined />}
        style={{ float: 'right', marginRight: 5 }}
        disabled={(!buttonState?.viewSchedule && !(selected?.[0]?.trip_number > 0)) || disabled}
        // disabled={!(buttonState?.viewSchedule || value?.mv_status!==0) || disabled}
        onClick={() => setScheduleVisible(true)}
      >
        {t('operations.viewSchedule')}
      </Button>

      <Button
        type="primary"
        icon={<LockOutlined />}
        style={{ float: 'right', marginRight: 5 }}
        disabled={canModifyFurther || disabled}
        onClick={onToggle}
      >
        {selected?.[0]?.mvitm_completed ? t('operations.unlockItem') : t('operations.lockItem')}
      </Button>

      {transactionVisible && (
        <Drawer
          placement="right"
          styles={{ body: { paddingTop: 5 } }}
          onClose={() => setTransactionVisible(false)}
          open={transactionVisible}
          width="100vw"
        >
          <TransactionList selected={selected?.[0]} config={config} />
        </Drawer>
      )}

      {makeTransactionVisible && (
        <Drawer
          placement="right"
          styles={{ body: { paddingTop: 5 } }}
          onClose={() => onExitClicked()}
          open={makeTransactionVisible}
          width="100vw"
        >
          <NominationTransactions
            params={transItem}
            access={null}
            config={config}
            cbFunction={cbFunction}
            closeForm={setMakeTransactionVisible}
          />
        </Drawer>
      )}

      {scheduleVisible && (
        <Drawer
          placement="right"
          styles={{ body: { paddingTop: 5 } }}
          onClose={() => setScheduleVisible(false)}
          open={scheduleVisible}
          width="100vw"
        >
          <Schedules
            selected={!selected?.[0]?.mvitm_key ? { mvitm_key: value?.mv_key } : selected?.[0]}
            cbFunction={cbFunction}
            closeForm={setScheduleVisible}
          />
        </Drawer>
      )}

      <Form.Item name="items">
        <DataTable
          minimal={true}
          columns={fields}
          data={data}
          handleSelect={(value) => handleItemSelect(value)}
          apiContext={setTableAPI}
          selectionMode="single"
          onEditingFinished={onEditingFinished}
          height={'70vh'}
          editType={false}
        />
      </Form.Item>
    </>
  );
};

export default Items;
