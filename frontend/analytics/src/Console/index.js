import React, { useState } from 'react';
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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SettingsIcon from '@mui/icons-material/Settings';
import Project from '../Project';
import Menubar from '../Menubar';
import { Link } from 'react-router-dom';

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

  const [projectList, setProjectList] = useState(['Project 1']);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [projectContentMap, setProjectContentMap] = useState({
    'Project 1': {
      cards: [...defaultCards],
      cards2: [...defaultCards2],
    },
  });

  const selectedProject = projectList[selectedIndex];
  const currentProject = projectContentMap[selectedProject] || { cards: [], cards2: [] };

  const [selectedCard, setSelectedCard] = useState(0);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedProjectName, setEditedProjectName] = useState('');

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const handleAddProject = () => {
    const newProjectName = `Project ${projectList.length + 1}`;
    const updatedProjectList = [...projectList, newProjectName];
    setProjectList(updatedProjectList);
    setProjectContentMap({
      ...projectContentMap,
      [newProjectName]: {
        cards: [...defaultCards],
        cards2: [...defaultCards2],
      },
    });
    setSelectedIndex(updatedProjectList.length - 1); // 🟢 새 프로젝트 선택
  };

  const handleProjectRename = () => {
    const updatedList = [...projectList];
    updatedList[selectedIndex] = editedProjectName;
    setProjectList(updatedList);

    // 키 변경도 필요
    const updatedMap = { ...projectContentMap };
    const content = updatedMap[selectedProject];
    delete updatedMap[selectedProject];
    updatedMap[editedProjectName] = content;
    setProjectContentMap(updatedMap);

    setIsEditingTitle(false);
  };

  return (
    <>
      <Menubar />
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
              paddingTop: '60px',
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
                    primary={project}
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
            p: 3,
            pt: '60px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {/* 프로젝트 이름 + 설정 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
              <Typography variant="h5" fontWeight="regular">
                {selectedProject}
              </Typography>
            )}
            <IconButton
              size="small"
              onClick={() => {
                setEditedProjectName(selectedProject);
                setIsEditingTitle(true);
              }}
              sx={{ padding: 0 }}
            >
              <SettingsIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* cards */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              pr: 1,
              mt: 1,
            }}
          >
            <Link to="/project">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                &gt; Go
              </Typography>
            </Link>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 2,
              alignContent: 'flex-start',
            }}
          >
            {currentProject.cards.map((card, index) => (
              <Card key={card.id} sx={{ height: 400 }}>
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
                    <Typography variant="h5" component="div">
                      {card.title}
                    </Typography>
                    <Divider flexItem sx={{ height: 20 }} />
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
            }}
          >
            {currentProject.cards2.map((card, index) => (
              <Card key={card.id} sx={{ height: 400 }}>
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
                    <Typography variant="h5" component="div">
                      {card.title}
                    </Typography>
                    <Divider flexItem sx={{ height: 20 }} />
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
