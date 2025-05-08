import React, { useState } from 'react';

import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import clsx from 'clsx';
import { animated, useSpring } from '@react-spring/web';
import Collapse from '@mui/material/Collapse';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderRounded from '@mui/icons-material/FolderRounded';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { useTreeItem2 } from '@mui/x-tree-view/useTreeItem2';
import {
  TreeItem2Checkbox,
  TreeItem2Content,
  TreeItem2IconContainer,
  TreeItem2Label,
  TreeItem2Root,
} from '@mui/x-tree-view/TreeItem2';
import { TreeItem2Icon } from '@mui/x-tree-view/TreeItem2Icon';
import { TreeItem2Provider } from '@mui/x-tree-view/TreeItem2Provider';
import { TreeItem2DragAndDropOverlay } from '@mui/x-tree-view/TreeItem2DragAndDropOverlay';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  marginTop: '16px', // 기본값
  [theme.breakpoints.up('lg')]: {
    marginTop: '30px',
  },
  [theme.breakpoints.up('sm')]: {
    marginTop: '20px',
  },
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      },
    },
  ],
}));

const ITEMS = [
  {
    id: '1',
    label: 'Documents',
    children: [
      {
        id: '1.1',
        label: 'Company',
        children: [
          { id: '1.1.1', label: 'Invoice', fileType: 'pdf' },
          { id: '1.1.2', label: 'Meeting notes', fileType: 'doc' },
          { id: '1.1.3', label: 'Tasks list', fileType: 'doc' },
          { id: '1.1.4', label: 'Equipment', fileType: 'pdf' },
          { id: '1.1.5', label: 'Video conference', fileType: 'video' },
        ],
      },
      { id: '1.2', label: 'Personal', fileType: 'folder' },
      { id: '1.3', label: 'Group photo', fileType: 'image' },
    ],
  },
  {
    id: '2',
    label: 'Bookmarked',
    fileType: 'pinned',
    children: [
      { id: '2.1', label: 'Learning materials', fileType: 'folder' },
      { id: '2.2', label: 'News', fileType: 'folder' },
      { id: '2.3', label: 'Forums', fileType: 'folder' },
      { id: '2.4', label: 'Travel documents', fileType: 'pdf' },
    ],
  },
  { id: '3', label: 'History', fileType: 'folder' },
  { id: '4', label: 'Trash', fileType: 'trash' },
];

function DotIcon() {
  return (
    <Box
      sx={{
        width: 6,
        height: 6,
        borderRadius: '70%',
        bgcolor: 'warning.main',
        display: 'inline-block',
        verticalAlign: 'middle',
        zIndex: 1,
        mx: 1,
      }}
    />
  );
}

const StyledTreeItemRoot = styled(TreeItem2Root)(({ theme }) => ({
  color: theme.palette.grey[400],
  position: 'relative',
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: theme.spacing(3.5),
  },
  ...theme.applyStyles('light', {
    color: theme.palette.grey[800],
  }),
}));

