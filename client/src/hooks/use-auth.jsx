import { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { notification } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { AUTH } from '../api';

const useAuth = (module) => {
  const { data: payload, revalidate } = useSWR(`${AUTH.PERMISSIONS}?object_text=${module}`, {
    revalidateOnFocus: false,
  });

  const history = useHistory();
  const { t } = useTranslation();

  const [access, setAccess] = useState({
    isProtected: false,
    isLoading: true,
    canDelete: false,
    canUpdate: false,
    canCreate: false,
    canView: false,
    extra: false,
  });

  useEffect(() => {
    if (payload && !!payload.errors) {
      notification.error({
        message: t('descriptions.requestFailed'),
        description: payload.errors[0].message,
      });
    } else if (payload && !!payload.records) {
      const access = payload?.records[0];

      if (access) {
        setAccess({
          isProtected: access.priv_protect,
          canDelete: access.priv_update && access.priv_delete,
          canUpdate: access.priv_update,
          canCreate: access.priv_create,
          canView: access.priv_view,
          extra: access.priv_extra,
          extra2: access.priv_extra2,
          isLoading: false,
        });
      }
    }
  }, [payload, history, module]);

  useEffect(() => {
    // Revalidate Auth Status Upon Window Refocus

    window.addEventListener('focus', () => revalidate());
  }, [revalidate]);

  return {
    ...access,
  };
};

export default useAuth;
