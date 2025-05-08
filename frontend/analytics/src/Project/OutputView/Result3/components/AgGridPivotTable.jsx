'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, ClientSideRowModelModule } from 'ag-grid-community';
import {
  ColumnsToolPanelModule,
  SideBarModule,
  RowGroupingModule,
  // PivotModule, // ✅ 이걸로 대체
} from 'ag-grid-enterprise';

// 스타일 import
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// ✅ 등록 모듈
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ColumnsToolPanelModule,
  SideBarModule,
  RowGroupingModule,
  // PivotModule, // ✅ 여기도
]);

const AgGridPivotTable = () => {
  const [rowData, setRowData] = useState();
  const [columnDefs] = useState([
    { field: 'country', rowGroup: true, enableRowGroup: true },
    { field: 'year', pivot: true, enablePivot: true },
    { field: 'sport', enableRowGroup: true },
    { field: 'gold', aggFunc: 'sum', enableValue: true },
    { field: 'silver', aggFunc: 'sum', enableValue: true },
    { field: 'bronze', aggFunc: 'sum', enableValue: true },
    { field: 'total', aggFunc: 'sum', enableValue: true },
  ]);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 120,
      sortable: true,
      resizable: true,
    }),
    []
  );

  const autoGroupColumnDef = useMemo(
    () => ({
      minWidth: 180,
    }),
    []
  );

  const sideBar = useMemo(
    () => ({
      toolPanels: ['columns'],
      defaultToolPanel: 'columns',
    }),
    []
  );

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((res) => res.json())
      .then((data) => setRowData(data));
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: '100vh', width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        autoGroupColumnDef={autoGroupColumnDef}
        pivotMode={true}
        sideBar={sideBar}
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default AgGridPivotTable;
