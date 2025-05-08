import React, { useState, useMemo, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Grid, Button, Typography, Box, TextField } from '@mui/material';
import ColumnSelect from './ColumnSelect';
import FoISelect from './FoISelect';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Engineering2 = ({ columnDefs, selectColumn, selectedColumns, removeColumn }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid
        container
        sx={{
          flex: 0.5,
          height: '100vh',
          backgroundColor: '#f5f5f5',
          borderLeft: '2px solid #ddd',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          justifyContent: 'flex-start',
          // paddingTop: "5vh",
          fontSize: '14px',
          width: '100%',
        }}
      >
        <Box
          sx={{
            bgcolor: '#f5f5f5',
            display: 'flex',
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label="Column Select" {...a11yProps(0)} />
            <Tab label="FoI Select" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <ColumnSelect
              columnDefs={columnDefs}
              selectColumn={selectColumn}
              selectedColumns={selectedColumns}
              removeColumn={removeColumn}
            />
          </TabPanel>
          <TabPanel
            value={value}
            index={1}
            sx={{
              flex: 1, // ✅ 전체 크기 차지
              width: '100%', // ✅ 부모 컨테이너와 동일한 너비
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <FoISelect />
          </TabPanel>
        </Box>
      </Grid>
    </>
  );
};

export default Engineering2;
