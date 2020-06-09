import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, DatePicker, Col } from 'antd';
import moment from 'moment';

import { SETTINGS } from '../../../../../../../constants';
import { getDateTimeFormat } from '../../../../../../../utils';

const ItemExpiryTime = ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const FORMAT = getDateTimeFormat();

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.nomtranDtEnd')}`);
      }
    }

    if (input === '' || !input) {
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mvitm_dtim_expiry: 
          value.mvitm_dtim_expiry === '' ? null : moment(value.mvitm_dtim_expiry, SETTINGS.DATE_TIME_FORMAT),
      });
    } else {
      setFieldsValue({
        //mvitm_dtim_expiry: moment(),
        mvitm_dtim_expiry: moment().add(60,'days'),//.format(SETTINGS.DATE_TIME_FORMAT),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="mvitm_dtim_expiry"
      label={t('fields.nomtranDtEnd')}
      rules={[{ required: false, validator: validate }]}
    >
      <DatePicker
        showTime
        format={FORMAT}
        style={{ width: '100%' }}
        disabled={pageState === 'create' ? false : false}
      />
    </Form.Item>
  );
};

export default ItemExpiryTime;
