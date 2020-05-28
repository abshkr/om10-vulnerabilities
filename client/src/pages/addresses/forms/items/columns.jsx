import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import useSWR from 'swr';
import _ from 'lodash';

import { ADDRESSES } from '../../../../api';

const useColumns = (value, selected) => {
  //const [type, setType] = useState('Receipt');
  //const [products, setProducts] = useState([]);

  const { t } = useTranslation();

  const { data: types } = useSWR(ADDRESSES.TYPES, { refreshInterval: 0 });
/*
  useEffect(() => {
    const type = selected[0]?.mvitm_type_name;

    if (type) {
      setType(type);
    }
  }, [selected]);
*/
  return [
    {
      headerName: `${t('fields.addressAction')}`,
      field: 'address_action',
      width: 40,
      //checkboxSelection: true,
      cellRenderer: 'MarkRenderer',
      suppressSizeToFit: true,
      pinned: 'left'
    },
    {
      headerName: t('fields.addressLineCode'),
      field: 'db_addr_line_id',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      hide: true,
      width: 200,
      suppressSizeToFit: true,
      pinned: 'left'
    },
    {
      headerName: t('fields.addressLineNo'),
      field: 'db_addrline_no',
      filter: 'MultiFilter',
      sortable: true,
      resizable: true,
      width: 160,
      suppressSizeToFit: true,
      pinned: 'left'
    },

    {
      headerName: t('fields.addressLineType'),
      field: 'db_addr_line_type',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
      editable: selected[0]?.addresss_action==='+' || selected[0]?.addresss_action==='*' || !!value,
      cellRenderer: 'ListRenderer',
      cellRendererParams: {
        //values: _.uniq(_.map(types?.records, (item)=>{return String(item.enum_no)+'|'+item.message;}))
        values: _.uniq(_.map(types?.records, (item)=>{return {code: String(item.enum_no), name: item.message};}))
      },
      cellEditor: 'ListEditor',
      cellEditorParams: {
        //values: _.uniq(_.map(types?.records, (item)=>{return String(item.enum_no)+'|'+item.message;}))
        values: _.uniq(_.map(types?.records, (item)=>{return {code: String(item.enum_no), name: item.message};}))
      }
    },
    {
      headerName: t('fields.addressLineTypeName'),
      field: 'db_addr_line_typename',
      sortable: true,
      resizable: true,
      hide: true,
      width: 120,
      suppressSizeToFit: true,
      editable: false
    },
    {
      headerName: t('fields.addressLineText'),
      field: 'db_addr_line',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      editable: selected[0]?.addresss_action==='+' || selected[0]?.addresss_action==='*' || !!value,
    }
  ];
};

export default useColumns;
