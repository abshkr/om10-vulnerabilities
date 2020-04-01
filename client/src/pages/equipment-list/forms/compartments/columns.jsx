const columns = t => [
  {
    title: t('fields.compartment'),
    dataIndex: 'cmpt_no',
    key: 'cmpt_no',
    align: 'center',
    width: 120
  },
  {
    title: t('fields.safeFill'),
    dataIndex: 'safefill',
    key: 'safefill',
    align: 'center',
    editable: true,
    width: 120
  },
  {
    title: t('fields.safeFillUnit'),
    dataIndex: 'cmpt_units',
    key: 'cmpt_units',
    align: 'center',
    width: 120
  },
  {
    title: t('fields.capacity'),
    dataIndex: 'sfl',
    key: 'sfl',
    align: 'center',
    editable: true,
    width: 120
  },
  {
    title: t('fields.locked'),
    dataIndex: 'adj_cmpt_lock',
    key: 'adj_cmpt_lock',
    width: 120,
    editable: true,
    align: 'center'
  }
];

export default columns;
