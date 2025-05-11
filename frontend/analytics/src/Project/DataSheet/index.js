// import React, { useState, useRef, useEffect } from 'react';
// import { Box, Typography, IconButton } from '@mui/material';
// import Engineering1 from '../OutputView/Engineering1';
// import Engineering2 from '../OutputView/Engineering2';
// import Analysis1 from '../OutputView/Analysis1';
// import Result1 from '../OutputView/Result1';
// import Result2 from '../OutputView/Result2';
// import Result3 from '../OutputView/Result3';
// import Result4 from '../OutputView/Result4';
// import { ClipboardProvider } from '../ClipboardContext';

// import SaveIcon from '@mui/icons-material/Save';
// import RefreshIcon from '@mui/icons-material/Refresh';
// import DeleteIcon from '@mui/icons-material/Delete';
// import DownloadIcon from '@mui/icons-material/Download';
// import CircleIcon from '@mui/icons-material/Circle';

// import { AgGridReact } from 'ag-grid-react';
// import './style.css';
// import { openDB } from 'idb';

// const DataSheet = ({
//   open,
//   activeTab,
//   setAddRowFunction,
//   setAddColumnFunction,
//   data,
//   filename,
//   projectName,
//   projectId,
// }) => {
//   //indexed DB crud
//   const DB_NAME = 'AnalyticsDB';

//   const ensureObjectStoreExists = async (projectId) => {
//     const db = await openDB(DB_NAME, 1);
//     if (!db.objectStoreNames.contains(projectId)) {
//       db.close(); // 꼭 닫아야 upgrade 트리거됨
//       await openDB(DB_NAME, 1, {
//         upgrade(db) {
//           if (!db.objectStoreNames.contains(projectId)) {
//             db.createObjectStore(projectId);
//           }
//         },
//       });
//     }
//   };

//   // ✅ IndexedDB 조회
//   const getDataFromDB = async (projectId) => {
//     await ensureObjectStoreExists(projectId);
//     const db = await openDB(DB_NAME, 1);
//     const tx = db.transaction(projectId, 'readonly');
//     const store = tx.objectStore(projectId);
//     return await store.get('data');
//   };

//   // ✅ IndexedDB 저장
//   const saveDataToDB = async (projectId, data) => {
//     await ensureObjectStoreExists(projectId);
//     const db = await openDB(DB_NAME, 1);
//     const tx = db.transaction(projectId, 'readwrite');
//     const store = tx.objectStore(projectId);
//     await store.put(data, 'data');
//     await tx.done;
//   };

//   // IndexedDB 삭제 함수
//   const deleteDataFromDB = async (projectId) => {
//     const db = await ensureObjectStoreExists(projectId);
//     const tx = db.transaction(projectId, 'readwrite');
//     const store = tx.objectStore(projectId);
//     await store.delete('data');
//     await tx.done;
//     window.location.reload();
//     console.log(`✅ IndexedDB에서 ${projectId} 데이터 삭제 완료`);
//   };

//   const [columnDefs, setColumnDefs] = useState([]);
//   const [rowData, setRowData] = useState([]);
//   const [selectedColumns, setSelectedColumns] = useState([]);
//   const gridRef = useRef();
//   const [selectedCellValue, setSelectedCellValue] = useState('');

//   useEffect(() => {
//     if (data) {
//       if (data.headers && Array.isArray(data.headers)) {
//         const formattedColumns = data.headers.map((header) => ({
//           headerName: header,
//           field: header,
//           sortable: true,
//           filter: true,
//         }));
//         setColumnDefs(formattedColumns);
//       }

//       if (Array.isArray(data.rows)) {
//         setRowData(data.rows);
//       }
//     }
//   }, [data]);

//   useEffect(() => {
//     setAddRowFunction(() => addRow);
//     setAddColumnFunction(() => addColumn);
//   }, [columnDefs, rowData]);

//   const addRow = () => {
//     const newRow = columnDefs.reduce((acc, col) => {
//       acc[col.field] = '';
//       return acc;
//     }, {});
//     setRowData([...rowData, newRow]);
//   };

