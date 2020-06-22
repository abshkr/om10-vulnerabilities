import React, { useCallback, useState } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { notification, Button } from 'antd';
import { SafetyCertificateOutlined, ReconciliationOutlined } from '@ant-design/icons';
import _ from 'lodash';

import Forms from './forms';
import auth from '../../auth';
import columns from './columns';
import api, { FOLIO_SUMMARY } from '../../api';
import { Page, DataTable, FormModal } from '../../components';

import { useAuth } from '../../hooks';

import './folio-summary.css';

const FolioSummary = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const { data: payload, isValidating } = useSWR(FOLIO_SUMMARY.READ);

  const access = useAuth('M_FOLIOMANAGEMENT');

  const fields = columns(t);

  // const handleClick = (value) => {
  //   FormModal({
  //     value,
  //     form: <Forms value={value} access={access} />,
  //     id: value?.closeout_nr,
  //     name: value?.closeout_name,
  //     t,
  //     width: '90vw',
  //   });
  // };

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const createPDS = useCallback(() => {
    api
      .post(FOLIO_SUMMARY.CREATE_PDS)
      .then((response) => {
        notification.success({
          message: t('messages.PDSSuccessful'),
          description: t('descriptions.PDSSuccessful'),
        });
      })

      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
      });
  }, [t]);

  const closeFolio = useCallback(() => {
    api
      .post(FOLIO_SUMMARY.MANUAL_CLOSE)
      .then((response) => {
        notification.success({
          message: t('messages.closeFolioSuccess'),
          description: t('descriptions.closeFolioSuccess'),
        });
      })

      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
      });
  }, [t]);

  const modifiers = (
    <>
      <Button
        type="primary"
        icon={<SafetyCertificateOutlined />}
        onClick={() => closeFolio(null)}
        style={{ float: 'right', marginRight: 5 }}
      >
        {t('operations.closeFirstFolio')}
      </Button>

      <Button
        type="primary"
        icon={<ReconciliationOutlined />}
        onClick={() => createPDS()}
        style={{ float: 'right', marginRight: 5 }}
      >
        {t('operations.createPDSFile')}
      </Button>
    </>
  );

  return (
    <Page
      page={t('pageMenu.reports')}
      name={t('pageNames.folioSummary')}
      modifiers={modifiers}
      access={access}
      avatar="folioSummary"
    >
      <DataTable 
        columns={fields} 
        data={payload?.records} 
        isLoading={isValidating} 
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
      />
      <Forms
        value={selected}
        visible={visible}
        handleFormState={handleFormState}
        access={access}
        // setFilterValue={setFilterValue}
      />
    </Page>
  );
};

export default auth(FolioSummary);
