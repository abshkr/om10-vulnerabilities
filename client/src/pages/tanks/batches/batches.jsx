import React, { useState, useEffect } from 'react';

import {
  Card,
  Button,
  Checkbox,
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
  Divider,
  Switch,
  Tag,
} from 'antd';

import {
  EditOutlined,
  CloseOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import _ from 'lodash';
import moment from 'moment';

import { DataTable, Download, DateTimeRangePicker } from '../../../components';
import api, { TANK_BATCHES, TANKS } from '../../../api';
import { SETTINGS } from '../../../constants';
import { getCurrentTime } from '../../../utils';
import columns from './columns';

const TankBatches = ({ terminal, code, value, access, tanks, config }) => {
  const rangeSetting = '365~~1';

  const { t } = useTranslation();

  const [form] = Form.useForm();
  const { resetFields, setFieldsValue } = form;

  const [data, setData] = useState(null);
  const [refreshed, setRefreshed] = useState(false);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [historyCreated, setHistoryCreated] = useState(0);
  const [historyUpdated, setHistoryUpdated] = useState(0);
  const [tankUpdated, setTankUpdated] = useState(0);
  const [currentBatch, setCurrentBatch] = useState(value?.tank_batch_no);
  const [batchEditable, setBatchEditable] = useState(false);

  // const url = code ? `${TANK_BATCHES.READ}?tank_code=${code}&tank_terminal=${terminal}` : null;
  const url =
    code && terminal
      ? start && end
        ? `${TANK_BATCHES.READ}?start_date=${start}&end_date=${end}&tank_code=${code}&tank_terminal=${terminal}`
        : `${TANK_BATCHES.READ}?tank_code=${code}&tank_terminal=${terminal}`
      : start && end
      ? `${TANK_BATCHES.READ}?start_date=${start}&end_date=${end}`
      : null;

  const { data: payload, isValidating, revalidate } = useSWR(url, { revalidateOnFocus: false });

  const isLoading = isValidating || !data;

  const fields = columns(t, config);

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
  };

  const onRefresh = () => {
    setRefreshed(true);
  };

  const onCheck = (v) => {
    setBatchEditable(v.target.checked);
  };

  const getBatches = async (code) => {
    const results = await api.get(`${TANK_BATCHES.READ_BY_CODE}?tank_batch_code=${code}`);

    return results?.data?.records;
  };

  const checkBatches = async (code) => {
    const results = await api.get(`${TANK_BATCHES.CHECK_BATCHES_BY_CODE}?tank_batch_code=${code}`);

    return results?.data?.records;
  };

  const onComplete = () => {
    setData(null);
    setRefreshed(true);
    // revalidate();
    // mutate(url);
  };

  const updateTankBatchNumber = async (vobj) => {
    const values = {};
    values.tank_code = vobj?.tank_code;
    values.tank_terminal = vobj?.tank_terminal;
    values.tank_batch_no = vobj?.tank_batch_no;

    await api
      .post(TANKS.UPDATE, values)
      .then(() => {
        // mutate(TANKS.READ);

        let notes = t('descriptions.updateSuccessTankBatchNumber');
        notes = notes.replace('[[TANK]]', '"' + vobj?.tank_code + ' [' + vobj?.tank_terminal + ']"');
        notes = notes.replace('[[BATCH]]', '"' + vobj?.tank_batch_no + '"');

        /* setFieldsValue({
          tank_batch_no: values?.tank_batch_no,
        }); */
        setCurrentBatch(values.tank_batch_no);

        notification.success({
          message: t('messages.updateSuccess'),
          description: notes,
        });

        setTankUpdated(1);
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });

        setTankUpdated(-1);
      });
  };

  const updateTankBatchHistory = async (vobj) => {
    const values = {};
    values.tank_batch_code = vobj?.tank_batch_prev;
    values.tank_code = vobj?.tank_code;
    values.tank_terminal = vobj?.tank_terminal;
    values.tank_base = vobj?.tank_base;
    // const currTime = config?.serverTime;
    const currTime = await getCurrentTime();
    const serverCurrent = moment(currTime, SETTINGS.DATE_TIME_FORMAT);
    values.tank_batch_end = serverCurrent.format(SETTINGS.DATE_TIME_FORMAT);

    await api
      .post(TANK_BATCHES.UPDATE, values)
      .then(() => {
        // onComplete();

        let notes = t('descriptions.updateSuccessTankBatchHistory');
        notes = notes.replace('[[TANK]]', '"' + vobj?.tank_code + ' [' + vobj?.tank_terminal + ']"');
        notes = notes.replace('[[BATCH]]', '"' + vobj?.tank_batch_prev + '"');

        notification.success({
          message: t('messages.updateSuccess'),
          description: notes,
        });

        setHistoryUpdated(1);
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });

        setHistoryUpdated(-1);
      });
  };

  const createTankBatchHistory = async (vobj) => {
    const values = vobj;

    await api
      .post(TANK_BATCHES.CREATE, values)
      .then(() => {
        // onComplete();

        let notes = t('descriptions.createSuccessTankBatchHistory');
        notes = notes.replace('[[TANK]]', '"' + vobj?.tank_code + ' [' + vobj?.tank_terminal + ']"');
        notes = notes.replace('[[BATCH]]', '"' + vobj?.tank_batch_no + '"');

        notification.success({
          message: t('messages.createSuccess'),
          description: notes,
        });

        setHistoryCreated(1);
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });

        setHistoryCreated(-1);
      });
  };

  const onFinish = async () => {
    const valids = await form.validateFields();
    const values = {};
    values.tank_batch_no = valids?.tank_batch_no;
    values.tank_batch_code = valids?.tank_batch_no;
    values.tank_batch_prev = currentBatch; //value?.tank_batch_no;
    values.tank_code = value?.tank_code;
    values.tank_terminal = value?.tank_terminal;
    values.tank_base = value?.tank_base;
    values.tank_density = value?.tank_density;
    // values.tank_prod_qcr    = value?.tank_prod_qcr;
    values.tank_api = value?.tank_api;
    values.tank_std_temp = config?.referenceTemperature; // 15;
    values.tank_prod_c_of_e = value?.tank_prod_c_of_e;
    values.tank_15_density = value?.tank_15_density;
    values.tank_sulphur = value?.tank_sulphur;
    values.tank_flashpoint = value?.tank_flashpoint;
    values.tank_viscosity = value?.tank_viscosity;
    values.tank_sg = value?.tank_sg;
    values.tank_roof_weight = value?.tank_roof_weight;
    values.tank_dens_mode = value?.tank_dens_mode;

    const batches = await getBatches(values.tank_batch_code);

    let customTitles = t('prompts.update');
    let okEnabled = true;
    if (batches?.length > 0) {
      // batch code used
      okEnabled = false;
      if (
        batches?.[0]?.tank_code === value?.tank_code &&
        batches?.[0]?.tank_terminal === value?.tank_terminal
      ) {
        // batch code used by current tank
        customTitles = t('descriptions.batchCodeUsedByCurrentTank');
        customTitles = customTitles.replace(
          '[[TANK]]',
          '"' + value?.tank_code + ' - ' + value?.tank_name + ' [' + value?.tank_terminal + ']"'
        );
      } else {
        // batch code used by another tank
        customTitles = t('descriptions.batchCodeUsedByAnotherTank');
        customTitles = customTitles.replace(
          '[[TANK]]',
          '"' +
            batches?.[0]?.tank_code +
            ' - ' +
            batches?.[0]?.tank_name +
            ' [' +
            batches?.[0]?.tank_terminal +
            ']"'
        );
      }
    } else {
      // batch code not used
      okEnabled = true;
      if (_.trim(values.tank_batch_code).length === 0) {
        customTitles = t('descriptions.batchCodeBlank');
      } else {
        customTitles = t('descriptions.batchCodeNotUsed');
      }
    }

    Modal.confirm({
      title: customTitles,
      okText: t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      okButtonProps: {
        hidden: !okEnabled,
      },
      onCancel: () => {
        if (value) {
          setFieldsValue({
            tank_batch_no: values?.tank_batch_prev,
          });
        }
      },
      onOk: async () => {
        // when previous batch number is not blank, end it
        if (_.trim(values.tank_batch_prev).length > 0) {
          // end the previous batch
          await updateTankBatchHistory(values);
        } else {
          setHistoryUpdated(2);
        }
        // when batch number is not blank, a new record is added to history
        if (_.trim(values.tank_batch_code).length > 0) {
          // add the next batch
          await createTankBatchHistory(values);
        } else {
          setHistoryCreated(2);
        }
        // update tank record
        await updateTankBatchNumber(values);
      },
    });
  };

  const validate = (rule, input) => {
    const limit = rule?.maxlen || 200;

    if (rule?.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${rule?.label}`);
      }
    }

    const len = new TextEncoder().encode(input).length;
    if (input && input.length > limit) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${limit} ─ ${t('descriptions.maxCharacters')}`
      );
    }

    return Promise.resolve();
  };

  const modifiers = (
    <>
      <DateTimeRangePicker
        handleChange={setRange}
        rangeSetting={rangeSetting}
        refreshed={refreshed}
        setRefreshed={setRefreshed}
        disabled={false}
        enableClear={true}
        max={1000}
        // localBased={true}
      />

      <Button icon={<SyncOutlined />} onClick={onRefresh} loading={isLoading}>
        {t('operations.refresh')}
      </Button>

      <Download data={data} isLoading={isLoading} columns={fields} />
    </>
  );

  useEffect(() => {
    if (payload) {
      setData(payload?.records);
      payload.records = null;
    }
  }, [payload, setData]);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tank_code: value?.tank_code,
        tank_batch_no: value?.tank_batch_no,
        tank_active: value?.tank_active,
      });
      setCurrentBatch(value?.tank_batch_no);
      setBatchEditable(!value?.tank_active);
    }
  }, [value, setFieldsValue]);

  /* useEffect(() => {
    if (currentBatch !== undefined) {
      setFieldsValue({
        tank_batch_no: currentBatch,
      });
    }
  }, [currentBatch, setFieldsValue]); */

  useEffect(() => {
    if (historyCreated !== 0 && historyUpdated !== 0 && tankUpdated !== 0) {
      mutate(TANKS.READ);
      onComplete();
      setHistoryCreated(0);
      setHistoryUpdated(0);
      setTankUpdated(0);
    }
  }, [historyCreated, historyUpdated, tankUpdated]);

  return (
    <>
      <Card hoverable>
        <Form layout="horizontal" form={form} scrollToFirstError>
          <Row gutter={[12, 4]}>
            <Col span={20}>
              <Form.Item
                name="tank_code"
                label={t('fields.tank')}
                rules={[{ required: false, label: t('fields.tank') }]}
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
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="tank_active" label={t('fields.inUse')}>
                <Switch
                  checked={value?.tank_active}
                  style={{ visibility: 'visible', width: '100%' }}
                  checkedChildren={<span>{t('operations.yes')}</span>}
                  unCheckedChildren={<span>{t('operations.no')}</span>}
                  // disabled={true}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="tank_batch_no"
            label={t('fields.tankBatchCurrentNumber')}
            rules={[
              {
                required: false,
                validator: validate,
                maxlen: 200,
                label: t('fields.tankBatchCurrentNumber'),
              },
            ]}
          >
            <Input
              style={{ width: '100%', color: value?.tank_active ? 'red' : 'green' }}
              disabled={!batchEditable}
            />
          </Form.Item>
          <Row gutter={[12, 4]}>
            <Col span={16}>
              <Checkbox
                checked={batchEditable}
                onChange={onCheck}
                style={{ visibility: value?.tank_active ? 'visible' : 'hidden' }}
              >
                <Tag
                  color={'red'}
                  style={{
                    fontWeight: 'bold',
                    fontSize: '14px',
                    visibility: value?.tank_active ? 'visible' : 'hidden',
                  }}
                >
                  {t('descriptions.batchCodeTankActive')}
                </Tag>
              </Checkbox>
            </Col>
            <Col span={8}>
              <Form.Item>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  htmlType="submit"
                  onClick={onFinish}
                  disabled={!access?.canUpdate || !batchEditable}
                  style={{ float: 'right' }}
                >
                  {t('operations.update')}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card hoverable>
        <Row gutter={[12, 4]}>
          <Col span={24}>
            <div style={{ float: 'right' }}>{modifiers}</div>
          </Col>
        </Row>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <DataTable
              minimal={false}
              columns={fields}
              data={data}
              // parentHeight="272px"
              // onClick={(payload) => handleFormState(true, payload)}
              // handleSelect={(payload) => handleFormState(true, payload[0])}
              // extra={modifiers}
              isLoading={isLoading}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default TankBatches;
