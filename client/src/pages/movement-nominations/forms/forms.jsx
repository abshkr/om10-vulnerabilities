import React, { useState, useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Form, Button, Tabs, notification, Modal, Divider, Drawer, Row, Col, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import _ from 'lodash';

import {
  NominationKey,
  NominationNumber,
  NominationStatus,
  NominationSource,
  Terminal,
  Supplier,
  Carrier,
  Vehicle,
  TPP,
  IntoTransitFields,
  TransportMode,
  TransportSystem,
  Comments,
  EffectiveFrom,
  ExpiredAfter,
} from './fields';

import columns from './columns';

import Items from './items';

import api, { MOVEMENT_NOMIATIONS } from '../../../api';
import { SETTINGS } from '../../../constants';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, url, locateNomination, config, maskFlag }) => {
  const [tableAPI, setTableAPI] = useState(null);
  const [carrier, setCarrier] = useState(null);
  const [receiptCount, setReceiptCount] = useState(0);
  const [receiptTotal, setReceiptTotal] = useState(0.000001);

  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { setFieldsValue, resetFields, validateFields } = form;

  const { data: nomProducts } = useSWR(MOVEMENT_NOMIATIONS.NOM_PRODUCTS, { revalidateOnFocus: false });

  const fields = columns(t);

  const IS_CREATING = !value;

  /*
    The list of nomination status:  
    0	NEW
    1	PARTIALLY SCHEDULED
    2	FULLY SCHEDULED
    3	FULLY MOVED
    4	OUTSTANDING
    5	FULLY DELIVERED
    6	EXPIRED
    7	PARTIALLY MOVED
    8	PARTIALLY DELIVERED
  */

  const onFormClosed = () => {
    resetFields();
    handleFormState(false, null);
  };

  const onComplete = (nomination) => {
    resetFields();
    handleFormState(false, null);
    if (nomination) {
      locateNomination(nomination);
    } else {
      mutate(url);
    }
  };

  const onItemValidation = (items) => {
    const errors = [];

    _.forEach(items, (item) => {
      const keys = Object.keys(item);
      const values = Object.values(item);

      if (
        item.hasOwnProperty('mvitm_prod_qty') &&
        (!item['mvitm_prod_qty'] ||
          String(item['mvitm_prod_qty']).trim() === '' ||
          String(item['mvitm_prod_qty']) === '0')
      ) {
        errors.push({
          field: t('fields.productQuantity'),
          message: `${t('descriptions.requiredAndCannotBeZeroLineField')}${values[0]}`,
          key: `${'mvitm_prod_qty'}${values[0]}`,
        });
      }

      _.forEach(values, (value, index) => {
        if (value === t('placeholder.selectPlease')) {
          if (!_.find(fields, ['field', keys[index]])) {
            console.log(fields, keys[index], value);
          }

          errors.push({
            field: _.find(fields, ['field', keys[index]])?.headerName,
            message: `${t('descriptions.pleaseFillLineField')}${values[0]}`,
            key: `${keys[index]}${values[0]}`,
          });
        }
      });
    });

    if (errors.length > 0) {
      const lines = (
        <>
          {errors?.map((error, index) => (
            <Card size="small" title={error.field}>
              {error.message}
            </Card>
          ))}
        </>
      );

      notification.error({
        message: t('validate.lineItemValidation'),
        description: lines,
        // duration: 0,
        style: {
          height: '500px',
          overflowY: 'scroll',
        },
      });
      /* _.forEach(errors, (error) => {
        notification.error({
          message: error.field,
          description: error.message,
          key: error.key,
        });
      }); */
    }
    return errors;
  };

  //const onFinish = (values) => {
  const onFinish = async () => {
    const values = await validateFields();
    console.log('form values', values);
    const items = [];

    tableAPI.forEachNodeAfterFilterAndSort((rowNode, index) => {
      // user may have visited MT4NOM screen where two date fields will be populated
      // with the format not recognized by DB. Make sure they are set to blank.
      rowNode.data.mvitm_dtim_effect = '';
      rowNode.data.mvitm_dtim_expiry = '';
      items.push(rowNode.data);
    });

    const errors = onItemValidation(items);

    if (errors.length === 0) {
      // fill the product name for both/either from and/o to product
      _.forEach(items, (item) => {
        const prodFrom = _.find(
          nomProducts?.records,
          (o) => o.prod_code === item.mvitm_prodcode_from && o.prod_cmpy === item.mvitm_prodcmpy_from
        );
        item.mvitm_prodname_from = '';
        if (prodFrom) {
          item.mvitm_prodname_from =
            prodFrom.prod_cmpy + ' - ' + prodFrom.prod_code + ' - ' + prodFrom.prod_name;
        }
        const prodTo = _.find(
          nomProducts?.records,
          (o) => o.prod_code === item.mvitm_prodcode_to && o.prod_cmpy === item.mvitm_prodcmpy_to
        );
        item.mvitm_prodname_to = '';
        if (prodTo) {
          item.mvitm_prodname_to = prodTo.prod_cmpy + ' - ' + prodTo.prod_code + ' - ' + prodTo.prod_name;
        }
      });

      values.items = items;

      // console.log('.....................values.mv_dtim_effect', values.mv_dtim_effect);
      // console.log('.....................values.mv_dtim_expiry', values.mv_dtim_expiry);
      if (!values?.mv_dtim_effect) {
        values.mv_dtim_effect = '';
      } else {
        values.mv_dtim_effect = values.mv_dtim_effect?.format(SETTINGS.DATE_TIME_FORMAT);
      }
      if (!values?.mv_dtim_expiry) {
        values.mv_dtim_expiry = '';
      } else {
        values.mv_dtim_expiry = values.mv_dtim_expiry?.format(SETTINGS.DATE_TIME_FORMAT);
      }
      // console.log('.....................values.mv_dtim_effect2', values.mv_dtim_effect);
      // console.log('.....................values.mv_dtim_expiry2', values.mv_dtim_expiry);
      if (!!value && !!value.mv_id) {
        values.mv_id = value.mv_id;
      }

      Modal.confirm({
        title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
        okText: IS_CREATING ? t('operations.create') : t('operations.update'),
        okType: 'primary',
        icon: <QuestionCircleOutlined />,
        cancelText: t('operations.no'),
        centered: true,
        onOk: async () => {
          await api
            .post(IS_CREATING ? MOVEMENT_NOMIATIONS.CREATE : MOVEMENT_NOMIATIONS.UPDATE, values)
            .then((response) => {
              onComplete(values?.mv_key);
              //Modal.destroyAll();

              //mutate(url);
              notification.success({
                message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
                description: IS_CREATING ? t('descriptions.createSuccess') : t('messages.updateSuccess'),
              });
            })

            .catch((errors) => {
              _.forEach(errors.response.data.errors, (error) => {
                notification.error({
                  message: error.type,
                  description: error.message,
                });
              });
            });
          /* .catch((error) => {
              notification.error({
                message: error.message,
                description: IS_CREATING ? t('descriptions.createFailed') : t('descriptions.updateFailed'),
              });
            }); */
        },
      });
    }
  };

  const onDelete = () => {
    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(MOVEMENT_NOMIATIONS.DELETE, value)
          .then((response) => {
            onComplete(null);
            //mutate(MOVEMENT_NOMIATIONS.READ);
            //Modal.destroyAll();
            notification.success({
              message: t('messages.deleteSuccess'),
              description: `${t('descriptions.deleteSuccess')}`,
            });
          })

          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  useEffect(() => {
    if (!value && !visible) {
      resetFields();
    }
  }, [value, visible, resetFields]);

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      forceRender
      onClose={onFormClosed}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={maskFlag}
      placement="right"
      width="80vw"
      visible={visible}
      footer={
        <>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => handleFormState(false, null)}
          >
            {t('operations.cancel')}
          </Button>

          <Button
            type="primary"
            //htmlType="submit"
            icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
            onClick={onFinish}
            style={{ float: 'right', marginRight: 5 }}
            disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          {!IS_CREATING && (
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              disabled={!access?.canDelete || value?.mv_status !== '0'}
              onClick={onDelete}
            >
              {t('operations.delete')}
            </Button>
          )}
        </>
      }
    >
      <Form
        layout="vertical"
        form={form}
        //onFinish={onFinish}
        scrollToFirstError
        initialValues={{
          mv_key: '',
          mv_number: '',
          mv_status: '0',
          mv_srctype: '2',
        }}
      >
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane tab={t('tabColumns.general')} forceRender={true} key="1">
            <Row gutter={[8, 3]}>
              <Col span={6}>
                <NominationKey form={form} value={value} />
              </Col>
              <Col span={6}>
                <NominationNumber form={form} value={value} />
              </Col>
              <Col span={6}>
                <NominationStatus form={form} value={value} />
              </Col>
              <Col span={6}>
                <NominationSource form={form} value={value} />
              </Col>
            </Row>

            <Row gutter={[8, 3]}>
              <Col span={6}>
                <Terminal form={form} value={value} />
              </Col>
              <Col span={6}>
                <Supplier form={form} value={value} />
              </Col>
              <Col span={6}>
                <Carrier form={form} value={value} onChange={setCarrier} />
              </Col>
              <Col span={6}>
                <Vehicle form={form} value={value} carrier={carrier} />
              </Col>
            </Row>

            <Row gutter={[8, 3]}>
              <Col span={12}>
                <EffectiveFrom form={form} value={value} />
              </Col>
              <Col span={12}>
                <ExpiredAfter form={form} value={value} />
              </Col>
            </Row>

            {config?.siteUseNomTpp && <TPP form={form} value={value} />}

            {config?.siteUseIntoTransitGainLoss && (
              <IntoTransitFields
                form={form}
                value={value}
                receiptCount={receiptCount}
                receiptTotal={receiptTotal}
              />
            )}

            <TransportMode form={form} value={value} />

            <Row gutter={[8, 3]}>
              <Col span={6}>
                <TransportSystem form={form} value={value} />
              </Col>
              <Col span={18}>
                <Comments form={form} value={value} />
              </Col>
            </Row>

            <Divider style={{ marginTop: 3, marginBottom: 13 }} />
            <Items
              setTableAPIContext={setTableAPI}
              value={value}
              config={config}
              cbFunction={onComplete}
              setReceiptCount={setReceiptCount}
              setReceiptTotal={setReceiptTotal}
            />
          </TabPane>
          {/* <TabPane tab={t('tabColumns.items')} forceRender={true} key="2">
            <Items setTableAPIContext={setTableAPI} value={value} config={config} />
          </TabPane> */}
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
