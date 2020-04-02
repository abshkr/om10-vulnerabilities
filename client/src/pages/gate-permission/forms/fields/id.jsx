import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { GATE_PERMISSION } from '../../../../api';

const Id = ({ form, value }) => {
  const { data } = useSWR(GATE_PERMISSION.READ);

  const { setFieldsValue } = form;

  const { t } = useTranslation();

  useEffect(() => {
    if (value) {
      setFieldsValue({
        prmssn_k: value.prmssn_k
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (!value) {
      const ids = _.uniq(_.map(data?.records, 'prmssn_k'));
      const next = ids.slice(-1).pop();
      const nextId = _.toNumber(next);

      setFieldsValue({
        prmssn_k: nextId + 1 || 1
      });
    }
  }, [value, setFieldsValue, data]);

  return (
    <Form.Item name="prmssn_k" label={t('fields.permissionId')} rules={[{ required: true }]}>
      <Input disabled={true} />
    </Form.Item>
  );
};

export default Id;
