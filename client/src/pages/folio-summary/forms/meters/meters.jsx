import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Modal, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import api, { FOLIO_SUMMARY } from '../../../../api';
import { DataTable } from '../../../../components';

import generator from './generator';
import columns from './columns';

const Meters = ({ id, enabled, meterTrigger, saveToMetersTrigger }) => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);

  const { data: payload, isValidating, revalidate } = useSWR(`${FOLIO_SUMMARY.METERS}?closeout_nr=${id}`, {
    revalidateOnFocus: false,
  });

  const fields = columns(t, enabled);

  const saveToFolio = () => {
    Modal.confirm({
      title: t('prompts.save'),
      okText: t('operations.yes'),
      okType: 'primary',
      cancelText: t('operations.no'),
      centered: true,
      content: t('descriptions.saveToMtrFolioWarning'),
      onOk: async () => {
        await api
          .post(FOLIO_SUMMARY.UPDATE_METERS, data)
          .then((response) => {
            revalidate();

            notification.success({
              message: t('messages.updateSuccess'),
              description: t('descriptions.updateSuccess'),
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
      },
    });
  };

  const saveToMeters = () => {
    Modal.confirm({
      title: t('prompts.save'),
      okText: t('operations.yes'),
      okType: 'primary',
      cancelText: t('operations.no'),
      centered: true,
      content: t('descriptions.saveToTanksWarning'),
      onOk: async () => {
        await api
          .post(FOLIO_SUMMARY.SAVE_TO_METERS, {
            folio_meters: data,
          })
          .then((response) => {
            notification.success({
              message: t('messages.saveSuccess'),
              description: t('descriptions.saveSuccess'),
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
      },
    });
  };

  const onEditingFinished = (values) => {
    const changed = [];

    values.api.forEachNode((node) => changed.push(node.data));

    setData(changed);
  };

  useEffect(() => {
    if (meterTrigger > 0) {
      saveToFolio();
    }
  }, [meterTrigger]);

  useEffect(() => {
    if (saveToMetersTrigger > 0) {
      saveToMeters();
    }
  }, [saveToMetersTrigger]);

  useEffect(() => {
    if (payload) {
      const values = generator(payload.records);
      setData(values);
    }
  }, [payload]);

  return (
    <div>
      <DataTable
        columns={fields}
        data={data}
        isLoading={isValidating}
        height="25vh"
        onEditingFinished={onEditingFinished}
        autoColWidth
      />
    </div>
  );
};

export default Meters;
