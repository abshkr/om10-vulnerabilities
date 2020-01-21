import _ from 'lodash';

const columns = (configuration, t) => {
  const fields = [
    {
      headerName: t('fields.code'),
      field: 'tank_code',
      sortable: true,
      resizable: true,
      filter: 'FuzzyFilter'
    },
    {
      headerName: t('fields.name'),
      field: 'tank_name',
      sortable: true,
      resizable: true,
      filter: 'FuzzyFilter'
    },
    {
      headerName: t('fields.baseProductCode'),
      field: 'tank_base',
      sortable: true,
      resizable: true,
      filter: 'FuzzyFilter'
    },
    {
      headerName: t('fields.baseProductName'),
      field: 'tank_base_name',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter'
    },
    {
      headerName: t('fields.productCategory'),
      field: 'tank_bclass_name',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter'
    },
    {
      headerName: `${t('fields.density')} (${t('units.kgm3')})`,
      field: 'tank_density',
      sortable: true,
      resizable: true
    },
    {
      headerName: `${t('fields.dailyVarianceLimit')} (${t('units.volume')})`,
      field: 'tank_dtol_volume',
      sortable: true,
      resizable: true
    },
    {
      headerName: `${t('fields.dailyVarianceLimit')} (%)`,
      field: 'tank_dtol_percent',
      sortable: true,
      resizable: true
    },
    {
      headerName: `${t('fields.monthlyVarianceLimit')} (${t('units.kgm3')})`,
      field: 'tank_mtol_volume',
      sortable: true,
      resizable: true
    },
    {
      headerName: `${t('fields.monthlyVarianceLimit')} (%)`,
      field: 'tank_mtol_percent',
      sortable: true,
      resizable: true
    },
    {
      headerName: t('fields.adaptiveArmPriority'),
      field: 'tank_afc_priority',
      sortable: true,
      resizable: true
    },

    {
      headerName: t('fields.flowRate'),
      field: 'tank_max_flow',
      sortable: true,
      resizable: true
    }
  ];

  const omitted = [];

  if (!configuration?.features?.adaptiveFlowControl) {
    omitted.push('tank_afc_priority', 'tank_max_flow');
  }

  const payload = _.reject(fields, field => {
    return omitted.includes(field.field);
  });

  return payload;
};

export default columns;
