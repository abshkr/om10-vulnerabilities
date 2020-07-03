import React from 'react';
import { Modal, Input } from 'antd';

const IButton = ({ setSearch, t }) => {
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
          autoFocus={true}
        />
      </>
    ),
  });

  return null;
};

export default IButton;
