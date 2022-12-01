const columns = (t) => [
  {
    headerName: t('fields.dateTime'),
    field: 'gen_date',
    sortable: true,
    resizable: true,
    cellRenderer: 'DateRenderer',
    width: 150,
    suppressSizeToFit: true,
    comparator: (valueA, valueB, nodeA, nodeB, isInverted) => {
      return 0;
    },
  },
  {
    headerName: t('fields.category'),
    field: 'msg_class',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true,
    comparator: (valueA, valueB, nodeA, nodeB, isInverted) => {
      return 0;
    },
  },
  {
    headerName: t('fields.event'),
    field: 'msg_event',
    sortable: true,

    resizable: true,
    width: 100,
    suppressSizeToFit: true,
    comparator: (valueA, valueB, nodeA, nodeB, isInverted) => {
      return 0;
    },
  },
  {
    headerName: t('fields.details'),
    field: 'message',
    // tooltipField: 'message',
    sortable: true,
    resizable: true,
    comparator: (valueA, valueB, nodeA, nodeB, isInverted) => {
      return 0;
    },
    cellRenderer: 'TipTextRenderer',
    cellRendererParams: {
      // tip: 'TOOLTIP',
      tip: 'POPOVER',
    },
  },
];

export default columns;
