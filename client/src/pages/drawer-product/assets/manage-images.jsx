import React from 'react';

import {
  EditOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
  UploadOutlined
} from '@ant-design/icons';

import { Form, Button, Tabs, Modal, notification, Divider, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import axios from 'axios';
import { DRAWER_PRODUCTS } from 'api';
import { mutate } from 'swr';
import ImageDisplay from './forms/image-display';

const TabPane = Tabs.TabPane;

const FormModal = ({ }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onComplete = () => {
    // handleFormState(false, null);
    // if (value.cmpy_code) {
    //   setFilterValue("" + value.cmpy_code);
    // }
    // mutate(COMPANIES.READ);
    // Modal.destroyAll();
  };

  const onUpload = async () => {
    const values = await form.validateFields();
    // values.cmpy_code = value.cmpy_code

    console.log("onUpload")
    console.log(values)
    
    Modal.confirm({
      title: t('prompts.update'),
      okText: t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(DRAWER_PRODUCTS.UPLOAD_IMAGE)
          .then(
            axios.spread(response => {
              onComplete()

              notification.success({
                message: t('messages.updateSuccess'),
                description: t('messages.updateSuccess')
              });
            })
          )
          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.type,
                description: error.message,
              });
            });
          });
      }
    });
  };

  const fileSelected = (v) => {
    console.log(v.target.value);
  }

  const fileSelectorPostfix = (
    <Form.Item name="fileToUpload" noStyle >
      <input 
        type="file" 
        // onChange={fileSelected} 
        name="fileToUpload" 
        id="fileToUpload"
        style={{width:'5rem'}}
      />
    </Form.Item>
  );

  return (
    <div>
      <Form 
        form={form} 
        onFinish={onUpload} 
        scrollToFirstError
      >
        <ImageDisplay onImageClick={null}></ImageDisplay>

        <Divider></Divider>

        <Form.Item name="prod_image" label={t('fields.prodImage')} >
          <Input addonAfter={fileSelectorPostfix}></Input>
        </Form.Item>

        <Form.Item style={{marginTop: "1rem"}}>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => Modal.destroyAll()}
          >
            {t('operations.cancel')}
          </Button>

          <Button
            type="primary"
            icon={<UploadOutlined />}
            htmlType="submit"
            // onClick={onUpload}
            style={{ float: 'right', marginRight: 5 }}
          >
            {t('operations.uploadImg')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormModal;
