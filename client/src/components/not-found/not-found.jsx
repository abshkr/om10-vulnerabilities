import React from 'react';
import { Result } from 'antd';
import { useTranslation } from 'react-i18next';

import { Icons } from '..';

import NotFoundContainer from './style';

const NotFound = ({target}) => {
  const { t } = useTranslation();

  return (
    <NotFoundContainer>
      <Result
        title={t('messages.sysNotFound')}
        icon={<Icons type="modules" size={256} />}
        subTitle={t('descriptions.sysNotFound') + ': ' + target } 
      />
    </NotFoundContainer>
  );
};

export default NotFound;
