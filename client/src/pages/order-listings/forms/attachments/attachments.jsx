import React, { useState } from 'react';
import useSWR from 'swr';

import { DownloadOutlined, UploadOutlined, DeleteOutlined, SyncOutlined } from '@ant-design/icons';
import { Form, Button, Modal, notification, Divider, Upload } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import moment from 'moment';
import jwtDecode from 'jwt-decode';

import { DataTable } from 'components';
import { SETTINGS } from '../../../../constants';
import api, { ORDER_LISTINGS } from 'api';

import columns from './columns';

const Attachments = ({ value, config }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const siteCode = decoded?.site_code;
  const userCode = decoded?.per_code;

  const [selected, setSelected] = useState(undefined);

  const fields = columns(t);

  const { data: payload, revalidate, isValidating } = useSWR(
    `${ORDER_LISTINGS.READ_FILE}?order_no=${value?.order_sys_no}`
  );

  const data = payload?.records;
  const isLoading = isValidating || !data;

  const handleItemSelect = (options) => {
    setSelected(options);
    //adjustModifiers(options);
  };

  const createRecord = async (values) => {
    console.log('createRecord');
    await api
      .post(ORDER_LISTINGS.CREATE_FILE, values)
      .then(() => {
        revalidate();

        notification.success({
          message: t('messages.createSuccess'),
          description: `${t('descriptions.createSuccess')}`,
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
  };

  const updateRecord = async (values) => {
    console.log('updateRecord');
    await api
      .post(ORDER_LISTINGS.UPDATE_FILE, values)
      .then(() => {
        revalidate();

        notification.success({
          message: t('messages.updateSuccess'),
          description: `${t('descriptions.updateSuccess')}`,
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
  };

  const updateRecords = async (values) => {
    console.log('updateRecords');
    await api
      .post(ORDER_LISTINGS.UPDATE_FILES, values)
      .then(() => {
        revalidate();

        notification.success({
          message: t('messages.updateSuccess'),
          description: `${t('descriptions.updateSuccess')}`,
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
  };

  const onDownload = () => {
    console.log('onDownload');

    if (!selected) {
      notification.error({
        message: t('descriptions.requestFailed'),
        description: t('prompts.noFileSeleted'),
      });
      return;
    }

    window.open('/api/attachments/orders/' + selected.od_doc_name);

    const values = {
      od_order_no: selected.od_order_no,
      od_doc_name: selected.od_doc_name,
      // od_doc_folder: selected.od_doc_folder,
      // od_doc_size: selected.od_doc_size,
      //od_doc_created: undefined,
      od_doc_downloaded: moment().format(SETTINGS.DATE_TIME_FORMAT),
      od_doc_dnldcounts: (_.toNumber(selected.od_doc_dnldcounts) || 0) + 1,
      // od_doc_creator: selected.od_doc_creator,
    };
    updateRecord(values);
    setSelected(undefined);
  };

  const onDownloadAll = () => {
    console.log('onDownloadAll');

    const values = [];
    for (let i = 0; i < data?.length; i++) {
      const item = data?.[i];

      window.open('/api/attachments/orders/' + item.od_doc_name);

      values.push({
        od_order_no: item.od_order_no,
        od_doc_name: item.od_doc_name,
        // od_doc_folder: item.od_doc_folder,
        // od_doc_size: item.od_doc_size,
        //od_doc_created: undefined,
        od_doc_downloaded: moment().format(SETTINGS.DATE_TIME_FORMAT),
        od_doc_dnldcounts: (_.toNumber(item.od_doc_dnldcounts) || 0) + 1,
        // od_doc_creator: item.od_doc_creator,
      });
    }

    updateRecords(values);
    setSelected(undefined);
  };

  const onDelete = () => {
    console.log('onDelete');

    if (!selected) {
      notification.error({
        message: t('descriptions.requestFailed'),
        description: t('prompts.noFileSeleted'),
      });
      return;
    }

    const value = selected; /* {
      od_order_no: selected?.od_order_no,
      od_doc_name: selected?.od_doc_name,
    };*/
    console.log('...........onDelete', value, selected);
    Modal.confirm({
      title: t('prompts.deleteFile'),
      okText: t('operations.yes'),
      okType: 'danger',
      icon: <DeleteOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(ORDER_LISTINGS.DELETE_FILE, value)
          .then(() => {
            revalidate();
            setSelected(undefined);
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

  const props = {
    name: 'file',
    // accept: 'text/plain, application/pdf, application/msword, application/vnd.ms-excel',
    // accept: '.doc, .docx, .xls, .xlsx, .csv, .pdf, .txt',
    accept: config?.siteFileExtOODoc,
    action: ORDER_LISTINGS.UPLOAD_FILE,
    headers: {
      // Accept: 'application/json',
      // 'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('token'),
    },
    showUploadList: true,
    progress: {
      type: 'line',
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
    onChange(info) {
      console.log(info);
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        // message.success(`${info.file.name} file uploaded successfully`);
        notification.success({
          message: t('messages.uploadSuccess'),
          description: `${t('descriptions.uploadFileSuccess')} ${info.file.name}`,
        });
        // setSelected(info.file.name);

        const values = {
          od_order_no: value?.order_sys_no,
          od_doc_name: info.file.name,
          od_doc_folder: '/attachments/orders',
          od_doc_size: info.file.size,
          //od_doc_created: undefined,
          //od_doc_downloaded: undefined,
          //od_doc_dnldcounts: 0,
          od_doc_creator: userCode,
        };
        createRecord(values);
        setSelected(undefined);
      } else if (info.file.status === 'error') {
        // message.error(`${info.file.name} file upload failed.`);
        console.log('..............info', info);
        notification.error({
          message: t('messages.uploadFailed'),
          description: `${t('descriptions.uploadFileFailed')} ${info.file.name} [${
            info?.file?.response?.errors?.[0]?.message
          }]`,
        });
      }
    },
  };

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>

      <Button
        type="primary"
        icon={<DeleteOutlined />}
        style={{ float: 'right', marginRight: 5 }}
        disabled={!selected}
        onClick={onDelete}
      >
        {t('operations.delete')}
      </Button>

      <Button
        type="primary"
        icon={<DownloadOutlined />}
        style={{ float: 'right', marginRight: 5 }}
        disabled={!selected}
        onClick={onDownload}
      >
        {t('operations.download')}
      </Button>
    </>
  );

  return (
    <div>
      <Form form={form} scrollToFirstError>
        <DataTable
          columns={fields}
          data={data}
          isLoading={isLoading}
          extra={modifiers}
          height="42vh"
          onClick={(payload) => handleItemSelect([payload])}
          handleSelect={(payload) => handleItemSelect(payload[0])}
          //apiContext={setTableAPI}
          selectionMode="single"
          //onEditingFinished={onEditingFinished}
        />

        <Divider></Divider>

        <Form.Item style={{ marginTop: '1rem' }}>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            // htmlType="submit"
            disabled={data?.length === 0}
            onClick={onDownloadAll}
            style={{ float: 'right', marginRight: 5 }}
          >
            {t('operations.downloadAll')}
          </Button>

          <Upload {...props}>
            <Button>
              <UploadOutlined /> {t('operations.uploadChooseFile')}
            </Button>
          </Upload>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Attachments;
