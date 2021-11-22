import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';

const DiffWeight = ({ form, value }) => {
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
  // const IS_DISABLED = !value ? false : value?.status !== 'F';
  const IS_DISABLED = true;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        sum_ldw_diff_kg: value.sum_ldw_start_kg === '' || value.sum_ldw_start_kg === undefined
          ? ''
          : value.sum_ldw_end_kg === '' || value.sum_ldw_end_kg === undefined
            ? ''
            : (value.sum_ldw_end_kg - value.sum_ldw_start_kg),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="sum_ldw_diff_kg" label={t('fields.schdDiffWeight')}>
      <InputNumber style={{ width: '100%' }} disabled={IS_DISABLED} />
    </Form.Item>
  );
};

export default DiffWeight;
