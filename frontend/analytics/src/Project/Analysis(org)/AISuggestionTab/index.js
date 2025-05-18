// OneSampleTTestFlow.jsx
import React from 'react';
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

export default function AISuggestion() {
  return (
    <Box
      sx={{
        mt: 1,
        bgcolor: '#ffffff',
        p: 2,
        color: '#2b2b2b',
        fontFamily: 'monospace',
        width: '100%',
      }}
    >
      {/* <Typography fontSize="20px" color="#aaa" mb={1}>
                Suggested background terminal command
              </Typography> */}

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
  );
}
