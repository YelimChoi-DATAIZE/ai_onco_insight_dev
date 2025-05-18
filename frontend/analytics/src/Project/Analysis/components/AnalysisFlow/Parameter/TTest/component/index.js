import React from 'react';
import { TextField } from '@mui/material';

const DependentVariableSetting = () => (
  <TextField
    fullWidth
    placeholder="예: blood_pressure"
    variant="outlined"
    margin="dense"
    InputProps={{
      sx: {
        color: '#333',
        fontFamily: 'monospace',
        height: '40px',
      },
    }}
    InputLabelProps={{ sx: { color: '#00bfff' } }}
  />
);

export default DependentVariableSetting;
