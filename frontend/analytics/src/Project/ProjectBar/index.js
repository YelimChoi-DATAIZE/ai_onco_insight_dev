import React, { useState, useRef } from 'react';
import { read, utils } from 'xlsx';

import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddHomeIcon from '@mui/icons-material/AddHome';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DatasetIcon from '@mui/icons-material/Dataset';
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Tabs, Tab } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ProjectTree from './ProjectTree';
import RenderTabs from './component/RenderTabs';
import { createDataFile } from '../../Remote/apis/data.js';

const drawerWidth = 240;

const DrawerHeader = styled('div')(() => ({
  height: 90,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '0 8px',
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `100%`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const ProjectBar = ({
  open,
  onOpen,
  onClose,
  onUpload,
  setActiveTab,
  addRow,
  addColumn,
  projectId,
}) => {
  const theme = useTheme();
  //   const [open, setOpen] = React.useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [currentTabGroup, setCurrentTabGroup] = useState('data');
  const fileInputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTabChange = (eventOrIndex, newValueMaybe) => {
    let index;
    let selectedTab = null;

    // ✅ Case 1: MUI Tabs 방식 (event, newValue)
    if (typeof newValueMaybe === 'number') {
      index = newValueMaybe;
      setTabValue(index);

      if (currentTabGroup === 'engineering') {
        selectedTab = `settings${index + 1}`;
      } else if (currentTabGroup === 'analysis') {
        selectedTab = `analysis${index + 1}`;
      } else if (currentTabGroup === 'result') {
        selectedTab = `result${index + 1}`;
      }
    }

    // ✅ Case 2: CustomTabGrid 방식 (index만 들어오는 경우)
    else if (typeof eventOrIndex === 'number') {
      index = eventOrIndex;
      selectedTab = `result${index + 1}`;
      setTabValue(index);
    }

    // ✅ 최종 반영
    if (selectedTab) {
      setActiveTab(selectedTab);
    }
  };

  const handleGroupChange = (group) => {
    setCurrentTabGroup(group);
    setTabValue(0);

    if (group === 'engineering') {
      setActiveTab('settings1');
    } else {
      setActiveTab(null);
    }
  };

  //file upload
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];

  //   if (!file) {
  //     showErrorModal('파일을 선택하세요.');
  //     return;
  //   }

  //   // 파일 확장자 검사
  //   const allowedExtensions = ['.csv', '.xls', '.xlsx'];
  //   const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();

  //   if (!allowedExtensions.includes(fileExtension)) {
  //     showErrorModal('CSV 또는 Excel 파일만 업로드 가능합니다.');
  //     return;
  //   }

  //   // 파일 크기 제한 (5MB)
  //   const maxSize = 10 * 1024 * 1024;
  //   if (file.size > maxSize) {
  //     showErrorModal('파일 크기가 5MB를 초과합니다.');
  //     return;
  //   }

  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     const data = new Uint8Array(e.target.result);
  //     const workbook = read(data, { type: 'array' });
  //     const sheetName = workbook.SheetNames[0];
  //     const worksheet = workbook.Sheets[sheetName];
  //     const jsonData = utils.sheet_to_json(worksheet, { header: 1 });

  //     if (jsonData.length === 0) {
  //       showErrorModal('엑셀 파일에 데이터가 없습니다.');
  //       return;
  //     }

  //     const headers = jsonData[0];
  //     const rows = jsonData.slice(1).map((row) => {
  //       const rowObject = {};
  //       headers.forEach((header, colIndex) => {
  //         rowObject[header] = row[colIndex] || '';
  //       });
  //       return rowObject;
  //     });

  //     // 부모 컴포넌트로 데이터 전달
  //     onUpload?.({ headers, rows }, file.name, file);

  //     console.log('업로드된 데이터:', { headers, rows });

  //     if (fileInputRef.current) {
  //       fileInputRef.current.value = '';
  //     }
  //   };

  //   reader.readAsArrayBuffer(file);
  // };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      showErrorModal('파일을 선택하세요.');
      return;
    }

    const allowedExtensions = ['.csv', '.xls', '.xlsx'];
    const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      showErrorModal('CSV 또는 Excel 파일만 업로드 가능합니다.');
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      showErrorModal('파일 크기가 10MB를 초과합니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = utils.sheet_to_json(worksheet, { header: 1 });

        if (jsonData.length === 0) {
          showErrorModal('엑셀 파일에 데이터가 없습니다.');
          return;
        }

        const headers = jsonData[0];
        const rows = jsonData.slice(1).map((row) => {
          const rowObject = {};
          headers.forEach((header, colIndex) => {
            rowObject[header] = row[colIndex] || '';
          });
          return rowObject;
        });

        // ✅ (1) 프론트 상태 전달
        onUpload?.({ headers, rows }, file.name, file);

        // ✅ (2) 바로 FormData 생성 후 서버 전송
        const formData = new FormData();
        formData.append('file', file);
        formData.append('project_id', projectId); // 🔁 상위에서 prop으로 전달받아야 함
        formData.append('version', 'v1');
        formData.append('version_description', '업로드 시점 저장');
        formData.append('row_count', rows.length.toString());
        formData.append('column_count', headers.length.toString());

        const res = await createDataFile(formData);
        if (res.status === 201) {
          alert('✅ 파일 업로드 및 메타데이터 저장 완료');
        } else {
          console.error(res);
          showErrorModal(res.data.message || '업로드 실패');
        }
      } catch (err) {
        console.error(err);
        showErrorModal('파일 파싱 또는 업로드 중 오류 발생');
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const showErrorModal = (message) => {
    setErrorMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrorMessage('');
  };

  const renderTabs = () => {
    return (
      <RenderTabs
        currentTabGroup={currentTabGroup}
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        triggerFileUpload={triggerFileUpload}
        fileInputRef={fileInputRef}
        handleFileUpload={handleFileUpload}
        isModalOpen={isModalOpen}
        errorMessage={errorMessage}
        closeModal={closeModal}
        addRow={addRow}
        addColumn={addColumn}
      />
    );
  };

  const iconMap = {
    DATA: '/static/Images/app_icon/app_data_icon.svg',
    ENGINEERING: '/static/Images/app_icon/app_engineering_icon.svg',
    ANALYSIS: '/static/Images/app_icon/app_analysis_icon.svg',
    RESULT: '/static/Images/app_icon/app_result_icon.svg',
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          // open={open}
          sx={{
            display: 'flex',
            marginTop: { lg: '40px', xs: '40px' },
            height: '40px',
            backgroundColor: '#FFFFFF',
            zIndex: 1200,
          }}
          elevation={0}
        >
          <Toolbar>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={{
                flexWrap: 'wrap', // 버튼 겹침 방지
                gap: 1, // 간격 조정
                mt: { lg: -5, sm: -5, xs: -4 },
              }}
            >
              <Grid
                item
                sx={{
                  flexGrow: 1,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  height: '48px',
                  // display: 'flex',
                  alignItems: 'center',
                }}
              >
                <ButtonGroup
                  variant="contained"
                  sx={{
                    height: '35px',
                    backgroundColor: 'grey',
                    boxShadow: 'none',
                    border: 'none',
                    display: 'inline-flex',
                    justifyContent: 'flex-start',
                    '& .MuiButtonGroup-grouped:not(:last-of-type)': {
                      borderRight: '1px solid white',
                    },
                  }}
                >
                  {['DATA', 'ENGINEERING', 'ANALYSIS', 'RESULT'].map((label) => {
                    const iconSrc = iconMap[label];

                    return (
                      <Button
                        key={label}
                        onClick={() => handleGroupChange(label.toLowerCase())}
                        sx={{
                          // width: '160px',
                          height: '48px',
                          justifyContent: 'flex-start',
                          padding: '0 15px',
                          textTransform: 'none',
                          color: '#000000',
                          display: 'flex',
                          alignItems: 'center',
                          backgroundColor: '#FFFFFF',
                          '&:hover': {
                            backgroundColor: '#E7EFF3',
                            boxShadow: 'none',
                            color: '#000000',
                          },
                        }}
                      >
                        <img
                          src={iconSrc}
                          alt={`${label} icon`}
                          style={{
                            width: '15px',
                            height: '15px',
                            marginTop: '15px',
                            marginRight: '15px',
                          }}
                        />
                        <Typography
                          sx={{
                            lineHeight: '16.8px',
                            fontSize: '14px',
                            fontFamily: 'Quicksand',
                            fontWeight: 400,
                            mt: '15px',
                          }}
                        >
                          {label}
                        </Typography>
                      </Button>
                    );
                  })}
                </ButtonGroup>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflowX: 'auto',
            position: 'relative',
            marginTop: '60px',
            paddingTop: '20px',
          }}
        >
          <DrawerHeader />
          <Box
            sx={{
              position: 'fixed',
              top: '80px',
              width: '100%',
              height: '80px',
              zIndex: 1000,
              backgroundColor: '#E7EFF3',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {renderTabs()}
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default ProjectBar;
