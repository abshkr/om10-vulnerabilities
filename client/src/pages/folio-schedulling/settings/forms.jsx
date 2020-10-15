import React, { useEffect, useState } from 'react';

import {
  SafetyCertificateOutlined,
  QuestionCircleOutlined,
  CodeOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import {
  Form,
  Button,
  Tabs,
  Modal,
  notification,
  Row,
  Input,
  Col,
  Divider,
  DatePicker,
  TimePicker,
} from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import _ from 'lodash';
import moment from 'moment';

import api, { FOLIO_SCHEDULING } from '../../../api';

const Settings = ({ value, access }) => {
  const { data: payload } = useSWR(FOLIO_SCHEDULING.SETTINGS);
  const { data: manualDates, revalidate } = useSWR(FOLIO_SCHEDULING.SETTINGS_EX);

  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { setFieldsValue } = form;

  let newSettings = [];
  // const [newSettings, setNewSettings] = useState([]);
  const [runAndOverrideFlag, setRunAndOverRide] = useState(false);
  const [freezeCloseoutFlag, setFreezeCloseout] = useState(false);

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
        await api
          .post(FOLIO_SCHEDULING.UPDATE_SETTINGS, newSettings)
          .then(() => {
            onComplete();
            setRunAndOverRide(false);

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

  const runAndOverride = async () => {
    const values = {};
    const today = moment();
    values.repeat_interval = today.format('D_M_YYYY');
    values.description = t('messages.manualOverride');
    Modal.confirm({
      title: t('prompts.runAndOverride'),
      okText: t('operations.yes'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(FOLIO_SCHEDULING.RUN_N_OVERRIDE, values)
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

  const freezeCloseout = async () => {
    Modal.confirm({
      title: t('prompts.freezeCloseout'),
      okText: t('operations.yes'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(FOLIO_SCHEDULING.FREEZE_CLOSEOUT)
          .then(() => {
            onComplete();
            revalidate();

            notification.success({
              message: t('messages.submitSuccess'),
              description: t('descriptions.submitSuccess'),
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
        await api
          .post(FOLIO_SCHEDULING.CLOSE_CLOSEOUT)
          .then(() => {
            onComplete();
            revalidate();

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
      last_closeout_time: _.filter(data, function (item) {
        return item.param_key === 'LAST_CLOSEOUT_DATE';
      })[0].param_value,
    });
    setFieldsValue({
      last_weekly_closeout_time: _.filter(data, function (item) {
        return item.param_key === 'LAST_WEEKLY_REPORT_DATE';
      })[0].param_value,
    });
    setFieldsValue({
      last_monthly_closeout_time: _.filter(data, function (item) {
        return item.param_key === 'LAST_MONTHLY_REPORT_DATE';
      })[0].param_value,
    });

    const nextDailyDate = moment(
      _.filter(data, function (item) {
        return item.param_key === 'NEXT_DAILY_REPORT_DATE';
      })[0].param_value,
      'YYYY-MM-DD HH:mm:ss'
    );

    const nextReportTime = moment(
      _.filter(data, function (item) {
        return item.param_key === 'NEXT_REPORT_TIME';
      })[0].param_value,
      'YYYY-MM-DD HH:mm:ss'
    );
    setFieldsValue({
      next_closeout_date: nextDailyDate.format('YYYY-MM-DD'),
    });
    setFieldsValue({
      next_closeout_time: nextReportTime,
    });

    setRunAndOverRide(runnable(data));
    const today = moment();
    setFreezeCloseout(checkDate(today));

    const nextWeeklyDate = moment(
      _.filter(data, function (item) {
        return item.param_key === 'NEXT_WEEKLY_REPORT_DATE';
      })[0].param_value,
      'YYYY-MM-DD HH:mm:ss'
    );
    setFieldsValue({
      next_weekly_date: nextWeeklyDate,
    });

    const nextMonthlyDate = moment(
      _.filter(data, function (item) {
        return item.param_key === 'NEXT_MONTHLY_REPORT_DATE';
      })[0].param_value,
      'YYYY-MM-DD HH:mm:ss'
    );
    setFieldsValue({
      next_monthly_date: nextMonthlyDate,
    });

    const operateDate = moment(
      _.filter(data, function (item) {
        return item.param_key === 'OP_DAY_MNTH_YEAR';
      })[0].param_value,
      'YYYY-MM-DD HH:mm:ss'
    );
    setFieldsValue({
      operating_date: operateDate,
    });
    // setFieldsValue({
    //   last_closeout_time: "hello, world"
    // });
  };

  // setFields(payload?.records)

  const closeoutTimeChange = (value) => {
    if (
      _.find(newSettings, function (item) {
        return item.param_key === 'NEXT_REPORT_TIME';
      })
    ) {
      let datePart = _.filter(newSettings, function (item) {
        return item.param_key === 'NEXT_REPORT_TIME';
      })[0].substring(0, 11);
      _.filter(newSettings, function (item) {
        return item.param_key === 'NEXT_REPORT_TIME';
      })[0].param_value = datePart + value.format('HH:mm:00');
    } else {
      let datePart = _.filter(payload?.records, function (item) {
        return item.param_key === 'NEXT_REPORT_TIME';
      })[0].param_value.substring(0, 11);
      newSettings.push({
        param_key: 'NEXT_REPORT_TIME',
        param_value: datePart + value.format('HH:mm:00'),
      });
    }
  };

  const nextWeeklyDateChange = (value) => {
    if (
      _.find(newSettings, function (item) {
        return item.param_key === 'NEXT_WEEKLY_REPORT_DATE';
      })
    ) {
      let timePart = _.filter(newSettings, function (item) {
        return item.param_key === 'NEXT_WEEKLY_REPORT_DATE';
      })[0].param_value.substring(10);
      _.filter(newSettings, function (item) {
        return item.param_key === 'NEXT_WEEKLY_REPORT_DATE';
      })[0].param_value = value.format('YYYY-MM-DD') + timePart;
    } else {
      let timePart = _.filter(payload?.records, function (item) {
        return item.param_key === 'NEXT_REPORT_TIME';
      })[0].param_value.substring(10);
      newSettings.push({
        param_key: 'NEXT_WEEKLY_REPORT_DATE',
        param_value: value.format('YYYY-MM-DD') + timePart,
      });
    }
  };

  const nextMonthlyDateChange = (value) => {
    if (
      _.find(newSettings, function (item) {
        return item.param_key === 'NEXT_MONTHLY_REPORT_DATE';
      })
    ) {
      let timePart = _.filter(newSettings, function (item) {
        return item.param_key === 'NEXT_MONTHLY_REPORT_DATE';
      })[0].param_value.substring(10);
      _.filter(newSettings, function (item) {
        return item.param_key === 'NEXT_MONTHLY_REPORT_DATE';
      })[0].param_value = value.format('YYYY-MM-DD') + timePart;
    } else {
      let timePart = _.filter(payload?.records, function (item) {
        return item.param_key === 'NEXT_REPORT_TIME';
      })[0].param_value.substring(10);
      newSettings.push({
        param_key: 'NEXT_MONTHLY_REPORT_DATE',
        param_value: value.format('YYYY-MM-DD') + timePart,
      });
    }
  };

  const operatingDateChange = (value) => {
    if (
      _.find(newSettings, function (item) {
        return item.param_key === 'OP_DAY_MNTH_YEAR';
      })
    ) {
      let timePart = _.filter(newSettings, function (item) {
        return item.param_key === 'OP_DAY_MNTH_YEAR';
      })[0].param_value.substring(10);
      _.filter(newSettings, function (item) {
        return item.param_key === 'OP_DAY_MNTH_YEAR';
      })[0].param_value = value.format('YYYY-MM-DD') + timePart;
    } else {
      let timePart = _.filter(payload?.records, function (item) {
        return item.param_key === 'NEXT_REPORT_TIME';
      })[0].param_value.substring(10);
      newSettings.push({
        param_key: 'OP_DAY_MNTH_YEAR',
        param_value: value.format('YYYY-MM-DD') + timePart,
      });
    }
  };

  //Returns true: closeout runs this day; false: closeout does not run this day
  const checkDate = (v) => {
    // console.log(value)
    // console.log(v)
    //Override overrides exceptions
    const overrides = _.filter(value, function (item) {
      return item.window_name === 'OVERRIDE';
    });
    for (let i = 0; i < overrides.length; i++) {
      if (v.format('D_M_YYYY') === overrides[i].repeat_interval) {
        return true;
      }
    }

    const exceptions = _.filter(value, function (item) {
      return item.window_name !== 'OVERRIDE';
    });
    for (let i = 0; i < exceptions.length; i++) {
      if (exceptions[i].window_name === 'MONTH_WINDOW') {
        if (v.format('D') === exceptions[i].repeat_interval) {
          return false;
        }
      }

      if (exceptions[i].window_name === 'WEEK_WINDOW') {
        if (v.format('dddd') === exceptions[i].repeat_interval) {
          return false;
        }
      }

      if (exceptions[i].window_name === 'DATE_YEAR_WINDOW') {
        if (v.format('D_M') === exceptions[i].repeat_interval) {
          return false;
        }
      }

      if (exceptions[i].window_name === 'YEAR_WINDOW') {
        let interval = exceptions[i].repeat_interval.split('_');
        if (v.format('dddd') !== interval[1]) {
          continue;
        } else if (v.format('M') !== interval[2]) {
          continue;
        }

        for (let j = 1; j <= 5; j++) {
          const cloneMoment = v.clone();
          if (cloneMoment.subtract(7 * j, 'days').format('M') !== v.format('M') && interval[0] === j) {
            return false;
          }
        }
      }

      if (exceptions[i].window_name === 'ONCE_WINDOW') {
        if (v.format('D_M_YYYY') === exceptions[i].repeat_interval) {
          return false;
        }
      }
    }

    return true;
  };

  //Is todady ready for "Run and Override"
  const runnable = (data) => {
    //1# today is not an exception
    const today = moment();
    if (!checkDate(today)) {
      console.log('checkDate false');
      return false;
    }

    const nextDailyDate = moment(
      _.filter(data, function (item) {
        return item.param_key === 'NEXT_DAILY_REPORT_DATE';
      })[0].param_value,
      'YYYY-MM-DD HH:mm:ss'
    );
    if (today.format('HH:mm:ss') > nextDailyDate.format('HH:mm:ss')) {
      console.log('already run today');
      return false;
    }

    return true;
  };

  const closeoutIsBusy = () => {
    return (
      manualDates?.records[0].next_manual_close !== '' ||
      manualDates?.records[0].next_manual_freeze_datetime !== '' ||
      manualDates?.records[0].closeout_running === true
    );
  };

  const showCloseoutStatus = () => {
    if (closeoutIsBusy()) {
      return t('descriptions.closeoutIsBusy');
    }
  };

  useEffect(() => {
    setFields(payload?.records);
  });

  const layout = {
    labelCol: {
      span: 8,
    },
  };

  return (
    <Form {...layout} form={form} scrollToFirstError>
      <Row>
        <Col span={24}>
          <Divider></Divider>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item label={t('fields.lastCloseoutDate')} name="last_closeout_time">
            <Input disabled style={{ width: 200, textAlign: 'center' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item label={t('fields.lastWeeklyReportDate')} name="last_weekly_closeout_time">
            <Input disabled style={{ width: 200, textAlign: 'center' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item label={t('fields.lastMonthlyReportDate')} name="last_monthly_closeout_time">
            <Input disabled style={{ width: 200, textAlign: 'center' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item label={t('fields.nextPlannedCloseout')} name="next_closeout_date">
            <Input disabled style={{ width: 200, textAlign: 'center' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="start">
        <Col span={12} />
        <Col span={12} style={{ textAlign: 'center' }}>
          <Button
            title={showCloseoutStatus()}
            type="primary"
            disabled={!runAndOverrideFlag || closeoutIsBusy()}
            icon={<CodeOutlined />}
            onClick={runAndOverride}
          >
            {t('operations.runAndOverride')}
          </Button>
        </Col>
      </Row>

      <Row>
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
          <div>
            {t('fields.lastModified')}:{' '}
            {payload === undefined
              ? ''
              : _.filter(payload?.records, function (item) {
                  return item.param_key === 'NEXT_REPORT_TIME';
                })[0].last_chg_time}
          </div>
        </Col>
      </Row>

      <Row justify="start">
        <Col span={12}>
          <Form.Item label={t('fields.nextWeeklyDate')} name="next_weekly_date">
            <DatePicker onChange={nextWeeklyDateChange} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <div>
            {t('fields.lastModified')}:{' '}
            {payload === undefined
              ? ''
              : _.filter(payload?.records, function (item) {
                  return item.param_key === 'NEXT_WEEKLY_REPORT_DATE';
                })[0].last_chg_time}
          </div>
        </Col>
      </Row>

      <Row justify="start">
        <Col span={12}>
          <Form.Item label={t('fields.nextMonthlyDate')} name="next_monthly_date">
            <DatePicker onChange={nextMonthlyDateChange} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <div>
            {t('fields.lastModified')}:{' '}
            {payload === undefined
              ? ''
              : _.filter(payload?.records, function (item) {
                  return item.param_key === 'NEXT_MONTHLY_REPORT_DATE';
                })[0].last_chg_time}
          </div>
        </Col>
      </Row>

      <Row justify="start">
        <Col span={12}>
          <Form.Item label={t('fields.closeoutOperatingDate')} name="operating_date">
            <DatePicker onChange={operatingDateChange} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <div>
            {t('fields.lastModified')}:{' '}
            {payload === undefined
              ? ''
              : _.filter(payload?.records, function (item) {
                  return item.param_key === 'OP_DAY_MNTH_YEAR';
                })[0].last_chg_time}
          </div>
        </Col>
      </Row>

      <Row justify="start">
        <Col span={12} />
        <Col span={12} style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={() => setFields(payload?.records)}>
            {t('operations.reset')}
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            style={{ margin: '0 8px' }}
            onClick={onFinish}
            disabled={!access?.canUpdate}
          >
            {t('operations.save')}
          </Button>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Divider></Divider>
        </Col>
      </Row>

      <Row>
        <Col span={12} />
        <Col
          span={12}
          style={{
            textAlign: 'center',
          }}
        >
          <Button
            title={showCloseoutStatus()}
            type="primary"
            icon={<SafetyCertificateOutlined />}
            style={{ float: 'right', marginRight: 5 }}
            onClick={closeCloseout}
            disabled={!access?.extra || closeoutIsBusy()}
          >
            {t('operations.closeCloseout')}
          </Button>

          <Button
            title={showCloseoutStatus()}
            type="primary"
            icon={<SafetyCertificateOutlined />}
            style={{ float: 'right', marginRight: 5 }}
            onClick={freezeCloseout}
            disabled={!access?.extra || closeoutIsBusy()}
          >
            {t('operations.freezeCloseout')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Settings;
