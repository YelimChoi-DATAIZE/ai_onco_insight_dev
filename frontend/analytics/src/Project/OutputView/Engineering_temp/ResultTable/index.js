import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  Pagination,
  Box,
  Typography,
} from '@mui/material';

// 더미 데이터
const initialData = [
  {
    id: 1,
    entity: '87',
    score: 0.998,
    type: 'Age',
    category: 'Protected health information',
    traits: '-',
  },
  {
    id: 2,
    entity: 'woman',
    score: 0.998,
    type: 'Gender',
    category: 'Protected health information',
    traits: '-',
  },
  {
    id: 3,
    entity: 'status post',
    score: 0.998,
    type: 'Gender',
    category: 'Protected health information',
    traits: '-',
  },
  {
    id: 4,
    entity: 'status post',
    score: 0.998,
    type: 'Gender',
    category: 'Protected health information',
    traits: 'Past history (0.779 score)',
    indent: true,
  },
];

const TableComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('Any Category');
  const [page, setPage] = useState(1);
  const rowsPerPage = 5; // 페이지당 데이터 개수

  // 검색 및 필터 적용
  const filteredData = initialData.filter(
    (row) =>
      row.entity.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === 'Any Category' || row.category === category)
  );

  // 페이지네이션 적용
  const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box sx={{ padding: 0, mb: '46px' }}>
      {/* 상단 검색 및 필터 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 1,
          mb: 2,
          mt: '26px',
          mb: '46px',
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '371px', height: '28px' }}
          InputProps={{ sx: { height: '100%' } }}
        />
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          size="small"
          displayEmpty
          sx={{
            width: '158px',
            height: '28px',
            // "& .MuiSelect-select": { paddingY: "4px" },
          }}
        >
          <MenuItem value="Any Category">Any Category</MenuItem>
          <MenuItem value="Protected health information">Protected health information</MenuItem>
        </Select>
        <Box>
          <Pagination
            count={Math.ceil(filteredData.length / rowsPerPage)}
            page={page}
            onChange={(event, value) => setPage(value)}
          />
        </Box>
      </Box>

      {/* 테이블 */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontFamily: 'Noto Sans KR',
                  fontWeight: 400,
                  lineHeight: '16.8px',
                }}
              >
                <strong>Entity</strong>
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: 'Noto Sans KR',
                  fontWeight: 400,
                  lineHeight: '16.8px',
                }}
              >
                <strong>Profile</strong>
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: 'Noto Sans KR',
                  fontWeight: 400,
                  lineHeight: '16.8px',
                }}
              >
                <strong>Category</strong>
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: 'Noto Sans KR',
                  fontWeight: 400,
                  lineHeight: '16.8px',
                }}
              >
                <strong>Relation</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell sx={{ pl: row.indent ? 4 : 1 }}>
                  <Typography
                    sx={{
                      fontFamily: 'Noto Sans KR',
                      fontWeight: 400,
                      fontSize: '13px',
                      lineHeight: '15.6px',
                      ml: '10px',
                    }}
                  >
                    {row.entity}
                  </Typography>
                  <Typography variant="caption" ml="10px">
                    {row.score} score
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      fontFamily: 'Noto Sans KR',
                      fontWeight: 400,
                      fontSize: '13px',
                      lineHeight: '15.6px',
                      ml: '10px',
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: row.type === 'Age' ? 'orange' : 'cyan',
                        display: 'inline-block',
                        mr: 1,
                      }}
                    />
                    {row.type}
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'Noto Sans KR',
                    fontWeight: 400,
                    fontSize: '13px',
                    lineHeight: '15.6px',
                    ml: '10px',
                  }}
                >
                  {row.category}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'Noto Sans KR',
                    fontWeight: 400,
                    fontSize: '13px',
                    lineHeight: '15.6px',
                    ml: '10px',
                  }}
                >
                  {row.traits}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableComponent;
