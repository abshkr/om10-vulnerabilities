import React, { useState, useEffect } from 'react';

import { List, Checkbox, Card, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';
import { CheckGroupListContainer } from './styles';

const CheckGroupList = ({ value, defaultValue, flags, listOptions, checkOptions, onChange }) => {
  const { t } = useTranslation();

  const [checkValues, setCheckValues] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [checkFlags, setCheckFlags] = useState([0, 1, 0, 0, 1, 0, 0, 0]);
  const [groupValue, setGroupValue] = useState(value);

  /*
  const string = 'hi there';

  const usingSplit = string.split('');
  const usingSpread = [...string];
  const usingArrayFrom = Array.from(string);
  const usingObjectAssign = Object.assign([], string);
  */
  useEffect(() => {
    if (value) {
      const strings = value.split('');
      const values = strings.map((o) => _.toNumber(o));
      setCheckValues(values);
    }
  }, [value]);

  useEffect(() => {
    if (flags) {
      const strings = flags.split('');
      const values = strings.map((o) => _.toNumber(o));
      setCheckFlags(values);
    }
  }, [flags]);

  const layout = {
    gutter: 0,
    column: listOptions?.length || 8,
    /* xs: listOptions?.length || 8,
    sm: listOptions?.length || 8,
    md: listOptions?.length || 8,
    lg: listOptions?.length || 8,
    xl: listOptions?.length || 8,
    xxl: listOptions?.length || 8, */
  };

  return (
    <CheckGroupListContainer>
      <List
        style={{ width: '100%', minWidth: 800, overflowX: 'auto', overflowY: 'auto', minHeight: 120 }}
        grid={layout}
        // itemLayout="horizontal"
        size="small"
        dataSource={listOptions}
        renderItem={(listItem) => {
          return (
            <List.Item
              style={{
                background: 'white',
                marginBottom: 5,
                marginRight: 0,
                marginLeft: 0,
                marginTop: 0,
                padding: 0,
              }}
            >
              <Card
                size="small"
                title={listItem?.title}
                hoverable
                className="check-group-list"
                // headStyle={{ paddingRight: 0, background: '#a9bfd2', color: 'red', fontSize: '12px', fontWeight: 'bold' }}
                style={{ margin: 0, padding: 0, minWidth: 160 }}
              >
                {checkOptions?.map((checkItem) => (
                  <Row>
                    <Col span={24}>
                      <Checkbox
                        valuePropName="checked"
                        checked={(checkValues?.[listItem.index - 1] & Math.pow(2, checkItem.index - 1)) > 0}
                        disabled={checkFlags?.[listItem.index - 1] === 0}
                        style={{ alignContent: 'left' }}
                        onChange={(v) => {
                          const flag = v.target.checked;
                          let option = 0;
                          for (let i = 0; i < checkOptions.length; i++) {
                            if (i === checkItem.index - 1) {
                              option |= flag ? Math.pow(2, i) : 0;
                            } else {
                              option |= checkValues?.[listItem.index - 1] & Math.pow(2, i);
                            }
                          }
                          const newValues = [];
                          for (let i = 0; i < listOptions.length; i++) {
                            if (i === listItem.index - 1) {
                              newValues.push(option);
                            } else {
                              newValues.push(checkValues?.[i]);
                            }
                          }

                          setCheckValues(newValues);
                          const strValues = newValues.map((o) => String(o));
                          const grpValue = strValues.join('');
                          if (onChange) {
                            onChange(grpValue);
                          }

                          setGroupValue(grpValue);
                        }}
                      >
                        {checkItem?.title}
                      </Checkbox>
                    </Col>
                  </Row>
                ))}
              </Card>
            </List.Item>
          );
        }}
      />
    </CheckGroupListContainer>
  );
};

export default CheckGroupList;
