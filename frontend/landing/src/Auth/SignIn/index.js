import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField, Button, Grid, Typography, Box } from "@mui/material";
import AuthContext from "../AuthContext";
import Menubar from "../../Menubar";
import MenubarUnder from "../../MenubarUnder";
import Footer from "../../Footer";
import google from "../../Images/GoogleLogo.png";

//social login
import {
  GoogleLogin,
  GoogleOAuthProvider,
  useGoogleLogin,
} from "@react-oauth/google";
import axios from "axios";

export default function SignIn() {
  // basic sign in
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [googleerror, setGoogleError] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [nickname, setNickname] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const { handleLogin } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/home";

  const handleBasicSignIn = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/basicauth/signin",
        {
          email,
          password,
        },
      );

      const { token, user } = response.data;

      // 토큰 저장 및 로그인 처리
      localStorage.setItem("accessToken", token);
      localStorage.setItem("userInfo", JSON.stringify(user));
      handleLogin(token);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("로그인 오류:", error.response?.data || error.message);
      setError("The email or password is incorrect.");
    }
  };

  const GOOGLE_CLIENT_ID =
    "552828871029-e14mm49n228sidso41hatvl2mfbpst7i.apps.googleusercontent.com";

  const GoogleSignInButton = ({ setError }) => {
    const signIn = useGoogleLogin({
      flow: "implicit",
      scope: "openid email profile",
      onSuccess: async (tokenResponse) => {
        try {
          if (!tokenResponse.access_token) {
            setError("A Google sign-in error occurred.");
            return;
          }

          // 서버로 보내기 전에 Google API로부터 id_token을 얻어야 함
          const userInfoResponse = await axios.get(
            "https://www.googleapis.com/oauth2/v1/userinfo",
            {
              headers: {
                Authorization: `Bearer ${tokenResponse.access_token}`,
              },
            },
          );
          const response = await axios.post(
            "http://localhost:8000/api/user-auth/google-signin",
            JSON.stringify({ token: tokenResponse.access_token }),
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            },
          );

          localStorage.setItem("accessToken", response.data.token);
          handleLogin(response.data.token);
          localStorage.setItem(
            "googleUserInfo",
            JSON.stringify(response.data.user),
          );
          console.log("서버 응답: ", response.data);
          navigate(from, { replace: true });
          setGoogleError(null);
        } catch (error) {
          console.error("서버 오류: ", error.response?.data || error.message);
          setGoogleError("A Google sign-in error occurred.");
        }
      },
      onError: (error) => {
        console.error("로그인 에러: ", error);
        setGoogleError("A Google sign-in error occurred.");
      },
    });

    return (
      <Button
        variant="contained"
        onClick={() => signIn()}
        sx={{
          color: "white",
          borderColor: "#4285F4",
          backgroundColor: "#3CA7DF",
          width: {
            xs: "100%",
            sm: "400px",
            md: "400px",
            lg: "400px",
          },
          height: "45px",
          borderRadius: "20px",
          textTransform: "none",
          fontSize: "14px",
          fontWeight: "bold",
          mt: 0,
          "&:hover": {
            borderColor: "#357ae8",
          },
        }}
      >
        {" "}
        <img
          src={google}
          style={{
            // width: "30px",
            // height: "30px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        />
        SIGN IN with GOOGLE
      </Button>
    );
  };

  const GoogleSignUpButton = ({ setError }) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const signUp = useGoogleLogin({
      flow: "implicit",
      scope: "openid email profile",
      onSuccess: async (tokenResponse) => {
        try {
          if (!tokenResponse.access_token) {
            setError("A Google sign-in error occurred.");
            return;
          }

          const response = await axios.post(
            "http://localhost:8000/api/user-auth/google-verify",
            { token: tokenResponse.access_token },
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            },
          );

          if (response.data.message) {
            setMessage(response.data.message);
          }

          if (response.data.isNewUser) {
            localStorage.setItem("accessToken", tokenResponse.access_token);
            navigate("/google-signup");
          } else {
            setError(null);
          }
        } catch (error) {
          console.error("서버 오류: ", error.response?.data || error.message);
          setGoogleError("A Google sign-in error occurred.");
        }
      },
      onError: (error) => {
        console.error("로그인 에러: ", error);
        setGoogleError("A Google sign-in error occurred.");
      },
    });

    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "100%",
              md: "100%",
              lg: "400px",
            },
          }}
        >
          <Button
            variant="contained"
            onClick={signUp}
            sx={{
              color: "#212324",
              backgroundColor: "#f0f0f0",
              height: "45px",
              borderRadius: "20px",
              textTransform: "none",
              fontSize: "14px",
              width: "100%",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            SIGN UP with GOOGLE
          </Button>
        </Box>

        {message && (
          <Typography
            sx={{
              color: "red", // 파란색
              textAlign: "center", // 가운데 정렬
              fontSize: "13px",
              mt: 1,
            }}
          >
            {message}
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <>
      <Menubar />
      {/* Sign In */}
      <Box sx={{ width: { xs: "100%", lg: "1020px" }, mx: "auto", mt: "95px" }}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item>
            <Typography
              sx={{
                fontSize: "36px",
                fontWeight: "reugular",
                fontFamily: "IBM Plex Sans KR",
                letterSpacing: "0.21em",
                textAlign: "center",
                lineHeight: "63px",
              }}
            >
              SIGN IN
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          width: { xs: "330px", lg: "460px" },
          mx: "auto",
          mt: 5,
          p: 4,
          // boxShadow: 2,
          // borderRadius: 4,
          bgcolor: "white",
          mb: 5,
        }}
      >
        <Grid container spacing={2}>
          {/* Name */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              variant="outlined"
              InputProps={{
                style: { backgroundColor: "#F1F5F8", borderRadius: "4px" },
              }}
              sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              variant="outlined"
              InputProps={{
                style: { backgroundColor: "#F1F5F8", borderRadius: "4px" },
              }}
              sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
            />
          </Grid>

          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                onClick={handleBasicSignIn}
                sx={{
                  backgroundColor: "#3CA7DF",
                  color: "white",
                  width: "100%",
                  maxWidth: "400px",
                  height: "45px",
                  borderRadius: "20px",
                  textTransform: "none",
                  fontSize: "14px",
                  fontWeight: "bold",
                  mt: 3,
                  "&:hover": {
                    backgroundColor: "#357ae8",
                  },
                }}
              >
                SIGN IN
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ width: "100%" }}>
              <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <GoogleSignInButton setError={setError} />
                </div>
              </GoogleOAuthProvider>
              {error && (
                <Typography
                  sx={{
                    color: "red",
                    textAlign: "center",
                    fontSize: "13px",
                    mt: 1,
                  }}
                >
                  {error}
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              {" "}
              <Typography
                sx={{
                  fontSize: "16px",
                  fontFamily: "Noto Sans KR",
                  textAlign: "left",
                  lineHeight: "26px",
                  color: "#357ae8",
                  mt: 3,
                  mb: 1,
                }}
              >
                Don’t have an account?
              </Typography>
            </Box>
          </Grid>

          {/* basic sign up */}
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                onClick={() => navigate("/signup")}
                sx={{
                  color: "#212324",
                  backgroundColor: "#f0f0f0",
                  width: "100%",
                  maxWidth: "400px",
                  height: "45px",
                  borderRadius: "20px",
                  textTransform: "none",
                  fontSize: "14px",
                  mt: 0,
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                SIGN UP
              </Button>
            </Box>
          </Grid>

          {/* Google sign up button */}
          <Grid item xs={12}>
            <Box sx={{ width: "100%" }}>
              <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <GoogleSignUpButton setError={setGoogleError} />
                </div>
              </GoogleOAuthProvider>
            </Box>
            {googleerror && (
              <Typography
                sx={{
                  color: "red",
                  textAlign: "center",
                  fontSize: "13px",
                  mt: 1,
                }}
              >
                {googleerror}
              </Typography>
            )}
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              mt: 5,
            }}
          >
            <img
              src={"/static/Images/DataizeLogo.svg"}
              alt="Logo"
              style={{ height: "26px" }}
            />
          </Box>
        </Grid>
      </Box>

      <MenubarUnder />
      <Footer />
    </>
  );
}
