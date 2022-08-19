import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Checkbox, Input, Divider, Row, Col } from 'antd';
import { REGEX } from '../../../../constants';

const GuardMaster = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;
  const [flag, setFlag] = useState(value?.eqpt_guard_master_used);

  const onCheck = (v) => {
    setFlag(v.target.checked);
    setFieldsValue({
      eqpt_guard_master_used: v.target.checked,
    });
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        eqpt_guard_master_used: value.eqpt_guard_master_used,
        eqpt_guard_master_desc: value.eqpt_guard_master_desc,
        eqpt_guard_master_id: value.eqpt_guard_master_id,
      });
      setFlag(value.eqpt_guard_master_used);
    }
  }, [value, setFieldsValue]);

  const validateID = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.copsGuardMasterID')}`);
      }
    }

    if (input !== undefined && input !== input.trimLeft()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInBeginning')}`);
    }
    if (input !== undefined && input !== input.trimRight()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInEnd')}`);
    }

    const regex = new RegExp(REGEX.ALPHANUMERIC_NOSPACE);
    const validated = regex.exec(input);

    if (input && input.length > 0 && !validated) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.regexpTextAlphaNumericNoSpace')}`);
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > 10) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: ${10} ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.copsGuardMasterDesc')}`);
      }
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > 200) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 200 ─ ${t('descriptions.maxCharacters')}`);
    }

    /* if (input !== undefined && input !== input.trimLeft()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInBeginning')}`);
    }
    if (input !== undefined && input !== input.trimRight()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInEnd')}`);
    } */

    return Promise.resolve();
  };

  return (
    <>
      <Divider>{t('fields.copsGuardMasterInfo')}</Divider>
      <Row gutter={[8, 2]}>
        <Col span={4}>
          <Form.Item
            name="eqpt_guard_master_used"
            label={t('fields.copsGuardMasterUsed')}
            valuePropName="checked"
          >
            <Checkbox checked={flag} onChange={onCheck} />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item
            name="eqpt_guard_master_id"
            label={t('fields.copsGuardMasterID')}
            rules={[{ required: flag, validator: validateID }]}
          >
            <Input disabled={!flag} />
          </Form.Item>
        </Col>
        <Col span={15}>
          <Form.Item
            name="eqpt_guard_master_desc"
            label={t('fields.copsGuardMasterDesc')}
            rules={[{ required: false, validator: validate }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default GuardMaster;
