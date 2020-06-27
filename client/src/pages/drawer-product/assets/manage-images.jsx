import React, { useState } from 'react';

import {
  EditOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
  UploadOutlined,
  DeleteOutlined
} from '@ant-design/icons';

import { Form, Button, Modal, notification, Divider, Upload } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import axios from 'axios';
import { DRAWER_PRODUCTS } from 'api';
import ImageDisplay from './forms/image-display';

const FormModal = ({ }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [selected, setSelected] = useState("");

  const onRemove = () => {
    console.log("onRemove")

    if (selected === "") {
      notification.error({
        message: t('descriptions.requestFailed'),
        description: t('prompts.noImageSeleted'),
      });
      return;
    }

    const value = {
      image_file: selected,
    }
    Modal.confirm({
      title: t('prompts.deleteImage'),
      okText: t('operations.yes'),
      okType: 'danger',
      icon: <DeleteOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(DRAWER_PRODUCTS.DELETE_IMAGE, value)
          .then(() => {
            setSelected("");

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

  const onImageClick = (v) => {
    setSelected(v.target.getAttribute("value"));
  }

  const props = {
    name: 'file',
    action: DRAWER_PRODUCTS.UPLOAD_IMAGE,
    // action: '/api/pages/product_asset/upload.php',
    // headers: {
    //   authorization: 'authorization-text',
    // },
    onChange(info) {
      console.log(info)
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        // message.success(`${info.file.name} file uploaded successfully`);
        notification.success({
          message: t('messages.createSuccess'),
          description: `${t('descriptions.uploadSuccess')} ${info.file.name}`,
        });
        setSelected(info.file.name);
      } else if (info.file.status === 'error') {
        // message.error(`${info.file.name} file upload failed.`);
        notification.success({
          message: t('messages.submitFailed'),
          description: `${t('descriptions.uploadFailed')} ${info.file.name}`,
        });
      }
    },
  };

  return (
    <div>
      <Form 
        form={form} 
        scrollToFirstError
      >
        <ImageDisplay onImageClick={onImageClick} refresh={selected}></ImageDisplay>

        <Divider></Divider>

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
            // htmlType="submit"
            disabled={selected === ""}
            onClick={onRemove}
            style={{ float: 'right', marginRight: 5 }}
          >
            {t('operations.removeImg')}
          </Button>

          <Upload {...props}>
            <Button>
              <UploadOutlined /> {t('operations.uploadImg')}
            </Button>
          </Upload>

        </Form.Item>
      </Form>
    </div>
  );
};

export default FormModal;
