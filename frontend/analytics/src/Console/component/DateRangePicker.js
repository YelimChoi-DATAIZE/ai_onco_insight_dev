// import React, { useState } from 'react';
// import { Box, TextField } from '@mui/material';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import dayjs from 'dayjs';

// export default function CustomDateRange() {
//   const [startDate, setStartDate] = useState(dayjs().subtract(7, 'day'));
//   const [endDate, setEndDate] = useState(dayjs());

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Box sx={{ display: 'flex', gap: 2 }}>
//         <DatePicker
//           label="시작일"
//           value={startDate}
//           onChange={(newValue) => setStartDate(newValue)}
//           renderInput={(params) => <TextField size="small" {...params} />}
//         />
//         <DatePicker
//           label="종료일"
//           value={endDate}
//           onChange={(newValue) => setEndDate(newValue)}
//           renderInput={(params) => <TextField size="small" {...params} />}
//         />
//       </Box>
//     </LocalizationProvider>
//   );
// }
