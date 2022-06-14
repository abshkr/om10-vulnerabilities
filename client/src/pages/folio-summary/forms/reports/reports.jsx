import React, { useState, useCallback, useEffect } from 'react';
import useSWR from 'swr';

import { Table, message } from 'antd';
import { useTranslation } from 'react-i18next';
import api, { FOLIO_SUMMARY } from '../../../../api';
import generator from './generator';
import columns from './columns';

const Reports = ({ id, reportTrigger, setRegenerate }) => {
  const { t } = useTranslation();

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

  useEffect(() => {
    if (reportTrigger > 0) {
      regenerate();
    }
  }, [reportTrigger]);

  return (
    <div>
      <Table
        rowKey={'report'}
        size="small"
        dataSource={payload}
        columns={fields}
        // scroll={{ y: '120vh' }}
        pagination={{ showSizeChanger: true, defaultPageSize: 20 }}
      />
    </div>
  );
};

export default Reports;
