const SupplierRender = (data, typeColumn, typeValue, supplierColumn, ownerColumn) => {
  const type = data?.[typeColumn];

  let supplier = data?.[supplierColumn];
  if (
    (type === typeValue || typeValue.indexOf(type) >= 0) &&
    data.hasOwnProperty(ownerColumn) &&
    !!data?.[ownerColumn]
  ) {
    supplier = data?.[ownerColumn];
  }

  return supplier;
};

export default SupplierRender;
