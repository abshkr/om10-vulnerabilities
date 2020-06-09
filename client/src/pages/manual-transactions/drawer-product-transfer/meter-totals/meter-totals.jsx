import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Spin } from 'antd';
import axios from 'axios';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import columns from './columns';
import { MANUAL_TRANSACTIONS } from '../../../../api';

const MeterTotals = ({ form, type, selected, transfers }) => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fields = columns(t);

  useEffect(() => {
    async function getMeters() {
      const meters = [];

      setLoading(true);

      for (let index = 0; index < transfers.length; index++) {
        const transfer = transfers[index];

        if (!transfer?.arm_code.includes(' ')) {
          await axios
            .get(MANUAL_TRANSACTIONS.BASE_DETAILS, {
              params: {
                prod_cmpy: selected?.prod_cmpy,
                prod_code: selected?.prod_code,
                arm_code: [transfer?.arm_code],
              },
            })
            .then((res) => {
              if (res.data?.records?.length > 0) {
                _.forEach(res?.data?.records, (arm) => {
                  meters.push({
                    open_amb: null,
                    open_cor: null,
                    open_kg: null,
                    close_amb: null,
                    close_cor: null,
                    close_kg: null,
                    injector_or_meter: arm?.meter_type_code,
                    meter_injector_code: arm.stream_mtrcode,
                    type: `${arm.meter_type_code} - ${arm?.meter_type_desc}`,
                    tnkr_cmpt_no: transfer.tnkr_cmpt_no,
                  });
                });
              }
            });
        }
      }

      setLoading(false);
      setData(meters);
    }

    getMeters();
  }, [selected, transfers]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        meters: data,
      });
    }
  }, [data]);

  return (
    <Spin indicator={null} spinning={isLoading}>
      <Form.Item name="meters">
        <DataTable data={data} height="80vh" columns={fields} />
      </Form.Item>
    </Spin>
  );
};

export default MeterTotals;
