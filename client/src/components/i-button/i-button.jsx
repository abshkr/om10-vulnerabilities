import React, { useState } from 'react';
import { Modal, Input, message } from 'antd';

const KaytxtInput = ({ setSearch, enterButton, prompt }) => {
  const [data, setData] = useState('');
  const [error, setError] = useState('');

  const onChange = (event) => {
    console.log(event.target.value);
    console.log(event.target.value.toUpperCase());
    setData(event.target.value.toUpperCase());
    let card_txt = event.target.value.toUpperCase().trim();
    if (card_txt.length === 0) {
      setError(prompt);
    } else {
      setError('');
    }
  };

  return (
    <>
      <Input.Search
        style={{ marginTop: 10 }}
        enterButton={enterButton}
        onChange={onChange}
        value={data}
        onSearch={(value) => {
          let card_txt = value.trim();
          if (card_txt.length === 0) {
            // message.error(prompt);
            setError(prompt);
            return;
          }
          card_txt = card_txt.substring(2, card_txt.length - 2);
          setSearch(card_txt);
          Modal.destroyAll();
        }}
        // onPressEnter={Modal.destroyAll()}
        autoFocus={true}
      />
      {error.length > 0 && <div style={{ color: 'red' }}>{error}</div>}
    </>
  );
};

const IButton = ({ setSearch, t, buttonType }) => {
  Modal.confirm({
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
        <KaytxtInput
          setSearch={setSearch}
          enterButton={t('operations.' + buttonType)}
          prompt={t('validate.set')}
        />
        <span>&nbsp;&nbsp;</span>
      </>
    ),
  });

  return null;
};

export default IButton;
