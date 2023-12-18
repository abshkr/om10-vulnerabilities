import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'dayjs';
import { Form, DatePicker } from 'antd';
import { SETTINGS } from '../../../../constants';
import { useConfig } from '../../../../hooks';

const ExpiredAfter = ({ form, value }) => {
  const config = useConfig();
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.allocEndDate')}`);
      }
    }

    // compare EffectiveFrom with ExpiredAfter
    const effectiveFrom = form.getFieldValue('alloc_start_date');
    if (!(!input || !effectiveFrom)) {
      if (effectiveFrom.isAfter(input)) {
        return Promise.reject(`${t('validate.endDateEarlierThanStartDate')}`);
      }
    }

    return Promise.resolve();
  };

  const onChange = () => {
    form.validateFields(['alloc_start_date', 'alloc_end_date']);
  };

  useEffect(() => {
    const serverCurrent = moment(config?.serverTime, SETTINGS.DATE_TIME_FORMAT);
    if (value) {
      setFieldsValue({
        alloc_end_date:
          value.alloc_end_date === '' ? null : moment(value.alloc_end_date, SETTINGS.DATE_TIME_FORMAT),
      });
    } else {
      setFieldsValue({
        // alloc_end_date: moment(),
        // alloc_end_date: moment().add(365,'days'),//.format(SETTINGS.DATE_TIME_FORMAT),
        alloc_end_date: serverCurrent.add(365, 'days'),
      });
    }
  }, [value, config, setFieldsValue]);

  return (
    <Form.Item
      name="alloc_end_date"
      label={t('fields.allocEndDate')}
      rules={[{ required: false, validator: validate }]}
    >
      <DatePicker showTime style={{ width: '100%' }} onChange={onChange} />
    </Form.Item>
  );
};

export default ExpiredAfter;
