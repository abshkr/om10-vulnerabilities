import React from "react";
import { stack as BurgerMenu } from "react-burger-menu";
import { Menu, Icon } from "antd";

const UnAuthenticated = () => {
  return (
    <div>
      <BurgerMenu width={320} isOpen={false} burgerBarClassName={"un-auth"}>
        <Menu mode="inline">
          <Menu.Item key="1">
            <Icon type="customer-service" theme="outlined" style={{ fontSize: 30 }} />
            <span>Support</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="database" theme="outlined" style={{ fontSize: 30 }} />
            <span>About (EULA)</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="smile" theme="outlined" style={{ fontSize: 30 }} />
            <span>Help</span>
          </Menu.Item>
        </Menu>
      </BurgerMenu>
    </div>
  );
};

export default UnAuthenticated;
