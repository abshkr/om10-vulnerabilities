import React, { useState, useEffect } from 'react';

import { Button, Dropdown, Menu, message, notification, Tooltip, List, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';

import api, { AUTH } from '../../api';
import { updateUserPageColumns } from 'utils';

const AdjustableColumns = ({ pageColumns, pageModule, columnAPI, columnLoader }) => {
  const { t } = useTranslation();

  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);

  const onFinish = (type, payload) => {
    // console.log('.............moved', columnAPI, pageColumns);
    setVisible(false);
    updateUserPageColumns(t, items, pageColumns, pageModule, columnLoader);
  };

  const onColumnChanged = async (object, value) => {
    console.log('............onColumnChanged', object, value);
    const columns = [];
    for (let i = 0; i < items?.length; i++) {
      const item = items?.[i];
      if (item?.colDef?.field === object?.colDef?.field) {
        item.colDef.hide = !value;
      }
      columns.push(item);
    }
    console.log('............onColumnChanged2', columns);

    setItems(columns);
  };

  useEffect(() => {
    if (columnAPI) {
      const columns = columnAPI?.getAllGridColumns();
      console.log('...........adjust visibility', columnAPI, columns);

      setItems(columns);
    }
  }, [columnAPI]);

  const menu = (
    <Menu multiple={true} style={{ minWidth: 200 }}>
      <div style={{ paddingLeft: 5, paddingRight: 5, display: 'flex' }}>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => onFinish()}
          style={{ float: 'right', marginRight: 5, width: '100%' }}
        >
          {t('operations.saveColumns')}
        </Button>
      </div>

      <Scrollbars
        style={{
          height: 'calc(100vh - 235px)',
          width: '25vw',
          marginTop: 5,
          padding: 5,
        }}
      >
        {/* <List
          style={{ height: 'calc(100vh - 300px)', overflowY: 'auto', minHeight: 720 }}
          itemLayout="horizontal"
          size="small"
          dataSource={data}
          renderItem={(item) => {
            return (
              <List.Item style={{ background: 'white', marginBottom: 10, marginRight: 10, borderRadius: 5 }}>
                <List.Item.Meta
                  style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}
                  avatar={
                    <Switch
                      checked={item.column_visible === '1'}
                      style={{
                        visibility: item.column_visible === '0' || item.column_visible === '1' ? 'visible' : 'hidden',
                      }}
                      checkedChildren={<span>{t('operations.switchOn')}</span>}
                      unCheckedChildren={<span>{t('operations.switchOff')}</span>}
                      // onChange={(value) => onChange(item, value ? '1' : '0')}
                    />
                  }
                  // eslint-disable-next-line
                  title={`${t(item.column_title)}`}
                />
                
              </List.Item>
            );
          }}
        /> */}
        <List
          style={{ height: 'calc(100vh - 300px)', overflowY: 'auto', minHeight: 500 }}
          itemLayout="horizontal"
          size="small"
          dataSource={items}
          renderItem={(item) => {
            return (
              <List.Item style={{ background: 'white', marginBottom: 10, marginRight: 10, borderRadius: 5 }}>
                <List.Item.Meta
                  style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}
                  avatar={
                    <Switch
                      checked={!item?.colDef?.hide}
                      // style={{ visibility: item.hide === false || item.hide === true ? 'visible' : 'hidden', }}
                      checkedChildren={<span>{t('operations.switchShow')}</span>}
                      unCheckedChildren={<span>{t('operations.switchHide')}</span>}
                      onChange={(value) => onColumnChanged(item, value)}
                    />
                  }
                  // eslint-disable-next-line
                  title={item?.colDef?.headerName}
                />
              </List.Item>
            );
          }}
        />
      </Scrollbars>
    </Menu>
  );

  return (
    <Dropdown visible={visible} overlay={menu} onVisibleChange={setVisible} trigger={['click']}>
      <Tooltip placement="topLeft" title={t('descriptions.columnVisibility')}>
        <Button type="primary" icon={<EyeOutlined />} style={{ float: 'right', marginRight: 5 }}>
          {t('operations.updateColumnVisibility')}
        </Button>
      </Tooltip>
    </Dropdown>
  );
};

export default AdjustableColumns;
