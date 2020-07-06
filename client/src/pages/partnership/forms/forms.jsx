import React, { useState, useEffect } from 'react';

import { EditOutlined, PlusOutlined, CloseOutlined, QuestionCircleOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { Form, Button, Tabs, Modal, notification, Drawer, Divider, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate, SWRConfig } from 'swr';
import _ from 'lodash';
import { fetcher } from 'utils';

import { Company, Customer, Partners } from './fields';
import api, { PARTNERSHIP } from '../../../api';
import { DataTable } from 'components';
import columns from './fields/columns';

const TabPane = Tabs.TabPane;

const PartnerForm = ({ value, visible, handleFormState, access }) => {
  console.log(value)
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { resetFields } = form;

  const [company, setCompany] = useState(value?.partner_cmpy_code);
  const { data: payload, isValidating } = useSWR(`${PARTNERSHIP.PARTNERSHIPS}?supplier=${value?.partner_cmpy_code}&partner_cust_acct=${value?.partner_cust_acct}`);
  
  const [selected, setSelected] = useState([]);
  const [partners, setPartners] = useState(null);

  const IS_CREATING = !value;

  const onComplete = () => {
    handleFormState(false, null);
    mutate(PARTNERSHIP.READ);
  };

  const onFinish = async () => {
    if (IS_CREATING && partners.length <= 0) {
      notification.error({
        message: t("messages.validationFailed"),
        description: t("messages.noPartners"),
      });
      return;
    }

    const values = await form.validateFields();
    values.partners = partners;

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(IS_CREATING ? PARTNERSHIP.CREATE : PARTNERSHIP.UPDATE, _.omit(values, ['partner']))
          .then((response) => {
            onComplete();

            notification.success({
              message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
              description: IS_CREATING ? t('descriptions.createSuccess') : t('descriptions.updateSuccess'),
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

  const deletePartners = () => {
    setPartners(_.filter(partners, (item) => {
      for (let i = 0; i < selected.length; i += 1) {
        if (item.partner_seq === selected[i].partner_seq) {
          return false;
        }
      }
      return true;
    }));
    setSelected([]);
  }

  const addPartnershipCallBack = (values) => {
    const newPartners = [
      ...partners,
      ...values,
    ];
    
    setPartners(_.orderBy(newPartners, (item) => {
      return parseInt(item.partner_seq);
    }));
  };

  const addPartnership = (v) => {
    Modal.info({
      className: 'form-container',
      title: t("descriptions.selectPartners"),
      centered: true,
      width: '40vw',
      icon: <FormOutlined />,
      content: (
        <SWRConfig
          value={{
            refreshInterval: 0,
            fetcher,
          }}
        >
          <Partners existings={partners} company={v} addPartnershipCallBack={addPartnershipCallBack} />
        </SWRConfig>
      ),
      okButtonProps: {
        style: { display: 'none' },
      },
    });
  };

  useEffect(() => {
    if (!value && !visible) {
      resetFields();
      setCompany(null);
    }
  }, [value]);

  useEffect(() => {
    if (payload?.records) {
      setPartners(payload.records);
    }
  }, [payload?.records]);

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      onClose={() => handleFormState(false, null)}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="40vw"
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
            disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate}
            icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
            htmlType="submit"
            style={{ float: 'right', marginRight: 5 }}
            onClick={onFinish}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>
        </>
      }
    >
      <Form layout="vertical" form={form} scrollToFirstError>
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.general')} key="1">
            <Company form={form} value={value} onChange={setCompany} disable={!IS_CREATING} />
            <Customer form={form} value={value} company={company} disable={!IS_CREATING}/>
            <Divider>{t('pageNames.partners')}</Divider>
            <Form.Item name="partners" noStyle >
              <DataTable
                data={partners}
                isLoading={isValidating}
                height="40vh"
                minimal
                columns={columns(t)}
                handleSelect={setSelected}
              />
            </Form.Item>
            <Space style={{ marginTop: 10 }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                loading={isValidating}
                onClick={() => addPartnership(company)}
                style={{ float: 'right', marginRight: 5 }}
              >
                {t('operations.add')}
              </Button>

              <Button
                type="primary"
                icon={<DeleteOutlined />}
                onClick={deletePartners}
                disabled={selected?.length <= 0}
                style={{ float: 'right', marginRight: 5 }}
              >
                {t('operations.delete')}
              </Button>
            </Space>

            {/* <Form.Item name="partners" noStyle >
              <DataTable
                data={partnersData}
                height="78vh"
                minimal
                columns={columns(t)}
                handleSelect={handleSelect}
              />
            </Form.Item> */}
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default PartnerForm;
