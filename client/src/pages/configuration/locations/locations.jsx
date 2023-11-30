import React, { useState } from 'react';
import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Form, Button, Tabs, Modal, notification, Drawer } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import { TerminalGroupsPopup } from '../../terminal-groups';
import Forms from './forms';
import { DataTable } from 'components';
import columns from './columns';
import { SITE_CONFIGURATION } from 'api';
import { useConfig } from '../../../hooks';

const Locations = ({ handleFormState, visible, selected, access }) => {
  const config = useConfig();
  const [visibleGroup, setVisibleGroup] = useState(false);

  const { data: payload, isValidating, mutate: revalidate } = useSWR(SITE_CONFIGURATION.TERMINALS);

  const { t } = useTranslation();

  const fields = columns(t, config);
  const data = payload?.records;

  return (
    <div style={{ padding: 10, background: 'white' }}>
      <DataTable
        columns={fields}
        data={data}
        isLoading={isValidating}
        parentHeight="calc(100vh - 400px)"
        selectionMode="single"
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        extra={
          config?.siteUseMultiTerminals && (
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => setVisibleGroup(true)}
              loading={isValidating}
            >
              {t('pageNames.terminalGroups')}
            </Button>
          )
        }
      />

      {visible && (
        <Forms
          value={selected}
          visible={visible}
          handleFormState={handleFormState}
          access={access}
          config={config}
        />
      )}

      <Drawer
        title={t('pageNames.terminalGroups')}
        styles={{ body: { paddingTop: 5 } }}
        forceRender
        onClose={() => setVisibleGroup(false)}
        maskClosable={false}
        destroyOnClose={true}
        mask={true}
        placement="right"
        width="80vw"
        open={visibleGroup}
        footer={
          <>
            <Button
              htmlType="button"
              icon={<CloseOutlined />}
              style={{ float: 'right' }}
              onClick={() => setVisibleGroup(false)}
            >
              {t('operations.cancel')}
            </Button>
          </>
        }
      >
        {visibleGroup && <TerminalGroupsPopup access={access} popup={true} />}
      </Drawer>
    </div>
  );
};

export default Locations;
