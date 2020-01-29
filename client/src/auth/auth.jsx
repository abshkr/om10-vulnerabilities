import React from 'react';
import { SWRConfig } from 'swr';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { AuthContainer } from './style';
import { fetcher } from '../utils';

export default Authenticated => {
  const ComposedComponent = ({ token }) => {
    const { t } = useTranslation();

    return (
      <SWRConfig
        value={{
          refreshInterval: 0,
          fetcher
        }}
      >
        <AuthContainer>
          <Authenticated t={t} />
        </AuthContainer>
      </SWRConfig>
    );
  };

  const mapStateToProps = state => {
    return { token: state.auth.authenticated };
  };

  return connect(mapStateToProps)(ComposedComponent);
};
