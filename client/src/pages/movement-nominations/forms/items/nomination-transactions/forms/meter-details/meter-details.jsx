import React from 'react';
import {Row, Col, Form, Spin} from 'antd';

import { useTranslation } from 'react-i18next';

import { DataTable } from '../../../../../../../components';
import columns from './columns';
import { useState, useEffect } from 'react';
import _ from 'lodash';

const MeterDetails = ({ form, value, pageState, arm }) => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  //const fields = columns(t);

  const buildMeterTransfersByArm = (prodArms, armCode, prodCmpy, prodCode) => {
    const arms = _.filter(prodArms, (o) => (
      o.stream_armcode === armCode && o.rat_prod_prodcmpy === prodCmpy && o.rat_prod_prodcode === prodCode
    ));
  
    const meters = [];
    if (arms?.length > 0) {
      _.forEach(arms, (arm) => {
        meters.push({
          trsf_opn_amb: null,
          trsf_opn_cor: null,
          trsf_open_kg: null,
          trsf_cls_amb: null,
          trsf_cls_cor: null,
          trsf_close_kg: null,
          trsf_qty_amb: null,
          trsf_qty_cor: null,
          trsf_lode_kg: null,
          trsb_bs: arm?.stream_basecode + ' - ' + arm?.stream_basename,
          trsb_meter: arm?.stream_mtrcode,
          // injector_or_meter: arm?.meter_type_code,
          // trsf_mtr_typ: `${arm?.meter_type_code} - ${arm?.meter_type_desc}`,
          // trsf_cmpt_no: cmptNo,
        });
      });
    }
  
    return meters;
  };

  const getMeterTransfers = () => {
    setLoading(true);

    const pre = buildMeterTransfersByArm(arm, arm?.[0]?.stream_armcode, value?.mvitm_prodcmpy_from, value?.mvitm_prodcode_from);

    setLoading(false);

    setData(pre);
  };

  useEffect(() => {
    getMeterTransfers();
  }, [value, arm]);

  useEffect(() => {
    if (data) {
      // console.log('BaseProductTransfers: data changed and do setFieldsValue. Data:', data);
      form.setFieldsValue({
        meter_transfers: data,
      });
    }
  }, [data]);
  
  return (
    <>
    <Spin indicator={null} spinning={isLoading}>
      <Form.Item name="meter_transfers">
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
          <strong>{t('fields.nomtranObsTotal')} {_.round(_.sumBy(data, 'trsf_qty_amb'), 3)}</strong>
        </Col>
        <Col span={5}>
          <strong>{t('fields.nomtranStdTotal')} {_.round(_.sumBy(data, 'trsf_qty_cor'), 3)}</strong>
        </Col>
        <Col span={5}>
          <strong>{t('fields.nomtranMassTotal')} {_.round(_.sumBy(data, 'trsf_load_kg'), 3)}</strong>
        </Col>
      </Row>
    </Spin>
    </>
  );
};

export default MeterDetails;
