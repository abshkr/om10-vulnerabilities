import React, { useEffect } from 'react';
import useSWR from 'swr';
import { Form, Modal, Input, notification, DatePicker, Row, Col } from 'antd';
import moment from 'moment';
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

  const { setFieldsValue } = form;

  const { data: folioStart } = useSWR(`${PRODUCT_MOVEMENTS.START_FOLIO}?pmv_number=${value?.pmv_number}`);
  const { data: folioEnd } = useSWR(`${PRODUCT_MOVEMENTS.END_FOLIO}?pmv_number=${value?.pmv_number}`);

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

    return Promise.resolve();
  };

  const validateStdQty = (rule, input) => {
    if ((rule.required && input === '') || (rule.required && input !== 0 && !input)) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.pmvStdQty')}`);
    }

    return Promise.resolve();
  };

  const validateWiV = (rule, input) => {
    if ((rule.required && input === '') || (rule.required && input !== 0 && !input)) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.pmvWiV')}`);
    }

    return Promise.resolve();
  };

  const validateWiA = (rule, input) => {
    if ((rule.required && input === '') || (rule.required && input !== 0 && !input)) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.pmvWiA')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (folioStart && folioStart.records.length > 0 && folioEnd && folioEnd.records.length > 0) {
      const datetime = folioStart.records[0].pmv_date1;
      const amb = folioEnd.records[0].pmv_close_amb || 0 - folioStart.records[0].pmv_open_amb || 0;
      const cor = folioEnd.records[0].pmv_close_cor || 0 - folioStart.records[0].pmv_open_cor || 0;
      const wiv = folioEnd.records[0].pmv_close_kg || 0 - folioStart.records[0].pmv_open_kg || 0;
      console.log('..............', SETTINGS.DATE_TIME_FORMAT, value, folioStart, folioEnd, datetime);
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
  }, [folioStart, folioEnd, setFieldsValue]);

  const finishHandler = async () => {
    const values = await form.validateFields();
    // need give the date time correct format before sending to API
    values.pmv_datetime = !values.pmv_datetime ? '' : values.pmv_datetime?.format(SETTINGS.DATE_TIME_FORMAT);

    const params = {
      ...value,
      ...values,
    };

    await api
      .post(PRODUCT_MOVEMENTS.MAKE_NOMINATION, params)
      .then((response) => {
        setVisible(false);
        onComplete();

        notification.success({
          message: t('messages.submitSuccess'),
          description: t('descriptions.pmvNominationCreated'),
        });
      })

      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
          setVisible(false);
        });
      });
  };

  return (
    <Modal centered visible={visible} onOk={finishHandler} onCancel={() => setVisible(false)}>
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
