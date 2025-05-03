import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
// import SearchIcon from "../../Images/SearchIcon.svg";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Container,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { AgCharts } from "ag-charts-react";
import keywordData from "./temp.json";

const trendingKeywords = [
  "breast cancer",
  "lung cancer",
  "prognosis",
  "metastasis",
  "chemotherapy",
  "radiation therapy",
  "triple negative",
  "screening",
  "biomarker",
];

const getData = (keyword) => {
  return keywordData[keyword.toLowerCase()] || [];
};

const pubmedNews = [
  {
    title: "Breast cancer risk linked to novel BRCA1 mutation",
    source: "PubMed - Nature Reviews",
    time: "2024 Dec",
    image: "https://via.placeholder.com/80x80?text=Breast",
  },
  {
    title:
      "Lung cancer targeted therapy shows improved survival in phase 3 trial",
    source: "PubMed - J Clin Oncol",
    time: "2025 Jan",
    image: "https://via.placeholder.com/80x80?text=Lung",
  },
  {
    title:
      "Prognostic biomarkers identified in early-stage triple-negative breast cancer",
    source: "PubMed - Cancer Research",
    time: "2024 Nov",
    image: "https://via.placeholder.com/80x80?text=Prognosis",
  },
  {
    title:
      "New insights into metastasis mechanism via epithelial-mesenchymal transition",
    source: "PubMed - Cell Reports",
    time: "2024 Dec",
    image: "https://via.placeholder.com/80x80?text=Metastasis",
  },
  {
    title:
      "Adjuvant chemotherapy in HER2-positive patients: Updated guidelines",
    source: "PubMed - Lancet Oncology",
    time: "2024 Oct",
    image: "https://via.placeholder.com/80x80?text=Chemo",
  },
  {
    title: "Radiation therapy combined with immunotherapy shows promise",
    source: "PubMed - Radiother Oncol",
    time: "2025 Feb",
    image: "https://via.placeholder.com/80x80?text=Radiation",
  },
  {
    title:
      "Triple-negative breast cancer: Advances in drug resistance research",
    source: "PubMed - Oncotarget",
    time: "2025 Jan",
    image: "https://via.placeholder.com/80x80?text=Triple",
  },
  {
    title: "AI-enhanced screening tools improve early breast cancer detection",
    source: "PubMed - JAMA Oncology",
    time: "2024 Dec",
    image: "https://via.placeholder.com/80x80?text=Screening",
  },
  {
    title:
      "Biomarker panel validated for immunotherapy response in lung cancer",
    source: "PubMed - Nat Med",
    time: "2025 Jan",
    image: "https://via.placeholder.com/80x80?text=Biomarker",
  },
  {
    title: "Clinical trials show promise in rare subtype of breast cancer",
    source: "PubMed - NEJM",
    time: "2024 Nov",
    image: "https://via.placeholder.com/80x80?text=Trial",
  },
];

