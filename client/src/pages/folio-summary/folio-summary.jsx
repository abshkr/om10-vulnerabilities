import React, { useCallback } from 'react';

import useSWR from 'swr';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { notification, Button } from 'antd';

import Forms from './forms';
import auth from '../../auth';
import columns from './columns';
import { FOLIO_SUMMARY } from '../../api';
import { Page, DataTable, FormModal } from '../../components';
import { authLevel } from '../../utils';

import './folio-summary.css';

const FolioSummary = ({ user }) => {
  const { t } = useTranslation();

  const { data: payload, isValidating } = useSWR(FOLIO_SUMMARY.READ);

  const fields = columns(t);

  const handleClick = value => {
    const access = authLevel(user, 'folioManagement');

    FormModal({
      value,
      form: <Forms value={value} access={access} />,
      id: value?.closeout_nr,
      name: value?.closeout_name,
      t,
      width: '90vw'
    });
  };

  const createPDS = useCallback(() => {
    axios
      .post(FOLIO_SUMMARY.CREATE_PDS)
      .then(
        axios.spread(response => {
          notification.success({
            message: t('messages.PDSSuccessful'),
            description: t('descriptions.PDSSuccessful')
          });
        })
      )
      .catch(error => {
        notification.error({
          message: error.message,
          description: t('descriptions.PDSFailed')
        });
      });
  }, [t]);

  const closeFolio = useCallback(() => {
    axios
      .post(FOLIO_SUMMARY.MANUAL_CLOSE)
      .then(
        axios.spread(response => {
          notification.success({
            message: t('messages.closeFolioSuccess'),
            description: t('descriptions.closeFolioSuccess')
          });
        })
      )
      .catch(error => {
        notification.error({
          message: error.message,
          description: t('descriptions.closeFolioFailed')
        });
      });
  }, [t]);

  const modifiers = (
    <>
      <Button
        type="primary"
        icon="safety-certificate"
        onClick={() => closeFolio(null)}
        style={{ float: 'right', marginRight: 5 }}
      >
        {t('operations.closeFirstFolio')}
      </Button>

      <Button
        type="primary"
        icon="reconciliation"
        onClick={() => createPDS()}
        style={{ float: 'right', marginRight: 5 }}
      >
        {t('operations.createPDSFile')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.reports')} name={t('pageNames.folioSummary')} modifiers={modifiers}>
      <DataTable columns={fields} data={payload?.records} isLoading={isValidating} onClick={handleClick} />
    </Page>
  );
};

export default auth(FolioSummary);
