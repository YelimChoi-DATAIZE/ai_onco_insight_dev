import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Typography,
  Container,
  CircularProgress,
  IconButton,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Menubar from "../../../Menubar";
import MenubarUnder from "../../../MenubarUnder";
import Footer from "../../../Footer";
import ClinicalTrialsCard from "./component/ClinicalTrialsCard";
import PubmedCard from "./component/PubmedCard";
import ChatBox from "./component/ChatBox";

const ClinicalTrialsSearch = () => {
  const [trials, setTrials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("metastasis");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const leftSectionRef = useRef(null);
  const [leftHeight, setLeftHeight] = useState("auto");
  const [expanded, setExpanded] = useState(false);

  const fetchTrials = async (keyword) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://clinicaltrials.gov/api/v2/studies?query.cond=${keyword}&format=json&pageSize=3`,
      );
      const data = await response.json();

      if (data.studies) {
        const studies = data.studies.map((study) => ({
          nctId: study.protocolSection?.identificationModule?.nctId,
          briefTitle: study.protocolSection?.identificationModule?.briefTitle,
          overallStatus: study.protocolSection?.statusModule?.overallStatus,
          location: "Munich, Germany",
        }));
        setTrials(studies);
      } else {
        setTrials([]);
        console.log("No studies found for keyword:", keyword);
      }
    } catch (error) {
      console.error("Error fetching trials:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrials(searchTerm);
  }, []);

  useEffect(() => {
    if (leftSectionRef.current) {
      setLeftHeight(leftSectionRef.current.offsetHeight);
    }
  }, [trials]);

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
  };

  const handleKeywordClick = (keywords) => {
    console.log("Clicked keywords:", keywords);
    setSearchTerm(keywords.join(", "));
    setInput(keywords.join(", "));

    keywords.forEach((keyword) => {
      fetchTrials(keyword);
    });
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      fetchTrials(searchTerm);
    }
  };

  const handleInputFocus = () => setExpanded(true);
  const handleCloseClick = () => setExpanded(false);

  return (
    <>
      <Menubar />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            transition: "all 0.4s ease",
            height: "calc(100vh - 200px)",
          }}
        >
          {/* Searched Articles */}
          <Box
            sx={{
              width: expanded ? "30%" : "70%",
              transition: "all 0.5s ease",
              overflowY: "auto",
              padding: 2,
              // transform: expanded ? "scale(0.95)" : "scale(1)",
              boxShadow: expanded ? "0 0 10px rgba(0, 0, 0, 0.1)" : "none",
            }}
          >
            {/* <Box sx={{ mb: 4 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search Clinical Trials"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
            </Box> */}
            <Typography
              sx={{
                fontSize: { xs: "15px", sm: "16px" },
                fontFamily: "NotoSans KR",
                color: "#414444",
                fontWeight: 700,
                lineHeight: 1.4,
                whiteSpace: "pre-line",
                textAlign: "left",
                mt: 2,
                mb: 2,
              }}
            >
              Clinical Trials about {searchTerm} : 777 articles
            </Typography>
            {loading ? (
              <CircularProgress
                sx={{ display: "block", margin: "20px auto" }}
              />
            ) : (
              trials.map((trial, index) => (
                <ClinicalTrialsCard
                  key={index}
                  trial={trial}
                  index={index}
                  searchTerm={searchTerm}
                  setInput={setInput}
                  setExpanded={setExpanded}
                />
              ))
            )}
            <Typography
              sx={{
                fontSize: { xs: "15px", sm: "16px" },
                fontFamily: "NotoSans KR",
                color: "#414444",
                fontWeight: 700,
                lineHeight: 1.4,
                whiteSpace: "pre-line",
                textAlign: "left",
                mt: 3,
                // mb: 1,
              }}
            >
              PubMed Articles about {searchTerm}: 777 articles
            </Typography>
            <PubmedCard keyword={searchTerm} />
          </Box>

          <Box
            sx={{
              width: expanded ? "70%" : "30%",
              transition: "all 0.5s ease",
              overflowY: "auto",
              padding: 1,
              // transform: expanded ? "scale(1)" : "scale(0.95)",
              boxShadow: expanded ? "0 0 15px rgba(0, 0, 0, 0.15)" : "none",
            }}
          >
            <ChatBox
              messages={messages}
              setMessages={setMessages}
              input={input}
              setInput={setInput}
              sendMessage={() => {}}
              handleInputFocus={handleInputFocus}
              handleCloseClick={handleCloseClick}
              expanded={expanded}
            />
          </Box>
        </Box>
      </Container>
      <MenubarUnder />
      <Footer />
    </>
  );
};

export default ClinicalTrialsSearch;
