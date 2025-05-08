import React, { useState } from 'react';
import {
  Box, Grid, Paper, Typography, IconButton, InputBase, List, ListItem,
  Divider, Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function VariableSplitTransfer() {
  const [variables] = useState(['A', 'B', 'C']);
  const [selected, setSelected] = useState([]);
  const [splitBy, setSplitBy] = useState([]);

  const handleSelect = (item: string) => {
    setSelected((prev) => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const moveSelected = () => {
    setSplitBy((prev) => [...prev, ...selected]);
    setSelected([]);
  };

  return (
        <Box sx={{
          width: '100%',
          maxWidth: 900,
        //   height: 'calc(100vh - 40px)',
          bgcolor: '#f5f5f5',
          p: 3,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          fontSize: '13px',
          color: '#333',
        }}>
      <Grid container spacing={1}>
        {/* 왼쪽: 변수 리스트 */}
        <Grid item xs={4}>
          <Paper variant="outlined" sx={{ p: 1, bgcolor: '#fff', height: 220 }}>
            {/* 검색창 */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <InputBase
                placeholder="검색"
                sx={{ ml: 0.5, flex: 1, fontSize: '12px', height: 28 }}
              />
              <IconButton size="small" sx={{ p: 0.5 }}>
                <SearchIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Divider */}
            <Divider sx={{ mb: 1 }} />

            {/* 변수 리스트 */}
            <List dense sx={{ maxHeight: 150, overflowY: 'auto', p: 0 }}>
              {variables.map((v) => (
                <ListItem
                  key={v}
                  button
                  onClick={() => handleSelect(v)}
                  sx={{
                    fontSize: '13px', pl: 1, pr: 1,
                    bgcolor: selected.includes(v) ? '#e3f2fd' : undefined,
                    '&:hover': { bgcolor: '#f5f5f5' },
                    minHeight: 32
                  }}
                >
                  <Box sx={{
                    width: 14, height: 14, bgcolor: '#bbdefb', borderRadius: '50%',
                    mr: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '10px', color: '#1976d2'
                  }}>
                    {/* 아이콘 안에 글자 X, 동그란 원 */}
                  </Box>
                  <Typography sx={{ fontSize: '12px' }}>{v}</Typography>
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* 기술통계 드롭다운 */}
          <Box sx={{ mt: 1 }}>
            <Typography sx={{ fontSize: '12px', mb: 0.5 }}>기술통계</Typography>
            <select style={{
              width: '100%', height: 28, fontSize: '12px',
              border: '1px solid #ccc', borderRadius: 2
            }}>
              <option>Variables across columns</option>
              <option>Variables across rows</option>
            </select>
          </Box>
        </Grid>

        {/* 가운데: 버튼 */}
        <Grid item xs={1} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            variant="outlined"
            size="small"
            onClick={moveSelected}
            sx={{
              minWidth: 32, height: 32, p: 0,
              border: '1px solid #bbb', bgcolor: '#fafafa'
            }}
          >
            <ArrowForwardIcon fontSize="small" />
          </Button>
        </Grid>

        {/* 오른쪽: 변수/스플릿 */}
        <Grid item xs={7}>
          <Box sx={{ mb: 1 }}>
            <Typography sx={{ fontSize: '12px', mb: 0.5 }}>변수</Typography>
            <Paper variant="outlined" sx={{ height: 100, p: 1, bgcolor: '#fff' }}>
              {/* 변수 옮긴 것 표시 */}
              {selected.length > 0 ? selected.join(', ') : '변수를 선택하세요'}
            </Paper>
          </Box>

          <Box>
            <Typography sx={{ fontSize: '12px', mb: 0.5 }}>Split by</Typography>
            <Paper variant="outlined" sx={{ height: 80, p: 1, bgcolor: '#fff' }}>
              {/* Split by 옮긴 것 표시 */}
              {splitBy.length > 0 ? splitBy.join(', ') : '없음'}
            </Paper>
          </Box>

          {/* 빈도분포 체크박스 */}
          <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
            <input type="checkbox" style={{ marginRight: 4 }} />
            <Typography sx={{ fontSize: '12px' }}>빈도분포표</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}