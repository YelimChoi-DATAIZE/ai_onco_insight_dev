// import React, { useState, useMemo, useRef, useCallback } from 'react';
// import { Grid, Button, Paper, Typography, Box, TextField } from '@mui/material';
// import data from './mcode_data_json.json';
// import { AgGridReact } from 'ag-grid-react';
// import {
//   ClientSideRowModelModule,
//   // ModuleRegistry,
//   RowSelectionModule,
//   // AllCommunityModule,
//   // themeQuartz,
// } from 'ag-grid-community';

// // ModuleRegistry.registerModules([AllCommunityModule]);

// // const myTheme = themeQuartz.withParams({
// //   backgroundColor: "rgb(249, 245, 227)",
// //   foregroundColor: "rgb(126, 46, 132)",
// //   headerTextColor: "rgb(204, 245, 172)",
// //   headerBackgroundColor: "rgb(209, 64, 129)",
// //   oddRowBackgroundColor: "rgb(0, 0, 0, 0.03)",
// //   headerColumnResizeHandleColor: "rgb(126, 46, 132)",
// //   fontFamily: "serif",
// //   headerFontFamily: "Brush Script MT",
// //   cellFontFamily: "monospace",
// // });

// const ColumnSelect = ({}) => {
//   const [selectedMmmData, setSelectedMmmData] = useState([]); // ✅ 선택된 데이터 저장
//   const [searchText, setSearchText] = useState(''); // ✅ 검색어 상태
//   const [filteredData, setFilteredData] = useState(data); // ✅ 검색된 데이터 저장
//   const gridRef = useRef();

//   // ✅ 검색 기능: 검색창 입력 시 데이터 필터링
//   const onFilterTextChange = (event) => {
//     const value = event.target.value.toLowerCase();
//     setSearchText(value);
//     setFilteredData(data.filter((row) => row['description'].toLowerCase().includes(value)));
//   };

//   // ✅ AgGrid 선택 핸들러 (선택된 모든 행 데이터 저장)
//   const onSelectionChanged = useCallback(() => {
//     const selectedNodes = gridRef.current.api.getSelectedNodes();
//     const selectedRows = selectedNodes.map((node) => node.data);
//     setSelectedMmmData(selectedRows);
//   }, []);

//   const mmmcolumnDefs = useMemo(
//     () => [
//       {
//         field: 'Value Set Name',
//         headerName: 'Value Set Name',
//         checkboxSelection: true,
//       },
//       { field: 'Code System', headerName: 'Code System' },
//       { field: 'Logical Definition', headerName: 'Logical Definition' },
//       { field: 'Code', headerName: 'Code' },
//       { field: 'description', headerName: 'Description' },
//     ],
//     []
//   );

//   const rowSelection = useMemo(() => {
//     return {
//       mode: 'multiRow',
//       checkboxes: false,
//       headerCheckbox: false,
//       enableSelectionWithoutKeys: true,
//       enableClickSelection: true,
//     };
//   }, []);

//   return (
//     <>
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'flex-start',
//           gap: '20px',
//           width: '250%',
//           margin: '0 auto',
//           mb: 5,
//         }}
//       >
//         <TextField
//           label="Search Description"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={searchText}
//           onChange={onFilterTextChange}
//         />
//         <div className="ag-theme-alpine" style={{ width: '100%', height: '400px' }}>
//           <AgGridReact
//             ref={gridRef}
//             rowData={filteredData}
//             columnDefs={mmmcolumnDefs}
//             rowSelection={rowSelection}
//             onSelectionChanged={onSelectionChanged}
//             defaultColDef={{
//               resizable: true,
//               sortable: true,
//               filter: true,
//             }}
//             // theme={myTheme}
//           />
//         </div>
//       </Box>

//       {/* 하단 Selected Data */}
//       <Typography variant="h6">Selected Data</Typography>
//       {selectedMmmData.length > 0 ? (
//         <div className="ag-theme-alpine" style={{ width: '250%', height: '200px' }}>
//           <AgGridReact
//             rowData={selectedMmmData}
//             columnDefs={mmmcolumnDefs}
//             rowSelection="none"
//             defaultColDef={{
//               resizable: true,
//               sortable: true,
//               filter: true,
//             }}
//           />
//         </div>
//       ) : (
//         <Typography variant="body2" color="textSecondary">
//           No data selected
//         </Typography>
//       )}
//     </>
//   );
// };

// export default ColumnSelect;
