import { PRODUCT_GROUPS } from '../../api';

const columns = (endpoint, t) => {
  if (endpoint === PRODUCT_GROUPS.READ_GROUPS) {
    return [
      {
        headerName: t('fields.code'),
        field: 'pgr_code',
        filter: 'FuzzyFilter',
        sortable: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: t('fields.name'),
        field: 'pgr_description',
        filter: 'FuzzyFilter',
        sortable: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: t('fields.unitId'),
        field: 'pgr_unit',
        filter: 'FuzzyFilter',
        sortable: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: t('fields.unit'),
        field: 'pgr_unitname',
        filter: 'FuzzyFilter',
        sortable: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: t('fields.numberOfDrawerProducts'),
        field: 'products_amount',
        filter: 'FuzzyFilter',
        sortable: true,
        resizable: true,
      },
    ];
  } else if (endpoint === PRODUCT_GROUPS.READ_MESSAGES) {
    return [
      {
        headerName: t('fields.messageId'),
        field: 'cm_msg_id',
        filter: 'FuzzyFilter',
        sortable: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: t('fields.messageName'),
        field: 'cm_msg_name',
        filter: 'FuzzyFilter',
        sortable: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: t('fields.requireWholeLoadToBeCompliant'),
        field: 'cm_req_whole_ld',
        filter: 'BooleanFilter',
        sortable: true,
        resizable: true,
        cellRenderer: 'BooleanRenderer',
        suppressSizeToFit: true,
      },
      {
        headerName: t('fields.messageDetails'),
        field: 'cm_msg',
        filter: 'FuzzyFilter',
        sortable: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: t('fields.messageLocaleCode'),
        field: 'cm_locale',
        filter: 'FuzzyFilter',
        sortable: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: t('fields.messageLocale'),
        field: 'locale_name',
        filter: 'FuzzyFilter',
        sortable: true,
        resizable: true,
      },
    ];
  } else if (endpoint === PRODUCT_GROUPS.READ_MESSAGE_GROUPS) {
    return [
      {
        headerName: t('fields.productGroupCode'),
        field: 'cpm_pgr_code',
        filter: 'FuzzyFilter',
        sortable: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: t('fields.productGroupDescription'),
        field: 'cpm_group_desc',
        filter: 'FuzzyFilter',
        sortable: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: t('fields.messageId'),
        field: 'cpm_msg_id',
        filter: 'FuzzyFilter',
        sortable: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: t('fields.messageName'),
        field: 'cm_msg_name',
        filter: 'FuzzyFilter',
        sortable: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: t('fields.requireWholeLoadToBeCompliant'),
        field: 'cm_req_whole_ld',
        filter: 'BooleanFilter',
        sortable: true,
        resizable: true,
        cellRenderer: 'BooleanRenderer',
        suppressSizeToFit: true,
      },

      {
        headerName: t('fields.messageDetails'),
        field: 'cm_msg',
        filter: 'FuzzyFilter',
        sortable: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: t('fields.messageLocaleCode'),
        field: 'cm_locale',
        filter: 'FuzzyFilter',
        sortable: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: t('fields.messageLocale'),
        field: 'locale_name',
        filter: 'FuzzyFilter',
        sortable: true,
        resizable: true,
      },
    ];
  } else {
    return [];
  }
};

export default columns;
