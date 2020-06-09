import React, { useEffect } from 'react';

import useSWR from 'swr';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { PARTNERSHIP } from '../../../../api';
import { DataTable } from '../../../../components';
import columns from './columns';

const Partner = ({ form, value, company, setSelected }) => {
  const { t } = useTranslation();

  const { data: partners, isValidating, revalidate } = useSWR(`${PARTNERSHIP.PARTNERS}?supplier=${company}`);
  const { setFieldsValue } = form;

  const validate = (rule, value) => {
    if (value === '' || !value) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.partner')}`);
    }

    return Promise.resolve();
  };

  const handleSelect = (v) => {
    setSelected(v);
  }

  return (
    <>
      <Form.Item name="partners" noStyle >
        <DataTable
          data={company ? partners?.records : []}
          height="78vh"
          minimal
          columns={columns(t)}
          handleSelect={handleSelect}
        />
      </Form.Item>
    </>
  );
};

export default Partner;
