// src/components/CustomNode.js
import React from 'react';
import { Handle, Position } from '@xyflow/react';

const CustomNode = ({ data }) => {
  return (
    <div
      style={{
        borderRadius: '100%',
        backgroundColor: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '10px',
        color: '#333',
        border: '2px solid #2196f3',
        position: 'relative',
      }}
    >
      {data.label}

      {/* 엣지 연결 핸들 */}
      <Handle type="source" position={Position.Right} style={{ background: '#2196f3' }} />
      <Handle type="target" position={Position.Left} style={{ background: '#2196f3' }} />
    </div>
  );
};

export default CustomNode;
