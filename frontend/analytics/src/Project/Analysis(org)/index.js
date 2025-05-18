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
import PropTypes from 'prop-types';

import { AgGridReact } from 'ag-grid-react';
import '../DataSheet/style.css';

import { ttest_flow } from './AnalysisFlow';
import AISuggestion from './AISuggestionTab';
import { nodeSettingComponents } from './AnalysisFlow/Parameter/TTest';

//node types _ depend on analysis
const nodeTypes = {
  variableNode: VariableNode,
};

//node style
function VariableNode({ data }) {
  return (
    <div style={{ padding: 10, border: '1px solid #ccc', borderRadius: 6, background: '#fff' }}>
      <strong>{data.label}</strong>
    </div>
  );
}

//result table style
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

//tab panel style
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

//main component
const OneSampleTTestFlow = ({ data }) => {
  console.log(data);
  const [nodes, setNodes, onNodesChange] = useNodesState(ttest_flow.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(ttest_flow.edges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showAISuggestion, setShowAISuggestion] = useState(false);

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

  const [resultTabValue, setResultTabValue] = useState(0);
  const [configTabValue, setConfigTabValue] = useState(0);

  const handleResultTabChange = (_, newValue) => {
    setResultTabValue(newValue);
  };

  const handleConfigTabChange = (_, newValue) => {
    setConfigTabValue(newValue);
  };

  return (
    <Box
      sx={{
        width: '98vw',
        height: '80vh',
        display: 'flex',
        gap: 2,
        fontSize: '13px',
        color: '#333',
        px: 2,
      }}
    >
      {/* Left Part(Analysis Flow + Under Tab) */}
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
            // fitView
            defaultViewport={{ x: 300, y: 0, zoom: 0.8 }}
            onNodeClick={onNodeClick}
          >
            <Controls />
            <Background variant="dots" gap={16} size={1} />
          </ReactFlow>
          {/* Under Tab: data tab + analysis result tab */}
          <Box sx={{ borderTop: 1, borderColor: 'divider', mt: 2 }}>
            <Tabs value={resultTabValue} onChange={handleResultTabChange} aria-label="aggrid-tabs">
              <Tab label="data" {...a11yProps(0)} />
              <Tab label="result (table)" {...a11yProps(1)} />
              <Tab label="result (plot)" {...a11yProps(2)} />
            </Tabs>
            {/* Data tab: data table */}
            <CustomTabPanel value={resultTabValue} index={0}>
              <Box className="ag-theme-alpine" sx={{ height: 400, width: '100%' }}>
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
            {/* Result tab: analysis result table */}
            <CustomTabPanel value={resultTabValue} index={1}>
              <Typography variant="body2">
                <Box
                  sx={{
                    // mt: 4,
                    p: 2,
                    bgcolor: '#ffffff',
                    borderRadius: 2,
                    color: '#3552E7',
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                    fontSize: '13px',
                    overflowX: 'auto',
                    overflowY: 'auto',
                    maxHeight: '400px',
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
            <CustomTabPanel value={resultTabValue} index={2}>
              <Typography variant="body2">
                <Box
                  sx={{
                    // mt: 4,
                    p: 2,
                    bgcolor: '#ffffff',
                    borderRadius: 2,
                    color: '#3552E7',
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                    fontSize: '13px',
                    overflowX: 'auto',
                    overflowY: 'auto',
                    maxHeight: '400px',
                  }}
                >
                  plot
                </Box>{' '}
              </Typography>
            </CustomTabPanel>
          </Box>
        </Box>
      </ReactFlowProvider>

      <Divider orientation="vertical" flexItem sx={{ borderColor: '#ddd' }} />
      {/* Right SideBar: Parameter tab + AI suggestion tab --> component 화 필요*/}
      <Box
        sx={{
          width: '400px',
          height: '100%',
          bgcolor: '#ffffff',
          color: '#00ff9c',
          fontFamily: 'monospace',
          p: 2,
          overflowY: 'auto',
        }}
      >
        <Box sx={{ mt: -2, borderColor: 'divider' }}>
          <Tabs value={configTabValue} onChange={handleConfigTabChange} aria-label="aggrid-tabs">
            <Tab label="parameter" {...a11yProps(0)} />
            <Tab label="AI suggestion" {...a11yProps(1)} />
          </Tabs>
          <CustomTabPanel value={configTabValue} index={0}>
            {selectedNode ? (
              <Box sx={{ bgcolor: '#ffffff', fontSize: '13px' }}>
                <Typography variant="body2" sx={{ color: '#888', fontSize: '12px', mb: 1 }}>
                  ▷ {selectedNode.data.label.toUpperCase()} 설정
                </Typography>

                {/* 조건 분기 없이 컴포넌트 매핑으로 대체 */}
                {(() => {
                  const Component = nodeSettingComponents[selectedNode.data.label];
                  return Component ? <Component /> : <Typography>설정 없음</Typography>;
                })()}
              </Box>
            ) : (
              <Typography fontSize={12} color="#888" mt={2}>
                노드를 클릭하면 설정이 표시됩니다.
              </Typography>
            )}
          </CustomTabPanel>
          {/* AI suggestion tab */}
          <CustomTabPanel value={configTabValue} index={1}>
            <AISuggestion />
          </CustomTabPanel>
        </Box>
      </Box>
    </Box>
  );
};

export default OneSampleTTestFlow;
