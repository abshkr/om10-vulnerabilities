import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import { ListViewContainer, ViewContainer } from './style';

const ListView = ({ data, onSearch, isLoading, onSelect, title, name, description, content, children }) => {
  return (
    <ListViewContainer>
      <Input.Search
        size="large"
        placeholder="Search Tanks"
        enterButton={<SearchOutlined />}
        style={{ borderRadius: 5 }}
        onSearch={onSearch}
      />

      <Scrollbars className="list-view-scroller">
        <List
          itemLayout="horizontal"
          loading={<div>loading</div>}
          dataSource={data}
          renderItem={(item) => (
            <Card hoverable size="small" onClick={() => onSelect(item)}>
              <List.Item style={{ padding: 0 }}>
                <List.Item.Meta
                  avatar={<Avatar size="large">{id}</Avatar>}
                  title={<a>{name}</a>}
                  description={description}
                />
                {content}
              </List.Item>
            </Card>
          )}
        />
      </Scrollbars>

      <ViewContainer>{children}</ViewContainer>
    </ListViewContainer>
  );
};

export default ListView;
