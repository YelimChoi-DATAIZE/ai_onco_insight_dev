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
  const [isNewUser, setIsNewUser] = useState(false);
  const [nickname, setNickname] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [animatedTitle, setAnimatedTitle] = useState("");

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
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
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
            setError("Google 로그인 오류가 발생했습니다.");
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
            "http://localhost:8000/googleauth/signin",
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
          setError(null);
        } catch (error) {
          console.error("서버 오류: ", error.response?.data || error.message);
          setError("Google 로그인 오류가 발생했습니다.");
        }
      },
      onError: (error) => {
        console.error("로그인 에러: ", error);
        setError("Google 로그인 오류가 발생했습니다.");
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
          console.log("Received Token Response: ", tokenResponse);

          if (!tokenResponse.access_token) {
            console.error("Error: Access token is missing.");
            setError("Google 회원가입 오류가 발생했습니다.");
            return;
          }

          const response = await axios.post(
            "http://localhost:8000/googleauth/verify",
            { token: tokenResponse.access_token },
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            },
          );

          //get new user is or not
          if (response.data.message) {
            setMessage(response.data.message);
          }

          if (response.data.isNewUser) {
            console.log("신규 사용자입니다. 회원가입 페이지로 이동합니다.");
            localStorage.setItem("accessToken", tokenResponse.access_token);
            navigate("/google-signup");
          } else {
            console.log("서버 응답: ", response.data);
            setError(null);
          }
        } catch (error) {
          console.error("서버 오류: ", error.response?.data || error.message);
          setError("Google 회원가입 오류가 발생했습니다.");
        }
      },
      onError: (error) => {
        console.error("로그인 에러: ", error);
        setError("Google 회원가입 오류가 발생했습니다.");
      },
    });

    return (
      <div style={{ textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={() => signUp()}
          sx={{
            color: "#212324",
            borderColor: "#4285F4",
            backgroundColor: "#f0f0f0",
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
            // fontWeight: "bold",
            mt: 0,
            "&:hover": {
              borderColor: "#357ae8",
            },
          }}
        >
          SIGN UP with GOOGLE
        </Button>

        {message && (
          <Typography
            variant="body1"
            color="primary"
            sx={{ mt: 2, fontSize: "16px" }}
          >
            {message}
          </Typography>
        )}
      </div>
    );
  };

  useEffect(() => {
    const fullTitle = "SIGN IN";
    let current = "";
    let i = 0;

    const typeTitle = () => {
      if (i < fullTitle.length) {
        current += fullTitle[i];
        setAnimatedTitle(current);
        i++;
        setTimeout(typeTitle, 100); // 글자 간 간격 조절
      }
    };

    typeTitle();
  }, []);

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
                fontWeight: "bold",
                fontFamily: "IBM Plex Sans KR",
                letterSpacing: "0.21em",
                textAlign: "center",
                lineHeight: "63px",
              }}
            >
              {animatedTitle}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          // height: "50vh",
          width: { xs: "330px", lg: "460px" },
          mx: "auto",
          mt: 5,
          p: 4,
          boxShadow: 2,
          borderRadius: 12,
          bgcolor: "white",
          mb: 5,
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Grid item xs={12}>
            <Typography
              sx={{
                fontSize: "16px",
                fontFamily: "Noto Sans KR",
                textAlign: "left",
                lineHeight: "26px",
              }}
            >
              Email
            </Typography>
            <TextField
              fullWidth
              // label="Name*"
              required
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                style: {
                  backgroundColor: "#F1F5F8",
                  borderRadius: "3px",
                  border: "none",
                  padding: "10px 14px",
                  height: "45px",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                },
                "& .MuiInputBase-input": {
                  color: "black",
                },
                mt: "10px",
                boxShadow: 1,
                width: {
                  xs: "100%",
                  sm: "400px",
                  md: "400px",
                  lg: "400px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography
              sx={{
                fontSize: "16px",
                fontFamily: "Noto Sans KR",
                textAlign: "left",
                lineHeight: "26px",
              }}
            >
              Password
            </Typography>
            <TextField
              fullWidth
              // label="Name*"
              required
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                style: {
                  backgroundColor: "#F1F5F8",
                  borderRadius: "3px",
                  border: "none",
                  padding: "10px 14px",
                  height: "45px",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                },
                "& .MuiInputBase-input": {
                  color: "black",
                },
                mt: "10px",
                boxShadow: 1,
                width: {
                  xs: "100%",
                  sm: "400px",
                  md: "400px",
                  lg: "400px",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ width: "100%" }}>
              <Button
                variant="contained"
                onClick={handleBasicSignIn}
                sx={{
                  backgroundColor: "#3CA7DF",
                  color: "white",
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
            </Box>
            {error && (
              <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
            )}
          </Grid>

          <Grid item xs={12}>
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
          </Grid>

          {/* basic sign up */}
          <Grid item xs={12}>
            <Box sx={{ width: "100%" }}>
              <Button
                variant="contained"
                onClick={() => navigate("/signup")}
                sx={{
                  color: "#212324",
                  borderColor: "#4285F4",
                  backgroundColor: "#f0f0f0",
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
                  // fontWeight: "bold",
                  mt: 0,
                  "&:hover": {
                    borderColor: "#357ae8",
                  },
                }}
              >
                SIGN UP
              </Button>
            </Box>
          </Grid>

          {/* Google sign up button */}
          <Grid item xs={12}>
            <Box sx={{ width: "100%", mb: "50px" }}>
              <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <GoogleSignUpButton setError={setError} />
                </div>
              </GoogleOAuthProvider>
            </Box>
          </Grid>

          <img
            src={"/static/Images/DataizeLogo.svg"}
            alt="Logo"
            style={{ height: "26px" }}
          />
        </Grid>
      </Box>

      <MenubarUnder />
      <Footer />
    </>
  );
}
