const columns = (t, values, form) => [
  {
    headerName: t('fields.status'),
    field: 'status',
    filter: 'BooleanFilter',
    sortable: true,
    resizable: true,
    width: 90,
    cellRenderer: 'SwitchRender',
  },
  {
    headerName: t('fields.templateName'),
    field: 'template_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 150,
  },
  {
    headerName: t('fields.locale'),
    field: 'locale',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 90,
  },
  {
    headerName: t('fields.templateType'),
    field: 'template_type_desc',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 110,
  },
  {
    headerName: t('fields.defaultTemplate'),
    field: 'default_flag',
    filter: 'BooleanFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'SwitchRender',
    width: 120,
  },
  {
    headerName: t('fields.numOfCopies'),
    field: 'copies',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 110,
  },
  {
    headerName: t('fields.footerText'),
    field: 'footers',
    filter: 'FuzzyFilter',
    cellEditor: 'FooterEditor',
    sortable: true,
    resizable: true,
    editable: true,
    cellEditorParams: {
      form: form,
    },
    width: 120,
  },
  {
    headerName: t('fields.email'),
    field: 'email',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: true,
    valueParser: (params) => {
      const regEx = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      const result = params.newValue.replace(/\s/g, "").split(/:|;/);   
      for(let i = 0; i < result.length; i++) {
          
        if(!regEx.test(result[i])) {
          return params.oldValue;
        }
      }

      return params.newValue;
    }
  },
  {
    headerName: t('fields.print'),
    field: 'send_to_printer',
    filter: 'BooleanFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'SwitchRender',
    width: 80,
  },
];

export default columns;
