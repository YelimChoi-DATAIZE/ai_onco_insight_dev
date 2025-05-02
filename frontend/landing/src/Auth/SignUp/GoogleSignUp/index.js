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
  const [studyIntroduction, setStudyIntroduction] = useState("");
  const [dataIntroduction, setDataIntroduction] = useState("");
  const [country, setCountry] = useState("");
  const [animatedTitle, setAnimatedTitle] = useState("");

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

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("Google 정보가 일치하지 않습니다.");
      navigate("/signin");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/googleauth/signup",
        {
          country,
          company,
          studyIntroduction,
          dataIntroduction,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      console.log("회원가입 성공: ", response.data);
      alert("회원가입이 완료되었습니다. 로그인페이지로 이동합니다.");
      navigate("/signin");
    } catch (error) {
      console.error("회원가입 오류: ", error.response?.data || error.message);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    const fullTitle = "SIGN UP";
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              sx={{
                fontSize: "14px",
                fontFamily: "Noto Sans KR",
                textAlign: "left",
                lineHeight: "26px",
              }}
            >
              Country(*required)
            </Typography>
            <TextField
              select
              fullWidth
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              variant="outlined"
              required
              label="Select your country"
              InputProps={{
                style: {
                  backgroundColor: "#F1F5F8",
                  borderRadius: "3px",
                  padding: "10px 14px",
                  height: "45px",
                  fontSize: "12px",
                },
              }}
              sx={{
                mt: "10px",
                boxShadow: 1,
                fontSize: "12px",

                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            >
              {countries.map((c) => (
                <MenuItem
                  key={c.code}
                  value={c.code}
                  sx={{
                    fontSize: "12px",
                  }}
                >
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

          <Grid item xs={12}>
            <Typography
              sx={{
                fontSize: "14px",
                fontFamily: "Noto Sans KR",
                textAlign: "left",
                lineHeight: "26px",
              }}
            >
              Company or Hospital name(*required)
            </Typography>
            <TextField
              fullWidth
              label="Company or Hospital name"
              required
              variant="outlined"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
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
                  color: "#f5f5f5",
                },
                "& .MuiInputBase-input": {
                  color: "black",
                },
                mt: "10px",
                boxShadow: 1,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography
              sx={{
                fontSize: "14px",
                fontFamily: "Noto Sans KR",
                textAlign: "left",
                lineHeight: "26px",
              }}
            >
              Introduce your study
            </Typography>
            <TextField
              fullWidth
              label="Introduce your study"
              multiline
              rows={4}
              required
              variant="outlined"
              value={studyIntroduction}
              onChange={(e) => setStudyIntroduction(e.target.value)}
              InputProps={{
                style: {
                  backgroundColor: "#F1F5F8",
                  borderRadius: "3px",
                  border: "none",
                  padding: "10px 14px",
                  // height: "45px",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiInputLabel-root": {
                  color: "#f5f5f5",
                },
                "& .MuiInputBase-input": {
                  color: "black",
                },
                mt: "10px",
                boxShadow: 1,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography
              sx={{
                fontSize: "14px",
                fontFamily: "Noto Sans KR",
                textAlign: "left",
                lineHeight: "26px",
              }}
            >
              Introduce your data
            </Typography>
            <TextField
              fullWidth
              label="Introduce your data"
              multiline
              rows={4}
              required
              variant="outlined"
              value={dataIntroduction}
              onChange={(e) => setDataIntroduction(e.target.value)}
              InputProps={{
                style: {
                  backgroundColor: "#F1F5F8",
                  borderRadius: "3px",
                  border: "none",
                  padding: "10px 14px",
                  // height: "45px",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiInputLabel-root": {
                  color: "#f5f5f5",
                },
                "& .MuiInputBase-input": {
                  color: "black",
                },
                mt: "10px",
                boxShadow: 1,
              }}
            />
          </Grid>

          <Grid item xs={12} textAlign="center">
            <Button
              variant="contained"
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
                mt: 5,
                "&:hover": {
                  backgroundColor: "#357ae8",
                },
              }}
              onClick={handleSubmit}
            >
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </Box>

      <MenubarUnder />
      <Footer />
    </>
  );
}
