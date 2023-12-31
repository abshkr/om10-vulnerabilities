import React, { useState, useEffect } from 'react';
import { Button, Spin, Tooltip } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import { useTranslation } from 'react-i18next';

import { FuzzyFilter, MultiFilter, BooleanFilter } from './filters';
import { updateUserPageColumns, removeUserPageColumns } from 'utils';

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
  VcfRenderer,
  SeperatorRenderer,
  QuantitySeperatorRenderer,
  LegacyExpDateRenderer,
  TagListRenderer,
  PpmPercentageRenderer,
  RatioPercentageRenderer,
  TipTextRenderer,
} from './renderers';

import { ClearOutlined, LoadingOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

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
import { AdjustableColumns, Search } from '..';

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
  VcfRenderer,
  SeperatorRenderer,
  QuantitySeperatorRenderer,
  LegacyExpDateRenderer,
  TagListRenderer,
  PpmPercentageRenderer,
  RatioPercentageRenderer,
  TipTextRenderer,
};

const defaultColumnDef = {};

const CustomTable = ({
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
  columnAdjustable,
  pageColumns,
  pageModule,
  columnLoader,
  getRowNodeId,
}) => {
  const { t } = useTranslation();
  const { windowWidth } = useWindowSize();

  const [payload, setPayload] = useState([]);
  const [value, setValue] = useState(filterValue);
  const [api, setAPI] = useState('');
  const [tableColumns, setTableColumns] = useState(columns);
  const [dragStarted, setDragStarted] = useState(false);
  const [dragStopped, setDragStopped] = useState(false);
  const [columnMoved, setColumnMoved] = useState(false);
  const [columnResized, setColumnResized] = useState(false);
  const [columnAdjusted, setColumnAdjusted] = useState(false);
  const [columnAPI, setColumnAPI] = useState('');

  const overlayNoRowsText =
    '<span style="padding: 10px; font-size: 16px">' + t('descriptions.noRowsToShow') + '</span>';

  // const loading = !data || isLoading;

  if (clearSelection) {
    api.deselectAll();
  }

  const onDragStarted = (e) => {
    setDragStarted(true);
  };

  const onDragStopped = (e) => {
    setDragStopped(true);
  };

  const onColumnMoved = (e) => {
    setColumnMoved(true);
  };

  const onColumnResized = (e) => {
    setColumnResized(true);
  };

  const onColumnAdjusted = (e) => {
    // console.log('..................onColAdj', e);
    // setColumnAPI(e.columnApi);
    setColumnAdjusted(true);
  };

  const saveColumnAdjustment = () => {
    const gridColumns = columnAPI?.getAllGridColumns();
    console.log('.............moved', columnAPI, gridColumns, pageColumns);
    updateUserPageColumns(t, gridColumns, pageColumns, pageModule, columnLoader, setColumnAdjusted);
    // setColumnAdjusted(false);
  };

  const removeUserColumns = () => {
    removeUserPageColumns(t, pageColumns, pageModule, columnLoader);
    // setColumnAdjusted(false);
  };

  const handleMultipleSelection = () => {
    if (handleSelect) {
      const payload = api.getSelectedRows();
      handleSelect(payload);
    }
  };

  const handleGridReady = (params) => {
    console.log('..................handleGridReady', params);
    setAPI(params.api);
    setColumnAPI(params.columnApi);

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
    // if (autoColWidth!==undefined && !autoColWidth) {
    if (!autoColWidth) {
      return;
    }

    // if the featur eof customizable columns is turned on, the widths should be manually set not adjusted automatically
    if (columnAdjustable) {
      return;
    }

    const allColumnIds = [];
    // skipHeaderOnAutoSize=true
    const skipHeader = false;
    params.columnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });

    params.columnApi.autoSizeColumns(allColumnIds, skipHeader);
  };

  useEffect(() => {
    // console.log('....111dragStarted, dragStopped, columnMoved, columnResized.....', dragStarted, dragStopped, columnMoved, columnResized)
    if (dragStarted && dragStopped && (columnMoved || columnResized)) {
      console.log(
        '....222dragStarted, dragStopped, columnMoved, columnResized.....',
        dragStarted,
        dragStopped,
        columnMoved,
        columnResized
      );
      setColumnAdjusted(true);
      setDragStarted(false);
      setDragStopped(false);
      if (columnMoved) {
        setColumnMoved(false);
      }
      if (columnResized) {
        setColumnResized(false);
      }
    }
  }, [dragStarted, dragStopped, columnMoved, columnResized]);

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
    console.log('...........in DataTable...', columns);
    if (t && columns && api && setTableColumns) {
      console.log('...........in DataTable2...', columnAdjusted, columns);
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
        // if (o?.tooltipField === undefined) {
        //   o.tooltipField = o?.field;
        // }
        // if (o?.headerTooltip === undefined) {
        //   o.headerTooltip = o?.headerName;
        // }
        // o.tooltipShowDelay = 100;
        // o.suppressSizeToFit = false;
        // o.width = undefined;
      });
      // setTableColumns([]);
      // setTableColumns(columns);
      if (api && api?.setColumnDefs) {
        if (!columnAdjusted) {
          console.log('...........in DataTable3...', api);
          api.setColumnDefs([]);
          api.setColumnDefs(columns);
          api.sizeColumnsToFit();
        } else {
          console.log('...........in DataTable3b...', columns);
          setTableColumns(columns);
        }
      } else {
        console.log('...........in DataTable4...', columns);
        setTableColumns(columns);
      }
    }
  }, [t, columns, api, setTableColumns, columnAdjusted]);

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

                  {columnAdjustable && pageColumns?.length > 0 && (
                    <Tooltip placement="topLeft" title={t('descriptions.columnRemoval')}>
                      <Button
                        type="danger"
                        icon={<DeleteOutlined />}
                        onClick={() => removeUserColumns()}
                        style={{ float: 'right', marginRight: 5 }}
                      >
                        {t('operations.removeColumns')}
                      </Button>
                    </Tooltip>
                  )}

                  {columnAdjustable && (
                    <AdjustableColumns
                      pageColumns={pageColumns}
                      pageModule={pageModule}
                      columnAPI={columnAPI}
                      columnLoader={columnLoader}
                      setColumnAdjusted={setColumnAdjusted}
                    />
                  )}

                  {columnAdjusted && columnAdjustable && (
                    <Tooltip placement="topLeft" title={t('descriptions.columnAdjusted')}>
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => saveColumnAdjustment()}
                        style={{ float: 'right', marginRight: 5 }}
                      >
                        {t('operations.saveColumns')}
                      </Button>
                    </Tooltip>
                  )}
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
                  onColumnMoved={onColumnMoved}
                  onColumnResized={onColumnResized}
                  onDragStarted={onDragStarted}
                  onDragStopped={onDragStopped}
                  getRowNodeId={getRowNodeId}
                  suppressDragLeaveHidesColumns={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

// export default CustomTable;
export { CustomTable };
