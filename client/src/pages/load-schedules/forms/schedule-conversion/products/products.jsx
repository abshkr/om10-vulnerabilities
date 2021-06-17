import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { Form } from 'antd';
import api from 'api';
import _ from 'lodash';

import { DataTable } from '../../../../../components';
import columns from './columns';

import { LOAD_SCHEDULES } from '../../../../../api';

const Products = ({ value, form, products, units }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const fields = columns(t, form, units);

  return (
    <Form.Item name="products" noStyle>
      <DataTable
        data={products}
        columns={fields}
        parentHeight={products?.length > 0 ? `${products?.length * 25 + 90}px` : '135px'}
        minimal
      />
    </Form.Item>
  );
};

export default Products;
