import DateRender from '../../renders/date-render';

const columns = (t, config) => [
  {
    title: t('fields.period'),
    dataIndex: 'aiprd_index',
    key: 'aiprd_index',
    width: 100,
    align: 'center',
  },

  {
    title: t('fields.quantityAllocated'),
    dataIndex: 'aiprd_qtylimit',
    key: 'aiprd_qtylimit',
    width: 170,
    align: 'center',
  },

  {
    title: t('fields.unit'),
    dataIndex: 'aiprd_produnit',
    key: 'aiprd_produnit',
    width: 100,
    align: 'center',
  },

  {
    title: t('fields.unit'),
    dataIndex: 'aiprd_unitname',
    key: 'aiprd_unitname',
    width: 160,
    align: 'center',
  },

  {
    title: t('fields.startDate'),
    dataIndex: 'aiprd_daystart',
    key: 'aiprd_daystart',
    width: 180,
    align: 'center',
    render: (text) => DateRender({ value: text, dateTimeFormat: config?.dateTimeFormat }),
  },

  {
    title: t('fields.endDate'),
    dataIndex: 'aiprd_dayend',
    key: 'aiprd_dayend',
    width: 180,
    align: 'center',
    render: (text) => DateRender({ value: text, dateTimeFormat: config?.dateTimeFormat }),
  },
];

const hideColumns = [
  // 'aiprd_index',
  // 'aiprd_qtylimit',
  'aiprd_produnit',
  // 'aiprd_unitname',
  // 'aiprd_daystart',
  // 'aiprd_dayend',
];

const showColumns = (t, config) => columns(t, config).filter((o) => hideColumns.indexOf(o?.key) < 0);

export default showColumns;
