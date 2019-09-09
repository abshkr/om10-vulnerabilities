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
  },
  {
    title: t('fields.title'),
    dataIndex: 'eqpt_title',
    key: 'eqpt_title',
    align: 'center'
  },
  {
    title: t('fields.owner'),
    dataIndex: 'eqpt_owner_name',
    key: 'eqpt_owner_name',
    align: 'center'
  }
];

export default columns;
