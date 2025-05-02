import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { ResponsiveBump } from "@nivo/bump";
import generateBumpChartData from "./KeywordAnalayzer";

export default function KeywordTrendDashboard() {
  const [inputValue, setInputValue] = useState(
    "machine learning, artificial intelligence",
  );
  const [bumpChartData, setBumpChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [excludedKeywords, setExcludedKeywords] = useState([]); // ❗ 제외된 키워드

  const fetchAndVisualize = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:8000/cancerkeywords?keywords=${encodeURIComponent(inputValue)}`,
      );
      const json = await response.json();

      if (json.success && Array.isArray(json.data)) {
        const { bumpData, usedKeywords, allKeywords } = generateBumpChartData(
          json.data,
          10,
        );
        setBumpChartData(bumpData);

        const inputKeywords = inputValue
          .split(",")
          .map((kw) => kw.trim().toLowerCase());

        const excluded = allKeywords.filter((kw) => !usedKeywords.includes(kw));
        setExcludedKeywords(excluded);
      } else {
        console.error("📛 잘못된 응답 형식:", json);
      }
    } catch (error) {
      console.error("❌ 데이터 fetch 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAndVisualize();
  }, []);

  const handleSearchClick = () => {
    fetchAndVisualize();
  };

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Related Keyword Trend
      </Typography>
      <Box display="flex" mb={2}>
        <TextField
          label="Keyword (comma separated)"
          variant="outlined"
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          size="small"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchClick}
          sx={{ ml: 2 }}
        >
          Search
        </Button>
      </Box>

      <Box
        height={600}
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
          />
        )}
      </Box>

      {/* Other Keyword */}
      {!isLoading && excludedKeywords.length > 0 && (
        <Box mt={4}>
          <Typography variant="subtitle1" color="error">
            Other Keywords:
          </Typography>
          <Typography variant="body2">{excludedKeywords.join(", ")}</Typography>
        </Box>
      )}
    </Box>
  );
}
