import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Checkbox } from 'antd';

const ShowComment = ({ form, value, onChange }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const handleCheck = e => {
    onChange(e.target.checked);
  };

  useEffect(() => {
    if (value) {
      onChange(value.mr_show_comment);

      setFieldsValue({
        mr_show_comment: value.mr_show_comment
      });
    }
  }, [value, onChange, setFieldsValue]);

  return (
    <Form.Item name="mr_show_comment" valuePropName="checked">
      <Checkbox onChange={handleCheck} disabled={value?.mr_status === '2'}>{t('fields.showComment')}</Checkbox>
    </Form.Item>
  );
};

export default ShowComment;
