import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import Engineering1 from '../OutputView/Engineering1';
import Engineering2 from '../OutputView/Engineering2';
import Analysis1 from '../OutputView/Analysis1';
import Result1 from '../OutputView/Result1';
import Result2 from '../OutputView/Result2';
import Result3 from '../OutputView/Result3';
import Result4 from '../OutputView/Result4';
import { ClipboardProvider } from '../ClipboardContext';

import SaveIcon from '@mui/icons-material/Save';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

import { AgGridReact } from 'ag-grid-react';
import './style.css';
import { openDB } from 'idb';

const DB_NAME = 'AnalyticsDB';
const STORE_NAME = 'uploadedData';

const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

// IndexedDB 조회 함수
const getDataFromDB = async () => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  return await store.get('data');
};

// IndexedDB 삭제 함수
const deleteDataFromDB = async () => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.delete('data');
  await tx.done;
  window.location.reload();
  console.log('IndexedDB에서 데이터 삭제 완료');
};

// IndexedDB 저장 함수
const saveDataToDB = async (data) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.put(data, 'data');
  await tx.done;
  // window.location.reload();
  console.log('✅ IndexedDB에 저장 완료:', data);
};

const DataSheet = ({
  open,
  activeTab,
  setAddRowFunction,
  setAddColumnFunction,
  data,
  filename,
  projectName,
}) => {
  const [columnDefs, setColumnDefs] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const gridRef = useRef();
  const [selectedCellValue, setSelectedCellValue] = useState('');

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
      acc[col.field] = '';
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
      [newColumnKey]: '',
    }));
    setRowData(updatedRowData);
  };

  const onCellClicked = (event) => {
    setSelectedCellValue(event.value || '');
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

  //우측 결과 박스 렌더링
  const renderViewBox = () => {
    switch (activeTab) {
      case 'settings1':
        return <Engineering1 selectedCellValue={selectedCellValue} />;
      case 'settings2':
        return (
          <Engineering2
            columnDefs={columnDefs}
            selectColumn={selectColumn}
            selectedColumns={selectedColumns}
            removeColumn={removeColumn}
          />
        );
      case 'settings3':
        return <div>Settings 3 내용</div>;
      case 'analysis1':
        return <Analysis1 />;
      case 'result1':
        return <Result1 charts={charts} />;
      case 'result2':
        return <Result2 />;
      case 'result3':
        return <Result3 />;
      case 'result4':
        return <Result4 addChart={addChart} />;
      default:
        return null;
    }
  };

  // indexed DB 삭제 핸들러
  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete it?');
    if (!confirmed) return;

    await deleteDataFromDB();
    setColumnDefs([]);
    setRowData([]);
    alert('Data Deleted');
  };

  // indexed DB 저장 핸들러
  const handleSave = async () => {
    const headers = columnDefs.map((col) => col.field);
    const updatedData = { headers, rows: rowData };
    await saveDataToDB(updatedData);
    await handleDBServerSave();
    alert('Data Saved');
  };

  // Refresh
  const handleRefresh = () => {
    window.location.reload();
  };

  // DB save to mongoDB
  const handleDBServerSave = async () => {
    const formData = new FormData();
    formData.append('projectName', projectName ?? '');
    formData.append('filename', filename ?? '');
    formData.append('headers', JSON.stringify(columnDefs.map((col) => col.field)));
    formData.append('rows', JSON.stringify(rowData));

    try {
      const res = await fetch('http://localhost:8000/projectdata/save', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      alert(result.message);
    } catch (error) {
      console.error('MongoDB 저장 오류:', error);
      alert('MongoDB 저장 중 오류 발생');
    }
  };

  // 비어 있을 때는 더미 데이터
  useEffect(() => {
    if (
      data &&
      data.headers &&
      Array.isArray(data.headers) &&
      data.rows &&
      Array.isArray(data.rows)
    ) {
      const formattedColumns = data.headers.map((header) => ({
        headerName: header,
        field: header,
        sortable: true,
        filter: true,
      }));
      setColumnDefs(formattedColumns);
      setRowData(data.rows);
    } else {
      const dummyHeaders = Array.from({ length: 10 }, (_, i) => `Column${i + 1}`);
      const dummyColumns = dummyHeaders.map((header) => ({
        headerName: header,
        field: header,
        sortable: true,
        filter: true,
      }));
      const dummyRows = Array.from({ length: 50 }, () =>
        dummyHeaders.reduce((acc, header) => {
          acc[header] = '';
          return acc;
        }, {})
      );
      setColumnDefs(dummyColumns);
      setRowData(dummyRows);
    }
  }, [data]);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 1,
          px: 2,
          boxSizing: 'border-box',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              fontFamily: 'Noto Sans KR',
              fontWeight: 500,
            }}
          >
            {projectName || 'Untitled'} &gt;
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              fontFamily: 'Noto Sans KR',
              color: 'gray',
            }}
          >
            DATA: {filename || 'None'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IconButton color="primary" onClick={handleSave}>
            <SaveIcon />
          </IconButton>
          <IconButton color="primary" onClick={handleRefresh}>
            <RefreshIcon />
          </IconButton>
          <IconButton color="primary" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
          <IconButton color="primary" onClick={handleDelete}>
            <DownloadIcon />
          </IconButton>
        </Box>
      </Box>
      {/* table style */}
      <div style={containerStyle}>
        {activeTab !== 'result1' && (
          <div className="ag-theme-alpine" style={tableStyle(activeTab)}>
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={{
                flex: 1,
                sortable: true,
                filter: true,
                minWidth: 150,
                resizable: true,
                editable: true,
              }}
              rowHeight={28}
              headerHeight={30}
              // theme={myTheme}
              onCellClicked={onCellClicked}
            />
          </div>
        )}

        {/* view box style */}
        <div style={viewBoxStyle(activeTab)}>
          <ClipboardProvider>{renderViewBox()}</ClipboardProvider>
        </div>
      </div>
    </>
  );
};

const containerStyle = {
  // display: 'flex',
  flexDirection: 'row',
  width: '90w',
  height: '80vh',
  overflow: 'hidden',
};

const tableStyle = (activeTab) => ({
  // display: 'flex',
  flex: activeTab === 'result1' ? 1 : 0.5,
  height: '100%',
  width: '99%',
  overflow: 'hidden',
  margin: '0 auto',
});

const viewBoxStyle = (activeTab) => ({
  flex: activeTab === 'result1' ? 1 : 0.5,
  display: 'flex',
  // height: '100%',
  overflowY: 'auto',
  backgroundColor: '#f5f5f5',
  borderLeft: activeTab === 'result1' ? 'none' : '2px solid #ddd',
  padding: activeTab === 'result1' ? 0 : '20px',
  flexDirection: 'column',
  alignItems: 'center',
  // justifyContent: 'center',
});

export default DataSheet;
