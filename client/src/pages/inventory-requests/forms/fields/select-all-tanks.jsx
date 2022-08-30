import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Checkbox, Tag } from 'antd';

import CheckboxContainer from '../style';

const SelectAllTanks = ({ form, value, type }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;
  const [flag, setFlag] = useState(value?.tkrq_allflag);

  const onCheck = (v) => {
    setFlag(v.target.checked);
    setFieldsValue({
      tkrq_allflag: v.target.checked,
    });
  };

  useEffect(() => {
    if (value && type) {
      // console.log('.................all0000', type);
      setFieldsValue({
        tkrq_allflag: type === '1' ? true : value.tkrq_allflag,
      });
      setFlag(type === '1' ? true : value.tkrq_allflag);
    } else {
      if (type === '1') {
        // console.log('.................all1111', type);
        setFieldsValue({
          tkrq_allflag: true,
        });
        setFlag(true);
      }
    }
  }, [value, type, setFieldsValue]);

  useEffect(() => {
    if (type === '1') {
      // console.log('.................all2222', type);
      setFieldsValue({
        tkrq_allflag: true,
      });
      setFlag(true);
    }
  }, [type, setFieldsValue]);

  return (
    <div>
      {/* <CheckboxContainer> */}
      <Form.Item name="tkrq_allflag" valuePropName="checked">
        <Checkbox disabled={type === '1'} checked={flag} onChange={onCheck}>
          {t('fields.selectAllTanks')}
        </Checkbox>
        {type === '1' && <Tag color={'red'}>{t('descriptions.requestOfficialAllFlag')}</Tag>}
      </Form.Item>
      {/* </CheckboxContainer> */}
    </div>
  );
};

export default SelectAllTanks;
