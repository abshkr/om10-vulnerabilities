import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { AgGridReact } from 'ag-grid-react';

import { FuzzyFilter, MultiFilter, BooleanFilter } from './filters';

import {
  BooleanRenderer,
  LockRenderer,
  DateRenderer,
  StatusRenderer,
  TagRenderer,
  NullRenderer
} from './renderers';

import { ClearOutlined } from '@ant-design/icons';

import { NumericEditor, SelectEditor } from './editors';
import { LoadingStatus } from './status';
import { Search } from '..';

import './table.css';

const defaultComponents = {
  FuzzyFilter,
  MultiFilter,
  BooleanFilter,
  BooleanRenderer,
  LockRenderer,
  DateRenderer,
  LoadingStatus,
  StatusRenderer,
  TagRenderer,
  NullRenderer,
  NumericEditor,
  SelectEditor
};

const defaultColumnDef = {};

const Table = ({
  data,
  onClick,
  columns,
  isLoading,
  onEditingFinished,
  handleSelect,
  height,
  search,
  selectionMode,
  apiContext,
  extra
}) => {
  const [value, setValue] = useState('');
  const [api, setAPI] = useState('');

  const handleMultipleSelection = () => {
    if (handleSelect) {
      const payload = api.getSelectedRows();
      handleSelect(payload);
    }
  };

  const handleGridReady = params => {
    setAPI(params.api);

    if (apiContext) {
      apiContext(params.api);
    }

    params.api.sizeColumnsToFit();
  };

  const onFilterClear = () => {
    api.setFilterModel(null);
    api.onFilterChanged();
    setValue('');
  };

  useEffect(() => {
    if (api) {
      isLoading && !data ? api.showLoadingOverlay() : api.hideOverlay();
    }
  }, [isLoading, api, data]);

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

  return (
    <div
      style={{
        width: '100%'
      }}
      className="ag-theme-balham"
    >
      <Search value={value} search={setValue} isLoading={isLoading && !data} />

      <Button icon={<ClearOutlined />} style={{ float: 'right' }} onClick={onFilterClear}>
        Clear Filters
      </Button>

      <div style={{ float: 'right' }}>{extra}</div>

      <div style={{ height: `calc(100vh - ${height || '27vh'})`, marginTop: 5 }}>
        <AgGridReact
          columnDefs={columns}
          rowData={data}
          onGridReady={handleGridReady}
          frameworkComponents={defaultComponents}
          onRowDoubleClicked={value => onClick && onClick(value.data)}
          loadingOverlayComponent="LoadingStatus"
          rowSelection={selectionMode || 'multiple'}
          defaultColDef={defaultColumnDef}
          onCellEditingStopped={onEditingFinished}
          onRowSelected={handleMultipleSelection}
          animateRows={true}
        />
      </div>
    </div>
  );
};

export default Table;
