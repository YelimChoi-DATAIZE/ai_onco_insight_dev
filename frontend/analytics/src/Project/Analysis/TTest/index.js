// OneSampleTTestFlow.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormGroup,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Divider,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Background,
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  MiniMap,
  Controls,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
// import VariableNode from './nodes/VariableNode';
import TestMethodNode from './nodes/TestMethodNode';
import HypothesisNode from './nodes/HypothesisNode';
import MissingValueNode from './nodes/MissingValueNode';
import ExtraStatsNode from './nodes/ExtraStatsNode';
import AssumptionNode from './nodes/AssumptionNode';
import RunNode from './nodes/RunNode';
import PropTypes from 'prop-types';

import { AgGridReact } from 'ag-grid-react';
import '../../DataSheet/style.css';

const nodeTypes = {
  variableNode: VariableNode,
  testMethodNode: TestMethodNode,
  hypothesisNode: HypothesisNode,
  missingValueNode: MissingValueNode,
  extraStatsNode: ExtraStatsNode,
  assumptionNode: AssumptionNode,
  runNode: RunNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'VariableNode',
    position: { x: 0, y: 100 },
    data: { label: '종속변수 선택' },
  },
  {
    id: '2',
    type: 'VariableNode',
    position: { x: 200, y: 100 },
    data: { label: '검정 방법' },
  },
  {
    id: '3',
    type: 'VariableNode',
    position: { x: 400, y: 100 },
    data: { label: '가설 설정' },
  },
  {
    id: '4',
    type: 'VariableNode',
    position: { x: 600, y: 100 },
    data: { label: '결측값 처리' },
  },
  {
    id: '5',
    type: 'VariableNode',
    position: { x: 800, y: 100 },
    data: { label: '추가 통계' },
  },
  {
    id: '6',
    type: 'VariableNode',
    position: { x: 1000, y: 100 },
    data: { label: '가정 검증' },
  },
  {
    id: '7',
    type: 'RunNode',
    position: { x: 0, y: 200 },
    data: { label: 'Run' },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e4-5', source: '4', target: '5' },
  { id: 'e5-6', source: '5', target: '6' },
  { id: 'e6-7', source: '6', target: '7' },
];

const machineTableStyle = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: 'monospace',
    fontSize: '13px',
    backgroundColor: '#ffffff',
    color: '#00ff9c',
    boxShadow: '0 0 10px rgba(0, 255, 156, 0.1)',
  },
  th: {
    border: '1px solid #444',
    padding: '6px 8px',
    backgroundColor: '#ffffff',
    color: '#00bfff',
    fontWeight: 'normal',
    textAlign: 'center',
  },
  td: {
    border: '1px solid #444',
    padding: '6px 8px',
    textAlign: 'center',
    color: '#ccc',
  },
};

