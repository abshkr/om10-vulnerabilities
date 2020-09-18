import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { List, Avatar, Card, Input, Spin } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { LoadingOutlined } from '@ant-design/icons';

import { ListViewContainer, ViewContainer, CardContainer, DescriptionContainer } from './style';
import { search } from '../../utils';

const ItemDescription = ({ descriptions, item }) => {
  return (
    <DescriptionContainer>
      {descriptions.map((value, index) => (
        <div key={index}>
          <strong>{value.field}</strong>: {item[value.key]}
        </div>
      ))}
    </DescriptionContainer>
  );
};

const ListView = ({ id, data, onSelect, name, description, content, children, isLoading, selected }) => {
  const { t } = useTranslation();

  const [payload, setPayload] = useState(undefined);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (data) {
      const results = search(query, data);

      setPayload(results);

      // find if selected item is still in the filtered results
      const idx = results?.findIndex((o) => (o[id] === selected));
      if (idx === -1) {
        onSelect(results?.[0]);
      }
    }
  }, [data, query]);

  return (
    <Spin spinning={isLoading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
      <ListViewContainer>
        <div>
          <div style={{ paddingRight: 10 }}>
            <Input.Search
              style={{ borderRadius: 5 }}
              placeholder={t('placeholder.searchTanks')}
              onSearch={setQuery}
              onChange={e => setQuery(e.target.value)}
              size="large"
            />
          </div>

          <Scrollbars
            style={{
              height: 'calc(100vh - 235px)',
              width: '25vw',
              marginTop: 5,
              padding: 5,
            }}
          >
            <List
              itemLayout="horizontal"
              dataSource={payload}
              renderItem={(item) => (
                <CardContainer
                  selected={item[id] === selected}
                  background={item.background}
                  avatar={item.avatar}
                >
                  <Card hoverable size="small" onClick={() => onSelect(item)}>
                    <List.Item style={{ padding: 0 }}>
                      <List.Item.Meta
                        avatar={<Avatar size="large">{item[id]}</Avatar>}
                        title={<a>{item[name]}</a>}
                        description={<ItemDescription item={item} descriptions={description} />}
                      />
                      {content}
                    </List.Item>
                  </Card>
                </CardContainer>
              )}
            />
          </Scrollbars>
        </div>
        <ViewContainer>{children}</ViewContainer>
      </ListViewContainer>
    </Spin>
  );
};

export default ListView;
