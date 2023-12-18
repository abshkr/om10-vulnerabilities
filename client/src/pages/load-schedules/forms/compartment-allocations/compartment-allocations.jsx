import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select, notification, Tag, Row, Col, Card, Descriptions, Table, Tabs } from 'antd';
import { mutate } from 'swr';

import moment from 'dayjs';
import _ from 'lodash';

import api, { STAGING_BAY } from 'api';
import columns from './columns';
import AllocationProducts from './allocation-products';

import { DATE_TIME_FORMAT } from 'constants/settings';
import { AllocationFooter, AllocationContainer } from './styles';
import './antd-table-rows.css';

const { TabPane } = Tabs;

const CompartmentAllocations = ({ supplier, drawer, carrier, disabled, config, compartments }) => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [baseData, setBaseData] = useState([]);

  const { data: payloadAllocs } = useSWR(STAGING_BAY.ALLOCATION_PRODUCTS);
  const { data: payloadRatios } = useSWR(STAGING_BAY.RATIO_PRODUCTS);

  const getRowKey = (record) => {
    return `${record?.compartment}-${record?.prod_cmpy}-${record?.prod_code}`;
  };

  const getBaseCompartments = (compartments, ratios) => {
    const newcmpts = [];
    for (let i = 0; i < compartments?.length; i++) {
      const cmpt = compartments?.[i];
      if (!cmpt?.prod_code) {
        continue;
      }
      const bases = _.filter(
        ratios,
        (o) => o?.pitem_cmpy_code === cmpt?.prod_cmpy && o?.pitem_prod_code === cmpt?.prod_code
      );
      console.log('..........basecmpt func', bases, ratios);
      for (let j = 0; j < bases?.length; j++) {
        const base = bases?.[j];
        const newcmpt = {
          ...cmpt,
          prod_cmpy: 'BaSePrOd',
          prod_code: base?.pitem_base_code,
          prod_name: base?.pitem_base_name,
          qty_scheduled:
            (_.toNumber(cmpt?.qty_scheduled) * _.toNumber(base?.pitem_ratio_value)) /
            _.toNumber(base?.pitem_ratio_total),
          qty_preload:
            (_.toNumber(cmpt?.qty_preload) * _.toNumber(base?.pitem_ratio_value)) /
            _.toNumber(base?.pitem_ratio_total),
        };
        newcmpts.push(newcmpt);
      }
    }
    return newcmpts;
  };

  const isAllocationEnough = (item, cmpt) => {
    let flag = undefined;

    if (item?.alloc_lock === '0') {
      flag = false;
    } else if (item?.alloc_lock === '1') {
      flag = true;
    } else {
      flag = _.toNumber(item?.aitem_qtyleft) > _.toNumber(cmpt?.qty_scheduled);
      // check the dates: alloc_start_date, alloc_end_date
      if (item?.alloc_start_date || item?.alloc_end_date) {
        const current = moment();
        if (item?.alloc_start_date) {
          const start = moment(item?.alloc_start_date, DATE_TIME_FORMAT);
          if (start.isAfter(current)) {
            flag = true;
          }
        }
        if (item?.alloc_end_date) {
          const end = moment(item?.alloc_end_date, DATE_TIME_FORMAT);
          if (current.isAfter(end)) {
            flag = true;
          }
        }
      }
    }

    return flag;
  };

  useEffect(() => {
    // 1 - SUPPLIER
    // 2 - CARRIER
    // 3 - CUSTOMER
    // 4 - DRAWER
    if (payloadAllocs && compartments && supplier && drawer && carrier) {
      const newcmpts = [];
      for (let i = 0; i < compartments?.length; i++) {
        const cmpt = compartments?.[i];
        if (!cmpt?.prod_code) {
          continue;
        }
        const items = _.filter(
          payloadAllocs?.records,
          (o) =>
            ((o?.alloc_type === '1' && o?.alloc_cmpycode === supplier) ||
              (o?.alloc_type === '2' && o?.alloc_cmpycode === carrier) ||
              (o?.alloc_type === '3' && o?.alloc_custacct === cmpt?.plss_staged_cust) ||
              (o?.alloc_type === '4' && o?.alloc_cmpycode === drawer)) &&
            o?.aitem_suppcode === cmpt?.prod_cmpy &&
            o?.aitem_prodcode === cmpt?.prod_code
        );
        const newitems = [];
        let isEnough = true;
        for (let j = 0; j < items?.length; j++) {
          const item = items?.[j];
          const newitem = {
            ...item,
            aitem_qty_scheduled: cmpt?.qty_scheduled,
            aitem_qty_preload: cmpt?.qty_preload,
            aitem_qty_enough: isAllocationEnough(item, cmpt),
          };
          newitems.push(newitem);
          if (!newitem?.aitem_qty_enough) {
            isEnough = false;
          }
        }
        cmpt['products'] = newitems;
        cmpt['cmpt_alloc_ok'] = isEnough;
        newcmpts.push(cmpt);
      }

      setData(newcmpts);
      // setData(payloadAllocs?.records);
    }
  }, [supplier, drawer, carrier, payloadAllocs, compartments]);

  useEffect(() => {
    // 1 - SUPPLIER
    // 2 - CARRIER
    // 3 - CUSTOMER
    // 4 - DRAWER
    if (payloadAllocs && payloadRatios && compartments && supplier) {
      // get the base compartments;
      const baseCompartments = getBaseCompartments(compartments, payloadRatios?.records);
      console.log('.................base cmpt', baseCompartments);
      const newcmpts = [];
      for (let i = 0; i < baseCompartments?.length; i++) {
        const cmpt = baseCompartments?.[i];
        if (!cmpt?.prod_code) {
          continue;
        }
        const items = _.filter(
          payloadAllocs?.records,
          (o) =>
            ((o?.alloc_type === '1' && o?.alloc_cmpycode === supplier) ||
              (o?.alloc_type === '3' &&
                o?.alloc_custacct === cmpt?.plss_staged_cust &&
                o?.alloc_baseflag === 'Y')) &&
            o?.aitem_suppcode === cmpt?.prod_cmpy &&
            o?.aitem_prodcode === cmpt?.prod_code
        );
        const newitems = [];
        let isEnough = true;
        for (let j = 0; j < items?.length; j++) {
          const item = items?.[j];
          const newitem = {
            ...item,
            aitem_qty_scheduled: cmpt?.qty_scheduled,
            aitem_qty_preload: cmpt?.qty_preload,
            aitem_qty_enough: isAllocationEnough(item, cmpt),
          };
          newitems.push(newitem);
          if (!newitem?.aitem_qty_enough) {
            isEnough = false;
          }
        }
        cmpt['products'] = newitems;
        cmpt['cmpt_alloc_ok'] = isEnough;
        newcmpts.push(cmpt);
      }

      setBaseData(newcmpts);
      // setData(payloadAllocs?.records);
    }
  }, [supplier, payloadAllocs, payloadRatios, compartments]);

  return (
    <Card hoverable>
      <Tabs defaultActiveKey={'1'} type="card">
        <TabPane tab={t('tabColumns.drawerProductAllocs')} key="1">
          <AllocationContainer>
            <Table
              dataSource={data}
              rowKey={getRowKey}
              bordered
              loading={false}
              columns={columns(t, config)}
              pagination={false}
              expandable={{
                expandedRowRender: (allocation) => AllocationProducts({ allocation, t, config }),
              }}
              // expandedRowRender={(item) => AllocationProducts(item, t)}
              // footer={() => (
              //   <AllocationFooter>
              //     {t('descriptions.totalFlow')}: {0} {t('units.lpm')}{' '}
              //   </AllocationFooter>
              // )}
              scroll={{ x: true, y: '400px' }}
              // scroll={{  }}
              rowClassName={(record, index) => {
                return record?.cmpt_alloc_ok ? null : 'antd-table-row-warn';
              }}
            />
          </AllocationContainer>
        </TabPane>
        <TabPane tab={t('tabColumns.baseProductAllocs')} key="2">
          <AllocationContainer>
            <Table
              dataSource={baseData}
              rowKey={getRowKey}
              bordered
              loading={false}
              columns={columns(t, config)}
              pagination={false}
              expandable={{
                expandedRowRender: (allocation) => AllocationProducts({ allocation, t, config }),
              }}
              // expandedRowRender={(item) => AllocationProducts(item, t)}
              // footer={() => (
              //   <AllocationFooter>
              //     {t('descriptions.totalFlow')}: {0} {t('units.lpm')}{' '}
              //   </AllocationFooter>
              // )}
              scroll={{ x: true, y: '400px' }}
              // scroll={{  }}
              rowClassName={(record, index) => {
                return record?.cmpt_alloc_ok ? null : 'antd-table-row-warn';
              }}
            />
          </AllocationContainer>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default CompartmentAllocations;
