// Console.jsx
import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  Card,
  CardContent,
  CardActionArea,
  TextField,
  AppBar,
  Toolbar,
  Button,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHead,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { initIndexedDB } from '../utils/indexedDB';
import Menubar from '../Menubar';
import {
  SearchLogCard,
  DataOverviewCard,
  EngineeringCard,
  AnalysisCard,
  ProjectSummaryCard,
} from './component/ProjectCard';
// import DateRangeFilter from './component/DateRangePicker';
// import dayjs from 'dayjs';
// // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// // import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function Console() {
  const defaultCards = useMemo(
    () => [
      { id: 1, title: 'mCODE SEARCH', description: '' },
      { id: 2, title: 'DATA', description: '' },
      { id: 3, title: 'ENGINEERING', description: '' },
    ],
    []
  );

  const defaultCards2 = useMemo(
    () => [
      { id: 4, title: 'ANALYSIS', description: '' },
      { id: 5, title: 'RESULT', description: '' },
    ],
    []
  );

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [projectList, setProjectList] = useState([]);
  const [projectContentMap, setProjectContentMap] = useState({});

  const selectedProject = projectList[selectedIndex] || null;
  const currentProject = selectedProject
    ? projectContentMap[selectedProject.id] || { cards: [], cards2: [] }
    : { cards: [], cards2: [] };

  const [selectedCard, setSelectedCard] = useState(0);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedProjectName, setEditedProjectName] = useState('');

  useEffect(() => {
    initIndexedDB();
  }, []);

  const handleAddProject = async () => {
    const newProjectId = uuidv4();
    const nextProjectNumber = projectList.length + 1;
    const newProjectName = `Project ${nextProjectNumber}`;
    const newProject = { id: newProjectId, name: newProjectName };

    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch('http://localhost:8000/projectdata/projectid_create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ projectId: newProjectId, projectName: newProjectName }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || result.error);

      setProjectList((prev) => {
        const updated = [...prev, newProject];
        setSelectedIndex(updated.length - 1);
        return updated;
      });

      setProjectContentMap((prev) => ({
        ...prev,
        [newProjectId]: { cards: [...defaultCards], cards2: [...defaultCards2] },
      }));
    } catch (error) {
      alert('프로젝트 생성 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  const handleProjectRename = () => {
    if (!editedProjectName.trim()) return;
    setProjectList((prev) =>
      prev.map((p, i) => (i === selectedIndex ? { ...p, name: editedProjectName.trim() } : p))
    );
    setIsEditingTitle(false);
  };

  return (
    <>
      <Menubar />
      <Divider />
      <AppBar
        position="fixed"
        sx={{
          top: '40px',
          height: '40px',
          backgroundColor: '#3CA7DF',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
        }}
        elevation={0}
      >
        <Toolbar variant="dense" sx={{ minHeight: '32px !important', px: 2 }}>
          <img
            src={'/static/Images/ConsoleIcon.svg'}
            alt="Logo"
            style={{ mt: -1, height: '15px' }}
          />
          <Typography
            sx={{
              fontWeight: 500,
              ml: 1,
              display: { xs: 'none', sm: 'block' },
              cursor: 'pointer',
            }}
            onClick={() => setSelectedIndex(-1)}
          >
            CONSOLE
          </Typography>
        </Toolbar>
      </AppBar>
      <Divider sx={{ borderColor: '#ffffff' }} />

      <Box sx={{ display: 'flex', height: '92vh', backgroundColor: '#f5f5f5', paddingTop: '82px' }}>
        {/* Left Project List */}
        <Box
          sx={{
            width: 240,
            borderRight: '1px solid #e0e0e0',
            bgcolor: '#fff',
            pt: '20px',
            overflowY: 'auto',
          }}
        >
          <Box sx={{ px: 2, pb: 1.5, display: 'flex', justifyContent: 'space-between' }}>
            <Typography fontSize={14} fontWeight="bold">
              MY PROJECTS
            </Typography>
          </Box>
          <Divider />
          <List dense disablePadding sx={{ overflowY: 'auto', flexGrow: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="outlined" sx={{ my: 1, width: '80%' }} onClick={handleAddProject}>
                + new project
              </Button>
            </Box>

            {projectList.map((project, index) => (
              <ListItem disablePadding key={index}>
                <ListItemButton
                  selected={selectedIndex === index}
                  onClick={() => setSelectedIndex(index)}
                  sx={{
                    px: 2,
                    py: 1.5,
                    borderBottom: '1px solid #f0f0f0',
                  }}
                >
                  <ListItemText
                    primary={project.name}
                    primaryTypographyProps={{
                      fontSize: 13.5,
                      fontWeight: selectedIndex === index ? 600 : 400,
                    }}
                  />

                  {selectedIndex === index && <ChevronRightIcon fontSize="small" />}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Right Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            pt: '40px',
            // overflowY: 'auto', // ✅ 스크롤 여기만!
            overflowX: 'hidden',
            px: 3,
            pb: 3,
            boxSizing: 'border-box',
            minWidth: 0, // ✅ flex에서 잘림 방지
          }}
        >
          {selectedProject ? (
            <>
              {/* Project Title */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: '50px' }}>
                {isEditingTitle ? (
                  <TextField
                    value={editedProjectName}
                    onChange={(e) => setEditedProjectName(e.target.value)}
                    onBlur={handleProjectRename}
                    onKeyDown={(e) => e.key === 'Enter' && handleProjectRename()}
                    size="small"
                    variant="standard"
                    autoFocus
                  />
                ) : (
                  <Typography fontSize={20} fontWeight="bold">
                    {selectedProject.name}
                  </Typography>
                )}
                <IconButton
                  size="small"
                  onClick={() => {
                    setEditedProjectName(selectedProject.name);
                    setIsEditingTitle(true);
                  }}
                >
                  <img src={'/static/Images/setting.svg'} alt="Edit" style={{ height: '15px' }} />
                </IconButton>
              </Box>

              {/* Project Link */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  pr: 1,
                  mb: 1,
                  mr: '50px',
                  gap: 1,
                }}
              >
                <Link to={`/project/${selectedProject.id}`}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    &gt; Go
                  </Typography>
                </Link>
                {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 'auto', mr: 3 }}>
                  <DateRangeFilter />
                </Box> */}
              </Box>

              {/* Cards */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: 2,
                  mb: 3,
                  mx: '50px',
                }}
              >
                {currentProject.cards.map((card, index) => (
                  <Card key={card.id} sx={{ height: 400 }}>
                    <CardActionArea onClick={() => setSelectedCard(index)}>
                      <CardContent>
                        {/* {card.title === 'mCODE SEARCH' && (
                          <SearchLogCard filterDate={selectedDate} />
                        )} */}
                        {card.title === 'DATA' && <DataOverviewCard />}
                        {card.title === 'ENGINEERING' && <EngineeringCard />}
                        {/* {card.title === 'ANALYSIS' && <AnalysisCard />}
        {card.title === 'RESULT' && <ProjectSummaryCard />} */}
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </Box>
              <Box
                sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mx: '50px' }}
              >
                {currentProject.cards2.map((card, index) => (
                  <Card key={card.id} sx={{ height: 400 }}>
                    <CardActionArea onClick={() => setSelectedCard(index)}>
                      <CardContent>
                        {/* {card.title === 'mCODE SEARCH' && <SearchLogCard />}
        {card.title === 'DATA' && <DataOverviewCard />}
        {card.title === 'ENGINEERING' && <EngineeringCard />} */}
                        {card.title === 'ANALYSIS' && <AnalysisCard />}
                        {card.title === 'RESULT' && (
                          <ProjectSummaryCard
                            title="데이터 정보"
                            data={{
                              '데이터셋 명칭': 'CancerDataset v1.2',
                              '수집 기간 및 장소': '2019~2022, 서울',
                              출처: '다기관',
                              '최종 업데이트': '2024-12-01',
                            }}
                          />
                        )}
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </Box>
            </>
          ) : (
            <Box sx={{ px: 5, py: 4, maxWidth: '960px', mx: 'auto' }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Console Home
              </Typography>

              {/* 시작하기 */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  시작하기
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  ✅ 생성된 프로젝트 수: <strong>{projectList.length}</strong>개
                </Typography>

                <Button fullWidth variant="outlined" sx={{ my: 1 }} onClick={handleAddProject}>
                  ➕ 새 프로젝트 생성
                </Button>
                <Button fullWidth variant="outlined" sx={{ my: 1 }}>
                  📂 기존 프로젝트 열기
                </Button>
                {/* <Button fullWidth variant="outlined" sx={{ my: 1 }}>
                  🔗 외부 프로젝트 불러오기
                </Button> */}
              </Box>

              {/* 현재 사용량 */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  현재 사용량
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>항목</TableCell>
                      <TableCell align="right">값</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>총 프로젝트 수</TableCell>
                      <TableCell align="right">{projectList.length}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>오늘 생성된 프로젝트</TableCell>
                      <TableCell align="right">1</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>최근 사용</TableCell>
                      <TableCell align="right">
                        {projectList.length > 0 ? projectList[projectList.length - 1].name : '-'}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>

              {/* 사용 가이드 */}
              <Box>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  사용 가이드
                </Typography>

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 2,
                  }}
                >
                  {[
                    {
                      icon: '✅',
                      title: '프로젝트 생성하고 분석 시작하기',
                      desc: '새로운 프로젝트를 생성한 뒤 데이터 엔지니어링부터 시각화까지!',
                    },
                    {
                      icon: '📊',
                      title: '임상 데이터 시각화',
                      desc: '다양한 통계 그래프와 대시보드로 분석 결과를 한눈에.',
                    },
                    {
                      icon: '🧠',
                      title: 'AI 기반 분석',
                      desc: '자연어로 입력하고 AI가 자동 분석 흐름을 설계합니다.',
                    },
                    {
                      icon: '📁',
                      title: '결과 저장 및 공유',
                      desc: '분석 결과를 저장하고 다른 사용자와 쉽게 공유해보세요.',
                    },
                  ].map((card, idx) => (
                    <Card key={idx} variant="outlined" sx={{ height: 200 }}>
                      <CardContent>
                        <Typography fontWeight="bold">
                          {card.icon} {card.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          {card.desc}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
