import React, { useState, useEffect } from "react";

import { AgGridReact } from "ag-grid-react";
import { Button } from "antd";

import { FuzzyFilter, MultiFilter, BooleanFilter } from "./filters";

import {
  BooleanRenderer,
  LockRenderer,
  DateRenderer,
  StatusRenderer
} from "./renderers";
import { LoadingStatus } from "./status";
import { Search, Download } from "..";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import "./table.css";

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

const Table = ({
  data,
  click,
  columns,
  isLoading,
  t,
  create,
  modifiers,
  onEditingFinished
}) => {
  const [value, setValue] = useState("");
  const [api, setAPI] = useState("");

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
    const query = value === "" ? undefined : value;

    if (api) {
      api.setQuickFilter(query);
    }
  }, [value, api]);

  return (
    <div
      style={{
        width: "100%"
      }}
      className="ag-theme-balham"
    >
      <Search value={value} search={setValue} loading={isLoading} />

      {modifiers}

      <Download
        data={data}
        style={{ float: "right" }}
        loading={isLoading}
        t={t}
        columns={columns}
      />

      <Button
        shape="round"
        type="primary"
        icon="plus"
        disabled={!create}
        style={{ float: "right", marginRight: 5 }}
        loading={isLoading}
        onClick={() => click(null)}
      >
        {t("operations.create")}
      </Button>

      <div style={{ height: "calc(100vh - 163px)", marginTop: 5 }}>
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
