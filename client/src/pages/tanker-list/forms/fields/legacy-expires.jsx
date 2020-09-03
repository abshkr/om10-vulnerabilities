import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, DatePicker, Col } from 'antd';
import moment from 'moment';
import _ from 'lodash';

import { SETTINGS } from '../../../../constants';
import { getDateTimeFormat } from '../../../../utils';

const Dates = ({ form, value, expiryTypes }) => {
  console.log(expiryTypes);
  // console.log(expiryTypes.[0]);
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const FORMAT = getDateTimeFormat();

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tnkr_lic_exp: value.tnkr_lic_exp === ''? null: moment(value.tnkr_lic_exp, SETTINGS.DATE_TIME_FORMAT),
        tnkr_dglic_exp: value.tnkr_dglic_exp === ''? null: moment(value.tnkr_dglic_exp, SETTINGS.DATE_TIME_FORMAT),
        tnkr_ins_exp: value.tnkr_ins_exp === ''? null: moment(value.tnkr_ins_exp, SETTINGS.DATE_TIME_FORMAT),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <>
      <Form.Item name="tnkr_lic_exp" label={expiryTypes?.[0].expiry_date_titl}>
        <DatePicker showTime format={FORMAT} style={{ width: '50%' }} />
      </Form.Item>

      <Form.Item name="tnkr_dglic_exp" label={expiryTypes?.[1].expiry_date_titl}>
        <DatePicker showTime format={FORMAT} style={{ width: '50%' }} />
      </Form.Item>

      <Form.Item name="tnkr_ins_exp" label={expiryTypes?.[2].expiry_date_titl}>
        <DatePicker showTime format={FORMAT} style={{ width: '50%' }} />
      </Form.Item>
    </>
  );
};

export default Dates;
