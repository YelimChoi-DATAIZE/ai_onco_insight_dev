import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';

const Test = ({ response2 }) => {
  return (
    <>
      <Box
        // ref={containerRef}
        sx={{
          width: '80%',
          backgroundColor: '#fff',
          padding: '50px 14px',
          fontSize: '14px',
          lineHeight: '3.5',
          position: 'relative', // 부모 컨테이너를 relative로 설정
          minHeight: '200px', // SVG가 보일 수 있도록 최소 높이 설정
        }}
      >
        <p
          style={{
            fontSize: '14px',
            fontWeight: '400',
            whiteSpace: 'pre-line',
            wordBreak: 'break-word',
            textAlign: 'left',
            width: '100%',
            margin: 0,
            lineHeight: '3.5',
            positions: 'fixed',
          }}
        >
          {response2}
        </p>
      </Box>
    </>
  );
};

export default Test;
