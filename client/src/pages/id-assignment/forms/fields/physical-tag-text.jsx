import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Input, Button } from 'antd';
import { SecurityScanOutlined } from '@ant-design/icons';
import _ from 'lodash';

import { IButton } from '../../../../components';

import { ID_ASSIGNMENT } from '../../../../api';

const PhysicalTagText = ({ form, value, physType }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: idAssignments, isValidating } = useSWR(ID_ASSIGNMENT.READ);

  const validate = (rule, input) => {
    const match = _.find(idAssignments?.records, ['kya_txt', _.toString(input)]);

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.physicalTagText')}`);
    }

    if (input && !!match && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    const len = (new TextEncoder().encode(input)).length;
    if (input && len > 256) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 256 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  const handleTagLookUp = () => {
    IButton({
      setSearch: setKeyText,
      t: t,
      buttonType: 'read',
    });
  };

  const setKeyText = (txt) => {
    if (txt) {
      setFieldsValue({
        kya_txt: txt
      });
    }
  }

  useEffect(() => {
    if (value) {
      setFieldsValue({
        kya_txt: value.kya_txt
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="kya_txt"
      label={t('fields.physicalTagText')}
      hasFeedback
      validateStatus={isValidating ? 'validating' : ''}
      rules={[{ required: true, validator: validate }]}
    >
      <Input
        style={{ width: '100%' }}
        disabled={isValidating}
        addonAfter={
          physType === '7' && (
            <Button icon={<SecurityScanOutlined />} onClick={() => handleTagLookUp()}>
              {t('operations.tagLookUp')}
            </Button>
          )
        }
      />
    </Form.Item>
  );
};

export default PhysicalTagText;
