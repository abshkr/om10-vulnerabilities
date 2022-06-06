import React, { useState, useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, notification, Modal, Divider, Drawer, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import _ from 'lodash';

import {
  Name,
  Code,
  Terminal,
  Product,
  TransferProduct,
  Density,
  Flags,
  DailyVariance,
  MontlhyVariance,
} from './fields';
import api, {
  TANKS,
  BASE_PRODUCTS,
  SPECIAL_MOVEMENTS,
  STOCK_MANAGEMENT,
  BASE_OWNERS,
  SITE_CONFIGURATION,
} from '../../../api';
import { SETTINGS } from '../../../constants';

import TankAdaptiveFlowControl from '../../tanks/afc';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, config, setFilterValue }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { resetFields } = form;

  const [tab, setTab] = useState('1');
  const [product, setProduct] = useState(undefined);
  const [density, setDensity] = useState(undefined);

  const { data: baseItem } = useSWR(`${BASE_PRODUCTS.READ}?base_code=${product}`);

  const IS_CREATING = !value;

  const onFormClosed = () => {
    setTab('1');
    setProduct(undefined);
    handleFormState(false, null);
  };

  const onComplete = (tank_code) => {
    setTab('1');
    setProduct(undefined);
    handleFormState(false, null);
    mutate(TANKS.READ);
    if (tank_code) {
      setFilterValue('' + tank_code);
    } else {
      setFilterValue(' ');
    }
  };

  const onExitClicked = () => {
    if (!config?.siteFormCloseAlert) {
      onFormClosed();
      return;
    }
  };

  const getDrawerProductsByBase = async (base) => {
    const results = await api.get(`${SPECIAL_MOVEMENTS.DRAWER_PRODUCTS_BY_BASE}?base_code=${base}`);

    return results?.data?.records;
  };

  const getServerTime = async () => {
    const results = await api.get(`${SITE_CONFIGURATION.GET_SERVER_DATA}`);

    return results?.data?.records?.[0]?.server_time;
  };

  const getBaseOwnershipBySupplier = async (base, supplier, terminal) => {
    const results = await api.get(
      `${BASE_OWNERS.READ}?base_code=${base}&cmpy_code=${supplier}&terminal=${terminal}`
    );

    return results?.data?.records?.[0];
  };

  const getTankStocks = async (terminal, tank, base) => {
    const closeouts = await api.get(`${STOCK_MANAGEMENT.CURR_CLOSEOUT}`);
    const closeout = closeouts?.data?.records?.[0]?.closeout_nr;

    const results = await api.get(
      `${STOCK_MANAGEMENT.SITE_BALANCE}?cls_out=${closeout}&terminal=${terminal}`
    );
    const stocks = results?.data?.records?.find(
      (o) =>
        o?.tanksite === terminal &&
        o?.tankcode === tank &&
        o?.productcode === base &&
        o?.base_period_close === ''
    );

    console.log('.......................getStock', stocks);
    return stocks;
  };

  /*
    "mlitm_type": "2",
    "mlitm_id": "4204",
    "mlitm_reason_code": "6",
    "mlitm_dtim_start": "2022-03-10 15:37:42",
    "mlitm_qty_amb": 10000,
    "mlitm_qty_cor": 10000,
    "mlitm_qty_kg": 8995,
    "mlitm_air_kg": 8984,
    "mlitm_dens_cor": "899.503",
    "mlitm_temp_amb": 20,
    "mlitm_prodcmpy": "7640104",
    "mlitm_tankcode": "ZZZ998",
    "mlitm_prodcode": "400000257",
    "mlitm_prodcmpy_to": "7640104",
    "mlitm_tankcode_to": "ZZZ998",
    "mlitm_prodcode_to": "400000257"
  */
  const submitTankTransfers = async (value, oldProd, newProd, moveType = '2') => {
    try {
      const values = {};

      await api.get(`${SPECIAL_MOVEMENTS.NEXT_ID}`).then((response) => {
        const payload = response.data?.records || [];
        values.mlitm_id = payload[0].next_id;
      });

      values.mlitm_type = moveType;

      const serverTime = await getServerTime();
      const serverCurrent = moment(serverTime, SETTINGS.DATE_TIME_FORMAT);
      // console.log('...........................server time', serverCurrent, serverTime);
      // const serverCurrent = moment(config?.serverTime, SETTINGS.DATE_TIME_FORMAT);
      values.mlitm_dtim_start = serverCurrent.format(SETTINGS.DATE_TIME_FORMAT);

      // use 0 as default transfer type
      // INSERT INTO MOV_REASONS (MR_ID, MR_ACTION, MR_TYPE, MR_FLAG, MR_SHOW_COMMENT) VALUES ('0', 'Product Change System Generated', 'T', '0', '0')
      values.mlitm_reason_code = '0';
      values.mlitm_qty_amb = value?.tank_amb_vol;
      values.mlitm_qty_cor = value?.tank_cor_vol;
      values.mlitm_qty_kg = value?.tank_liquid_kg;

      // WiA = WiV - GSV x 0.0011
      const WiV = value?.tank_liquid_kg;
      const GSV = value?.tank_cor_vol;
      const AIR = config?.airBuoyancyFactor;
      let WiA = undefined;
      if (!WiV || !GSV) {
        WiA = undefined;
      } else {
        WiA = _.round(_.toNumber(WiV) - _.toNumber(GSV) * AIR, config?.precisionMass);
      }
      values.mlitm_air_kg = WiA;
      values.mlitm_dens_cor = value?.tank_density;
      values.mlitm_temp_amb = value?.tank_temp;
      values.mlitm_tankcode = value?.tank_code;
      values.mlitm_tankcode_to = value?.tank_code;
      values.mlitm_vcf = value?.tank_vcf; // value?.tank_cor_vol / value?.tank_amb_vol;

      values.mlitm_prodcode = oldProd?.prod_code;
      values.mlitm_prodcmpy = oldProd?.prod_cmpy;
      values.mlitm_prodcode_to = newProd?.prod_code;
      values.mlitm_prodcmpy_to = newProd?.prod_cmpy;

      if (moveType === '0') {
        values.mlitm_prodcmpy = '';
        values.mlitm_tankcode = '';
        values.mlitm_prodcode = '';
      }
      if (moveType === '1') {
        values.mlitm_prodcmpy_to = '';
        values.mlitm_tankcode_to = '';
        values.mlitm_prodcode_to = '';
      }

      await api
        .post(SPECIAL_MOVEMENTS.CREATE, values)
        .then(() => {
          // console.log("Created");
        })
        .catch((errors) => {
          _.forEach(errors.response.data.errors, (error) => {
            notification.error({
              message: error.type,
              description: error.message,
            });
          });
          return;
        });

      await api
        .post(SPECIAL_MOVEMENTS.SUBMIT, values)
        .then(() => {
          setFlagSpmTransfer(1);
          notification.success({
            message: t('messages.submitSuccess'),
            description: t('descriptions.submitSuccess4SPM'),
          });
        })
        .catch((errors) => {
          setFlagSpmTransfer(-1);
          _.forEach(errors.response.data.errors, (error) => {
            notification.error({
              message: error.type,
              description: error.message,
            });
          });
        });
    } catch (error) {
      setFlagSpmTransfer(-2);
      message.error({
        key: 'submit',
        content: t('descriptions.validationFailed'),
      });
    }
  };

  const adjustFolioTankBases = async (value, base, baseOld, oldDensity, newDensity) => {
    try {
      const closeouts = await api.get(`${STOCK_MANAGEMENT.CURR_CLOSEOUT}`);
      const closeout = closeouts?.data?.records?.[0]?.closeout_nr;
      const values = {
        closeout_nr: closeout,
        tank_terminal: value?.tank_terminal,
        tank_code: value?.tank_code,
        tank_basecode: base?.base_code,
        tank_basename: base?.base_name,
        tank_basecode_old: baseOld?.base_code,
        tank_basename_old: baseOld?.base_name,
        tank_density_old: oldDensity,
        tank_density_new: newDensity,
      };

      await api
        .post(TANKS.ADJUST, values)
        .then(() => {
          setFlagFolioTank(1);
          notification.success({
            message: t('messages.submitSuccess'),
            description: t('descriptions.submitSuccess4FOLIO'),
          });
        })
        .catch((errors) => {
          setFlagFolioTank(-1);
          _.forEach(errors.response.data.errors, (error) => {
            notification.error({
              message: error.type,
              description: error.message,
            });
          });
        });
    } catch (error) {
      setFlagFolioTank(-2);
      message.error({
        key: 'submit',
        content: t('descriptions.validationFailed'),
      });
    }

    Modal.confirm({
      title: t('prompts.cancel'),
      okText: t('operations.leave'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.stay'),
      content: (
        <Card
          style={{ marginTop: 15, padding: 5, marginBottom: 15 }}
          size="small"
          title={t('validate.warning')}
        >
          {t('descriptions.cancelWarning')}
        </Card>
      ),
      centered: true,
      onOk: () => {
        onFormClosed();
      },
    });
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    let lines2 = null;
    if (config?.siteFolioTankBaseChange && !IS_CREATING && values?.tank_density !== value?.tank_density) {
      lines2 = (
        <Tag color={'red'}>
          <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontWeight: 'bold', color: 'blue' }}>
            {t('descriptions.spmOnTankDensityChangeDesc', {
              OLD_DENS: value?.tank_density,
              NEW_DENS: values?.tank_density,
            })}
          </div>
          <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontWeight: 'bold' }}>
            {t('descriptions.spmOnTankDensityChangeCalcManual')}
          </div>
        </Tag>
      );
    }

    let ownershipNotEnough = false;
    let hasGainLoss = false;
    let lines = null;
    if (!IS_CREATING && values?.tank_base !== value?.tank_base) {
      const itemOldProd = fromSupplierProduct; // availProducts?.records.find((o)=>(o?.ratio_base===value?.tank_base && values?.tank_prod_from === `${o?.prod_cmpy},${o?.prod_code}`));
      const itemNewProd = toSupplierProduct; // availProducts?.records.find((o)=>(o?.ratio_base===values?.tank_base && values?.tank_prod_to === `${o?.prod_cmpy},${o?.prod_code}`));
      const oldProd = `${itemOldProd?.prod_code} - ${itemOldProd?.prod_name} (${itemOldProd?.prod_cmpy} - ${itemOldProd?.cmpy_name})`;
      const newProd = `${itemNewProd?.prod_code} - ${itemNewProd?.prod_name} (${itemNewProd?.prod_cmpy} - ${itemNewProd?.cmpy_name})`;

      // check to ensure for the intended Tank, that the Book Stock is equal to the current Stock (this is a manual process)
      const stocks = await getTankStocks(value?.tank_terminal, value?.tank_code, value?.tank_base);
      hasGainLoss = _.toNumber(stocks?.gainloss) !== 0;

      // check if the FROM supplier base ownership is enough
      const ownership = await getBaseOwnershipBySupplier(
        value?.tank_base,
        itemOldProd?.prod_cmpy,
        value?.tank_terminal
      );
      ownershipNotEnough =
        !!ownership && _.toNumber(ownership?.ownship_qty) < _.toNumber(value?.tank_cor_vol);

      lines = (
        <Card
          style={{ marginTop: 15, padding: 5, marginBottom: 15 }}
          size="small"
          title={t('validate.warning')}
        >
          {t('descriptions.warningTankBaseChange', {
            OLD_BASE: baseItemOld?.records?.[0]?.base_text,
            NEW_BASE: baseItem?.records?.[0]?.base_text,
          })}
          {config?.siteFolioTankBaseChange && (
            <Tag color={'blue'}>
              <div
                style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontWeight: 'bold', color: 'blue' }}
              >
                {t('descriptions.spmOnTankBaseChangeTransfer', { OLD_PROD: oldProd, NEW_PROD: newProd })}
              </div>
            </Tag>
          )}

          {config?.siteFolioTankBaseChange && !hasGainLoss && (
            <Tag color={'green'}>
              <div
                style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontWeight: 'bold', color: 'green' }}
              >
                {t('descriptions.spmOnTankBaseChangeGainLossNo', {
                  BOOK_STOCK: stocks?.bookbalance,
                  CLOSE_STOCK: stocks?.closingstock,
                })}
              </div>
            </Tag>
          )}
          {config?.siteFolioTankBaseChange && hasGainLoss && (
            <Tag color={'red'}>
              <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontWeight: 'bold', color: 'red' }}>
                {t('descriptions.spmOnTankBaseChangeGainLoss', {
                  BOOK_STOCK: stocks?.bookbalance,
                  CLOSE_STOCK: stocks?.closingstock,
                })}
              </div>
            </Tag>
          )}

          {config?.siteFolioTankBaseChange && !ownershipNotEnough && (
            <Tag color={'green'}>
              <div
                style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontWeight: 'bold', color: 'green' }}
              >
                {t('descriptions.spmOnTankBaseChangeOwnershipEnough', {
                  FROM_SUPPLIER: `${itemOldProd?.prod_cmpy} - ${itemOldProd?.cmpy_name}`,
                  FROM_BASE: baseItemOld?.records?.[0]?.base_text,
                  OWNER_STOCK: ownership?.ownship_qty,
                  TANK_STOCK: value?.tank_cor_vol,
                })}
              </div>
            </Tag>
          )}
          {config?.siteFolioTankBaseChange && ownershipNotEnough && (
            <Tag color={'red'}>
              <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontWeight: 'bold', color: 'red' }}>
                {t('descriptions.spmOnTankBaseChangeOwnershipNotEnough', {
                  FROM_SUPPLIER: `${itemOldProd?.prod_cmpy} - ${itemOldProd?.cmpy_name}`,
                  FROM_BASE: baseItemOld?.records?.[0]?.base_text,
                  OWNER_STOCK: ownership?.ownship_qty,
                  TANK_STOCK: value?.tank_cor_vol,
                })}
              </div>
            </Tag>
          )}

          {lines2}
        </Card>
      );
    }

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      content: lines,
      width:
        config?.siteFolioTankBaseChange && !IS_CREATING && values?.tank_base !== value?.tank_base
          ? '600px'
          : null,
      okButtonProps: {
        disabled: ownershipNotEnough, // config?.siteFolioTankBaseChange && !IS_CREATING && values?.tank_base !== value?.tank_base && (!values?.tank_prod_from || !values?.tank_prod_to),
      },
      onOk: async () => {
        await api
          .post(IS_CREATING ? TANKS.CREATE : TANKS.UPDATE, values)
          .then((response) => {
            if (config?.siteFolioTankBaseChange && !IS_CREATING && product !== value?.tank_base) {
              setFlagTankUpdated(1);
              // tank to tank transfer by SPM
              submitTankTransfers(value, fromSupplierProduct, toSupplierProduct, '2');
              // add two records in CLOSEOUT_TANK_BASES
              // Closing Stock for PRODUCT_1 = 0
              // Opening Stock for PRODUCT_2 = 0
              adjustFolioTankBases(
                value,
                baseItem?.records?.[0],
                baseItemOld?.records?.[0],
                value?.tank_density,
                values?.tank_density
              );
            } else {
              onComplete(values?.tank_code);

              notification.success({
                message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
                description: IS_CREATING ? t('descriptions.createSuccess') : t('descriptions.updateSuccess'),
              });
            }
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

  const onDelete = () => {
    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(TANKS.DELETE, value)
          .then((response) => {
            onComplete(null);

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
  }, [value, visible]);

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      forceRender
      onClose={() => onExitClicked()}
      maskClosable={config?.siteFormCloseAlert ? false : IS_CREATING}
      destroyOnClose={true}
      mask={config?.siteFormCloseAlert ? true : IS_CREATING}
      placement="right"
      width="55vw"
      visible={visible}
      footer={
        <>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => onExitClicked()}
          >
            {t('operations.cancel')}
          </Button>

          <Button
            type="primary"
            icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
            htmlType="submit"
            onClick={onFinish}
            style={{ float: 'right', marginRight: 5 }}
            disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate || tab !== '1'}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          {!IS_CREATING && (
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              onClick={onDelete}
              disabled={!access?.canDelete}
            >
              {t('operations.delete')}
            </Button>
          )}
        </>
      }
    >
      <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError>
        <Tabs defaultActiveKey="1" animated={false} onChange={setTab}>
          <TabPane tab={t('tabColumns.general')} forceRender={true} key="1">
            <Terminal form={form} value={value} />
            <Code form={form} value={value} config={config} />
            <Name form={form} value={value} />
            <Product form={form} value={value} onChange={setProduct} />
            {config?.siteFolioTankBaseChange && !IS_CREATING && product !== value?.tank_base && (
              <Tag color={'red'}>
                <div
                  style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontWeight: 'bold', color: 'blue' }}
                >
                  {t('descriptions.spmOnTankBaseChangeDesc', {
                    OLD_BASE: baseItemOld?.records?.[0]?.base_text,
                    NEW_BASE: baseItem?.records?.[0]?.base_text,
                  })}
                </div>
                {availProducts?.records?.find((o) => o?.ratio_base === value?.tank_base) &&
                  availProducts?.records?.find((o) => o?.ratio_base === product) && (
                    <div
                      style={{
                        wordWrap: 'break-word',
                        whiteSpace: 'normal',
                        fontWeight: 'bold',
                        color: '#00CC00',
                      }}
                    >
                      {t('descriptions.spmOnTankBaseChangeSelect', {
                        OLD_BASE: baseItemOld?.records?.[0]?.base_text,
                        NEW_BASE: baseItem?.records?.[0]?.base_text,
                      })}
                    </div>
                  )}
                {!availProducts?.records?.find((o) => o?.ratio_base === value?.tank_base) && (
                  <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontWeight: 'bold' }}>
                    {t('descriptions.spmOnTankBaseChangeWarnOld', {
                      OLD_BASE: baseItemOld?.records?.[0]?.base_text,
                    })}
                  </div>
                )}
                {!availProducts?.records?.find((o) => o?.ratio_base === product) && (
                  <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontWeight: 'bold' }}>
                    {t('descriptions.spmOnTankBaseChangeWarnNew', {
                      NEW_BASE: baseItem?.records?.[0]?.base_text,
                    })}
                  </div>
                )}
              </Tag>
            )}
            {config?.siteFolioTankBaseChange && !IS_CREATING && product !== value?.tank_base && (
              <Row gutter={[8, 3]}>
                <Col span={12}>
                  <TransferProduct
                    form={form}
                    value={value}
                    code={'tank_prod_from'}
                    title={'fromSupplier'}
                    prompt={'selectFromSupplier'}
                    base={value?.tank_base}
                    options={availProducts}
                    onChange={onChangeFromProduct}
                  />
                </Col>
                <Col span={12}>
                  <TransferProduct
                    form={form}
                    value={value}
                    code={'tank_prod_to'}
                    title={'toSupplier'}
                    prompt={'selectToSupplier'}
                    base={product}
                    options={availProducts}
                    onChange={onChangeToProduct}
                  />
                </Col>
              </Row>
            )}

            {config?.siteFolioTankBaseChange && !IS_CREATING && density !== value?.tank_density && (
              <Tag color={'red'}>
                <div
                  style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontWeight: 'bold', color: 'blue' }}
                >
                  {t('descriptions.spmOnTankDensityChangeDesc', {
                    OLD_DENS: value?.tank_density,
                    NEW_DENS: density,
                  })}
                </div>
                <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontWeight: 'bold' }}>
                  {t('descriptions.spmOnTankDensityChangeCalcManual')}
                </div>
              </Tag>
            )}
            <Density form={form} value={value} product={product} config={config} onChange={setDensity} />
            <Divider>{t('divider.variances')}</Divider>
            <DailyVariance form={form} value={value} base={baseItem?.records?.[0]} />
            <MontlhyVariance form={form} value={value} base={baseItem?.records?.[0]} />
            <Divider>{t('divider.flags')}</Divider>
            <Flags form={form} value={value} />
          </TabPane>

          {config.siteUseAFC && !IS_CREATING && (
            <TabPane key="2" tab={t('tabColumns.adaptiveFlowControl')}>
              <TankAdaptiveFlowControl
                terminal={value?.tank_terminal}
                code={value?.tank_code}
                tanks={[value]}
                access={access}
                value={value}
              />
            </TabPane>
          )}
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
