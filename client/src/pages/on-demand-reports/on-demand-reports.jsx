import React, { useState } from 'react';

import useSWR from 'swr';
import { ReloadOutlined } from '@ant-design/icons';
import { Button, Select, Radio, Form, InputNumber, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import _ from 'lodash';

import { useAuth } from '../../hooks';
import { Page, DataTable, Calendar } from '../../components';
import api, { ON_DEMAND_REPORTS } from '../../api';
import { SETTINGS } from '../../constants';
import columns from './columns';
import auth from '../../auth';

const OnDemandReports = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const access = useAuth('M_JASPERREPORTS');

  const [loading, setLoading] = useState(false);
  const [supplier, setSupplier] = useState(null);

  const [start, setStart] = useState(moment().subtract(15, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  const [end, setEnd] = useState(moment().format(SETTINGS.DATE_TIME_FORMAT));

  const { data: suppliers, isValidating: suppliersLoading } = useSWR(ON_DEMAND_REPORTS.SUPPLIERS);

  const { data: reports, isValidating: reportsLoading } = useSWR(
    `${ON_DEMAND_REPORTS.REPORTS}?cmpy_code=${supplier}`
  );

  const { data: closeouts, isValidating: closeOutsLoading } = useSWR(
    `${ON_DEMAND_REPORTS.CLOSE_OUTS}?start_date=${start}&end_date=${end}`
  );

  const onSupplier = (value) => {
    setSupplier(value);
  };

  const onFinish = (values) => {
    const payload = {
      ...values,
      start_date: start,
      end_date: end,
    };

    setLoading(true);

    api
      .post(ON_DEMAND_REPORTS.CREATE, payload)
      .then((response) => {
        setLoading(false);
        const file = response?.data?.filepath;

        window.open(file, '_blank');

        notification.success({
          message: t('messages.reportGenerationSuccessful'),
          description: t('descriptions.reportGenerationSuccessful'),
        });
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
        setLoading(false);
      });
  };

  const onRangeSelect = (start, end) => {
    setStart(start);
    setEnd(end);
  };

  const onCloseOutSelect = (list) => {
    form.setFieldsValue({
      close_out_from: list[list.length - 1]?.closeout_nr,
      close_out_to: list[0]?.closeout_nr,

      start_date: list[list.length - 1]?.start_date,
      end_date: list[0]?.end_date,
    });
  };

  const isLoading = suppliersLoading || reportsLoading || closeOutsLoading || loading;
  const fields = columns(t);

  const extra = <Calendar handleChange={onRangeSelect} start={start} end={end} />;

  return (
    <Page page={t('pageMenu.reports')} name={t('pageNames.onDemandReports')} access={access}>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        scrollToFirstError
        initialValues={{ output: 'csv' }}
      >
        <Form.Item
          name="supplier"
          label={t('fields.supplier')}
          rules={[{ required: true, message: `${t('validate.select')} ─ ${t('fields.supplier')}` }]}
        >
          <Select
            dropdownMatchSelectWidth={false}
            loading={isLoading}
            showSearch
            style={{ width: '100%' }}
            onChange={onSupplier}
            optionFilterProp="children"
            placeholder={t('placeholder.selectSupplier')}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {suppliers?.records.map((item, index) => (
              <Select.Option key={index} value={item.cmpy_code}>
                {item.cmpy_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="report"
          label={t('fields.report')}
          rules={[{ required: true, message: `${t('validate.select')} ─ ${t('fields.report')}` }]}
        >
          <Select
            dropdownMatchSelectWidth={false}
            loading={isLoading}
            showSearch
            disabled={!supplier}
            style={{ width: '100%', marginBottom: 10, marginTop: 10 }}
            optionFilterProp="children"
            placeholder={t('placeholder.selectReport')}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {reports?.records.map((item, index) => (
              <Select.Option key={index} value={item.rpt_file}>
                {item.ondemand_title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label={t('fields.closeOutDetails')}>
          <DataTable
            columns={fields}
            data={closeouts?.records}
            isLoading={false}
            height="80vh"
            extra={extra}
            handleSelect={onCloseOutSelect}
          />
        </Form.Item>

        <Form.Item label={t('fields.closeOutRange')} style={{ width: '100%' }}>
          <Form.Item name="close_out_from" style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
            <InputNumber min={0} placeholder={t('fields.fromCloseOutId')} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="close_out_to"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
          >
            <InputNumber min={0} placeholder={t('fields.toCloseOutId')} style={{ width: '100%' }} />
          </Form.Item>
        </Form.Item>

        <Form.Item
          name="output"
          label={t('fields.reportOutput')}
          style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Radio.Group buttonStyle="solid" style={{ marginTop: 10, marginBottom: 10 }}>
            <Radio.Button value="csv">CSV</Radio.Button>
            <Radio.Button value="excel">Excel</Radio.Button>
            <Radio.Button value="pdf">PDF</Radio.Button>
            <Radio.Button value="word">Word</Radio.Button>
            <Radio.Button value="html">HTML</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item style={{ width: '100%' }}>
          <Button icon={<ReloadOutlined />} type="primary" htmlType="submit" block loading={isLoading}>
            {t('operations.generateReport')}
          </Button>
        </Form.Item>
      </Form>
    </Page>
  );
};

export default auth(OnDemandReports);
