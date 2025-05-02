import React, { useState } from "react";
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
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

const ChatBox = ({
  leftHeight,
  messages,
  input,
  setInput,
  sendMessage,
  handleInputFocus,
  handleInputBlur,
  addToFavorites,
}) => {
  return (
    <Grid item xs={12}>
      <Container
        elevation={0}
        sx={{
          width: "auto",
          height: "95vh",
          display: "flex",
          flexDirection: "column",
          transition: "height 0.3s",
          backgroundColor: "#F5F5F5",
          // borderRadius: "16px",
        }}
      >
        <List sx={{ flexGrow: 1, overflowY: "auto", padding: 0 }}>
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
                        position: "relative",
                        mb: 2,
                        p: 2,
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <img
                        src={"/static/Images/pubmed_icon.png"}
                        alt="Logo"
                        style={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          width: "50px",
                          height: "20px",
                        }}
                      />

                      <CardContent sx={{ paddingBottom: "8px !important" }}>
                        {/* Title */}
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: "bold",
                            color: "#1565c0", // PubMed 스타일 파란색
                            mb: 0.5,
                          }}
                        >
                          {i + 1}. {paper.Title}
                        </Typography>

                        {/* Authors */}
                        <Typography
                          variant="body2"
                          sx={{ color: "#666", fontSize: "13px", mb: 0.5 }}
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
                            sx={{ fontSize: "12px", color: "#2e7d32" }}
                          >
                            {paper.Journal || "Unknown Journal"}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontSize: "12px", color: "#388e3c" }}
                          >
                            📅 {paper.PublicationDate}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontSize: "12px", color: "#6a1b9a" }}
                          >
                            PMID: {paper.PMID}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontSize: "12px", color: "#ef6c00" }}
                          >
                            {paper.isFree ? "Free PMC article" : ""}
                          </Typography>
                        </Stack>

                        {/* Abstract Preview */}
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#333",
                            fontSize: "13px",
                            lineHeight: 1.5,
                            maxHeight: "65px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
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
        </List>
        <Box
          sx={{
            display: "flex",
            paddingBottom: 10,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              backgroundColor: "#fff",
              // border: "1.5px solid #000",
              borderRadius: "16px",
              padding: "5px 15px",
              width: "100%",
              height: "80px",
              position: "relative",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <TextField
              fullWidth
              variant="standard"
              placeholder="What is your favorite topic?"
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
                right: "10px",
                bottom: "10px",
                backgroundColor: "#000",
                color: "#fff",
                width: "30px",
                height: "30px",
                padding: "10px",
                "&:hover": {
                  backgroundColor: "#444",
                },
              }}
            >
              <img
                src="static/Images/ChatButton.png"
                alt="Send Button"
                style={{
                  width: "30px",
                  height: "30px",
                  padding: "10px",
                  borderRadius: "50%",
                }}
              />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Grid>
  );
};
export default ChatBox;