//   const addColumn = () => {
//     const newColumnKey = `Column${columnDefs.length + 1}`;
//     const newColumn = {
//       field: newColumnKey,
//       headerName: newColumnKey,
//       editable: true,
//     };
//     setColumnDefs([...columnDefs, newColumn]);
//     const updatedRowData = rowData.map((row) => ({
//       ...row,
//       [newColumnKey]: '',
//     }));
//     setRowData(updatedRowData);
//   };

//   const onCellClicked = (event) => {
//     setSelectedCellValue(event.value || '');
//   };

//   const selectColumn = (column) => {
//     if (!selectedColumns.includes(column)) {
//       setSelectedColumns([...selectedColumns, column]);
//     }
//   };

//   const removeColumn = (column) => {
//     setSelectedColumns(selectedColumns.filter((col) => col !== column));
//   };

//   const [charts, setCharts] = useState([]);

//   const addChart = (chartId, ChartComponent) => {
//     setCharts((prev) => {
//       const alreadyExists = prev.some((c) => c.id === chartId);
//       if (alreadyExists) return prev;
//       return [...prev, { id: chartId, component: ChartComponent }];
//     });
//   };

//   //우측 결과 박스 렌더링
//   const renderViewBox = () => {
//     switch (activeTab) {
//       case 'settings1':
//         return <Engineering1 selectedCellValue={selectedCellValue} />;
//       case 'settings2':
//         return (
//           <Engineering2
//             columnDefs={columnDefs}
//             selectColumn={selectColumn}
//             selectedColumns={selectedColumns}
//             removeColumn={removeColumn}
//           />
//         );
//       case 'settings3':
//         return <div>Settings 3 내용</div>;
//       case 'analysis1':
//         return <Analysis1 />;
//       case 'result1':
//         return <Result1 charts={charts} />;
//       case 'result2':
//         return <Result2 />;
//       case 'result3':
//         return <Result3 />;
//       case 'result4':
//         return <Result4 addChart={addChart} />;
//       default:
//         return null;
//     }
//   };

//   // 저장 버튼
//   const handleSave = async () => {
//     const headers = columnDefs.map((col) => col.field);
//     const updatedData = { headers, rows: rowData };
//     await saveDataToDB(projectId, updatedData); // ✅ projectId 포함
//     await handleDBServerSave();
//     alert('Data Saved');
//   };

//   // 삭제 버튼
//   const handleDelete = async () => {
//     const confirmed = window.confirm('Are you sure you want to delete it?');
//     if (!confirmed) return;
//     await deleteDataFromDB(projectId); // ✅ projectId 포함
//     setColumnDefs([]);
//     setRowData([]);
//     alert('Data Deleted');
//   };

//   // Refresh
//   const handleRefresh = () => {
//     window.location.reload();
//   };

//   // DB save to mongoDB
//   const handleDBServerSave = async () => {
//     const formData = new FormData();
//     formData.append('projectName', projectName ?? '');
//     formData.append('filename', filename ?? '');
//     formData.append('headers', JSON.stringify(columnDefs.map((col) => col.field)));
//     formData.append('rows', JSON.stringify(rowData));

//     try {
//       const res = await fetch('http://localhost:8000/projectdata/save', {
//         method: 'POST',
//         body: formData,
//       });
//       const result = await res.json();
//       alert(result.message);
//     } catch (error) {
//       console.error('MongoDB 저장 오류:', error);
//       alert('MongoDB 저장 중 오류 발생');
//     }
//   };

//   // 비어 있을 때는 더미 데이터
//   useEffect(() => {
//     if (
//       data &&
//       data.headers &&
//       Array.isArray(data.headers) &&
//       data.rows &&
//       Array.isArray(data.rows)
//     ) {
//       const formattedColumns = data.headers.map((header) => ({
//         headerName: header,
//         field: header,
//         sortable: true,
//         filter: true,
//       }));
//       setColumnDefs(formattedColumns);
//       setRowData(data.rows);
//     } else {
//       const dummyHeaders = Array.from({ length: 10 }, (_, i) => `Column${i + 1}`);
//       const dummyColumns = dummyHeaders.map((header) => ({
//         headerName: header,
//         field: header,
//         sortable: true,
//         filter: true,
//       }));
//       const dummyRows = Array.from({ length: 50 }, () =>
//         dummyHeaders.reduce((acc, header) => {
//           acc[header] = '';
//           return acc;
//         }, {})
//       );
//       setColumnDefs(dummyColumns);
//       setRowData(dummyRows);
//     }
//   }, [data]);

