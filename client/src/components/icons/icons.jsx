import React from 'react';

import Icon from '@ant-design/icons';
import Tanker from './tanker';

const map = {
  tanker: Tanker
};

const Icons = props => <Icon component={map[props.type]} {...props} style={{ height: 10, width: 10 }} />;

export default Icons;
