import React, { useState, useEffect } from 'react';

import { Form, Select, Radio, Row, Col, Input, Button, InputNumber } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import _ from 'lodash';

import { Equipment } from '../../../../components/';
import { EQUIPMENT_TYPES } from '../../../../api';
import { useConfig } from '../../../../hooks';

const NonCombination = ({ form, value }) => {
  const { data: units } = useSWR(EQUIPMENT_TYPES.UNITS);
  const { railTankAvailable, rigidShipAvailable } = useConfig();

  const [selected, setSelected] = useState('p');
  const [unit, setUnit] = useState('l (amb)');
  const [toAdd, setToAdd] = useState(1);

  const { t } = useTranslation();

  const equipment = _.reject(['p', 'f', 't', 'r', 's', 'e'], (equipment) => {
    if (!railTankAvailable) {
      return equipment === 'e';
    }

    if (!rigidShipAvailable) {
      return equipment === 's';
    }
  });

  const names = {
    p: t('fields.primeMover'),
    f: t('fields.flatBed'),
    t: t('fields.trailer'),
    r: t('fields.ridgid'),
    s: t('fields.rigidShip'),
    e: t('fields.railTank'),
  };

  const IS_DISABLED = ['p', 'f'].includes(selected);
  const IS_CREATING = !value;

  useEffect(() => {
    if (units) {
      const item = _.find(units?.records, (o) => o.unit_id === '5');
      if (item !== undefined) {
        setUnit(item?.description);
      }
    }
  }, [units]);

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
                  >
                    <Equipment
                      image={item}
                      style={{
                        height: '100%',

                        objectFit: 'contain',
                        objectPosition: '0 0',
                        transform: 'scale(0.8)',
                      }}
                    />
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <Radio value={item}>{names[item]}</Radio>
                    </div>
                  </div>
                ))}
              </div>
            </Radio.Group>
          </Form.Item>
        </Scrollbars>

        {!IS_DISABLED && (
          <Form.Item name="unit">
            <Select
              dropdownMatchSelectWidth={false}
              allowClear
              showSearch
              style={{ width: '100%', marginTop: 10 }}
              onChange={(key, value) => setUnit(value.children)}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {units?.records?.map((item, index) => (
                <Select.Option key={index} value={item.unit_id}>
                  {item.description}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}

        {!IS_DISABLED && (
          <Form.List name="names">
            {(fields, { add, remove }) => {
              return (
                <div>
                  <div style={{ display: 'flex' }}>
                    <Button
                      type="primary"
                      style={{ marginTop: 10, marginBottom: 10, flex: 4 }}
                      onClick={() => {
                        for (let i = 1; i <= toAdd; i++) {
                          add();
                        }
                      }}
                      block
                    >
                      {t('operations.addCompartment')}
                    </Button>

                    <InputNumber
                      style={{ marginTop: 10, marginBottom: 10, marginLeft: 10, flex: 1 }}
                      defaultValue={1}
                      min={1}
                      max={10}
                      onChange={(v) => {
                        setToAdd(v);
                      }}
                    />
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
                                addonBefore={
                                  <div style={{ width: 120 }}>{`${t('fields.compartment')}: ${
                                    index + 1
                                  }`}</div>
                                }
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
                                {t('operations.removeCompartment')}
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
