import React, { useState, useEffect } from 'react';

import { EditOutlined, PlusOutlined, DeleteOutlined, QuestionCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Form, Button, Tabs, Modal, notification, Drawer, Divider, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import _ from 'lodash';

import { AddressCode } from './fields';

import Items from './items';

import api, { ADDRESSES } from '../../../api';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, setFilterValue }) => {
  const [tableAPI, setTableAPI] = useState(null);
  const [lines, setLines] = useState([]);
  const [addressKey, setAddressKey] = useState('');

  const { t } = useTranslation();
  const [form] = Form.useForm();

  const IS_CREATING = !value;

  const { resetFields } = form;

  const addressCode = value?.db_address_key;

  // use onSuccess option to handle some settings after data is retrieved successfully.
  // note: Tne component of Table Transfer requires the data source to have an index key. 
  const { data: payload, isValidating } = useSWR(
    `${ADDRESSES.LINES}?address_code=${addressCode}`,
    { refreshInterval: 0,
      onSuccess: 
        (data, key, config) => {
          console.log('Entered onSuccess!!!'); 
          console.log({data}); 
          data.records.forEach((item) => {
            item.db_addr_line_type = _.toNumber(item.db_addr_line_type);
          });
          setLines(data?.records);
      }
    }
  );

  const onFormClosed = () => {
    resetFields();
    handleFormState(false, null);
  };

  const onItemValidation = items => {
    const errors = [];

    _.forEach(items, item => {
      //check the column 'db_addr_line_type' and column 'db_addr_line'
      if (item.db_addrline_no) {
        if (!item.db_addr_line_type || item.db_addr_line_type === t('placeholder.selectAddressLineType')) {
          errors.push({
            key: String(item.db_addrline_no)+':'+t('fields.addressLineType'),
            field: t('fields.addressLineType'),
            message: `${t('descriptions.pleaseFillLineField')}${item.db_addrline_no}`
          });
        }
        if (!item.db_addr_line || item.db_addr_line === t('placeholder.enterAddressLineText')) {
          errors.push({
            key: String(item.db_addrline_no)+':'+t('fields.addressLineText'),
            field: t('fields.addressLineText'),
            message: `${t('descriptions.pleaseFillLineField')}${item.db_addrline_no}`
          });
        }
        else {
          const len = (new TextEncoder().encode(item.db_addr_line)).length;
          if (len > 210) {
            errors.push({
              key: String(item.db_addrline_no)+':'+t('fields.addressLineText'),
              field: t('fields.addressLineText'),
              message: `${t('placeholder.maxCharacters')}: 210 ─ ${t('descriptions.maxCharacters')}`
            });
          }
        }
      }

      // TODO, validate the 'db_addr_line' according to the line type in 'db_addr_line_type'

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
      /* _.forEach(errors, error => {
        notification.error({
          message: error.field,
          description: error.message,
          key: error.key
        });
      }); */
    }

    return errors;
  };

  const onComplete = (db_address_key) => {
    resetFields();
    handleFormState(false, null);
    mutate(ADDRESSES.READ);
    if (db_address_key) {
      setFilterValue("" + db_address_key);
    } else {
      setFilterValue(' ');
    }
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    const items = [];

    tableAPI.forEachNodeAfterFilterAndSort((rowNode, index) => {
      if (rowNode?.data?.address_action !== '-') {
        items.push(rowNode.data);
      }
    });

    const errors = onItemValidation(items);

    if (errors.length === 0) {
      items.forEach((item) => {
        item.db_addr_line_id = addressKey;
        if (item.address_action !== '+' && item.address_action !== '-') {
          item.address_action = '*';
        }
      });

      values.addr_lines = items;

      Modal.confirm({
        title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
        okText: IS_CREATING ? t('operations.create') : t('operations.update'),
        okType: 'primary',
        icon: <QuestionCircleOutlined />,
        cancelText: t('operations.no'),
        centered: true,
        onOk: async () => {
          await api
            .post(IS_CREATING ? ADDRESSES.CREATE : ADDRESSES.UPDATE, values)
            .then(() => {
              onComplete(values?.db_address_key);

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
          .post(ADDRESSES.DELETE, value)
          .then(() => {
            onComplete();

            notification.success({
              message: t('messages.deleteSuccess'),
              description: `${t('descriptions.deleteSuccess')}`,
            });
          })
          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              if (error.message.indexOf('child record found') >= 0) {
                notification.error({
                  message: t('descriptions.deleteFailed'),
                  description: t('descriptions.childRecordFound'),
                });
              } else {
                notification.error({
                  message: error.type,
                  description: error.message,
                });
              }
            });
          });
      },
    });
  };

  const onUpdateTemplate = () => {
    let template = '';
    tableAPI.forEachNodeAfterFilterAndSort((rowNode, index) => {
      if (rowNode?.data?.address_action !== '-') {
        const item = rowNode.data;
        if ( template.length > 0 )
        {
          template += ",";	
        }
        template += String(item.db_addr_line_type);
      }
    });

    Modal.confirm({
      title: t('prompts.update'),
      okText: t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(ADDRESSES.UPDATE_TEMPLATE, {config_key: 'SITE_ADDRESS_TEMPLATE', config_value: template})
          .then(() => {
            //onComplete();

            notification.success({
              message: t('messages.updateSuccess'),
              description: t('messages.updateSuccess'),
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
    if (!value) {
      resetFields();
    }
  }, [resetFields, value]);

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      onClose={onFormClosed}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="50vw"
      visible={visible}
      footer={
        <>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={onFormClosed}
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
              disabled={!access?.canDelete}
              onClick={onDelete}
            >
              {t('operations.delete')}
            </Button>
          )}

          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={onUpdateTemplate}
            style={{ float: 'right', marginRight: 5 }}
            disabled={false}
          >
            {t('operations.setAddressTemplate')}
          </Button>
        </>
      }
    >
      <Form layout="vertical" form={form} scrollToFirstError>
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.general')} key="1">
            <AddressCode form={form} value={value} onChange={setAddressKey} />
            <Divider />
            <Items
              setTableAPIContext={setTableAPI}
              value={lines}
              addressCode={addressKey ? addressKey : value?.db_address_key}
            />
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
