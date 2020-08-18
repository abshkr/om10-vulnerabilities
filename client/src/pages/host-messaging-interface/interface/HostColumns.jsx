import React from 'react';

const columns = (t) => [
	{
    headerName: '',
    field: 'STATUS',
    sortable: true,
    resizable: false,
		width: 20,
    suppressSizeToFit: true,
		pinned: 'left',
		tooltipValueGetter: function(params) {
			var status = params.data.STATUS;
			var desc = "";
			if (parseInt(status) == 2)
			{
				desc = "ready";
			}
			else if (parseInt(status) == 3)
			{
				desc = "rejected";
			}
			else if (parseInt(status) == 4)
			{
				desc = "error";
			}
			else
			{
				desc = "processing";
			}
			return desc;
		},
  	cellStyle: function(params) {
			//console.log({ "params": params });
			var status = params.data.STATUS;

			var color = "";
			if (parseInt(status) == 2)
			{
				color = "yellow";
			}
			else if (parseInt(status) == 3)
			{
				color = "coral";
			}
			else if (parseInt(status) == 4)
			{
				color = "#FF3900";
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
    headerName: t('fields.rowNumber'),
    field: 'ROW_ID',
    sortable: true,
    resizable: true,
		width: 54,
    suppressSizeToFit: true,
		pinned: 'left',
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
    headerName: t('fields.message_type'),
    field: 'MESSAGE_TYPE',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
		width: 80,
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
    headerName: t('fields.status'),
    field: 'STATUS',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
		width: 80,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.messageOrigin'),
    field: 'ORIGIN',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
		width: 80,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.destination'),
    field: 'DESTINATION',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
		width: 100,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.dest_site'),
    field: 'DEST_SITE',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
		width: 80,
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
		width: 80,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.acknowledged'),
    field: 'ACKNOWLEDGED',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
		width: 80,
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
    headerName: t('fields.submitted'),
    field: 'RESUBMITTED',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
		width: 80,
    suppressSizeToFit: true
  }
];

export default columns;
