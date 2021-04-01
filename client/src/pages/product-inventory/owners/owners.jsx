import React, { useState, useEffect } from 'react';

import {
  Card,
  Button,
  Drawer,
  Modal,
  Form,
  Tabs,
  Input,
  Select,
  notification,
  Row,
  Col,
  Descriptions,
} from 'antd';

import {
  EditOutlined,
  CloseOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import _ from 'lodash';

import { DataTable, Download } from '../../../components';
import api, { TANK_OWNERS } from '../../../api';
import columns from './columns';
import transform from './transform';

const { TabPane } = Tabs;

const ProductOwners = ({ value, access, config, unit, units }) => {
  const [volUnit, setVolUnit] = useState(unit);

  const url = value ? `${TANK_OWNERS.SUMMARY}?tank_base=${value?.base_code}` : null;

  const { data, isValidating } = useSWR(url);

  const isLoading = isValidating || !data;

  const payload = transform(data?.records, volUnit);

  const { t } = useTranslation();

  const [form] = Form.useForm();
  const percentPrecision = 4;

  const { resetFields, setFieldsValue, getFieldsValue } = form;

  const fields = columns(t);

  const modifiers = (
    <>
      <Download
        // data={data?.records}
        data={payload}
        isLoading={isLoading}
        columns={fields}
      />
    </>
  );

  return (
    <>
      <Card hoverable>
        <Row gutter={[2, 12]}>
          <Col span={24}>
            <Descriptions bordered size="small" layout="horizontal" style={{ marginTop: 0 }}>
              <Descriptions.Item label={t('fields.baseProduct')} span={24}>
                {value?.base_code + ' - ' + value?.base_name}
              </Descriptions.Item>
              <Descriptions.Item label={t('fields.volumeUnit')} span={24}>
                <Select
                  dropdownMatchSelectWidth={false}
                  key="1"
                  style={{ width: '100%' }}
                  defaultValue={unit}
                  onChange={setVolUnit}
                >
                  {units.map((item) => {
                    return (
                      <Select.Option key={item.code} value={item.code}>
                        {item.title}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>

        <Row gutter={[12, 12]}>
          <Col span={24}>
            <div style={{ float: 'right' }}>{modifiers}</div>
          </Col>
        </Row>

        <Row gutter={[12, 12]}>
          <Col span={24}>
            <DataTable
              minimal={true}
              columns={fields}
              // data={data?.records}
              data={payload}
              // parentHeight="272px"
              // onClick={(payload) => handleFormState(true, payload)}
              // handleSelect={(payload) => handleFormState(true, payload[0])}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ProductOwners;
