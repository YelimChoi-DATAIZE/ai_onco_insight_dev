// src/components/CustomNode.js
import React from 'react';
import { Handle, Position } from '@xyflow/react';

const CustomNode = ({ data }) => {
  return (
    <div
      style={{
        width: '180px',
        height: '80px',
        border: '2px solid #92DAD8',
        borderRadius: '8px',
        background: '#f0f8ff',
        fontFamily: 'Noto Sans KR',
        padding: '10px',
        boxSizing: 'border-box',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <strong style={{ fontSize: '14px', marginBottom: '6px' }}>{data.label}</strong>
      <div style={{ fontSize: '11px', color: '#888' }}>{data.recordCount || '100 records'}</div>

      {/* 엣지 연결용 Handle */}
      <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
      <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
    </div>
  );
};

export default CustomNode;
