// const columns = (t, form, products, soldTo, shipTo, units, supplier) => [
const columns = (t) => [
  {
    headerName: t('fields.productCode'),
    field: 'prod_code',
    resizable: true,
    suppressSizeToFit: true,
    pinned: 'left',
    width: 125,
    dndSource: true,
  },

  {
    headerName: t('fields.productName'),
    field: 'prod_name',
    resizable: true,
    suppressSizeToFit: true,
  },
];

export default columns;
