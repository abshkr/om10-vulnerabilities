import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Spin } from 'antd';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import columns from './columns';
import api, { MANUAL_TRANSACTIONS } from '../../../../api';

const MeterTransfers = ({ 
  form, 
  sourceType, 
  selected, 
  transfers,
  dataBoard,
  setDataBoard,
  data,
  setData,
  dataLoadFlag,
  setDataLoadFlag,
}) => {
  const { t } = useTranslation();

  const [isLoading, setLoading] = useState(true);

  const fields = columns(t);

  useEffect(() => {
    async function getMeters() {
      const meters = [];

      setLoading(true);

      for (let index = 0; index < transfers.length; index++) {
        const transfer = transfers[index];

        if (!transfer?.trsf_arm_cd.includes(' ')) {
          await api
            .get(MANUAL_TRANSACTIONS.BASE_DETAILS, {
              params: {
                prod_cmpy: transfer?.trsf_prod_cmpy,
                prod_code: transfer?.trsf_prod_code,
                //arm_code: [transfer?.trsf_arm_cd],
                arm_code: transfer?.trsf_arm_cd,
                id: 'mtrtrsf'
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

    if (!dataLoadFlag) {
      getMeters();
    }
  }, [selected, transfers]);

  useEffect(() => {
    console.log('Inside meter transfers to setFieldsValue, the data is ', data);
    if (data) {
      form.setFieldsValue({
        meter_transfers: data,
      });
    }
  }, [data]);

  useEffect(() => {
    console.log('Inside meter transfers to setFieldsValue, the data is ', dataLoadFlag);
    if (dataLoadFlag) {
      if (data) {
        form.setFieldsValue({
          meter_transfers: data,
        });
      }
      setDataLoadFlag(false);
    }
  }, [dataLoadFlag]);

  useEffect(() => {
    let board = dataBoard;
    if (!board) {
      board = {};
    }
    board.meter_transfers = data;
    setDataBoard(board);
  }, [data]);

  useEffect(() => {
    console.log("MeterTransfers.meter-transfers sourceType", sourceType);
    setData([]);
  }, [sourceType]);

  return (
    <Spin indicator={null} spinning={isLoading}>
      <Form.Item name="meter_transfers">
        <DataTable 
          data={data} 
          height="70vh" 
          columns={fields} 
        />
      </Form.Item>
    </Spin>
  );
};

export default MeterTransfers;
