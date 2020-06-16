const columns = (t) => [
  {
    headerName: t('fields.rec_id'),
    field: 'REC_ID',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true
  },

  {
    headerName: t('fields.origin'),
    field: 'ORIGIN',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true
  },

  {
    headerName: t('fields.message_id'),
    field: 'MESSAGE_ID',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.recv_time'),
    field: 'RECV_TIME',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    cellRenderer: 'DateRenderer'
  },
  {
    headerName: t('fields.destination'),
    field: 'DESTINATION',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.dest_site'),
    field: 'DEST_SITE',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.message_type'),
    field: 'MESSAGE_TYPE',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.file_name'),
    field: 'FILE_NAME',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.file_format'),
    field: 'FILE_FORMAT',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true
  },

  {
    headerName: t('fields.validity'),
    field: 'VALIDITY',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.status'),
    field: 'STATUS',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.status_description'),
    field: 'STATUS_DESCRIPTION',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.acknowledged'),
    field: 'ACKNOWLEDGED',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.ack_id'),
    field: 'ACK_ID',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.archived_file'),
    field: 'ARCHIVED_FILE',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.transferred_file'),
    field: 'TRANSFERRED_FILE',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.resubmitted'),
    field: 'RESUBMITTED',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true
  }
];

export default columns;
