import React, { useEffect, useState, useCallback } from 'react';

import { Form, Select, Checkbox, Divider } from 'antd';
import { personnel } from '../../../../api';
import axios from 'axios';
import _ from 'lodash';

const Lock = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue, getFieldValue } = form;

  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const choices = [
    {
      key: 'Yes',
      value: 'Y',
    },
    {
      key: 'No',
      value: 'N',
    },
  ];

  const handleAreaConversion = useCallback(values => {
    const payload = [];

    _.forEach(values, object => {
      payload.push({
        label: object.area_name,
        value: object.area_k,
      });
    });

    return payload;
  }, []);

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        per_lock: value.per_lock,
        area_accesses: value.area_accesses,
      });
    } else {
      setFieldsValue({
        per_lock: 'N',
      });
    }

    const getContext = () => {
      axios.all([personnel.readPersonnelAreas()]).then(
        axios.spread(options => {
          setOptions(handleAreaConversion(options.data.records));
          setLoading(false);
        }),
      );
    };

    setLoading(true);
    getContext();
  }, [value, setFieldsValue, handleAreaConversion]);

  return (
    <div className="personnel-lock">
      <Form.Item label={t('fields.lockOut')}>
        {getFieldDecorator('per_lock')(
          <Select>
            {choices.map((item, index) => (
              <Select.Option key={index} value={item.value}>
                {item.key}
              </Select.Option>
            ))}
          </Select>,
        )}
      </Form.Item>
      <Divider />
      <Form.Item label="">
        {getFieldDecorator('area_accesses')(
          <Checkbox.Group
            style={{ display: 'flex', flexDirection: 'column' }}
            disabled={getFieldValue('per_lock') === 'Y' || isLoading}
            options={options}
          />,
        )}
      </Form.Item>
    </div>
  );
};

export default Lock;
