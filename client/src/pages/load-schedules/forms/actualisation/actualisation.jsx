import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Row, Col, notification, Modal, Upload, Card, Tag, Select, Switch } from 'antd';
import {
  CloseOutlined,
  QuestionCircleOutlined,
  SyncOutlined,
  UploadOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import useSWR, { mutate } from 'swr';

import { DataTable } from '../../../../components';
import api, { LOAD_SCHEDULES } from '../../../../api';
import columns from './columns';
import { calcBaseQuantity } from '../../../../utils';
import buildPayloadToActualise from './actualisation-builder';

const Actualisation = ({ value, onClose, config }) => {
  const { t } = useTranslation();

  const [selected, setSelected] = useState(null);
  const [invalid, setInvalid] = useState(false);
  const [manualProducts, setManualProducts] = useState([]);
  const [baseTanks, setBaseTanks] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [manualActualisation, setManualActualisation] = useState(true);

  const { data: cmptRecords } = useSWR(
    `${LOAD_SCHEDULES.MANUAL_COMPARTMENTS}?shls_trip_no=${value?.shls_trip_no}&supplier_code=${value?.supplier_code}`,
    {
      //refreshInterval: 0,
      revalidateOnFocus: false,
    }
  );

  const { data: mpRecords } = useSWR(
    `${LOAD_SCHEDULES.GET_MP}?trip_no=${value?.shls_trip_no}&supplier=${value?.supplier_code}`,
    {
      //refreshInterval: 0,
      revalidateOnFocus: false,
    }
  );
  const [form] = Form.useForm();
  const fields = columns(t, config, form);

  const onFinish = () => {
    const bases = manualProducts?.filter(
      (o) =>
        selected &&
        selected?.length > 0 &&
        _.find(selected, (bt) => bt === o.pitem_base_code + ',' + o.tank_code)
      // !selected || selected?.length===0 || _.find(selected, (bt)=>(bt === o.pitem_base_code+','+o.tank_code))
    );
    value.compartments = cmptRecords?.records || [];
    const payload = buildPayloadToActualise(value, bases, manualActualisation);
    console.log('actual bases', payload);
    Modal.destroyAll();
    onClose(payload);
  };

  const onItemValidation = (items, showWarning = true) => {
    console.log('..............onItemValidation....', items);
    const errors = [];
    const codes = [];

    if (errors.length > 0) {
      const lines = (
        <>
          {errors?.map((error, index) => (
            <Card key={error.key} size="small" title={error.field}>
              {error.message}
            </Card>
          ))}
        </>
      );

      if (showWarning) {
        notification.error({
          message: t('validate.lineItemValidation'),
          description: lines,
          // duration: 0,
          style: {
            height: errors.length > 10 ? '900px' : `${errors.length * 80 + 100}px`,
            width: '30vw',
            overflowY: 'scroll',
          },
        });
      }
    }

    return errors;
  };

  const extra = <></>;

  const onBaseTankChange = (options) => {
    console.log('..........base tanks', options);

    setSelected(options);

    const bases = [];
    let found = false;
    for (let i = 0; i < options?.length; i++) {
      const item = options?.[i];
      const arr = item?.split(',');
      console.log('onBaseTankChg', options, item, arr, bases);
      if (bases?.indexOf(arr[0]) < 0) {
        bases.push(arr[0]);
      } else {
        found = true;
        notification.error({
          message: t('messages.actualiseOneBaseOneTank'),
          description: t('descriptions.actualiseOneBaseOneTank'),
        });
        break;
      }
    }
    setInvalid(found);
  };

  useEffect(() => {
    async function caclManualProducts(mpRecords, cmptRecords) {
      const products = [];
      const tanks = [];
      setLoading(true);
      for (let i = 0; i < mpRecords?.records?.length; i++) {
        const o = mpRecords?.records?.[i];
        const cmpt = _.find(
          cmptRecords?.records,
          (c) =>
            String(c?.compartment) === String(o?.schd_comp_id) &&
            c?.prod_cmpy === o?.schdprod_prodcmpy &&
            c?.prod_code === o?.schdprod_prodcode
        );
        const type = String(o?.schd_units) === '11' ? 'L15' : String(o?.schd_units) === '17' ? 'KG' : 'LT';
        const base = {};
        base.base_tank = o?.tank_code;
        base.base_code = o?.pitem_base_code;
        base.base_temp = o?.tank_temp;
        base.base_dens = o?.tank_density;
        const scheduled_auto = cmpt?.qty_scheduled * (o?.pitem_ratio_total_auto / o?.pitem_ratio_total);
        const scheduled_manual = cmpt?.qty_scheduled * (o?.pitem_ratio_total_manual / o?.pitem_ratio_total);
        const loaded_auto = cmpt?.qty_loaded - cmpt?.qty_loaded_m;
        const loaded_manual = cmpt?.qty_loaded_m;
        if (o.pitem_base_manual === 'Y') {
          const percent = _.toNumber(o?.pitem_ratio_value) / _.toNumber(o?.pitem_ratio_total_manual);
          o.pitem_ratio_qty = _.round(
            (scheduled_manual - (loaded_manual || 0) - (cmpt?.qty_preload || 0)) * percent,
            3
          );
        } else {
          const percent = _.toNumber(o?.pitem_ratio_value) / _.toNumber(o?.pitem_ratio_total_auto);
          o.pitem_ratio_qty = _.round(
            (scheduled_auto - (loaded_auto || 0) - (cmpt?.qty_preload || 0)) * percent,
            3
          );
        }

        base.qty_amb = type === 'LT' ? o?.pitem_ratio_qty : 0;
        base.qty_cor = type === 'L15' ? o?.pitem_ratio_qty : 0;
        base.load_kg = type === 'KG' ? o?.pitem_ratio_qty : 0;
        base.qty_amb_real = type === 'LT' ? o?.pitem_ratio_qty : 0;
        base.qty_cor_real = type === 'L15' ? o?.pitem_ratio_qty : 0;
        base.load_kg_real = type === 'KG' ? o?.pitem_ratio_qty : 0;

        const newbase = await calcBaseQuantity(base, type);
        products.push({
          ...o,
          pitem_base_manual: o?.pitem_base_manual === 'Y' ? true : false,
          base_qty_amb: newbase.qty_amb, // _real,
          base_qty_cor: newbase.qty_cor, // _real,
          base_load_kg: newbase.load_kg, // _real,
          qty_scheduled: cmpt?.qty_scheduled,
          qty_scheduled_auto: scheduled_auto,
          qty_scheduled_manual: scheduled_manual,
          qty_loaded: cmpt?.qty_loaded,
          qty_loaded_auto: _.round(loaded_auto, 3),
          qty_loaded_manual: loaded_manual,
          qty_preload: cmpt?.qty_preload,
        });

        const item = _.find(
          tanks,
          (tk) => tk.tank_code === o.tank_code && tk.pitem_base_code === o.pitem_base_code
        );
        if (!item) {
          tanks.push({
            pitem_base_code: o.pitem_base_code,
            pitem_base_desc: o.pitem_base_desc,
            pitem_base_manual: o.pitem_base_manual,
            tank_code: o.tank_code,
            tank_temp: o.tank_temp,
            tank_density: o.tank_density,
          });
        }
      }
      setManualProducts(products);
      setBaseTanks(tanks);
      setLoading(false);
    }
    if (mpRecords && cmptRecords) {
      caclManualProducts(mpRecords, cmptRecords);
    }
  }, [mpRecords, cmptRecords]);

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError style={{ marginTop: '1rem' }}>
      <Row gutter={[8, 10]}>
        <Col span={4}>{`${t('fields.supplier')}: `}</Col>
        <Col span={8}>{`${value?.supplier_code} - ${value?.supplier}`}</Col>
        <Col span={4}>{`${t('fields.tripNumber')}: `}</Col>
        <Col span={8}>{`${value?.shls_trip_no}`}</Col>
      </Row>
      <Row gutter={[8, 10]}>
        <Col span={4}>{`${t('fields.drawer')}: `}</Col>
        <Col span={8}>{`${value?.drawer_code} - ${value?.drawer_name}`}</Col>
        <Col span={4}>{`${t('fields.tanker')}: `}</Col>
        <Col span={8}>{`${value?.tnkr_code} - ${value?.tnkr_name}`}</Col>
      </Row>

      <Row gutter={[8, 10]}>
        <Col span={18}>
          <Select
            dropdownMatchSelectWidth={false}
            style={{ width: '100%' }}
            allowClear
            loading={isLoading}
            showSearch
            mode="multiple"
            onChange={onBaseTankChange}
            optionFilterProp="children"
            placeholder={
              manualActualisation
                ? t('placeholder.selectManualBaseTank')
                : t('placeholder.selectAutoBaseTank')
            }
            filterOption={(value, option) =>
              option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
            }
          >
            {baseTanks
              ?.filter((o) =>
                manualActualisation ? o.pitem_base_manual === 'Y' : o.pitem_base_manual !== 'Y'
              )
              .map((item, index) => (
                <Select.Option key={index} value={`${item.pitem_base_code},${item.tank_code}`}>
                  {`${item.pitem_base_desc} - ${item.tank_code} [${item.tank_temp} C, ${item.tank_density} kg/m3]`}
                </Select.Option>
              ))}
          </Select>
        </Col>
        <Col span={6}>
          <Switch
            checked={manualActualisation}
            checkedChildren={<span>{t('operations.manualActualisationOn')}</span>}
            unCheckedChildren={<span>{t('operations.manualActualisationOff')}</span>}
            onChange={(value) => setManualActualisation(value)}
          />
        </Col>
      </Row>

      <DataTable
        minimal={true}
        data={manualProducts?.filter(
          (o) =>
            !selected ||
            selected?.length === 0 ||
            _.find(selected, (bt) => bt === o.pitem_base_code + ',' + o.tank_code)
        )}
        isLoading={isLoading}
        columns={fields}
        //selectionMode="multiple"
        // extra={extra}
        //handleSelect={(value) => handleSelection(value[0])}
        //onClick={(value) => handleSelection(value)}
        // onCellUpdate={(value) => onCellUpdate(value)}
        height={'40vh'}
      />

      <div style={{ marginTop: '2rem' }}>
        <Tag color="red" style={{ float: 'left', width: '50vw' }}>
          <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontWeight: 'bold', color: 'red' }}>
            {t('descriptions.actualiseTanks')}
          </div>
        </Tag>
        <Button
          htmlType="button"
          icon={<CloseOutlined />}
          style={{ float: 'right' }}
          disabled={isLoading}
          onClick={() => Modal.destroyAll()}
        >
          {t('operations.cancel')}
        </Button>

        <Button
          type="primary"
          htmlType="submit"
          icon={<EditOutlined />}
          style={{ float: 'right', marginRight: 5 }}
          disabled={invalid || isLoading || !selected || selected?.length === 0}
        >
          {t('operations.actualise')}
        </Button>
      </div>
    </Form>
  );
};

export default Actualisation;
