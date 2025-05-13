// ProjectCards.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TextField,
} from '@mui/material';
// import dayjs from 'dayjs';

export const ProjectSummaryCard = ({ title, data = {} }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRows = Object.entries(data).filter(
    ([key, value]) =>
      key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography fontWeight="bold">{title}</Typography>
        <TextField
          size="small"
          variant="outlined"
          placeholder="검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '45%' }}
        />
      </Box>

      <Table size="small">
        <TableBody>
          {filteredRows.map(([key, value]) => (
            <TableRow key={key}>
              <TableCell sx={{ fontWeight: 500, width: '40%' }}>{key}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

// export function SearchLogCard({ filterDate }) {
//   const rows = [
//     {
//       time: '2024-05-13 15:00~15:20',
//       keyword: 'BRCA1 mutation',
//       sentence: 'Studies on BRCA1 mutation and breast cancer',
//       session: '20분',
//     },
//     // ...
//   ];

//   const filteredRows = rows.filter((row) => {
//     if (!filterDate) return true;
//     return dayjs(row.time).isSame(filterDate, 'day'); // 'time' 필드에 날짜가 포함되어 있어야 함
//   });

//   return (
//     <Box>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
//         <Typography variant="h6" fontWeight="bold">
//           Research Idea and Design
//         </Typography>
//         <TextField size="small" placeholder="검색" />
//       </Box>
//       <Divider sx={{ mb: 1 }} />
//       <Table size="small">
//         <TableHead>
//           <TableRow>
//             <TableCell>검색 시간</TableCell>
//             <TableCell>검색어</TableCell>
//             <TableCell>검색 문장</TableCell>
//             <TableCell>세션 시간</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {filteredRows.map((row, i) => (
//             <TableRow key={i}>
//               <TableCell>{row.time}</TableCell>
//               <TableCell>{row.keyword}</TableCell>
//               <TableCell>{row.sentence}</TableCell>
//               <TableCell>{row.session}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Box>
//   );
// }

export function DataOverviewCard() {
  const [searchTerm, setSearchTerm] = useState('');
  const rows = [
    ['데이터셋 명칭', 'CancerDataset v1.2'],
    ['수집 기간 및 장소', '2019~2022, 서울'],
    ['데이터셋 크기', '1,200명 / 12,000 레코드'],
    ['출처', '다기관'],
    ['목적 및 설계', '예후 예측을 위한 설계'],
    ['최종 업데이트', '2024-12-01'],
  ];

  const filteredRows = rows.filter(([label, value]) =>
    `${label} ${value}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          DATA
        </Typography>
        <TextField
          size="small"
          placeholder="검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <Divider sx={{ mb: 1 }} />
      <Table size="small">
        <TableBody>
          {filteredRows.map(([label, value], i) => (
            <TableRow key={i}>
              <TableCell>{label}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export function EngineeringCard() {
  const [searchTerm, setSearchTerm] = useState('');
  const rows = [
    ['결측치 비율', 'Age: 2.3%, Gender: 0%'],
    ['이상치 처리', 'IQR 기반 제거'],
    ['클리닝 프로세스', '누락치 제거 → 정규화 → 범주형 인코딩'],
  ];

  const filteredRows = rows.filter(([label, value]) =>
    `${label} ${value}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          Engineering
        </Typography>
        <TextField
          size="small"
          placeholder="검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <Divider sx={{ mb: 1 }} />
      <Table size="small">
        <TableBody>
          {filteredRows.map(([label, value], i) => (
            <TableRow key={i}>
              <TableCell>{label}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export function AnalysisCard() {
  const [searchTerm, setSearchTerm] = useState('');
  const rows = [
    ['정규성 검정', 'Shapiro-Wilk (p=0.12)'],
    ['다중공선성', 'VIF < 5 (문제 없음)'],
    ['독립성 검토', 'Durbin-Watson = 1.98'],
    ['모델 적합도', 'CFI = 0.96, RMSEA = 0.04'],
    ['통계 검정력', '0.82'],
    ['p-value / 효과크기', 'p=0.01, d=0.65'],
  ];

  const filteredRows = rows.filter(([label, value]) =>
    `${label} ${value}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          ANALYSIS
        </Typography>
        <TextField
          size="small"
          placeholder="검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <Divider sx={{ mb: 1 }} />
      <Table size="small">
        <TableBody>
          {filteredRows.map(([label, value], i) => (
            <TableRow key={i}>
              <TableCell>{label}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