const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
  flexDirection: 'row-reverse',
  borderRadius: theme.spacing(0.7),
  marginBottom: theme.spacing(0.5),
  marginTop: theme.spacing(0.5),
  padding: theme.spacing(0.5),
  paddingRight: theme.spacing(1),
  fontWeight: 500,
  [`&.Mui-expanded `]: {
    '&:not(.Mui-focused, .Mui-selected, .Mui-selected.Mui-focused) .labelIcon': {
      color: theme.palette.primary.dark,
      ...theme.applyStyles('light', {
        color: theme.palette.primary.main,
      }),
    },
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      left: '16px',
      top: '44px',
      height: 'calc(100% - 48px)',
      width: '1.5px',
      backgroundColor: theme.palette.grey[700],
      ...theme.applyStyles('light', {
        backgroundColor: theme.palette.grey[300],
      }),
    },
  },
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: 'white',
    ...theme.applyStyles('light', {
      color: theme.palette.primary.main,
    }),
  },
  [`&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    ...theme.applyStyles('light', {
      backgroundColor: theme.palette.primary.main,
    }),
  },
}));

const AnimatedCollapse = animated(Collapse);

function TransitionComponent(props) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
    },
  });

  return <AnimatedCollapse style={style} {...props} />;
}

const StyledTreeItemLabelText = styled(Typography)({
  color: 'inherit',
  fontFamily: 'General Sans',
  fontWeight: 500,
});

function CustomLabel({ icon: Icon, expandable, children, ...other }) {
  return (
    <TreeItem2Label
      {...other}
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {Icon && (
        <Box
          component={Icon}
          className="labelIcon"
          color="inherit"
          sx={{ mr: 1, fontSize: '1.2rem' }}
        />
      )}

      <StyledTreeItemLabelText variant="body2">{children}</StyledTreeItemLabelText>
      {expandable && <DotIcon />}
    </TreeItem2Label>
  );
}

const isExpandable = (reactChildren) => {
  if (Array.isArray(reactChildren)) {
    return reactChildren.length > 0 && reactChildren.some(isExpandable);
  }
  return Boolean(reactChildren);
};

const getIconFromFileType = (fileType) => {
  switch (fileType) {
    case 'image':
      return ImageIcon;
    case 'pdf':
      return PictureAsPdfIcon;
    case 'doc':
      return ArticleIcon;
    case 'video':
      return VideoCameraBackIcon;
    case 'folder':
      return FolderRounded;
    case 'pinned':
      return FolderOpenIcon;
    case 'trash':
      return DeleteIcon;
    default:
      return ArticleIcon;
  }
};

const CustomTreeItem = React.forwardRef(function CustomTreeItem(props, ref) {
  const { id, itemId, label, disabled, children, ...other } = props;

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getCheckboxProps,
    getLabelProps,
    getGroupTransitionProps,
    getDragAndDropOverlayProps,
    status,
    publicAPI,
  } = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref });

  const item = publicAPI.getItem(itemId);
  const expandable = isExpandable(children);
  let icon;
  if (expandable) {
    icon = FolderRounded;
  } else if (item.fileType) {
    icon = getIconFromFileType(item.fileType);
  }

  return (
    <TreeItem2Provider itemId={itemId}>
      <StyledTreeItemRoot {...getRootProps(other)}>
        <CustomTreeItemContent
          {...getContentProps({
            className: clsx('content', {
              'Mui-expanded': status.expanded,
              'Mui-selected': status.selected,
              'Mui-focused': status.focused,
              'Mui-disabled': status.disabled,
            }),
          })}
        >
          <TreeItem2IconContainer {...getIconContainerProps()}>
            <TreeItem2Icon status={status} />
          </TreeItem2IconContainer>
          <TreeItem2Checkbox {...getCheckboxProps()} />
          <CustomLabel
            {...getLabelProps({
              icon,
              expandable: expandable && status.expanded,
            })}
          />
          <TreeItem2DragAndDropOverlay {...getDragAndDropOverlayProps()} />
        </CustomTreeItemContent>
        {children && <TransitionComponent {...getGroupTransitionProps()} />}
      </StyledTreeItemRoot>
    </TreeItem2Provider>
  );
});

const INITIAL_ITEMS = ITEMS;

const ProjectBar = ({ open, onClose }) => {
  const theme = useTheme();
  //   const [open, setOpen] = React.useState(false);
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [folderCount, setFolderCount] = useState(1);
  const [newFolderName, setNewFolderName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setNewFolderName('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateProject = () => {
    if (!newFolderName.trim()) return;

    const newFolder = {
      id: `new-folder-${folderCount}`,
      label: newFolderName,
      children: [
        {
          id: `new-folder-${folderCount}-1`,
          label: 'Company',
          children: [
            {
              id: `new-folder-${folderCount}-1.1`,
              label: 'Invoice',
              fileType: 'pdf',
            },
            {
              id: `new-folder-${folderCount}-1.2`,
              label: 'Meeting notes',
              fileType: 'doc',
            },
            {
              id: `new-folder-${folderCount}-1.3`,
              label: 'Tasks list',
              fileType: 'doc',
            },
            {
              id: `new-folder-${folderCount}-1.4`,
              label: 'Equipment',
              fileType: 'pdf',
            },
            {
              id: `new-folder-${folderCount}-1.5`,
              label: 'Video conference',
              fileType: 'video',
            },
          ],
        },
        {
          id: `new-folder-${folderCount}-2`,
          label: 'Personal',
          fileType: 'folder',
        },
        {
          id: `new-folder-${folderCount}-3`,
          label: 'Group photo',
          fileType: 'image',
        },
      ],
    };

    setItems([...items, newFolder]);
    setFolderCount(folderCount + 1);
    setIsModalOpen(false);
  };

  const [tabValue, setTabValue] = useState(0);
  const [currentTabGroup, setCurrentTabGroup] = useState('data');
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

  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={onClose} sx={{ fontSize: '10px', mt: { lg: '10px', xs: '10px' } }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* <TextField
          label="New Folder Name"
          variant="outlined"
          size="small"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          sx={{ width: 150, mr: 1 }}
        /> */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
          sx={{ display: open ? 'block' : 'none' }} // Drawer가 닫히면 숨김
        >
          + New Project
        </Button>
        <RichTreeView
          items={items}
          defaultExpandedItems={['1', '1.1']}
          defaultSelectedItems="1.1"
          sx={{
            height: 'fit-content',
            flexGrow: 1,
            maxWidth: 400,
            overflowY: 'auto',
          }}
          slots={{ item: CustomTreeItem }}
        />
      </Drawer>
      {/* 프로젝트 생성 모달 */}
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>새 프로젝트 생성</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="프로젝트 이름"
            type="text"
            fullWidth
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            취소
          </Button>
          <Button onClick={handleCreateProject} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ProjectBar;
