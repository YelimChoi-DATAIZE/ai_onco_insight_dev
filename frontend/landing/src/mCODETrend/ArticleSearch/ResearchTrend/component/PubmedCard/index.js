import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Divider,
  CircularProgress,
  IconButton,
} from "@mui/material";
import axios from "axios";
import InsightsIcon from "@mui/icons-material/Insights";
import VisibilityIcon from "@mui/icons-material/Visibility";

const PubMedCard = ({ keyword }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPubMedData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/pubmed?keyword=${keyword}`,
      );
      const data = response.data;

      if (data.success && Array.isArray(data.articles)) {
        setArticles(data.articles);
      } else {
        setArticles([]);
      }
    } catch (error) {
      console.error("Error fetching PubMed data:", error);
      setArticles([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (keyword) {
      fetchPubMedData();
    }
  }, [keyword]);

  if (loading) {
    return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;
  }

  return (
    <Box sx={{ width: "100%", mt: 3 }}>
      {articles.length === 0 ? (
        <Typography
          sx={{ textAlign: "center", color: "#848E93", fontSize: "14px" }}
        >
          No articles found for '{keyword}'
        </Typography>
      ) : (
        articles.map((article, index) => (
          <Box
            key={index}
            sx={{
              mb: 2,
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#ffffff",
              border: "none",
              borderRadius: 1,
              p: 2,
              width: "95%",
            }}
          >
            {/* Divider 위: Published, Source 정보를 좌측 정렬로 배치 */}
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={6}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#848E93",
                    display: "inline-block",
                    mr: 2,
                  }}
                >
                  Published: {article.pubdate || "Unknown"}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#848E93",
                    display: "inline-block",
                  }}
                >
                  Source: {article.source || "Unknown"}
                </Typography>
              </Grid>
            </Grid>

            {/* Divider */}
            <Divider sx={{ borderColor: "#D8D8D8", mt: 1, mb: 1 }} />

            {/* Divider */}
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={9}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#212324",
                    maxWidth: "60%",
                    overflow: "hidden",
                  }}
                >
                  {article.title}
                  <IconButton
                    size="small"
                    sx={{ padding: "4px", color: "#3CA7DF", marginLeft: "4px" }}
                    onClick={() =>
                      window.open(
                        `https://pubmed.ncbi.nlm.nih.gov/${article.uid}/`,
                        "_blank",
                      )
                    }
                  >
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </Typography>
              </Grid>
              <Grid item sx={{ minWidth: "80px", textAlign: "right" }}>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    padding: "4px 8px",
                    fontSize: "12px",
                    minWidth: "65px",
                    backgroundColor: "#3CA7DF",
                    color: "#fff",
                  }}
                  onClick={() => alert("More Info Clicked")}
                >
                  <InsightsIcon fontSize="small" /> Ask AI
                </Button>
              </Grid>
            </Grid>
          </Box>
        ))
      )}
    </Box>
  );
};

export default PubMedCard;
