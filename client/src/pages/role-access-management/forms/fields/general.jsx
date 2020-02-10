import React, { useEffect } from 'react';
import { Form, Checkbox } from 'antd';
import _ from 'lodash';

const General = ({ form, value, options }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const menuItems = _.filter(value?.privilege, privilege => {
    return privilege.domain_text === privilege.object_text;
  });

  return (
    <div>
      {menuItems.map((value, index) => (
        <Form.Item label={value.object_text} key={index}>
          {getFieldDecorator(`privilege[${index}]`)(
            <Checkbox.Group
              style={{ flexDirection: 'row', marginBottom: 5, justifyContent: 'space-between' }}
              options={options}
            />
          )}
        </Form.Item>
      ))}
    </div>
  );
};

export default General;
