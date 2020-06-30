import React, { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, DatePicker, Checkbox, Input, Select } from 'antd';
import moment from 'moment';
import { SETTINGS } from '../../../constants';

const DateRange = ({form, timeOption}) => {
  const { t } = useTranslation(); 
  const { setFieldsValue } = form;
  const [checked, setChecked] = useState(false);
  
  const openOrderTimeOptions = [
    {
      index: 1,
      code: 'ORDER_ORD_TIME',
      name: t('fields.orderOrdTime'),
    },
    {
      index: 2,
      code: 'ORDER_EXP_TIME',
      name: t('fields.orderExpTime'),
    },
  ];

  const nominationTimeOptions = [
    {
      index: 1,
      code: 'MV_DTIM_EFFECT',
      name: t('fields.effectiveFrom'),
    },
    {
      index: 2,
      code: 'MV_DTIM_EXPIRY',
      name: t('fields.expiredAfter'),
    },
    /* {
      index: 3,
      code: 'MV_DTIM_CREATE',
      name: t('fields.createdAt'),
    },
    {
      index: 4,
      code: 'MV_DTIM_CHANGE',
      name: t('fields.lastModified'),
    }, */
  ];

  const onRangeChange = (dates) => {
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
    if (timeOption === "open_order") {
      setFieldsValue ({
        time_option: 'ORDER_ORD_TIME',
      })
    } else if (timeOption === "movement_nomination") {
      setFieldsValue ({
        time_option: 'MV_DTIM_EFFECT',
      })
    }
  }, [form]);
  
  return (
    <div>
      <Form.Item
        name="use_date_range"
        noStyle
      >
        <Checkbox style = {{marginTop: "3px", display: "block"}} onChange={onCheckBox}>{t('descriptions.maxDateRange')}</Checkbox>
      </Form.Item>

      {timeOption === "open_order" && <Form.Item
        name="time_option"
        noStyle
      >
        <Select
          style = {{marginTop: "5px", marginBottom: "3px", width: "100%"}}
          disabled={!checked}
          defaultValue={'ORDER_ORD_TIME'}
          // onChange={setTimeOption}
          // optionFilterProp="children"
          // placeholder={null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {openOrderTimeOptions.map((item, index) => (
            <Select.Option key={index} value={item.code}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>}

      {timeOption === "movement_nomination" && <Form.Item
        name="time_option"
        noStyle
      >
        <Select
          style = {{marginTop: "5px", marginBottom: "3px", width: "100%"}}
          disabled={!checked}
          defaultValue="MV_DTIM_EFFECT"
          // onChange={setTimeOption}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {nominationTimeOptions.map((item, index) => (
            <Select.Option key={index} value={item.code}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>}

      <DatePicker.RangePicker
        style = {{ width: "100%"}}
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
