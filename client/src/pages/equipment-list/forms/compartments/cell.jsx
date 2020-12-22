import React, { useState, useRef, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Checkbox, InputNumber, message } from 'antd';
import _ from 'lodash';

import { FormWrapper } from './style';
import Context from './context';

const Cell = ({ config, title, editable, children, dataIndex, record, handleSave, data, ...restProps }) => {
  const { t } = useTranslation();
  const form = useContext(Context);
  const inputRef = useRef();

  const [editing, setEditing] = useState(false);

  const { setFieldsValue } = form;

  const onEdit = () => {
    setEditing(!editing);
  };

  const save = async (e) => {
    let values = await form.validateFields();

    if (values?.safefill === undefined) {
      values.safefill = record?.safefill;
    }

    if (values?.sfl === undefined) {
      values.sfl = record?.sfl;
    }

    if (config?.siteUseSafefillOnly) {
      values.sfl = values?.safefill;
      record.sfl = values?.safefill;
    }

    if (dataIndex === 'safefill' && values?.safefill) {
      if (!record?.sfl || _.toNumber(values?.safefill) <= record?.sfl) {
        onEdit();

        handleSave({ ...record, ...values });
      } else {
        onEdit();

        form.setFieldsValue({
          safefill: record?.safefill,
        });

        // message.error('Safefill Cannot be higher than capacity');
        message.error(t('validate.cmptSafefillHigh'));
      }
    } else if (dataIndex === 'sfl' && values?.sfl) {
      if (!record?.safefill || _.toNumber(values?.sfl) >= record?.safefill) {
        onEdit();

        handleSave({ ...record, ...values });
      } else {
        onEdit();

        form.setFieldsValue({
          sfl: record?.sfl,
        });

        // message.error('Compartment Capacity should not be less its than safefill.');
        message.error(t('validate.cmptCapacityLow'));
      }
    } else {
      onEdit();

      const reverted = {
        ...values,
        safefill: record?.safefill,
        sfl: record?.sfl,
      };

      handleSave({ ...record, ...reverted });
    }
  };

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  useEffect(() => {
    if (record) {
      setFieldsValue({
        adj_cmpt_lock: record.adj_cmpt_lock,
      });
    }
  }, [record, setFieldsValue]);

  let childNode = children;

  if (editable) {
    if (dataIndex === 'adj_cmpt_lock') {
      childNode = (
        <Form.Item name="adj_cmpt_lock" style={{ margin: 0 }} valuePropName="checked">
          <Checkbox ref={inputRef} onChange={save} />
        </Form.Item>
      );
    } else {
      childNode = (
        <FormWrapper>
          <Form.Item name={dataIndex} style={{ margin: 0 }}>
            <InputNumber
              ref={inputRef}
              defaultValue={record[dataIndex]}
              onPressEnter={save}
              onBlur={save}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </FormWrapper>
      );
    }
  }

  return <td {...restProps}>{childNode}</td>;
};

export default Cell;
