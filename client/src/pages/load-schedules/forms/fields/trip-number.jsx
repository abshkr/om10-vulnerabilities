import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';
import api from 'api';

import { LOAD_SCHEDULES } from '../../../../api';

const TripNumber = ({ form, value, supplier, onChange }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        shls_trip_no: value.shls_trip_no,
        shls_shift: value.shls_shift,
        shls_priority: value.shls_priority,
      });

      onChange(value.shls_trip_no);
    } else if (supplier) {
      api
        .get(LOAD_SCHEDULES.NEXT_TRIP, {
          params: {
            supplier_code: supplier,
          },
        })
        .then((res) => {
          const trip = res.data?.records[0]?.next_trip_no;

          onChange(trip);

          setFieldsValue({
            shls_trip_no: trip,
          });
        });
    }
  }, [value, setFieldsValue, supplier]);

  return (
    <Form.Item name="shls_trip_no" label={t('fields.tripNumber')}>
      <InputNumber min={1} style={{ width: '100%' }} disabled={!supplier || !!value} />
    </Form.Item>
  );
};

export default TripNumber;
