import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, DatePicker, Tag, Row, Col } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import jwtDecode from 'jwt-decode';

import { SETTINGS } from '../../../../constants';

const InventoryDate = ({ form, value, config, period }) => {
  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const currLocale = decoded?.lang === 'ENG' ? 'en-gb' : decoded?.lang === 'CHN' ? 'zh-cn' : 'en-gb';

  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const [dateTime, setDateTime] = useState(undefined);

  const validate = (rule, value) => {
    if (value === '' || !value) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.date')}`);
    }

    return Promise.resolve();
  };

  const onChange = (value) => {
    if (!value) {
      setFieldsValue({
        tkrq_due: '',
      });
    }
    setDateTime(value);
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tkrq_due: value.tkrq_due === '' ? null : moment(value.tkrq_due, SETTINGS.DATE_TIME_FORMAT),
      });
      setDateTime(value.tkrq_due === '' ? null : moment(value.tkrq_due, SETTINGS.DATE_TIME_FORMAT));
    } else {
      setFieldsValue({
        tkrq_due: moment(),
      });
      setDateTime(moment());
    }
  }, [value, setFieldsValue]);

  /*
  [
    {
        "rq_period_id": "0",
        "rq_period_name": "ONCE"
    },
    {
        "rq_period_id": "1",
        "rq_period_name": "DAILY"
    },
    {
        "rq_period_id": "2",
        "rq_period_name": "WEEKLY"
    },
    {
        "rq_period_id": "3",
        "rq_period_name": "MONTHLY"
    },
    {
        "rq_period_id": "4",
        "rq_period_name": "ANNUALLY"
    }
  ]
  */

  const getPrompts = () => {
    let txt = '   ';

    if (period === '0') {
      txt = t('descriptions.requestOnce', { value: '[[DT]]' });
      txt = txt.replace('[[DT]]', dateTime?.format(config.dateTimeFormat));
    }
    if (period === '1') {
      txt = t('descriptions.requestDaily', { value: dateTime?.format(config?.timeFormatHM || 'HH:mm') });
    }
    if (period === '2') {
      txt = t('descriptions.requestWeekly', { value: dateTime?.locale(currLocale)?.format('dddd') });
    }
    if (period === '3') {
      txt = t('descriptions.requestMonthly', { value: dateTime?.format('DD') });
    }
    if (period === '4') {
      txt = t('descriptions.requestAnnually', { value: dateTime?.locale(currLocale)?.format('MMMM DD') });
    }

    return txt;
  };

  return (
    <Row gutter={[8, 2]}>
      <Col span={6}>
        <Form.Item name="tkrq_due" label={t('fields.date')} rules={[{ required: true, validator: validate }]}>
          <DatePicker
            format={config.dateTimeFormatHM}
            showTime={{ format: config.timeFormatHM }}
            onChange={onChange}
          />
        </Form.Item>
      </Col>
      <Col span={18}>
        <Form.Item name="tkrq_dates" label={getPrompts()}>
          <Tag color={period === '0' ? 'red' : 'blue'}>{dateTime?.format('YYYY')}</Tag>
          <Tag color={period === '4' || period === '0' ? 'red' : 'blue'}>
            {dateTime?.locale(currLocale)?.format('MMMM')}
          </Tag>
          <Tag color={period === '4' || period === '3' || period === '0' ? 'red' : 'blue'}>
            {dateTime?.format('DD')}
          </Tag>
          <Tag color={period === '4' || period === '3' || period === '1' || period === '0' ? 'red' : 'blue'}>
            {dateTime?.format(config?.timeFormatHM || 'HH:mm')}
          </Tag>
          <Tag color={period === '2' ? 'red' : 'blue'}>{dateTime?.locale(currLocale)?.format('dddd')}</Tag>
        </Form.Item>
      </Col>
    </Row>
  );
};

export default InventoryDate;
