import React, { useEffect, useState } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  CopyOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, notification, Modal, Checkbox, Input, Drawer, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import _ from 'lodash';
import useSWR from 'swr';
import { setter, generator } from './generator';

import api, { ROLE_ACCESS_MANAGEMENT } from '../../../api';
import { ALPHANUMERIC_MULTILINGUAL } from 'constants/regex';
import CopyTo from './copy-to';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, data, setFilterValue }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [modules, setmodules] = useState([]);

  const { resetFields, setFieldsValue } = form;
  const { data: privileges } = useSWR(`${ROLE_ACCESS_MANAGEMENT.PRIVILEGES}`);

  const IS_CREATING = !value;

  const onComplete = (auth_level_name) => {
    resetFields();
    handleFormState(false, null);
    mutate(ROLE_ACCESS_MANAGEMENT.READ);

    if (auth_level_name) {
      setFilterValue('' + auth_level_name);
    } else {
      setFilterValue(' ');
    }
  };

  const onFormClosed = () => {
    resetFields();
    handleFormState(false, null);
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    
    const privTemplate = IS_CREATING ? privileges?.records : value?.privilege;
    const privilege = generator(privTemplate, values);

    const payload = {
      // auth_level_name: IS_CREATING ? values?.auth_level_name : value?.auth_level_name,
      auth_level_name: IS_CREATING ? values?.auth_level_name : value?.auth_level_key,
      role_note: IS_CREATING ? values?.role_note : (value?.role_id<10 ? value?.role_note_org : values?.role_note),
      role_code: IS_CREATING ? undefined : value?.role_code,
      delete_check: values?.delete_check || false,
      lock_check: values?.lock_check || false,
      privilege,
    };

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(IS_CREATING ? ROLE_ACCESS_MANAGEMENT.CREATE : ROLE_ACCESS_MANAGEMENT.UPDATE, payload)
          .then((response) => {
            onComplete(values?.auth_level_name);

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
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(ROLE_ACCESS_MANAGEMENT.DELETE, value)
          .then((response) => {
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
    if (rule?.field === 'auth_level_name') {
      const match = _.find(data, (record) => {
        return record.auth_level_name.toLowerCase() === input?.toLowerCase();
      });

      const regex = new RegExp(ALPHANUMERIC_MULTILINGUAL);
      const validated = regex.exec(input);

      if (!validated && !value) {
        return Promise.reject(`${t('validate.invalidInput')}: ${t('descriptions.mustBeAlphaNumeric')}`);
      }

      if (!!match && !value) {
        return Promise.reject(t('descriptions.alreadyExists'));
      }
    }

    if (input === '' || !input) {
      if (rule.field === 'auth_level_name') {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.roleName')}`);
      } else {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.comments')}`);
      }
    }

    const len = (new TextEncoder().encode(input)).length;
    if (input && len > 40 && rule.field === 'auth_level_name') {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 40 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (!IS_CREATING) {
      const set = setter(value.privilege);

      setFieldsValue({
        ...set,
        role_note: value?.role_note,
        auth_level_name: value?.auth_level_name,
        auth_level_title: value?.auth_level_title,
        lock_check: value?.lock_check,
        delete_check: value?.delete_check,
      });
    } else {
      resetFields();
      const defaultPriv = ['View'];
      setFieldsValue({
        MENU_HOME: defaultPriv,
      });
    }
  }, [value, IS_CREATING, setFieldsValue]);

  useEffect(() => {
    if (privileges) {
      const menuItems = privileges.records;
      const mod = {};
      for (let i = 0; i < menuItems.length; i++) {
        mod[menuItems[i].object_text] = menuItems[i].domain_object_active;
      }
      // console.log(mod);
      setmodules(mod);
    }
  }, [privileges]);

  const options = [
    { label: t('fields.accessView'),      value: 'View' },
    { label: t('fields.accessUpdate'),    value: 'Update' },
    { label: t('fields.accessCreate'),    value: 'Create' },
    { label: t('fields.accessDelete'),    value: 'Delete' },
    { label: t('fields.accessPassword'),  value: 'Password' }
  ];
  // const options = ['View', 'Update', 'Create', 'Delete', 'Password'];
  const loadScheduleOptions = [...options, {label: t('fields.accessScheduleProduct'), value: 'Extra'}];
  // const loadScheduleOptions = [...options, 'Schedule Product'];
  const folioOptions = [...options, {label: t('fields.accessCloseFreezeFolio'), value: 'Extra'}];
  // const folioOptions = [...options, 'Close/Freeze Folio'];

  // if (IS_CREATING) {
  //   return (
  //     <Drawer
  //       bodyStyle={{ paddingTop: 5 }}
  //       onClose={() => handleFormState(false, null)}
  //       maskClosable={IS_CREATING}
  //       destroyOnClose={true}
  //       mask={IS_CREATING}
  //       placement="right"
  //       width="50vw"
  //       visible={visible}
  //       footer={
  //         <>
  //           <Button
  //             htmlType="button"
  //             icon={<CloseOutlined />}
  //             style={{ float: 'right' }}
  //             onClick={() => handleFormState(false, null)}
  //           >
  //             {t('operations.cancel')}
  //           </Button>

  //           <Button
  //             type="primary"
  //             icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
  //             htmlType="submit"
  //             style={{ float: 'right', marginRight: 5 }}
  //             onClick={onFinish}
  //             disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate}
  //           >
  //             {IS_CREATING ? t('operations.create') : t('operations.update')}
  //           </Button>
  //         </>
  //       }
  //     >
  //       <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError>
  //         <Tabs defaultActiveKey="1" animated={false}>
  //           <TabPane tab={t('tabColumns.general')} key="1" forceRender>
  //             <Form.Item
  //               name="auth_level_name"
  //               label={t('fields.roleName')}
  //               rules={[{ required: true, validator: validate }]}
  //             >
  //               <Input />
  //             </Form.Item>

  //             <Form.Item
  //               name="role_note"
  //               label={t('fields.comments')}
  //               rules={[{ required: true, validator: validate }]}
  //             >
  //               <Input.TextArea options={options} style={{ flexDirection: 'row' }} />
  //             </Form.Item>
  //           </TabPane>
  //         </Tabs>
  //       </Form>
  //     </Drawer>
  //   );
  // }

  const onCopy = () => {
    const targets = new Array();
    for (let i = 0; i < data.length; i ++) {
      if (data[i].role_id === value.role_id) {
        continue;
      }

      targets.push({
        role_code: data[i].role_code,
        role_id: data[i].role_id,
        auth_level_name: data[i].auth_level_name,
      })
    }

    Modal.info({
      className: 'form-container',
      title: t("operations.copyPriv"),
      centered: true,
      width: '25vw',
      icon: <CopyOutlined />,
      keyboard: false,
      content: (
      // <SWRConfig
      //     value={{
      //     refreshInterval: 0,
      //     fetcher,
      //     }}
      // >
        <CopyTo 
          current={value}
          targets={targets}
          onCopyReturn={onComplete}
        />
      // </SWRConfig>
      ),
      okButtonProps: {
      style: { display: 'none' },
      },
    });

    return null;
  };

  return (
    <Drawer
      closable={false}
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
            htmlType="submit"
            onClick={onFinish}
            style={{ float: 'right', marginRight: 5 }}
            disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          {!IS_CREATING && (
            <Button
              type="primary"
              icon={<CopyOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              onClick={onCopy}
              disabled={!access?.canUpdate }
            >
              {t('operations.copyPriv')}
            </Button>
          )}

          {!IS_CREATING && (
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              onClick={onDelete}
              disabled={!access?.canDelete || value.role_id < 20}
            >
              {t('operations.delete')}
            </Button>
          )}
        </>
      }
    >
      <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError>
        <Tabs defaultActiveKey="0" animated={false} tabPosition="top">
          <TabPane
            // className="ant-tab-window-no-margin"
            tab={t('tabColumns.general')}
            key="0"
          >
            <Form.Item
              name="auth_level_name"
              label={t('fields.roleName')}
              rules={[{ required: true, validator: validate }]}
            >
              <Input disabled={!!value} />
            </Form.Item>

            <Form.Item
              name="role_note"
              label={t('fields.comments')}
              rules={[{ required: true, validator: validate }]}
            >
              <Input.TextArea 
                options={options} 
                style={{ flexDirection: 'row' }} 
                disabled={value?.role_id<10}
              />
            </Form.Item>

            <Form.Item
              name="lock_check"
              label={t('fields.personLockCheck')}
              valuePropName="checked"
            >
              <Switch></Switch>
            </Form.Item>

            <Form.Item
              name="delete_check"
              label={t('fields.personDeleteCheck')}
              valuePropName="checked"
            >
              <Switch></Switch>
            </Form.Item>
          </TabPane>

          <TabPane tab={t('tabColumns.main')} key="1">
            <Form.Item name="MENU_HOME" style={{display: modules?.MENU_HOME ? "" :"none"}} label={t('pageMenu.home')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_SITECONFIG" style={{display: modules?.M_SITECONFIG ? "" :"none"}} label={t('pageNames.siteConfiguration')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            {/* <Form.Item name="MENU_SCHEDULE" style={{display: modules?.m_movementreason ? "" :"none"}} label={t('pageMenu.schedules')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="MENU_GANTRY" style={{display: modules?.m_movementreason ? "" :"none"}} label={t('pageMenu.gantry')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="MENU_REPORTS" style={{display: modules?.m_movementreason ? "" :"none"}} label={t('pageMenu.reports')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="MENU_ACCESS" style={{display: modules?.m_movementreason ? "" :"none"}} label={t('pageMenu.accessControl')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="MENU_CUSTOMERS" style={{display: modules?.m_movementreason ? "" :"none"}} label={t('pageMenu.customers')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="MENU_STOCK" style={{display: modules?.m_movementreason ? "" :"none"}} label={t('pageMenu.stockManagement')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="MENU_PRINTERS" style={{display: modules?.m_movementreason ? "" :"none"}} label={t('pageMenu.printerConfiguration')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="MENU_STOCKRECON" style={{display: modules?.m_movementreason ? "" :"none"}} label={t('pageMenu.stockReconciliation')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="MENU_OPERATIONS" style={{display: modules?.m_movementreason ? "" :"none"}} label={t('pageMenu.operations')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item> */}
          </TabPane>

          <TabPane tab={t('pageMenu.operations')} key="2">
            <Form.Item name="M_LOADSCHEDULES" style={{display: modules?.M_LOADSCHEDULES ? "" :"none"}} label={t('pageNames.loadSchedules')}>
              <Checkbox.Group
                options={loadScheduleOptions}
                style={{ flexDirection: 'row', marginBottom: '.7rem' }}
              />
            </Form.Item>

            <Form.Item name="M_ORDERLISTING" style={{display: modules?.M_ORDERLISTING ? "" :"none"}} label={t('pageNames.orderListing')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_TRANSACTIONLIST" style={{display: modules?.M_TRANSACTIONLIST ? "" :"none"}} label={t('pageNames.transactionList')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_NOMINATION" style={{display: modules?.M_NOMINATION ? "" :"none"}} label={t('pageNames.movementNominations')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_SPECIALMOVEMENTS" style={{display: modules?.M_SPECIALMOVEMENTS ? "" :"none"}} label={t('pageNames.specialMovements')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_MANUALTRANSACTIONS" style={{display: modules?.M_MANUALTRANSACTIONS ? "" :"none"}} label={t('pageNames.manualTransactions')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_PRODUCTMOVEMENT" style={{display: modules?.M_PRODUCTMOVEMENT ? "" :"none"}} label={t('pageNames.productMovements')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_INVENTORYREQUEST" style={{display: modules?.M_INVENTORYREQUEST ? "" :"none"}} label={t('pageNames.inventoryRequests')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_GATECONTROL" style={{display: modules?.M_GATECONTROL ? "" :"none"}} label={t('pageNames.gateControl')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_EQUIPMENT" style={{display: modules?.M_EQUIPMENT ? "" :"none"}} label={t('pageNames.equipmentTypes')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_EQUIPMENTLIST" style={{display: modules?.M_EQUIPMENTLIST ? "" :"none"}} label={t('pageNames.equipmentList')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_TANKERS" style={{display: modules?.M_TANKERS ? "" :"none"}} label={t('pageNames.tankerList')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>
          </TabPane>

          <TabPane tab={t('pageMenu.stock')} key="3">
            <Form.Item name="M_TANKSTATUS" style={{display: modules?.M_TANKSTATUS ? "" :"none"}} label={t('pageNames.tanks')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_TANKGROUPS" style={{display: modules?.M_TANKGROUPS ? "" :"none"}} label={t('pageNames.tankGroups')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_SITEBALANCE" style={{display: modules?.M_SITEBALANCE ? "" :"none"}} label={t('pageNames.siteBalance')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_TANKINVENTORY" style={{display: modules?.M_TANKINVENTORY ? "" :"none"}} label={t('pageNames.tankInventory')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_PRODUCTINVENTORY" style={{display: modules?.M_PRODUCTINVENTORY ? "" :"none"}} label={t('pageNames.productInventory')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_SFTRANSACTIONLIST" style={{display: modules?.M_SFTRANSACTIONLIST ? "" :"none"}} label={t('pageNames.selfFuelTransactionList')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>
          </TabPane>

          <TabPane
            // className="ant-tab-window-no-margin"
            tab={t('pageMenu.reports')}
            key="4"
          >
            <Form.Item name="M_FOLIOMANAGEMENT" style={{display: modules?.M_FOLIOMANAGEMENT ? "" :"none"}} label={t('pageNames.folioSummary')}>
              <Checkbox.Group
                options={folioOptions}
                style={{ flexDirection: 'row', marginBottom: '.7rem' }}
              />
            </Form.Item>

            <Form.Item name="M_JASPERREPORTS" style={{display: modules?.M_JASPERREPORTS ? "" :"none"}} label={t('pageNames.onDemandReports')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_JOURNALREPORT" style={{display: modules?.M_JOURNALREPORT ? "" :"none"}} label={t('pageNames.journal')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_GSAPMESSAGING" style={{display: modules?.M_GSAPMESSAGING ? "" :"none"}} label={t('pageNames.hostMessagingInterface')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_ONSITEREPORT" style={{display: modules?.M_ONSITEREPORT ? "" :"none"}} label={t('pageNames.personnelOnSite')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_AUDITREPORT" style={{display: modules?.M_AUDITREPORT ? "" :"none"}} label={t('pageNames.auditingData')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_METERING" style={{display: modules?.M_METERING ? "" :"none"}} label={t('pageNames.metering')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>
          </TabPane>

          <TabPane
            // className="ant-tab-window-no-margin"
            tab={t('pageMenu.security')}
            key="5"
          >
            <Form.Item name="M_PERSONNEL" style={{display: modules?.M_PERSONNEL ? "" :"none"}} label={t('pageNames.personnel')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_IDENTIFICATIONASSIGNMENT" style={{display: modules?.M_IDENTIFICATIONASSIGNMENT ? "" :"none"}} label={t('pageNames.idAssignment')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_EXPIRYDATES" style={{display: modules?.M_EXPIRYDATES ? "" :"none"}} label={t('pageNames.expiryDates')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_TIMECODES" style={{display: modules?.M_TIMECODES ? "" :"none"}} label={t('pageNames.timeCodes')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_ROLEACCESS" style={{display: modules?.M_ROLEACCESS ? "" :"none"}} label={t('pageNames.roleAccessManagement')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_AREA" style={{display: modules?.M_AREA ? "" :"none"}} label={t('pageNames.area')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_GATEPERMISSION" style={{display: modules?.M_GATEPERMISSION ? "" :"none"}} label={t('pageNames.gatePermission')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>
          </TabPane>

          <TabPane
            // className="ant-tab-window-no-margin"
            tab={t('pageMenu.products')}
            key="6"
          >
            <Form.Item name="M_BASEPRODUCTS" style={{display: modules?.M_BASEPRODUCTS ? "" :"none"}} label={t('pageNames.baseProducts')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_DRAWERPRODUCTS" style={{display: modules?.M_DRAWERPRODUCTS ? "" :"none"}} label={t('pageNames.drawerProducts')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_HAZCHEM" style={{display: modules?.M_HAZCHEM ? "" :"none"}} label={t('pageNames.hazchemCodes')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_DANGEROUSGOODS" style={{display: modules?.M_DANGEROUSGOODS ? "" :"none"}} label={t('pageNames.dangerousGoods')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_PRODUCTS" style={{display: modules?.M_PRODUCTS ? "" :"none"}} label={t('pageNames.productGroups')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            {/* <Form.Item name="M_PRICEOFFSETS" style={{display: modules?.m_movementreason ? "" :"none"}} label={t('pageNames.priceOffsets')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_CUSTOMERPRICING" style={{display: modules?.m_movementreason ? "" :"none"}} label={t('pageNames.customerPricing')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_ORDERPRODUCTPRICING" style={{display: modules?.m_movementreason ? "" :"none"}} label={t('pageNames.orderProductPricing')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item> */}
          </TabPane>

          <TabPane
            // className="ant-tab-window-no-margin"
            tab={t('pageMenu.companies')}
            key="7"
          >
            <Form.Item name="M_COMPANIES" style={{display: modules?.M_COMPANIES ? "" :"none"}} label={t('pageNames.companies')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_ALLOCATIONS" style={{display: modules?.M_ALLOCATIONS ? "" :"none"}} label={t('pageNames.allocations')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_CUSTOMERS" style={{display: modules?.M_CUSTOMERS ? "" :"none"}} label={t('pageNames.customers')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_ADDRESSES" style={{display: modules?.M_ADDRESSES ? "" :"none"}} label={t('pageNames.addresses')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_DELIVERYLOCATIONS" style={{display: modules?.M_DELIVERYLOCATIONS ? "" :"none"}} label={t('pageNames.deliveryLocations')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_PARTNERS" style={{display: modules?.M_PARTNERS ? "" :"none"}} label={t('pageNames.partners')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_PARTNERSHIP" style={{display: modules?.M_PARTNERSHIP ? "" :"none"}} label={t('pageNames.partnership')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_CUSTOMERCATEGORIES" style={{display: modules?.M_CUSTOMERCATEGORIES ? "" :"none"}} label={t('pageNames.customerCategories')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>
          </TabPane>

          <TabPane
            // className="ant-tab-window-no-margin"
            tab={t('pageMenu.config')}
            key="8"
          >
            <Form.Item name="M_LOADBAYS" style={{display: modules?.M_LOADBAYS ? "" :"none"}} label={t('pageNames.loadBays')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_BAYMOVEMENT" style={{display: modules?.M_BAYMOVEMENT ? "" :"none"}} label={t('pageNames.companyBayMovement')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_LOADMETERS" style={{display: modules?.M_LOADMETERS ? "" :"none"}} label={t('pageNames.loadMeters')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_METERINGDEVICES" style={{display: modules?.M_METERINGDEVICES ? "" :"none"}} label={t('pageNames.meterDevices')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_PHYSICALPRINTERS" style={{display: modules?.M_PHYSICALPRINTERS ? "" :"none"}} label={t('pageNames.physicalPrinters')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_SITEACCESSDEVICES" style={{display: modules?.M_SITEACCESSDEVICES ? "" :"none"}} label={t('pageNames.siteAccessDevices')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_KEYREADERDEVICES" style={{display: modules?.M_KEYREADERDEVICES ? "" :"none"}} label={t('pageNames.keyReaderDevices')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_TANKCONFIGURATION" style={{display: modules?.M_TANKCONFIGURATION ? "" :"none"}} label={t('pageNames.tankConfiguration')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_LOGICALPRINTERS" style={{display: modules?.M_LOGICALPRINTERS ? "" :"none"}} label={t('pageNames.logicalPrinters')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_REPOCONFIGURATION" style={{display: modules?.M_REPOCONFIGURATION ? "" :"none"}} label={t('pageNames.reportConfiguration')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_REPOPROFILE" style={{display: modules?.M_REPOPROFILE ? "" :"none"}} label={t('pageNames.reportProfile')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_FOLIOSCHEDULING" style={{display: modules?.M_FOLIOSCHEDULING ? "" :"none"}} label={t('pageNames.folioScheduling')}>
              <Checkbox.Group
                options={folioOptions}
                style={{ flexDirection: 'row', marginBottom: '.7rem' }}
              />
            </Form.Item>

            <Form.Item name="M_MOVEMENTREASON" style={{display: modules?.M_MOVEMENTREASON ? "" :"none"}} label={t('pageNames.movementReasons')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>
          </TabPane>

          <TabPane
            // className="ant-tab-window-no-margin"
            tab={t('pageMenu.modules')}
            key="10"
          >
            <Form.Item name="M_BAYVIEW" style={{display: modules?.M_BAYVIEW ? "" :"none"}} label={t('pageNames.bayView')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_ADAPTIVEFLOW" style={{display: modules?.M_ADAPTIVEFLOW ? "" :"none"}} label={t('pageNames.adaptiveFlow')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_FSCSTATUS" style={{display: modules?.M_FSCSTATUS ? "" :"none"}} label={t('pageNames.fscStatus')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_TANKVIEW" style={{display: modules?.M_TANKVIEW ? "" :"none"}} label={t('pageNames.tankView')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            {/* <Form.Item name="M_PRODUCTASSETS" style={{display: modules?.m_movementreason ? "" :"none"}} label={t('pageNames.drawerProductAssets')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item> */}
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
