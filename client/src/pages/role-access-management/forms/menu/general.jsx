import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Checkbox, Input } from 'antd';
import _ from 'lodash';

const General = ({ form, value, options, nodes }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      const fields = {};

      const payload = _.filter(nodes, privilege => {
        return privilege.domain_text === privilege.object_text;
      });

      _.forEach(payload, entry => {
        const set = [];

        if (entry.priv_view) {
          set.push('1');
        }

        if (entry.priv_create) {
          set.push('2');
        }

        if (entry.priv_update) {
          set.push('3');
        }

        if (entry.priv_delete) {
          set.push('4');
        }

        if (entry.priv_protect) {
          set.push('5');
        }

        fields[entry.object_text] = set;
      });

      setFieldsValue({
        privilege: fields
      });
    }
  }, [value, setFieldsValue]);

  return (
    <div>
      <Form.Item label="Role Comments">{getFieldDecorator(`role_note`)(<Input />)}</Form.Item>

      {nodes.map(item => (
        <Form.Item label={t(`pageMenu.${item.object_text}`)} key={item.domain_id}>
          {getFieldDecorator(`privilege.${item.object_text}`)(
            <Checkbox.Group
              style={{ flexDirection: 'row', marginBottom: 0, justifyContent: 'space-between' }}
              options={options}
            />
          )}
        </Form.Item>
      ))}
    </div>
  );
};

export default General;
