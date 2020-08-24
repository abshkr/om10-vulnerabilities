const cells = (t) => [
    {
      code: 'ddi_dd_number',
      label: t('fields.ddiDdNumber'),
      dataType: 'STRING',
      maxLength: 40,
      editable: false,
      required: true,
      precision: null,
      min: null,
      max: null,
    }, 
    {
      code: 'ddi_dd_supp_code',
      label: t('fields.ddiDdSuppName'),
      dataType: 'STRING',
      maxLength: 16,
      editable: false,
      required: true,
      precision: null,
      min: null,
      max: null,
    }, 
    {
      code: 'ddi_dd_tripord_no',
      label: t('fields.ddiDdTripOrdNo'),
      dataType: 'NUMBER',
      maxLength: 9,
      editable: false,
      required: true,
      precision: 0,
      min: 0,
      max: 999999999,
    }, 
    {
      code: 'ddi_dd_ld_type',
      label: t('fields.ddiDdLoadTypeName'),
      dataType: 'NUMBER',
      maxLength: 2,
      editable: false,
      required: true,
      precision: 0,
      min: 0,
      max: 99,
    }, 
    {
      code: 'ddi_line_item_num',
      label: t('fields.ddiLineItemNum'),
      dataType: 'NUMBER',
      maxLength: 6,
      editable: false,
      required: true,
      precision: 0,
      min: 0,
      max: 999999,
    }, 
    {
      code: 'ddi_item_cat',
      label: t('fields.ddiItemCat'),
      dataType: 'NUMBER',
      maxLength: 4,
      editable: true,
      required: false,
      precision: 0,
      min: 0,
      max: 9999,
    }, 
    {
      code: 'ddi_cmpt_num',
      label: t('fields.ddiCmptNum'),
      dataType: 'NUMBER',
      maxLength: 2,
      editable: true,
      required: false,
      precision: 0,
      min: 0,
      max: 99,
    }, 
    {
      code: 'ddi_prod_code',
      label: t('fields.ddiProdCode'),
      dataType: 'STRING',
      maxLength: 36,
      editable: false,
      required: true,
      precision: null,
      min: null,
      max: null,
    }, 
    {
      code: 'ddi_cmpy_code',
      label: t('fields.ddiCmpyCode'),
      dataType: 'STRING',
      maxLength: 16,
      editable: false,
      required: true,
      precision: null,
      min: null,
      max: null,
    }, 
    {
      code: 'ddi_qty',
      label: t('fields.ddiQty'),
      dataType: 'NUMBER',
      maxLength: 9,
      editable: true,
      required: true,
      precision: 0,
      min: 0,
      max: 999999999,
    }, 
    {
      code: 'ddi_unit',
      label: t('fields.ddiUnit'),
      dataType: 'NUMBER',
      maxLength: 2,
      editable: false,
      required: true,
      precision: 0,
      min: 0,
      max: 99,
    }, 
    {
      code: 'ddi_item_desc',
      label: t('fields.ddiItemDesc'),
      dataType: 'STRING',
      maxLength: 300,
      editable: true,
      required: false,
      precision: null,
      min: null,
      max: null,
    }, 
    {
      code: 'ddi_duty_code',
      label: t('fields.ddiDutyCode'),
      dataType: 'STRING',
      maxLength: 20,
      editable: true,
      required: false,
      precision: null,
      min: null,
      max: null,
    }, 
    {
      code: 'ddi_excise_lic_num',
      label: t('fields.ddiExciseLicNum'),
      dataType: 'NUMBER',
      maxLength: 15,
      editable: true,
      required: false,
      precision: 0,
      min: 0,
      max: 999999999999999,
    }, 
    {
      code: 'ddi_ref_doc_num',
      label: t('fields.ddiRefDocNum'),
      dataType: 'NUMBER',
      maxLength: 10,
      editable: true,
      required: false,
      precision: 0,
      min: 0,
      max: 9999999999,
    }, 
    {
      code: 'ddi_site_capacity',
      label: t('fields.ddiSiteCapacity'),
      dataType: 'NUMBER',
      maxLength: 10,
      editable: true,
      required: false,
      precision: 0,
      min: 0,
      max: 9999999999,
    }, 
    {
      code: 'ddi_tank_code',
      label: t('fields.ddiTankCode'),
      dataType: 'STRING',
      maxLength: 20,
      editable: true,
      required: false,
      precision: null,
      min: null,
      max: null,
    }, 
];

export default cells;