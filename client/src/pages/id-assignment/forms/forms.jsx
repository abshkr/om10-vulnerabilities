import React, { useState, useEffect } from 'react';
import { mutate } from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Button, Tabs, Modal, notification, Drawer, Divider, Row, Col } from 'antd';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import {
  AssignmentNumber,
  Issuer,
  AssignmentType,
  PhysicalType,
  PhysicalTagText,
  TimeCode,
  Flags,
  Employer,
  Role,
  Personnel,
  DrawerField,
  Supplier,
  Carrier,
  Tanker,
  EquipmentCarrier,
  TransportEquipment,
} from './fields';

import api, { ID_ASSIGNMENT } from '../../../api';
import _ from 'lodash';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, setFilterValue }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { resetFields, getFieldsValue, setFieldsValue } = form;

  const [type, setType] = useState(null);
  const [keyNo, setKeyNo] = useState(null);
  const [issuer, setIssuer] = useState(null);
  const [physType, setPhysType] = useState(null);
  const [carrier, setCarrier] = useState(null);
  const [employer, setEmployer] = useState(null);
  const [role, setRole] = useState(null);

  const IS_CREATING = !value;

  const onComplete = (kya_txt) => {
    handleFormState(false, null);
    mutate(ID_ASSIGNMENT.READ);
    if (kya_txt) {
      setFilterValue("" + kya_txt);
    } else {
      setFilterValue(" ");
    }
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
          .post(IS_CREATING ? ID_ASSIGNMENT.CREATE : ID_ASSIGNMENT.UPDATE, values)
          .then((response) => {
            onComplete(values.kya_txt);

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

  useEffect(() => {
    if (!value && !visible) {
      resetFields();
    }
  }, [value, visible]);

  const onDelete = () => {
    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(ID_ASSIGNMENT.DELETE, value)
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

  const adjustKeyText = (txt) => {
    return txt.toUpperCase();
  }

  // When physical type is Touch Button - I Button
  const decryptKeyText = (txt) => {

    let card_txt = txt.trim();
    //trace("decryptKeyText", kya_phys_type);
    //trace("decryptKeyText", kya_phys_type.selectedIndex);
    if ( physType === '7' )
    {
      // only touch button requires the chop of prefix and postfix characters
      card_txt = card_txt.substring(2, card_txt.length-2);
    }
    
    setFieldsValue({
      kya_txt: card_txt
    });

  }

  // When physical type is Track Two Card
  const makeDefaultCard = () => {
    // check user entry 
    const values = getFieldsValue([
      'kya_key_no',
      'kya_txt', 
      'kya_phys_type', 
      'kya_type',
      'kya_key_issuer'
    ]);
    let keyPhysType = String(values?.kya_phys_type);
    let keyNo = String(values?.kya_key_no);
    let cardID = '';
    if (values?.kya_txt) {
      cardID = values?.kya_txt;
    }
    
    if (keyPhysType === '2') {
      //slice 37 mate
      cardID = cardID.slice(0,37);
      //prefill text with trailling 0s
      cardID = cardID.padEnd(37, '0');
      keyNo = keyNo.slice(0,4);
      setFieldsValue({
        kya_key_no: keyNo
      });
      // string build
      let type = values?.kya_type ? String(values?.kya_type) : '';
      let issuer = values?.kya_key_issuer ? values?.kya_key_issuer : '';
      // card mapping
      switch (type) {
        case '1': type = '0'; break;
        case '2': type = '1'; break;
        case '3': type = '1'; break;
        case '4': type = '3'; break;
        case '5': type = '4'; break;
        case '6': type = '3'; break;
        case '7': type = '3'; break;
        case '8': type = '3'; break;
        case '9': type = '3'; break;
      }
      // slice trails and prepend 0s
      type = type.slice(0,2);
      type = type.padStart(2, '0');
      issuer = issuer.slice(0,4);
      issuer = issuer.padStart(4, '0');
      keyNo = keyNo.slice(0,4);
      keyNo = keyNo.padStart(4, '0');
      // 2 + 2 + 4 + 4 = 12
      cardID = type + '00' + issuer + keyNo + cardID.slice(12);
      // slice excess
      cardID = cardID.slice(0,37);
    }
    
    setFieldsValue({
      kya_txt: cardID
    });
  };

  const onPhysicalTypeChange = (type) => {
    setPhysType(String(type));
    makeDefaultCard();
  };

  const onKeyNoChange = (num) => {
    setKeyNo(num);
    makeDefaultCard();
  };

  const onIssuerChange = (issuer) => {
    setIssuer(issuer);
    makeDefaultCard();
  };

  const onKeyTypeChange = (type) => {
    setType(String(type));
    makeDefaultCard();
  };

  return (
    <Drawer
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
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane 
            //className="ant-tab-window"
            tab={t('tabColumns.general')}
            style={{ height: 'calc(100vh - 150px)' }}
            forceRender={true}
            key="1"
          >
            <Row gutter={[8, 3]}>
              <Col span={12}>
                <AssignmentNumber form={form} value={value} physType={physType} onChange={onKeyNoChange} />
              </Col>
              <Col span={12}>
                <Issuer form={form} value={value} onChange={onIssuerChange} />
              </Col>
            </Row>
            <Row gutter={[8, 3]}>
              <Col span={12}>
                <AssignmentType form={form} value={value} onChange={onKeyTypeChange} />
              </Col>
              <Col span={12}>
                <PhysicalType form={form} value={value} onChange={onPhysicalTypeChange} />
              </Col>
            </Row>
            <Row gutter={[8, 3]}>
              <Col span={24}>
                <PhysicalTagText form={form} value={value} physType={physType} />
              </Col>
            </Row>
            <Row gutter={[40, 3]}>
              <Col span={12}>
                <TimeCode form={form} value={value} />
              </Col>
              <Col span={12}>
                <Flags form={form} value={value} />
              </Col>
            </Row>

            <Divider />

            {['1', '3', '5'].includes(type) && (
              <>
                <Employer form={form} value={value} onChange={setEmployer} />
              </>
            )}

            {['1', '3', '5'].includes(type) && (
              <>
                <Role form={form} value={value} onChange={setRole} />
              </>
            )}

            {['1', '3', '5'].includes(type) && (
              <>
                <Personnel form={form} value={value} employer={employer} role={role} />
              </>
            )}

            {['3', '5'].includes(type) && (
              <>
                <Row gutter={[8, 3]}>
                  <Col span={12}>
                    <DrawerField form={form} value={value} />
                  </Col>
                  <Col span={12}>
                    <Supplier form={form} value={value} />
                  </Col>
                </Row>
              </>
            )}

            {['4', '5'].includes(type) && (
              <>
                <Row gutter={[8, 3]}>
                  <Col span={12}>
                    <Carrier form={form} value={value} onChange={setCarrier} />
                  </Col>
                  <Col span={12}>
                    <Tanker form={form} value={value} carrier={carrier} />
                  </Col>
                </Row>
              </>
            )}

            {['8', '9'].includes(type) && (
              <>
                <Row gutter={[8, 3]}>
                  <Col span={12}>
                    <EquipmentCarrier form={form} value={value} onChange={setCarrier}/>
                  </Col>
                  <Col span={12}>
                    <TransportEquipment form={form} value={value} type={type} carrier={carrier} />
                  </Col>
                </Row>
              </>
            )}
          </TabPane>

          {/* <TabPane className="ant-tab-window" tab={t('tabColumns.assignments')} forceRender={true} key="2">

          </TabPane> */}
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
