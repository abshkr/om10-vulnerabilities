import React, { useEffect } from 'react';

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
import { ALPHANUMERIC } from 'constants/regex';
import CopyTo from './copy-to';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, data, setFilterValue }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { resetFields, setFieldsValue } = form;
  const { data: privileges } = useSWR(`${ROLE_ACCESS_MANAGEMENT.PRIVILEGES}`);

  const IS_CREATING = !value;

  const onComplete = (auth_level_name) => {
    handleFormState(false, null);
    mutate(ROLE_ACCESS_MANAGEMENT.READ);

    if (auth_level_name) {
      setFilterValue('' + auth_level_name);
    }
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    
    const privTemplate = IS_CREATING ? privileges?.records : value?.privilege;
    const privilege = generator(privTemplate, values);

    const payload = {
      auth_level_name: IS_CREATING ? values?.auth_level_name : value?.auth_level_name,
      role_note: IS_CREATING ? values?.role_note : value?.role_note,
      role_code: IS_CREATING ? undefined : value?.role_code,
      delete_check: values?.delete_check,
      lock_check: values?.lock_check,
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

      const regex = new RegExp(ALPHANUMERIC);
      const validated = regex.exec(input);

      if (!validated) {
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

    if (input && input.length > 40 && rule.field === 'auth_level_name') {
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

  const options = ['View', 'Update', 'Create', 'Delete', 'Password'];
  const loadScheduleOptions = [...options, {label: 'Schedule Product', value: 'Extra'}];
  // const loadScheduleOptions = [...options, 'Schedule Product'];
  const folioOptions = [...options, {label: 'Close/Freeze Folio', value: 'Extra'}];
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
      onClose={() => handleFormState(false, null)}
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
              <Input.TextArea options={options} style={{ flexDirection: 'row' }} />
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

          <TabPane tab={t('tabColumns.all')} key="1">
            <Form.Item name="MENU_HOME" label={t('pageMenu.home')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_SITECONFIG" label={t('pageNames.siteConfiguration')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            {/* <Form.Item name="MENU_SCHEDULE" label={t('pageMenu.schedules')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="MENU_GANTRY" label={t('pageMenu.gantry')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="MENU_REPORTS" label={t('pageMenu.reports')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="MENU_ACCESS" label={t('pageMenu.accessControl')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="MENU_CUSTOMERS" label={t('pageMenu.customers')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="MENU_STOCK" label={t('pageMenu.stockManagement')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="MENU_PRINTERS" label={t('pageMenu.printerConfiguration')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="MENU_STOCKRECON" label={t('pageMenu.stockReconciliation')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="MENU_OPERATIONS" label={t('pageMenu.operations')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item> */}
          </TabPane>

          <TabPane tab={t('pageMenu.operations')} key="2">
            <Form.Item name="M_LOADSCHEDULES" label={t('pageNames.loadSchedules')}>
              <Checkbox.Group
                options={loadScheduleOptions}
                style={{ flexDirection: 'row', marginBottom: '.7rem' }}
              />
            </Form.Item>

            <Form.Item name="M_ORDERLISTING" label={t('pageNames.orderListing')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_TRANSACTIONLIST" label={t('pageNames.transactionList')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_NOMINATION" label={t('pageNames.movementNominations')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_SPECIALMOVEMENTS" label={t('pageNames.specialMovements')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_MANUALTRANSACTIONS" label={t('pageNames.manualTransactions')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_PRODUCTMOVEMENT" label={t('pageNames.productMovements')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_INVENTORYREQUEST" label={t('pageNames.inventoryRequests')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_GATECONTROL" label={t('pageNames.gateControl')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_EQUIPMENT" label={t('pageNames.equipmentTypes')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_EQUIPMENTLIST" label={t('pageNames.equipmentList')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_TANKERS" label={t('pageNames.tankerList')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>
          </TabPane>

          <TabPane tab={t('pageMenu.stock')} key="3">
            <Form.Item name="M_TANKSTATUS" label={t('pageNames.tanks')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_TANKGROUPS" label={t('pageNames.tankGroups')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_SITEBALANCE" label={t('pageNames.siteBalance')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_TANKINVENTORY" label={t('pageNames.tankInventory')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_PRODUCTINVENTORY" label={t('pageNames.productInventory')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_SFTRANSACTIONLIST" label={t('pageNames.selfFuelTransactionList')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>
          </TabPane>

          <TabPane
            // className="ant-tab-window-no-margin"
            tab={t('pageMenu.reports')}
            key="4"
          >
            <Form.Item name="M_FOLIOMANAGEMENT" label={t('pageNames.folioSummary')}>
              <Checkbox.Group
                options={folioOptions}
                style={{ flexDirection: 'row', marginBottom: '.7rem' }}
              />
            </Form.Item>

            <Form.Item name="M_JASPERREPORTS" label={t('pageNames.onDemandReports')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_JOURNALREPORT" label={t('pageNames.journal')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_GSAPMESSAGING" label={t('pageNames.hostMessagingInterface')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_ONSITEREPORT" label={t('pageNames.personnelOnSite')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_AUDITREPORT" label={t('pageNames.auditingData')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_METERING" label={t('pageNames.metering')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>
          </TabPane>

          <TabPane
            // className="ant-tab-window-no-margin"
            tab={t('pageMenu.security')}
            key="5"
          >
            <Form.Item name="M_PERSONNEL" label={t('pageNames.personnel')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_IDENTIFICATIONASSIGNMENT" label={t('pageNames.idAssignment')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_EXPIRYDATES" label={t('pageNames.expiryDates')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_TIMECODES" label={t('pageNames.timeCodes')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_ROLEACCESS" label={t('pageNames.roleAccessManagement')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_AREA" label={t('pageNames.area')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_GATEPERMISSION" label={t('pageNames.gatePermission')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>
          </TabPane>

          <TabPane
            // className="ant-tab-window-no-margin"
            tab={t('pageMenu.products')}
            key="6"
          >
            <Form.Item name="M_BASEPRODUCTS" label={t('pageNames.baseProducts')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_DRAWERPRODUCTS" label={t('pageNames.drawerProducts')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_HAZCHEM" label={t('pageNames.hazchemCodes')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_DANGEROUSGOODS" label={t('pageNames.dangerousGoods')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_PRODUCTS" label={t('pageNames.productGroups')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            {/* <Form.Item name="M_PRICEOFFSETS" label={t('pageNames.priceOffsets')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_CUSTOMERPRICING" label={t('pageNames.customerPricing')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_ORDERPRODUCTPRICING" label={t('pageNames.orderProductPricing')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item> */}
          </TabPane>

          <TabPane
            // className="ant-tab-window-no-margin"
            tab={t('pageMenu.companies')}
            key="7"
          >
            <Form.Item name="M_COMPANIES" label={t('pageNames.companies')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_ALLOCATIONS" label={t('pageNames.allocations')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_CUSTOMERS" label={t('pageNames.customers')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_ADDRESSES" label={t('pageNames.addresses')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_DELIVERYLOCATIONS" label={t('pageNames.deliveryLocations')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_PARTNERS" label={t('pageNames.partners')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_PARTNERSHIP" label={t('pageNames.partnership')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_CUSTOMERCATEGORIES" label={t('pageNames.customerCategories')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>
          </TabPane>

          <TabPane
            // className="ant-tab-window-no-margin"
            tab={t('pageMenu.config')}
            key="8"
          >
            <Form.Item name="M_LOADBAYS" label={t('pageNames.loadBays')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_BAYMOVEMENT" label={t('pageNames.companyBayMovement')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_LOADMETERS" label={t('pageNames.loadMeters')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_METERINGDEVICES" label={t('pageNames.meterDevices')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_PHYSICALPRINTERS" label={t('pageNames.physicalPrinters')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_SITEACCESSDEVICES" label={t('pageNames.siteAccessDevices')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_KEYREADERDEVICES" label={t('pageNames.keyReaderDevices')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_TANKCONFIGURATION" label={t('pageNames.tankConfiguration')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_LOGICALPRINTERS" label={t('pageNames.logicalPrinters')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_REPOCONFIGURATION" label={t('pageNames.reportConfiguration')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_REPOPROFILE" label={t('pageNames.reportProfile')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_FOLIOSCHEDULING" label={t('pageNames.folioScheduling')}>
              <Checkbox.Group
                options={folioOptions}
                style={{ flexDirection: 'row', marginBottom: '.7rem' }}
              />
            </Form.Item>

            <Form.Item name="M_MOVEMENTREASON" label={t('pageNames.movementReasons')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>
          </TabPane>

          <TabPane
            // className="ant-tab-window-no-margin"
            tab={t('pageMenu.modules')}
            key="10"
          >
            <Form.Item name="M_BAYVIEW" label={t('pageNames.bayView')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            {/* <Form.Item name="M_TANKVIEW" label={t('pageNames.tankView')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item> */}

            <Form.Item name="M_ADAPTIVEFLOWCONTROL" label={t('pageNames.adaptiveFlow')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            <Form.Item name="M_FSCSTATUS" label={t('pageNames.fscStatus')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item>

            {/* <Form.Item name="M_PRODUCTASSETS" label={t('pageNames.drawerProductAssets')}>
              <Checkbox.Group options={options} style={{ flexDirection: 'row', marginBottom: '.7rem' }} />
            </Form.Item> */}
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
