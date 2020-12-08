const columns = t => [
  {
    title: t('fields.code'),
    dataIndex: 'tnkr_code',
    key: 'tnkr_code',
    align: 'center'
  },
  {
    title: t('fields.name'),
    dataIndex: 'tnkr_name',
    key: 'tnkr_name',
    align: 'center'
  }
];

export default columns;
