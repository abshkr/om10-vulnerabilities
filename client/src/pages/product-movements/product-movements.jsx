import React, { useState, useEffect } from 'react';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import useSWR from 'swr';
import moment from 'moment';

import { Page, PowerTable as DataTable, Download, DateTimeRangePicker } from '../../components';
import { PRODUCT_MOVEMENTS } from '../../api';
import columns from './columns';
import auth from '../../auth';
import { SETTINGS } from '../../constants';
import { useAuth, useConfig } from 'hooks';
import _ from 'lodash';

import Forms from './forms';

const ProductMovements = () => {
  const { t } = useTranslation();

  const access = useAuth('M_PRODUCTMOVEMENT');

  const [start, setStart] = useState(moment().subtract(7, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  const [end, setEnd] = useState(moment().add(7, 'days').format(SETTINGS.DATE_TIME_FORMAT));

  const config = useConfig();
  const { refreshProductMovement, scheduleDateRange, siteCustomColumnProdMove } = useConfig();
  const { data: payload, isValidating, revalidate } = useSWR(
    `${PRODUCT_MOVEMENTS.READ}?start_date=${start}&end_date=${end}`,
    {
      refreshInterval: refreshProductMovement,
    }
  );

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filterValue, setFilterValue] = useState('');

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
  };

  const fields = columns(t, config);
  const data = payload?.records;

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  useEffect(() => {
    if (selected) {
      const result = _.find(data, (item) => {
        return item.pmv_number === selected.pmv_number;
      });

      setSelected(result);
    }
  }, [payload]);

  const modifiers = (
    <>
      <DateTimeRangePicker
        handleChange={setRange}
        rangeSetting={scheduleDateRange}
        // refreshed={refreshed}
        // setRefreshed={setRefreshed}
        disabled={false}
        enableClear={true}
        max={720}
        // localBased={true}
      />

      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={data} isLoading={isValidating} columns={fields} />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleFormState(true, null)}
        loading={isValidating}
        disabled={!access?.canCreate}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page
      page={t('pageMenu.operations')}
      name={t('pageNames.productMovements')}
      modifiers={modifiers}
      access={access}
      avatar="productMovements"
    >
      <DataTable
        columns={fields}
        data={data}
        isLoading={isValidating}
        selectionMode="single"
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        filterValue={filterValue}
        columnAdjustable={siteCustomColumnProdMove}
        pageModule={'M_PRODUCTMOVEMENT'}
      />
      <Forms
        value={selected}
        visible={visible}
        handleFormState={handleFormState}
        access={access}
        setFilterValue={setFilterValue}
        refresh={revalidate}
        config={config}
      />
    </Page>
  );
};

export default auth(ProductMovements);
