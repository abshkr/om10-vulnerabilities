import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import useSWR from 'swr';
import _ from 'lodash';

import { MOVEMENT_NOMIATIONS } from '../../../../api';

const from = ['Transfer', 'Disposal'];
const to = ['Transfer', 'Receipt'];

const useColumns = (value, selected) => {
  const [type, setType] = useState('Receipt');
  const [products, setProducts] = useState([]);

  const { t } = useTranslation();

  const { data: types } = useSWR(MOVEMENT_NOMIATIONS.TYPES, { refreshInterval: 0 });
  const { data: units } = useSWR(MOVEMENT_NOMIATIONS.UNITS, { refreshInterval: 0 });
  const { data: plants } = useSWR(MOVEMENT_NOMIATIONS.PLANTS, { refreshInterval: 0 });
  const { data: suppliers } = useSWR(MOVEMENT_NOMIATIONS.SUPPLIERS, { refreshInterval: 0 });

  const getProductsBySupplier = useCallback((name, suppliers) => {
    const supplier = _.find(suppliers || [], ['cmpy_name', name]);

    const id = supplier?.cmpy_code;

    if (id) {
      axios.get(`${MOVEMENT_NOMIATIONS.PRODUCTS}?prod_cmpy=${id}`).then(response => {
        setProducts(response.data.records);
      });
    }
  }, []);

  useEffect(() => {
    const id = selected[0]?.mvitm_prodcmpy_to;
    const payload = suppliers?.records;

    if (id && payload) {
      getProductsBySupplier(id, payload);
    }
  }, [selected, getProductsBySupplier, suppliers]);

  useEffect(() => {
    const id = selected[0]?.mvitm_prodcmpy_from;
    const payload = suppliers?.records;

    if (id && payload) {
      getProductsBySupplier(id, payload);
    }
  }, [selected, getProductsBySupplier, suppliers]);

  useEffect(() => {
    const type = selected[0]?.mvitm_type_name;

    if (type) {
      setType(type);
    }
  }, [selected]);

  return [
    {
      headerName: `${t('fields.select')}`,
      field: 'mvitm_line_id',
      width: 40,
      checkboxSelection: true,
      cellRenderer: 'NullRenderer',
      suppressSizeToFit: true,
      pinned: 'left'
    },
    {
      headerName: t('fields.line'),
      field: 'mvitm_line_id',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      width: 70,
      suppressSizeToFit: true,
      pinned: 'left'
    },
    {
      headerName: t('fields.itemId'),
      field: 'mvitm_item_id',
      filter: 'MultiFilter',
      sortable: true,
      resizable: true,
      width: 90,
      suppressSizeToFit: true,
      pinned: 'left'
    },

    {
      headerName: t('fields.nominationType'),
      field: 'mvitm_type_name',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      width: 140,
      suppressSizeToFit: true,
      editable: selected[0]?.editable || !value,
      cellEditor: 'SelectEditor',
      cellEditorParams: {
        values: _.uniq(_.map(types?.records, 'movitem_type_name'))
      }
    },
    {
      headerName: t('fields.itemKey'),
      field: 'mvitm_item_key',
      sortable: true,
      resizable: true,
      width: 80,
      suppressSizeToFit: true,
      editable: selected[0]?.editable
    },
    {
      headerName: t('fields.itemStatus'),
      field: 'mvitm_status_name',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true
    },
    {
      headerName: t('fields.productQuantity'),
      field: 'mvitm_prod_qty',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
      editable: selected[0]?.editable || !value,
      cellEditor: 'NumericEditor'
    },
    {
      headerName: t('fields.productUnit'),
      field: 'mvitm_prod_unit_str',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
      editable: selected[0]?.editable || !value,
      cellEditor: 'SelectEditor',
      cellEditorParams: {
        values: _.uniq(_.map(units?.records, 'description'))
      }
    },
    {
      headerName: t('fields.fromPlant'),
      field: 'mvitm_plant_from',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
      editable: selected[0]?.editable && from.includes(type),
      cellEditor: 'SelectEditor',
      cellEditorParams: {
        values: _.uniq(_.map(plants?.records, 'cmpy_plant'))
      }
    },
    {
      headerName: t('fields.fromSupplier'),
      field: 'mvitm_prodcmpy_from',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
      editable: selected[0]?.editable && from.includes(type),
      cellEditor: 'SelectEditor',
      cellEditorParams: {
        values: _.uniq(_.map(suppliers?.records, 'cmpy_name'))
      }
    },
    {
      headerName: t('fields.fromProduct'),
      field: 'mvitm_prodname_from',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
      editable: selected[0]?.editable && from.includes(type),
      cellEditor: 'SelectEditor',
      cellEditorParams: {
        values: _.uniq(_.map(products, 'prod_name'))
      }
    },
    {
      headerName: t('fields.fromTank'),
      field: 'mvitm_tank_from',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true
    },
    {
      headerName: t('fields.fromStoreLocationCompany'),
      field: 'mvitm_shiploc_from',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true
    },
    {
      headerName: t('fields.fromDescription'),
      field: 'mvitm_shiptext_from',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true
    },
    {
      headerName: t('fields.fromSecondDescription'),
      field: 'mvitm_shiptext_from2',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true
    },
    {
      headerName: t('fields.toPlant'),
      field: 'mvitm_plant_to',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
      editable: selected[0]?.editable && to.includes(type),
      cellEditor: 'SelectEditor',
      cellEditorParams: {
        values: _.uniq(_.map(plants?.records, 'cmpy_plant'))
      }
    },
    {
      headerName: t('fields.toSupplier'),
      field: 'mvitm_prodcmpy_to',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
      editable: selected[0]?.editable && to.includes(type),
      cellEditor: 'SelectEditor',
      cellEditorParams: {
        values: _.uniq(_.map(suppliers?.records, 'cmpy_name'))
      }
    },
    {
      headerName: t('fields.toProduct'),
      field: 'mvitm_prodname_to',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
      editable: selected[0]?.editable && to.includes(type),
      cellEditor: 'SelectEditor',
      cellEditorParams: {
        values: _.uniq(_.map(products, 'prod_name'))
      }
    },
    {
      headerName: t('fields.toTank'),
      field: 'mvitm_tank_to',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true
    },
    {
      headerName: t('fields.toStoreLocationCompany'),
      field: 'mvitm_shiploc_to',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true
    },
    {
      headerName: t('fields.toDescription'),
      field: 'mvitm_shiptext_to',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true
    },
    {
      headerName: t('fields.toSecondDescription'),
      field: 'mvitm_shiptext_to2',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true
    },
    {
      headerName: t('fields.comments'),
      field: 'mvitm_comments',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
      editable: selected[0]?.editable || !value
    },
    {
      headerName: t('fields.quantityScheduled'),
      field: 'mvitm_qty_schd',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true
    },
    {
      headerName: t('fields.quantityMoved'),
      field: 'mvitm_qty_move',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
      editable: selected[0]?.editable || !value,
      cellEditor: 'NumericEditor'
    },
    {
      headerName: t('fields.quantityDelivered'),
      field: 'mvitm_qty_delv',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
      editable: selected[0]?.editable || !value,
      cellEditor: 'NumericEditor'
    }
  ];
};

export default useColumns;
