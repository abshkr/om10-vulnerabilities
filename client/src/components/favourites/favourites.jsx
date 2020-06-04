import React, { useState, useEffect } from 'react';

import { StarOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { Button, Dropdown } from 'antd';
import useSWR from 'swr';

import { fetcher } from '../../utils';
import { AUTH } from '../../api';

const Favourites = () => {
  const { data, isValidating } = useSWR(AUTH.SETUP, fetcher);

  const history = useHistory();

  return (
    <Dropdown overlay={null} trigger={['click']}>
      <Button type="primary" size="large" shape="circle" style={{ marginRight: 7 }}>
        <StarOutlined style={{ transform: 'scale(1.5)' }} />
      </Button>
    </Dropdown>
  );
};

export default Favourites;
