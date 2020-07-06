import React, { useEffect, useState } from 'react';

import useSWR from 'swr';
import { Form, Button, Modal, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { PARTNERSHIP } from '../../../../api';
import { DataTable } from '../../../../components';
import columns from './columns';
import { EditOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';

const Partner = ({ existings, company, addPartnershipCallBack }) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);

  const { data: payload, isValidating, revalidate } = useSWR(`${PARTNERSHIP.PARTNERS}?supplier=${company}`);
  
  const onFinish = (values) => {
    addPartnershipCallBack(selected);
    Modal.destroyAll();
  }

  const handleSelect = (v) => {
    setSelected(v);
  }

  useEffect(() => {
    if (payload?.records) {
      setData(_.filter(payload?.records, (item) => {
        for (let i = 0; i < existings.length; i += 1) {
          if (item.partner_seq === existings[i].partner_seq) {
            return false;
          }
        }
        return true;
      }));
    }
  }, [payload?.records, existings]);

  return (
    <Form
      onFinish={onFinish}
    >
      <Form.Item name="partners" noStyle >
        <DataTable
          data={data}
          height="40vh"
          minimal
          columns={columns(t)}
          handleSelect={handleSelect}
        />
      </Form.Item>

      {/* <Space style={{ marginTop: 10 }}> */}
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
      {/* </Space> */}
    </Form>
  );
};

export default Partner;
