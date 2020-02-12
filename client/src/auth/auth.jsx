import React, { useEffect } from 'react';
import { SWRConfig } from 'swr';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { ROUTES } from '../constants';
import { AuthContainer } from './style';
import { fetcher } from '../utils';

export default Authenticated => {
  const ComposedComponent = ({ token }) => {
    const { t } = useTranslation();
    const history = useHistory();

    useEffect(() => {
      if (!token) {
        history.push(ROUTES.LOG_IN);
      }
    }, [token]);

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
