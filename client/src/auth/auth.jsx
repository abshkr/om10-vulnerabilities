import React from 'react';

import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useConfiguration } from '../hooks';
import { AuthContainer } from './style';

export default Authenticated => {
  const ComposedComponent = ({ auth }) => {
    const { config } = useConfiguration();
    const { t } = useTranslation();

    return (
      <AuthContainer>
        <Authenticated t={t} configuration={config} user={null} />
      </AuthContainer>
    );
  };

  const mapStateToProps = state => {
    return { auth: state.auth.authenticated };
  };

  return connect(mapStateToProps)(ComposedComponent);
};
