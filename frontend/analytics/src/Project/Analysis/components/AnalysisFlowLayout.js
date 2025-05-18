import React, { useState, useRef, useEffect } from 'react';
import { Box, Tabs, Tab, Typography, Divider } from '@mui/material';
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
    <div style={{ padding: 10, border: '1px solid #ccc', borderRadius: 6, background: '#fff' }}>
      <strong>{data.label}</strong>
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

            <CustomTabPanel value={resultTabValue} index={2}>
              <Box sx={{ p: 2, fontFamily: 'monospace', fontSize: '13px' }}>plot</Box>
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
              <Typography fontSize={12} sx={{ color: '#888', mb: 1 }}>
                ▷ {selectedNode.data.label.toUpperCase()} 설정
              </Typography>
              {(() => {
                const Comp = parameterComponents[selectedNode.data.label];
                return Comp ? <Comp /> : <Typography>설정 없음</Typography>;
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
