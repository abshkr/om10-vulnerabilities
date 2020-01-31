import React, { useState, useEffect } from 'react';

import { AgGridReact } from 'ag-grid-react';

import { FuzzyFilter, MultiFilter, BooleanFilter } from './filters';
import { BooleanRenderer, LockRenderer, DateRenderer, StatusRenderer, TagRenderer } from './renderers';
import { LoadingStatus } from './status';
import { Search } from '..';

import './table.css';

const components = {
  FuzzyFilter,
  MultiFilter,
  BooleanFilter,
  BooleanRenderer,
  LockRenderer,
  DateRenderer,
  LoadingStatus,
  StatusRenderer,
  TagRenderer
};

const Table = ({ data, onClick, columns, isLoading, onEditingFinished, handleSelect, height }) => {
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
    params.api.sizeColumnsToFit();
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

  return (
    <div
      style={{
        width: '100%'
      }}
      className="ag-theme-balham"
    >
      <Search value={value} search={setValue} isLoading={isLoading && !data} />

      <div style={{ height: `calc(100vh - ${height || 260}px)`, marginTop: 5 }}>
        <AgGridReact
          columnDefs={columns}
          rowData={data}
          onGridReady={handleGridReady}
          frameworkComponents={components}
          onRowDoubleClicked={value => onClick && onClick(value.data)}
          loadingOverlayComponent="LoadingStatus"
          rowSelection="multiple"
          onCellEditingStopped={onEditingFinished}
          onRowSelected={handleMultipleSelection}
          animateRows={true}
        />
      </div>
    </div>
  );
};

export default Table;
