import React, { useEffect, useState } from 'react';
import { Form, Checkbox, notification } from 'antd';
import { useTranslation } from 'react-i18next';

const AdaptiveFlowControlFlag = ({ form, value, note, onChange }) => {
  const { t } = useTranslation();
  const { setFieldsValue } = form;
  const [flag, setFlag] = useState(value?.afc_enabled);

  const onCheck = (v) => {
    if (flag || (value?.base_tank_list.length > 0 && note.length === 0)) {
      setFlag(v.target.checked);
      setFieldsValue({
        afc_enabled: v.target.checked,
      });
      onChange(v.target.checked);
    } else {
      if (value?.base_tank_list.length === 0) {
        notification.warning({
          message: t('messages.cannotEnable'),
          description: t('descriptions.cannotEnableAfcNoTank') + note,
        });
      }
      if (note.length > 0) {
        notification.warning({
          message: t('messages.cannotEnable'),
          description: t('descriptions.cannotEnableAfcNoFlowRate') + note,
        });
      }
    }
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        afc_enabled: value.afc_enabled,
      });
      setFlag(value.afc_enabled);
      onChange(value.afc_enabled);
    } else {
      onChange(value?.afc_enabled);
    }
  }, [value, setFieldsValue, setFlag]);

  return (
    <Form.Item name="afc_enabled" label={t('fields.adaptiveFlowControl')}>
      <Checkbox checked={flag} onChange={onCheck} disabled={!value}></Checkbox>
    </Form.Item>
  );
};

export default AdaptiveFlowControlFlag;
