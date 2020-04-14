import React from 'react';
import { Modal } from 'antd';
import { SWRConfig } from 'swr';
import { EditOutlined, FormOutlined } from '@ant-design/icons';

import { fetcher } from '../../utils';

const FormModal = ({ value, form, id, name, t, width }) => {
  Modal.info({
    className: 'form-container',
    title: value ? `${t('operations.editing')} (${id} / ${name})` : `${t('operations.create')}`,
    centered: true,
    width: width || '50vw',
    icon: value ? <EditOutlined /> : <FormOutlined />,
    content: (
      <SWRConfig
        value={{
          refreshInterval: 0,
          fetcher,
        }}
      >
        {form}
      </SWRConfig>
    ),
    okButtonProps: {
      style: { display: 'none' },
    },
  });

  return null;
};

export default FormModal;
