import React, { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
  TrademarkOutlined,
} from '@ant-design/icons';
import {
  Form,
  Button,
  Tabs,
  Modal,
  notification,
  message,
  Drawer,
  Checkbox,
  Col,
  Row,
  Input,
  Card,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import { SWRConfig } from 'swr';
import { fetcher } from 'utils';
import jwtDecode from 'jwt-decode';

import _ from 'lodash';
import api, { DRAWER_PRODUCTS, COMPANIES } from '../../../api';
import GenericForm from '../generics/forms';

import {
  DrawerCompany,
  LoadTolerance,
  ProductCode,
  ProductName,
  Group,
  Hazchem,
  Generic,
  DangerousGoods,
  PidxCode,
} from './fields';

import { DataTable, FormModal } from '../../../components';
import columns from './columns';
import BaseProductForm from './base-form';
import HotLitresForm from './hot-litres';
import LinkedDrawerProducts from './linked-drawer-products';
import GuardmasterProduct from './guardmaster-product';

const TabPane = Tabs.TabPane;

const DrawerForm = ({
  value,
  visible,
  handleFormState,
  access,
  config,
  setFilterValue,
  pipenodeBases,
  maskFlag,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const user_code = decoded?.per_code;

  const { TextArea } = Input;

  const [bases, setBases] = useState([]);
  const [prod_is_compliant, setCompliant] = useState(value?.prod_ldtol_flag);
  const [prod_is_locked, setLocked] = useState(value?.prod_is_locked);
  const [selected, setSelected] = useState(null);
  const [hotFlag, setHotFlag] = useState(value?.prod_check_hot_volume);
  const [blendFlag, setBlendFlag] = useState(value?.prod_is_blend);

  const [baseLoading, setBaseLoading] = useState(true);
  const [genericFlag, setGenericFlag] = useState(false);

  const [drawerCode, setDrawerCode] = useState(value?.prod_cmpycode);
  const [guardmasterFlag, setGuardmasterFlag] = useState(false);

  const { resetFields, setFieldsValue } = form;

  const { data: companyConfig } = useSWR(`${COMPANIES.CONFIG}?cmpy_code=${drawerCode}`);

  const fields = columns(t, config, form, pipenodeBases, user_code);

  const IS_CREATING = !value;

  const onFormClosed = () => {
    handleFormState(false, null);
  };

  const onExitClicked = () => {
    if (!config?.siteFormCloseAlert) {
      onFormClosed();
      return;
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

  const manageGenerics = () => {
    Modal.info({
      className: 'form-container',
      title: t('operations.manageGeneric'),
      centered: true,
      width: '60vw',
      icon: <EditOutlined />,
      content: (
        <SWRConfig
          value={{
            refreshInterval: 0,
            fetcher,
          }}
        >
          <GenericForm
            onClose={() => {
              setGenericFlag(true);
            }}
          />
        </SWRConfig>
      ),
      okButtonProps: {
        style: { display: 'none' },
      },
    });
  };

  const adjustHotTempCheckFlag = (bases) => {
    let hotFound = false;

    for (let i = 0; i < bases.length; i++) {
      const base = bases[i];
      if (!!base && base?.pitem_hot_check && _.toNumber(base?.pitem_ratio_value) > 0) {
        hotFound = true;
        break;
      }
    }

    setHotFlag(hotFound);
    setFieldsValue({
      prod_check_hot_volume: hotFound,
    });
  };

  const adjustBlendFlag = (bases) => {
    let countMainBase = 0;

    for (let i = 0; i < bases.length; i++) {
      const base = bases[i];
      if (!!base && base?.pitem_adtv_flag === false) {
        countMainBase += 1;
      }
    }

    const isBlend = countMainBase > 1 ? true : false;
    setBlendFlag(isBlend);

    return isBlend;
  };

  const getTotalRatios = (items, valueField) => {
    let total = 0;
    for (let i = 0; i < items?.length; i++) {
      const item = items?.[i];
      total += !item?.[valueField] ? 0 : _.toNumber(item?.[valueField]);
    }

    return total;
  };

  const getMaxRatio = (items, valueField) => {
    let ratio = 0;
    for (let i = 0; i < items?.length; i++) {
      const item = items?.[i];
      const value = !item?.[valueField] ? 0 : _.toNumber(item?.[valueField]);
      if (value > ratio) {
        ratio = value;
      }
    }

    return ratio;
  };

  const getAdtvRatios = (items, valueField, adtvFlag) => {
    let total = 0;
    for (let i = 0; i < items?.length; i++) {
      const item = items?.[i];
      const isFlag = adtvFlag?.indexOf('flag') >= 0;
      const isAdditive = isFlag
        ? item?.[adtvFlag] === true || item?.[adtvFlag] === '1'
        : String(item?.[adtvFlag]) === '6' || String(item?.[adtvFlag]) === '11';
      if (isAdditive) {
        total += !item?.[valueField] ? 0 : _.toNumber(item?.[valueField]);
      }
    }

    return total;
  };

  const getMainBaseTotals = (items, valueField, adtvFlag) => {
    let total = 0;
    for (let i = 0; i < items?.length; i++) {
      const item = items?.[i];
      const isFlag = adtvFlag?.indexOf('flag') >= 0;
      const isAdditive = isFlag
        ? item?.[adtvFlag] === true || item?.[adtvFlag] === '1'
        : String(item?.[adtvFlag]) === '6' || String(item?.[adtvFlag]) === '11';
      if (!isAdditive) {
        total += !item?.[valueField] ? 0 : _.toNumber(item?.[valueField]);
      }
    }

    return total;
  };

  const isStreamRecipeMatched = (items, nodes, codeField) => {
    if (nodes?.length === 0 || items?.length === 0) {
      return false;
    }
    // console.log('isStreamRecipeMatched2.....', items, nodes, codeField);
    let matched = true;
    for (let i = 0; i < items?.length; i++) {
      const item = items?.[i];
      const node = _.find(nodes, (o) => o?.stream_basecode === item?.[codeField]);
      // console.log('isStreamRecipeMatched.....', node);
      if (!node) {
        matched = false;
        break;
      }
    }

    return matched;
  };

  const getStreamMembers = (data, items, streams, codeField) => {
    // find the matched node
    let bases = [];
    for (let i = 0; i < streams?.length; i++) {
      const stream = streams?.[i];
      if (stream?.stream_basecode === data?.[codeField]) {
        // found the node
        const index = stream?.stream_index;
        // found the node, now get all the members of the stream.
        bases = _.filter(streams, (o) => o?.stream_index === index);
        // now check if the stream contains all members of the recipe
        const found = isStreamRecipeMatched(items, bases, codeField);
        // console.log('...getStreamMembers.........', index, found, bases);
        if (found) {
          break;
        }
      }
    }

    return bases;
  };

  const getStreamMainRatios = (data, items, streams, codeField, valueField, adtvFlag) => {
    // get all the members of a stream containing the recipe
    const nodes = getStreamMembers(data, items, streams, codeField);
    // console.log('getStreamMainRatios..............', data, nodes);

    // find the stream_seq of the base product in the stream.
    // the additives attached to a major base product will share the same value of stream_seq
    const node = _.find(nodes, (o) => o?.stream_basecode === data?.[codeField]);
    if (!node) {
      // recipe base not found in pipenode
      const maxRatio = getMaxRatio(items, valueField);
      if (maxRatio === data?.[valueField]) {
        // this is the main base product
        // get total additive ratios
        const adtvRatios = getAdtvRatios(items, valueField, adtvFlag);
        const mainRatio = maxRatio + adtvRatios;
        return mainRatio;
      } else {
        return _.toNumber(data?.[valueField]);
      }
    }

    // recipe base found in pipenode
    const seq = node?.stream_seq;
    let total = 0;
    for (let i = 0; i < items?.length; i++) {
      const item = items?.[i];
      const base = _.find(nodes, (o) => o?.stream_basecode === item?.[codeField] && o?.stream_seq === seq);
      if (base) {
        total += _.toNumber(item?.[valueField]);
      }
    }

    return total;
  };

  const getStreamAdtvRatios = (data, items, streams, codeField, valueField, adtvFlag) => {
    // get all the members of a stream containing the recipe
    const nodes = getStreamMembers(data, items, streams, codeField);

    // find the stream_seq of the base product in the stream.
    // the additives attached to a major base product will share the same value of stream_seq
    const node = _.find(nodes, (o) => o?.stream_basecode === data?.[codeField]);
    if (!node) {
      // recipe base not found in pipenode, just return 0
      return 0;
    }

    // recipe base found in pipenode
    const seq = node?.stream_seq;
    let total = 0;
    for (let i = 0; i < items?.length; i++) {
      const item = items?.[i];
      const isFlag = adtvFlag?.indexOf('flag') >= 0;
      const isAdditive = isFlag
        ? item?.[adtvFlag] === true || item?.[adtvFlag] === '1'
        : String(item?.[adtvFlag]) === '6' || String(item?.[adtvFlag]) === '11';
      if (isAdditive) {
        const base = _.find(nodes, (o) => o?.stream_basecode === item?.[codeField] && o?.stream_seq === seq);
        if (base) {
          total += _.toNumber(item?.[valueField]);
        }
      }
    }

    return total;
  };

  const handleBaseCallBack = (values) => {
    if (values.to_delete) {
      return deleteBase();
    }

    const payload = [];
    if (!values.to_create) {
      // if the latest pitem_hot_main is true, other base's pitem_hot_main must be false
      _.forEach(bases, (item) => {
        if (item.pitem_base_code !== selected?.pitem_base_code) {
          if (values.pitem_hot_main === true) {
            item.pitem_hot_main = false;
          }
          payload.push(item);
        } else {
          selected.pitem_base_code = values.pitem_base_code;
          selected.pitem_bltol_ntol = values.pitem_bltol_ntol;
          selected.pitem_bltol_flag = values.pitem_bltol_flag;
          selected.pitem_bltol_ptol = values.pitem_bltol_ptol;
          selected.pitem_ratio_value = values.pitem_ratio_value;
          selected.pitem_ratio_percent_ppm = values.pitem_ratio_percent_ppm;
          selected.pitem_hot_main = values.pitem_hot_main;

          selected.pitem_base_name = values.pitem_base_name;
          selected.pitem_pidx_code = values.pitem_pidx_code;
          selected.pitem_bclass_name = values.pitem_bclass_name;

          selected.pitem_base_class = values.pitem_base_class;
          selected.pitem_adtv_flag = values.pitem_adtv_flag;
          selected.pitem_hot_check = values.pitem_hot_check;
          selected.pitem_bclass_dens_lo = values.pitem_bclass_dens_lo;
          selected.pitem_bclass_dens_hi = values.pitem_bclass_dens_hi;
          selected.pitem_bclass_vcf_alg = values.pitem_bclass_vcf_alg;
          selected.pitem_bclass_temp_lo = values.pitem_bclass_temp_lo;
          selected.pitem_bclass_temp_hi = values.pitem_bclass_temp_hi;
          payload.push(selected);
        }
      });
      /* payload = [
        ..._.filter(bases, (item) => {
          return item.pitem_base_code !== selected?.pitem_base_code;
        }),
        {
          pitem_base_code: values.pitem_base_code,
          pitem_bltol_ntol: values.pitem_bltol_ntol,
          pitem_bltol_flag: values.pitem_bltol_flag,
          pitem_bltol_ptol: values.pitem_bltol_ptol,
          pitem_ratio_value: values.pitem_ratio_value,
          pitem_base_name: values.pitem_base_name,
          pitem_bclass_name: values.pitem_bclass_name,
          pitem_hot_main: values.pitem_hot_main,
        },
      ]; */
      setSelected(null);
      // setSelected(selected);
      setBases([]);
    } else {
      if (
        _.find(bases, (item) => {
          return item.pitem_base_code === values.pitem_base_code;
        })
      ) {
        notification.error({
          message: t('messages.validationFailed'),
          description: t('descriptions.alreadyExists'),
        });
        return;
      }

      _.forEach(bases, (item) => {
        if (values.pitem_hot_main === true) {
          item.pitem_hot_main = false;
        }
        payload.push(item);
      });
      payload.push({
        pitem_base_code: values.pitem_base_code,
        pitem_bltol_ntol: values.pitem_bltol_ntol,
        pitem_bltol_flag: values.pitem_bltol_flag,
        pitem_bltol_ptol: values.pitem_bltol_ptol,
        pitem_ratio_value: values.pitem_ratio_value,
        pitem_ratio_percent_ppm: values.pitem_ratio_percent_ppm,
        pitem_hot_main: values.pitem_hot_main,
        pitem_base_name: values.pitem_base_name,
        pitem_pidx_code: values.pitem_pidx_code,
        pitem_bclass_name: values.pitem_bclass_name,
        pitem_base_class: values.pitem_base_class,
        pitem_adtv_flag: values.pitem_adtv_flag,
        pitem_hot_check: values.pitem_hot_check,
        pitem_bclass_dens_lo: values.pitem_bclass_dens_lo,
        pitem_bclass_dens_hi: values.pitem_bclass_dens_hi,
        pitem_bclass_vcf_alg: values.pitem_bclass_vcf_alg,
        pitem_bclass_temp_lo: values.pitem_bclass_temp_lo,
        pitem_bclass_temp_hi: values.pitem_bclass_temp_hi,
      });
    }

    /* form.setFieldsValue({
      bases: payload,
    }); */

    if (config?.siteRecipeOnPercent) {
      const totalRatios = getTotalRatios(payload, 'pitem_ratio_value');
      // get max ratio
      const maxRatio = getMaxRatio(payload, 'pitem_ratio_value');
      // get total additive ratios
      const adtvRatios = getAdtvRatios(payload, 'pitem_ratio_value', 'pitem_base_class');
      _.forEach(payload, (item) => {
        if (String(item?.pitem_base_class) === '6' || String(item?.pitem_base_class) === '11') {
          item.pitem_ratio_value = !item?.pitem_ratio_percent_ppm
            ? item.pitem_ratio_value
            : item?.pitem_ratio_percent_ppm;
        } else {
          if (maxRatio === item?.pitem_ratio_value) {
            item.pitem_ratio_value = !item?.pitem_ratio_percent_ppm
              ? item.pitem_ratio_value
              : item?.pitem_ratio_percent_ppm * 10000 - adtvRatios;
          }
        }
      });
    }

    setBases(payload);
  };

  const deleteBase = () => {
    const payload = _.filter(bases, (item) => {
      return item.pitem_base_code !== selected?.pitem_base_code;
    });
    /* form.setFieldsValue({
      bases: payload,
    }); */

    setBases(payload);
    setSelected(null);
  };

  const handleBase = (v) => {
    const tableBases = form.getFieldValue('bases');
    FormModal({
      width: '40vw',
      value: v,
      form: (
        <BaseProductForm
          value={v}
          handleBaseCallBack={handleBaseCallBack}
          config={config}
          tableBases={tableBases}
        />
      ),
      id: v?.pitem_base_code,
      name: v?.pitem_base_name,
      t,
    });
  };

  const getBases = useCallback(() => {
    api
      .get(`${DRAWER_PRODUCTS.BASES}?prod_code=${value?.prod_code}&prod_cmpycode=${value?.prod_cmpycode}`)
      .then((response) => {
        const payload = response.data?.records || [];
        /* form.setFieldsValue({
          bases: payload,
        }); */

        setBases(payload);
        setBaseLoading(false);
      });
  });

  const onComplete = (prod_code) => {
    handleFormState(false, null);
    setSelected(null);
    if (prod_code) {
      setFilterValue('' + prod_code);
    } else {
      setFilterValue(' ');
    }
    mutate(DRAWER_PRODUCTS.READ);
  };

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      console.log('.............base values', values);

      if (values.bases === undefined || values.bases.length <= 0) {
        Modal.info({
          title: t('prompts.notEnoughBase'),
          okText: t('operations.cancel'),
        });
        return;
      }

      if (config?.siteRecipeOnPercent) {
        const totalRatios = getTotalRatios(values.bases, 'pitem_ratio_value');
        // get total additive ratios
        const mainBaseTotals = getMainBaseTotals(values.bases, 'pitem_ratio_percent_ppm', 'pitem_base_class');
        if (totalRatios !== 1000000 || mainBaseTotals !== 100) {
          Modal.info({
            // title: (totalRatios !== 1000000 && user_code === '9999' ? t('prompts.ratioTotalNotMillion') : '') + (mainBaseTotals !== 100 ? t('prompts.percentTotalNot100') : ''),
            title: t('prompts.percentTotalNot100'),
            okText: t('operations.cancel'),
          });
          return;
        }
      }

      values.prod_is_blend = adjustBlendFlag(values?.bases);
      values.prod_guardmaster_quality =
        values?.prod_guardmaster_quality === undefined ? '' : values?.prod_guardmaster_quality;

      // now optional dropdown lists can be unselected and have the value of "undefined".
      // need to send blank string when it is undefined
      values.prod_group = !values?.prod_group ? '' : values?.prod_group;
      values.prod_hazid = !values?.prod_hazid ? '' : values?.prod_hazid;
      values.dg_link_id = !values?.dg_link_id ? '' : values?.dg_link_id;

      Modal.confirm({
        title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
        okText: IS_CREATING ? t('operations.create') : t('operations.update'),
        okType: 'primary',
        icon: <QuestionCircleOutlined />,
        cancelText: t('operations.no'),
        centered: true,
        onOk: async () => {
          await api
            .post(IS_CREATING ? DRAWER_PRODUCTS.CREATE : DRAWER_PRODUCTS.UPDATE, values)
            .then(() => {
              onComplete(values.prod_code);

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
        },
      });
    } catch (error) {
      message.error({
        key: 'submit',
        content: t('descriptions.validationFailed'),
      });
    }
  };

  const onDelete = () => {
    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      icon: <DeleteOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(DRAWER_PRODUCTS.DELETE, value)
          .then(() => {
            onComplete();

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
      setBases([]);
      setCompliant(false);
      setLocked(false);
    }

    if (value) {
      setFieldsValue({
        prod_desc: value.prod_desc,
        prod_is_compliant: value.prod_is_compliant,
        prod_is_locked: value.prod_is_locked,
      });
      setCompliant(value.prod_is_compliant);
      setLocked(value.prod_is_locked);
      getBases();
    }
  }, [resetFields, value, visible]);

  useEffect(() => {
    console.log('Base has been changed!.......', bases);
    form.setFieldsValue({
      bases: bases,
    });

    adjustHotTempCheckFlag(bases);
    adjustBlendFlag(bases);
  }, [bases]); //, adjustHotTempCheckFlag, setFieldsValue]);

  useEffect(() => {
    console.log('companyConfig!.......', companyConfig);
    if (companyConfig) {
      const item = _.find(companyConfig?.records, (o) => o?.config_key === 'CMPY_GUARDMASTER_PRODUCT_FLAG');
      const flag = !item ? false : item?.config_value === 'Y' ? true : false;
      setGuardmasterFlag(flag);
    }
  }, [companyConfig]);

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      forceRender
      onClose={() => onExitClicked()}
      maskClosable={config?.siteFormCloseAlert ? false : IS_CREATING}
      destroyOnClose={true}
      mask={config?.siteFormCloseAlert ? true : maskFlag}
      placement="right"
      width="60vw"
      visible={visible}
      footer={
        <>
          <Button
            type="primary"
            icon={<TrademarkOutlined />}
            onClick={manageGenerics}
            style={{ float: 'left' }}
            disabled={!access?.canUpdate}
          >
            {t('operations.genericProd')}
          </Button>

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
              onClick={onDelete}
              disabled={!access?.canDelete}
            >
              {t('operations.delete')}
            </Button>
          )}
        </>
      }
    >
      <Form
        // {...layout}
        layout="vertical"
        form={form}
        scrollToFirstError
        initialValues={value}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.general')} key="1">
            <Row gutter={[8, 2]}>
              <Col span={8}>
                <DrawerCompany form={form} value={value} onChange={setDrawerCode} />
              </Col>
              <Col span={8}>
                <ProductCode form={form} value={value} config={config} />
              </Col>
              <Col span={8}>
                <ProductName form={form} value={value} />
              </Col>
            </Row>

            <Row gutter={[8, 2]}>
              <Col span={8}>
                <Group form={form} value={value} />
              </Col>
              <Col span={8}>
                <Hazchem form={form} value={value} />
              </Col>
              <Col span={8}>
                <Generic form={form} value={value} flag={genericFlag} setFlag={setGenericFlag} />
              </Col>
            </Row>

            <LoadTolerance form={form} value={value} config={config} />

            {config.manageHotProduct && <HotLitresForm value={value} form={form} hotFlag={hotFlag} />}

            {config.manageDCS && <LinkedDrawerProducts value={value} form={form} />}

            <Row gutter={[8, 0]}>
              <Col span={8}>
                <Row gutter={[8, 0]}>
                  <Col span={24}>
                    <DangerousGoods form={form} value={value} />
                  </Col>
                </Row>
                <Row gutter={[8, 0]}>
                  <Col span={12}>
                    <Form.Item name="prod_is_compliant" label={t('fields.prodCompliant')}>
                      <Checkbox
                        valuePropName="checked"
                        checked={prod_is_compliant}
                        onChange={(v) => {
                          setCompliant(v.target.checked);
                          setFieldsValue({
                            prod_is_compliant: v.target.checked,
                          });
                        }}
                      ></Checkbox>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="prod_is_locked" label={t('fields.locked')}>
                      <Checkbox
                        valuePropName="checked"
                        checked={prod_is_locked}
                        onChange={(v) => {
                          setLocked(v.target.checked);
                          setFieldsValue({
                            prod_is_locked: v.target.checked,
                          });
                        }}
                      ></Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={16}>
                <Form.Item name="prod_desc" label={t('fields.prodDesc')}>
                  <TextArea rows={3} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[8, 2]}>
              {config?.siteEnabledCOPS && (
                <Col span={config?.siteEnabledPIDX ? 16 : 24}>
                  <GuardmasterProduct form={form} value={value} flag={guardmasterFlag} />
                </Col>
              )}
              {config?.siteEnabledPIDX && (
                <Col span={config?.siteEnabledCOPS ? 8 : 24}>
                  <PidxCode form={form} value={value} />
                </Col>
              )}
            </Row>

            {/* <Row gutter={[8, 2]}>
              <Col span={8}>
                <Form.Item name="prod_is_compliant" label={t('fields.prodCompliant')}>
                  <Checkbox
                    valuePropName="checked"
                    checked={prod_is_compliant}
                    onChange={(v) => {
                      setCompliant(v.target.checked);
                      setFieldsValue({
                        prod_is_compliant: v.target.checked,
                      });
                    }}
                  ></Checkbox>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="prod_is_locked" label={t('fields.locked')}>
                  <Checkbox
                    valuePropName="checked"
                    checked={prod_is_locked}
                    onChange={(v) => {
                      setLocked(v.target.checked);
                      setFieldsValue({
                        prod_is_locked: v.target.checked,
                      });
                    }}
                  ></Checkbox>
                </Form.Item>
              </Col>
              <Col span={8}>
                <DangerousGoods form={form} value={value} />
              </Col>
            </Row>

            <Row gutter={[8, 2]}>
              <Col span={3}>
                <Form.Item name="prod_desc_title" label={t('fields.description')}>
                </Form.Item>
              </Col>
              <Col span={21}>
                <Form.Item name="prod_desc">
                  <TextArea rows={2} />
                </Form.Item>
              </Col>
            </Row> */}

            <Card
              size="small"
              title={t('fields.baseProducts')}
              // bordered={false}
              // style={{margin:0, padding:0}}
              extra={
                <>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    loading={baseLoading && !IS_CREATING}
                    onClick={() => handleBase(null)}
                    style={{ float: 'right', marginRight: 5, marginTop: 10 }}
                  >
                    {t('operations.addBase')}
                  </Button>

                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => handleBase(selected)}
                    style={{ float: 'right', marginRight: 5, marginTop: 10 }}
                    disabled={!selected}
                  >
                    {t('operations.editBase')}
                  </Button>

                  <Button
                    type="danger"
                    icon={<DeleteOutlined />}
                    onClick={deleteBase}
                    disabled={!selected}
                    style={{ float: 'right', marginRight: 5, marginTop: 10 }}
                  >
                    {t('operations.deleteBase')}
                  </Button>
                </>
              }
            >
              <Form.Item name="bases">
                <DataTable
                  data={bases}
                  height="78vh"
                  minimal
                  columns={fields}
                  handleSelect={(value) => setSelected(value[0])}
                />
              </Form.Item>
            </Card>
          </TabPane>
          {/* {config.safefillCheckByHighTemp && (
            <TabPane tab={t('tabColumns.companyHotLitres')} key="2">
              <HotLitresForm value={value} form={form}></HotLitresForm>
            </TabPane>
          )} */}
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default DrawerForm;
