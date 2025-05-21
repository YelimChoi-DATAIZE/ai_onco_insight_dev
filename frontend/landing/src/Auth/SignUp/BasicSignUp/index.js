import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Menubar from "../../../Menubar";
import MenubarUnder from "../../../MenubarUnder";
import Footer from "../../../Footer";
import { signUp } from "../../../Remote/apis/user-auth";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [authCode, setAuthCode] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);

  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [job, setJob] = useState("");

  // 실시간 비밀번호 확인
  useEffect(() => {
    setPasswordError(passwordConfirm !== "" && password !== passwordConfirm);
  }, [password, passwordConfirm]);

  // 이메일 인증코드 발송
  const handleSendAuthCode = async () => {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/send-code", {
        email,
      });
      setSentCode(res.data.code);
      alert("A verification code has been sent to your email.");
    } catch (err) {
      alert("Failed to send the verification code.");
    }
  };

  // 인증코드 확인
  const handleVerifyCode = () => {
    if (authCode === sentCode) {
      setEmailVerified(true);
      alert("Email verification complete.");
    } else {
      alert("The verification code does not match.");
    }
  };

  const navigate = useNavigate();

  const countries = [
    { code: "KR", label: "🇰🇷 South Korea" },
    { code: "US", label: "🇺🇸 United States" },
    { code: "JP", label: "🇯🇵 Japan" },
    { code: "CN", label: "🇨🇳 China" },
    { code: "FR", label: "🇫🇷 France" },
    { code: "DE", label: "🇩🇪 Germany" },
    { code: "GB", label: "🇬🇧 United Kingdom" },
    { code: "IN", label: "🇮🇳 India" },
    { code: "CA", label: "🇨🇦 Canada" },
    { code: "AU", label: "🇦🇺 Australia" },
  ];

  const joblist = [
    "Healthcare Provider/Hospital",
    "Academic Medical Center/Research Institution",
    "Pharmaceutical Company",
    "Medical Device Manufacturer",
    "Digital Health/Health Tech",
    "Healthcare Consulting",
    "Government Agency/Regulatory Body",
    "Other",
  ];

  const handleSubmit = async () => {
    // 클라이언트 측 유효성 검사
    if (
      !name ||
      !email ||
      !password ||
      !passwordConfirm ||
      !company ||
      !country ||
      !job
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (passwordError) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await signUp({
        name,
        email,
        password,
        country,
        company,
        job,
      });
      alert("Sign-up complete. Redirecting to login page.");
      navigate("/signin");
    } catch (error) {
      const defaultMessage = "An error occurred during sign-up.";
      const response = error.response;

      if (response?.data?.errors && Array.isArray(response.data.errors)) {
        // 💡 Mongoose validation 오류 처리
        alert("Input error:\n" + response.data.errors.join("\n"));
      } else if (response?.data?.message) {
        // 💬 명시적 메시지 처리
        alert(response.data.message);
      } else {
        alert(defaultMessage);
      }

      console.error("회원가입 오류:", error);
    }
  };

  //country emoji
  const getFlagUrl = (countryCode) =>
    `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;

  return (
    <>
      <Menubar />
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
              SIGN UP
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
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              variant="outlined"
              InputProps={{
                style: { backgroundColor: "#F1F5F8", borderRadius: "4px" },
              }}
              sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
            />
          </Grid>

          {/* Email + 인증코드 버튼 */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              variant="outlined"
              InputProps={{
                // endAdornment: (
                //   <InputAdornment position="end">
                //     <Button
                //       size="small"
                //       onClick={handleSendAuthCode}
                //       disabled={emailVerified}
                //       sx={{ fontSize: "12px" }}
                //     >
                //       인증코드 발송
                //     </Button>
                //   </InputAdornment>
                // ),
                style: { backgroundColor: "#F1F5F8", borderRadius: "4px" },
              }}
              sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
            />
          </Grid>

          {/* 인증코드 입력 */}
          {/* {sentCode && !emailVerified && (
            <>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder="Enter verification code"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                  variant="outlined"
                  InputProps={{
                    style: { backgroundColor: "#F1F5F8", borderRadius: "4px" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleVerifyCode}
                >
                  인증코드 확인
                </Button>
              </Grid>
            </>
          )}

          {emailVerified && (
            <Grid item xs={12}>
              <Typography fontSize="13px" color="green">
                ✅ 이메일 인증이 완료되었습니다.
              </Typography>
            </Grid>
          )} */}

          {/* Password */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              variant="outlined"
              InputProps={{
                style: { backgroundColor: "#F1F5F8", borderRadius: "4px" },
              }}
              sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
            />
          </Grid>

          {/* Password Confirm */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="password"
              placeholder="Password Confirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              error={passwordError}
              helperText={passwordError ? "비밀번호가 일치하지 않습니다." : ""}
              variant="outlined"
              InputProps={{
                style: { backgroundColor: "#F1F5F8", borderRadius: "4px" },
              }}
              sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
            />
          </Grid>

          {/* Company */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder="Company or Hospital name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              variant="outlined"
              InputProps={{
                style: { backgroundColor: "#F1F5F8", borderRadius: "4px" },
              }}
              sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
            />
          </Grid>

          {/* Country */}
          <Grid item xs={12}>
            <Typography
              sx={{
                fontSize: "14px",
                fontFamily: "Noto Sans KR",
                textAlign: "left",
                color: "#212324",
                lineHeight: "26px",
                mb: 0.5,
              }}
            >
              Country
            </Typography>
            <TextField
              select
              fullWidth
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              variant="outlined"
              InputProps={{
                style: {
                  backgroundColor: "#F1F5F8",
                  borderRadius: "4px",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              }}
            >
              {countries.map((c) => (
                <MenuItem key={c.code} value={c.code} sx={{ fontSize: "13px" }}>
                  <img
                    src={getFlagUrl(c.code)}
                    alt={c.label}
                    style={{
                      width: "20px",
                      marginRight: "8px",
                      verticalAlign: "middle",
                    }}
                  />
                  {c.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Job */}
          <Grid item xs={12}>
            <Typography
              sx={{
                fontSize: "14px",
                fontFamily: "Noto Sans KR",
                color: "#212324",
                textAlign: "left",
                lineHeight: "26px",
                mt: 0.5,
                mb: 0.5,
              }}
            >
              Job Type
            </Typography>
            <TextField
              select
              fullWidth
              required
              value={job}
              onChange={(e) => setJob(e.target.value)}
              variant="outlined"
              InputProps={{
                style: {
                  backgroundColor: "#F1F5F8",
                  borderRadius: "4px",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              }}
            >
              {joblist.map((label, idx) => (
                <MenuItem key={idx} value={label} sx={{ fontSize: "13px" }}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12} textAlign="center" sx={{ mt: 3, mb: 2 }}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#3CA7DF",
                color: "white",
                height: "45px",
                borderRadius: "6px",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#3399cc" },
              }}
              onClick={() => {
                // if (!emailVerified) return alert("이메일 인증을 완료해주세요.");
                if (passwordError) return alert("비밀번호를 확인해주세요.");
                handleSubmit();
              }}
            >
              START
            </Button>
          </Grid>
        </Grid>
      </Box>

      <MenubarUnder />
      <Footer />
    </>
  );
}
