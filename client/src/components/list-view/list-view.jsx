import React, { useEffect, useState } from 'react';
import { List, Avatar, Card, Input } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';

import { ListViewContainer, ViewContainer, CardContainer, DescriptionContainer } from './style';

import { search } from '../../utils';

const ItemDescription = ({ descriptions, item }) => {
  return (
    <DescriptionContainer>
      {descriptions.map((value) => (
        <div>
          <strong>{value.field}</strong>: {item[value.key]}
        </div>
      ))}
    </DescriptionContainer>
  );
};

const ListView = ({ id, data, onSelect, name, description, content, children, layout, selected }) => {
  const [payload, setPayload] = useState(undefined);

  const onSearch = (value) => {
    const results = search(value, data);

    setPayload(results);
  };

  useEffect(() => {
    if (data) {
      setPayload(data);
    }
  }, [data]);

  return (
    <ListViewContainer>
      <div>
        <div style={{ paddingRight: 10 }}>
          <Input.Search
            style={{ borderRadius: 5 }}
            placeholder="Search Tanks"
            onSearch={onSearch}
            size="large"
          />
        </div>

        <Scrollbars
          style={{
            height: 'calc(100vh - 210px)',
            width: '25vw',
            marginTop: 5,
            padding: 5,
          }}
        >
          <List
            itemLayout="horizontal"
            dataSource={payload}
            loading={!data}
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
  );
};

export default ListView;
