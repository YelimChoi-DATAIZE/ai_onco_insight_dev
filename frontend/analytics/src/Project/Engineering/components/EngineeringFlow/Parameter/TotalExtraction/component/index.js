// import React from 'react';
// import { TextField } from '@mui/material';
// import { Box, Typography } from '@mui/material';
// import StorageIcon from '@mui/icons-material/Storage';

// export const DependentVariableSetting = () => (
//   <TextField
//     fullWidth
//     placeholder="예: blood_pressure"
//     variant="outlined"
//     margin="dense"
//     InputProps={{
//       sx: {
//         color: '#333',
//         fontFamily: 'monospace',
//         height: '40px',
//       },
//     }}
//     InputLabelProps={{ sx: { color: '#00bfff' } }}
//   />
// );

// export const RunNode = () => {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         width: 180,
//         height: 60,
//         borderRadius: 2,
//         boxShadow: 2,
//         overflow: 'hidden',
//         border: '1px solid #ddd',
//         backgroundColor: '#fff',
//       }}
//     >
//       {/* 왼쪽 파란 바 + 아이콘 */}
//       <Box
//         sx={{
//           width: 50,
//           backgroundColor: '#1E3A8A',
//           color: 'white',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <StorageIcon fontSize="medium" />
//       </Box>

//       {/* 오른쪽 텍스트 */}
//       <Box sx={{ flexGrow: 1, px: 1.2, py: 0.8 }}>
//         <Typography
//           variant="subtitle2"
//           sx={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}
//         >
//           customers
//         </Typography>
//         <Typography variant="caption" sx={{ fontSize: '11px', color: '#888' }}>
//           customers
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default RunNode;
import React from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Box, Button, Typography, Card, CardContent } from '@mui/material';

export const SelectTargetColumn = ({ columnDefs, alignment, onChange }) => {
  return (
    <>
      <Typography fontSize={12} sx={{ color: '#888', mb: 1 }}>
        ▷ Target Column
      </Typography>
      <FormControl>
        <RadioGroup value={alignment} onChange={onChange} row>
          {columnDefs.map((col) => (
            <FormControlLabel
              key={col.field}
              value={col.field}
              control={<Radio size="small" />}
              label={
                <Typography sx={{ fontSize: 12, fontFamily: 'Noto Sans KR' }}>
                  {col.field}
                </Typography>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
};

export const RunExtraction = ({ onRunExtraction, selectedCellValue, selectedRow, response1 }) => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button onClick={onRunExtraction} sx={{ backgroundColor: '#2F72B9', color: '#fff' }}>
          Run Total Extraction
        </Button>
      </Box>
    </>
  );
};
