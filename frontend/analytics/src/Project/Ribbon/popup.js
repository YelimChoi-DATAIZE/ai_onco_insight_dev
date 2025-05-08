import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  TextField,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const RibbonPopup = ({ open, onClose }) => {
  const [selectedMenu, setSelectedMenu] = useState('Options');
  const menus = [
    'Options',
    'Toolbars',
    'Reduce Operations',
    'Categories',
    'Sub Menus & Popup Menus',
    'Gallery',
    'KeyTips',
    'Repository Editor',
  ];
  const centralItems = [
    'Undo',
    'Redo',
    'Cut',
    'Copy',
    'Paste',
    'Clear',
    'Select All',
    'Bullets',
    'Align Left',
    'Align Right',
    'Bold',
  ];
  const properties = [
    { key: 'Name', value: 'About' },
    { key: 'Align Left', value: 'Align Left' },
    { key: 'Align Right', value: 'Align Right' },
    { key: 'Bold', value: 'False' },
    { key: 'Auto Save', value: 'Enabled' },
  ];
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        sx: {
          backgroundColor: '#f3f3f3',
          border: '1px solid #ccc',
          overflow: 'hidden',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#e0e0e0',
          padding: '8px 16px',
          fontSize: '14px',
          color: '#333',
        }}
      >
        Ribbon Control Designer: Sub Menus & Popup Menus
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          padding: 0,
          height: '600px',
        }}
      >
        {/* Left Menu */}
        <Box
          sx={{
            width: '20%',
            borderRight: '1px solid #ccc',
            backgroundColor: '#e9e9e9',
            padding: '8px',
          }}
        >
          <List dense>
            {menus.map((menu) => (
              <ListItem
                key={menu}
                button
                selected={selectedMenu === menu}
                onClick={() => setSelectedMenu(menu)}
                sx={{
                  fontSize: '12px',
                  padding: '8px 12px',
                  color: selectedMenu === menu ? '#1976d2' : '#333',
                  backgroundColor: selectedMenu === menu ? '#dceeff' : 'inherit',
                }}
              >
                <ListItemText primary={menu} />
              </ListItem>
            ))}
          </List>
        </Box>
        {/* Central Content */}
        <Box
          sx={{
            width: '40%',
            borderRight: '1px solid #ccc',
            padding: '8px',
          }}
        >
          <Typography variant="subtitle2" sx={{ marginBottom: 1, fontSize: '12px' }}>
            Category: (All Items)
          </Typography>
          <Divider />
          <List dense>
            {centralItems.map((item) => (
              <ListItem
                key={item}
                button
                sx={{
                  padding: '8px 12px',
                  fontSize: '12px',
                  color: '#333',
                }}
              >
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>
        {/* Right Property Pane */}
        <Box
          sx={{
            width: '40%',
            padding: '8px',
          }}
        >
          <Typography variant="subtitle2" sx={{ fontSize: '12px', marginBottom: 1 }}>
            Properties
          </Typography>
          <Divider sx={{ marginBottom: 1 }} />
          {properties.map((prop) => (
            <Box
              key={prop.key}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
              }}
            >
              <Typography sx={{ fontSize: '12px', color: '#333' }}>{prop.key}</Typography>
              <TextField
                value={prop.value}
                size="small"
                variant="outlined"
                sx={{
                  width: '60%',
                  fontSize: '12px',
                }}
              />
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor: '#e0e0e0',
          padding: '8px',
        }}
      >
        <Button onClick={onClose} sx={{ fontSize: '12px' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
// PropTypes 정의
RibbonPopup.propTypes = {
  open: PropTypes.bool.isRequired, // `open`은 반드시 `bool`이어야 함
  onClose: PropTypes.func.isRequired, // `onClose`는 반드시 함수여야 함
};
export default RibbonPopup;
