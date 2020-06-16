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
      let array = value.repeat_interval.split("_");
      setData({
        day: array[0],
        month: array[1]
      })
    } else if (value.window_name == "YEAR_WINDOW") {
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
    data.day = v;
    if (data.weekDay !== undefined && data.month !== undefined) {
      setFieldsValue({
        repeat_interval: data.sequenceDay + "_" + data.weekDay + "_" + data.month,
      });
    }
  }

  function weekDayChanged(v) {
    data.weekDay = v;
    if (data.day !== undefined && data.month !== undefined) {
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
      if (data.day !== undefined && data.weekDay !== undefined) {
        setFieldsValue({
          repeat_interval: data.day + "_" + data.weekDay + "_" + data.month,
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
    } else if (value.window_name == "YEAR_WINDOW") {
      if (data.month !== undefined && data.weekDay !== undefined) {
        setFieldsValue({
          repeat_interval: data.day + "_" + data.weekDay + "_" + data.month,
        });
      }
    }
  }

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.folioExceptionInterval')}`);
    }

    return Promise.resolve();
  };

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
            name="week_day" 
            disabled={!IS_CREATING}
            // defaultValue="Monday"
          >
            <Option key="1" value="Monday">Monday</Option>
            <Option key="2" value="Tuesday">Tuesday</Option>
            <Option key="3" value="Wednesday">Wednesday</Option>
            <Option key="4" value="Thursday">Thursday</Option>
            <Option key="5" value="Friday">Friday</Option>
            <Option key="6" value="Saturday">Saturday</Option>
            <Option key="7" value="Sunday">Sunday</Option>
          </Select>
      ) :
        (
          value.window_name == "ONCE_WINDOW" ? (
            <div>
              <Input disabled={!IS_CREATING} value={data.datestring}/>
            </div>
          )
            :
          (
            value.window_name == "MONTH_WINDOW" ? (
                <Select 
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
                    <Option key="1" value="1">January</Option>
                    <Option key="2" value="2">February</Option>
                    <Option key="3" value="3">March</Option>
                    <Option key="4" value="4">April</Option>
                    <Option key="5" value="5">May</Option>
                    <Option key="6" value="6">June</Option>
                    <Option key="7" value="7" >July</Option>
                    <Option key="8" value="8">August</Option>
                    <Option key="9" value="9">September</Option>
                    <Option key="10" value="10" >October</Option>
                    <Option key="11" value="11">November</Option>
                    <Option key="12" value="12">December</Option>
                  </Select>
                </div>
              ) : (
                <div>
                  <Select 
                    name="sequence_day" 
                    style={{width:"150px"}} 
                    // defaultValue="First"
                    value={data.sequenceDay}
                    disabled={!IS_CREATING}
                    onChange={sequenceDayChanged}
                  >
                    <Option key="1" value="0">First</Option>
                    <Option key="2" value="1">Second</Option>
                    <Option key="3" value="2">Thrid</Option>
                    <Option key="4" value="3">Fourth</Option>
                    <Option key="5" value="4">Fifth</Option>
                  </Select>
                  <Select 
                    name="week_day" 
                    style={{width:"150px", paddingLeft: "20px"}} 
                    disabled={!IS_CREATING}
                    // defaultValue="Monday"
                    value={data.weekDay}
                    onChange={weekDayChanged}
                  >
                    <Option key="1" value="Monday">Monday</Option>
                    <Option key="2" value="Tuesday">Tuesday</Option>
                    <Option key="3" value="Wednesday">Wednesday</Option>
                    <Option key="4" value="Thursday">Thursday</Option>
                    <Option key="5" value="Friday">Friday</Option>
                    <Option key="6" value="Saturday">Saturday</Option>
                    <Option key="7" value="Sunday">Sunday</Option>
                  </Select>
                  <Select 
                    name="month" 
                    style={{width:"150px", paddingLeft: "20px"}} 
                    disabled={!IS_CREATING}
                    value={data?.month}
                    onChange={monthChanged}
                  >
                    <Option key="1" value="1">January</Option>
                    <Option key="2" value="2">February</Option>
                    <Option key="3" value="3">March</Option>
                    <Option key="4" value="4">April</Option>
                    <Option key="5" value="5">May</Option>
                    <Option key="6" value="6">June</Option>
                    <Option key="7" value="7" >July</Option>
                    <Option key="8" value="8">August</Option>
                    <Option key="9" value="9">September</Option>
                    <Option key="10" value="10" >October</Option>
                    <Option key="11" value="11">November</Option>
                    <Option key="12" value="12">December</Option>
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
