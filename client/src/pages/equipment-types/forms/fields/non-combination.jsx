import React, { useState } from 'react';
import { MinusCircleOutlined } from '@ant-design/icons';

import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber, Select, Radio, Row, Col, Input, Button } from 'antd';
import _ from 'lodash';

const { Option } = Select;

const NonCombination = ({ form, value }) => {
  const [selected, setSelected] = useState('p');
  const [compartments, setCompartments] = useState(0);
  const [unit, setUnit] = useState(undefined);

  const { t } = useTranslation();

  const equipment = ['p', 'f', 't', 'r', 's', 'e'];

  const IS_DISABLED = ['p', 'f'].includes(selected);

  const selectAfter = (
    <Select defaultValue="l (amb)" className="select-after">
      <Option value="l (amb)">l (amb)</Option>
      <Option value="l (cor)">l (cor)</Option>
      <Option value="kg">kg</Option>
    </Select>
  );

  return (
    <>
      <Form.Item name="equipment">
        <Scrollbars
          style={{
            width: '100%',
            padding: 5,
            height: 180,
          }}
        >
          <Radio.Group onChange={(e) => setSelected(e.target.value)} value={selected}>
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
        </Scrollbars>
      </Form.Item>

      {!IS_DISABLED && (
        <Form.List name="names">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Form.Item label={index === 0 ? 'Compartments' : ''} required={false} key={field.key}>
                    <Row gutter={[16, 16]}>
                      <Col span={20}>
                        <Form.Item {...field} validateTrigger={['onChange', 'onBlur']}>
                          <Input
                            addonBefore={`Compartment: ${index + 1}`}
                            addonAfter={selectAfter}
                            defaultValue={0}
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                      </Col>

                      <Col span={4}>
                        {fields.length > 0 ? (
                          <Button
                            block
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

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    style={{ width: '100%' }}
                  >
                    Add Compartment
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      )}
    </>
  );
};

export default NonCombination;
