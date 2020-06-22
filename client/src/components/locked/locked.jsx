import React from 'react';
import { Result } from 'antd';
import { useTranslation } from 'react-i18next';

import { Icons } from '..';

import LockedContainer from './style';

const Locked = () => {
  const { t } = useTranslation();

  return (
    <LockedContainer>
      <Result
        title={t('messages.unauthorized')}
        icon={<Icons type="unauthorized" size={256} />}
        subTitle={t('descriptions.unauthorized')}
      />
    </LockedContainer>
  );
};

export default Locked;
