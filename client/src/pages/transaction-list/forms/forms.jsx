import React, { useState, useEffect } from 'react';

import { WarningOutlined, CloseOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Tabs, Modal, notification, Button } from 'antd';
import _ from 'lodash';
import useSWR, { mutate } from 'swr';

import api, { TRANSACTION_LIST } from '../../../api';
import transferColumns from './transfer-columns';
import { DataTable } from '../../../components';
import detailColumns from './detail.columns';

const TabPane = Tabs.TabPane;

const Forms = ({ value, isFromNomination, start, end, access }) => {
  const { data: transfer } = useSWR(`${TRANSACTION_LIST.TRANSFER}?trsa_id=${value?.trsa_id}`);
  const { data: meters } = useSWR(`${TRANSACTION_LIST.METER}?trsa_id=${value?.trsa_id}`);

  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [tableContextAPI, setTableContextAPI] = useState(null);
  const [details, setDetails] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const transferFields = transferColumns(isFromNomination, t);
  const detailFields = detailColumns(isFromNomination, t);

  useEffect(() => {
    if (isFromNomination && value?.transfers) {
      setData(value.transfers);
    }
  }, [value, isFromNomination]);

  useEffect(() => {
    if (tableContextAPI) {
      tableContextAPI.forEachNodeAfterFilter((node) => {
        if (node.id === '0') {
          node.setSelected(true);
        }
      });
    }
  }, [tableContextAPI]);

  useEffect(() => {
    if (isFromNomination && selected.length > 0) {
      const meters = selected[0]?.meters;
      const bases = selected[0]?.base_prods;
      const payload = [];
      const predicate = meters.length > bases.length ? meters : bases;

      _.forEach(predicate, (value, index) => {
        const meter = meters[index] || {};
        const base = bases[index] || {};

        const object = { ...meter, ...base };

        payload.push(object);
      });

      setDetails(payload);
    }

    if (selected.length === 0) {
      setDetails([]);
    }
  }, [selected, isFromNomination]);

  const transferData = isFromNomination ? data : transfer?.records;
  const meterData = isFromNomination ? details : meters?.records;

  const onClose = () => {
    Modal.confirm({
      title: t('prompts.closeTransaction'),
      okText: t('operations.close'),
      okType: 'danger',
      icon: <WarningOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        setLoading(true);
        await api
          .post(TRANSACTION_LIST.CANCEL_TRANSACTION, {
            trsa_id: value.trsa_id,
          })
          .then((response) => {
            Modal.destroyAll();
            mutate(`${TRANSACTION_LIST.READ}?start_date=${start}&end_date=${end}`);
            notification.success({
              message: t('messages.closeSuccess'),
              description: t('descriptions.closeSuccess'),
            });
          })

          .catch((error) => {
            notification.error({
              message: error.message,
              description: t('descriptions.closeFailed'),
            });
          })
          .finally(() => {
            setSelected([]);
            setLoading(false);
          });
      },
    });
  };

  return (
    <div>
      <Tabs defaultActiveKey="1" animated={false}>
        <TabPane className="ant-tab-window-no-margin" tab={t('tabColumns.transactionProductDetail')} key="1">
          <DataTable
            columns={transferFields}
            data={transferData}
            height="42vh"
            selectionMode="single"
            handleSelect={setSelected}
            apiContext={setTableContextAPI}
          />
        </TabPane>

        <TabPane className="ant-tab-window-no-margin" tab={t('tabColumns.meterDetail')} key="2">
          <DataTable columns={detailFields} data={meterData} height="42vh" />
        </TabPane>
      </Tabs>

      <Button
        htmlType="button"
        icon={<CloseOutlined />}
        style={{ marginRight: 5, float: 'right' }}
        onClick={() => Modal.destroyAll()}
      >
        {t('operations.cancel')}
      </Button>

      <Button
        type="danger"
        icon={<WarningOutlined />}
        style={{ marginRight: 5, float: 'right' }}
        onClick={onClose}
        disabled={value.trsa_ed_dmy !== '' || !access.canUpdate}
        loading={isLoading}
      >
        {t('operations.closeTransaction')}
      </Button>
    </div>
  );
};

export default Forms;
