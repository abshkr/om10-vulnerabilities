import React, { useState, useCallback } from 'react';
import useSWR from 'swr';
import { RedoOutlined, CloseOutlined } from '@ant-design/icons';

import { Modal, Button, Table, message } from 'antd';
import { useTranslation } from 'react-i18next';
import api, { FOLIO_SUMMARY } from '../../../../api';
import generator from './generator';
import columns from './columns';

const Reports = ({ id, enabled }) => {
  const { t } = useTranslation();

  const [isRegenerating, setRegenerate] = useState(false);

  const { data } = useSWR(`${FOLIO_SUMMARY.REPORTS}?closeout_nr=${id}`);

  const regenerate = useCallback(() => {
    setRegenerate(true);

    message.loading({ content: t('messages.regenerating'), id });

    api.post(`${FOLIO_SUMMARY.CREATE_REPORTS}?closeout_nr=${id}`).then((response) => {
      message.success({ content: t('messages.regeneratingComplete'), id });
      setRegenerate(false);
    });
  }, [id, t]);

  const payload = generator(id, data?.records);
  const fields = columns(t);

  return (
    <div>
      <Table
        size="small"
        dataSource={payload}
        columns={fields}
        scroll={{ y: '30vw' }}
        pagination={{ pageSize: 50 }}
      />

      <div className="operations">
        <Button icon={<CloseOutlined />} style={{ float: 'right' }} onClick={() => Modal.destroyAll()}>
          {t('operations.cancel')}
        </Button>

        <Button
          type="primary"
          icon={<RedoOutlined />}
          style={{ float: 'right', marginRight: 5 }}
          loading={isRegenerating}
          disabled={!enabled}
          onClick={() => regenerate()}
        >
          {t('operations.regenerate')}
        </Button>
      </div>
    </div>
  );
};

export default Reports;
