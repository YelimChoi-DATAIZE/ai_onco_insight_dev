import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Collapse from "@mui/material/Collapse";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#000000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "30px",
  borderRadius: "10px",
  boxShadow: "none",
  border: "none",
  fontSize: "17px",
  fontFamily: "IBM Plex Sans KR",
}));

const Item_R = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#000000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "30px",
  borderRadius: "10px",
  boxShadow: "none",
  border: "none",
  fontSize: "14px",
  fontFamily: "IBM Plex Sans KR",
}));

const Item_M = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.7),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "20px",
  borderRadius: "10px",
  boxShadow: "none",
  border: "none",
  fontSize: "15px",
  fontFamily: "IBM Plex Sans KR",
}));

export default function Menubar() {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPicture, setUserPicture] = useState("");
  const navigate = useNavigate();

  //authentication check
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const googleUserInfo = localStorage.getItem("googleUserInfo");
    const basicUserInfo = localStorage.getItem("userInfo");

    if (token && (googleUserInfo || basicUserInfo)) {
      setIsLoggedIn(true);

      if (googleUserInfo) {
        const googleUser = JSON.parse(googleUserInfo);
        setUserName(googleUser.name || "User");
        setUserPicture(googleUser.picture || "");
      } else if (basicUserInfo) {
        const basicUser = JSON.parse(basicUserInfo);
        setUserName(basicUser.name || "User");
        setUserPicture("");
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("googleUserInfo");
    localStorage.removeItem("userInfo");
    setIsLoggedIn(false);
    navigate("/signin");
  };

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isMediumScreen) {
      setOpen(false);
    }
  }, [isMediumScreen]);

  const menuItems = [
    { label: "ABOUT", path: "/about" },
    { label: "SERVICES", path: "/service" },
    { label: "USE CASES", path: "/usecase" },
    { label: "CONTACT US", path: "/contact-us" },
    { label: "mCODE EXPLORER", path: "/mcodetrend" },
    { label: "SIGN IN", path: "/signin" },
  ];

  return (
    <>
      <Box sx={{ width: "100%", textAlign: "center", mt: "10px" }}>
        {!isMediumScreen ? (
          <>
            <Grid
              container
              sx={{
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "nowrap",
              }}
            >
              {/* Left Section: logo */}
              <Grid item sx={{ flexShrink: 0, ml: "30px", mt: "5px" }}>
                <Link
                  to="/home"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={"/static/Images/DataizeLogo.svg"}
                    alt="Logo"
                    style={{ height: "26px" }}
                  />
                </Link>
              </Grid>

              {/* Right Section: toggle menu */}
              <Grid item sx={{ flexShrink: 0, mr: 3 }}>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleMenu}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Divider sx={{ marginTop: 1 }} />
          </>
        ) : (
          <>
            <Grid
              container
              sx={{
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "nowrap",
              }}
            >
              {/* Left Menu Group */}
              <Grid
                item
                container
                spacing={2}
                sx={{
                  display: "flex",
                  flexWrap: "nowrap",
                  alignItems: "center",
                  ml: 8,
                  flexGrow: 1,
                }}
              >
                {/* Logo */}
                <Grid item sx={{ flexShrink: 0, mt: "5px" }}>
                  <Link
                    to="/home"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <img
                      src={"/static/Images/DataizeLogo.svg"}
                      alt="Logo"
                      style={{ height: "26px" }}
                    />
                  </Link>
                </Grid>

                {/* Menus */}
                {menuItems.slice(0, 5).map((item) => (
                  <Grid item sx={{ flexShrink: 0, ml: 8.5 }}>
                    <Link
                      to={item.path}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Item>{item.label}</Item>
                    </Link>
                  </Grid>
                ))}
              </Grid>

              {/* Right Menu Group */}
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  width: "auto",
                  minWidth: 150,
                  flexShrink: 0,
                  mr: 8,
                  gap: 4,
                }}
              >
                {isLoggedIn ? (
                  <>
                    <Item_R>
                      Welcome, {userName}!
                      <img
                        src={userPicture}
                        alt="User Profile"
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          marginLeft: "10px",
                        }}
                      />
                    </Item_R>
                    <Item_R>
                      {" "}
                      <Link
                        to="/plan"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        PLAN
                      </Link>
                    </Item_R>
                    <Link
                      to="/contactus"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#3CA7DF",
                          color: "white",
                          borderRadius: "25px",
                          textTransform: "none",
                          fontSize: "12px",
                          fontWeight: 300,
                          "&:hover": {
                            backgroundColor: "#3399cc",
                          },
                        }}
                      >
                        WORKSPACE
                      </Button>
                    </Link>
                    <Button
                      // variant="contained"
                      onClick={handleLogout}
                      sx={{
                        backgroundColor: "white",
                        color: "black",
                        borderRadius: "25px",
                        textTransform: "none",
                        fontSize: "12px",
                        fontWeight: 300,
                        "&:hover": {
                          backgroundColor: "#f5f5f5",
                        },
                      }}
                    >
                      LOGOUT
                    </Button>
                  </>
                ) : (
                  <>
                    <Item_R>
                      {" "}
                      <Link
                        to="/signin"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        SIGN IN
                      </Link>
                    </Item_R>
                    <Item_R>
                      {" "}
                      <Link
                        to="/plan"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        PLAN
                      </Link>
                    </Item_R>
                    <Item_R>
                      {" "}
                      <Link
                        to="/contactus"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#3CA7DF",
                            color: "white",
                            borderRadius: "25px",
                            textTransform: "none",
                            fontSize: "12px",
                            fontWeight: 300,
                            "&:hover": {
                              backgroundColor: "#3399cc",
                            },
                          }}
                        >
                          WORKSPACE
                        </Button>
                      </Link>
                    </Item_R>
                  </>
                )}
              </Grid>
            </Grid>
            <Divider sx={{ marginTop: 1 }} />
          </>
        )}

        {/* Collapsible Menu for Small Screens */}
        <Collapse in={open}>
          <Grid container spacing={3} sx={{ flexGrow: 1 }}>
            {menuItems.slice(0, 5).map((item) => (
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Link
                  to={item.path}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Item_M>{item.label}</Item_M>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Collapse>
      </Box>
      {/* <Divider sx={{ marginTop: 0 }} /> */}
    </>
  );
}
