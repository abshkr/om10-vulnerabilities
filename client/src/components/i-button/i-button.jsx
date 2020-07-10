import React from 'react';
import { Modal, Input } from 'antd';

const IButton = ({ setSearch, t, buttonType }) => {
  Modal.info({
    title: t('prompts.iButtonLookUp'),
    centered: true,
    width: '25vw',
    maskClosable: true,
    okButtonProps: {
      hidden: true,
    },
    content: (
      <>
        <span>{t('descriptions.iButtonLookUp')}</span>
        <Input.Search
          style={{ marginTop: 10 }}
          enterButton={t('operations.'+buttonType)}
          onSearch={(value) => {
            let card_txt = value.trim();
            card_txt = card_txt.substring(2, card_txt.length-2);
            setSearch(card_txt);
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
