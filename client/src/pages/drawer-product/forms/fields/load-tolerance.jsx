import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Checkbox, InputNumber, Row, Col } from 'antd';

const LoadTolerance = ({ form, value }) => {
  const { setFieldsValue } = form;
  const [ prod_ldtol_flag, setFlag ] = useState(value?.prod_ldtol_flag)

  const { t } = useTranslation();

  if (value) {
    value.prod_ldtol_ntol = value.prod_ldtol_ntol === 0 ? -10 : value.prod_ldtol_ntol
    value.prod_ldtol_ptol = value.prod_ldtol_ptol === 0 ?  10 : value.prod_ldtol_ptol
  }

  const validate = (rule, input) => {
    // if (input === '' || !input) {
    //   return Promise.reject(`${t('fields.loadToleranceCheck')}`);
    // }

    return Promise.resolve();
  };

  const onCheck = v => {
    setFlag(v.target.checked)
    setFieldsValue({
      prod_ldtol_flag: v.target.checked,
    });
  }

  const onChangeNtol = v => {
    setFieldsValue({
      prod_ldtol_ntol: v,
    });
  }

  const onChangePtol = v => {
    setFieldsValue({
      prod_ldtol_ptol: v,
    });
  }

  useEffect(() => {
    if (value) {
      setFieldsValue({
        prod_ldtol_flag: value.prod_ldtol_flag,
        prod_ldtol_ntol: value.prod_ldtol_ntol,
        prod_ldtol_ptol: value.prod_ldtol_ptol,
      });
      setFlag(value.prod_ldtol_flag);
    }
  }, [value, setFieldsValue]);

  const layout = {
    labelCol: {
      span: 6,
    }
  };

  return (
    <Form.Item label={t('fields.loadToleranceCheck')}>
      <Row >
        <Col span={4}>
          <Form.Item name="prod_ldtol_flag" noStyle rules={[{ required: false, validator: validate }]}>
            <Checkbox checked={prod_ldtol_flag} onChange={onCheck}></Checkbox>
          </Form.Item>
        </Col>

        <Col span={10}>
          <Form.Item name="prod_ldtol_ntol" label={t('fields.lowerLimit')} rules={[{ required: false, validator: validate }]}>
            <InputNumber
              // defaultValue={-10}
              min={-200}
              max={0}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
              disabled={!prod_ldtol_flag}
              onChange={onChangeNtol}
            />
          </Form.Item>
        </Col>

        <Col span={10}>
          <Form.Item name="prod_ldtol_ptol" label={t('fields.upperLimit')} rules={[{ required: false, validator: validate }]}>
            <InputNumber
              // defaultValue={10}
              min={0}
              max={200}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
              disabled={!prod_ldtol_flag}
              onChange={onChangePtol}
            />
          </Form.Item>
        </Col>
    </Row>
    </Form.Item>
  );
};

export default LoadTolerance;