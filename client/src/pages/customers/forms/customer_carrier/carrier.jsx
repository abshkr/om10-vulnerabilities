import React, { useState } from 'react';

import useSWR from 'swr';
import { Form, Button, Modal, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { CUSTOMERS } from 'api';
import { DataTable } from 'components';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

const columns = (t) => [
  {
    headerName: "",
    field: 'selected',
    suppressSizeToFit: true, 
    checkboxSelection: true,
    headerCheckboxSelection: true,
    width: 40,
  },
  {
    headerName: t('fields.carrierCode'),
    field: 'cmpy_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 130,
  },
  {
    headerName: t('fields.carrier'),
    field: 'cmpy_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    // width: 220,
  },
];

const Carrier = ({ supplier, addCarrierCallBack }) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState([]);
  
  const { data: payload } = useSWR(`${CUSTOMERS.CARRIERS}`);

  const onFinish = (values) => {
    addCarrierCallBack(selected);
    Modal.destroyAll();
  }

  const handleSelect = (v) => {
    setSelected(v);
  }

  return (
    <Form
      onFinish={onFinish}
    >
      <div style={{marginBottom: 15}}></div>
      <Form.Item name="partners" noStyle >
        <DataTable
          data={payload?.records}
          height="40vh"
          minimal
          columns={columns(t)}
          handleSelect={handleSelect}
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="button"
          icon={<CloseOutlined />}
          style={{ float: 'right', marginTop: 10 }}
          onClick={() => Modal.destroyAll()}
        >
          {t('operations.cancel')}
        </Button>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          htmlType="submit"
          style={{ float: 'right', marginRight: 5, marginTop: 10 }}
        >
          {t('operations.add')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Carrier;
