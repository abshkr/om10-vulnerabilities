import React, { useState } from 'react';

import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { Form, Input, Card, Radio } from 'antd';
import _ from 'lodash';

const NonCombination = ({ form, value }) => {
  const [selected, setSelected] = useState('p');

  const { t } = useTranslation();

  const equipment = ['p', 'f', 't', 'r', 's', 'e'];

  return (
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
                  style={{ height: '100%', width: '100%', objectFit: 'contain', objectPosition: 'bottom' }}
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
  );
};

export default NonCombination;
