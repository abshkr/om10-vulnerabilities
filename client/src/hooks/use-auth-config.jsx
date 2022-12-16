import { useState, useEffect } from 'react';
import useSWR from 'swr';

import { AUTH } from 'api';

export default function useAuthConfig() {
  const { data } = useSWR(AUTH.AUTH_CONFIG);

  const [config, setConfig] = useState({
    siteEnabledLDAP: false,
    siteEnabledSAML: false,
  });

  useEffect(() => {
    if (data) {
      setConfig({
        siteEnabledLDAP: data?.SITE_LDAP_ENABLED,
        siteEnabledSAML: data?.SITE_SAML_ENABLED,
      });
    }
  }, [data]);

  return config;
}
