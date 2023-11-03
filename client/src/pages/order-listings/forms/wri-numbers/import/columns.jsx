const columns = (t) => [
  {
    headerName: t('fields.wriNumber'),
    field: 'wri_number',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 180,
    suppressSizeToFit: true,
    hide: false,
  },
  {
    headerName: t('fields.wriIdStatus'),
    // field: 'id_status_desc',
    field: 'id_status',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    width: 130,
    suppressSizeToFit: true,
    hide: false,
  },
  {
    headerName: t('fields.wriProducerName'),
    field: 'producer_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 300,
    suppressSizeToFit: true,
    hide: false,
  },
  {
    headerName: t('fields.wriPickupLocation'),
    field: 'pickup_location',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 300,
    suppressSizeToFit: true,
    hide: false,
  },
  {
    headerName: t('fields.wriWasteClassification'),
    field: 'waste_classification',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 190,
    suppressSizeToFit: true,
    hide: false,
  },
  {
    headerName: t('fields.wriVehicleRegistration'),
    field: 'vehicle_registration',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 190,
    suppressSizeToFit: true,
    hide: false,
  },
];

export default columns;
