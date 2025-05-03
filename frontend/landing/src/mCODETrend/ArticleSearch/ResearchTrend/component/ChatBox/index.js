import React, { useState, useEffect, useRef } from "react";
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
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import SearchIcon from "@mui/icons-material/Search";

const ChatBox = ({
  leftHeight,
  messages,
  input,
  setInput,
  sendMessage,
  handleInputFocus,
  handleInputBlur,
  addToFavorites,
  isLoading,
}) => {
  const listRef = useRef(null);

  const scrollToBottom = () => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Grid item xs={12}>
      <Container
        elevation={0}
        sx={{
          width: "auto",
          height: "85vh",
          display: "flex",
          flexDirection: "column",
          transition: "height 0.3s",
          backgroundColor: "#FFFFFF",
          // borderRadius: "16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 2,
            position: "sticky",
            top: 0,
            zIndex: 2,
            backgroundColor: "#FFFFFF",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              border: "1px solid #D8D8D8",
              borderRadius: "16px",
              padding: "5px 15px",
              width: "90%",
              height: "35px",
              position: "relative",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <TextField
              fullWidth
              variant="standard"
              placeholder="Search More.."
              multiline
              InputProps={{
                disableUnderline: true,
              }}
              sx={{
                flex: 1,
                padding: "5px",
                paddingLeft: "5px",
                paddingTop: "5px",
                overflowY: "auto",
                height: "100%",
              }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />

            <IconButton
              color="primary"
              onClick={sendMessage}
              sx={{
                position: "absolute",
                top: "8px",
                right: "10px",
                bottom: "10px",
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
          </Box>
        </Box>
        <List
          ref={listRef}
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            position: "relative",
            paddingTop: "16px",
            paddingBottom: "80px",
            minHeight: 0,
          }}
        >
          {messages.length === 0 && !isLoading && (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#888",
                fontSize: "16px",
                fontWeight: "regular",
                textAlign: "center",
              }}
            >
              BrainStorming Your Research <br />- DATAIZEAI -
            </Box>
          )}
          {messages.map((msg, index) => {
            const isUser = msg.sender === "user";
            // 논문 결과 응답이면 리스트 렌더링
            if (!isUser && msg.papers && Array.isArray(msg.papers)) {
              return (
                <Box key={index} sx={{ px: 2 }}>
                  {msg.papers.map((paper, i) => (
                    <Card
                      key={i}
                      sx={{
                        width: "95%",
                        margin: "0 auto",
                        mb: 2,
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: "#ffffff",
                        padding: "4px 8px",
                        boxShadow: "none",
                        border: "1px solid #E2E2E2",
                      }}
                    >
                      <CardContent sx={{ paddingBottom: "8px !important" }}>
                        {/* Title + PubMed Icon */}
                        <Box sx={{ position: "relative", mb: 0.5 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: "bold",
                              color: "#1565c0",
                              fontFamily: "Noto Sans KR",
                              width: "80%",
                              wordBreak: "break-word",
                              whiteSpace: "normal",
                              pr: "60px",
                            }}
                          >
                            {i + 1}. {paper.Title}
                          </Typography>

                          <Box
                            component="img"
                            src="/static/Images/pubmed_icon.png"
                            alt="PubMed"
                            sx={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                              width: "50px",
                              height: "20px",
                            }}
                          />
                        </Box>

                        {/* Authors */}
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#666",
                            fontSize: "13px",
                            mb: 0.5,
                            fontFamily: "Noto Sans KR",
                          }}
                        >
                          {paper.Authors || "Unknown authors"}
                        </Typography>

                        {/* Publication Info */}
                        <Stack
                          direction="row"
                          spacing={1}
                          flexWrap="wrap"
                          sx={{ mb: 1 }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "12px",
                              color: "#388e3c",
                              fontFamily: "Noto Sans KR",
                            }}
                          >
                            📅 {paper.PublicationDate}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "12px",
                              color: "#6a1b9a",
                              fontFamily: "Noto Sans KR",
                            }}
                          >
                            PMID: {paper.PMID}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "12px",
                              color: "#ef6c00",
                              fontFamily: "Noto Sans KR",
                            }}
                          >
                            {paper.isFree ? "Free PMC article" : ""}
                          </Typography>
                        </Stack>

                        {/* Abstract (3 lines max) */}
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#333",
                            fontSize: "13px",
                            lineHeight: 1.5,
                            display: "-webkit-box",
                            width: "90%",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            fontFamily: "Noto Sans KR",
                          }}
                        >
                          {paper.Abstract || "No abstract available..."}
                        </Typography>

                        {/* Favorites Button */}
                        <Box sx={{ textAlign: "right", mt: 1 }}>
                          <Button
                            size="small"
                            startIcon={<BookmarkAddIcon />}
                            onClick={() => addToFavorites(paper)}
                            sx={{
                              textTransform: "none",
                              fontSize: "12px",
                              fontFamily: "Noto Sans KR",
                            }}
                          >
                            Favorites
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              );
            }
          })}
          {isLoading && (
            <Box
              sx={{
                width: "100%",
                py: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress size={28} />
            </Box>
          )}
        </List>
      </Container>
    </Grid>
  );
};
export default ChatBox;
