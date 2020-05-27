import React, { useState } from 'react';

import { EditOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Card, Button, Drawer, Modal } from 'antd';
import useSWR from 'swr';

import { DataTable } from '../../../components';
import { TANK_STRAPPING } from '../../../api';
import columns from './columns';

const TankStrapping = ({ code, isLoading, access }) => {
  const { data } = useSWR(code ? `${TANK_STRAPPING.READ}?strap_tankcode=${code}` : null);
  const { t } = useTranslation();

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const IS_CREATING = !selected;

  const fields = columns(t);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const modifiers = (
    <Button
      type="primary"
      loading={isLoading}
      disabled={!access.canCreate}
      onClick={() => handleFormState(true, null)}
    >
      {t('operations.addStrapping')}
    </Button>
  );

  return (
    <>
      <Card hoverable loading={isLoading}>
        <DataTable
          columns={fields}
          data={data?.records}
          height="305px"
          extra={modifiers}
          onClick={(payload) => handleFormState(true, payload)}
          handleSelect={(payload) => handleFormState(true, payload[0])}
        />
      </Card>

      <Drawer
        bodyStyle={{ paddingTop: 5 }}
        onClose={() => handleFormState(false, null)}
        maskClosable={IS_CREATING}
        destroyOnClose={true}
        mask={IS_CREATING}
        placement="right"
        width="30vw"
        visible={visible}
        footer={
          <>
            <Button
              htmlType="button"
              icon={<CloseOutlined />}
              style={{ float: 'right' }}
              onClick={() => Modal.destroyAll()}
            >
              {t('operations.cancel')}
            </Button>

            <Button
              type="primary"
              icon={IS_CREATING ? <EditOutlined /> : <PlusOutlined />}
              htmlType="submit"
              style={{ float: 'right', marginRight: 5 }}
            >
              {IS_CREATING ? t('operations.create') : t('operations.update')}
            </Button>
          </>
        }
      ></Drawer>
    </>
  );
};

export default TankStrapping;
