import React from 'react';
import { Sticky } from 'react-sticky';

const stickyTabs = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />}
  </Sticky>
);

export default stickyTabs;
