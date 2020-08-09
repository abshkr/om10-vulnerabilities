import React from 'react';

const columns = (t) => [
	{
    headerName: t('fields.rowNumber'),
    field: 'ROW_ID',
    sortable: true,
    resizable: true,
		width: 54,
    suppressSizeToFit: true,
		pinned: 'left'
	},
  {
    headerName: t('fields.submittedFile'),
    field: 'RESUBMITTED_FILE',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.sourceFile'),
    field: 'SOURCE_FILE',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.sourceRecId'),
    field: 'SOURCE_REC_ID',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true
  }
];

export default columns;
