import React, { useState, useEffect } from 'react';

import {
  Card,
  Button,
  Drawer,
  Modal,
  Form,
  Tabs,
  Input,
  Select,
  notification,
  Row,
  Col,
  Descriptions,
} from 'antd';

import {
  EditOutlined,
  CloseOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import _ from 'lodash';

import { DataTable } from '../../../components';
import api, { TANK_OWNERS, LOAD_SCHEDULES } from '../../../api';
import columns from './columns';

const { TabPane } = Tabs;

const TankOwners = ({ terminal, code, value, access, tanks, config }) => {
  const url = code && terminal ? `${TANK_OWNERS.READ}?tank_code=${code}&tank_terminal=${terminal}` : null;

  const { data } = useSWR(url);

  const { data: options, isValidating } = useSWR(LOAD_SCHEDULES.SUPPLIERS);

  const { t } = useTranslation();

  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const IS_CREATING = !selected;
  const percentPrecision = 4;

  const { resetFields, setFieldsValue, getFieldsValue } = form;

  const fields = columns(t, config);

  // Find if the owner has the ownership in the current tank
  // and the existing owner will be disabled in owner list when adding new ownership
  const isOwnerFound = (list, item) => {
    const ownership = _.find(list, (o) => o.tkcmpy_link === item.cmpy_code);
    if (!ownership) {
      return false;
    } else {
      return true;
    }
  };

  const handleFormState = (visibility, value) => {
    if (!visibility) {
      setFieldsValue({
        tkcmpy_link: null,
        tko_percentage: null,
        tkowner_qty: null,
        tko_std_ltr: null,
        tko_kg: null,
      });
    }
    if (value) {
      value.tko_percentage = _.round(value.tko_percentage, 4);
    }
    setSelected(value);
    setVisible(visibility);
  };

  const onComplete = () => {
    handleFormState(false, null);
    mutate(url);
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    values.tklink_tankcode = code;
    values.tklink_tankdepo = terminal;

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(IS_CREATING ? TANK_OWNERS.CREATE : TANK_OWNERS.UPDATE, values)
          .then(() => {
            onComplete();

            notification.success({
              message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
              description: IS_CREATING ? t('descriptions.createSuccess') : t('messages.updateSuccess'),
            });
          })
          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message:
                  error.code === 400 || error.code === 500
                    ? IS_CREATING
                      ? t('messages.createFailed')
                      : t('messages.updateFailed')
                    : error.type,
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
      icon: <DeleteOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(TANK_OWNERS.DELETE, selected)
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
                // message: error.type,
                message: error.code === 500 ? t('messages.deleteFailed') : error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  const validate2 = (rule, input) => {
    const min = 1;
    const limit = rule?.max || 256;
    console.log('.............rule', rule);

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${rule?.label}`);
    }

    if (input && _.toNumber(input) < min) {
      return Promise.reject(`${t('placeholder.minNumber')}: ${min} ─ ${t('descriptions.minNumber')}`);
    }

    if (input && input.length > limit) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${limit} ─ ${t('descriptions.maxCharacters')}`
      );
    }

    return Promise.resolve();
  };

  const validate = (rule, input) => {
    const min = rule?.minValue || 0;
    const max = rule?.maxValue || 999999999;
    const limit = rule?.maxLen || 256;
    console.log('.............rule', rule);

    if (rule?.required) {
      if (input === '' || (input !== 0 && !input)) {
        return Promise.reject(`${t('validate.set')} ─ ${rule?.label}`);
      }
    }

    if (input && _.toNumber(input) < min) {
      return Promise.reject(`${t('placeholder.minNumber')}: ${min} ─ ${t('descriptions.minNumber')}`);
    }

    if (input && _.toNumber(input) > max) {
      return Promise.reject(`${t('placeholder.maxNumber')}: ${max} ─ ${t('descriptions.maxNumber')}`);
    }

    if (input && input.length > limit) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${limit} ─ ${t('descriptions.maxCharacters')}`
      );
    }

    return Promise.resolve();
  };

  const validateList = (rule, input) => {
    if (rule?.required) {
      if (input === '' || (input !== 0 && !input)) {
        return Promise.reject(`${t('validate.set')} ─ ${rule?.label}`);
      }
    }

    return Promise.resolve();
  };

  const getQtyPercentage = (cmpy, proportion) => {
    // get Total Qty of the tank excluding the current company
    const totalQty = _.sumBy(data?.records, (o) => {
      if (o.tklink_tankcode === code && o.tklink_tankdepo === terminal && o.tkcmpy_link !== cmpy) {
        return o.tkowner_qty;
      } else {
        return 0;
      }
    });
    // get Qty Percentage
    const sumQty = totalQty + proportion;
    // console.log('.............getQtyPercent', cmpy, proportion, totalQty, sumQty);
    const percentage = (proportion / sumQty) * 100;

    return percentage;
  };

  const handleQtyProportionFieldChange = (v) => {
    const values = getFieldsValue(['tkcmpy_link', 'tko_percentage', 'tkowner_qty', 'tko_std_ltr', 'tko_kg']);

    // get Qty Proportion
    const proportion =
      v?.target?.value === '' || v?.target?.value === undefined ? 0 : _.toNumber(v?.target?.value);
    // const proportion = values?.tkowner_qty === '' || values?.tkowner_qty === undefined ? 0 : values?.tkowner_qty;
    // get Standard Volume
    const stdVol = proportion;
    // get Mass Qty
    const massQty = value?.tank_density * (stdVol / 1000);
    // get Qty Percentage
    const percentage = getQtyPercentage(values?.tkcmpy_link, proportion);
    // const isAdtv = value?.tank_base_class === '6' || value?.tank_base_class === '11';
    // const precision = isAdtv ? config?.precisionAdditive : config?.precisionVolume;
    const precision = config?.precisionVolume;
    // setFieldsValue({ tkowner_qty: _.round(proportion, precision) });
    setFieldsValue({ tko_std_ltr: _.round(stdVol, precision) });
    setFieldsValue({ tko_kg: _.round(massQty, precision) });
    setFieldsValue({ tko_percentage: _.round(percentage, percentPrecision) });
  };

  const handleStdVolFieldChange = async (v) => {
    const values = getFieldsValue(['tkcmpy_link', 'tko_percentage', 'tkowner_qty', 'tko_std_ltr', 'tko_kg']);

    // get Standard Volume
    const stdVol =
      v?.target?.value === '' || v?.target?.value === undefined ? 0 : _.toNumber(v?.target?.value);
    // const stdVol = values?.tko_std_ltr === '' || values?.tko_std_ltr === undefined ? 0 : values?.tko_std_ltr;
    // get Qty Proportion
    const proportion = stdVol;
    // get Mass Qty
    const massQty = value?.tank_density * (stdVol / 1000);
    // get Qty Percentage
    const percentage = getQtyPercentage(values?.tkcmpy_link, proportion);
    // const isAdtv = value?.tank_base_class === '6' || value?.tank_base_class === '11';
    // const precision = isAdtv ? config?.precisionAdditive : config?.precisionVolume;
    const precision = config?.precisionVolume;
    setFieldsValue({ tkowner_qty: _.round(proportion, precision) });
    // setFieldsValue({ tko_std_ltr: _.round(stdVol, precision) });
    setFieldsValue({ tko_kg: _.round(massQty, precision) });
    setFieldsValue({ tko_percentage: _.round(percentage, percentPrecision) });
  };

  const handleMassQtyFieldChange = async (v) => {
    const values = getFieldsValue(['tkcmpy_link', 'tko_percentage', 'tkowner_qty', 'tko_std_ltr', 'tko_kg']);

    // get Mass Qty
    const massQty =
      v?.target?.value === '' || v?.target?.value === undefined ? 0 : _.toNumber(v?.target?.value);
    // const massQty = values?.tko_kg === '' || values?.tko_kg === undefined ? 0 : values?.tko_kg;
    // get Standard Volume
    const stdVol = (massQty / value?.tank_density) * 1000;
    // get Qty Proportion
    const proportion = stdVol;
    // get Qty Percentage
    const percentage = getQtyPercentage(values?.tkcmpy_link, proportion);
    // const isAdtv = value?.tank_base_class === '6' || value?.tank_base_class === '11';
    // const precision = isAdtv ? config?.precisionAdditive : config?.precisionVolume;
    const precision = config?.precisionVolume;
    setFieldsValue({ tkowner_qty: _.round(proportion, precision) });
    setFieldsValue({ tko_std_ltr: _.round(stdVol, precision) });
    // setFieldsValue({ tko_kg: _.round(massQty, precision) });
    setFieldsValue({ tko_percentage: _.round(percentage, percentPrecision) });
  };

  const modifiers = (
    <>
      <Button
        type="primary"
        style={{ float: 'right' }}
        disabled={!(code && terminal) || !access.canCreate}
        onClick={() => handleFormState(true, null)}
      >
        {t('operations.addOwnership')}
      </Button>
    </>
  );

  /* useEffect(() => {
    if (code && currentRate) {
      const item = _.find(currentRate, (o) => o.tank_code === code);
      if (item) {
        setCurrTankLevel(item?.tank_level);
        setCurrFlowRate(_.round(item?.flow_rate, 0));
      }
    }
  }, [code, currentRate]); */

  useEffect(() => {
    if (code && terminal && !selected) {
      resetFields();

      setFieldsValue({
        tklink_tankcode: code,
        tklink_tankdepo: terminal,
      });
    }
  }, [resetFields, setFieldsValue, code, terminal, selected]);

  useEffect(() => {
    if (selected) {
      resetFields();
      setFieldsValue({
        tklink_tankcode: selected?.tklink_tankcode,
        tklink_tankdepo: selected?.tklink_tankdepo,
        tkcmpy_link: selected?.tkcmpy_link,
        tko_percentage: selected?.tko_percentage,
        tkowner_qty: _.round(selected?.tkowner_qty, config?.precisionVolume),
        tko_std_ltr: _.round(selected?.tko_std_ltr, config?.precisionVolume),
        tko_kg: _.round(selected?.tko_kg, config?.precisionVolume),
      });
    } else {
    }
  }, [resetFields, selected]);

  return (
    <>
      <Card hoverable>
        {/* <Select
          dropdownMatchSelectWidth={false}
          disabled={true}
          style={{ width: '100%' }}
          value={code+'|'+terminal}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {tanks.map((item, index) => (
            <Select.Option key={index} value={item.tank_code+'|'+item.tank_terminal}>
              {item.tank_code +
                ' - ' +
                item.tank_name +
                ' [' +
                item.tank_base +
                ' - ' +
                item.tank_base_name +
                ' - ' +
                item.tank_bclass_name +
                ']' +
                ' [' +
                item.tank_terminal +
                ' - ' +
                item.tank_sitename +
                ']'}
            </Select.Option>
          ))}
        </Select> */}

        <Row gutter={[2, 12]}>
          <Col span={10}>
            <Descriptions bordered size="small" layout="horizontal" style={{ marginTop: 0 }} column={1}>
              <Descriptions.Item label={t('fields.tank')} span={1}>
                {code && terminal && value?.tank_code + ' - ' + value?.tank_name}
              </Descriptions.Item>
              <Descriptions.Item label={t('fields.terminal')} span={1}>
                {code && terminal && value?.tank_terminal + ' - ' + value?.tank_sitename}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={14}>
            <Descriptions bordered size="small" layout="horizontal" style={{ marginTop: 0 }} column={1}>
              <Descriptions.Item label={t('fields.baseProduct')} span={1}>
                {code && terminal && value?.tank_base + ' - ' + value?.tank_base_name}
              </Descriptions.Item>
              <Descriptions.Item label={t('fields.baseProdClassDesc')} span={1}>
                {code && terminal && value?.tank_base_class + ' - ' + value?.tank_bclass_name}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>

        <Row gutter={[12, 12]}>
          <Col span={24}>
            <div>{modifiers}</div>
          </Col>
        </Row>

        <Row gutter={[12, 12]}>
          <Col span={24}>
            <DataTable
              minimal={true}
              columns={fields}
              data={!(code && terminal) ? [] : data?.records}
              parentHeight="272px"
              onClick={(payload) => handleFormState(true, payload)}
              handleSelect={(payload) => handleFormState(true, payload[0])}
            />
          </Col>
        </Row>
      </Card>

      <Drawer
        bodyStyle={{ paddingTop: 5 }}
        onClose={() => handleFormState(false, null)}
        maskClosable={IS_CREATING}
        destroyOnClose={true}
        mask={IS_CREATING}
        placement="right"
        width="30vw"
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
              icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
              htmlType="submit"
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
                onClick={onDelete}
                style={{ float: 'right', marginRight: 5 }}
                disabled={!access?.canDelete}
              >
                {t('operations.delete')}
              </Button>
            )}
          </>
        }
      >
        <Form layout="vertical" form={form} scrollToFirstError>
          <Tabs defaultActiveKey="1">
            <TabPane tab={t('tabColumns.general')} key="1">
              {/* <Form.Item
                name="tklink_tankcode"
                label={t('fields.tank')}
                rules={[{ required: true, label: t('fields.tank') }]}
              >
                <Select
                  dropdownMatchSelectWidth={false}
                  disabled={true}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {tanks.map((item, index) => (
                    <Select.Option key={index} value={item.tank_code}>
                      {item.tank_code +
                        ': ' +
                        item.tank_name +
                        ' [' +
                        item.tank_base +
                        ' - ' +
                        item.tank_base_name +
                        ' - ' +
                        item.tank_bclass_name +
                        ']'}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item> */}

              <Form.Item
                name="tkcmpy_link"
                label={t('fields.tkcmpyLink')}
                rules={[{ required: true, validator: validateList, label: t('fields.tkcmpyLink') }]}
              >
                <Select
                  dropdownMatchSelectWidth={false}
                  allowClear
                  loading={isValidating}
                  showSearch
                  disabled={!IS_CREATING}
                  // onChange={onChange}
                  optionFilterProp="children"
                  placeholder={!value ? t('placeholder.selectSupplier') : null}
                  filterOption={(value, option) =>
                    option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
                  }
                >
                  {options?.records.map((item, index) => (
                    <Select.Option
                      key={index}
                      value={item.cmpy_code}
                      // disabled={!!_.find(data?.records, (o)=>(o.tkcmpy_link===item.cmpy_code))}
                      disabled={isOwnerFound(data?.records, item)}
                    >
                      {item.cmpy_desc}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="tkowner_qty"
                label={t('fields.tkownerQty')}
                rules={[{ required: true, validator: validate, label: t('fields.tkownerQty') }]}
              >
                <Input
                  type="number"
                  // disabled={!IS_CREATING}
                  style={{ width: '100%' }}
                  min={1}
                  precision={config?.precisionVolume}
                  addonAfter={t('units.litre')}
                  onChange={handleQtyProportionFieldChange}
                />
              </Form.Item>

              <Form.Item
                name="tko_std_ltr"
                label={t('fields.tkoStdLtr')}
                rules={[{ required: true, validator: validate, label: t('fields.tkoStdLtr') }]}
              >
                <Input
                  type="number"
                  // disabled={!IS_CREATING}
                  style={{ width: '100%' }}
                  min={1}
                  precision={config?.precisionVolume}
                  addonAfter={t('units.litre')}
                  onChange={handleStdVolFieldChange}
                />
              </Form.Item>

              <Form.Item
                name="tko_kg"
                label={t('fields.tkoKg')}
                rules={[{ required: true, validator: validate, label: t('fields.tkoKg') }]}
              >
                <Input
                  type="number"
                  // disabled={!IS_CREATING}
                  style={{ width: '100%' }}
                  min={1}
                  precision={config?.precisionVolume}
                  addonAfter={t('units.kg')}
                  onChange={handleMassQtyFieldChange}
                />
              </Form.Item>

              <Form.Item
                name="tko_percentage"
                label={t('fields.tkoPercentage')}
                rules={[{ required: true, validator: validate, label: t('fields.tkoPercentage') }]}
              >
                <Input type="number" disabled={true} style={{ width: '100%' }} min={0} addonAfter={'%'} />
              </Form.Item>
            </TabPane>
          </Tabs>
        </Form>
      </Drawer>
    </>
  );
};

export default TankOwners;
