import React from 'react';
import { Result } from 'antd';

import LockedContainer from './style';
import { Icons } from '..';

const Locked = () => (
  <LockedContainer>
    <Result
      title="Unauthorized"
      icon={<Icons type="unauthorized" size={256} />}
      subTitle="Sorry, you are not authorized to access this page."
    />
  </LockedContainer>
);

export default Locked;
