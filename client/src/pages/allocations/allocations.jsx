import React, { useEffect, useState } from 'react';

import useSWR from 'swr';
import { Button, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, DateTimeRangePicker } from '../../components';
import { ALLOCATIONS } from '../../api';
import { SETTINGS } from '../../constants';
import { useAuth, useConfig } from '../../hooks';
import columns from './columns';
import auth from '../../auth';

import Forms from './forms';
import NewForms from './forms/new-forms';
import api from 'api';
import _ from 'lodash';

const Allocations = ({ popup, params }) => {
  const config = useConfig();
  const rangeSetting = config.allocationsDateRange;

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [alloctype, setAlloctype] = useState(null);
  const [company, setCompany] = useState(null);

  const { t } = useTranslation();

  const access = useAuth('M_ALLOCATIONS');

  const [refreshed, setRefreshed] = useState(false);
  const [start, setStart] = useState('-1');
  const [end, setEnd] = useState('-1');
  const [isSearching, setSearching] = useState(false);

  const url =
    popup && alloctype && company
      ? start && end
        ? `${ALLOCATIONS.READ}?start_date=${start}&end_date=${end}&alloc_type=${alloctype}&alloc_cmpycode=${company}`
        : null // `${ALLOCATIONS.READ}?alloc_type=${alloctype}&alloc_cmpycode=${company}`
      : start && end
      ? `${ALLOCATIONS.READ}?start_date=${start}&end_date=${end}`
      : null;

  const { data: payload, isValidating, revalidate } = useSWR(url);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
    // revalidate();
  };

  const onRefresh = () => {
    setRefreshed(true);

    // Don't need revalidate, let useSWR handle itself while parameter changes
    revalidate();
  };

  const locateLockal = (values) => {
    if (
      !values.alloc_type &&
      !values.alloc_cmpycode &&
      !values.alloc_suppcode &&
      !values.alloc_lock &&
      !values.alloc_index
    ) {
      return;
    }

    setSearching(true);

    api
      .get(ALLOCATIONS.READ, {
        params: {
          alloc_type: values.alloc_type,
          alloc_cmpycode: values.alloc_cmpycode,
          alloc_suppcode: values.alloc_suppcode,
          alloc_lock: values.alloc_lock,
          alloc_index: values.alloc_index,
        },
      })
      .then((res) => {
        // setCompartments(res.data.records);
        setData(res.data.records);
        setSearching(false);
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
        setSearching(false);
      });
  };

  const fields = columns(t, config);

  // const data = payload?.records;
  const [data, setData] = useState(payload?.records);
  const isLoading = isValidating || !data;

  const page = t('pageMenu.companies');
  const name = t('pageNames.allocations');

  useEffect(() => {
    if (popup && params) {
      setAlloctype(params?.alloc_type);
      setCompany(params?.alloc_cmpycode);
    }
  }, [popup, params]);

  useEffect(() => {
    if (payload?.records) {
      setData(payload?.records);
      // setLoading(false);
      payload.records = null;
    }
  }, [payload]);

  const modifiers = (
    <>
      <DateTimeRangePicker
        handleChange={setRange}
        rangeSetting={rangeSetting}
        refreshed={refreshed}
        setRefreshed={setRefreshed}
        disabled={false}
        enableClear={true}
        max={1000}
        // localBased={true}
      />

      <Button icon={<SyncOutlined />} onClick={() => onRefresh()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>

      <Download data={data} isLoading={isLoading} columns={fields} />

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleFormState(true, null)}
        loading={isLoading}
        disabled={!access.canCreate}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={page} name={name} modifiers={modifiers} access={access} standalone={popup}>
      <DataTable
        minimal={false}
        data={data}
        columns={fields}
        isLoading={isLoading || isSearching}
        selectionMode="single"
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        clearFilterPlus={revalidate}
      />
      {/* visible && !config?.siteAllocResetPeriodDateRanges && (
        <Forms
          value={selected}
          visible={visible}
          handleFormState={handleFormState}
          access={access}
          url={url}
          locateLockal={locateLockal}
        />
      ) */}
      {visible && (
        <NewForms
          value={selected}
          visible={visible}
          handleFormState={handleFormState}
          access={access}
          url={url}
          locateLockal={locateLockal}
          config={config}
        />
      )}
    </Page>
  );
};

export default Allocations;
// export default auth(Allocations);