//   return (
//     <>
//       <Box
//         sx={{
//           width: '100%',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           mt: 1,
//           px: 2,
//           boxSizing: 'border-box',
//         }}
//       >
//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: 2,
//           }}
//         >
//           <Typography
//             sx={{
//               fontSize: '14px',
//               fontFamily: 'Noto Sans KR',
//               fontWeight: 500,
//             }}
//           >
//             {projectName || 'Untitled'} &gt;
//           </Typography>
//           <Typography
//             sx={{
//               fontSize: '12px',
//               fontFamily: 'Noto Sans KR',
//               color: 'gray',
//             }}
//           >
//             DATA: {filename || 'None'}
//           </Typography>
//         </Box>

//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//           <IconButton color="primary" onClick={handleSave}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <CircleIcon sx={{ fontSize: 10, color: '#316193' }} />
//               <Typography variant="body2" color="#316193" fontFamily="NotoSans KR">
//                 save
//               </Typography>
//             </Box>
//           </IconButton>
//           <IconButton color="primary" onClick={handleRefresh}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <CircleIcon sx={{ fontSize: 10, color: '#4ECC65' }} />
//               <Typography variant="body2" color="#27C93F" fontFamily="NotoSans KR">
//                 refresh
//               </Typography>
//             </Box>
//           </IconButton>
//           <IconButton color="primary" onClick={handleDelete}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <CircleIcon sx={{ fontSize: 10, color: '#FF5F56' }} />
//               <Typography variant="body2" color="#FF5F56" fontFamily="NotoSans KR">
//                 delete
//               </Typography>
//             </Box>
//           </IconButton>
//           <IconButton color="primary" onClick={handleDelete}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <CircleIcon sx={{ fontSize: 10, color: '#FFBD2E' }} />
//               <Typography variant="body2" color="#FFBD2E" fontFamily="NotoSans KR">
//                 download
//               </Typography>
//             </Box>
//           </IconButton>
//         </Box>
//       </Box>
//       {/* table style */}
//       <div style={containerStyle}>
//         {activeTab !== 'result1' && (
//           <div className="ag-theme-alpine" style={tableStyle(activeTab)}>
//             <AgGridReact
//               ref={gridRef}
//               rowData={rowData}
//               columnDefs={columnDefs}
//               defaultColDef={{
//                 flex: 1,
//                 sortable: true,
//                 filter: true,
//                 minWidth: 150,
//                 resizable: true,
//                 editable: true,
//               }}
//               rowHeight={28}
//               headerHeight={30}
//               // theme={myTheme}
//               onCellClicked={onCellClicked}
//             />
//           </div>
//         )}

//         {/* view box style */}
//         <div style={viewBoxStyle(activeTab)}>
//           <ClipboardProvider>{renderViewBox()}</ClipboardProvider>
//         </div>
//       </div>
//     </>
//   );
// };

// const containerStyle = {
//   // display: 'flex',
//   flexDirection: 'row',
//   width: '90w',
//   height: '80vh',
//   overflow: 'hidden',
// };

// const tableStyle = (activeTab) => ({
//   // display: 'flex',
//   flex: activeTab === 'result1' ? 1 : 0.5,
//   height: '100%',
//   width: '99%',
//   overflow: 'hidden',
//   margin: '0 auto',
// });

// const viewBoxStyle = (activeTab) => ({
//   flex: activeTab === 'result1' ? 1 : 0.5,
//   display: 'flex',
//   // height: '100%',
//   overflowY: 'auto',
//   backgroundColor: '#f5f5f5',
//   borderLeft: activeTab === 'result1' ? 'none' : '2px solid #ddd',
//   padding: activeTab === 'result1' ? 0 : '20px',
//   flexDirection: 'column',
//   alignItems: 'center',
//   // justifyContent: 'center',
// });

