import React, { useState } from 'react';
import useSWR from 'swr';
import { Modal, Button, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import _ from 'lodash';

import api, { FOLIO_SUMMARY } from '../../../../api';
import { DataTable } from '../../../../components';

import columns from './columns';

const Meters = ({ id, enabled, access, handleFormState }) => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);

  const { data: payload, isValidating, revalidate } = useSWR(`${FOLIO_SUMMARY.METERS}?closeout_nr=${id}`, {
    revalidateOnFocus: false,
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

  const onEditingFinished = (values) => {
    const changed = [];

    values.api.forEachNode((node) => changed.push(node.data));

    setData(changed);
  };

  return (
    <div>
      <DataTable
        columns={fields}
        data={payload?.records}
        isLoading={isValidating}
        height="25vh"
        onEditingFinished={onEditingFinished}
        autoColWidth
      />
      <div className="operations">
        <Button icon={<CloseOutlined />} style={{ float: 'right' }} onClick={() => handleFormState(false, null)}>
          {t('operations.cancel')}
        </Button>

        <Button
          type="primary"
          icon={<EditOutlined />}
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
