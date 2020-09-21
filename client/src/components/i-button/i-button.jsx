import React, { useState} from 'react';
import { Modal, Input } from 'antd';

const KaytxtInput = ({setSearch, enterButton}) => {
  const [data, setData] = useState('');

  const onChange = (event) => {
    console.log(event.target.value)
    console.log(event.target.value.toUpperCase())
    setData(event.target.value.toUpperCase());
  }

  return (
    <Input.Search
      style={{ marginTop: 10 }}
      enterButton={enterButton}
      onChange={onChange}
      value={data}
      onSearch={(value) => {
        let card_txt = value.trim();
        card_txt = card_txt.substring(2, card_txt.length-2);
        setSearch(card_txt);
        Modal.destroyAll();
      }}
      // onPressEnter={Modal.destroyAll()}
      autoFocus={true}
    />
  );
}

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
        <KaytxtInput
          setSearch={setSearch}
          enterButton={t('operations.'+buttonType)}
        />
      </>
    ),
  });

  return null;
};

export default IButton;
