import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, DatePicker } from 'antd';
import moment from 'moment';

import { SETTINGS } from '../../../../constants';
import { getDateTimeFormat } from '../../../../utils';

const PinDate = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const FORMAT = getDateTimeFormat();

  useEffect(() => {
    if (value) {
      setFieldsValue({
        kya_pin_changed:
          value.kya_pin_changed === '' ? null : moment(value.kya_pin_changed, SETTINGS.DATE_TIME_FORMAT),
      });
    } else {
      setFieldsValue({
        kya_pin_changed: moment(),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="kya_pin_changed" label={t('fields.pinDate')}>
      <DatePicker showTime format={FORMAT} style={{ width: '100%' }} disabled={true} />
    </Form.Item>
  );
};

export default PinDate;