const NewsCards = () => {
  return (
    <Box sx={{ backgroundColor: "#f1f6fd", py: 4 }}>
      <Box
        sx={{
          maxWidth: "1080px",
          margin: "0 auto",
          px: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="subtitle1" fontWeight={700}>
            Why these cancer keyword is popular?
          </Typography>
        </Box>

        {/* Research Paper Cards */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflowX: "auto",
            gap: 2,
            pb: 1,
          }}
        >
          {pubmedNews.map((news, i) => (
            <Paper
              key={i}
              sx={{
                maxWidth: 260,
                borderRadius: 4,
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                flexShrink: 0,
              }}
              elevation={0}
            >
              <img
                src={news.image}
                alt="thumbnail"
                style={{
                  width: "100%",
                  height: 120,
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
              <Typography variant="body2" fontWeight={600} noWrap>
                {news.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {news.time} ・ {news.source}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const [currentKeyword, setCurrentKeyword] = useState(trendingKeywords[0]);
  const [index, setIndex] = useState(0);
  const [previousKeyword, setPreviousKeyword] = useState("");
  const [activeKeywords, setActiveKeywords] = useState([]);
  const [fadeIn, setFadeIn] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const chartOptions = useMemo(() => {
    const visibleKeywords = activeKeywords.slice(-2);

    const series = visibleKeywords.map((keyword, i) => ({
      data: getData(keyword),
      type: "area",
      xKey: "month",
      yKey: "value",
      yName: keyword,
      stacked: false,
      stroke: i === visibleKeywords.length - 1 ? "#27bfbb" : "#4c4f7b",
      fill: {
        type: "gradient",
        rotation: 180,
        colorStops: [
          {
            color: i === visibleKeywords.length - 1 ? "#27bfbb" : "#4c4f7b",
            stop: 0,
          },
          { color: "#cccccc", stop: 1 },
        ],
      },
      fillOpacity: i === visibleKeywords.length - 1 ? 0.15 : 0.06,
      strokeWidth: i === visibleKeywords.length - 1 ? 2 : 2,
      marker: {
        enabled: i === visibleKeywords.length - 1,
        fill: "#27bfbb",
      },
      interpolation: { type: "step" },
    }));

    return {
      data: [],
      series,
      axes: [
        {
          type: "category",
          position: "bottom",
          gridLine: { enabled: false },
          gridStyle: [],
          label: { enabled: true },
          line: { color: "#eeeeee" },
          tick: { size: 0, color: "#eeeeee" },
        },
        {
          type: "number",
          position: "left",
          gridLine: { enabled: false },
          gridStyle: [],
          label: { enabled: false },
          line: { color: "#eeeeee" },
          tick: { size: 0, color: "#eeeeee" },
        },
      ],
      background: { fill: "#F2F5F8" },
      legend: { enabled: false },
      padding: { top: 10, bottom: 10, left: 10, right: 10 },
    };
  }, [activeKeywords]);

  useEffect(() => {
    const nextKeyword = trendingKeywords[index];
    setPreviousKeyword(currentKeyword);
    setCurrentKeyword(nextKeyword);
  }, [index]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setFadeIn(false);

      setTimeout(() => {
        const newIndex = (index + 1) % trendingKeywords.length;
        const nextKeyword = trendingKeywords[newIndex];

        setIndex(newIndex);
        setActiveKeywords((prev) => {
          const updated = [...prev, nextKeyword];
          return updated.slice(-1);
        });

        setFadeIn(true);
      }, 300);
    }, 1500);

    return () => clearInterval(interval);
  }, [index, isPlaying]);

  useEffect(() => {
    setCurrentKeyword(trendingKeywords[index]);
  }, [index]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/articlesearch?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <>
      <Box sx={{ position: "relative", height: 300, width: "100%" }}>
        {/* Chart */}
        <Paper
          elevation={0}
          sx={{
            height: "100%",
            width: "100%",
            borderRadius: 0,
            mt: { xs: 0, sm: 0 },
          }}
        >
          <AgCharts options={chartOptions} style={{ height: "500px" }} />
        </Paper>

        {/* Floating Keyword + Search Bar*/}
        <Box
          sx={{
            position: "absolute",
            top: 120,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            // px: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column" },
              alignItems: { xs: "center", sm: "center" },
              justifyContent: "center",
              gap: { xs: 4, sm: 6 },
              maxWidth: { xs: "400px", sm: "1000px" },
              ml: { xs: 0, sm: 0 },
            }}
          >
            {/* Floating Keyword */}
            <Typography
              sx={{
                fontSize: { xs: "25px", sm: "30px" },
                fontFamily: "Noto Sans KR",
                color: "#414444",
                fontWeight: 400,
                lineHeight: 1.4,
                whiteSpace: "pre-line",
                textAlign: "center",
                ml: { xs: 0, sm: 0 },
              }}
            >
              {"Discover ocology"}
              <Box
                component="span"
                sx={{
                  backgroundColor: "#fff176",
                  borderRadius: "4px",
                  fontWeight: 700,
                  px: "4px",
                }}
              >
                trends
              </Box>
              {"now \n using sentences insted of keywords"}
            </Typography>

            {/* Search Bar */}
            <TextField
              placeholder="What Do Articles Say About Partial Breast Re-irradiation for Breast Cancer?"
              variant="outlined"
              size="large"
              sx={{
                width: { md: "150%", xs: "100%" },
                backgroundColor: "#fff",
                borderRadius: "25px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "25px",
                },
                "& input:-webkit-autofill": {
                  backgroundColor: "transparent !important",
                  WebkitBoxShadow: "0 0 0px 1000px white inset !important",
                  WebkitTextFillColor: "#000 !important",
                },
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        backgroundColor: "#c5b3f3",
                        borderRadius: "50%",
                        mr: 1.5,
                      }}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      padding: "0 14px",
                      zIndex: 3,
                      marginRight: "-8px",
                      borderRadius: "8px",
                      backgroundColor: "transparent",
                    }}
                  >
                    <IconButton
                      color="primary"
                      onClick={handleSearch}
                      sx={{
                        backgroundColor: "transparent",
                        color: "#000",
                        width: "30px",
                        height: "30px",
                        padding: "10px",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
      </Box>
      {/* <NewsCards /> */}
    </>
  );
}
