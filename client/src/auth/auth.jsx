import React from 'react';
import { SWRConfig } from 'swr';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useConfiguration } from '../hooks';
import { AuthContainer } from './style';

export default Authenticated => {
  const ComposedComponent = ({ auth }) => {
    const { config } = useConfiguration();
    const { t } = useTranslation();

    const options = {
      headers: {
        Authorization: auth
      }
    };

    return (
      <SWRConfig
        value={{
          refreshInterval: 0,
          fetcher: (...args) => fetch(...args, options).then(res => res.json())
        }}
      >
        <AuthContainer>
          <Authenticated t={t} configuration={config} user={null} />
        </AuthContainer>
      </SWRConfig>
    );
  };

  const mapStateToProps = state => {
    return { auth: state.auth.authenticated };
  };

  return connect(mapStateToProps)(ComposedComponent);
};
