const columns = t => [
  {
    title: t('fields.code'),
    dataIndex: 'tnkr_code',
    key: 'tnkr_code',
    align: 'center',
  },
  {
    title: t('fields.equipmentType'),
    dataIndex: 'tnkr_eqpt_name',
    key: 'tnkr_eqpt_name',
    align: 'center',
  },
];

export default columns;
