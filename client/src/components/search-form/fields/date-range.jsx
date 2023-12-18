import React, { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, DatePicker, Checkbox, Input, Select } from 'antd';
import moment from 'dayjs';
import { SETTINGS } from '../../../constants';

import 'moment/locale/en-gb';
import 'moment/locale/zh-cn';
import enLocale from 'antd/es/date-picker/locale/en_GB';
import zhLocale from 'antd/es/date-picker/locale/zh_CN';

const momentLocales = { en: enLocale, cn: zhLocale };

const DateRange = ({ form, timeOptionType, force, useRange, startDate, endDate, timeRequired }) => {
  const { t, i18n } = useTranslation();
  const locale = momentLocales[i18n.language || 'en'];

  const { setFieldsValue } = form;
  const [checked, setChecked] = useState(force || useRange);
  const [range, setRange] = useState([
    !startDate ? null : moment(startDate),
    !endDate ? null : moment(endDate),
  ]);

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
    {
      index: 3,
      code: 'MV_DTIM_CREATE',
      name: t('fields.createdAt'),
    },
    /* {
      index: 4,
      code: 'MV_DTIM_CHANGE',
      name: t('fields.lastModified'),
    }, */
  ];

  const onRangeChange = (dates) => {
    setFieldsValue({
      start_date: dates[0].format(SETTINGS.DATE_TIME_FORMAT),
      end_date: dates[1].format(SETTINGS.DATE_TIME_FORMAT),
    });
    setRange(dates);
  };

  const onCheckBox = (v) => {
    setChecked(v.target.checked);
    setFieldsValue({
      use_date_range: v.target.checked,
    });
  };

  useEffect(() => {
    console.log('..................date range useEffect', useRange, startDate, endDate);
    setFieldsValue({
      // start_date: moment().subtract(7, 'days').format(SETTINGS.DATE_TIME_FORMAT),
      // end_date: moment().add(7, 'days').format(SETTINGS.DATE_TIME_FORMAT),
      start_date: !startDate ? null : moment(startDate).format(SETTINGS.DATE_TIME_FORMAT),
      end_date: !endDate ? null : moment(endDate).format(SETTINGS.DATE_TIME_FORMAT),
    });
    setRange([!startDate ? null : moment(startDate), !endDate ? null : moment(endDate)]);
    setFieldsValue({
      use_date_range: useRange,
    });
    setChecked(useRange);
    if (timeOptionType === 'open_order') {
      setFieldsValue({
        time_option: 'ORDER_ORD_TIME',
      });
    } else if (timeOptionType === 'movement_nomination') {
      /* setFieldsValue({
        time_option: 'MV_DTIM_EFFECT',
      }); */
    }
    //  }, [form]);
  }, [startDate, endDate, useRange, timeOptionType, setFieldsValue]);

  return (
    <div>
      <Form.Item name="use_date_range" noStyle>
        <Checkbox
          style={{ marginTop: '3px', display: 'block' }}
          onChange={onCheckBox}
          disabled={force}
          checked={checked}
          defaultChecked={force || useRange}
        >
          {timeRequired ? t('descriptions.maxDateRangeToSeconds') : t('descriptions.maxDateRangeToDays')}
        </Checkbox>
      </Form.Item>

      {timeOptionType === 'open_order' && (
        <Form.Item name="time_option" noStyle>
          <Select
            style={{ marginTop: '5px', marginBottom: '3px', width: '100%' }}
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
        </Form.Item>
      )}

      {timeOptionType === 'movement_nomination' && (
        <Form.Item name="time_option" noStyle>
          <Select
            style={{ marginTop: '5px', marginBottom: '3px', width: '100%' }}
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
        </Form.Item>
      )}

      <DatePicker.RangePicker
        style={{ width: '100%' }}
        showTime={!timeRequired ? false : { defaultValue: moment('00:00:00', 'HH:mm:ss') }}
        disabled={!checked}
        onChange={onRangeChange}
        // defaultValue={[moment().subtract(7, 'days'), moment().add(7, 'days')]}
        defaultValue={[!startDate ? null : moment(startDate), !endDate ? null : moment(endDate)]}
        value={range}
        locale={locale}
      />

      <Form.Item name="start_date" noStyle>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item name="end_date" noStyle>
        <Input type="hidden" />
      </Form.Item>
    </div>
  );
};

export default DateRange;
