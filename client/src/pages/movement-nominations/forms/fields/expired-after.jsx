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
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.expiredAfter')}`);
      }
    }

    // compare EffectiveFrom with ExpiredAfter
    const effectiveFrom = form.getFieldValue('mv_dtim_effect');
    if (!(!input || !effectiveFrom)) {
      if (effectiveFrom.isAfter(input)) {
        return Promise.reject(`${t('validate.expiryDateEarlierThanEffectiveDate')}`);
      }
    }

    return Promise.resolve();
  };

  const onChange = () => {
    form.validateFields(['mv_dtim_effect', 'mv_dtim_expiry']);
  };

  useEffect(() => {
    const serverCurrent = moment(config?.serverTime, SETTINGS.DATE_TIME_FORMAT);
    if (value) {
      setFieldsValue({
        mv_dtim_expiry:
          value.mv_dtim_expiry === '' ? null : moment(value.mv_dtim_expiry, SETTINGS.DATE_TIME_FORMAT),
      });
    } else {
      setFieldsValue({
        // mv_dtim_expiry: moment(),
        // mv_dtim_expiry: moment().add(60,'days'),//.format(SETTINGS.DATE_TIME_FORMAT),
        mv_dtim_expiry: serverCurrent.add(60, 'days'),
      });
    }
  }, [value, config, setFieldsValue]);

  return (
    <Form.Item
      name="mv_dtim_expiry"
      label={t('fields.expiredAfter')}
      rules={[{ required: false, validator: validate }]}
    >
      <DatePicker showTime style={{ width: '100%' }} onChange={onChange} />
    </Form.Item>
  );
};

export default ExpiredAfter;
