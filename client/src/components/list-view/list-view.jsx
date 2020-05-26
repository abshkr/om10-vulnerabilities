import React, { useEffect, useState } from 'react';
import { List, Avatar, Card, Input, Form } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';

import { ListViewContainer, ViewContainer, CardContainer } from './style';

import { search } from '../../utils';

const ListView = ({
  id,
  data,
  onSearch,
  onSelect,
  name,
  description,
  content,
  children,
  layout,
  form,
  selected,
}) => {
  const [payload, setPayload] = useState([]);

  useEffect(() => {
    if (data) {
      setPayload(data);
    }
  }, [data]);

  return (
    <Form layout={layout || 'vertical'} form={form} scrollToFirstError>
      <ListViewContainer>
        <div>
          <div style={{ paddingRight: 10 }}>
            <Input.Search
              size="large"
              placeholder="Search Tanks"
              style={{ borderRadius: 5 }}
              onSearch={onSearch}
            />
          </div>

          <Scrollbars
            style={{
              padding: 5,
              marginTop: 5,
              height: 'calc(100vh - 210px)',
              width: '25vw',
            }}
          >
            <List
              itemLayout="horizontal"
              loading={!data}
              dataSource={payload}
              renderItem={(item) => (
                <CardContainer selected={item[id] === selected}>
                  <Card hoverable size="small" onClick={() => onSelect(item)}>
                    <List.Item style={{ padding: 0 }}>
                      <List.Item.Meta
                        avatar={<Avatar size="large">{item[id]}</Avatar>}
                        title={<a>{item[name]}</a>}
                        description={description}
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
    </Form>
  );
};

export default ListView;