// export default DataSheet;
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
import CircleIcon from '@mui/icons-material/Circle';

import { AgGridReact } from 'ag-grid-react';
import './style.css';
import { openDB } from 'idb';

const DB_NAME = 'AnalyticsDB';

const ensureObjectStoreExists = async (projectId) => {
  const db = await openDB(DB_NAME, 1);
  if (!db.objectStoreNames.contains(projectId)) {
    db.close();
    await openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(projectId)) {
          db.createObjectStore(projectId);
        }
      },
    });
  }
};

const getDataFromDB = async (projectId) => {
  const db = await openDB(DB_NAME, 1);
  const tx = db.transaction(projectId, 'readonly');
  const store = tx.objectStore(projectId);
  return await store.get('data');
};

const saveDataToDB = async (projectId, data) => {
  await ensureObjectStoreExists(projectId);
  const db = await openDB(DB_NAME, 1);
  const tx = db.transaction(projectId, 'readwrite');
  const store = tx.objectStore(projectId);
  await store.put(data, 'data');
  await tx.done;
};

const DataSheet = ({
  open,
  activeTab,
  setAddRowFunction,
  setAddColumnFunction,
  data,
  filename,
  projectName,
  projectId,
}) => {
  //indexed DB crud
  // IndexedDB 삭제 함수
  const deleteDataFromDB = async (projectId) => {
    const db = await ensureObjectStoreExists(projectId);
    const tx = db.transaction(projectId, 'readwrite');
    const store = tx.objectStore(projectId);
    await store.delete('data');
    await tx.done;
    window.location.reload();
    console.log(`✅ IndexedDB에서 ${projectId} 데이터 삭제 완료`);
  };

  const [columnDefs, setColumnDefs] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const gridRef = useRef();
  const [selectedCellValue, setSelectedCellValue] = useState('');

  // useEffect(() => {
  //   if (data) {
  //     if (data.headers && Array.isArray(data.headers)) {
  //       const formattedColumns = data.headers.map((header) => ({
  //         headerName: header,
  //         field: header,
  //         sortable: true,
  //         filter: true,
  //       }));
  //       setColumnDefs(formattedColumns);
  //     }

  //     if (Array.isArray(data.rows)) {
  //       setRowData(data.rows);
  //     }
  //   }
  // }, [data]);

  // 데이터 로드 및 저장 처리
  useEffect(() => {
    if (data) {
      const formattedColumns = data.headers.map((header) => ({
        headerName: header,
        field: header,
        sortable: true,
        filter: true,
      }));
      setColumnDefs(formattedColumns);
      setRowData(data.rows);
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

  const handleSave = async () => {
    const updatedData = { headers: columnDefs.map((col) => col.field), rows: rowData };
    await saveDataToDB(projectId, updatedData); // IndexedDB에 저장
    alert('Data Saved');
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete it?');
    if (!confirmed) return;

    const db = await openDB(DB_NAME, 1);
    const tx = db.transaction(projectId, 'readwrite');
    const store = tx.objectStore(projectId);
    await store.delete('data');
    await tx.done;
    alert('Data Deleted');
    setRowData([]);
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircleIcon sx={{ fontSize: 10, color: '#316193' }} />
              <Typography variant="body2" color="#316193" fontFamily="NotoSans KR">
                save
              </Typography>
            </Box>
          </IconButton>
          <IconButton color="primary" onClick={handleRefresh}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircleIcon sx={{ fontSize: 10, color: '#4ECC65' }} />
              <Typography variant="body2" color="#27C93F" fontFamily="NotoSans KR">
                refresh
              </Typography>
            </Box>
          </IconButton>
          <IconButton color="primary" onClick={handleDelete}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircleIcon sx={{ fontSize: 10, color: '#FF5F56' }} />
              <Typography variant="body2" color="#FF5F56" fontFamily="NotoSans KR">
                delete
              </Typography>
            </Box>
          </IconButton>
          <IconButton color="primary" onClick={handleDelete}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircleIcon sx={{ fontSize: 10, color: '#FFBD2E' }} />
              <Typography variant="body2" color="#FFBD2E" fontFamily="NotoSans KR">
                download
              </Typography>
            </Box>
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
