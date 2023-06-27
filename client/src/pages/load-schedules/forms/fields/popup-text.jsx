import React, { useState, useEffect } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { Popover, Descriptions } from 'antd';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import _ from 'lodash';

import { COMPANIES } from '../../../../api';

const PopupText = ({ type, config, supplier }) => {
  const { t } = useTranslation();

  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [last, setLast] = useState('');
  // const [max, setMax] = useState('');

  const { data: payload } = useSWR(COMPANIES.READ);
  const { data: configs } = useSWR(`${COMPANIES.CONFIG}?cmpy_code=${supplier}`);

  useEffect(() => {
    if (!supplier) {
      setStart('');
      setEnd('');
      setLast('');
    } else {
      if (type === '1') {
        // pickup schedule, use company_config
        const item1 = _.find(configs?.records, (o) => o?.config_key === 'CMPY_PICKUP_TRIP_START');
        if (!item1) {
          setStart(config?.sitePickupTripStart);
        } else {
          setStart(item1?.config_value);
        }
        const item2 = _.find(configs?.records, (o) => o?.config_key === 'CMPY_PICKUP_TRIP_END');
        if (!item2) {
          setEnd(config?.sitePickupTripEnd);
        } else {
          setEnd(item2?.config_value);
        }
        const item3 = _.find(configs?.records, (o) => o?.config_key === 'CMPY_PICKUP_TRIP_LAST');
        if (!item3) {
          setLast('');
        } else {
          setLast(item3?.config_value);
        }
      } else {
        // not pickup schedule, use companys
        const item = _.find(payload?.records, (o) => o?.cmpy_code === supplier);
        if (!item) {
          setStart('');
          setEnd('');
          setLast('');
        } else {
          setStart(item?.cmpy_trip_strt);
          setEnd(item?.cmpy_trip_end);
          setLast(item?.cmpy_trip_last);
        }
      }
      if (config?.siteUniqueTripOrdNum) {
        setEnd('999999999');
      }
    }
  }, [type, config, supplier, payload, configs]);

  return (
    <Popover
      placement="topRight"
      title={
        <span style={{ fontWeight: 'bold', fontSize: '24px' }}>
          {type === '1' ? t('descriptions.tripNumberPickupTitle') : t('descriptions.tripNumberNormalTitle')}
        </span>
      }
      content={
        <Descriptions bordered size="small" layout="horizontal" style={{ marginTop: 0 }} column={1}>
          <Descriptions.Item key={1} label={t('descriptions.tripNumberUniqunessCheck')} span={1}>
            {config?.siteUniqueTripOrdNum
              ? t('descriptions.tripNumberUniqunessCheckGlobal')
              : t('descriptions.tripNumberUniqunessCheckSupplier')}
          </Descriptions.Item>
          <Descriptions.Item key={2} label={t('descriptions.tripNumberDigits')} span={1}>
            {config?.maxLengthTripNum}
          </Descriptions.Item>
          <Descriptions.Item key={2} label={t('fields.startAt')} span={1}>
            {start}
          </Descriptions.Item>
          <Descriptions.Item key={3} label={t('fields.endAt')} span={1}>
            {end}
          </Descriptions.Item>
          <Descriptions.Item key={4} label={t('fields.lastUsed')} span={1}>
            {last}
          </Descriptions.Item>
        </Descriptions>
      }
    >
      <QuestionCircleOutlined style={{ transform: 'scale(1.2)', color: '#0054a4', fontWeight: 900 }} />
    </Popover>
  );
};

export default PopupText;
