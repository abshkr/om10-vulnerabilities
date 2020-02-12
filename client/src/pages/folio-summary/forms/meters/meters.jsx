import React, { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Modal, Button, notification } from 'antd';
import { useTranslation } from 'react-i18next';

import { FOLIO_SUMMARY } from '../../../../api';
import { DataTable } from '../../../../components';

import columns from './columns';

const Meters = ({ id, enabled, access }) => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);

  const { data: payload, isValidating, revalidate } = useSWR(`${FOLIO_SUMMARY.METERS}?closeout_nr=${id}`, {
    revalidateOnFocus: false
  });

  const fields = columns(t);

  const update = () => {
    Modal.confirm({
      title: t('prompts.update'),
      okText: t('operations.yes'),
      okType: 'primary',
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(FOLIO_SUMMARY.UPDATE_METERS, data)
          .then(response => {
            revalidate();

            notification.success({
              message: t('messages.updateSuccess'),
              description: t('descriptions.updateSuccess')
            });
          })
          .catch(error => {
            notification.error({
              message: error.message,
              description: t('descriptions.updateFailed')
            });
          });
      }
    });
  };

  const onEditingFinished = values => {
    const changed = [];

    values.api.forEachNode(node => changed.push(node.data));

    setData(changed);
  };

  return (
    <div>
      <DataTable
        columns={fields}
        data={payload?.records}
        isLoading={isValidating}
        height="40vh"
        onEditingFinished={onEditingFinished}
      />
      <div className="operations">
        <Button shape="round" icon="close" style={{ float: 'right' }} onClick={() => Modal.destroyAll()}>
          {t('operations.cancel')}
        </Button>

        <Button
          shape="round"
          type="primary"
          icon="edit"
          style={{ float: 'right', marginRight: 5 }}
          onClick={update}
          disabled={!enabled || !access.canUpdate}
        >
          {t('operations.update')}
        </Button>
      </div>
    </div>
  );
};

export default Meters;
