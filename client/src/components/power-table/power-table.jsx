import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { setupUserPageColumns, updateUserPageColumns } from 'utils';
import { usePageColumns } from 'hooks';

// import { DataTable } from '..';
import { CustomTable } from '../table/custom-table.jsx';

const PowerTable = ({
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
  // pageColumns,
  pageModule,
  // columnLoader,
  getRowNodeId,
}) => {
  const { pageColumns, reloadColumns } = usePageColumns(pageModule);

  const [fields, setFields] = useState(columns);

  useEffect(() => {
    const tmp = JSON.stringify(columns);
    console.log('............power table >> ....sth changed..', tmp.length);
    if (
      (columnAdjustable &&
        setFields &&
        setupUserPageColumns &&
        columns &&
        pageColumns &&
        pageColumns?.length >= 0) ||
      (!columnAdjustable && setFields && columns)
    ) {
      if (columnAdjustable) {
        const newValues = setupUserPageColumns(columns, pageColumns);

        console.log('............power table >> old columns..', columns);
        console.log('............power table >> new columns..', newValues, JSON.stringify(newValues)?.length);
        setFields(newValues);
      } else {
        console.log('............power table >> curr columns..', columns);
        setFields(columns);
      }
    }
  }, [columnAdjustable, columns, pageColumns, setFields, setupUserPageColumns]);

  return (
    <CustomTable
      data={data}
      isLoading={isLoading}
      onClick={onClick}
      columns={fields}
      onEditingFinished={onEditingFinished}
      handleSelect={handleSelect}
      height={height}
      search={search}
      selectionMode={selectionMode}
      apiContext={apiContext}
      extra={extra}
      minimal={minimal}
      components={components}
      onCellClick={onCellClick}
      parentHeight={parentHeight}
      rowHeight={rowHeight}
      onCellUpdate={onCellUpdate}
      autoColWidth={autoColWidth}
      filterValue={filterValue}
      footer={footer}
      isPolling={isPolling}
      stopEditingWhenGridLosesFocus={stopEditingWhenGridLosesFocus}
      clearSelection={clearSelection}
      editType={editType}
      rowEditingStopped={rowEditingStopped}
      clearFilterPlus={clearFilterPlus}
      onSortChanged={onSortChanged}
      columnAdjustable={columnAdjustable}
      pageColumns={pageColumns}
      pageModule={pageModule}
      columnLoader={reloadColumns}
      getRowNodeId={getRowNodeId}
    />
  );
};

export default PowerTable;
