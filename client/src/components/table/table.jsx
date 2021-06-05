import React, { useState, useEffect } from 'react';
import { Button, Spin } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import { useTranslation } from 'react-i18next';

import { FuzzyFilter, MultiFilter, BooleanFilter } from './filters';

import {
  BooleanRenderer,
  LockRenderer,
  DateRenderer,
  ColorRenderer,
  ImageRenderer,
  StatusRenderer,
  TagRenderer,
  NullRenderer,
  ProgressRenderer,
  ATGRenderer,
  MarkRenderer,
  EquipmentRenderer,
  ListRenderer,
  PowerListRenderer,
  AffixRenderer,
  TwinQuantityRenderer,
  QuantityRenderer,
  TemperatureRenderer,
  DensityRenderer,
  ExpiryDateRenderer,
  DraggableRenderer,
  FlowRateRenderer,
  OffsetAlarmRenderer,
  LinkRenderer,
  MassInAirRenderer,
} from './renderers';

import { ClearOutlined, LoadingOutlined } from '@ant-design/icons';

import {
  NumericEditor,
  SoleNumericEditor,
  SelectEditor,
  BooleanEditor,
  ListEditor,
  PowerListEditor,
  InputPopupEditor,
} from './editors';
import { LoadingStatus } from './status';
import { Search } from '..';

import './table.css';
import useWindowSize from 'hooks/use-window-size';

const defaultComponents = {
  FuzzyFilter,
  MultiFilter,
  BooleanFilter,
  BooleanRenderer,
  LockRenderer,
  MarkRenderer,
  DateRenderer,
  ColorRenderer,
  ImageRenderer,
  LoadingStatus,
  StatusRenderer,
  ProgressRenderer,
  EquipmentRenderer,
  AffixRenderer,
  ListRenderer,
  PowerListRenderer,
  TwinQuantityRenderer,
  QuantityRenderer,
  TemperatureRenderer,
  DensityRenderer,
  ExpiryDateRenderer,
  FlowRateRenderer,
  OffsetAlarmRenderer,
  ATGRenderer,
  TagRenderer,
  NullRenderer,
  NumericEditor,
  SoleNumericEditor,
  SelectEditor,
  BooleanEditor,
  ListEditor,
  PowerListEditor,
  InputPopupEditor,
  DraggableRenderer,
  LinkRenderer,
  MassInAirRenderer,
};

const defaultColumnDef = {};

