import { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import useSWR from 'swr';
import _ from 'lodash';

import { AUTH } from '../api';
import { ROUTES } from '../constants';

const useAuth = (module) => {
  const [matrix, setMatrix] = useState({
    user: null,
    isProtected: false,
    isLoading: true,
    canDelete: false,
    canUpdate: false,
    canCreate: false,
    canView: false,
  });

  const { data: payload, revalidate } = useSWR(AUTH.PERMISSIONS);

  let history = useHistory();

  useEffect(() => {
    const resource = payload?.records;

    if (resource) {
      const token = sessionStorage.getItem('token');
      try {
        const decoded = jwtDecode(token);

        const code = decoded?.per_code;
        const user = _.find(resource, ['user_code', code]);
        const auth = _.find(user?.privilege, ['object_text', module]);

        if (auth) {
          setMatrix({
            user: code,
            isProtected: auth.priv_protect,
            canDelete: auth.priv_update && auth.priv_delete,
            canUpdate: auth.priv_update,
            canCreate: auth.priv_create,
            canView: auth.priv_view,
          });
        }
      } catch (error) {
        // JWT is invalid
        history.push(ROUTES.LOG_OUT);
      }
    }
  }, [payload, history, module]);

  useEffect(() => {
    // Revalidate Auth Status Upon Window Refocus

    window.addEventListener('focus', () => revalidate());
  }, [revalidate]);

  return {
    ...matrix,
    isLoading: !payload,
  };
};

export default useAuth;
