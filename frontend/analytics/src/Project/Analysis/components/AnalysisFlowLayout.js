import React, { useState, useRef, useEffect } from 'react';
import { Box, Tabs, Tab, Typography, Divider } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
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
import { AgGridReact } from 'ag-grid-react';
import PropTypes from 'prop-types';
import { AgCharts } from 'ag-charts-react';
import { Handle, Position } from '@xyflow/react';

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

const nodeTypes = {
  variableNode: ({ data }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '200px',
        height: '60px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#ffffff',
        fontFamily: 'Noto Sans KR',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          backgroundColor: '#3163C2',
          width: '50px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />

      <div style={{ padding: '8px 12px' }}>
        <div style={{ fontSize: '13px', fontWeight: 500, color: '#333' }}>{data.label}</div>
        {/* <div style={{ fontSize: '11px', color: '#888' }}>100 RECORDS</div> */}
      </div>

      <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
      <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
    </div>
  ),

  RunNode: ({ data }) => (
    <div
      style={{
        width: '200px',
        height: '60px',
        borderRadius: '8px',
        backgroundColor: '#3163C2',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        position: 'relative',
      }}
    >
      {data.label}
      <PlayCircleOutlineIcon />

      <Handle type="target" position={Position.Left} style={{ background: '#fff' }} />
    </div>
  ),
};

const AnalysisFlowLayout = ({
  analysisName,
  flow,
  parameterComponents,
  resultText,
  aiSuggestion,
  data,
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(flow.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(flow.edges);
  const [selectedNode, setSelectedNode] = useState(null);
  const onNodeClick = (_, node) => setSelectedNode(node);

  const [columnDefs, setColumnDefs] = useState([]);
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef();

  const [alignment, setAlignment] = useState('');
  const [histogramData, setHistogramData] = useState([]);

  const onRunHistogram = () => {
    if (!alignment) return alert('변수를 먼저 선택하세요.');

    const data = rowData.map((row) => row[alignment]).filter((v) => !isNaN(v));
    const frequency = {};

    data.forEach((v) => {
      const bin = Math.floor(Number(v) / 10) * 10;
      frequency[bin] = (frequency[bin] || 0) + 1;
    });

    const chartData = Object.entries(frequency).map(([x, y]) => ({ bin: x, count: y }));
    setHistogramData(chartData);
  };

  useEffect(() => {
    if (data) {
      const cols = data.headers.map((h) => ({
        headerName: h,
        field: h,
        sortable: true,
        filter: true,
      }));
      setColumnDefs(cols);
      setRowData(data.rows);
    }
  }, [data]);

  const [resultTabValue, setResultTabValue] = useState(0);
  const [configTabValue, setConfigTabValue] = useState(0);

  return (
    <Box sx={{ width: '98vw', height: '80vh', display: 'flex', gap: 2, px: 2 }}>
      {/* Left */}
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
            defaultViewport={{ x: 300, y: 0, zoom: 0.8 }}
            onNodeClick={onNodeClick}
          >
            <Controls />
            <Background variant="dots" gap={16} size={1} />
          </ReactFlow>

          <Box sx={{ borderTop: 1, borderColor: 'divider', mt: 2 }}>
            <Tabs value={resultTabValue} onChange={(_, v) => setResultTabValue(v)}>
              <Tab label="Data" />
              <Tab label="Result (Table)" />
              <Tab label="Result (Plot)" />
            </Tabs>

            <CustomTabPanel value={resultTabValue} index={0}>
              <Box className="ag-theme-alpine" sx={{ height: 400 }}>
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

            <CustomTabPanel value={resultTabValue} index={1}>
              <Box
                sx={{
                  p: 2,
                  fontFamily: 'monospace',
                  whiteSpace: 'pre-wrap',
                  fontSize: '13px',
                  overflow: 'auto',
                  maxHeight: '400px',
                }}
              >
                {resultText || 'No results'}
              </Box>
            </CustomTabPanel>

            {/* <CustomTabPanel value={resultTabValue} index={2}>
              <Box sx={{ p: 2, fontFamily: 'monospace', fontSize: '13px' }}>plot</Box>
              
            </CustomTabPanel> */}
            <CustomTabPanel value={resultTabValue} index={2}>
              {histogramData.length > 0 ? (
                <AgCharts
                  options={{
                    data: histogramData,
                    title: { text: 'Histogram', fontSize: 16 },
                    series: [
                      {
                        type: 'bar',
                        xKey: 'bin',
                        yKey: 'count',
                        xName: 'Bin',
                        yName: 'Frequency',
                      },
                    ],
                    axes: [
                      { type: 'category', position: 'bottom' },
                      { type: 'number', position: 'left' },
                    ],
                  }}
                />
              ) : (
                <Typography fontSize={13}>실행 버튼을 눌러 결과를 확인하세요.</Typography>
              )}
            </CustomTabPanel>
          </Box>
        </Box>
      </ReactFlowProvider>

      <Divider orientation="vertical" flexItem sx={{ borderColor: '#ddd' }} />

      {/* Right */}
      <Box sx={{ width: 400, p: 2, bgcolor: '#fff', overflowY: 'auto' }}>
        <Tabs value={configTabValue} onChange={(_, v) => setConfigTabValue(v)}>
          <Tab label="Parameter" />
          <Tab label="AI Suggestion" />
        </Tabs>

        <CustomTabPanel value={configTabValue} index={0}>
          {selectedNode ? (
            <>
              <Typography
                fontSize={12}
                sx={{ color: '#888', mb: 1, textAlign: 'left', fontFamily: 'Quicksand' }}
              >
                {selectedNode.data.label.toUpperCase()} 설정
              </Typography>
              {(() => {
                const configType = selectedNode?.data?.configType;
                const Comp = parameterComponents[configType];

                if (!Comp) return <Typography>설정 없음</Typography>;

                return (
                  <Comp
                    columnDefs={columnDefs}
                    alignment={alignment}
                    onChange={(e) => setAlignment(e.target.value)}
                    onRunHistogram={onRunHistogram}
                  />
                );
              })()}
            </>
          ) : (
            <Typography fontSize={12} color="#888" mt={2}>
              노드를 클릭하면 설정이 표시됩니다.
            </Typography>
          )}
        </CustomTabPanel>

        <CustomTabPanel value={configTabValue} index={1}>
          {aiSuggestion}
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

AnalysisFlowLayout.propTypes = {
  analysisName: PropTypes.string,
  flow: PropTypes.object.isRequired,
  parameterComponents: PropTypes.object.isRequired,
  resultText: PropTypes.string,
  aiSuggestion: PropTypes.node,
  data: PropTypes.object,
};

export default AnalysisFlowLayout;
