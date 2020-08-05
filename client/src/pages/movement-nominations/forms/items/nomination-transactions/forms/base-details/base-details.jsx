import React from 'react';
import {Row, Col, Form, Spin} from 'antd';

import { useTranslation } from 'react-i18next';

import { DataTable } from '../../../../../../../components';
import columns from './columns';
import { useState,useEffect } from 'react';
import _ from 'lodash';

import { buildBaseTransfersByArm } from '../../../../../../../pages/manual-transactions/data-builder';

const BaseDetails = ({ form, value, pageState, arm, temperature, amb, cor, mass }) => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  //const fields = columns(t);

  const getBaseTransfers = () => {
    setLoading(true);

    const transfer = {
      trsf_cmpt_no: 1,
      trsf_arm_cd: arm?.[0]?.stream_armcode,
      trsf_prod_cmpy: value?.mvitm_prodcmpy_from,
      trsf_prod_code: value?.mvitm_prodcode_from,
      trsf_temp: temperature,
      trsf_qty_amb: !amb ? 0 : amb,
      trsf_qty_cor: !cor ? 0 : cor,
      trsf_load_kg: !mass ? 0 : mass,
    };

    const pre = buildBaseTransfersByArm(arm, transfer);

    setLoading(false);

    setData(pre);
  };

  useEffect(() => {
    getBaseTransfers();
  }, [value, arm, temperature, amb, cor, mass]);

  useEffect(() => {
    if (data) {
      // console.log('BaseProductTransfers: data changed and do setFieldsValue. Data:', data);
      form.setFieldsValue({
        base_transfers: data,
      });
    }
  }, [data]);
  
  return (
    <>
    <Spin indicator={null} spinning={isLoading}>
      <Form.Item name="base_transfers">
        <DataTable
          minimal={true}
          data={data}
          height="80vh"
          columns={columns(t, pageState, form, arm)}
          //columns={fields}
        />
      </Form.Item>
      <Row gutter={[8,8]}>
        <Col span={9}>
        </Col>
        <Col span={5}>
          <strong>{t('fields.nomtranObsTotal')} {_.round(_.sumBy(data, 'trsf_bs_qty_amb'), 3)}</strong>
        </Col>
        <Col span={5}>
          <strong>{t('fields.nomtranStdTotal')} {_.round(_.sumBy(data, 'trsf_bs_qty_cor'), 3)}</strong>
        </Col>
        <Col span={5}>
          <strong>{t('fields.nomtranMassTotal')} {_.round(_.sumBy(data, 'trsf_bs_load_kg'), 3)}</strong>
        </Col>
      </Row>
    </Spin>
    </>
  );
};

export default BaseDetails;
