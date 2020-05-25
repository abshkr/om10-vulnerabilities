import React from 'react';
import { Drawer, Card, Button, List, Avatar } from 'antd';
import { useTranslation } from 'react-i18next';
import { LoadingOutlined, DeleteOutlined } from '@ant-design/icons';

import columns from './columns';
import useSWR from 'swr';
import { ALLOCATIONS } from '../../../../api';

const Period = ({ selected, setVisibility, visible }) => {
  const SHOULD_FETCH = !!selected;

  const { data, isValidating } = useSWR(
    SHOULD_FETCH
      ? `${ALLOCATIONS.PERIOD_READ}?aiprd_type=${selected?.aitem_type}&aiprd_cmpycode=${selected?.aitem_cmpycode}&aiprd_prodcode=${selected?.aitem_prodcode}&aiprd_suppcode=${selected?.aitem_suppcode}`
      : null
  );

  const { t } = useTranslation();

  const onCreate = () => {};
  const onRemove = () => {};

  const fields = columns(t);

  return (
    <Drawer
      title={`${t('operations.allocationPeriod')} - (${selected?.aitem_prodcode} / ${
        selected?.aitem_prodname
      })`}
      width="33vw"
      closable={false}
      onClose={() => setVisibility(false)}
      visible={visible}
    >
      <List
        size="small"
        style={{ height: '50vh', overflowY: 'auto', marginTop: 10 }}
        itemLayout="horizontal"
        dataSource={data?.records}
        loading={{
          indicator: <LoadingOutlined />,
          spinning: isValidating,
        }}
        renderItem={(item) => (
          <Card size="small" hoverable style={{ marginBottom: 5, marginTop: 5 }} bodyStyle={{ padding: 5 }}>
            <List.Item
              actions={[
                <Button
                  icon={<DeleteOutlined />}
                  type="danger"
                  shape="circle"
                  onClick={() => onRemove(item)}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar>{item.aiprd_index}</Avatar>}
                // eslint-disable-next-line
                title={
                  <a>{`${t('fields.quantityAllocated')}: ${item.aiprd_qtylimit} ${item.aiprd_unitname}`} </a>
                }
                description={`${t('fields.startDate')}: ${item.aiprd_daystart} -> ${t('fields.endDate')}: ${
                  item.aiprd_dayend
                }`}
              />
            </List.Item>
          </Card>
        )}
      />
    </Drawer>
  );
};

export default Period;
