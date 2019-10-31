import React, { useState, useEffect } from 'react';

import { AgGridReact } from 'ag-grid-react';
import { Button } from 'antd';

import { FuzzyFilter, MultiFilter, BooleanFilter } from './filters';
import { BooleanRenderer, LockRenderer, DateRenderer } from './renderers';
import { LoadingStatus } from './status';
import { Search, Download } from '..';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import './table.css';

const filters = {
  FuzzyFilter,
  MultiFilter,
  BooleanFilter,
  BooleanRenderer,
  LockRenderer,
  DateRenderer,
  LoadingStatus,
};

const Table = ({ data, click, columns, isLoading, t, create, modifiers }) => {
  const [value, setValue] = useState('');
  const [api, setAPI] = useState('');

  const onGridReady = params => {
    setAPI(params.api);
    params.api.sizeColumnsToFit();
  };

  useEffect(() => {
    if (isLoading && api) {
      api.showLoadingOverlay();
    }
  }, [isLoading, api]);

  useEffect(() => {
    const query = value === '' ? undefined : value;

    if (api) {
      api.setQuickFilter(query);
    }
  }, [value, api]);

  return (
    <div
      style={{
        height: 'calc(100vh - 30px)',
        width: '100%',
      }}
      className="ag-theme-balham"
    >
      <Search value={value} search={setValue} loading={isLoading} />

      {modifiers}

      <Download
        data={data}
        style={{ float: 'right' }}
        loading={isLoading}
        t={t}
        columns={columns}
      />

      <Button
        shape="round"
        type="primary"
        icon="plus"
        disabled={!create}
        loading={isLoading}
        style={{ float: 'right', marginRight: 5 }}
        onClick={() => click(null)}
      >
        {t('operations.create')}
      </Button>

      <div style={{ height: 'calc(100vh - 95px)', marginTop: 5 }}>
        <AgGridReact
          columnDefs={columns}
          rowData={data}
          onGridReady={onGridReady}
          frameworkComponents={filters}
          onRowDoubleClicked={value => click && click(value.data)}
          loadingOverlayComponent="LoadingStatus"
          rowSelection="multiple"
        />
      </div>
    </div>
  );
};

export default Table;
