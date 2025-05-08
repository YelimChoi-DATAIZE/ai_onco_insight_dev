import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Pagination,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// 더미 데이터
const initialData = [
  {
    id: 1,
    name: 'Clonidine',
    concepts: [
      { id: 2599, name: 'clonidine', score: 0.6077 },
      { id: 2599, name: 'clonidine', score: 0.6077 },
      { id: 2599, name: 'clonidine', score: 0.6077 },
    ],
  },
  {
    id: 2,
    name: 'Clonidine',
    concepts: [
      { id: 2599, name: 'clonidine', score: 0.6077 },
      { id: 2599, name: 'clonidine', score: 0.6077 },
      { id: 2599, name: 'clonidine', score: 0.6077 },
    ],
  },
];

const CardComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 2;

  // 검색 기능 적용
  const filteredData = initialData.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box sx={{ padding: 0, mt: '26px', mb: '46px' }}>
      {/* search bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '371px', height: '28px' }}
          InputProps={{ sx: { height: '100%' } }}
        />
        {/* pagination */}
        <Box>
          <Pagination
            count={Math.ceil(filteredData.length / rowsPerPage)}
            page={page}
            onChange={(event, value) => setPage(value)}
          />
        </Box>
      </Box>

      {/* card list */}
      <Grid container spacing={2}>
        {paginatedData.map((item) => (
          <Grid item xs={12} sm={6} md={6} key={item.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  sx={{
                    fontFamily: 'Noto Sans KR',
                    fontWeight: 700,
                    fontSize: '13px',
                    lineHeight: '15.6px',
                    ml: '10px',
                  }}
                >
                  {item.name}
                </Typography>
                <Divider sx={{ marginTop: 1, display: 'flex' }} />
                <Typography
                  sx={{
                    fontFamily: 'Noto Sans KR',
                    fontWeight: 700,
                    fontSize: '13px',
                    lineHeight: '15.6px',
                    ml: '10px',
                    mt: '20px',
                  }}
                >
                  <strong>Top inferred concepts</strong>
                </Typography>
                {item.concepts.map((concept, index) => (
                  <Box key={index} sx={{ mt: 1 }}>
                    <Typography
                      sx={{
                        fontFamily: 'Noto Sans KR',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '15.6px',
                        ml: '10px',
                        mt: '20px',
                      }}
                    >
                      {concept.id} &nbsp; {concept.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: 'Noto Sans KR',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '15.6px',
                        ml: '50px',
                        // mt: "20px",
                      }}
                    >
                      {concept.score} score
                    </Typography>
                  </Box>
                ))}
                {/* 아코디언 추가 */}
                <Accordion sx={{ mt: '20px', boxShadow: 'none' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="body2">More Information</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">Additional details...</Typography>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CardComponent;
