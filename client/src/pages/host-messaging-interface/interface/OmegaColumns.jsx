import React from 'react';

const columns = (t) => [
	{
    headerName: '',
    field: 'VALIDITY',
    sortable: true,
    resizable: false,
		width: 20,
    suppressSizeToFit: true,
		pinned: 'left',
  	cellStyle: function(params) {
			//console.log({ "params": params });
			var valid = params.data.VALIDITY;

			var color = "";
			if (valid == 'Y')
			{
				color = "lightgreen";
			}
			else if (valid == 'N')
			{
				color = "coral";
			}
			else
			{
				color = "white";
			}

			return {
				background: color,
				color: color
			};
		}
  },
  {
    headerName: t('fields.message_id'),
    field: 'MESSAGE_ID',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
		width: 126,
    suppressSizeToFit: true,
		pinned: 'left'
  },
  {
    headerName: t('fields.recv_time'),
    field: 'RECV_TIME',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
		width: 160,
    suppressSizeToFit: true,
		pinned: 'left',
    cellRenderer: 'DateRenderer'
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
    headerName: t('fields.destination'),
    field: 'DESTINATION',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.rec_id'),
    field: 'REC_ID',
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
    headerName: t('fields.related_in_msg_id'),
    field: 'RELATED_IN_MSG_ID',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.transfer_time'),
    field: 'TRANSFER_TIME',
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
