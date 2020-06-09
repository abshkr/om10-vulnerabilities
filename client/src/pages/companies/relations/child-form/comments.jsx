import React, { useEffect } from 'react';

import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';


const CommentInput = ({ value, form, visible }) => {
  const { t } = useTranslation();
  const { setFieldsValue, resetFields } = form;
  
  useEffect(() => {
    if (value && visible) {
      setFieldsValue({
        comments: value.comments,
        create_date: value.create_date,
      })
    } else {
      resetFields();
    }
  }, [value, visible]);

  return (
    <div>
      <Form.Item name="comments" label={t('fields.comments')} >
        <Input.TextArea rows={2}/>
      </Form.Item>

      <Form.Item name="create_date" noStyle >
        <Input type="hidden"/>
      </Form.Item>
    </div>
  );
};

export default CommentInput;
