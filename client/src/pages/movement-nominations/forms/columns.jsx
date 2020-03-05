const columns = t => [
  {
    headerName: t('fields.nominationType'),
    field: 'mvitm_type_name'
  },
  {
    headerName: t('fields.itemKey'),
    field: 'mvitm_item_key'
  },
  {
    headerName: t('fields.itemStatus'),
    field: 'mvitm_status_name'
  },
  {
    headerName: t('fields.productQuantity'),
    field: 'mvitm_prod_qty'
  },
  {
    headerName: t('fields.productUnit'),
    field: 'mvitm_prod_unit_str'
  },
  {
    headerName: t('fields.fromPlant'),
    field: 'mvitm_plant_from'
  },
  {
    headerName: t('fields.fromSupplier'),
    field: 'mvitm_prodcmpy_from'
  },
  {
    headerName: t('fields.fromProduct'),
    field: 'mvitm_prodname_from'
  },
  {
    headerName: t('fields.fromTank'),
    field: 'mvitm_tank_from'
  },
  {
    headerName: t('fields.toPlant'),
    field: 'mvitm_plant_to'
  },
  {
    headerName: t('fields.toSupplier'),
    field: 'mvitm_prodcmpy_to'
  },
  {
    headerName: t('fields.toProduct'),
    field: 'mvitm_prodname_to'
  },
  {
    headerName: t('fields.toTank'),
    field: 'mvitm_tank_to'
  },
  {
    headerName: t('fields.comments'),
    field: 'mvitm_comments'
  },
  {
    headerName: t('fields.quantityScheduled'),
    field: 'mvitm_qty_schd'
  },
  {
    headerName: t('fields.quantityMoved'),
    field: 'mvitm_qty_move'
  },
  {
    headerName: t('fields.quantityDelivered'),
    field: 'mvitm_qty_delv'
  }
];

export default columns;
