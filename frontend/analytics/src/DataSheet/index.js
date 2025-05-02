import React, { useState, useRef, useEffect } from "react";
import Engineering1 from "../OutputView/Engineering1";
import Engineering2 from "../OutputView/Engineering2";
import Analysis1 from "../OutputView/Analysis1";
import Result1 from "../OutputView/Result1";
import Result2 from "../OutputView/Result2";
import Result3 from "../OutputView/Result3";
import Result4 from "../OutputView/Result4";
import { ClipboardProvider } from "../ClipboardContext";

import { AgGridReact } from "ag-grid-react";
// import {
//   AllCommunityModule,
//   ModuleRegistry,
//   themeQuartz,
// } from "ag-grid-community";
import "./style.css";
import { openDB } from "idb";

// ModuleRegistry.registerModules([AllCommunityModule]);

// const myTheme = themeQuartz.withParams({
//   backgroundColor: "#ffffff",
//   foregroundColor: "#000",
//   headerTextColor: "#000",
//   headerBackgroundColor: "#E1E1E1",
//   oddRowBackgroundColor: "rgb(0, 0, 0, 0)",
//   headerColumnResizeHandleColor: "#E1E1E1",
//   headerFontFamily: "Brush Script MT",
//   cellFontFamily: "monospace",
//   borderRadius: "0px",
// });

const DB_NAME = "AnalyticsDB";
const STORE_NAME = "uploadedData";

const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

const getDataFromDB = async () => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  return await store.get("data");
};

const DataSheet = ({
  open,
  activeTab,
  setAddRowFunction,
  setAddColumnFunction,
  data,
}) => {
  const [columnDefs, setColumnDefs] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const gridRef = useRef();
  const [selectedCellValue, setSelectedCellValue] = useState("");

  useEffect(() => {
    if (data) {
      if (data.headers && Array.isArray(data.headers)) {
        const formattedColumns = data.headers.map((header) => ({
          headerName: header,
          field: header,
          sortable: true,
          filter: true,
        }));
        setColumnDefs(formattedColumns);
      }

      if (Array.isArray(data.rows)) {
        setRowData(data.rows);
      }
    }
  }, [data]);

  useEffect(() => {
    setAddRowFunction(() => addRow);
    setAddColumnFunction(() => addColumn);
  }, [columnDefs, rowData]);

  const addRow = () => {
    const newRow = columnDefs.reduce((acc, col) => {
      acc[col.field] = "";
      return acc;
    }, {});
    setRowData([...rowData, newRow]);
  };

  const addColumn = () => {
    const newColumnKey = `Column${columnDefs.length + 1}`;
    const newColumn = {
      field: newColumnKey,
      headerName: newColumnKey,
      editable: true,
    };
    setColumnDefs([...columnDefs, newColumn]);
    const updatedRowData = rowData.map((row) => ({
      ...row,
      [newColumnKey]: "",
    }));
    setRowData(updatedRowData);
  };

  const onCellClicked = (event) => {
    setSelectedCellValue(event.value || "");
  };

  const selectColumn = (column) => {
    if (!selectedColumns.includes(column)) {
      setSelectedColumns([...selectedColumns, column]);
    }
  };

  const removeColumn = (column) => {
    setSelectedColumns(selectedColumns.filter((col) => col !== column));
  };

  const [charts, setCharts] = useState([]);

  const addChart = (chartId, ChartComponent) => {
    setCharts((prev) => {
      const alreadyExists = prev.some((c) => c.id === chartId);
      if (alreadyExists) return prev;
      return [...prev, { id: chartId, component: ChartComponent }];
    });
  };

  const renderViewBox = () => {
    switch (activeTab) {
      case "settings1":
        return <Engineering1 selectedCellValue={selectedCellValue} />;
      case "settings2":
        return (
          <Engineering2
            columnDefs={columnDefs}
            selectColumn={selectColumn}
            selectedColumns={selectedColumns}
            removeColumn={removeColumn}
          />
        );
      case "settings3":
        return <div>Settings 3 내용</div>;
      case "analysis1":
        return <Analysis1 />;
      case "result1":
        return <Result1 charts={charts} />;
      case "result2":
        return <Result2 />;
      case "result3":
        return <Result3 />;
      case "result4":
        return <Result4 addChart={addChart} />;
      default:
        return null;
    }
  };

  return (
    <div style={containerStyle(open)}>
      {/* 👇 AG Grid는 result1일 때는 숨김 */}
      {activeTab !== "result1" && (
        <div className="ag-theme-alpine" style={tableStyle}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{ flex: 1, sortable: true, filter: true }}
            rowHeight={28}
            headerHeight={30}
            // theme={myTheme}
            onCellClicked={onCellClicked}
          />
        </div>
      )}

      {/* 👇 Result1 포함 View 영역은 result1일 때 전체 width 차지 */}
      <div style={viewBoxStyle(activeTab)}>
        <ClipboardProvider>{renderViewBox()}</ClipboardProvider>
      </div>
    </div>
  );
};

// ✅ 스타일 정의
const containerStyle = (open) => ({
  display: "flex",
  flexDirection: "row",
  width: "97%",
  height: "100vh",
  marginLeft: open ? "120px" : "40px",
  transition: "margin-left 0.3s ease",
});

// AG Grid 기본 스타일 (숨김 처리할 땐 렌더링 자체를 제거)
const tableStyle = {
  flex: 0.5,
  transition: "flex 0.3s ease",
  height: "100vh",
  width: "95%",
  marginLeft: "40px",
};

// View 영역 스타일: result1이면 전체 확장
const viewBoxStyle = (activeTab) => ({
  flex: activeTab === "result1" ? 1 : 0.5,
  height: "100vh",
  backgroundColor: "#f5f5f5",
  borderLeft: "2px solid #ddd",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "18px",
  fontWeight: "bold",
});

export default DataSheet;
