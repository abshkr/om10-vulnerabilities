import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Form, Modal, Input, notification, DatePicker, Row, Col, message } from 'antd';
import moment from 'dayjs';
import _ from 'lodash';
import FromSupplier from './fields/from-supplier';
import ToSupplier from './fields/to-supplier';
import MvKey from './fields/mv_key';
import api, { PRODUCT_MOVEMENTS } from 'api';
import { getDateTimeFormat, calcWiA } from 'utils';
import { SETTINGS } from '../../../constants';

const MakeNomination = ({ value, config, t, visible, setVisible, onComplete }) => {
  const [form] = Form.useForm();
  const FORMAT = getDateTimeFormat();

  const [disabled, setDisabled] = useState(false);

  const { setFieldsValue } = form;

  const { data: folioStart } = useSWR(`${PRODUCT_MOVEMENTS.START_FOLIO}?pmv_number=${value?.pmv_number}`);
  const { data: folioEnd } = useSWR(`${PRODUCT_MOVEMENTS.END_FOLIO}?pmv_number=${value?.pmv_number}`);
  const { data: bayLoaded } = useSWR(`${PRODUCT_MOVEMENTS.BAY_LOADED}?pmv_number=${value?.pmv_number}`);

  const validateDate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.pmvDateTime')}`);
      }
    }

    return Promise.resolve();
  };

  const validateObsQty = (rule, input) => {
    if ((rule.required && input === '') || (rule.required && input !== 0 && !input)) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.pmvObsQty')}`);
    }

    const number = _.toNumber(input);
    const invalid = _.isNaN(number);

    const decimals = _.toString(number).split('.')[1]?.length || 0;

    if (input && input !== '' && invalid) {
      return Promise.reject(`${t('validate.wrongType')}: ${t('validate.mustBeNumber')}`);
    }

    if (input !== '' && !invalid && number <= 0) {
      return Promise.reject(`${t('validate.positiveNumber')}`);
    }

    if (decimals > config?.precisionVolume) {
      return Promise.reject(
        `${t('validate.decimalPlacesExceeded')} ${config?.precisionVolume} ─ ${t(
          'descriptions.invalidDecimals'
        )}`
      );
    }

    return Promise.resolve();
  };

  const validateStdQty = (rule, input) => {
    if ((rule.required && input === '') || (rule.required && input !== 0 && !input)) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.pmvStdQty')}`);
    }

    const number = _.toNumber(input);
    const invalid = _.isNaN(number);

    const decimals = _.toString(number).split('.')[1]?.length || 0;

    if (input && input !== '' && invalid) {
      return Promise.reject(`${t('validate.wrongType')}: ${t('validate.mustBeNumber')}`);
    }

    if (input !== '' && !invalid && number <= 0) {
      return Promise.reject(`${t('validate.positiveNumber')}`);
    }

    if (decimals > config?.precisionVolume) {
      return Promise.reject(
        `${t('validate.decimalPlacesExceeded')} ${config?.precisionVolume} ─ ${t(
          'descriptions.invalidDecimals'
        )}`
      );
    }

    return Promise.resolve();
  };

  const validateWiV = (rule, input) => {
    if ((rule.required && input === '') || (rule.required && input !== 0 && !input)) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.pmvWiV')}`);
    }

    const number = _.toNumber(input);
    const invalid = _.isNaN(number);

    const decimals = _.toString(number).split('.')[1]?.length || 0;

    if (input && input !== '' && invalid) {
      return Promise.reject(`${t('validate.wrongType')}: ${t('validate.mustBeNumber')}`);
    }

    if (input !== '' && !invalid && number <= 0) {
      return Promise.reject(`${t('validate.positiveNumber')}`);
    }

    if (decimals > config?.precisionMass) {
      return Promise.reject(
        `${t('validate.decimalPlacesExceeded')} ${config?.precisionMass} ─ ${t(
          'descriptions.invalidDecimals'
        )}`
      );
    }

    return Promise.resolve();
  };

  const validateWiA = (rule, input) => {
    if ((rule.required && input === '') || (rule.required && input !== 0 && !input)) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.pmvWiA')}`);
    }

    const number = _.toNumber(input);
    const invalid = _.isNaN(number);

    const decimals = _.toString(number).split('.')[1]?.length || 0;

    if (input && input !== '' && invalid) {
      return Promise.reject(`${t('validate.wrongType')}: ${t('validate.mustBeNumber')}`);
    }

    if (input !== '' && !invalid && number <= 0) {
      return Promise.reject(`${t('validate.positiveNumber')}`);
    }

    if (decimals > config?.precisionMass) {
      return Promise.reject(
        `${t('validate.decimalPlacesExceeded')} ${config?.precisionMass} ─ ${t(
          'descriptions.invalidDecimals'
        )}`
      );
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (
      value &&
      folioStart &&
      folioStart.records.length > 0 &&
      folioEnd &&
      folioEnd.records.length > 0 &&
      bayLoaded &&
      bayLoaded.records.length > 0
    ) {
      // DECODE(PMV_MONITOR, 'S', PMV_SRCCODE, 'D', PMV_DSTCODE, DECODE(PMV_SRCTYPE, 3, PMV_SRCCODE, PMV_DSTCODE))
      let monitor = value?.pmv_monitor;
      if (monitor !== 'S' && monitor !== 'D') {
        if (value?.pmv_srctype === '3') {
          monitor = 'S';
        } else {
          monitor = 'D';
        }
      }
      const datetime = folioStart.records[0].pmv_date1;

      // for source tank - Quantity Delivered = Start Quantity - End Quantity - BAY Loading
      const ambSrc =
        _.toNumber(folioStart.records[0].pmv_open_amb || 0) -
        _.toNumber(folioEnd.records[0].pmv_close_amb || 0) -
        _.toNumber(bayLoaded.records[0].bay_avl_sum || 0);
      const corSrc =
        _.toNumber(folioStart.records[0].pmv_open_cor || 0) -
        _.toNumber(folioEnd.records[0].pmv_close_cor || 0) -
        _.toNumber(bayLoaded.records[0].bay_cvl_sum || 0);
      const wivSrc =
        _.toNumber(folioStart.records[0].pmv_open_kg || 0) -
        _.toNumber(folioEnd.records[0].pmv_close_kg || 0) -
        _.toNumber(bayLoaded.records[0].bay_kg_sum || 0);
      // for destination tank - Quantity Received = End Quantity - Start Quantity + BAY Loading
      const ambDst =
        _.toNumber(folioEnd.records[0].pmv_close_amb || 0) -
        _.toNumber(folioStart.records[0].pmv_open_amb || 0) +
        _.toNumber(bayLoaded.records[0].bay_avl_sum || 0);
      const corDst =
        _.toNumber(folioEnd.records[0].pmv_close_cor || 0) -
        _.toNumber(folioStart.records[0].pmv_open_cor || 0) +
        _.toNumber(bayLoaded.records[0].bay_cvl_sum || 0);
      const wivDst =
        _.toNumber(folioEnd.records[0].pmv_close_kg || 0) -
        _.toNumber(folioStart.records[0].pmv_open_kg || 0) +
        _.toNumber(bayLoaded.records[0].bay_kg_sum || 0);
      const amb = monitor === 'S' ? ambSrc : ambDst;
      const cor = monitor === 'S' ? corSrc : corDst;
      const wiv = monitor === 'S' ? wivSrc : wivDst;

      console.log(
        '..............',
        SETTINGS.DATE_TIME_FORMAT,
        value,
        folioStart,
        folioEnd,
        bayLoaded,
        datetime
      );
      //......wiv........ -3325.7 8432482.7 914383 913540 2482.7
      // console.log('......wiv........',  wivSrc, wivDst, folioEnd.records[0].pmv_close_kg, folioStart.records[0].pmv_open_kg, bayLoaded.records[0].bay_kg_sum);
      console.log('......quantities........', amb, cor, wiv);
      /* let monitor = value?.pmv_monitor;
        if (!monitor) {
          if (value?.pmv_srctype==='3') {
            monitor = 'S';
          } else {
            if (value?.pmv_dsttype==='3') {
              monitor = 'D';
            }
          }
        }
        const density = monitor === 'S' ? folioStart.records[0].open_density : folioEnd.records[0].close_density; */
      const density = folioEnd.records[0].close_density;
      const wia = calcWiA(wiv, cor, density, config?.airBuoyancyFactor);
      setFieldsValue({
        pmv_datetime: moment(datetime, SETTINGS.DATE_TIME_FORMAT),
        pmv_qty_amb: amb,
        pmv_qty_cor: cor,
        pmv_qty_wiv: wiv,
        pmv_qty_wia: _.round(wia),
      });
    }
  }, [folioStart, folioEnd, bayLoaded, value, setFieldsValue]);

  const finishHandler = async () => {
    try {
      setDisabled(true);
      const values = await form.validateFields();
      // need give the date time correct format before sending to API
      // a specal date time format is required by the backend  - DD.MM.RRRRHH24:MI:SS
      const BAIMAN_DATE_TIME_FORMAT = 'DD.MM.YYYYHH:mm:ss';
      values.pmv_datetime = !values.pmv_datetime ? '' : values.pmv_datetime?.format(BAIMAN_DATE_TIME_FORMAT);

      const params = {
        ...value,
        ...values,
      };

      await api
        .post(PRODUCT_MOVEMENTS.MAKE_NOMINATION, params)
        .then((response) => {
          setDisabled(false);
          setVisible(false);
          onComplete(value?.pmv_number);

          notification.success({
            message: t('messages.submitSuccess'),
            description: t('descriptions.pmvNominationCreated'),
          });
        })

        .catch((errors) => {
          setDisabled(false);
          _.forEach(errors.response.data.errors, (error) => {
            notification.error({
              message: error.type,
              description: error.message,
            });
            setVisible(false);
          });
        });
    } catch (error) {
      setDisabled(false);
      message.error({
        key: 'submit',
        content: t('descriptions.validationFailed'),
      });
    }
  };

  return (
    <Modal
      centered
      maskClosable={false}
      mask={true}
      open={visible}
      okButtonProps={{ disabled: disabled }}
      onOk={finishHandler}
      onCancel={() => setVisible(false)}
    >
      <Form form={form} layout="vertical">
        <p>{t('prompts.pmvMakeNomination')}</p>
        {value?.pmv_srctype == '3' && <FromSupplier />}
        {value?.pmv_dsttype == '3' && <ToSupplier />}
        <MvKey form={form} />
        <Form.Item name="mv_number" label={t('fields.nominationNumber')}>
          <Input style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="pmv_datetime"
          label={t('fields.pmvDateTime')}
          rules={[{ required: true, validator: validateDate }]}
        >
          <DatePicker showTime format={FORMAT} style={{ width: '100%' }} />
        </Form.Item>

        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Form.Item
              name="pmv_qty_amb"
              label={t('fields.pmvObsQty')}
              rules={[{ required: true, validator: validateObsQty }]}
            >
              <Input style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="pmv_qty_cor"
              label={t('fields.pmvStdQty')}
              rules={[{ required: true, validator: validateStdQty }]}
            >
              <Input style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Form.Item
              name="pmv_qty_wiv"
              label={t('fields.pmvWiV')}
              rules={[{ required: true, validator: validateWiV }]}
            >
              <Input style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="pmv_qty_wia"
              label={t('fields.pmvWiA')}
              rules={[{ required: true, validator: validateWiA }]}
            >
              <Input style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default MakeNomination;
