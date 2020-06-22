import React from 'react';
import { Modal, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const IButton = ({ setSearch }) => {
  const { t } = useTranslation();

  Modal.info({
    title: t('prompts.iButtonLookUp'),
    centered: true,
    maskClosable: true,
    okButtonProps: {
      hidden: true,
    },
    content: (
      <>
        <span>{t('descriptions.iButtonLookUp')}</span>
        <Input.Search
          style={{ marginTop: 10 }}
          enterButton={t('operations.search')}
          onSearch={(value) => {
            setSearch(value);
            Modal.destroyAll();
          }}
          onPressEnter={Modal.destroyAll()}
        />
      </>
    ),
  });

  return null;
};

export default IButton;
