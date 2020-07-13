import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input, Button } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import _ from 'lodash';

const SelectInput = ({
  form,
  value,
  name,
  label,
  required,
  id,
  style,
  disabled,
  allowClear,
  maxLength,
  onChange,
  onPressEnter,
  popupManager,
  popupParams,
  popupTitle,
  popupDisabled,
  popupIcon,
  popupLabel,
}) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const popupCallBack = async (value) => {
    console.log('Forms: popupCallBack', value);
    if (value) {
      setFieldsValue({
        [name]: value,
      });
    }
  }

  const handlePopup = () => {
    // pop up the dialog to manage straping data import
    popupManager(
      popupTitle,
      popupParams,
      popupCallBack,
      '60vw',
      '50vh',
    );
  };

  const validate = (rule, input) => {

    if ((required && input === '') || (required && !input)) {
      return Promise.reject(`${t('validate.set')} ─ ${label}`);
    }

    const len = (new TextEncoder().encode(input)).length;
    if (maxLength != undefined && input && input.length > maxLength) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: ${maxLength} ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  const handleValueChange = (event) => {
    if (_.isFunction(onChange)) {
       onChange(event?.target?.value);
    }
  }

  const handlePressEnter = (event) => {
    if (_.isFunction(onPressEnter)) {
      onPressEnter(event?.target?.value);
    }
  }

  useEffect(() => {
    if (value) {
      let index = value;
      if (_.isObject(value) && value.hasOwnProperty(name)) {
        index = value[name];
      }
      if (_.isObject(value) && !value.hasOwnProperty(name)) {
        index = '';
      }
      setFieldsValue({
        [name]: index,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name={name} label={label} rules={[{ required: required, validator: validate }]}>
      <Input 
        id={id}
        style={style}
        disabled={disabled}
        allowClear={allowClear}
        //maxLength={maxLength}
        onChange={handleValueChange}
        onPressEnter={handlePressEnter}
        addonAfter={
          !popupDisabled && (
            <Button
              icon={popupIcon}
              onClick={() => handlePopup()}
              disabled={disabled}
            >
              {popupLabel}
            </Button>
          )
        }
      />
    </Form.Item>
  );
};

export default SelectInput;