function VariableNode({ data }) {
  return (
    <div style={{ padding: 10, border: '1px solid #ccc', borderRadius: 6, background: '#fff' }}>
      <strong>{data.label}</strong>
    </div>
  );
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const OneSampleTTestFlow = ({ data }) => {
  console.log(data);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showAISuggestion, setShowAISuggestion] = useState(false);
  const [tabValue, setTabValue] = React.useState(0);

  const onNodeClick = (_, node) => {
    setSelectedNode(node);
  };

  const [columnDefs, setColumnDefs] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const gridRef = useRef();

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

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    // <Box
    //   sx={{
    //     width: '69.5vw',
    //     // maxWidth: 1250,
    //     // mx: 'auto',
    //     display: 'flex',
    //     flexDirection: 'column',
    //     fontSize: '13px',
    //     color: '#333',
    //     height: '37vh',
    //   }}
    // >
    //   TTEST Tool
    //   <ReactFlowProvider>
    //     {/* ⬆️ Flow 영역 */}
    //     <Box
    //       sx={{
    //         minHeight: '100%',
    //         width: '100%',
    //         bgcolor: '#ffffff',
    //         border: '1px solid #ddd',
    //       }}
    //     >
    //       <ReactFlow
    //         nodes={nodes}
    //         edges={edges}
    //         onNodesChange={onNodesChange}
    //         onEdgesChange={onEdgesChange}
    //         nodeTypes={nodeTypes}
    //         fitView
    //         onNodeClick={onNodeClick}
    //       >
    //         <Controls />
    //         <Background variant="dots" gap={16} size={1} />
    //       </ReactFlow>
    //     </Box>
    //     {selectedNode && (
    //       <Box
    //         sx={{
    //           flexShrink: 0, // 중요
    //           mt: 2,
    //           p: 2,
    //           // border: '1px solid #444',
    //           // borderRadius: 2,
    //           bgcolor: '#ffffff',
    //           fontFamily: 'monospace',
    //           color: '#00ff9c',
    //           fontSize: '13px',
    //           // boxShadow: '0 0 8px rgba(0,255,156,0.1)',
    //         }}
    //       >
    //         <Box
    //           sx={{
    //             display: 'flex',
    //             alignItems: 'center',
    //             justifyContent: 'space-between',
    //             mb: 2,
    //             borderBottom: '1px solid #333',
    //             pb: 1,
    //           }}
    //         >
    //           <Typography fontSize={16} fontWeight="bold" color="#00bfff">
    //             ▷ {selectedNode.data.label.toUpperCase()} CONFIG
    //           </Typography>

    //           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    //             <Typography component="span" fontSize={20}>
    //               🤖
    //             </Typography>
    //             <Box
    //               component="button"
    //               onClick={() => setShowAISuggestion((prev) => !prev)}
    //               sx={{
    //                 px: 1.5,
    //                 py: 0.5,
    //                 fontSize: '12px',
    //                 border: '1px solid #00bfff',
    //                 borderRadius: 1,
    //                 bgcolor: '#1e1e1e',
    //                 color: '#00bfff',
    //                 cursor: 'pointer',
    //                 '&:hover': {
    //                   bgcolor: '#263238',
    //                 },
    //               }}
    //             >
    //               AI Suggestion
    //             </Box>
    //           </Box>
    //         </Box>
    //         {selectedNode.data.label === '종속변수 선택' && (
    //           <TextField
    //             label="🔧 Variable Name"
    //             variant="outlined"
    //             fullWidth
    //             placeholder="e.g. blood_pressure"
    //             InputProps={{
    //               sx: {
    //                 color: '#00ff9c',
    //                 fontFamily: 'monospace',
    //                 bgcolor: '#1a1a1a',
    //               },
    //             }}
    //             InputLabelProps={{
    //               sx: { color: '#00bfff' },
    //             }}
    //             margin="dense"
    //           />
    //         )}

    //         {selectedNode.data.label === '종속변수 선택' && (
    //           <TextField
    //             label="변수명"
    //             variant="outlined"
    //             fullWidth
    //             placeholder="예: blood_pressure"
    //             margin="normal"
    //           />
    //         )}
    //         {selectedNode.data.label === '검정 방법' && (
    //           <TextField
    //             label="모집단 평균 (μ)"
    //             type="number"
    //             variant="outlined"
    //             fullWidth
    //             defaultValue={0}
    //             margin="normal"
    //           />
    //         )}

    //         {selectedNode.data.label === '가설 설정' && (
    //           <Box sx={{ mt: 2 }}>
    //             <Typography variant="text" gutterBottom>
    //               대립가설 방향
    //             </Typography>
    //             <RadioGroup row defaultValue="two-tailed">
    //               <FormControlLabel value="two-tailed" control={<Radio />} label="μ ≠ μ₀ (양측)" />
    //               <FormControlLabel value="less" control={<Radio />} label="μ < μ₀ (좌측)" />
    //               <FormControlLabel value="greater" control={<Radio />} label="μ > μ₀ (우측)" />
    //             </RadioGroup>
    //           </Box>
    //         )}

    //         {selectedNode.data.label === '결측값 처리' && (
    //           <FormControl fullWidth sx={{ mt: 2 }}>
    //             <InputLabel>결측값 처리 방식</InputLabel>
    //             <Select defaultValue="remove">
    //               <MenuItem value="remove">결측값 제거</MenuItem>
    //               <MenuItem value="mean">평균 대체</MenuItem>
    //               <MenuItem value="median">중앙값 대체</MenuItem>
    //             </Select>
    //           </FormControl>
    //         )}

    //         {selectedNode.data.label === '추가 통계' && (
    //           <FormGroup>
    //             <FormControlLabel
    //               control={<Checkbox defaultChecked />}
    //               label="신뢰구간 계산 (95%)"
    //             />
    //             <FormControlLabel control={<Checkbox />} label="효과크기 계산 (Cohen's d)" />
    //           </FormGroup>
    //         )}

    //         {selectedNode.data.label === '가정 검증' && (
    //           <FormGroup>
    //             <FormControlLabel control={<Checkbox />} label="정규성 검정 (Shapiro-Wilk)" />
    //           </FormGroup>
    //         )}
    //       </Box>
    //     )}{' '}
    //     {showAISuggestion && (
    //       <Box
    //         sx={{
    //           mt: 2,
    //           bgcolor: '#ffffff',
    //           border: '1px #333',
    //           borderRadius: '8px',
    //           p: 2,
    //           color: '#2b2b2b',
    //           fontFamily: 'monospace',
    //           // boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    //           position: 'relative',
    //         }}
    //       >
    //         <Typography
    //           // variant="subtitle2"
    //           fontSize="20px"
    //           sx={{
    //             color: '#aaa',
    //             mb: 1,
    //           }}
    //         >
    //           Suggested background terminal command
    //         </Typography>

    //         <Typography
    //           variant="body2"
    //           sx={{
    //             color: '#888',
    //             fontSize: '12px',
    //             mb: 1,
    //           }}
    //         >
    //           ~/Documents/workspace/ai-test-windsurf
    //         </Typography>

    //         <Box
    //           sx={{
    //             bgcolor: '#ffffff',
    //             borderRadius: '6px',
    //             px: 2,
    //             py: 1.5,
    //             fontSize: '15px',
    //             display: 'flex',
    //             alignItems: 'center',
    //             justifyContent: 'space-between',
    //             mb: 2,
    //           }}
    //         >
    //           <Box sx={{ color: '#1976d2' }}>
    //             <span style={{ color: '#1976d2' }}>$</span> npm run dev
    //           </Box>
    //           <Box
    //             component="button"
    //             sx={{
    //               background: 'transparent',
    //               border: 'none',
    //               cursor: 'pointer',
    //               color: '#aaa',
    //               '&:hover': { color: '#fff' },
    //             }}
    //             onClick={() => navigator.clipboard.writeText('npm run dev')}
    //           >
    //             📋
    //           </Box>
    //         </Box>

    //         <Typography variant="body2" sx={{ mb: 1 }}>
    //           Do you want to run this command?
    //         </Typography>

    //         <Box sx={{ display: 'flex', gap: 1 }}>
    //           <Box
    //             component="button"
    //             sx={{
    //               bgcolor: '#1976d2',
    //               color: '#fff',
    //               border: 'none',
    //               borderRadius: '4px',
    //               px: 2,
    //               py: 1,
    //               fontWeight: 'bold',
    //               cursor: 'pointer',
    //               '&:hover': {
    //                 bgcolor: '#1565c0',
    //               },
    //             }}
    //           >
    //             Accept
    //           </Box>
    //           <Box
    //             component="button"
    //             sx={{
    //               bgcolor: '#2c2c2c',
    //               color: '#eee',
    //               border: '1px solid #555',
    //               borderRadius: '4px',
    //               px: 2,
    //               py: 1,
    //               cursor: 'pointer',
    //               '&:hover': {
    //                 bgcolor: '#3a3a3a',
    //               },
    //             }}
    //           >
    //             Reject
    //           </Box>
    //         </Box>
    //       </Box>
    //     )}
    //     <Divider sx={{ my: 2 }} />
    //     <Box
    //       sx={{
    //         mt: 4,
    //         p: 2,
    //         bgcolor: '#ffffff',
    //         borderRadius: 2,
    //         color: '#3552E7',
    //         fontFamily: 'monospace',
    //         whiteSpace: 'pre-wrap',
    //         fontSize: '13px',
    //         overflowX: 'auto',
    //       }}
    //     >
    //       {`Descriptive statistics by group

    // group: java
    // vars  n   mean  sd    min  max  range  se
    // 1     2   1.5   0.71  1    2    1      0.5
    // 2     2   NA    NA    Inf  -Inf -Inf   NA
    // 3     2   89.5  0.71  89   90   1      0.5
    // 4     2   83.5  7.78  78   89   11     5.5

    // ------------------------------------------------------------

    // group: python
    // vars  n   mean  sd    min  max  range  se
    // 1     2   3.5   0.71  3    4    1      0.5
    // 2     2   NA    NA    Inf  -Inf -Inf   NA
    // 3     2   83.0  8.49  77   89   12     6.0
    // 4     2   72.0  8.49  66   78   12     6.0

    // ------------------------------------------------------------

    // group: R
    // vars  n   mean  sd    min  max  range  se
    // 1     1   5     NA    5    5    0      NA
    // 2     1   NA    NA    Inf  -Inf -Inf   NA
    // 3     1   89    NA    89   89   0      NA
    // 4     1   90    NA    90   90   0      NA`}
    //     </Box>{' '}
    //   </ReactFlowProvider>
    // </Box>
    <Box
      sx={{
        width: '98vw',
        height: '80vh',
        display: 'flex',
        gap: 2, // ← 두 박스 사이 간격 (8px * 2 = 16px)
        fontSize: '13px',
        color: '#333',
        px: 2, // 전체 좌우 패딩도 살짝
      }}
    >
      <ReactFlowProvider>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: '#ffffff',
            border: '1px solid #ddd',
            width: '80%',
            height: '40%',
          }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            onNodeClick={onNodeClick}
          >
            <Controls />
            <Background variant="dots" gap={16} size={1} />
          </ReactFlow>
          {/* Under tab */}
          <Box sx={{ borderTop: 1, borderColor: 'divider', mt: 2 }}>
            <Tabs value={tabValue} onChange={handleChange} aria-label="aggrid-tabs">
              <Tab label="data" {...a11yProps(0)} />
              <Tab label="result" {...a11yProps(1)} />
            </Tabs>
            <CustomTabPanel value={tabValue} index={0}>
              <Box className="ag-theme-alpine" sx={{ height: 300, width: '100%' }}>
                <AgGridReact
                  ref={gridRef}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={{
                    flex: 1,
                    sortable: true,
                    filter: true,
                    resizable: true,
                    editable: true,
                  }}
                  rowHeight={28}
                  headerHeight={30}
                />
              </Box>
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={1}>
              <Typography variant="body2">
                <Box
                  sx={{
                    mt: 4,
                    p: 2,
                    bgcolor: '#ffffff',
                    borderRadius: 2,
                    color: '#3552E7',
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                    fontSize: '13px',
                    overflowX: 'auto',
                  }}
                >
                  {`Descriptive statistics by group

    group: java
    vars  n   mean  sd    min  max  range  se
    1     2   1.5   0.71  1    2    1      0.5
    2     2   NA    NA    Inf  -Inf -Inf   NA
    3     2   89.5  0.71  89   90   1      0.5
    4     2   83.5  7.78  78   89   11     5.5

    ------------------------------------------------------------

    group: python
    vars  n   mean  sd    min  max  range  se
    1     2   3.5   0.71  3    4    1      0.5
    2     2   NA    NA    Inf  -Inf -Inf   NA
    3     2   83.0  8.49  77   89   12     6.0
    4     2   72.0  8.49  66   78   12     6.0

    ------------------------------------------------------------

    group: R
    vars  n   mean  sd    min  max  range  se
    1     1   5     NA    5    5    0      NA
    2     1   NA    NA    Inf  -Inf -Inf   NA
    3     1   89    NA    89   89   0      NA
    4     1   90    NA    90   90   0      NA`}
                </Box>{' '}
              </Typography>
            </CustomTabPanel>
          </Box>
        </Box>
      </ReactFlowProvider>

      {/* 우측: Sidebar */}
      <Box
        sx={{
          width: '400px',
          height: '100%',
          bgcolor: '#ffffff',
          color: '#00ff9c',
          fontFamily: 'monospace',
          p: 2,
          overflowY: 'auto',
          borderLeft: '1px solid #444',
        }}
      >
        <Typography fontWeight="bold" fontSize={14} color="#00bfff" mb={1}>
          ▷ CONFIG
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
          {selectedNode ? (
            <Box
              sx={{
                bgcolor: '#ffffff',
                // border: '1px solid #ddd',
                borderRadius: 2,
                p: 2,
                fontSize: '13px',
              }}
            >
              {/* 노드 라벨 출력 */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                  borderBottom: '1px solid #ccc',
                  pb: 1,
                }}
              >
                <Typography fontSize={16} fontWeight="bold" color="#00bfff">
                  ▷ {selectedNode.data.label.toUpperCase()} 설정
                </Typography>
              </Box>

              {/* 조건부 렌더링 */}
              {selectedNode.data.label === '종속변수 선택' && (
                <TextField
                  fullWidth
                  label="🔧 Variable Name"
                  placeholder="예: blood_pressure"
                  variant="outlined"
                  margin="dense"
                  InputProps={{
                    sx: {
                      bgcolor: '#f5f5f5',
                      color: '#333',
                      fontFamily: 'monospace',
                    },
                  }}
                  InputLabelProps={{ sx: { color: '#00bfff' } }}
                />
              )}

              {selectedNode.data.label === '검정 방법' && (
                <TextField
                  fullWidth
                  label="모집단 평균 (μ)"
                  type="number"
                  defaultValue={0}
                  variant="outlined"
                  margin="dense"
                  InputProps={{
                    sx: {
                      bgcolor: '#f5f5f5',
                      color: '#333',
                      fontFamily: 'monospace',
                    },
                  }}
                  InputLabelProps={{ sx: { color: '#00bfff' } }}
                />
              )}

              {selectedNode.data.label === '추가 통계' && (
                <FormGroup sx={{ mt: 2 }}>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="신뢰구간 계산 (95%)"
                  />
                  <FormControlLabel control={<Checkbox />} label="효과크기 (Cohen's d)" />
                </FormGroup>
              )}
            </Box>
          ) : (
            <Typography fontSize={12} color="#888" mt={2}>
              ⛔ 노드를 클릭하면 설정이 표시됩니다.
            </Typography>
          )}
        </Box>
        <Divider flexItem sx={{ borderColor: '#ddd' }} />
        {/* <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}> */}
        {/* 🤖 + 버튼 라인 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography component="span" fontSize={20}>
            🤖
          </Typography>
          <Box
            component="button"
            onClick={() => setShowAISuggestion((prev) => !prev)}
            sx={{
              px: 1.5,
              py: 0.5,
              fontSize: '12px',
              border: '1px solid #00bfff',
              borderRadius: 1,
              bgcolor: '#1e1e1e',
              color: '#00bfff',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: '#263238',
              },
            }}
          >
            AI Suggestion
          </Box>
        </Box>

        {/* 아래로 나오는 suggestion 박스 */}
        {showAISuggestion && (
          <Box
            sx={{
              mt: 1,
              bgcolor: '#ffffff',
              border: '1px solid #ccc',
              borderRadius: '8px',
              p: 2,
              color: '#2b2b2b',
              fontFamily: 'monospace',
              width: '100%',
            }}
          >
            <Typography fontSize="20px" color="#aaa" mb={1}>
              Suggested background terminal command
            </Typography>

            <Typography variant="body2" sx={{ color: '#888', fontSize: '12px', mb: 1 }}>
              ~/Documents/workspace/ai-test-windsurf
            </Typography>

            <Box
              sx={{
                bgcolor: '#f9f9f9',
                borderRadius: '6px',
                px: 2,
                py: 1.5,
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2,
              }}
            >
              <Box sx={{ color: '#1976d2' }}>
                <span style={{ color: '#1976d2' }}>$</span> npm run dev
              </Box>
              <Box
                component="button"
                sx={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#aaa',
                  '&:hover': { color: '#555' },
                }}
                onClick={() => navigator.clipboard.writeText('npm run dev')}
              >
                📋
              </Box>
            </Box>

            <Typography variant="body2" sx={{ mb: 1 }}>
              Do you want to run this command?
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Box
                component="button"
                sx={{
                  bgcolor: '#1976d2',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  px: 2,
                  py: 1,
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: '#1565c0',
                  },
                }}
              >
                Accept
              </Box>
              <Box
                component="button"
                sx={{
                  bgcolor: '#2c2c2c',
                  color: '#eee',
                  border: '1px solid #555',
                  borderRadius: '4px',
                  px: 2,
                  py: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: '#3a3a3a',
                  },
                }}
              >
                Reject
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default OneSampleTTestFlow;
