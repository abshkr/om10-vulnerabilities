import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';

const Priority = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  /*
    1	F	NEW SCHEDULE
    2	S	SPECED
    3	A	ACTIVE
    4	L	LOADING
    5	E	ENDED
    6	D	DELIVERED OK
  */
  const IS_DISABLED = !value ? false : value?.status !== 'F';
  // const IS_DISABLED = !value ? false : value?.shls_status !== 'NEW SCHEDULE';

  useEffect(() => {
    if (value) {
      setFieldsValue({
        shls_priority: value.shls_priority,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="shls_priority" label={t('fields.priority')}>
      <InputNumber min={0} max={9} style={{ width: '100%' }} disabled={IS_DISABLED} />
    </Form.Item>
  );
};

export default Priority;
