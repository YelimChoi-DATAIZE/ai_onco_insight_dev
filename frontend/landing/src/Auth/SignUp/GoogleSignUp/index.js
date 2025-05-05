import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Menubar from "../../../Menubar";
import MenubarUnder from "../../../MenubarUnder";
import Footer from "../../../Footer";

export default function SignUp() {
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [job, setJob] = useState("");

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
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("No Google login info found. Please log in again.");
      navigate("/signin");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/googleauth/signup",
        {
          country,
          company,
          job,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      console.log("회원가입 성공: ", response.data);
      alert("Registration completed. Redirecting to the login page.");
      navigate("/signin");
    } catch (error) {
      const defaultMessage = "An issue occurred during registration.";

      // 서버에서 응답이 왔고, 메시지가 있으면 그것을 표시
      const serverMessage = error.response?.data?.message;
      const readableMessage =
        serverMessage === "Unauthorized. Please log in."
          ? "Your authentication is invalid. Please log in again."
          : serverMessage || defaultMessage;

      console.error("회원가입 오류: ", serverMessage || error.message);
      alert(readableMessage);
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
