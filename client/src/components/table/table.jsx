import React, { useState, useEffect } from 'react';

import { AgGridReact } from 'ag-grid-react';
import { Button } from 'antd';

import { FuzzyFilter, MultiFilter, BooleanFilter } from './filters';
import { BooleanRenderer, LockRenderer, DateRenderer, StatusRenderer } from './renderers';
import { LoadingStatus } from './status';
import { Search, Download } from '..';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import './table.css';

const components = {
  FuzzyFilter,
  MultiFilter,
  BooleanFilter,
  BooleanRenderer,
  LockRenderer,
  DateRenderer,
  LoadingStatus,
  StatusRenderer
};

const Table = ({ data, click, columns, isLoading, onEditingFinished }) => {
  const [value, setValue] = useState('');
  const [api, setAPI] = useState('');

  const onGridReady = params => {
    setAPI(params.api);
    params.api.sizeColumnsToFit();
  };

  useEffect(() => {
    if (api) {
      isLoading ? api.showLoadingOverlay() : api.hideOverlay();
      api.refreshCells();
    }
  }, [isLoading, api, data]);

  useEffect(() => {
    const query = value === '' ? undefined : value;

    if (api) {
      api.setQuickFilter(query);
    }
  }, [value, api]);

  return (
    <div
      style={{
        width: '100%'
      }}
      className="ag-theme-balham"
    >
      <Search value={value} search={setValue} isLoading={isLoading} />

      <div style={{ height: 'calc(100vh - 260px)', marginTop: 5 }}>
        <AgGridReact
          columnDefs={columns}
          rowData={data}
          onGridReady={onGridReady}
          frameworkComponents={components}
          onRowDoubleClicked={value => click && click(value.data)}
          loadingOverlayComponent="LoadingStatus"
          rowSelection="multiple"
          onCellEditingStopped={onEditingFinished}
        />
      </div>
    </div>
  );
};

export default Table;
