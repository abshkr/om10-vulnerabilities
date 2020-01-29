import React from 'react';
import { Modal } from 'antd';

import { SWRConfig } from 'swr';
import { fetcher } from '../../utils';

const FormModal = ({ value, form, id, name, t, width }) => {
  Modal.info({
    title: value ? `${t('operations.editing')} (${id} / ${name})` : `${t('operations.create')}`,
    centered: true,
    width: width || '50vw',
    icon: value ? 'edit' : 'form',
    content: (
      <SWRConfig
        value={{
          refreshInterval: 0,
          fetcher
        }}
      >
        {form}
      </SWRConfig>
    ),
    okButtonProps: {
      style: { display: 'none' }
    }
  });

  return null;
};

export default FormModal;
