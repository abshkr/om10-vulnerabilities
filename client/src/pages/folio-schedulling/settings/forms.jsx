import React, { useEffect, useState } from 'react';

import { SafetyCertificateOutlined, QuestionCircleOutlined, CodeOutlined, SaveOutlined } from '@ant-design/icons';
import { Form, Button, Tabs, Modal, notification, Row, Input, Col, Divider, DatePicker, TimePicker } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

import { FOLIO_SCHEDULING } from '../../../api';

const TabPane = Tabs.TabPane;

const Settings = ({ value, access }) => {
  const { data: payload } = useSWR(FOLIO_SCHEDULING.SETTINGS);
  
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { setFieldsValue } = form;
  
  let newSettings = [];
  // const [newSettings, setNewSettings] = useState([]);
  
  const onComplete = () => {
    newSettings = [];
  };

  const onFinish = async () => {
    Modal.confirm({
      title: t('prompts.update'),
      okText: t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(FOLIO_SCHEDULING.UPDATE_SETTINGS, newSettings)
          .then(() => {
            onComplete();

            notification.success({
              message: t('messages.updateSuccess'),
              description: t('messages.updateSuccess'),
            });
          })
          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  const freezeCloseout = async () => {
    Modal.confirm({
      title: t('prompts.freezeCloseout'),
      okText: t('operations.yes'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(FOLIO_SCHEDULING.FREEZE_CLOSEOUT)
          .then(() => {
            onComplete();

            notification.success({
              message: t('messages.submitSuccess'),
              description: t('messages.submitSuccess'),
            });
          })
          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  const closeCloseout = async () => {
    Modal.confirm({
      title: t('prompts.closeCloseout'),
      okText: t('operations.yes'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(FOLIO_SCHEDULING.FREEZE_CLOSEOUT)
          .then(() => {
            onComplete();

            notification.success({
              message: t('messages.submitSuccess'),
              description: t('messages.submitSuccess'),
            });
          })
          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  const setFields = (data) => {
    if (!data || data.length <= 0) {
      return;
    }
    
    setFieldsValue({
      last_closeout_time: (_.filter(data, function(item) {
        return item.param_key === 'LAST_DAILY_REPORT_DATE'}))[0].param_value,
    });
    setFieldsValue({
      last_weekly_closeout_time: (_.filter(data, function(item) {
        return item.param_key === 'LAST_WEEKLY_REPORT_DATE'}))[0].param_value,
    });
    setFieldsValue({
      last_monthly_closeout_time: (_.filter(data, function(item) {
        return item.param_key === 'LAST_MONTHLY_REPORT_DATE'}))[0].param_value,
    });

    const nextDailyDate = moment((_.filter(data, function(item) {
      return item.param_key === 'NEXT_DAILY_REPORT_DATE'}))[0].param_value, 'YYYY-MM-DD HH:mm:ss')
    setFieldsValue({
      next_closeout_date: nextDailyDate.format("YYYY-MM-DD"),
    });
    setFieldsValue({
      next_closeout_time: nextDailyDate,
    });

    const nextWeeklyDate = moment((_.filter(data, function(item) {
      return item.param_key === 'NEXT_WEEKLY_REPORT_DATE'}))[0].param_value, 'YYYY-MM-DD HH:mm:ss')
    setFieldsValue({
      next_weekly_date: nextWeeklyDate,
    });

    const nextMonthlyDate = moment((_.filter(data, function(item) {
      return item.param_key === 'NEXT_MONTHLY_REPORT_DATE'}))[0].param_value, 'YYYY-MM-DD HH:mm:ss')
    setFieldsValue({
      next_monthly_date: nextMonthlyDate,
    });

    const operateDate = moment((_.filter(data, function(item) {
      return item.param_key === 'OP_DAY_MNTH_YEAR'}))[0].param_value, 'YYYY-MM-DD HH:mm:ss')
    setFieldsValue({
      operating_date: operateDate,
    });
    // setFieldsValue({
    //   last_closeout_time: "hello, world"
    // });
  }

  // setFields(payload?.records)

  const closeoutTimeChange = (value) => {
    if (_.find(newSettings, function(item) {
      return item.param_key === 'NEXT_REPORT_TIME'})) {
      let datePart = _.filter(newSettings, function(item) {
        return item.param_key === 'NEXT_REPORT_TIME'})[0].substring(0, 11);
        _.filter(newSettings, function(item) {
          return item.param_key === 'NEXT_REPORT_TIME'})[0].param_value = datePart + value.format("HH:mm:00")
    } else {
      let datePart = _.filter(payload?.records, function(item) {
        return item.param_key === 'NEXT_REPORT_TIME'})[0].param_value.substring(0, 11);
      newSettings.push({
        param_key: "NEXT_REPORT_TIME",
        param_value: datePart + value.format("HH:mm:00")
      })
    }
  }

  const nextWeeklyDateChange = value => {
    if (_.find(newSettings, function(item) {
      return item.param_key === 'NEXT_WEEKLY_REPORT_DATE'})) {
      let timePart = _.filter(newSettings, function(item) {
        return item.param_key === 'NEXT_WEEKLY_REPORT_DATE'})[0].param_value.substring(10);
        _.filter(newSettings, function(item) {
          return item.param_key === 'NEXT_WEEKLY_REPORT_DATE'})[0].param_value = value.format("YYYY-MM-DD") + timePart
    } else {
      let timePart = _.filter(payload?.records, function(item) {
        return item.param_key === 'NEXT_REPORT_TIME'})[0].param_value.substring(10);
      newSettings.push({
        param_key: "NEXT_WEEKLY_REPORT_DATE",
        param_value: value.format("YYYY-MM-DD") + timePart
      })
    }
  };

  const nextMonthlyDateChange = value => {
    if (_.find(newSettings, function(item) {
      return item.param_key === 'NEXT_MONTHLY_REPORT_DATE'})) {
      let timePart = _.filter(newSettings, function(item) {
        return item.param_key === 'NEXT_MONTHLY_REPORT_DATE'})[0].param_value.substring(10);
        _.filter(newSettings, function(item) {
          return item.param_key === 'NEXT_MONTHLY_REPORT_DATE'})[0].param_value = value.format("YYYY-MM-DD") + timePart
    } else {
      let timePart = _.filter(payload?.records, function(item) {
        return item.param_key === 'NEXT_REPORT_TIME'})[0].param_value.substring(10);
      newSettings.push({
        param_key: "NEXT_MONTHLY_REPORT_DATE",
        param_value: value.format("YYYY-MM-DD") + timePart
      })
    }
  };

  const operatingDateChange = value => {
    if (_.find(newSettings, function(item) {
      return item.param_key === 'OP_DAY_MNTH_YEAR'})) {
      let timePart = _.filter(newSettings, function(item) {
        return item.param_key === 'OP_DAY_MNTH_YEAR'})[0].param_value.substring(10);
        _.filter(newSettings, function(item) {
          return item.param_key === 'OP_DAY_MNTH_YEAR'})[0].param_value = value.format("YYYY-MM-DD") + timePart
    } else {
      let timePart = _.filter(payload?.records, function(item) {
        return item.param_key === 'NEXT_REPORT_TIME'})[0].param_value.substring(10);
      newSettings.push({
        param_key: "OP_DAY_MNTH_YEAR",
        param_value: value.format("YYYY-MM-DD") + timePart
      })
    }
  };

  useEffect(() => {
    setFields(payload?.records)
  })

  const layout = {
    labelCol: {
      span: 8,
    },
  };

  return (
    <Form 
      {...layout}
      form={form} 
      scrollToFirstError
    >
      <Row ><Col span={24}>
        <Divider></Divider>
      </Col></Row>

      <Row ><Col span={12}>
        <Form.Item label={t('fields.lastCloseoutDate')} name="last_closeout_time">
          <Input disabled style={{ width: 200, textAlign: 'center' }} />
        </Form.Item>
      </Col></Row>
        
      <Row ><Col span={12}>
        <Form.Item label={t('fields.lastWeeklyReportDate')} name="last_weekly_closeout_time">
          <Input disabled style={{ width: 200, textAlign: 'center' }} />
        </Form.Item>
      </Col></Row>

      <Row >
        <Col span={12}>
          <Form.Item label={t('fields.lastMonthlyReportDate')} name="last_monthly_closeout_time">
            <Input disabled style={{ width: 200, textAlign: 'center' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row >
        <Col span={12}>
          <Form.Item label={t('fields.nextPlannedCloseout')} name="next_closeout_date">
            <Input disabled style={{ width: 200, textAlign: 'center' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="start">
        <Col span={12}/>
        <Col span={12} style={{textAlign: 'center',}} >
          <Button 
          type="primary" 
          disabled 
          icon={<CodeOutlined />} 
        >
            {t("operations.runAndOverride")}
          </Button>
        </Col>
      </Row>

      <Row >
        <Col span={24}>
          <Divider></Divider>
        </Col>
      </Row>
        
      <Row justify="start">
        <Col span={12}> 
          <Form.Item label={t('fields.dailyReportTime')} name="next_closeout_time">
            <TimePicker format="HH:mm" onChange={closeoutTimeChange}></TimePicker>
          </Form.Item>
        </Col>
        <Col span={8}>
        <div>Last modified on:  {payload === undefined ? "" : _.filter(payload?.records, function(item) {
          return item.param_key === 'NEXT_REPORT_TIME'})[0].last_chg_time }</div>
        </Col>
      </Row>

      <Row justify="start">
        <Col span={12}> 
          <Form.Item label={t('fields.nextWeeklyDate')} name="next_weekly_date">
            <DatePicker onChange={nextWeeklyDateChange}/>
          </Form.Item>
        </Col>
        <Col span={8}>
        <div>Last modified on:  {payload === undefined ? "" : _.filter(payload?.records, function(item) {
          return item.param_key === 'NEXT_WEEKLY_REPORT_DATE'})[0].last_chg_time }</div>
        </Col>
      </Row>

      <Row justify="start">
        <Col span={12}> 
          <Form.Item label={t('fields.nextMonthlyDate')} name="next_monthly_date">
            <DatePicker onChange={nextMonthlyDateChange}/>
          </Form.Item>
        </Col>
        <Col span={8}>
          <div>Last modified on:  {payload === undefined ? "" : _.filter(payload?.records, function(item) {
            return item.param_key === 'NEXT_MONTHLY_REPORT_DATE'})[0].last_chg_time }</div>
        </Col>
      </Row>

      <Row justify="start">
        <Col span={12}> 
          <Form.Item label={t('fields.closeoutOperatingDate')} name="operating_date">
            <DatePicker onChange={operatingDateChange}/>
          </Form.Item>
        </Col>
        <Col span={8}>
          <div>Last modified on:  {payload === undefined ? "" : _.filter(payload?.records, function(item) {
            return item.param_key === 'OP_DAY_MNTH_YEAR'})[0].last_chg_time }</div>
        </Col>
      </Row>

      <Row justify="start">
        <Col span={12}/>
        <Col span={12} style={{textAlign: 'center',}} >
          <Button type="primary" onClick={() => setFields(payload?.records)}>
            {t("operations.reset")}
          </Button>
          <Button type="primary" 
            icon={<SaveOutlined />} 
            style={{margin: '0 8px',}} 
            onClick={onFinish} 
            disabled={!access?.canUpdate}
          >
            {t("operations.save")}
          </Button>
        </Col>
      </Row>

      <Row >
        <Col span={24}>
          <Divider></Divider>
        </Col>
      </Row>

      <Row>
        <Col span={12}/>
        <Col
          span={12}
          style={{
            textAlign: 'center',
          }}
        >
          <Button type="primary" 
            icon={<SafetyCertificateOutlined />} 
            style={{ float: 'right', marginRight: 5 }}
            onClick={freezeCloseout}
            disabled={!access?.canUpdate}
          >
            {t("operations.freezeCloseout")}
          </Button>
          <Button type="primary" 
            icon={<SafetyCertificateOutlined />} 
            style={{ float: 'right', marginRight: 5 }}
            onClick={closeCloseout}
            disabled={!access?.canUpdate}
          >
            {t("operations.closeCloseout")}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Settings;
