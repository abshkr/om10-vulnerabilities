import React from 'react';

import Icon from '@ant-design/icons';

import { ReactComponent as Dashboard } from './dashboard.svg';
import { ReactComponent as Gantry } from './tank-truck.svg';
import { ReactComponent as Schedules } from './calendar.svg';
import { ReactComponent as Reports } from './report.svg';
import { ReactComponent as AccessControl } from './security.svg';
import { ReactComponent as Customers } from './customers.svg';
import { ReactComponent as StockMangement } from './stock.svg';
import { ReactComponent as Printer } from './printer.svg';
import { ReactComponent as StockRecon } from './scale.svg';
import { ReactComponent as Operations } from './operations.svg';
import { ReactComponent as User } from './user.svg';

const matrix = {
  gantry: Gantry,
  dashboard: Dashboard,
  schedules: Schedules,
  reports: Reports,
  accessControl: AccessControl,
  customers: Customers,
  stockManagement: StockMangement,
  printerConfiguration: Printer,
  stockReconciliation: StockRecon,
  operations: Operations,
  user: User,
};

const Icons = (props) => <Icon component={matrix[props.type]} {...props} style={{ transform: 'scale(2)' }} />;

export default Icons;
