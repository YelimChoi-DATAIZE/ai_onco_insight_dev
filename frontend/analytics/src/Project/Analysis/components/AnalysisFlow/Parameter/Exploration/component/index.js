import React from 'react';
import { RadioGroup, FormControlLabel, Radio, Typography, Button, Box } from '@mui/material';

export const SelectVariable = ({ columnDefs, alignment, onChange }) => {
  return (
    <>
      <Typography fontSize={12} sx={{ color: '#888', mb: 1 }}>
        ▷ 변수 선택
      </Typography>
      <RadioGroup value={alignment} onChange={onChange} row>
        {columnDefs.map((col) => (
          <FormControlLabel
            key={col.field}
            value={col.field}
            control={<Radio size="small" />}
            label={<Typography fontSize={12}>{col.field}</Typography>}
          />
        ))}
      </RadioGroup>
    </>
  );
};

export const RunAnalysis = ({ onRunHistogram }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button onClick={onRunHistogram} sx={{ backgroundColor: '#2F72B9', color: '#fff' }}>
        Run Histogram
      </Button>
    </Box>
  );
};
