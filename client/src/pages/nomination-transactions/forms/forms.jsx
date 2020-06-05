import React, { useState, useEffect, useCallback } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
  CalculatorOutlined,
  ReloadOutlined,
  SaveOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, Modal, notification, message, Drawer, Divider, Row, Col, Space, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import _ from 'lodash';
import useSWR from 'swr';
import jwtDecode from 'jwt-decode';

import {
  NominationId,
  NominationKey,
  NominationTerminal,
  NominationItemId,
  NominationItemKey,
  NominationItemStatus,
  NominationItemType,
  NominationItemBol,
  ItemEffectTime,
  Carrier,
  Tanker,
  ItemExpiryTime,
} from './head-fields';

import {
  SourcePlant,
  SourceProduct,
  SourceArm,
  SourceTank,
  DestinationPlant,
  DestinationProduct,
  DestinationTank,
  Comment,
} from './move-fields';

import {
  PlanQty,
  AvailQty,
  ObsQty,
  StdQty,
  ObsMass,
  ObsTemp,
  StdDensity,
  AltQty,
  AltQtyUnit,
} from './calc-fields';

import { DataTable } from '../../../components';
import { SETTINGS } from '../../../constants';
import { NOMINATION_TRANSACTIONS } from '../../../api';
import BaseDetails from './base-details/base-details';
import MeterDetails from './meter-details/meter-details';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, pageState }) => {
  const [drawerWidth, setDrawerWidth] = useState('80vw');
  const [mainTabOn, setMainTabOn] = useState(true);
  const [disableCalculation, setDisableCalculation] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  /*
  											   (C_MovementNominationTransactions.TEMP_AMB.length>0)&amp;&amp;
											   (C_MovementNominationTransactions.DENS_COR.length>0)&amp;&amp;
											   (
											   ((C_MovementNominationTransactions.QTY_AMB.length>0))||
											   ((C_MovementNominationTransactions.QTY_COR.length>0))||
											   ((C_MovementNominationTransactions.MASS_AMB.length>0))
											   )											   

  */

  console.log("value", value);

  const { data: units } = useSWR(NOMINATION_TRANSACTIONS.UNIT_TYPES);

  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { setFieldsValue, resetFields, validateFields } = form;

  const [carrier, setCarrier] = useState(value?.mvitm_carrier);
  const [tanker, setTanker] = useState(value?.mvitm_tanker);
  const [tankFrom, setTankFrom] = useState([]);//value?.mvitm_tank_from);
  const [tankTo, setTankTo] = useState([]);//value?.mvitm_tank_to);
  const [tank, setTank] = useState([]);//value?.mvitm_tank_to);
  const [arm, setArm] = useState(value?.mvitm_arm);
  const [calcSource, setCalcSource] = useState(null);
  const [altQty, setAltQty] = useState(null);

  const [selected, setSelected] = useState(null);

  const IS_CREATING = !value;

  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const user_code = decoded?.per_code;

  const doTabChanges = (tabPaneKey) => {
    if (tabPaneKey === "1") {
      setDrawerWidth('80vw');
      setMainTabOn(true);
    }
    else {
      setDrawerWidth('90vw');
      setMainTabOn(false);
    }
  }

  const onFormClosed = () => {
    handleFormState(false, null);
    setDrawerWidth('80vw');
    setMainTabOn(true);
  };

  const onComplete = () => {
    console.log("start of onComplete");
    handleFormState(false, null);
    setDrawerWidth('80vw');
    setMainTabOn(true);
    setSelected(null);
    console.log("end of onComplete");
  };

  const preparePayload = (values) => {
    const payload = {};
    
    payload.operator_code = user_code;  //Will force to use 8888in backend because baiman uses 8888
    payload.tanker_code = values?.mvitm_tanker;
    payload.mvitm_item_id = values?.mvitm_item_id;
    payload.temperature = values?.mlitm_temp_amb;
    payload.amb_vol = values?.mlitm_qty_amb;
    payload.cor_vol = values?.mlitm_qty_cor;
    payload.liq_kg = values?.mlitm_qty_kg;
    payload.density = values?.mlitm_dens_cor;
    payload.start_time = values?.mvitm_dtim_effect?.format(SETTINGS.DATE_TIME_FORMAT);
    payload.end_time = values?.mvitm_dtim_expiry?.format(SETTINGS.DATE_TIME_FORMAT);
    
    if (!!(values?.mvitm_tank_from)) {
      payload.from_tank = values?.mvitm_tank_from;
      payload.from_supplier = value?.mvitm_prodcmpy_from;
      payload.from_product = value?.mvitm_prodcode_from;
    }
    
    if (!!(values?.mvitm_tank_to)) {
      payload.to_tank = values?.mvitm_tank_to;
      payload.to_supplier = value?.mvitm_prodcmpy_to;
      payload.to_product = value?.mvitm_prodcode_to;
    }

    if (!!(values?.mlitm_qty_rpt)) {
      payload.alternate_qty = values?.mlitm_qty_rpt;
    }
    if (!!(values?.mlitm_unit_rpt)) {
      payload.alternate_unit = values?.mlitm_unit_rpt;
    }

    return payload;
  };

  const onSubmit = () => {
    Modal.confirm({
      title: t('prompts.submit'),
      okText: t('operations.yes'),
      okType: 'primary',
      cancelText: t('operations.no'),
      icon: <QuestionCircleOutlined />,
      centered: true,
      onOk: async () => {
        try {
          const values = await form.validateFields();
          console.log("await values", values);
          console.log("await value", value);
          await axios
            .post(NOMINATION_TRANSACTIONS.SUBMIT, preparePayload(values))
            .then(
              axios.spread((response) => {
                //Modal.destroyAll();
                onComplete();

                notification.success({
                  message: t('messages.submitSuccess'),
                  description: t('descriptions.submitSuccess'),
                });
              })
            )
            .catch((error) => {
              notification.error({
                message: error.message,
                description: t('descriptions.submitFailed'),
              });
            });
        } catch (error) {
          message.error({
            key: 'submit',
            content: t('descriptions.validationFailed'),
          });
        }
      },
    });
  };

  const onCalculate = () => {
    Modal.confirm({
      title: t('prompts.calculate'),
      okText: t('operations.yes'),
      okType: 'primary',
      cancelText: t('operations.no'),
      icon: <QuestionCircleOutlined />,
      centered: true,
      onOk: async () => {
        try {
          const values = await form.validateFields();
          await axios
            .post(NOMINATION_TRANSACTIONS.CALCULATE, {
              frm_baseCd: value?.mvitm_prodcode_to,
              frm_which_type: calcSource?.type,//'LT',
              frm_real_amount: calcSource?.qty, //values.mlitm_qty_amb,
              frm_real_temp: values?.mlitm_temp_amb,
              frm_real_dens: values?.mlitm_dens_cor,
            })
            .then((response) => {
              form.setFieldsValue({
                mlitm_qty_amb: response?.data?.real_litre,
                mlitm_qty_cor: response?.data?.real_litre15,
                mlitm_qty_kg: response?.data?.real_kg,
              });
              console.log("before change vaalue", value);
              /* value.mlitm_qty_amb = response?.data?.real_litre;
              value.mlitm_qty_cor = response?.data?.real_litre15;
              value.mlitm_qty_kg = response?.data?.real_kg;
              value.mlitm_temp_amb = values?.mlitm_temp_amb;
              value.mlitm_dens_cor = values?.mlitm_dens_cor; */
              console.log("after change vaalue", value);
            });
        } catch (error) {
          message.error({
            key: 'calc',
            content: t('descriptions.validationFailed'),
          });
        }
      },
    });
  };

  useEffect(() => {
    if (!value && !visible) {
      resetFields();
      setSelected(null);
    }
  }, [value, visible, resetFields, setSelected]);

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      onClose={onFormClosed}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width={drawerWidth}
      visible={visible}
      footer={
        <>
          <Button
            type="ghost"
            icon={<SaveOutlined />}
            htmlType="button"
            disabled={isUpdating}
            onClick={onSubmit}
            style={{ float: 'right', marginRight: 5 }}
          >
            {t('operations.submit')}
          </Button>

          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => Modal.destroyAll()}
          >
            {t('operations.cancel')}
          </Button>
        </>
      }
    >
      <Form 
        layout="vertical" 
        form={form} 
        scrollToFirstError 
        initialValues={{
          mvitm_move_id: value?.mvitm_move_id, 
          mvitm_key: value?.mvitm_key, 
          mvitm_terminal: value?.mvitm_terminal,
          mvitm_item_id: value?.mvitm_item_id, 
          mvitm_item_key: value?.mvitm_item_key,
          mvitm_status: value?.mvitm_status, 
          mvitm_type: value?.mvitm_type,
          mvitm_tas_ref: value?.mvitm_tas_ref, 
          //mvitm_dtim_effect: value?.mvitm_dtim_effect,
          mvitm_carrier: value?.mvitm_carrier, 
          mvitm_tanker: value?.mvitm_tanker,
          //mvitm_dtim_expiry: value?.mvitm_dtim_expiry, 
          mvitm_plant_from: value?.mvitm_plant_from,
          //mvitm_prodcode_from: '400003057',
          mvitm_prodname_from: value?.mvitm_prodname_from, 
          mvitm_arm: value?.mvitm_arm,
          mvitm_tank_from: value?.mvitm_tank_from, 
          mvitm_plant_to: value?.mvitm_plant_to,
          //mvitm_prodcode_to: '400000257',
          mvitm_prodname_to: value?.mvitm_prodname_to,
          mvitm_tank_to: value?.mvitm_tank_to, 
          mvitm_prod_qty: value?.mvitm_prod_qty,
          mvitm_avail_qty: 12345,
          //mvitm_avail_qty: (_.toNumber(value?.mvitm_prod_qty) - _.toNumber(value?.mvitm_qty_schd)),
        }}
      >

        <Row gutter={[8, 1]}>
          <Col span={8}>
            <NominationId form={form} value={value} pageState={pageState} />
          </Col>

          <Col span={8}>
            <NominationKey form={form} value={value} pageState={pageState} />
          </Col>

          <Col span={8}>
            <NominationTerminal form={form} value={value} pageState={pageState} />
          </Col>
        </Row>

        <Row gutter={[8, 1]}>
          <Col span={8}>
            <NominationItemId form={form} value={value} pageState={pageState} />
          </Col>

          <Col span={8}>
            <NominationItemKey form={form} value={value} pageState={pageState} />
          </Col>

          <Col span={8}>
            <NominationItemStatus form={form} value={value} pageState={pageState} />
          </Col>
        </Row>

        <Divider style={{ margin: '0px 0' }} />

        <Row gutter={[8, 1]}>
          <Col span={8}>
            <NominationItemType form={form} value={value} pageState={pageState} />
          </Col>

          <Col span={8}>
            <NominationItemBol form={form} value={value} pageState={pageState} />
          </Col>

          <Col span={8}>
            <ItemEffectTime form={form} value={value} pageState={pageState} />
          </Col>
        </Row>
  
        <Row gutter={[8, 1]}>
          <Col span={8}>
            <Carrier form={form} value={value} onChange={setCarrier} pageState={pageState} />
          </Col>

          <Col span={8}>
            <Tanker form={form} value={value} carrier={carrier} onChange={setTanker} pageState={pageState} />
          </Col>

          <Col span={8}>
            <ItemExpiryTime form={form} value={value} pageState={pageState} />
          </Col>
        </Row>

        {/* <Divider style={{ margin: '0px 0' }} /> */}

        <Row gutter={[8, 1]}>
          <Col span={16}>
            <Row gutter={[8, 1]}>
              <Col span={12}>
                <Card size="small" title={t('fields.nomtranFromTitle')}>
                <Row gutter={[8, 1]}>
                  <Col span={24}>
                    <SourcePlant form={form} value={value} pageState={pageState} />
                  </Col>
                </Row>
                
                <Row gutter={[8, 1]}>
                  <Col span={24}>
                    <SourceProduct form={form} value={value} pageState={pageState} />
                  </Col>
                </Row>
                
                <Row gutter={[8, 1]}>
                  <Col span={24}>
                    <SourceArm form={form} value={value} onChange={setArm} pageState={pageState} />
                  </Col>
                </Row>
                
                <Row gutter={[8, 1]}>
                  <Col span={24}>
                    <SourceTank form={form} value={value} onChange={setTank} arm={arm} pageState={pageState} />
                  </Col>
                </Row>
                </Card>
              </Col>

              <Col span={12}>
                <Card size="small" title={t('fields.nomtranToTitle')}>
                <Row gutter={[8, 1]}>
                  <Col span={24}>
                    <DestinationPlant form={form} value={value} pageState={pageState} />
                  </Col>
                </Row>
                
                <Row gutter={[8, 1]}>
                  <Col span={24}>
                    <DestinationProduct form={form} value={value} pageState={pageState} />
                  </Col>
                </Row>
                
                <Row gutter={[8, 73]}>
                  <Col span={24}>
                  </Col>
                </Row>
                
                <Row gutter={[8, 1]}>
                  <Col span={24}>
                    <DestinationTank form={form} value={value} onChange={setTank} pageState={pageState} />
                  </Col>
                </Row>
                </Card>
              </Col>
            </Row>
            
            <Row gutter={[8, 1]}>
              <Col span={24}>
                <Comment form={form} value={value} pageState={pageState} />
              </Col>
            </Row>

          </Col>

          <Col span={8}>
            <Card size="small" title={t('divider.calculation')}>
            <Row gutter={[8, 1]}>
              <Col span={12}>
                <PlanQty form={form} value={value} pageState={pageState} />
              </Col>

              <Col span={12}>
                <AvailQty form={form} value={value} pageState={pageState} />
              </Col>
            </Row>
            
            <Row gutter={[8, 1]}>
              <Col span={12}>
                <ObsQty form={form} value={value} onChange={setCalcSource} pageState={pageState} />
              </Col>

              <Col span={12}>
                <Row gutter={[8, 30]}>
                  <Col span={24}>
                  </Col>
                </Row>
                <Row gutter={[8, 1]}>
                  <Col span={10}>
                  </Col>
                  <Col span={14}>
                    <Form.Item>
                      {!disableCalculation && (
                        <Button
                          htmlType="button"
                          icon={<CalculatorOutlined />}
                          style={{ marginRight: 5 }}
                          onClick={onCalculate}
                        >
                          {t('operations.calculate')}
                        </Button>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
              
            <Row gutter={[8, 1]}>
              <Col span={12}>
                <StdQty form={form} value={value} onChange={setCalcSource} pageState={pageState} />
              </Col>

              <Col span={12}>
                <ObsMass form={form} value={value} onChange={setCalcSource} pageState={pageState} />
              </Col>
            </Row>
              
            <Row gutter={[8, 1]}>
              <Col span={12}>
                <ObsTemp form={form} value={value} pageState={pageState} />
              </Col>
              
              <Col span={12}>
                <StdDensity form={form} value={value} tank={tank} pageState={pageState} />
              </Col>
            </Row>
            </Card>
            
            <Row gutter={[8, 1]}>
              <Col span={12}>
                <AltQty form={form} value={value} onChange={setAltQty} pageState={pageState} />
              </Col>

              <Col span={12}>
                <AltQtyUnit form={form} value={value} altQty={altQty} pageState={pageState} />
              </Col>
            </Row>
          </Col>
        </Row>

        <Card size="small" title={t('divider.baseProducts')}>
        <Row gutter={[8, 1]}>
          <Col span={24}>
            <BaseDetails form={form} value={value} pageState={pageState} arm={arm} />
          </Col>
        </Row>
        </Card>
        
        <Card size="small" title={t('divider.meters')}>
        <Row gutter={[8, 1]}>
          <Col span={24}>
            <MeterDetails form={form} value={value} pageState={pageState} arm={arm} />
          </Col>
        </Row>
        </Card>

      </Form>
      {/* <Period visible={showPeriod && CAN_ORDER_PERIOD} setVisibility={setShowPeriod} selected={selected} order={value} form={form} /> */}
    </Drawer>
  );
};

export default FormModal;