const Table = ({
  data,
  isLoading,
  onClick,
  columns,
  onEditingFinished,
  handleSelect,
  height,
  search,
  selectionMode,
  apiContext,
  extra,
  minimal,
  components,
  onCellClick,
  parentHeight,
  rowHeight,
  onCellUpdate,
  autoColWidth,
  filterValue,
  footer,
  isPolling,
  stopEditingWhenGridLosesFocus,
  clearSelection,
  editType,
  rowEditingStopped,
  clearFilterPlus,
  onSortChanged,
}) => {
  const { t } = useTranslation();
  const { windowWidth } = useWindowSize();

  const [payload, setPayload] = useState([]);
  const [value, setValue] = useState(filterValue);
  const [api, setAPI] = useState('');
  const [tableColumns, setTableColumns] = useState(columns);

  const overlayNoRowsText =
    '<span style="padding: 10px; font-size: 16px">' + t('descriptions.noRowsToShow') + '</span>';

  // const loading = !data || isLoading;

  if (clearSelection) {
    api.deselectAll();
  }

  const handleMultipleSelection = () => {
    if (handleSelect) {
      const payload = api.getSelectedRows();
      handleSelect(payload);
    }
  };

  const handleGridReady = (params) => {
    setAPI(params.api);

    if (apiContext) {
      apiContext(params.api);
    }
  };

  const onFilterClear = () => {
    api.setFilterModel(null);
    api.onFilterChanged();
    api.setSortModel(null);
    setValue('');
    if (clearFilterPlus) {
      clearFilterPlus();
    }
  };

  const handleFirstDataRendered = (params) => {
    if (!autoColWidth) {
      return;
    }

    const allColumnIds = [];
    const skipHeader = false;
    params.columnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });

    params.columnApi.autoSizeColumns(allColumnIds, skipHeader);
  };

  useEffect(() => {
    const query = value === '' ? undefined : value;

    if (api) {
      api.setQuickFilter(query);
    }
  }, [value, api]);

  useEffect(() => {
    if (search) {
      setValue(search);
    }
  }, [search]);

  useEffect(() => {
    if (api) {
      api.sizeColumnsToFit();
    }
  }, [api, windowWidth]);

  useEffect(() => {
    setPayload(data);
  }, [data]);

  useEffect(() => {
    if (t && columns) {
      columns.forEach((o) => {
        if (o?.filter === 'FuzzyFilter' || o?.filter === 'MultiFilter' || o?.filter === 'BooleanFilter') {
          o.filterParams = {
            t,
          };
        }
        /* if (o?.cellEditor === 'NumericEditor') {
          if (!o.hasOwnProperty('cellEditorParams')) {
            o.cellEditorParams = {};
          }
          if (!o?.cellEditorParams?.hasOwnProperty('t')) {
            o.cellEditorParams['t'] = t;
          }
          // o.cellEditorParams = {
          //   ...o.cellEditorParams,
          //   t,
          // };
        } */
        if (o?.headerTooltip === undefined) {
          o.headerTooltip = o?.headerName;
        }
        // o.suppressSizeToFit = false;
        // o.width = undefined;
      });
      setTableColumns(columns);
    }
  }, [t, columns, setTableColumns]);

  useEffect(() => {
    if (!!filterValue) {
      setValue('' + filterValue);
    }
  }, [filterValue]);

  const icon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
        color: '#0054A4',
      }}
    />
  );

  function onHandleSortChange(payload) {
    const sortedBy = [];

    const columns = payload?.columnApi?.columnController?.gridColumns || [];

    for (let index = 0; index < columns?.length; index++) {
      const column = columns[index];

      if (column?.sort) {
        sortedBy.push(`${column?.sort}(${column?.colId})`);
      }
    }

    if (onSortChanged) {
      onSortChanged(sortedBy?.join(', '));
    }
  }

  return (
    <Spin
      spinning={!data || !!isLoading}
      style={{
        width: '100%',
        minHeight: height || '100%',
      }}
      indicator={icon}
    >
      <div style={{ width: '100%', height: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ overflow: 'hidden', flexGrow: '1' }}>
            <div
              style={{
                width: '100%',
              }}
              className="ag-theme-balham"
            >
              {!minimal && (
                <>
                  <Search value={value} search={setValue} isLoading={!!isLoading && !data} />

                  <Button
                    icon={<ClearOutlined />}
                    style={{ float: 'right', marginLeft: 5 }}
                    onClick={onFilterClear}
                  >
                    {t('operations.clearFilter')}
                  </Button>
                </>
              )}

              <div style={{ float: 'right' }}>{extra}</div>

              <div
                className={parentHeight || height ? null : 'ag-table-container'}
                style={{ height: parentHeight || `calc(100vh - ${height || '250px'})` }}
              >
                <AgGridReact
                  columnDefs={tableColumns}
                  rowData={payload}
                  onGridReady={handleGridReady}
                  frameworkComponents={{ ...defaultComponents, ...components }}
                  onRowDoubleClicked={(value) => onClick && onClick(value.data)}
                  loadingOverlayComponent="LoadingStatus"
                  overlayNoRowsTemplate={overlayNoRowsText}
                  rowSelection={selectionMode || 'multiple'}
                  defaultColDef={defaultColumnDef}
                  onCellEditingStopped={onEditingFinished}
                  onRowSelected={handleMultipleSelection}
                  animateRows={true}
                  enableCellTextSelection={true}
                  onCellDoubleClicked={onCellClick}
                  rowHeight={rowHeight || null}
                  onCellValueChanged={onCellUpdate}
                  onFirstDataRendered={handleFirstDataRendered}
                  pinnedBottomRowData={footer}
                  onSortChanged={onHandleSortChange}
                  suppressMultiSort={true}
                  stopEditingWhenGridLosesFocus={
                    stopEditingWhenGridLosesFocus === undefined ? true : stopEditingWhenGridLosesFocus
                  }
                  singleClickEdit={true}
                  editType={editType === 'fullRow' ? 'fullRow' : ''}
                  onRowEditingStopped={rowEditingStopped}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Table;
