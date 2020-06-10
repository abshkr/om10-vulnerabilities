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
import { ReactComponent as Australia } from './au.svg';
import { ReactComponent as China } from './cn.svg';
import { ReactComponent as England } from './en.svg';

import { ReactComponent as Tank } from './tank.svg';
import { ReactComponent as List } from './list.svg';
import { ReactComponent as Create } from './new.svg';
import { ReactComponent as Refresh } from './rotate.svg';
import { ReactComponent as Export } from './arrow.svg';
import { ReactComponent as Search } from './search.svg';
import { ReactComponent as Tanks } from './fuel.svg';
import { ReactComponent as Product } from './product.svg';
import { ReactComponent as Office } from './office.svg';
import { ReactComponent as Modules } from './modules.svg';
import { ReactComponent as Config } from './settings.svg';

import { ReactComponent as Lock } from './lock.svg';
import { ReactComponent as Unlock } from './unlock.svg';

const enumerator = {
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
  au: Australia,
  cn: China,
  en: England,
  tank: Tank,
  list: List,
  create: Create,
  refresh: Refresh,
  export: Export,
  search: Search,
  tanks: Tanks,
  products: Product,
  companies: Office,
  modules: Modules,
  config: Config,
  lock: Lock,
  unlock: Unlock,
};

const Icons = (props) => (
  <Icon
    component={enumerator[props.type]}
    {...props}
    style={{
      transform: props.scale ? `'scale(${props.scale})'` : 'scale(1)',
      fontSize: props.size || null,
    }}
  />
);

export default Icons;
