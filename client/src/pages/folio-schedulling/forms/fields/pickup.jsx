import React, { useEffect, useState } from 'react';
import { Form, DatePicker, Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

const Pickup = ({ form, value }) => {
  const IS_CREATING = value["seq"] === undefined;
  const { t } = useTranslation();
  
  const { setFieldsValue, resetFields } = form;
  const { Option } = Select;
  const [data, setData] = useState([]);
  
  const parseValue = ()=>{
    if (value.window_name == "DATE_YEAR_WINDOW") {
      // date_month
      let array = value.repeat_interval.split("_");
      setData({
        day: array[0],
        month: array[1]
      })
    } else if (value.window_name == "YEAR_WINDOW") {
      // seqDay_weekDay_month
      let array = value.repeat_interval.split("_");
      setData({
        sequenceDay: array[0],
        // weekDay: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].indexOf(array[1]) + 1,
        weekDay: array[1],
        month: array[2]
      })
    } else if (value.window_name == "ONCE_WINDOW") {
      let data = value.repeat_interval.split("_");
      setData({
        datestring: data[2] + " " + 
        ["January","February","March","April","May","June","July",
        "August","September","October","November","December"][data[1] - 1] + 
        " " + data[0]
      })
    } else {
      // setData([])
    }
  };

  useEffect(() => {
    if (!IS_CREATING) {
      parseValue();
      setFieldsValue({
        repeat_interval: value.repeat_interval,
      });
    } else {
      setFieldsValue({
        repeat_interval: undefined,
      })
    }
  }, [value, setFieldsValue]);

  function sequenceDayChanged(v) {
    data.sequenceDay = v;
    if (data.weekDay !== undefined && data.month !== undefined) {
      setFieldsValue({
        repeat_interval: data.sequenceDay + "_" + data.weekDay + "_" + data.month,
      });
    }
  }

  function weekDayChanged(v) {
    data.weekDay = v;
    if (data.sequenceDay !== undefined && data.month !== undefined) {
      setFieldsValue({
        repeat_interval: data.sequenceDay + "_" + data.weekDay + "_" + data.month,
      });
    }
  }

  function monthChanged(v) {
    data.month = v;
    if (value.window_name == "DATE_YEAR_WINDOW") {
      if (data.day !== undefined) {
        setFieldsValue({
          repeat_interval: data.day + "_" + data.month,
        });
      }
    } else if (value.window_name == "YEAR_WINDOW") {
      if (data.sequenceDay !== undefined && data.weekDay !== undefined) {
        setFieldsValue({
          repeat_interval: data.sequenceDay + "_" + data.weekDay + "_" + data.month,
        });
      }
    }
  }

  function dayChanged(v) {
    data.day = v;
    if (value.window_name == "DATE_YEAR_WINDOW") {
      if (data.month !== undefined) {
        setFieldsValue({
          repeat_interval: data.day + "_" + data.month,
        });
      }
    } /* else if (value.window_name == "YEAR_WINDOW") {
      if (data.month !== undefined && data.weekDay !== undefined) {
        setFieldsValue({
          repeat_interval: data.day + "_" + data.weekDay + "_" + data.month,
        });
      }
    } */
  }

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.folioExceptionInterval')}`);
    }

    return Promise.resolve();
  };

  const onceChange = (date) => {
    setFieldsValue({
      repeat_interval: date.format("D_M_YYYY"),
    });
  }

  return (
    <Form.Item
      name="repeat_interval"
      label={t('fields.folioExceptionInterval')}
      // noStyle
      // label=" "
      rules={[{ required: true, validator: validate }]}
    >
      {
        (IS_CREATING && value.window_name === undefined) || value.window_name == "WEEK_WINDOW"  ? (
          <Select 
            dropdownMatchSelectWidth={false}
            name="week_day" 
            disabled={!IS_CREATING}
            // defaultValue="Monday"
          >
            <Option key="1" value="Monday">{t('fields.folioPlannerWeekMon')}</Option>
            <Option key="2" value="Tuesday">{t('fields.folioPlannerWeekTue')}</Option>
            <Option key="3" value="Wednesday">{t('fields.folioPlannerWeekWed')}</Option>
            <Option key="4" value="Thursday">{t('fields.folioPlannerWeekThu')}</Option>
            <Option key="5" value="Friday">{t('fields.folioPlannerWeekFri')}</Option>
            <Option key="6" value="Saturday">{t('fields.folioPlannerWeekSat')}</Option>
            <Option key="7" value="Sunday">{t('fields.folioPlannerWeekSun')}</Option>
          </Select>
      ) :
        (
          value.window_name == "ONCE_WINDOW" ? (
            <div>
              {!IS_CREATING ? 
                <Input disabled value={data.datestring}/> :
                <DatePicker onChange={onceChange}/>
              }
            </div>
          )
            :
          (
            value.window_name == "MONTH_WINDOW" ? (
                <Select 
                  dropdownMatchSelectWidth={false}
                  name="month_day"
                  disabled={!IS_CREATING}
                  // rules={[{ required: true }]}
                  >
                  {_.range(1, 32).map((item)=>{
                    return <Option key={item} value={item}>{item}</Option>
                  })}
                </Select>
            ) : (
              value.window_name == "DATE_YEAR_WINDOW" ? (
                <div>
                  <Select 
                    dropdownMatchSelectWidth={false}
                    name="month_day" 
                    disabled={!IS_CREATING}
                    style={{width:"150px"}} 
                    value={data.day} 
                    onChange={dayChanged}
                    // rules={[{ required: true }]}
                  >
                    {_.range(1, 32).map((item)=>{
                      return <Option key={item} value={item}>{item}</Option>
                    })}
                  </Select>
                  <Select name="month2" 
                    style={{width:"150px", paddingLeft: "20px"}} 
                    disabled={!IS_CREATING}
                    // defaultValue={data.month} 
                    value={data?.month}
                    onChange={monthChanged}
                    // rules={[{ required: true }]}
                  >
                    <Option key="1" value="1">{t('fields.folioPlannerMonthJan')}</Option>
                    <Option key="2" value="2">{t('fields.folioPlannerMonthFeb')}</Option>
                    <Option key="3" value="3">{t('fields.folioPlannerMonthMar')}</Option>
                    <Option key="4" value="4">{t('fields.folioPlannerMonthApr')}</Option>
                    <Option key="5" value="5">{t('fields.folioPlannerMonthMay')}</Option>
                    <Option key="6" value="6">{t('fields.folioPlannerMonthJun')}</Option>
                    <Option key="7" value="7">{t('fields.folioPlannerMonthJul')}</Option>
                    <Option key="8" value="8">{t('fields.folioPlannerMonthAug')}</Option>
                    <Option key="9" value="9">{t('fields.folioPlannerMonthSep')}</Option>
                    <Option key="10" value="10">{t('fields.folioPlannerMonthOct')}</Option>
                    <Option key="11" value="11">{t('fields.folioPlannerMonthNov')}</Option>
                    <Option key="12" value="12">{t('fields.folioPlannerMonthDec')}</Option>
                  </Select>
                </div>
              ) : (
                <div>
                  <Select 
                    dropdownMatchSelectWidth={false}
                    name="sequence_day" 
                    style={{width:"150px"}} 
                    // defaultValue="First"
                    value={data.sequenceDay}
                    disabled={!IS_CREATING}
                    onChange={sequenceDayChanged}
                  >
                    <Option key="1" value="0">{t('fields.folioPlannerNumth1st')}</Option>
                    <Option key="2" value="1">{t('fields.folioPlannerNumth2nd')}</Option>
                    <Option key="3" value="2">{t('fields.folioPlannerNumth3rd')}</Option>
                    <Option key="4" value="3">{t('fields.folioPlannerNumth4th')}</Option>
                    <Option key="5" value="4">{t('fields.folioPlannerNumth5th')}</Option>
                  </Select>
                  <Select 
                    dropdownMatchSelectWidth={false}
                    name="week_day" 
                    style={{width:"150px", paddingLeft: "20px"}} 
                    disabled={!IS_CREATING}
                    // defaultValue="Monday"
                    value={data.weekDay}
                    onChange={weekDayChanged}
                  >
                    <Option key="1" value="Monday">{t('fields.folioPlannerWeekMon')}</Option>
                    <Option key="2" value="Tuesday">{t('fields.folioPlannerWeekTue')}</Option>
                    <Option key="3" value="Wednesday">{t('fields.folioPlannerWeekWed')}</Option>
                    <Option key="4" value="Thursday">{t('fields.folioPlannerWeekThu')}</Option>
                    <Option key="5" value="Friday">{t('fields.folioPlannerWeekFri')}</Option>
                    <Option key="6" value="Saturday">{t('fields.folioPlannerWeekSat')}</Option>
                    <Option key="7" value="Sunday">{t('fields.folioPlannerWeekSun')}</Option>
                  </Select>
                  <Select 
                    dropdownMatchSelectWidth={false}
                    name="month" 
                    style={{width:"150px", paddingLeft: "20px"}} 
                    disabled={!IS_CREATING}
                    value={data?.month}
                    onChange={monthChanged}
                  >
                    <Option key="1" value="1">{t('fields.folioPlannerMonthJan')}</Option>
                    <Option key="2" value="2">{t('fields.folioPlannerMonthFeb')}</Option>
                    <Option key="3" value="3">{t('fields.folioPlannerMonthMar')}</Option>
                    <Option key="4" value="4">{t('fields.folioPlannerMonthApr')}</Option>
                    <Option key="5" value="5">{t('fields.folioPlannerMonthMay')}</Option>
                    <Option key="6" value="6">{t('fields.folioPlannerMonthJun')}</Option>
                    <Option key="7" value="7">{t('fields.folioPlannerMonthJul')}</Option>
                    <Option key="8" value="8">{t('fields.folioPlannerMonthAug')}</Option>
                    <Option key="9" value="9">{t('fields.folioPlannerMonthSep')}</Option>
                    <Option key="10" value="10">{t('fields.folioPlannerMonthOct')}</Option>
                    <Option key="11" value="11">{t('fields.folioPlannerMonthNov')}</Option>
                    <Option key="12" value="12">{t('fields.folioPlannerMonthDec')}</Option>
                  </Select>
                </div>
              )
            )
          )
          
        )
      }
    </Form.Item>
  );
};

export default Pickup;
