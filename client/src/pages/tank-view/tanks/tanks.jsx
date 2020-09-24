import React from 'react';

import { List } from 'antd';

import { Tank } from 'components';

const layout = {
  gutter: 10,
  xs: 1,
  sm: 2,
  md: 4,
  lg: 4,
  xl: 4,
  xxl: 4,
};

const Tanks = ({ data, isLoading, handleFormState }) => {
  return (
    <List
      grid={layout}
      dataSource={data}
      loading={isLoading}
      renderItem={(item) => (
        <List.Item onClick={() => handleFormState && handleFormState(true, item)}>
          <Tank item={item} />
        </List.Item>
      )}
    />
  );
};

export default Tanks;
