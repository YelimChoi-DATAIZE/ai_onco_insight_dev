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
    id: 0,
    entity: 'breast cancer',
    profile: 'PrimaryCancerCondition',
    category: 'PrimaryCancerCondition',
    traits: 'Cancer Condition name',
    indent: false,
  },
  {
    id: 1,
    entity: 'active',
    profile: 'PrimaryCancerCondition',
    category: 'PrimaryCancerCondition',
    traits: 'ClinicalStatus',
    indent: true,
  },
  {
    id: 2,
    entity: 'right breast',
    profile: 'PrimaryCancerCondition',
    category: 'PrimaryCancerCondition',
    traits: 'Bodysite',
    indent: true,
  },
  {
    id: 3,
    entity: '2019.3.28',
    profile: 'PrimaryCancerCondition',
    category: 'PrimaryCancerCondition',
    traits: 'Onset',
    indent: true,
  },
  {
    id: 4,
    entity: 'cT',
    profile: 'CancerStage',
    category: 'CancerStage',
    traits: 'Cancer Stage Type',
    indent: false,
  },
  {
    id: 5,
    entity: 'cT2',
    profile: 'CancerStage',
    category: 'CancerStage',
    traits: 'Value',
    indent: true,
  },
  {
    id: 6,
    entity: 'clinical',
    profile: 'CancerStage',
    category: 'CancerStage',
    traits: 'Method',
    indent: true,
  },
  {
    id: 7,
    entity: 'cN',
    profile: 'CancerStage',
    category: 'CancerStage',
    traits: 'Cancer Stage Type',
    indent: false,
  },
  {
    id: 8,
    entity: 'cN1(f)',
    profile: 'CancerStage',
    category: 'CancerStage',
    traits: 'Value',
    indent: true,
  },
  {
    id: 9,
    entity: 'clinical',
    profile: 'CancerStage',
    category: 'CancerStage',
    traits: 'Method',
    indent: true,
  },
  {
    id: 10,
    entity: 'clipping',
    profile: 'SurgicalProcedure',
    category: 'SurgicalProcedure',
    traits: 'SurgicalProcedure name',
    indent: false,
  },
];

const TableComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('Any Category');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

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
                        backgroundColor: row.profile === 'Age' ? 'orange' : 'cyan',
                        display: 'inline-block',
                        mr: 1,
                      }}
                    />
                    {row.profile}
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
