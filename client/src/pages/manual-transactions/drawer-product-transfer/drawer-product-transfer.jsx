import React from 'react';
import { UndoOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { DataTable } from '../../../components';
import columns from './columns';

const DrawerProductTransfer = ({ form }) => {
  const { t } = useTranslation();

  const fields = columns(t);

  const modifiers = (
    <>
      <Button type="danger" icon={<DeleteOutlined />} style={{ marginRight: 5 }}>
        {t('operations.deleteTransfer')}
      </Button>

      <Button type="primary" icon={<UndoOutlined />} style={{ marginRight: 5 }}>
        {t('operations.calculateDrawer')}
      </Button>

      <Button type="primary" icon={<UndoOutlined />} style={{ marginRight: 5 }}>
        {t('operations.getTankDensities')}
      </Button>
    </>
  );

  return <DataTable height="80vh" data={[]} extra={modifiers} columns={fields} />;
};

export default DrawerProductTransfer;
