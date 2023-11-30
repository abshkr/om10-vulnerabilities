import React, { useState } from 'react';

import useSWR from 'swr';
import { Modal, Form, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { CloseOutlined, SyncOutlined } from '@ant-design/icons';

import { Page, DataTable, Download } from '../../components';
import { PARTNERSHIP } from '../../api';
import columns from './columns';

const Partnership = ({ value, onClose, modal }) => {
  const { t } = useTranslation();
  const url =
    value && value?.partner_cmpy_code && value?.partner_type
      ? `${PARTNERSHIP.FIND}?partner_cmpy_code=${value?.partner_cmpy_code}&partner_type=${value?.partner_type}`
      : `${PARTNERSHIP.FIND}`;
  const { data: payload, isValidating, mutate: revalidate } = useSWR(url);

  const fields = columns(t);
  const [form] = Form.useForm();
  const data = payload?.records;

  const [selected, setSelected] = useState(null);

  const onFinish = () => {
    modal.destroy();
    onClose(selected?.partner_code);
  };

  const handleSelect = (value) => {
    setSelected(value);
    // onClose(value?.partner_code);
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError style={{ marginTop: '1rem' }}>
      <DataTable
        minimal={true}
        columns={fields}
        data={data}
        isLoading={isValidating}
        onClick={(payload) => handleSelect(payload)}
        handleSelect={(payload) => handleSelect(payload[0])}
      />

      <div style={{ marginTop: '2rem' }}>
        <Button
          htmlType="button"
          icon={<CloseOutlined />}
          style={{ float: 'right' }}
          onClick={() => modal.destroy()}
        >
          {t('operations.cancel')}
        </Button>

        <Button
          type="primary"
          htmlType="submit"
          icon={<SyncOutlined />}
          style={{ float: 'right', marginRight: 5 }}
        >
          {t('operations.ok')}
        </Button>
      </div>
    </Form>
  );
};

export default Partnership;
