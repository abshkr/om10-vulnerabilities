import React, { useState } from 'react';

import useSWR, { mutate } from 'swr';
import { Button, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, IdcardOutlined } from '@ant-design/icons';

import { Page, DataTable, Download } from '../../components';
import api, { PERSONNEL_ON_SITE, ON_DEMAND_REPORTS } from 'api';
import columns from './columns';
import auth from '../../auth';
import useAuth from 'hooks/use-auth';
import _ from 'lodash';
import Forms from './forms';

const PersonnelOnSite = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [reporting, setReporting] = useState(false);

  const { t } = useTranslation();

  const access = useAuth('M_ONSITEREPORT');

  const { data: payload, isValidating, mutate: revalidate } = useSWR(PERSONNEL_ON_SITE.READ);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const generateReport = () => {
    const payload = {
      report: 'Personnel_onsite.jrxml', //Hardcode here
      supplier: 'ANY',
      output: 'pdf',
    };

    setReporting(true);

    api
      .post(ON_DEMAND_REPORTS.CREATE, payload)
      .then((response) => {
        setReporting(false);
        const file = response?.data?.filepath;

        window.open(file, '_blank');

        notification.success({
          message: t('messages.reportGenerationSuccessful'),
          description: t('descriptions.reportGenerationSuccessful'),
        });
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
        setReporting(false);
      });
  };

  const fields = columns(t);

  const data = payload?.records;
  const isLoading = isValidating || !data;

  const page = t('pageMenu.reports');
  const name = t('pageNames.personnelOnSite');

  const site = { value: 'ON_SITE' };

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>
      <Button icon={<IdcardOutlined />} onClick={generateReport} loading={reporting}>
        {t('operations.generateReport')}
      </Button>
      <Download data={data} isLoading={isLoading} columns={fields} />
    </>
  );

  return (
    <Page page={page} name={name} modifiers={modifiers} access={access} avatar="personnelOnSite">
      <DataTable
        columns={fields}
        data={data}
        isLoading={isLoading}
        selectionMode="single"
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        filterValue={site.value}
      />
      <Forms value={selected} visible={visible} handleFormState={handleFormState} access={access} />
    </Page>
  );
};

export default auth(PersonnelOnSite);
