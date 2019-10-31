const columns = t => [
  {
    title: t('fields.id'),
    dataIndex: 'eqpt_id',
    key: 'eqpt_id',
    align: 'center'
  },
  {
    title: t('fields.code'),
    dataIndex: 'eqpt_code',
    key: 'eqpt_code',
    align: 'center'
  }
];

export default columns;
