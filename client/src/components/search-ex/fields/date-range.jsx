import React, { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, DatePicker, Checkbox, Input } from 'antd';
import moment from 'moment';
import { SETTINGS } from '../../../constants';

const DateRange = ({form, start, end}) => {
  const { t } = useTranslation(); 
  const { setFieldsValue } = form;
  const [checked, setChecked] = useState(false);
  
  // const ranges = {
  //   [t('fields.today')]: [moment(), moment()],
  //   [t('fields.thisWeek')]: [moment().startOf('week'), moment().endOf('week')],
  //   [t('fields.thisMonth')]: [moment().startOf('month'), moment().endOf('month')],
  // };

  const onRangeChange = (dates) => {
    console.log(dates)
    setFieldsValue ({
      start_date: dates[0].format(SETTINGS.DATE_TIME_FORMAT),
      end_date: dates[1].format(SETTINGS.DATE_TIME_FORMAT),
    })
  }

  const onCheckBox = (v) => {
    setChecked(v.target.checked);
    setFieldsValue ({
      use_date_range : v.target.checked,
    })
  }

  useEffect(() => {
    setFieldsValue ({
      start_date: moment().subtract(7, 'days').format(SETTINGS.DATE_TIME_FORMAT),
      end_date:  moment().add(7, 'days').format(SETTINGS.DATE_TIME_FORMAT),
    })
  }, [form]);
  
  return (
    <div>
      <Form.Item
        name="use_date_range"
        noStyle
      >
        <Checkbox style = {{marginTop: "3px"}} onChange={onCheckBox}>{t('descriptions.maxDateRange')}</Checkbox>
      </Form.Item>

      <DatePicker.RangePicker
        disabled={!checked}
        onChange={onRangeChange}
        defaultValue={[moment().subtract(7, 'days'), moment().add(7, 'days')]}
      />

      <Form.Item name="start_date" noStyle >
        <Input type="hidden" />
      </Form.Item>
      <Form.Item name="end_date" noStyle >
        <Input type="hidden" />
      </Form.Item>
    </div>
  );
};

export default DateRange;
