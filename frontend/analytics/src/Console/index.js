import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SettingsIcon from '@mui/icons-material/Settings';
import Project from '../Project';
import Menubar from '../Menubar';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function Console() {
  const defaultCards = [
    { id: 1, title: 'mCODE SEARCH', description: '' },
    { id: 2, title: 'DATA', description: '' },
    { id: 3, title: 'ENGINEERING', description: '' },
  ];

  const defaultCards2 = [
    { id: 4, title: 'ANALYSIS', description: '' },
    { id: 5, title: 'RESULT', description: '' },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [projectList, setProjectList] = useState([{ id: uuidv4(), name: 'Project 1' }]);

  const [projectContentMap, setProjectContentMap] = useState(() => {
    const initialId = projectList[0].id;
    return {
      [initialId]: {
        cards: [...defaultCards],
        cards2: [...defaultCards2],
      },
    };
  });

  const selectedProject = projectList[selectedIndex];
  const currentProject = projectContentMap[selectedProject.id] || {
    cards: [],
    cards2: [],
  };

  const [selectedCard, setSelectedCard] = useState(0);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedProjectName, setEditedProjectName] = useState('Project 1');

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  //project 1 번에 대한 project uuid 서버에 저장
  useEffect(() => {
    const defaultProject = projectList[0];
    const token = localStorage.getItem('accessToken');

    const createInitialProject = async () => {
      try {
        const res = await fetch('http://localhost:8000/projectdata/projectid_create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            projectId: defaultProject.id,
            projectName: defaultProject.name,
          }),
        });

        const result = await res.json();
        if (!res.ok) {
          console.warn('❌ 기본 프로젝트 서버 저장 실패:', result.message || result.error);
        } else {
          console.log('✅ 기본 프로젝트 서버 저장 완료');
        }
      } catch (err) {
        console.error('❌ 기본 프로젝트 생성 중 오류:', err);
      }
    };

    createInitialProject();
  }, []);

  //project 생성시 project uuid 서버에 저장
  const handleAddProject = async () => {
    const newProjectId = uuidv4();
    const nextProjectNumber = projectList.length + 1;
    const newProjectName = `Project ${nextProjectNumber}`;

    const newProject = {
      id: newProjectId,
      name: newProjectName,
    };

    // ✅ 서버에 먼저 저장 시도
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch('http://localhost:8000/projectdata/projectid_create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          projectId: newProjectId,
          projectName: newProjectName,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        console.warn('❌ 서버 저장 실패:', result.message || result.error);
        alert(`프로젝트 생성 실패: ${result.message || result.error}`);
        return;
      }

      console.log('✅ 서버 저장 성공:', result.message);

      // ✅ UI 상태 업데이트는 서버 저장 성공 후 수행
      setProjectList((prev) => [...prev, newProject]);
      setProjectContentMap((prev) => ({
        ...prev,
        [newProjectId]: {
          cards: [...defaultCards],
          cards2: [...defaultCards2],
        },
      }));
      setSelectedIndex(projectList.length); // 이건 여전히 동기적이므로 주의 필요
    } catch (error) {
      console.error('❌ 서버 요청 에러:', error);
      alert('프로젝트 생성 중 오류가 발생했습니다.');
    }
  };

  const handleProjectRename = () => {
    const updatedList = [...projectList];
    updatedList[selectedIndex] = {
      ...updatedList[selectedIndex],
      name: editedProjectName,
    };
    setProjectList(updatedList);

    // contentMap은 project id를 키로 갖기 때문에 변경할 필요 없음
    setIsEditingTitle(false);
  };

  return (
    <>
      <Menubar />
      <AppBar
        position="fixed"
        sx={{
          top: '40px',
          height: '48px',
          backgroundColor: '#3CA7DF',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
        }}
        elevation={0}
      >
        <Toolbar variant="dense" sx={{ minHeight: '32px !important', px: 2 }}>
          <img src={'/static/Images/ConsoleIcon.svg'} alt="Logo" style={{ height: '15px' }} />
          <Typography
            variant="h7"
            noWrap
            component="div"
            sx={{ fontWeight: 500, ml: 2, display: { xs: 'none', sm: 'block' } }}
          >
            CONSOLE
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f5f5f5' }}>
        {/* 좌측 Project Bar */}
        <Box
          sx={{
            width: 240,
            height: '100vh',
            borderRight: '1px solid #e0e0e0',
            bgcolor: '#fff',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              px: 2,
              pt: 2,
              pb: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '108px',
            }}
          >
            <Typography fontSize={14} fontWeight="bold">
              PROJECTS
            </Typography>
            <IconButton
              size="small"
              onClick={handleAddProject}
              sx={{
                backgroundColor: '#335694',
                color: '#fff',
                width: 24,
                height: 24,
                '&:hover': {
                  backgroundColor: '#2b4a7f',
                },
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
          <Divider />

          {/* 목록 */}
          <List dense disablePadding sx={{ overflowY: 'auto', flexGrow: 1 }}>
            {projectList.map((project, index) => (
              <ListItem disablePadding key={index}>
                <ListItemButton
                  selected={selectedIndex === index}
                  onClick={() => handleListItemClick(index)}
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

        {/* 우측 콘텐츠 영역 */}
        <Box
          sx={{
            flexGrow: 1,
            padding: 3,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '108px',
          }}
        >
          {/* 프로젝트 이름 + 설정 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: '50px' }}>
            {isEditingTitle ? (
              <TextField
                value={editedProjectName}
                onChange={(e) => setEditedProjectName(e.target.value)}
                onBlur={handleProjectRename}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleProjectRename();
                }}
                size="small"
                variant="standard"
                autoFocus
              />
            ) : (
              <Typography fontSize={20} fontWeight="bold" fontFamily="Noto Sans KR">
                {selectedProject.name}
              </Typography>
            )}
            <IconButton
              size="small"
              onClick={() => {
                setEditedProjectName(selectedProject.name);
                setIsEditingTitle(true);
              }}
              sx={{ padding: 0 }}
            >
              {/* <SettingsIcon fontSize="small" /> */}
              <img src={'/static/Images/setting.svg'} alt="Logo" style={{ height: '15px' }} />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              pr: 1,
              mb: 1,
              mr: '50px',
            }}
          >
            <Link to={`/project/${selectedProject.id}`}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                &gt; Go
              </Typography>
            </Link>
          </Box>

          {/* cards */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 2,
              alignContent: 'flex-start',
              mb: 3,
              ml: '50px',
              mr: '50px',
            }}
          >
            {currentProject.cards.map((card, index) => (
              <Card key={card.id} sx={{ height: 400, boxshadow: 'none' }} evaluation={0}>
                <CardActionArea
                  onClick={() => setSelectedCard(index)}
                  data-active={selectedCard === index ? '' : undefined}
                  sx={{
                    height: '100%',
                    '&[data-active]': {
                      backgroundColor: '#ffffff',
                      '&:hover': {
                        backgroundColor: '#ffffff',
                      },
                    },
                  }}
                >
                  <CardContent sx={{ height: '100%' }}>
                    <Typography fontSize={15} fontWeight="regular" fontFamily="Noto Sans KR">
                      {card.title}
                    </Typography>
                    <Divider flexItem sx={{ height: 10 }} />
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>

          {/* cards2 */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 2,
              alignContent: 'flex-start',
              ml: '50px',
              mr: '50px',
            }}
          >
            {currentProject.cards2.map((card, index) => (
              <Card key={card.id} sx={{ height: 400 }} evaluation={0}>
                <CardActionArea
                  onClick={() => setSelectedCard(index)}
                  data-active={selectedCard === index ? '' : undefined}
                  sx={{
                    height: '100%',
                    '&[data-active]': {
                      backgroundColor: '#ffffff',
                      '&:hover': {
                        backgroundColor: '#ffffff',
                      },
                    },
                  }}
                >
                  <CardContent sx={{ height: '100%' }}>
                    <Typography fontSize={15} fontWeight="regular" fontFamily="Noto Sans KR">
                      {card.title}
                    </Typography>
                    <Divider flexItem sx={{ height: 10 }} />
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
