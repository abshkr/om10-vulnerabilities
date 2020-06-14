import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Spin } from 'antd';
import axios from 'axios';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import columns from './columns';
import { MANUAL_TRANSACTIONS } from '../../../../api';

const MeterTotals = ({ 
  form, 
  sourceType, 
  selected, 
  transfers 
}) => {
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

        if (!transfer?.trsf_arm_cd.includes(' ')) {
          await axios
            .get(MANUAL_TRANSACTIONS.BASE_DETAILS, {
              params: {
                prod_cmpy: transfer?.trsf_prod_cmpy,
                prod_code: transfer?.trsf_prod_code,
                //arm_code: [transfer?.trsf_arm_cd],
                arm_code: transfer?.trsf_arm_cd,
                id: 'mtrttl'
              },
            })
            .then((res) => {
              if (res.data?.records?.length > 0) {
                _.forEach(res?.data?.records, (arm) => {
                  meters.push({
                    trsf_mtr_opn_amb: null,
                    trsf_mtr_opn_cor: null,
                    trsf_mtr_open_kg: null,
                    trsf_mtr_cls_amb: null,
                    trsf_mtr_cls_cor: null,
                    trsf_mtr_close_kg: null,
                    injector_or_meter: arm?.meter_type_code,
                    trsf_mtr_cd: arm.stream_mtrcode,
                    trsf_mtr_typ: `${arm.meter_type_code} - ${arm?.meter_type_desc}`,
                    trsf_cmpt_no: transfer.trsf_cmpt_no,  //????
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
        meter_totals: data,
      });
    }
  }, [data]);

  useEffect(() => {
    form.setFieldsValue({
      meter_totals: [],
    });
  }, [sourceType]);

  return (
    <Spin indicator={null} spinning={isLoading}>
      <Form.Item name="meter_totals">
        <DataTable data={data} height="80vh" columns={fields} />
      </Form.Item>
    </Spin>
  );
};

export default MeterTotals;
