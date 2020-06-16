import React, { useState, useEffect } from 'react';
import { Button, Spin } from 'antd';
import { AgGridReact } from 'ag-grid-react';

import { FuzzyFilter, MultiFilter, BooleanFilter } from './filters';

import {
  BooleanRenderer,
  LockRenderer,
  DateRenderer,
  StatusRenderer,
  TagRenderer,
  NullRenderer,
  ProgressRenderer,
  ATGRenderer,
  MarkRenderer,
  EquipmentRenderer,
  ListRenderer,
  AffixRenderer,
  QuantityRenderer,
  ExpiryDateRenderer
} from './renderers';

import { ClearOutlined, LoadingOutlined } from '@ant-design/icons';

import { NumericEditor, SelectEditor, BooleanEditor, ListEditor } from './editors';
import { LoadingStatus } from './status';
import { Search } from '..';

import './table.css';

const defaultComponents = {
  FuzzyFilter,
  MultiFilter,
  BooleanFilter,
  BooleanRenderer,
  LockRenderer,
  MarkRenderer,
  DateRenderer,
  LoadingStatus,
  StatusRenderer,
  ProgressRenderer,
  EquipmentRenderer,
  AffixRenderer,
  ListRenderer,
  QuantityRenderer,
  ATGRenderer,
  TagRenderer,
  NullRenderer,
  NumericEditor,
  SelectEditor,
  BooleanEditor,
  ListEditor,
  ExpiryDateRenderer,
};

const defaultColumnDef = {};

const Table = ({
  data,
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
}) => {
  const [payload, setPayload] = useState([]);
  const [value, setValue] = useState('');
  const [api, setAPI] = useState('');

  const isLoading = !data;

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
    setValue('');
  };

  const handleFirstDataRendered = params => {
    if (!autoColWidth) {
      return;
    }

    // params.api.sizeColumnsToFit();
    let allColumnIds = [];
    let skipHeader = false;
    params.columnApi.getAllColumns().forEach(function(column) {
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
  }, [data, api]);

  useEffect(() => {
    if (data?.length > 0) {
      setPayload(data);
    }
  }, [data]);

  const icon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
        color: '#0054A4',
      }}
    />
  );

  return (
    <Spin
      spinning={isLoading}
      style={{
        width: '100%',
        minHeight: height || '100%',
      }}
      indicator={icon}
    >
      <div
        style={{
          width: '100%',
        }}
        className="ag-theme-balham"
      >
        {!minimal && (
          <>
            <Search value={value} search={setValue} isLoading={isLoading && !data} />

            <Button
              icon={<ClearOutlined />}
              style={{ float: 'right', marginLeft: 5 }}
              onClick={onFilterClear}
            >
              Clear Filters
            </Button>
          </>
        )}

        <div style={{ float: 'right' }}>{extra}</div>

        <div style={{ height: parentHeight || `calc(100vh - ${height || '250px'})`, marginTop: 5 }}>
          <AgGridReact
            columnDefs={columns}
            rowData={payload}
            onGridReady={handleGridReady}
            frameworkComponents={{ ...defaultComponents, ...components }}
            onRowDoubleClicked={(value) => onClick && onClick(value.data)}
            loadingOverlayComponent="LoadingStatus"
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
          />
        </div>
      </div>
    </Spin>
  );
};

export default Table;
