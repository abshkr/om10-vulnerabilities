import { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import useSWR from 'swr';
import _ from 'lodash';

import { AUTH } from '../api';

const useAuth = (module) => {
  const { data: payload, revalidate } = useSWR(`${AUTH.PERMISSIONS}?object_text=${module}`, {
    revalidateOnFocus: false,
  });

  const history = useHistory();

  const [access, setAccess] = useState({
    isProtected: false,
    isLoading: true,
    canDelete: false,
    canUpdate: false,
    canCreate: false,
    canView: false,
  });

  useEffect(() => {
    const access = payload?.records[0];

    if (access) {
      setAccess({
        isProtected: access.priv_protect,
        canDelete: access.priv_update && access.priv_delete,
        canUpdate: access.priv_update,
        canCreate: access.priv_create,
        canView: access.priv_view,
      });
    }
  }, [payload, history, module]);

  useEffect(() => {
    // Revalidate Auth Status Upon Window Refocus

    window.addEventListener('focus', () => revalidate());
  }, [revalidate]);

  return {
    ...access,
    isLoading: !payload,
  };
};

export default useAuth;
