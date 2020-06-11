import _ from 'lodash';

const columns = (t, pageState, form) => [
  {
    headerName: `${t('fields.addressAction')}`,
    field: 'ddi_action',
    width: 32,
    //checkboxSelection: true,
    cellRenderer: 'MarkRenderer',
    suppressSizeToFit: true,
    pinned: 'left'
  },
  {
    headerName: t('fields.ddiDdNumber'),
    field: 'ddi_dd_number',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 150,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddiDdSuppCode'),
    field: 'ddi_dd_supp_code',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddiDdSuppName'),
    field: 'ddi_dd_supp_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 150,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddiDdTripOrdNo'),
    field: 'ddi_dd_tripord_no',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddiDdLdType'),
    field: 'ddi_dd_ld_type',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddiDdLoadTypeName'),
    field: 'ddi_dd_load_typename',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 120,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddiLineItemNum'),
    field: 'ddi_line_item_num',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: false,
    editable: false,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddiItemCat'),
    field: 'ddi_item_cat',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: false,
    editable: true,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddiCmptNum'),
    field: 'ddi_cmpt_num',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: false,
    editable: true,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddiCmpyCode'),
    field: 'ddi_cmpy_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddiProdCmpyName'),
    field: 'ddi_prod_cmpyname',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddiProdCode'),
    field: 'ddi_prod_code',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: false,
    editable: false,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddiProdName'),
    field: 'ddi_prod_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: false,
    editable: false,
    width: 160,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddiQty'),
    field: 'ddi_qty',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: false,
    editable: true,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddiItemDesc'),
    field: 'ddi_item_desc',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: false,
    editable: true,
    width: 160,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddiUnit'),
    field: 'ddi_unit',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: false,
    editable: false,
    width: 60,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddiUnitName'),
    field: 'ddi_unit_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: false,
    editable: false,
    width: 120,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddiDutyCode'),
    field: 'ddi_duty_code',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: false,
    editable: true,
    width: 120,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddiExciseLicNum'),
    field: 'ddi_excise_lic_num',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: false,
    editable: true,
    width: 120,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddiRefDocNum'),
    field: 'ddi_ref_doc_num',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: false,
    editable: true,
    width: 150,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddiSiteCapacity'),
    field: 'ddi_site_capacity',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: false,
    editable: true,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddiTankCode'),
    field: 'ddi_tank_code',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: false,
    editable: true,
    width: 100,
    suppressSizeToFit: true,
  },
];

export default columns;