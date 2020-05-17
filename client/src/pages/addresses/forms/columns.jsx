const columns = (t) => [
    {
      headerName: t('fields.addressAction'),
      field: 'address_action'
    },
    {
      headerName: t('fields.addressLineCode'),
      field: 'db_addr_line_id'
    },
    {
      headerName: t('fields.addressLineNo'),
      field: 'db_addrline_no'
    },
    {
      headerName: t('fields.addressLineType'),
      field: 'db_addr_line_type'
    },
    {
      headerName: t('fields.addressLineTypeName'),
      field: 'db_addr_line_typename'
    },
    {
      headerName: t('fields.addressLineText'),
      field: 'db_addr_line'
    }
  ];
  
  export default columns;
  