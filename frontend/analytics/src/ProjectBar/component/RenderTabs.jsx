import React from "react";
import {
  Box,
  Tabs,
  Tab,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const CustomTabGrid = ({ onClickTab }) => {
  const result = [
    // big tabs
    { label: "Big 1", icon: <SettingsIcon />, type: "big" },
    { label: "Big 2", icon: <SettingsIcon />, type: "big" },
    { label: "Big 3", icon: <SettingsIcon />, type: "big" },
    // small tabs
    {
      label: "Tab 1",
      icon: <SettingsIcon sx={{ fontSize: 12 }} />,
      type: "small",
    },
    {
      label: "Tab 2",
      icon: <SettingsIcon sx={{ fontSize: 12 }} />,
      type: "small",
    },
    {
      label: "Tab 3",
      icon: <SettingsIcon sx={{ fontSize: 12 }} />,
      type: "small",
    },
    {
      label: "Tab 4",
      icon: <SettingsIcon sx={{ fontSize: 12 }} />,
      type: "small",
    },
    {
      label: "Tab 5",
      icon: <SettingsIcon sx={{ fontSize: 12 }} />,
      type: "small",
    },
    {
      label: "Tab 6",
      icon: <SettingsIcon sx={{ fontSize: 12 }} />,
      type: "small",
    },
  ];

  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 4 }}>
      {/* 전체를 앞 3개, 뒤 6개로 분리 */}
      <Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            backgroundColor: "#E7EFF3",
            padding: 1,
            borderRadius: "6px",
            mt: 1,
            ml: 4,
          }}
        >
          {result.slice(0, 3).map((tab, index) => (
            <Tooltip key={index} title={tab.label} arrow>
              <IconButton
                onClick={() => onClickTab(index)}
                sx={{
                  width: 48,
                  height: 48,
                  backgroundColor: "#fff",
                  "&:hover": {
                    backgroundColor: "#FFFFFF",
                  },
                }}
              >
                {tab.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Box>
        <Typography sx={{ textAlign: "center", mt: 1 }}>big tabs</Typography>
      </Box>

      <Box
        sx={{
          width: "1px",
          backgroundColor: "#d0d0d0",
          height: "80px",
          alignSelf: "center",
        }}
      />

      <Box>
        <Grid
          container
          spacing={1}
          sx={{
            backgroundColor: "#E7EFF3",
            padding: 1,
            borderRadius: "6px",
          }}
        >
          {result.slice(3).map((tab, index) => (
            <Grid item xs={4} key={index}>
              <Tooltip title={tab.label} arrow>
                <IconButton
                  size="small"
                  onClick={() => onClickTab(index + 3)}
                  sx={{
                    width: 28,
                    height: 28,
                    backgroundColor: "#fff",
                    "&:hover": {
                      backgroundColor: "#FFFFFF",
                    },
                  }}
                >
                  {tab.icon}
                </IconButton>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
        <Typography sx={{ textAlign: "center", mt: 0.5 }}>
          small tabs
        </Typography>
      </Box>
    </Box>
  );
};

const RenderTabs = ({
  currentTabGroup,
  tabValue,
  handleTabChange,
  triggerFileUpload,
  fileInputRef,
  handleFileUpload,
  isModalOpen,
  errorMessage,
  closeModal,
  addRow,
  addColumn,
}) => {
  if (currentTabGroup === "data") {
    return (
      <>
        <input
          type="file"
          accept=".xlsx, .xls, .csv"
          style={{ display: "none" }} // 화면에 보이지 않음
          ref={fileInputRef}
          onChange={handleFileUpload}
        />
        {isModalOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
            onClick={closeModal} // 배경 클릭 시 모달 닫기
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                minWidth: "300px",
                textAlign: "center",
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()} // 모달 클릭 시 닫히지 않도록 방지
            >
              <h3 style={{ marginBottom: "10px" }}>오류</h3>
              <p>{errorMessage}</p>
              <button
                onClick={closeModal}
                style={{
                  marginTop: "10px",
                  padding: "8px 12px",
                  backgroundColor: "#ff4d4d",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                닫기
              </button>
            </div>
          </div>
        )}

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="secondary"
          textColor="inherit"
          sx={{
            backgroundColor: "#E7EFF3",
            padding: 0,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Tab
            icon={
              <img
                src="/static/Images/app_icon/app_upload.svg"
                alt="Upload Icon"
                style={{
                  width: "26px",
                  height: "26px",
                  marginTop: "0px",
                }}
              />
            }
            label={
              <span style={{ fontSize: "13px", textTransform: "lowercase" }}>
                Upload
              </span>
            }
            onClick={triggerFileUpload}
            sx={{
              ml: 2,
              "&:hover": {
                backgroundColor: "#FFFFFF",
              },
            }}
          />
          <Tab
            icon={
              <img
                src="/static/Images/app_icon/app_addrow.svg"
                alt="Upload Icon"
                style={{
                  width: "26px",
                  height: "26px",
                  marginTop: "0px",
                }}
              />
            }
            label={
              <span
                style={{
                  fontSize: "13px",
                  textTransform: "lowercase",
                  mt: -1,
                }}
              >
                add row
              </span>
            }
            sx={{
              "&:hover": {
                backgroundColor: "#FFFFFF",
              },
            }}
            onClick={addRow}
          />
          <Tab
            icon={
              <img
                src="/static/Images/app_icon/app_addrow.svg"
                alt="Upload Icon"
                style={{
                  width: "26px",
                  height: "26px",
                  marginTop: "0px",
                }}
              />
            }
            label={
              <span
                style={{
                  fontSize: "13px",
                  textTransform: "lowercase",
                  mt: -1,
                }}
              >
                add column
              </span>
            }
            sx={{
              "&:hover": {
                backgroundColor: "#FFFFFF",
              },
            }}
            onClick={addColumn}
          />
        </Tabs>
      </>
    );
  } else if (currentTabGroup === "engineering") {
    return (
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="secondary"
        textColor="inherit"
        sx={{
          backgroundColor: "#E7EFF3",
          padding: 0,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Tab
          icon={
            <img
              src="/static/Images/app_icon/app_comprehend.svg"
              alt="Upload Icon"
              style={{
                width: "26px",
                height: "26px",
                marginTop: "0px",
              }}
            />
          }
          label={
            <span
              style={{
                fontSize: "13px",
                textTransform: "lowercase",
                mt: -1,
              }}
            >
              comprehend
            </span>
          }
          sx={{
            ml: 2,
            "&:hover": {
              backgroundColor: "#FFFFFF",
            },
          }}
        />
        <Tab
          icon={
            <img
              src="/static/Images/app_icon/app_foiex.svg"
              alt="Upload Icon"
              style={{
                width: "26px",
                height: "26px",
                marginTop: "0px",
              }}
            />
          }
          label={
            <span
              style={{
                fontSize: "13px",
                textTransform: "lowercase",
                mt: -1,
              }}
            >
              foi extraction
            </span>
          }
        />
        <Tab
          icon={
            <img
              src="/static/Images/app_icon/app_integrate.svg"
              alt="Upload Icon"
              style={{
                width: "26px",
                height: "26px",
                marginTop: "0px",
              }}
            />
          }
          label={
            <span
              style={{
                fontSize: "13px",
                // textTransform: "lowercase",
                mt: -1,
              }}
            >
              FHIR
            </span>
          }
          sx={{
            "&:hover": {
              backgroundColor: "#FFFFFF",
            },
          }}
        />{" "}
      </Tabs>
    );
  } else if (currentTabGroup === "analysis") {
    return (
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="secondary"
        textColor="inherit"
        sx={{
          backgroundColor: "#E7EFF3",
          padding: 0,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Tab
          icon={
            <img
              src="/static/Images/app_icon/app_eda.svg"
              alt="Upload Icon"
              style={{
                width: "26px",
                height: "26px",
                marginTop: "0px",
              }}
            />
          }
          label={
            <span
              style={{
                fontSize: "11px",
                // textTransform: "lowercase",
                mt: -1,
              }}
            >
              EXPLORATION
            </span>
          }
          sx={{
            ml: 2,
            "&:hover": {
              backgroundColor: "#FFFFFF",
            },
          }}
        />
        <Tab
          icon={
            <img
              src="/static/Images/app_icon/app_ttest.svg"
              alt="Upload Icon"
              style={{
                width: "26px",
                height: "26px",
                marginTop: "0px",
              }}
            />
          }
          label={
            <span
              style={{
                fontSize: "11px",
                // textTransform: "lowercase",
                mt: -1,
              }}
            >
              T-TEST
            </span>
          }
          sx={{
            "&:hover": {
              backgroundColor: "#FFFFFF",
            },
          }}
        />{" "}
        <Tab
          icon={
            <img
              src="/static/Images/app_icon/app_anova.svg"
              alt="Upload Icon"
              style={{
                width: "26px",
                height: "26px",
                marginTop: "0px",
              }}
            />
          }
          label={
            <span
              style={{
                fontSize: "11px",
                // textTransform: "lowercase",
                mt: -1,
              }}
            >
              ANOVA
            </span>
          }
          sx={{
            "&:hover": {
              backgroundColor: "#FFFFFF",
            },
          }}
        />{" "}
        <Tab
          icon={
            <img
              src="/static/Images/app_icon/app_reg.svg"
              alt="Upload Icon"
              style={{
                width: "26px",
                height: "26px",
                marginTop: "0px",
              }}
            />
          }
          label={
            <span
              style={{
                fontSize: "11px",
                // textTransform: "lowercase",
                mt: -1,
              }}
            >
              REGRESSION
            </span>
          }
          sx={{
            "&:hover": {
              backgroundColor: "#FFFFFF",
            },
          }}
        />{" "}
        <Tab
          icon={
            <img
              src="/static/Images/app_icon/app_freq.svg"
              alt="Upload Icon"
              style={{
                width: "26px",
                height: "26px",
                marginTop: "0px",
              }}
            />
          }
          label={
            <span
              style={{
                fontSize: "11px",
                // textTransform: "lowercase",
                mt: -1,
              }}
            >
              FREQUENCIES
            </span>
          }
          sx={{
            "&:hover": {
              backgroundColor: "#FFFFFF",
            },
          }}
        />{" "}
        <Tab
          icon={
            <img
              src="/static/Images/app_icon/app_factor.svg"
              alt="Upload Icon"
              style={{
                width: "26px",
                height: "26px",
                marginTop: "0px",
              }}
            />
          }
          label={
            <span
              style={{
                fontSize: "11px",
                // textTransform: "lowercase",
                mt: -1,
              }}
            >
              FACTOR
            </span>
          }
          sx={{
            "&:hover": {
              backgroundColor: "#FFFFFF",
            },
          }}
        />{" "}
      </Tabs>
    );
  } else if (currentTabGroup === "result") {
    return <CustomTabGrid onClickTab={(index) => handleTabChange(index)} />;
  }
};

export default RenderTabs;
