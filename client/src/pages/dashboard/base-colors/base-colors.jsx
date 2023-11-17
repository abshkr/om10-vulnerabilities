import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Button, List, Select, Input, Modal, Card, Tag } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';

import { BASE_PRODUCTS } from 'api';

import BaseProductColor from './color';
import { BaseColorListContainer } from './styles';

const layout = {
  gutter: 10,
  xs: 1,
  sm: 2,
  md: 4,
  lg: 4,
  xl: 4,
  xxl: 4,
};

const BaseColors = ({ onClose }) => {
  const { t } = useTranslation();

  const { data: payload, isValidating } = useSWR(BASE_PRODUCTS.READ);
  const { data: options, isValidating: isValidatingCat } = useSWR(BASE_PRODUCTS.CLASSIFICATIONS);

  const [baseClass, setBaseClass] = useState(undefined);
  const [baseName, setBaseName] = useState('');

  const onExit = () => {
    Modal.destroyAll();
    onClose();
  };

  return (
    <>
      <div style={{ marginBottom: 5 }}>
        <Select
          dropdownMatchSelectWidth={false}
          allowClear
          loading={isValidatingCat}
          showSearch
          onChange={setBaseClass}
          style={{ width: '50%' }}
          optionFilterProp="children"
          placeholder={t('placeholder.selectClassification')}
          filterOption={(value, option) =>
            option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
          }
        >
          {options?.records.map((item, index) => (
            <Select.Option key={index} value={item.bclass_no}>
              {item.bclass_desc}
            </Select.Option>
          ))}
        </Select>
        <Input
          placeholder={t('fields.baseProdName')}
          style={{ width: '20%', float: 'left', marginRight: 10 }}
          onChange={(e) => setBaseName(e.target.value)}
        />
        <Button
          htmlType="button"
          icon={<CloseOutlined />}
          style={{ float: 'right' }}
          disabled={false}
          onClick={onExit}
        >
          {t('operations.exit')}
        </Button>
      </div>
      <BaseColorListContainer>
        <Scrollbars
          style={{
            width: '100%',
            height: 'calc(100vh - 235px)',
            marginTop: 5,
            padding: 5,
          }}
        >
          <List
            style={{ width: '98%', minWidth: 800, minHeight: 120, margin: 10, border: '3px lightgrey solid' }}
            grid={layout}
            dataSource={payload?.records?.filter(
              (o) =>
                (baseClass === undefined || o?.base_cat === baseClass) &&
                (!baseName || o?.base_name?.toUpperCase().indexOf(baseName?.toUpperCase()) >= 0)
            )}
            loading={isValidating}
            renderItem={(item) => (
              <List.Item>
                <Card
                  size="small"
                  title={`${item?.base_code} - ${item?.base_name}`}
                  className="base-color-list"
                  hoverable
                  headStyle={{ paddingRight: 0 }}
                >
                  <div style={{ textAlign: 'center', marginBottom: 10 }}>
                    <Tag
                      style={{ color: 'rgb(0,84,164)', borderColor: 'rgb(0,84,164)', fontWeight: '800' }}
                      color={'red'}
                    >
                      {item?.base_class_desc}
                    </Tag>
                  </div>
                  <BaseProductColor value={item} />
                </Card>
              </List.Item>
            )}
          />
        </Scrollbars>
      </BaseColorListContainer>
    </>
  );
};

export default BaseColors;
