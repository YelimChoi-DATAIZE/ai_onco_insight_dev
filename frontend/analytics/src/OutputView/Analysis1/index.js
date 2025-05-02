import React, { useState } from 'react';
import { 
  Box, Typography, IconButton, Paper, InputBase, 
  FormControl, Select, MenuItem, Checkbox, 
  FormControlLabel, TextField, Divider, Grid, 
  Accordion, AccordionSummary, AccordionDetails 
} from '@mui/material';
import { ChevronRight, ExpandMore, Search, ArrowForward } from '@mui/icons-material';
import TransferList from './TransferList';

export default function StatisticalAnalysisMUI() {
  const [selectedVariables] = useState(['A', 'B', 'C']);
  const [variableMode, setVariableMode] = useState('Variables across columns');

  return (
    <Box sx={{
      width: '100%',
      maxWidth: 900,
      height: 'calc(100vh - 40px)',
      bgcolor: '#f5f5f5',
      p: 3,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      fontSize: '13px',
      color: '#333',
    }}>
      {/* 헤더 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontSize: '18px' }}>기술통계</Typography>
        <IconButton sx={{ bgcolor: '#f0f0f0', p: 0.5 }}>
          <ChevronRight />
        </IconButton>
      </Box>

      <Grid container spacing={2}>
        <TransferList />
      </Grid>

      {/* 통계 Accordion */}
      <Accordion defaultExpanded sx={{ mt: 2, bgcolor: '#f7f7f7', border: '1px solid #ddd', boxShadow: 'none' }}>
  <AccordionSummary expandIcon={<ExpandMore />} sx={{ minHeight: '36px' }}>
    <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>통계</Typography>
  </AccordionSummary>

  <AccordionDetails>
    <Grid container spacing={2}>
      {/* 왼쪽 */}
      <Grid item xs={6}>
        {/* 표본크기 */}
        <Section title="표본크기">
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
    <Checkbox size="small" sx={{ p: 0.5 }} />
    <Typography sx={{ fontSize: '13px' }}>사례수</Typography>
  </Box>

  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Checkbox size="small" sx={{ p: 0.5 }} />
    <Typography sx={{ fontSize: '13px' }}>결측 값</Typography>
  </Box>
</Section>


        {/* 백분위 수 */}
        <Section title="백분위 수">
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
    <Checkbox size="small" sx={{ p: 0.5 }} />
    <Typography sx={{ fontSize: '13px', mr: 1 }}>절단값</Typography>
    <TextField size="small" defaultValue="4" sx={{ width: 50, mx: 1 }} />
    <Typography sx={{ fontSize: '13px' }}>동일 집단</Typography>
  </Box>

  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Checkbox size="small" sx={{ p: 0.5 }} />
    <Typography sx={{ fontSize: '13px', mr: 1 }}>백분위</Typography>
    <TextField size="small" defaultValue="25,50,75" sx={{ width: 120, ml: 1 }} />
  </Box>
</Section>

        {/* 분산 */}
        <Section title="분산">
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
    <Checkbox size="small" sx={{ p: 0.5 }} />
    <Typography sx={{ fontSize: '13px' }}>표준편차</Typography>
  </Box>

  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
    <Checkbox size="small" sx={{ p: 0.5 }} />
    <Typography sx={{ fontSize: '13px' }}>분산</Typography>
  </Box>

  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Checkbox size="small" sx={{ p: 0.5 }} />
    <Typography sx={{ fontSize: '13px' }}>범위</Typography>
  </Box>
</Section>

<Section title="평균 분산">
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
    <Checkbox size="small" sx={{ p: 0.5 }} />
    <Typography sx={{ fontSize: '13px' }}>평균에 대한 표준오차</Typography>
  </Box>

  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Checkbox size="small" sx={{ p: 0.5 }} />
    <Typography sx={{ fontSize: '13px', mr: 1 }}>평균에 대한 신뢰구간</Typography>
    <TextField size="small" defaultValue="95" sx={{ width: 50, mx: 1 }} />
    <Typography sx={{ fontSize: '13px' }}>%</Typography>
  </Box>
</Section>

      </Grid>

      {/* 오른쪽 */}
      <Grid item xs={6}>
  {/* 집중 경향값 */}
  <Section title="집중 경향값">
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <Checkbox size="small" sx={{ p: 0.5 }} />
      <Typography sx={{ fontSize: '13px' }}>평균</Typography>
    </Box>

    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <Checkbox size="small" sx={{ p: 0.5 }} />
      <Typography sx={{ fontSize: '13px' }}>중앙값</Typography>
    </Box>

    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <Checkbox size="small" sx={{ p: 0.5 }} />
      <Typography sx={{ fontSize: '13px' }}>최빈값</Typography>
    </Box>

    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox size="small" sx={{ p: 0.5 }} />
      <Typography sx={{ fontSize: '13px' }}>합계</Typography>
    </Box>
  </Section>

  {/* 분포 */}
  <Section title="분포">
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <Checkbox size="small" sx={{ p: 0.5 }} />
      <Typography sx={{ fontSize: '13px' }}>왜도</Typography>
    </Box>

    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox size="small" sx={{ p: 0.5 }} />
      <Typography sx={{ fontSize: '13px' }}>첨도</Typography>
    </Box>
  </Section>

  {/* 정규분포성 */}
  <Section title="정규분포성">
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox size="small" sx={{ p: 0.5 }} />
      <Typography sx={{ fontSize: '13px' }}>샤피로-윌크</Typography>
    </Box>
  </Section>

  {/* 이상치 */}
  <Section title="이상치">
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox size="small" sx={{ p: 0.5 }} />
      <Typography sx={{ fontSize: '13px', mr: 1 }}>최극단</Typography>
      <TextField size="small" defaultValue="5" sx={{ width: 50, mx: 1 }} />
      <Typography sx={{ fontSize: '13px' }}>values</Typography>
    </Box>
  </Section>
      </Grid>
    </Grid>
  </AccordionDetails>
</Accordion>



      {/* 도표 Accordion */}
      <Accordion sx={{ mt: 1, bgcolor: '#f7f7f7', border: '1px solid #ddd', boxShadow: 'none' }}>
  <AccordionSummary expandIcon={<ExpandMore />} sx={{ minHeight: '36px' }}>
    <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>도표</Typography>
  </AccordionSummary>

  <AccordionDetails>
    <Grid container spacing={2}>
      {/* 히스토그램 */}
      <Grid item xs={4}>
        <Section title="히스토그램">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Checkbox size="small" sx={{ p: 0.5 }} />
            <Typography sx={{ fontSize: '13px' }}>히스토그램</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox size="small" sx={{ p: 0.5 }} />
            <Typography sx={{ fontSize: '13px' }}>밀도</Typography>
          </Box>
        </Section>
      </Grid>

      {/* 박스 도표 */}
      <Grid item xs={4}>
        <Section title="박스 도표">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Checkbox size="small" sx={{ p: 0.5 }} />
            <Typography sx={{ fontSize: '13px' }}>박스 도표</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox size="small" sx={{ p: 0.5 }} />
            <Typography sx={{ fontSize: '13px' }}>레이블 이상치</Typography>
          </Box>
        </Section>
      </Grid>

      {/* 막대도표 */}
      <Grid item xs={4}>
        <Section title="막대도표">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox size="small" sx={{ p: 0.5 }} />
            <Typography sx={{ fontSize: '13px' }}>막대도표</Typography>
          </Box>
        </Section>
      </Grid>
    </Grid>

    <Divider sx={{ my: 2 }} />

    {/* Q-Q 도표 */}
    <Section title="Q-Q 도표">
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox size="small" sx={{ p: 0.5 }} />
        <Typography sx={{ fontSize: '13px' }}>Q-Q</Typography>
      </Box>
    </Section>

    {/* Violin */}
    <Section title="Violin">
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Checkbox size="small" sx={{ p: 0.5 }} />
        <Typography sx={{ fontSize: '13px' }}>Violin</Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox size="small" sx={{ p: 0.5 }} />
        <Typography sx={{ fontSize: '13px' }}>데이터</Typography>
      </Box>
    </Section>
  </AccordionDetails>
</Accordion>

    </Box>
  );
}

// 재사용 Section 컴포넌트
const Section = ({ title, children }) => (
  <Box sx={{ mb: 3 }}>
    <Typography sx={{ fontSize: '13px', fontWeight: 600, mb: 1 }}>{title}</Typography>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {children}
    </Box>
  </Box>
);
