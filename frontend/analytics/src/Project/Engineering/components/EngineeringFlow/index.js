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
import CustomNode from './Parameter/NodeViz/index.js';

import { Position } from '@xyflow/react';

export const total_extraction_flow = {
  nodes: [
    {
      id: '1',
      type: 'variableNode',
      position: { x: 0, y: 100 },
      data: { label: 'Select Target Column', configType: 'SelectTargetColumn' },
    },
    {
      id: '2',
      type: 'variableNode',
      position: { x: 500, y: 100 },
      data: { label: 'Select Category' },
    },
    {
      id: '3',
      type: 'RunNode',
      position: { x: 1000, y: 200 },
      data: { label: 'Run', configType: 'Run' },
    },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', style: { stroke: 'red' } },
    { id: 'e2-3', source: '2', target: '3' },
  ],
};

export const selective_extraction_flow = {
  nodes: [
    {
      id: '1',
      type: 'VariableNode',
      position: { x: 0, y: 100 },
      data: { label: 'Select Target Column' },
    },
    {
      id: '2',
      type: 'VariableNode',
      position: { x: 200, y: 100 },
      data: { label: 'Select Foi' },
    },
    {
      id: '3',
      type: 'RunNode',
      position: { x: 0, y: 200 },
      data: { label: 'Run' },
    },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
  ],
};
