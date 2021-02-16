import React from 'react';
import { Result } from 'antd';
import { useTranslation } from 'react-i18next';

import { Icons } from '..';

import CannotAccessContainer from './style';

const CannotAccess = ({ target }) => {
  const { t } = useTranslation();

  return (
    <CannotAccessContainer>
      <Result
        title={t('messages.sysCannotAccess')}
        icon={<Icons type="modules" size={256} />}
        subTitle={target + ': ' + t('descriptions.sysCannotAccess')}
      />
    </CannotAccessContainer>
  );
};

export default CannotAccess;
