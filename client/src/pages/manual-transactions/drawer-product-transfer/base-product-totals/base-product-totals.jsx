import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Spin, Row, Col } from 'antd';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import columns from './columns';
import api, { MANUAL_TRANSACTIONS } from '../../../../api';
import { calcBaseRatios } from '../../../../utils';

import { buildBaseTransfers, buildBaseTotals } from '../../data-builder';

const BaseProductTotals = ({
  form,
  sourceType,
  selected,
  transfers,
  productArms,
  clicked,
  updating,
  setUpdating,
  setChildTableAPI,
  dataBoard,
  setDataBoard,
  data,
  setData,
  dataLoaded,
  setDataLoaded,
  config,
}) => {
  const { t } = useTranslation();

  const [obsTotal, setObsTotal] = useState(0);
  const [stdTotal, setStdTotal] = useState(0);
  const [massTotal, setMassTotal] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [dataRendered, setDataRendered] = useState(false);

  const fields = columns(t, config);

  const sumBaseTotals = (totals) => {
    const obs = _.sumBy(totals, 'trsf_bs_qty_amb_tot');
    const std = _.sumBy(totals, 'trsf_bs_qty_cor_tot');
    const mass = _.sumBy(totals, 'trsf_bs_load_kg_tot');
    setObsTotal(obs);
    setStdTotal(std);
    setMassTotal(mass);
  };

  const adjustBaseTotals = (items) => {
    const totals = [];
    // console.log('BaseProductTotals: adjustBaseTotals - start', items);
    let itemExisted = false;

    _.forEach(items, (item) => {
      itemExisted = false;
      for (let index = 0; index < totals.length; index++) {
        const total = totals[index];
        if (
          total.trsf_bs_prodcd_tot === item.trsf_bs_prodcd_tot &&
          total.trsf_bs_tk_cd_tot === item.trsf_bs_tk_cd_tot
        ) {
          total.trsf_bs_qty_amb_tot =
            _.toNumber(total.trsf_bs_qty_amb_tot) + _.toNumber(item.trsf_bs_qty_amb_tot);
          total.trsf_bs_qty_cor_tot =
            _.toNumber(total.trsf_bs_qty_cor_tot) + _.toNumber(item.trsf_bs_qty_cor_tot);
          total.trsf_bs_load_kg_tot =
            _.toNumber(total.trsf_bs_load_kg_tot) + _.toNumber(item.trsf_bs_load_kg_tot);
          total.trsf_bs_temp_mass_tot =
            _.toNumber(total.trsf_bs_temp_mass_tot) + _.toNumber(item.trsf_bs_temp_mass_tot);
          total.trsf_bs_temp_tot =
            _.toNumber(total.trsf_bs_load_kg_tot) > 0
              ? _.toNumber(total.trsf_bs_temp_mass_tot) / _.toNumber(total.trsf_bs_load_kg_tot)
              : null;
          // console.log('.........basetotals calc: ', total.trsf_bs_temp_tot, total.trsf_bs_load_kg_tot, total.trsf_bs_temp_mass_tot)
          totals[index] = total;
          itemExisted = true;
        }
      }
      if (!itemExisted) {
        // item.trsf_bs_temp_tot = null;
        item.trsf_bs_temp_mass_tot = _.toNumber(item.trsf_bs_load_kg_tot) * _.toNumber(item.trsf_bs_temp_tot);
        // console.log('.........basetotals init: ', item.trsf_bs_temp_tot, item.trsf_bs_load_kg_tot, item.trsf_bs_temp_mass_tot)
        totals.push(item);
      }
    });
    // console.log('BaseProductTotals: adjustBaseTotals - end', totals);

    // adjust sum totals
    sumBaseTotals(totals);

    return totals;
  };

  const getBaseTotals = () => {
    setLoading(true);

    const pre = buildBaseTotals(productArms, transfers);

    setLoading(false);
    if (!dataLoaded || !dataLoaded?.base_totals || dataLoaded?.base_totals?.length === 0) {
      setData(adjustBaseTotals(pre));
    } else {
      setData(dataLoaded.base_totals);
      sumBaseTotals(dataLoaded.base_totals);
      // const loaded = _.clone(dataLoaded);
      // loaded.base_totals = [];
      // // setDataLoaded(loaded);
      // console.log('MT 4 - BaseTotals: data are loaded!');
    }
  };

  useEffect(() => {
    getBaseTotals();
  }, [selected, transfers, productArms, dataLoaded]);

  useEffect(() => {
    if (data) {
      // console.log('BaseProductTotals: data changed and do setFieldsValue. Data:', data);
      form.setFieldsValue({
        base_totals: data,
      });
      setDataRendered(true);
    }
  }, [data]);

  useEffect(() => {
    let board = dataBoard;
    if (!board) {
      board = {};
    }
    board.base_totals = data;
    setDataBoard(board);
  }, [data]);

  useEffect(() => {
    // console.log('BaseProductTotals: base quantity totals changed on clicked', clicked);
    getBaseTotals();
    setUpdating(false);
  }, [clicked]);

  useEffect(() => {
    if (data?.length > 0) {
      // console.log("BaseProductTotals: sourceType changed", sourceType);
      setData([]);
    }
  }, [sourceType]);

  const onCellUpdate = (value) => {
    // console.log('BaseProductTotals: onCellUpdate', value);

    const bases = _.clone(data);
    let index = 0;
    for (index = 0; index < bases.length; index++) {
      const base = bases[index];
      if (
        base.trsf_bs_prodcd_tot === value?.data?.trsf_bs_prodcd_tot &&
        base.trsf_bs_tk_cd_tot === value?.data?.trsf_bs_tk_cd_tot
      ) {
        if (value?.colDef?.field === 'trsf_bs_den_tot' || value?.colDef?.field === 'trsf_bs_qty_amb_tot') {
          bases[index] = value?.data;
          setData(bases);
        }
        break;
      }
    }
    //setChildTableAPI.updateRowData({ update: [base] });

    /* console.log('DrawerProductTransfers: onCellUpdate2', value?.colDef?.field, value?.colDef?.headerName, value?.value, value?.newValue, value?.data.trsf_cmpt_capacit);
    if (
      value?.colDef?.field === 'trsf_qty_amb' || 
      value?.colDef?.field === 'trsf_qty_cor' ||
      value?.colDef?.field === 'trsf_load_kg' 
    ) {
      if (_.toNumber(value?.newValue) > _.toNumber(value?.data.trsf_cmpt_capacit)) {
        notification.error({
          message: t('validate.outOfRange'),
          description: value?.colDef?.headerName + ': ' + value?.newValue + ', ' + 
          t('fields.compartment') + ' ' + t('fields.capacity') + ': ' + value?.data.trsf_cmpt_capacit,
        });
      }
    }
    setSelected({
      ...value?.data,
    }); */
  };

  return (
    <Spin indicator={null} spinning={isLoading}>
      <Form.Item name="base_totals">
        <DataTable
          // isLoading={updating}
          isLoading={updating}
          minimal={true}
          data={data}
          height="70vh"
          columns={fields}
          apiContext={setChildTableAPI}
          onCellUpdate={(value) => onCellUpdate(value)}
          editType={false}
        />
      </Form.Item>

      <Row gutter={[8, 8]}>
        <Col span={config?.siteMassFieldMode === 3 ? 4 : 9}></Col>
        <Col span={5}>
          {/* <strong>{t('fields.nomtranObsTotal')} {_.round(obsTotal, 3)}</strong> */}
          <strong>
            {t('fields.nomtranObsTotal')} {_.round(_.sumBy(data, 'trsf_bs_qty_amb_tot'), 3)}
          </strong>
        </Col>
        <Col span={5}>
          {/* <strong>{t('fields.nomtranStdTotal')} {_.round(stdTotal, 3)}</strong> */}
          <strong>
            {t('fields.nomtranStdTotal')} {_.round(_.sumBy(data, 'trsf_bs_qty_cor_tot'), 3)}
          </strong>
        </Col>
        {config?.siteMassInVacuum && (
          <Col span={5}>
            {/* <strong>{t('fields.nomtranMassTotal')} {_.round(massTotal, 3)}</strong> */}
            <strong>
              {t('fields.nomtranMassTotal')} {_.round(_.sumBy(data, 'trsf_bs_load_kg_tot'), 3)}
            </strong>
          </Col>
        )}
        {config?.siteMassInAir && (
          <Col span={5}>
            <strong>
              {t('fields.massInAir') + ': '}{' '}
              {_.round(
                _.sumBy(data, 'trsf_bs_load_kg_tot') -
                  _.sumBy(data, 'trsf_bs_qty_cor_tot') * config?.airBuoyancyFactor,
                3
              )}
            </strong>
          </Col>
        )}
      </Row>
    </Spin>
  );
};

export default BaseProductTotals;
