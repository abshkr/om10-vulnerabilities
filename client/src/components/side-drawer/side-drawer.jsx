import React from 'react';
import { Drawer, Tabs, Select, Form } from 'antd';
import { useTranslation } from 'react-i18next';

const { TabPane } = Tabs;
const { Option } = Select;

const SideDrawer = ({ visible, handleClose }) => {
  const { i18n } = useTranslation();

  const onLanguageChange = value => {
    localStorage.setItem('lang', value);
    i18n.changeLanguage(value);
  };

  const defaultLanguage = localStorage.getItem('lang') || 'en';

  return (
    <Drawer placement="right" onClose={handleClose} visible={visible} width={400}>
      <Tabs defaultActiveKey="1" animated={false}>
        <TabPane tab="Events" key="1"></TabPane>
        <TabPane tab="Quick Settings" key="3">
          <Form layout="vertical">
            <Form.Item label="Language" name="username">
              <Select defaultValue={defaultLanguage} style={{ width: '100%' }} onChange={onLanguageChange}>
                <Option value="en">English</Option>
                <Option value="cn">Chinese</Option>
              </Select>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </Drawer>
  );
};

export default SideDrawer;
