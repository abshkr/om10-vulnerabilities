import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import moment from 'moment';
import { CloseOutlined, DeleteOutlined, SyncOutlined } from '@ant-design/icons';

import { Form, Button, Modal, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { SETTINGS } from '../../../constants';
import { DataTable } from '../../../components';
import api, { MANUAL_TRANSACTIONS } from '../../../api';

const LoadForm = ({onLoad, fields, url, height}) => {
  const [data, setData] = useState(null);
  const [records, setRecords] = useState(null);
  const [selected, setSelected] = useState(null);

  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { data: payload, isValidating, revalidate } = useSWR(`${MANUAL_TRANSACTIONS.READ_MT_HEAD_DATA}`, { revalidateOnFocus: true });


  const onFinish = () => {
    Modal.destroyAll();
    if (selected) {
      onLoad(selected);
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
        //const value = records?.[0];
        //value.gud_id = 999999999;
        //console.log("save_mt_data value", records);
        await api
          .post(MANUAL_TRANSACTIONS.DELETE_MT_DATA, {gud_id: selected?.mt_id})
          //.post(MANUAL_TRANSACTIONS.SAVE_MT_DATA, value)
          .then(() => {
            revalidate();

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

  const onDoubleClick = (value) => {
    setSelected(value);
    onLoad(value);
    Modal.destroyAll();
  };

  const prepareData = (records) => {
    const items = [];
    _.forEach(records, (record) => {
      const item = {};
      item.mt_id            = Number(record.gud_id);
      item.mt_status        = record.gud_status;
      if (record.gud_head_data !== "" && record.gud_head_data !== null && record.gud_head_data !== false ) {
        const header = JSON.parse(_.replace(record.gud_head_data, '{}', '""'));
        item.mt_type          = (header?.TRANSACTION_TYPE == 'S') 
                                ? t('fields.mtTypeSchedule') 
                                : ((header?.TRANSACTION_TYPE == 'O') ? t('fields.mtTypeOrder') : '');
        item.mt_supplier      = String(header?.SUPPLIER);
        item.mt_customer      = String(header?.CUSTOMER);
        item.mt_trip_no       = String(header?.LOAD_NUMBER);
        item.mt_order_no      = String(header?.ORDER_TRIP_IND);
        item.mt_carrier       = String(header?.CARRIER);
        item.mt_tanker        = String(header?.TANKER_CODE);
        item.mt_driver        = String(header?.OPERATOR_CODE);
        item.mt_tas_ref       = String(header?.TAS_REF);
        item.mt_user_comments = String(header?.USER_COMMENTS);
        item.mt_datetime_st   = moment(header?.START_TIME).format(SETTINGS.DATE_TIME_FORMAT);
        item.mt_datetime_ed   = moment(header?.FINISH_TIME).format(SETTINGS.DATE_TIME_FORMAT);
      }
      item.mt_user          = record.gud_user;
      item.mt_create_date   = record.gud_create_date;
      item.mt_update_date   = record.gud_update_date;
      items.push(item);
    });

    return items;
  }

  useEffect(() => {
    if (payload) {
      setRecords(payload?.records);
      const data = prepareData(payload?.records);
      setData(data);
      payload.records = null;
    }
  }, [payload]);

  return (
    <Form 
      layout="vertical" 
      form={form} 
      onFinish={onFinish} 
      scrollToFirstError style={{marginTop: "1rem"}}
    >
      <DataTable
        data={data}
        columns={fields}
        isLoading={isValidating && url}
        selectionMode="single"
        onClick={(payload) => onDoubleClick(payload)}
        handleSelect={(payload) => setSelected(payload[0])}
        autoColWidth
        height={height}
      />
      
      <div style={{marginTop: "2rem"}}>
        <Button
          htmlType="button"
          icon={<CloseOutlined />}
          style={{ float: 'right' }}
          onClick={() => Modal.destroyAll()}
        >
          {t('operations.cancel')}
        </Button>

        <Button
          type="danger"
          icon={<DeleteOutlined />}
          style={{ float: 'right', marginRight: 5 }}
          disabled={!selected}
          onClick={onDelete}
        >
          {t('operations.delete')}
        </Button>

        <Button
          type="primary"
          htmlType="submit"
          icon={<SyncOutlined />}
          style={{ float: 'right', marginRight: 5 }}
          disabled={!selected}
        >
          {t('operations.load')}
        </Button>
      </div>
    </Form>
  );
};

export default LoadForm;
  