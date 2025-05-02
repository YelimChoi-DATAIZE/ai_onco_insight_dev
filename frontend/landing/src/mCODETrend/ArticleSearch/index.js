import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  Paper,
  CircularProgress,
  InputAdornment,
  Tabs,
  Tab,
  Container,
  Card,
  CardContent,
  Stack,
} from "@mui/material";

import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import ChatBox from "./ResearchTrend/component/ChatBox";
import KeywordTrend from "./KeywordTrend/index";
import MetaMap from "./ResearchTrend/component/MetaMap";
import PDF2ZH from "./ResearchTrend/component/PDF2ZH";
import Menubar from "../../Menubar";
import MenubarUnder from "../../MenubarUnder";
import Footer from "../../Footer";

const tabStyles = {
  minHeight: "50px",
  minWidth: "100%",
  justifyContent: "center",
  textAlign: "left",
  color: "text",
  alignItems: "flex-start",
  "&.Mui-selected": {
    backgroundColor: "#F5F5F5",
    color: "text",
  },
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const HybridRAGLayout = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keywordFromUrl = queryParams.get("query") || "";
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [hasInitialized, setHasInitialized] = useState(false);

  const [searchHistory, setSearchHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const googleUserInfo = localStorage.getItem("googleUserInfo");
    const basicUserInfo = localStorage.getItem("userInfo");

    if (token && (googleUserInfo || basicUserInfo)) {
      setIsLoggedIn(true);

      if (googleUserInfo) {
        const googleUser = JSON.parse(googleUserInfo);
        setUserName(googleUser.name || "User");
      } else if (basicUserInfo) {
        const basicUser = JSON.parse(basicUserInfo);
        setUserName(basicUser.name || "User");
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  //mcode trend landing page에서 검색한 결과를 보여주기 위한 useEffect
  useEffect(() => {
    const fetchInitialPapers = async () => {
      try {
        const response = await fetch(
          `http://3.35.226.37:8000/dataizeai_api/AdvancedPubSearch?query=${encodeURIComponent(keywordFromUrl)}`,
        );
        const data = await response.json();

        const userMessage = {
          text: keywordFromUrl,
          sender: "user",
          type: "text",
        };

        setMessages([userMessage]);
        setSearchHistory((prev) => {
          if (!prev.includes(keywordFromUrl)) {
            return [keywordFromUrl, ...prev.slice(0, 9)];
          }
          return prev;
        });

        setMessages((prev) => [
          ...prev,
          {
            sender: "chatbot",
            type: "text",
            text:
              `Matched Pubmed Result ${data.length} Articles:\n\n` +
              data
                .map(
                  (paper, i) =>
                    `${i + 1}. ${paper.Title}\n   📅 ${paper.PublicationDate} / PMID: ${
                      paper.PMID
                    }${
                      paper.score !== undefined
                        ? `/🔸 score: ${paper.score.toFixed(3)}`
                        : ""
                    }`,
                )
                .join("\n\n"),
            papers: data,
          },
        ]);
      } catch (error) {
        setMessages([
          {
            text: "❌ 논문 불러오기 중 오류가 발생했어요.",
            sender: "chatbot",
            type: "text",
          },
        ]);
      }
    };

    if (keywordFromUrl && !hasInitialized) {
      setHasInitialized(true);
      fetchInitialPapers();
    }
  }, [keywordFromUrl, hasInitialized]);

  // 채팅창에서 검색한 결과를 보여주기 위한 useEffect
  const sendMessage = async () => {
    if (input.trim()) {
      const keyword = input.trim();

      const newUserMessage = {
        text: keyword,
        sender: "user",
        type: "text",
      };

      setMessages((prev) => [...prev, newUserMessage]);
      setInput("");

      setSearchHistory((prev) => {
        if (!prev.includes(keyword)) {
          return [keyword, ...prev.slice(0, 9)];
        }
        return prev;
      });

      try {
        const response = await fetch(
          `http://3.35.226.37:8000/dataizeai_api/AdvancedPubSearch?query=${encodeURIComponent(keyword)}`,
        );
        const data = await response.json();

        setMessages((prev) => [
          ...prev,
          {
            sender: "chatbot",
            type: "text",
            text:
              `Matched Pubmed Result ${data.length} Articles:\n\n` +
              data
                .map(
                  (paper, i) =>
                    `${i + 1}. ${paper.Title}\n   📅 ${paper.PublicationDate} / PMID: ${
                      paper.PMID
                    }${
                      paper.score !== undefined
                        ? `/🔸 score: ${paper.score.toFixed(3)}`
                        : ""
                    }`,
                )
                .join("\n\n"),
            papers: data,
          },
        ]);
      } catch (error) {
        const errorMessage = {
          text: "❌ 논문 검색 중 오류가 발생했어요.",
          sender: "chatbot",
          type: "text",
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    }
  };

  // Favorite 기능
  const addToFavorites = (paper) => {
    if (!isLoggedIn) {
      alert("로그인 후 즐겨찾기 할 수 있습니다.");
      return;
    }

    setFavorites((prev) => {
      if (prev.find((p) => p.PMID === paper.PMID)) return prev; // ✅ 고유한 PMID로 비교
      return [...prev, paper];
    });
  };

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Menubar />
        <Box sx={{ flex: 1, flexGrow: 1, height: "94vh" }}>
          <Grid container spacing={0}>
            {/* Left Sidebar */}
            <Grid item xs={12} sm={12} md={2}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    p: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#333",
                      fontFamily: "Noto Sans KR",
                      mb: 1,
                    }}
                  >
                    Recent Searches
                  </Typography>
                  <Box
                    sx={{
                      maxHeight: "20vh",
                      overflowY: "auto",
                    }}
                  >
                    {searchHistory.length === 0 ? (
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "12px",
                          color: "#999",
                          fontFamily: "Noto Sans KR",
                        }}
                      >
                        No history yet.
                      </Typography>
                    ) : (
                      searchHistory.map((term, i) => (
                        <Card
                          key={i}
                          sx={{
                            mt: 0.5,
                            mb: 0.5,
                            borderRadius: 2,
                            backgroundColor: "#f5f5f5",
                            padding: "4px 8px",
                            boxShadow: "none",
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                        >
                          <Typography
                            noWrap
                            sx={{
                              fontSize: "12px",
                              fontFamily: "Noto Sans KR",
                              color: "#555",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              width: "100%",
                            }}
                          >
                            • {term}
                          </Typography>
                        </Card>
                      ))
                    )}
                  </Box>
                </Box>
                <Box
                  sx={{
                    mt: 2,
                    p: 1,
                    borderTop: "1px solid #ddd",
                    pt: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#333",
                      fontFamily: "Noto Sans KR",
                      mb: 1,
                    }}
                  >
                    My Favorite Articles
                  </Typography>
                  <Box
                    sx={{
                      maxHeight: "25vh",
                      overflowY: "auto",
                    }}
                  >
                    {favorites.length === 0 ? (
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "12px",
                          color: "#999",
                          fontFamily: "Noto Sans KR",
                        }}
                      >
                        No saved articles yet.
                      </Typography>
                    ) : (
                      favorites.map((fav, i) => (
                        <Card
                          key={i}
                          evlevation={0}
                          sx={{
                            mt: 0.5,
                            mb: 0.5,
                            borderRadius: 2,
                            backgroundColor: "#f5f5f5",
                            padding: "4px 8px",
                            boxShadow: "none",
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                        >
                          <Typography
                            noWrap
                            sx={{
                              fontSize: "12px",
                              fontFamily: "Noto Sans KR",
                              color: "#555",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              width: "100%",
                            }}
                          >
                            • {fav.Title}
                          </Typography>
                        </Card>
                      ))
                    )}
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* ChatBox Panel */}
            <Grid
              item
              xs={12}
              sm={6}
              md={5}
              sx={{
                borderRight: "1px solid #ddd",
                borderLeft: "1px solid #ddd",
                backgroundColor: "#F5F5F5",
                height: "94vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ mt: 2, ml: 2 }}
                fontWeight="bold"
                fontFamily="Noto Sans KR"
              >
                Conversation Search
              </Typography>

              <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
                <ChatBox
                  messages={messages}
                  input={input}
                  setInput={setInput}
                  sendMessage={sendMessage}
                  addToFavorites={addToFavorites}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={5}>
              <Paper elevation={0}>
                <Typography
                  sx={{ mt: 2, ml: 2 }}
                  fontWeight="bold"
                  fontFamily="Noto Sans KR"
                >
                  Information Panel
                </Typography>
                <KeywordTrend />
              </Paper>
            </Grid>
          </Grid>
        </Box>
        <MenubarUnder />
        <Footer />
      </Box>
    </>
  );
};

export default HybridRAGLayout;
