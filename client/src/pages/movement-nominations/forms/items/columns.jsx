import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useSWR from 'swr';
import _ from 'lodash';

import { MOVEMENT_NOMIATIONS } from '../../../../api';

const groupAll = [2, 1]; // this setting is for mvitm_tank_from only
const groupFrom = [2, 1];
const groupTo = [2, 0];
//const from = ['Transfer', 'Disposal'];
//const to = ['Transfer', 'Receipt'];

const useColumns = (value, selected, config) => {
  //console.log('i am here', value, selected);

  //const [type, setType] = useState('Receipt');
  const [type, setType] = useState(0);
  const [plantsFrom, setPlantsFrom] = useState([]);
  const [plantsTo, setPlantsTo] = useState([]);
  const [suppliersFrom, setSuppliersFrom] = useState([]);
  const [suppliersTo, setSuppliersTo] = useState([]);
  const [productsFrom, setProductsFrom] = useState([]);
  const [productsTo, setProductsTo] = useState([]);
  const [tanksFrom, setTanksFrom] = useState([]);
  const [tanksTo, setTanksTo] = useState([]);

  const { t } = useTranslation();

  const { data: types } = useSWR(MOVEMENT_NOMIATIONS.TYPES, { revalidateOnFocus: false });
  const { data: units } = useSWR(MOVEMENT_NOMIATIONS.UNITS, { revalidateOnFocus: false });
  const { data: plants } = useSWR(MOVEMENT_NOMIATIONS.PLANTS, { revalidateOnFocus: false });
  const { data: suppliers } = useSWR(MOVEMENT_NOMIATIONS.SUPPLIERS, { revalidateOnFocus: false });
  const { data: products } = useSWR(MOVEMENT_NOMIATIONS.NOM_PRODUCTS, { revalidateOnFocus: false });
  const { data: tanks } = useSWR(MOVEMENT_NOMIATIONS.NOM_TANKS, { revalidateOnFocus: false });
  /* const { data: productsFrom } = useSWR(MOVEMENT_NOMIATIONS.NOM_PRODUCTS, { refreshInterval: 0 });
  const { data: tanksFrom } = useSWR(MOVEMENT_NOMIATIONS.NOM_TANKS, { refreshInterval: 0 });
  const { data: productsTo } = useSWR(MOVEMENT_NOMIATIONS.NOM_PRODUCTS, { refreshInterval: 0 });
  const { data: tanksTo } = useSWR(MOVEMENT_NOMIATIONS.NOM_TANKS, { refreshInterval: 0 }); */

  useEffect(() => {
    //if (!!products) {
    //console.log('useEffect, setProducts...', products);
    setProductsFrom(products);
    setProductsTo(products);
    //}
  }, [products, setProductsFrom, setProductsTo]);

  useEffect(() => {
    //if (!!tanks) {
    //console.log('useEffect, setTanks...', tanks);
    setTanksFrom(tanks);
    setTanksTo(tanks);
    //}
  }, [tanks, setTanksFrom, setTanksTo]);

  useEffect(() => {
    //console.log('useEffect, setPlants...', plants);
    setPlantsFrom(plants);
    setPlantsTo(plants);
  }, [plants, setPlantsFrom, setPlantsTo]);

  useEffect(() => {
    console.log('useEffect, setSuppliers...', suppliers);
    setSuppliersFrom(suppliers);
    setSuppliersTo(suppliers);
  }, [suppliers, setSuppliersFrom, setSuppliersTo]);

  /*
  const getProductsFromBySupplier = useCallback((supplier) => {
    if (supplier) {
      axios.get(`${MOVEMENT_NOMIATIONS.PRODUCTS}?prod_cmpy=${supplier}`).then((response) => {
        setProductsFrom(response.data.records);
      });
    }
  }, []);

  const getProductsToBySupplier = useCallback((supplier) => {
    if (supplier) {
      axios.get(`${MOVEMENT_NOMIATIONS.PRODUCTS}?prod_cmpy=${supplier}`).then((response) => {
        setProductsTo(response.data.records);
      });
    }
  }, []);

  const getTanksFromByProduct = useCallback((supplier, product) => {
    if (supplier && product) {
      axios.get(`${MOVEMENT_NOMIATIONS.TANKS_BY_DRAWPROD}?supplier=${supplier}&product=${product}`).then((response) => {
        setTanksFrom(response.data.records);
      });
    }
  }, []);

  const getTanksToByProduct = useCallback((supplier, product) => {
    if (supplier && product) {
      axios.get(`${MOVEMENT_NOMIATIONS.TANKS_BY_DRAWPROD}?supplier=${supplier}&product=${product}`).then((response) => {
        setTanksTo(response.data.records);
      });
    }
  }, []);

  useEffect(() => {
    const id = selected?.[0]?.mvitm_prodcmpy_from;

    if (id) {
      console.log("useEffect, getProductsFromBySupplier", id);
      getProductsFromBySupplier(id);
    }
  }, [selected, getProductsFromBySupplier]);

  useEffect(() => {
    const id = selected?.[0]?.mvitm_prodcmpy_to;

    if (id) {
      console.log("useEffect, getProductsToBySupplier", id);
      getProductsToBySupplier(id);
    }
  }, [selected, getProductsToBySupplier]);

  useEffect(() => {
    const supplier = selected?.[0]?.mvitm_prodcmpy_from;
    const product = selected?.[0]?.mvitm_prodcode_from;

    if (supplier && product) {
      console.log("useEffect, getTanksFromByProduct", supplier, product);
      getTanksFromByProduct(supplier, product);
    }
  }, [selected, getTanksFromByProduct]);

  useEffect(() => {
    const supplier = selected?.[0]?.mvitm_prodcmpy_to;
    const product = selected?.[0]?.mvitm_prodcode_to;

    if (supplier && product) {
      console.log("useEffect, getTanksToByProduct", supplier, product);
      getTanksToByProduct(supplier, product);
    }
  }, [selected, getTanksToByProduct]);
*/
  useEffect(() => {
    const value = selected?.[0]?.mvitm_type;

    console.log('before type', type, value);
    if (value) {
      setType(_.toNumber(value));
    }
    console.log('after type', type);
  }, [selected, setType]);

  return [
    {
      // headerName: `${t('fields.select')}`,
      headerName: '',
      field: 'mvitm_line_id',
      width: 40,
      checkboxSelection: true,
      cellRenderer: 'NullRenderer',
      suppressSizeToFit: true,
      pinned: 'left',
    },
    {
      headerName: t('fields.line'),
      field: 'mvitm_line_id',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      width: 70,
      suppressSizeToFit: true,
      pinned: 'left',
    },
    {
      headerName: t('fields.nominationKey'),
      field: 'mvitm_key',
      sortable: true,
      resizable: true,
      width: 70,
      suppressSizeToFit: true,
      hide: true,
    },
    {
      headerName: t('fields.terminal'),
      field: 'mvitm_terminal',
      sortable: true,
      resizable: true,
      width: 70,
      suppressSizeToFit: true,
      hide: true,
    },
    {
      headerName: t('fields.itemId'),
      field: 'mvitm_item_id',
      filter: 'MultiFilter',
      sortable: true,
      resizable: true,
      width: 90,
      suppressSizeToFit: true,
      pinned: 'left',
    },
    {
      headerName: t('fields.itemLock'),
      field: 'mvitm_completed',
      filter: 'BooleanFilter',
      sortable: true,
      resizable: true,
      width: 130,
      suppressSizeToFit: true,
      pinned: 'left',
      cellRenderer: 'LockRenderer',
    },

    {
      headerName: t('fields.nominationType'),
      field: 'mvitm_type',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      width: 170,
      suppressSizeToFit: true,
      editable: selected?.[0]?.editable || !value,
      cellClass: selected?.[0]?.editable ? 'selected-editable-ag-grid-cell' : '',
      cellRenderer: 'ListRenderer',
      cellRendererParams: {
        values: _.uniq(
          _.map(types?.records, (item) => {
            return { code: _.toNumber(item.movitem_type_id), name: item.movitem_type_name };
          })
        ),
      },
      cellEditor: 'ListEditor',
      cellEditorParams: {
        values: _.uniq(
          _.map(types?.records, (item) => {
            return { code: _.toNumber(item.movitem_type_id), name: item.movitem_type_name };
          })
        ),
      },
    },
    {
      headerName: t('fields.itemKey'),
      field: 'mvitm_item_key',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
      editable: selected?.[0]?.editable,
      cellClass: 'selected-editable-ag-grid-cell', //selected?.[0]?.editable || !value,
    },
    {
      headerName: t('fields.itemStatus'),
      field: 'mvitm_status_name',
      sortable: true,
      resizable: true,
      width: 120,
      suppressSizeToFit: true,
    },
    {
      headerName: t('fields.quantity'),
      field: 'mvitm_prod_qty',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      width: 110,
      suppressSizeToFit: true,
      cellRenderer: 'QuantityRenderer',
      cellRendererParams: {
        digits: '0',
        min: '100',
      },
      editable: true,
      cellClass: 'editable-ag-grid-cell', //selected?.[0]?.editable || !value,
      cellEditor: 'NumericEditor',
      cellEditorParams: {
        ranges: {
          max: 999999999,
          min: 0,
        },
        t,
      },
    },
    {
      headerName: t('fields.productUnit'),
      //field: 'mvitm_prod_unit_str',
      field: 'mvitm_prod_unit',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
      editable: selected?.[0]?.editable || !value,
      cellClass: selected?.[0]?.editable ? 'selected-editable-ag-grid-cell' : '',
      cellRenderer: 'ListRenderer',
      cellRendererParams: {
        values: _.uniq(
          _.map(units?.records, (item) => {
            return { code: _.toNumber(item.unit_id), name: item.description };
          })
        ),
      },
      cellEditor: 'ListEditor',
      cellEditorParams: {
        values: _.uniq(
          _.map(units?.records, (item) => {
            return { code: _.toNumber(item.unit_id), name: item.description };
          })
        ),
      },
    },
    {
      headerName: t('fields.fromPlant'),
      field: 'mvitm_plant_from',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
      editable: selected?.[0]?.editable && groupFrom.includes(selected?.[0]?.mvitm_type),

      cellClass:
        selected?.[0]?.editable && groupFrom.includes(selected?.[0]?.mvitm_type)
          ? 'selected-editable-ag-grid-cell'
          : '',
      cellEditor: 'SelectEditor',
      cellEditorParams: {
        values: _.uniq(_.map(plantsFrom?.records, 'cmpy_plant')),
      },
    },
    {
      headerName: t('fields.fromSupplier'),
      field: 'mvitm_prodcmpy_from',
      sortable: true,
      resizable: true,
      width: 150,
      suppressSizeToFit: true,
      editable: selected?.[0]?.editable && groupFrom.includes(selected?.[0]?.mvitm_type),

      cellClass:
        selected?.[0]?.editable && groupFrom.includes(selected?.[0]?.mvitm_type)
          ? 'selected-editable-ag-grid-cell'
          : '',

      cellRenderer: 'ListRenderer',
      cellRendererParams: {
        values: _.uniq(
          _.map(suppliersFrom?.records, (item) => {
            return { code: item.cmpy_code, name: item.cmpy_code + ' - ' + item.cmpy_name };
          })
        ),
      },
      cellEditor: 'ListEditor',
      cellEditorParams: {
        values: _.uniq(
          _.map(suppliersFrom?.records, (item) => {
            return { code: item.cmpy_code, name: item.cmpy_code + ' - ' + item.cmpy_name };
          })
        ),
      },
    },
    {
      headerName: t('fields.fromProduct'),
      field: 'mvitm_prodcode_from',
      sortable: true,
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
      editable: selected?.[0]?.editable && groupFrom.includes(selected?.[0]?.mvitm_type),

      cellClass:
        selected?.[0]?.editable && groupFrom.includes(selected?.[0]?.mvitm_type)
          ? 'selected-editable-ag-grid-cell'
          : '',

      /* cellRenderer: 'ListRenderer',
      cellRendererParams: {
        values: _.uniq(
          _.map(productsFrom?.records, (item) => {
            return { code: item.prod_code, name: item.prod_code + ' - ' + item.prod_name };
          })
        ),
      }, */

      cellRenderer: 'PowerListRenderer',
      cellRendererParams: {
        values: _.uniq(productsFrom?.records),
        codes: ['prod_cmpy', 'prod_code'],
        names: ['prod_code', 'prod_name'],
        columns: ['mvitm_prodcmpy_from', 'mvitm_prodcode_from'],
      },

      /* cellEditor: 'PowerListEditor',
      cellEditorParams: {
        values: _.uniq(productsFrom?.records),
        pcodes: ['prod_cmpy'],
        names: ['prod_code', 'prod_name'],
        pcolumns: ['mvitm_prodcmpy_from'],
        ccodes: ['prod_code'],
        ccolumns: ['mvitm_prodcode_from'],
      }, */

      cellEditor: 'ListEditor',
      cellEditorParams: {
        values: _.uniq(
          _.map(
            productsFrom?.records?.filter((item) => item.prod_cmpy === selected?.[0]?.mvitm_prodcmpy_from),
            (item) => {
              return { code: item.prod_code, name: item.prod_code + ' - ' + item.prod_name };
            }
          )
        ),
      },
    },
    {
      headerName: t('fields.fromProduct'),
      field: 'mvitm_prodname_from',
      sortable: true,
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
      editable: false,
      hide: true,
    },
    {
      headerName: t('fields.fromTank'),
      field: 'mvitm_tank_from',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
      editable: selected?.[0]?.editable && groupAll.includes(selected?.[0]?.mvitm_type),

      cellClass:
        selected?.[0]?.editable && groupAll.includes(selected?.[0]?.mvitm_type)
          ? 'selected-editable-ag-grid-cell'
          : '',

      cellRenderer: 'ListRenderer',
      cellRendererParams: {
        values: _.uniq(
          _.map(tanksFrom?.records, (item) => {
            return { code: item.tank_code, name: item.tank_code + ' - ' + item.tank_name };
          })
          /* _.map(
            tanksFrom?.records?.filter(
              (item) =>
                item.prod_cmpy === selected?.[0]?.mvitm_prodcmpy_from &&
                item.prod_code === selected?.[0]?.mvitm_prodcode_from
            ),
            (item) => {
              return { 
                code: item.tank_code, 
                // name: item.tank_code, 
                // name: item.tank_code + ' - ' + item.tank_name + ' [' + item.base_code + ' - ' + item.base_name + ']'
                name: item.tank_code + ' - ' + item.tank_name
              };
            }
          ) */
        ),
      },
      cellEditor: 'ListEditor',
      cellEditorParams: {
        values: _.uniq(
          _.map(
            tanksFrom?.records?.filter(
              (item) =>
                item.prod_cmpy === selected?.[0]?.mvitm_prodcmpy_from &&
                item.prod_code === selected?.[0]?.mvitm_prodcode_from
            ),
            (item) => {
              return {
                code: item.tank_code,
                // name: item.tank_code,
                // name: item.tank_code + ' - ' + item.tank_name + ' [' + item.base_code + ' - ' + item.base_name + ']'
                name: item.tank_code + ' - ' + item.tank_name,
              };
            }
          )
        ),
      },
    },
    {
      headerName: t('fields.fromStoreLocationCompany'),
      field: 'mvitm_shiploc_from',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
    },
    {
      headerName: t('fields.fromDescription'),
      field: 'mvitm_shiptext_from',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
    },
    {
      headerName: t('fields.fromSecondDescription'),
      field: 'mvitm_shiptext_from2',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
    },
    {
      headerName: t('fields.toPlant'),
      field: 'mvitm_plant_to',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
      editable: selected?.[0]?.editable && groupTo.includes(selected?.[0]?.mvitm_type),

      cellClass:
        selected?.[0]?.editable && groupTo.includes(selected?.[0]?.mvitm_type)
          ? 'selected-editable-ag-grid-cell'
          : '',

      cellEditor: 'SelectEditor',
      cellEditorParams: {
        values: _.uniq(_.map(plantsTo?.records, 'cmpy_plant')),
      },
    },
    {
      headerName: t('fields.toSupplier'),
      field: 'mvitm_prodcmpy_to',
      sortable: true,
      resizable: true,
      width: 150,
      suppressSizeToFit: true,
      editable: selected?.[0]?.editable && groupTo.includes(selected?.[0]?.mvitm_type),

      cellClass:
        selected?.[0]?.editable && groupTo.includes(selected?.[0]?.mvitm_type)
          ? 'selected-editable-ag-grid-cell'
          : '',

      cellRenderer: 'ListRenderer',
      cellRendererParams: {
        values: _.uniq(
          _.map(suppliersTo?.records, (item) => {
            return { code: item.cmpy_code, name: item.cmpy_code + ' - ' + item.cmpy_name };
          })
        ),
      },
      cellEditor: 'ListEditor',
      cellEditorParams: {
        values: _.uniq(
          _.map(suppliersTo?.records, (item) => {
            return { code: item.cmpy_code, name: item.cmpy_code + ' - ' + item.cmpy_name };
          })
        ),
      },
    },
    {
      headerName: t('fields.toProduct'),
      field: 'mvitm_prodcode_to',
      sortable: true,
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
      editable: selected?.[0]?.editable && groupTo.includes(selected?.[0]?.mvitm_type),

      cellClass:
        selected?.[0]?.editable && groupTo.includes(selected?.[0]?.mvitm_type)
          ? 'selected-editable-ag-grid-cell'
          : '',

      /* cellRenderer: 'ListRenderer',
      cellRendererParams: {
        values: _.uniq(
          _.map(productsTo?.records, (item) => {
            return { code: item.prod_code, name: item.prod_code + ' - ' + item.prod_name };
          })
        ),
      }, */

      cellRenderer: 'PowerListRenderer',
      cellRendererParams: {
        values: _.uniq(productsTo?.records),
        codes: ['prod_cmpy', 'prod_code'],
        names: ['prod_code', 'prod_name'],
        columns: ['mvitm_prodcmpy_to', 'mvitm_prodcode_to'],
      },

      /* cellEditor: 'PowerListEditor',
      cellEditorParams: {
        values: _.uniq(productsTo?.records),
        pcodes: ['prod_cmpy'],
        names: ['prod_code', 'prod_name'],
        pcolumns: ['mvitm_prodcmpy_to'],
        ccodes: ['prod_code'],
        ccolumns: ['mvitm_prodcode_to'],
      }, */

      cellEditor: 'ListEditor',
      cellEditorParams: {
        values: _.uniq(
          _.map(
            productsTo?.records?.filter((item) => item.prod_cmpy === selected?.[0]?.mvitm_prodcmpy_to),
            (item) => {
              return { code: item.prod_code, name: item.prod_code + ' - ' + item.prod_name };
            }
          )
        ),
      },
    },
    {
      headerName: t('fields.toProduct'),
      field: 'mvitm_prodname_to',
      sortable: true,
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
      editable: false,
      hide: true,
    },
    {
      headerName: t('fields.toTank'),
      field: 'mvitm_tank_to',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
      editable: selected?.[0]?.editable && groupTo.includes(selected?.[0]?.mvitm_type),

      cellClass:
        selected?.[0]?.editable && groupTo.includes(selected?.[0]?.mvitm_type)
          ? 'selected-editable-ag-grid-cell'
          : '',

      cellRenderer: 'ListRenderer',
      cellRendererParams: {
        values: _.uniq(
          _.map(tanksTo?.records, (item) => {
            return { code: item.tank_code, name: item.tank_code + ' - ' + item.tank_name };
          })
          /* _.map(
            tanksTo?.records?.filter(
              (item) =>
                item.prod_cmpy === selected?.[0]?.mvitm_prodcmpy_to &&
                item.prod_code === selected?.[0]?.mvitm_prodcode_to
            ),
            (item) => {
              return { 
                code: item.tank_code, 
                // name: item.tank_code 
                // name: item.tank_code + ' - ' + item.tank_name + ' [' + item.base_code + ' - ' + item.base_name + ']'
                name: item.tank_code + ' - ' + item.tank_name
              };
            }
          ) */
        ),
      },
      cellEditor: 'ListEditor',
      cellEditorParams: {
        values: _.uniq(
          _.map(
            tanksTo?.records?.filter(
              (item) =>
                item.prod_cmpy === selected?.[0]?.mvitm_prodcmpy_to &&
                item.prod_code === selected?.[0]?.mvitm_prodcode_to
            ),
            (item) => {
              return {
                code: item.tank_code,
                // name: item.tank_code
                // name: item.tank_code + ' - ' + item.tank_name + ' [' + item.base_code + ' - ' + item.base_name + ']'
                name: item.tank_code + ' - ' + item.tank_name,
              };
            }
          )
        ),
      },
    },
    {
      headerName: t('fields.toStoreLocationCompany'),
      field: 'mvitm_shiploc_to',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
    },
    {
      headerName: t('fields.toDescription'),
      field: 'mvitm_shiptext_to',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
    },
    {
      headerName: t('fields.toSecondDescription'),
      field: 'mvitm_shiptext_to2',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
    },
    {
      headerName: t('fields.comments'),
      field: 'mvitm_comments',
      sortable: true,
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
      editable: selected?.[0]?.editable || !value,
      cellClass: selected?.[0]?.editable || !value ? 'selected-editable-ag-grid-cell' : '',
    },
    {
      headerName: t('fields.quantityScheduled'),
      field: 'mvitm_qty_schd',
      sortable: true,
      resizable: true,
      width: 180,
      suppressSizeToFit: true,
    },
    {
      headerName: t('fields.quantityMoved'),
      field: 'mvitm_qty_move',
      sortable: true,
      resizable: true,
      width: 160,
      suppressSizeToFit: true,
      cellRenderer: 'QuantityRenderer',
      cellRendererParams: {
        digits: '0',
        min: '100',
      },
      editable: false,
      // editable: selected?.[0]?.editable || !value,
      // cellClass: selected?.[0]?.editable || !value ? 'selected-editable-ag-grid-cell' : '',
      // cellEditor: 'NumericEditor',
      // cellEditorParams: {
      //   ranges: {
      //     max: 999999999,
      //     min: 0,
      //   },
      //   t,
      // },
    },
    {
      headerName: t('fields.quantityDelivered'),
      field: 'mvitm_qty_delv',
      sortable: true,
      resizable: true,
      width: 160,
      suppressSizeToFit: true,
      cellRenderer: 'QuantityRenderer',
      cellRendererParams: {
        digits: '0',
        min: '100',
      },
      editable: false,
      // editable: selected?.[0]?.editable || !value,
      // cellClass: selected?.[0]?.editable || !value ? 'selected-editable-ag-grid-cell' : '',
      // cellEditor: 'NumericEditor',
      // cellEditorParams: {
      //   ranges: {
      //     max: 999999999,
      //     min: 0,
      //   },
      //   t,
      // },
    },
    {
      headerName: t('fields.nomQtyReceiptExpected'),
      field: 'mvitm_receipt_expected',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      width: 240,
      suppressSizeToFit: true,
      hide: true, // !config?.siteUseIntoTransitGainLoss,
      cellRenderer: 'QuantityRenderer',
      cellRendererParams: {
        digits: '0',
        min: '100',
      },
      editable: true, //selected?.[0]?.editable,
      cellClass: 'editable-ag-grid-cell', //selected?.[0]?.editable || !value,
      cellEditor: 'SoleNumericEditor',
      cellEditorParams: {
        ranges: {
          max: 999999999,
          min: 0,
        },
        t,
      },
    },
    {
      headerName: t('fields.nomIntoTransitGL'),
      field: 'mvitm_into_transit_gl',
      sortable: true,
      resizable: true,
      width: 180,
      hide: true, // !config?.siteUseIntoTransitGainLoss,
      suppressSizeToFit: true,
      // cellRenderer: 'QuantityRenderer',
      // cellRendererParams: {
      //   digits: '0',
      //   min: '100',
      // },
      editable: false,
    },
  ];
};

export default useColumns;
