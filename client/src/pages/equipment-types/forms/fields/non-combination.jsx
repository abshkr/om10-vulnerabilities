import React, { useState, useEffect } from 'react';

import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber, Select, Radio, Row, Col, Input, Button } from 'antd';
import _ from 'lodash';

const { Option } = Select;

const NonCombination = ({ form, value }) => {
  const { setFieldsValue } = form;

  const [selected, setSelected] = useState('p');
  const [unit, setUnit] = useState('l (amb)');

  const { t } = useTranslation();

  const equipment = ['p', 'f', 't', 'r', 's', 'e'];

  const IS_DISABLED = ['p', 'f'].includes(selected);
  const IS_CREATING = !value;

  if (IS_CREATING) {
    return (
      <>
        <Scrollbars
          style={{
            width: '100%',
            padding: 5,
            height: 180,
          }}
        >
          <Form.Item name="etyp_category">
            <Radio.Group onChange={(e) => setSelected(e.target.value)}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                {equipment.map((item) => (
                  <div
                    key={item}
                    style={{
                      marginRight: 10,
                      minWidth: 300,
                      height: 140,
                      background: 'white',

                      borderRadius: 5,
                    }}
                    hoverable
                  >
                    <img
                      style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'contain',
                        objectPosition: 'bottom',
                        transform: 'scale(0.8)',
                      }}
                      alt="example"
                      src={`/images/${item}.png`}
                    />
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <Radio value={item} />
                    </div>
                  </div>
                ))}
              </div>
            </Radio.Group>
          </Form.Item>
        </Scrollbars>

        <Form.Item name="unit">
          <Select style={{ width: '100%', marginTop: 10 }} onChange={(key, value) => setUnit(value.children)}>
            <Option value="5">l (amb)</Option>
            <Option value="11">l (cor)</Option>
            <Option value="17">kg</Option>
          </Select>
        </Form.Item>

        {!IS_DISABLED && (
          <Form.List name="names">
            {(fields, { add, remove }) => {
              return (
                <div>
                  <div>
                    <Button
                      type="primary"
                      style={{ marginTop: 10, marginBottom: 10 }}
                      onClick={() => {
                        add();
                      }}
                      block
                    >
                      Add Compartment
                    </Button>
                  </div>

                  <Scrollbars
                    style={{
                      height: 'calc(60vh - 100px)',
                      overflowX: 'hidden',
                    }}
                  >
                    {fields.map((field, index) => (
                      <Form.Item required={false} key={field.key}>
                        <Row gutter={[0, 0]}>
                          <Col span={20}>
                            <Form.Item {...field} validateTrigger={['onChange', 'onBlur']}>
                              <Input
                                type="number"
                                addonBefore={<div style={{ width: 120 }}>{`Compartment: ${index + 1}`}</div>}
                                addonAfter={unit}
                                defaultValue={0}
                                style={{ width: '99%' }}
                              />
                            </Form.Item>
                          </Col>

                          <Col span={4}>
                            {fields.length > 0 ? (
                              <Button
                                style={{ width: '93%' }}
                                onClick={() => {
                                  remove(field.name);
                                }}
                              >
                                Remove
                              </Button>
                            ) : null}
                          </Col>
                        </Row>
                      </Form.Item>
                    ))}
                  </Scrollbars>
                </div>
              );
            }}
          </Form.List>
        )}
      </>
    );
  }

  return null;
};

export default NonCombination;
