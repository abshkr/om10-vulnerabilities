import React, { useEffect } from 'react';

import { Form, Button, Radio, Modal, Row, Col, InputNumber, Input, Checkbox } from 'antd';
import { EditOutlined, QuestionCircleOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { ON_DEMAND_REPORTS } from 'api';
import Carrier from './carrier';
import Supplier from './suppliers';
import Customer from './customer';

const CloseoutJobForm = ({value, rpt_file, update}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { setFieldsValue } = form;

  const IS_CREATING = !value;

  const { data: payload, isValidating, revalidate } = useSWR(rpt_file ? 
    `${ON_DEMAND_REPORTS.FILTERS}?rpt_file=${rpt_file}` : 
    null);

  let param_seq = 0;
  const carrier = payload?.records? payload?.records.map((item, seq) => {
    if (item.includes("START") || item.includes("END")) {
      return <div key={item}></div>;
    } else if (item === "CMPY_CODE" || item.includes("SUPP") || item.includes("DRAWER")) {
      param_seq += 1;
      const param = "param" + param_seq.toString();
      return (<Col span={24} key={item}>
        <Supplier form={form} param={param} />
      </Col>)
    } else if (item.includes("CARR_CODE")) {
      param_seq += 1;
      const param = "param" + param_seq.toString();
      return (<Col span={24} key={item}>
        <Carrier form={form} param={param} />
      </Col>)
    } else if (item.includes("CUST_CODE")) {
      param_seq += 1;
      const param = "param" + param_seq.toString();
      return (<Col span={24} key={item}>
        <Customer form={form} param={param} />
      </Col>)
    } 
  }) : null;
  
  const onFinish = values => {
    values.to_create = IS_CREATING
    values.output_format = 0
    if (values.format_array.includes("pdf")) {
      values.output_format |= 1;
    }
    if (values.format_array.includes("csv")) {
      values.output_format |= 2;
    }
    if (values.format_array.includes("xlsx")) {
      values.output_format |= 4;
    }
    if (values.format_array.includes("docx")) {
      values.output_format |= 8;
    }
    if (values.format_array.includes("html")) {
      values.output_format |= 16;
    }
    values.job_lastrun = values.job_lastrun ? values.job_lastrun : "";
    update(values)
    Modal.destroyAll();
  }

  const plainOptions = ['pdf', 'csv', 'xlsx', 'docx', 'html'];
  
  const itemLayout = {
    labelCol: { span: 6 },
    labelAlign: 'left',
    // marginRight: 10
    // wrapperCol: { span: 16 },
  };

  useEffect(() => {
    if (value) {
      const format_array = [];
      if (value.output_format & 1) {
        format_array.push("pdf");
      }
      if (value.output_format & 2) {
        format_array.push("csv");
      }
      if (value.output_format & 4) {
        format_array.push("xlsx");
      }
      if (value.output_format & 8) {
        format_array.push("docx");
      }
      if (value.output_format & 16) {
        format_array.push("html");
      }
      setFieldsValue({
        job_id: value.job_id,
        job_name: value.job_name,
        recurrence: value.recurrence,
        email_subject: value.email_subject,
        email_receivers: value.email_receivers,
        job_enabled: value.job_enabled,
        param1: value.param1,
        param2: value.param2,
        param3: value.param3,
        param4: value.param4,
        param5: value.param5,
        param6: value.param6,
        format_array: format_array,
      })
    }
  }, [value]);

  return (
    <Form form={form} onFinish={onFinish} scrollToFirstError>
      {/* <Divider orientation="left">{t('fields.schedule')}</Divider> */}
      <Row gutter={[8, 8]}>
        { !IS_CREATING && 
          <Col span={24}>
            <Form.Item
              name="job_id"
              label={t('fields.jobID')}
              rules={[{ required: true }]}
              style={{marginTop: 10}}
              {...itemLayout}
            >
              <InputNumber disabled={true}></InputNumber>
            </Form.Item>
          </Col>
        }
        
        <Col span={24}>
          <Form.Item
            name="job_name"
            label={t('fields.jobName')}
            rules={[{ required: true }]}
            {...itemLayout}
          >
            <Input disabled={!IS_CREATING}></Input>
          </Form.Item>
        </Col>
        {carrier}
        <Col span={24}>
          <Form.Item
            name="recurrence"
            label={t('fields.type')}
            rules={[{ required: true }]}
            {...itemLayout}
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value={'D'}>Daily</Radio.Button>
              <Radio.Button value={'W'}>Weekly</Radio.Button>
              <Radio.Button value={'M'}>Monthly</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="format_array"
            label={t('fields.reportOutput')}
            rules={[{ required: true }]}
            {...itemLayout}
          >
            <Checkbox.Group style={{display: 'inline-block'}} options={plainOptions} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="job_enabled"
            label={t('fields.reportEnabled')}
            valuePropName="checked"
            {...itemLayout}
          >
            <Checkbox />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="email_receivers"
            label={t('fields.email')}
            rules={[{ required: true }]}
            {...itemLayout}
          >
            <Input ></Input>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="email_subject"
            label={t('fields.subject')}
            {...itemLayout}
          >
            <Input ></Input>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => Modal.destroyAll()}
            >
            {t('operations.cancel')}
          </Button>

          <Button
            type="primary"
            icon={<EditOutlined />}
            htmlType="submit"
            style={{ float: 'right', marginRight: 5 }}
            >
              {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>
      </Form.Item>
    </Form>
  );
};

export default CloseoutJobForm