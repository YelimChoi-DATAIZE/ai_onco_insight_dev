import React, { useState } from 'react';
import { AppBar, Toolbar, Tabs, Tab, Button, ButtonGroup, Typography, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DataArrayIcon from '@mui/icons-material/DataArray';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import InsightsIcon from '@mui/icons-material/Insights';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import RibbonPopup from './popup';

const RibbonMenu = ({ open }) => {
  const [tabValue, setTabValue] = useState(0);
  const [currentTabGroup, setCurrentTabGroup] = useState('home');
  const [popupOpen, setPopupOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 1 || newValue === 2) {
      setPopupOpen(true);
    }
  };

  const handleGroupChange = (group) => {
    setCurrentTabGroup(group);
    setTabValue(0);
  };

  const renderTabs = () => {
    if (currentTabGroup === 'home') {
      return (
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="secondary"
          textColor="inherit"
          sx={{
            backgroundColor: '#f0f0f0',
            padding: 0,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Tab
            icon={<FileUploadIcon sx={{ fontSize: '22px', color: '#0B6623' }} />}
            label={<span style={{ fontSize: '10px', textTransform: 'lowercase' }}>Upload</span>}
            sx={{ ml: 10 }}
          />
          <Tab
            icon={<AddCircleIcon sx={{ fontSize: '22px', color: '#0B6623' }} />}
            label={<span style={{ fontSize: '10px', textTransform: 'lowercase' }}>add row</span>}
          />
          <Tab
            icon={<AddCircleIcon sx={{ fontSize: '22px', color: '#0B6623' }} />}
            label={<span style={{ fontSize: '10px', textTransform: 'lowercase' }}>add column</span>}
          />
        </Tabs>
      );
    } else if (currentTabGroup === 'settings') {
      return (
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="secondary"
          textColor="inherit"
          sx={{
            backgroundColor: '#f0f0f0',
            padding: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Tab icon={<SettingsIcon />} label="Settings Tab 1" sx={{ ml: 10 }} />
          <Tab icon={<SettingsIcon />} label="Settings Tab 2" />
          <Tab icon={<SettingsIcon />} label="Settings Tab 3" />
        </Tabs>
      );
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        marginLeft: open ? 20 : 0,
        transition: 'margin-left 0.3s ease',
      }}
    >
      {/* AppBar with group buttons */}
      <AppBar position="static" sx={{ height: '35px', backgroundColor: '#4A6CA9' }}>
        <Toolbar
          sx={{
            // mt: {
            //   xs: -0.5, // Extra small devices (0px and up)
            //   sm: '-6px', // Small devices (600px and up)
            //   md: -1, // Medium devices (900px and up)
            //   lg: -1, // Large devices (1200px and up)
            //   xl: -1, // Extra large devices (1536px and up)
            // },
            ml: '60px',
            // height: "35px",
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ButtonGroup
            variant="contained"
            sx={{
              height: '35px',
              mt: -4,
              backgroundColor: 'grey',
              boxShadow: 'none',
              border: 'none',
              '& .MuiButtonGroup-grouped:not(:last-of-type)': {
                borderRight: 'none',
              },
            }}
          >
            <Button
              startIcon={<HomeIcon />}
              onClick={() => handleGroupChange('home')}
              sx={{
                height: '35px',
                fontSize: '14px',
                // padding: "0 15px",
                textTransform: 'none',
                color: '#f5f5f5',
                backgroundColor: '#4A6CA9',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  boxShadow: 'none',
                  color: '#4A6CA9',
                },
              }}
            >
              Home
            </Button>
            <Button
              startIcon={<DataArrayIcon />}
              onClick={() => handleGroupChange('home')}
              sx={{
                height: '35px',
                fontSize: '14px',
                padding: '0 15px',
                textTransform: 'none',
                color: '#f5f5f5',
                backgroundColor: '#4A6CA9',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  boxShadow: 'none',
                  color: '#4A6CA9',
                },
              }}
            >
              Data
            </Button>
            <Button
              startIcon={<InsightsIcon />}
              onClick={() => handleGroupChange('settings')}
              sx={{
                height: '35px',
                fontSize: '14px',
                padding: '0 15px',
                textTransform: 'none',
                color: '#f5f5f5',
                backgroundColor: '#4A6CA9',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  boxShadow: 'none',
                  color: '#4A6CA9',
                },
              }}
            >
              Analysis
            </Button>
            <Button
              startIcon={<SmartButtonIcon />}
              onClick={() => handleGroupChange('settings')}
              sx={{
                height: '35px',
                fontSize: '14px',
                padding: '0 15px',
                textTransform: 'none',
                color: '#f5f5f5',
                backgroundColor: '#4A6CA9',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  boxShadow: 'none',
                  color: '#4A6CA9',
                },
              }}
            >
              Advanced
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      {/* Tabs Section */}
      <Box>{renderTabs()}</Box>
      {/* Popup */}
      <RibbonPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </Box>
  );
};

export default RibbonMenu;
