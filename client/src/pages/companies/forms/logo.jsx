import React, { useState, useEffect } from 'react';
import { Form, Modal, notification, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { COMPANIES } from 'api';

const LOGOPATH = 'api/assets/companys/';

const Logo = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [fileList, setFileList] = useState([]);

  const props = {
    name: 'file',
    action: COMPANIES.UPLOAD_LOGO,
    headers: {
      Authorization: sessionStorage.getItem('token'),
    },

    onPreview() {
      setPreviewVisible(true);
    },

    onChange(info) {
      if (info.file.status == 'uploading') {
        setLoading(true);
      }
      if (info.file.status === 'done') {
        notification.success({
          message: t('messages.createSuccess'),
          description: `${t('descriptions.uploadSuccess')} ${info.file.name}`,
        });
        setImageUrl(LOGOPATH + info.file.name);
        setLoading(false);
        setFieldsValue({
          cmpy_logo: info.file.name,
        });

        setFileList(info.fileList);
      } else if (info.file.status === 'error') {
        notification.error({
          message: t('messages.submitFailed'),
          description: `${t('descriptions.uploadFailed')} ${info.file.name}`,
        });
      }

      if (info?.fileList?.length <= 0) {
        setFileList([]);
        setImageUrl(null);
        setFieldsValue({
          cmpy_logo: null,
        });
      }
    },

    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        notification.error({
          message: t('messages.submitFailed'),
          description: 'You can only upload JPG/PNG file!',
        });
      }
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        notification.error({
          message: t('messages.submitFailed'),
          description: 'Image must smaller than 5MB!',
        });
      }
      return isJpgOrPng && isLt2M;
    },
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cmpy_logo: value?.cmpy_logo,
      });
      if (value?.cmpy_logo) {
        setImageUrl(LOGOPATH + value?.cmpy_logo);
        setFileList([
          {
            uid: '-1',
            name: value?.cmpy_logo,
            status: 'done',
            url: LOGOPATH + value?.cmpy_logo,
          },
        ]);
      } else {
        setImageUrl(null);
        setFileList([]);
      }
    }
  }, [value]);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload Logo</div>
    </div>
  );

  return (
    <React.Fragment>
      <Form.Item name="cmpy_logo" hidden />
      <div style={{ marginTop: '1rem' }}>
        <Upload
          {...props}
          listType="picture-card"
          accept=".png,.jpg,.gif"
          className="avatar-uploader"
          fileList={fileList}
        >
          {imageUrl ? null : uploadButton}
        </Upload>
      </div>
      <Modal
        open={previewVisible}
        title={fileList[0]?.name}
        footer={null}
        onCancel={() => {
          setPreviewVisible(false);
        }}
      >
        <img alt="example" style={{ width: '100%' }} src={imageUrl} />
      </Modal>
    </React.Fragment>
  );
};

export default Logo;
