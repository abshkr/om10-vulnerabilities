import React, { useState, useEffect } from 'react';

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
  const [reports, setReports] = useState(null);
  const [usefolioRange, setUseFolio] = useState(false);
  const [closeouts, setCloseouts] = useState([]);
  const [fromDatePicker, setFromDatePicker] = useState(true);

  const [start, setStart] = useState(moment().subtract(15, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  const [end, setEnd] = useState(moment().format(SETTINGS.DATE_TIME_FORMAT));

  const { data: suppliers, isValidating: suppliersLoading } = useSWR(ON_DEMAND_REPORTS.SUPPLIERS);

  const onRetrieveCloseouts = () => {
    api
      .get(`${ON_DEMAND_REPORTS.CLOSE_OUTS}?start_date=${start}&end_date=${end}`)
      .then((response) => {
        const payload = response.data?.records || [];
        setCloseouts(payload);
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
      });
  }

  const onSupplier = (value) => {
    setSupplier(value);
    api.get(ON_DEMAND_REPORTS.REPORTS, {
      params: {
        cmpy_code: value,
      },
    })
    .then((res) => {
      setReports(res.data.records);
    });
  };

  const onReport = (value) => {
    const find = _.find(reports, (item) => {
      return item.rpt_file === value;
    });

    setUseFolio(find?.folio_number_parameters);
  }

  const onFinish = (values) => {
    let payload = null;
    if (usefolioRange) {
      payload = {
        ...values,
        start_date: values.close_out_from,
        end_date: values.close_out_to,
      };
    } else {
      payload = {
        ...values,
        start_date: start,
        end_date: end,
      };
    }
    
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
    setFromDatePicker(true);
    setStart(start);
    setEnd(end);
  };

  const onCloseOutSelect = (list) => {
    form.setFieldsValue({
      close_out_from: list[list.length - 1]?.closeout_nr,
      close_out_to: list[0]?.closeout_nr,
    });

    setFromDatePicker(false);

    setStart(list[list.length - 1]?.start_date);
    setEnd(list[0]?.end_date);
  };

  const isLoading = suppliersLoading || loading;
  const fields = columns(t);

  useEffect(() => {
    if ((start || end) && fromDatePicker) {
      onRetrieveCloseouts();
    }
  }, [start, end]);

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
            // dropdownMatchSelectWidth={false}
            loading={isLoading}
            showSearch
            onChange={onReport}
            disabled={!supplier}
            style={{ width: '100%', marginBottom: 10, marginTop: 10 }}
            optionFilterProp="children"
            placeholder={t('placeholder.selectReport')}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {reports?.map((item, index) => (
              <Select.Option key={index} value={item.rpt_file}>
                {item.ondemand_title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="dateRange"
          label={t('fields.dateRange')}
          // rules={!usefolioRange && [{ required: true }]}
        > 
          <Calendar handleChange={onRangeSelect} start={start} end={end} />
        </Form.Item>

        <Form.Item label={t('fields.closeOutDetails')}>
          <DataTable
            columns={fields}
            data={closeouts}
            isLoading={false}
            height="70vh"
            minimal
            // extra={extra}
            handleSelect={onCloseOutSelect}
          />
        </Form.Item>

        {usefolioRange && 
          <Form.Item noStyle>
            <Form.Item 
              name="close_out_from" 
              label={t('fields.fromCloseOutId')}
              style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              rules={usefolioRange && [{ required: true, message: `${t('validate.select')} ─ ${t('fields.fromCloseOutId')}` }]}
            >
              <InputNumber min={0} placeholder={t('fields.fromCloseOutId')} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="close_out_to"
              label={t('fields.toCloseOutId')}
              style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
              rules={usefolioRange && [{ required: true, message: `${t('validate.select')} ─ ${t('fields.toCloseOutId')}` }]}
            >
              <InputNumber min={0} placeholder={t('fields.toCloseOutId')} style={{ width: '100%' }} />
            </Form.Item>
          </Form.Item>
        }

        <Form.Item
          name="output"
          label={t('fields.reportOutput')}
          style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Radio.Group buttonStyle="solid" style={{ marginTop: 10, marginBottom: 10 }}>
            <Radio.Button value="csv">CSV</Radio.Button>
            <Radio.Button value="xlsx">Excel</Radio.Button>
            <Radio.Button value="pdf">PDF</Radio.Button>
            <Radio.Button value="docx">Word</Radio.Button>
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
