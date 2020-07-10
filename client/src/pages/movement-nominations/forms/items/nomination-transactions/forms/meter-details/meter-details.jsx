import React from 'react';
import {Row, Col} from 'antd';

import { useTranslation } from 'react-i18next';

import { DataTable } from '../../../../../../../components';
import columns from './columns';
import { useState } from 'react';
import _ from 'lodash';

const MeterDetails = ({ form, value, pageState, arm }) => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  //const fields = columns(t);

  return (
    <>
      <DataTable
        minimal={true}
        data={[]}
        height="80vh"
        columns={columns(t, pageState, form, arm)}
        //columns={fields}
      />
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
    </>
  );
};

export default MeterDetails;
