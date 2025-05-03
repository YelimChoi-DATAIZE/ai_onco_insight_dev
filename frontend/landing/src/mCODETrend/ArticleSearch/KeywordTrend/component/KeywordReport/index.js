import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  Paper,
  Grid,
  Button,
  Container,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Stack,
} from "@mui/material";
import { ResponsiveBump } from "@nivo/bump";
import generateBumpChartData from "./KeywordAnalayzer";

export default function KeywordTrendDashboard({ inputKeywords }) {
  const [bumpChartData, setBumpChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const pageOptions = [
    { label: "Top 10 Keywords", offset: 0 },
    { label: "Top 20 Keywords", offset: 10 },
    { label: "Top 30 Keywords", offset: 20 },
  ];
  const [currentPage, setCurrentPage] = useState(0);

  const fetchAndVisualize = async (
    offset = pageOptions[currentPage].offset,
    limit = 10,
  ) => {
    if (!inputKeywords) return;
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:8000/cancerkeywords?keywords=${encodeURIComponent(inputKeywords)}`,
      );
      const json = await response.json();

      if (json.success && Array.isArray(json.data)) {
        const { bumpData } = generateBumpChartData(json.data, limit, offset);
        setBumpChartData(bumpData);
      }
    } catch (error) {
      console.error("❌ 데이터 fetch 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchAndVisualize(pageOptions[newPage].offset, 10);
  };

  useEffect(() => {
    if (inputKeywords) fetchAndVisualize();
  }, [inputKeywords]);

  return (
    <Box px={4}>
      <Card
        sx={{
          width: "90%",
          margin: "0 auto",
          mb: 2,
          p: 3,
          borderRadius: 2,
          backgroundColor: "#ffffff",
          // padding: "4px 8px",
          boxShadow: "none",
          border: "1px solid #E2E2E2",
          position: "relative",
        }}
      >
        {/* 카드 제목 */}
        <Typography
          fontFamily="Noto Sans KR"
          fontSize={12}
          mb={1}
          sx={{ textAlign: "left", color: "#4B4B4B" }}
        >
          {pageOptions[currentPage].label}
        </Typography>

        {/* 차트 영역 */}
        <Box
          height="71vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {isLoading ? (
            <CircularProgress />
          ) : (
            <ResponsiveBump
              data={bumpChartData}
              colors={{ scheme: "tableau10" }}
              lineWidth={3}
              activeLineWidth={6}
              inactiveLineWidth={3}
              inactiveOpacity={0.15}
              pointSize={20}
              activePointSize={22}
              inactivePointSize={0}
              pointColor="transparent"
              pointBorderWidth={5}
              pointBorderColor={{ from: "serie.color" }}
              axisTop={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
              axisBottom={null}
              axisLeft={null}
              margin={{ top: 40, right: 120, bottom: 40, left: 40 }}
              label="id"
              labelTextColor={{ from: "color" }}
            />
          )}
        </Box>
      </Card>

      {/* 페이지네이션 dot */}
      <Box display="flex" justifyContent="center" mt={2}>
        {pageOptions.map((page, idx) => (
          <Box
            key={idx}
            onClick={() => handlePageChange(idx)}
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: currentPage === idx ? "#333" : "#ccc",
              margin: "0 6px",
              cursor: "pointer",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
