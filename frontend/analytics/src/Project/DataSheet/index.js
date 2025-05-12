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
import { saveProjectData, deleteProjectData } from '../../utils/indexedDB.js';

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
  const [columnDefs, setColumnDefs] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const gridRef = useRef();
  const [selectedCellValue, setSelectedCellValue] = useState('');

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
    const headers = columnDefs.map((col) => col.field);
    const updatedData = {
      headers,
      rows: rowData,
      filename, // 현재 filename 상태 포함
    };

    await saveProjectData(projectId, updatedData);
    alert('✅ 데이터가 저장되었습니다.');
    console.log('💾 Saved to IndexedDB:', updatedData);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('정말로 이 데이터를 삭제하시겠습니까?');
    if (!confirmed) return;

    await deleteProjectData(projectId);
    setColumnDefs([]);
    setRowData([]);
    alert('✅ 데이터가 삭제되었습니다.');
  };

  // Refresh
  const handleRefresh = () => {
    window.location.reload();
  };

  // // DB save to mongoDB
  // const handleDBServerSave = async () => {
  //   const formData = new FormData();
  //   formData.append('projectName', projectName ?? '');
  //   formData.append('filename', filename ?? '');
  //   formData.append('headers', JSON.stringify(columnDefs.map((col) => col.field)));
  //   formData.append('rows', JSON.stringify(rowData));

  //   try {
  //     const res = await fetch('http://localhost:8000/projectdata/save', {
  //       method: 'POST',
  //       body: formData,
  //     });
  //     const result = await res.json();
  //     alert(result.message);
  //   } catch (error) {
  //     console.error('MongoDB 저장 오류:', error);
  //     alert('MongoDB 저장 중 오류 발생');
  //   }
  // };

  //entity extraction
  const extractEntities = async (text) => {
    try {
      console.log('📤 요청 보냄:', text);

      const response = await fetch('http://10.0.3.6:8000/dataizeai_api/extract_entities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const result = await response.json();

      console.log('✅ 추출 성공:', result);
      return result;
    } catch (error) {
      console.error('❌ 엔티티 추출 오류:', error);
      return [];
    }
  };

  // const annotateColumnEntities = async (targetColumn) => {
  //   const entityColField = `${targetColumn}_entities`;

  //   // 1. 컬럼이 없으면 추가
  //   const exists = columnDefs.some((col) => col.field === entityColField);
  //   if (!exists) {
  //     const newColDef = {
  //       headerName: `${targetColumn} Entities`,
  //       field: entityColField,
  //       flex: 1,
  //       editable: false,
  //       cellRenderer: (params) => {
  //         const entities = params.value;
  //         if (!entities || !Array.isArray(entities)) return '';
  //         return entities
  //           .filter((e) => e.matched)
  //           .map((e) => e.text)
  //           .join(', ');
  //       },
  //     };
  //     setColumnDefs((prev) => [...prev, newColDef]);
  //   }

  //   // 2. 각 row의 해당 컬럼에 대해 API 호출
  //   const updatedRows = await Promise.all(
  //     rowData.map(async (row) => {
  //       const text = row[targetColumn];
  //       const entities = await extractEntities(text);
  //       return {
  //         ...row,
  //         [entityColField]: entities,
  //       };
  //     })
  //   );

  //   setRowData(updatedRows);

  //   // 3. IndexedDB 저장 (headers에 새로운 컬럼 추가 포함)
  //   const updatedHeaders = [...new Set([...columnDefs.map((col) => col.field), entityColField])];

  //   await saveProjectData(projectId, {
  //     headers: updatedHeaders,
  //     rows: updatedRows,
  //     filename,
  //   });

  //   alert('✅ 엔티티가 추출되어 저장되었습니다.');
  // };

  const annotateColumnEntitiesWithFlags = async (targetColumn) => {
    const allEntitySet = new Set(); // 전체 고유 엔티티 모으기

    // 1. 먼저 모든 행에 대해 API 호출 & entity 저장
    const annotatedRows = await Promise.all(
      rowData.map(async (row) => {
        const text = row[targetColumn];
        const entities = await extractEntities(text);

        const matchedEntities = entities.filter((e) => e.matched && e.text).map((e) => e.text);
        matchedEntities.forEach((text) => allEntitySet.add(text));

        return {
          ...row,
          [`${targetColumn}_entities`]: entities,
          _matchedTexts: matchedEntities, // 임시로 담아둠
        };
      })
    );

    const allEntityList = Array.from(allEntitySet); // 고유한 엔티티 텍스트 리스트

    // 2. 각 행에 대해 dummy 컬럼 추가
    const rowsWithFlags = annotatedRows.map((row) => {
      const newRow = { ...row };
      allEntityList.forEach((entityText) => {
        newRow[`ent_${entityText}`] = row._matchedTexts.includes(entityText) ? 1 : 0;
      });
      delete newRow._matchedTexts; // 임시필드 제거
      return newRow;
    });

    // 3. columnDefs에 새 컬럼들 추가
    const newEntityColumns = allEntityList.map((text) => ({
      headerName: text,
      field: `ent_${text}`,
      editable: false,
      sortable: true,
      filter: true,
    }));

    setColumnDefs((prev) => [...prev, ...newEntityColumns]);
    setRowData(rowsWithFlags);

    // 4. IndexedDB에 저장
    await saveProjectData(projectId, {
      headers: [...columnDefs.map((col) => col.field), ...newEntityColumns.map((c) => c.field)],
      rows: rowsWithFlags,
      filename,
    });

    alert('✅ 엔티티 더미 컬럼 생성 및 저장 완료');
  };

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
          <IconButton
            color="primary"
            onClick={() => annotateColumnEntitiesWithFlags('CLNC_TEST_ENG_TITLE')}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircleIcon sx={{ fontSize: 10, color: '#007FFF' }} />
              <Typography variant="body2" color="#007FFF" fontFamily="NotoSans KR">
                extract entities
              </Typography>
            </Box>
          </IconButton>

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
                minWidth: 250,
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
