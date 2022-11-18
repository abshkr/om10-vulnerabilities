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
  Popover,
  Tag,
  List,
} from 'antd';

import {
  EditOutlined,
  CloseOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
  SyncOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import _ from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';

import { DataTable, Download } from '../../../components';
import api, { TANK_STRAPPING } from '../../../api';
import columns from './columns';
import errorColumns from './error-columns';
import StrapImportManager from './import';
import checkLevelVolumes from './check-level-volumes';

const { TabPane } = Tabs;

const TankStrapping = ({ terminal, code, tanks, access }) => {
  const url = code ? `${TANK_STRAPPING.READ}?strap_tankcode=${code}` : null;

  const { data, isValidating, revalidate } = useSWR(url);

  const isLoading = isValidating || !data;
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [errors, setErrors] = useState([]);
  const [lines, setLines] = useState(undefined);

  const IS_CREATING = !selected;

  const { resetFields, setFieldsValue } = form;

  const fields = columns(t);
  // console.log('......................isLoading', isLoading, code, isValidating, !data);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const onComplete = () => {
    handleFormState(false, null);
    mutate(url);
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(IS_CREATING ? TANK_STRAPPING.CREATE : TANK_STRAPPING.UPDATE, values)
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
      icon: <DeleteOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(TANK_STRAPPING.DELETE, selected)
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

  const validate = (rule, input) => {
    const limit = rule?.max || 256;

    if (input === '' || (input !== 0 && !input)) {
      return Promise.reject(`${t('validate.set')} ─ ${rule?.label}`);
    }

    if (input && input.length > limit) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${limit} ─ ${t('descriptions.maxCharacters')}`
      );
    }

    return Promise.resolve();
  };

  const loadStraps = async (value) => {
    console.log('Forms: loadStraps', value);
    revalidate();
  };

  const handleImport = () => {
    // pop up the dialog to manage straping data import
    StrapImportManager(
      t('operations.importStrapping'),
      { tank_code: code, tank_terminal: terminal },
      loadStraps,
      '60vw',
      '50vh'
    );
  };

  const modifiers = (
    <>
      {errors?.length > 0 && (
        <Popover placement={'bottom'} title={t('fields.errors')} content={lines} height={100}>
          <Tag icon={<CloseCircleOutlined />} color="error">
            {t('fields.errors') + ': ' + String(errors?.length)}
          </Tag>
        </Popover>
      )}

      <Button
        icon={<SyncOutlined />}
        onClick={() => mutate(url)}
        loading={code && isValidating}
        disabled={!code || isValidating}
      >
        {t('operations.refresh')}
      </Button>

      <Download
        data={data?.records}
        // data={payload}
        isLoading={code && isLoading}
        columns={fields}
      />

      <Button
        style={{ marginRight: 1 }}
        type="primary"
        // loading={code && isLoading}
        disabled={!code || isLoading || !access.canCreate}
        onClick={handleImport}
      >
        {t('operations.importStrapping')}
      </Button>

      <Button
        type="primary"
        // loading={code && isLoading}
        disabled={!code || isLoading || !access.canCreate}
        onClick={() => handleFormState(true, null)}
      >
        {t('operations.addStrapping')}
      </Button>
    </>
  );

  useEffect(() => {
    if (code && !selected) {
      form.resetFields();

      setFieldsValue({
        strap_tankcode: code,
      });
    }
  }, [resetFields, setFieldsValue, code, selected]);

  useEffect(() => {
    if (selected) {
      setFieldsValue({
        strap_tankcode: selected?.strap_tankcode,
        strap_height: selected?.strap_height,
        strap_volume: selected?.strap_volume,
      });
    } else {
    }
  }, [resetFields, selected]);

  useEffect(() => {
    if (data?.records) {
      const list = checkLevelVolumes(data?.records, t);
      setErrors(list);
      // console.log(data?.records, errors);
      setLines(undefined);
      if (list.length > 0) {
        /* const lines = (
          <Scrollbars
            style={{
              border: '1px solid black',
              // height: list.length > 5 ? '435px' : `${list.length * 87}px`,
              width: '55vw',
              marginTop: 5,
              marginRight: 5,
              marginBottom: 5,
              padding: 5,
            }}
            autoHeight
            autoHeightMin={0}
            autoHeightMax={445}
            thumbSize={300}
            thumbMinSize={100}
            //width={30}
          >
            <>
              {list?.map((error, index) => (
                <Card key={error.key} size="small" title={error.field}>
                  {error.message}
                </Card>
              ))}
            </>
          </Scrollbars>
        );
        setLines(lines); */

        const listlines = (
          <Scrollbars
            style={{
              border: '1px solid black',
              // height: list.length > 5 ? '435px' : `${list.length * 87}px`,
              width: '55vw',
              marginTop: 5,
              marginRight: 5,
              marginBottom: 5,
              padding: 5,
            }}
            autoHeight
            autoHeightMin={0}
            autoHeightMax={445}
            thumbSize={100}
            //thumbMinSize={100}
          >
            <List
              style={{ width: '100%' }}
              itemLayout="horizontal"
              dataSource={list}
              size="small"
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta title={item.field} description={item.message} />
                </List.Item>
              )}
            />
          </Scrollbars>
        );
        setLines(listlines);

        /* const table = (
          <DataTable
            columns={errorColumns(t)}
            data={list}
            parentHeight="200px"
            minimal
            style={{width: 500}}
          />
        );
        setLines(table); */
      }
    }
  }, [data]);

  return (
    <>
      <Card hoverable>
        {/* <Row gutter={[12, 12]}>
          <Col span={24}>
            <div style={{ float: 'right' }}>{modifiers}</div>
          </Col>
        </Row> */}

        <DataTable
          columns={fields}
          data={!code ? [] : data?.records}
          isLoading={code && isValidating}
          height="305px"
          extra={modifiers}
          onClick={(payload) => handleFormState(true, payload)}
          handleSelect={(payload) => handleFormState(true, payload[0])}
        />
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
            >
              {IS_CREATING ? t('operations.create') : t('operations.update')}
            </Button>

            {!IS_CREATING && (
              <Button
                type="danger"
                icon={<DeleteOutlined />}
                onClick={onDelete}
                style={{ float: 'right', marginRight: 5 }}
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
              <Form.Item
                name="strap_tankcode"
                label={t('fields.tank')}
                rules={[{ required: true, validator: validate, label: t('fields.tank') }]}
              >
                <Select
                  dropdownMatchSelectWidth={false}
                  allowClear
                  loading={isLoading}
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
              </Form.Item>

              <Form.Item
                name="strap_height"
                label={t('fields.level')}
                rules={[{ required: true, validator: validate, label: t('fields.level') }]}
              >
                <Input
                  type="number"
                  disabled={!IS_CREATING}
                  style={{ width: '100%' }}
                  min={0}
                  addonAfter={t('units.mm')}
                />
              </Form.Item>

              <Form.Item
                name="strap_volume"
                label={t('fields.observedVolume')}
                rules={[{ required: true, validator: validate, label: t('fields.observedVolume') }]}
              >
                <Input type="number" style={{ width: '100%' }} min={0} addonAfter={t('units.litres')} />
              </Form.Item>
            </TabPane>
          </Tabs>
        </Form>
      </Drawer>
    </>
  );
};

export default TankStrapping;
