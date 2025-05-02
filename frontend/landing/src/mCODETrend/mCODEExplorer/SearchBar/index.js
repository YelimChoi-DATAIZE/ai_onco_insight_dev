import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
// import SearchIcon from "../../Images/SearchIcon.svg";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/mcodesearch?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <TextField
      placeholder="Example Input brca1, brca2"
      variant="outlined"
      size="small"
      sx={{
        width: { md: "474.69px", xs: "340px" },
        height: "50.17px",
        backgroundColor: "#fff",
        borderRadius: "25px",
        "& .MuiOutlinedInput-root": {
          borderRadius: "25px",
        },
        "& input:-webkit-autofill": {
          backgroundColor: "transparent !important", // 자동완성 배경 제거
          WebkitBoxShadow: "0 0 0px 1000px white inset !important", // 흰색 배경 적용
          WebkitTextFillColor: "#000 !important", // 글자색 유지
        },
      }}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      InputProps={{
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
            <Button
              onClick={handleSearch}
              sx={{
                minWidth: "40px",
                padding: "0px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                },
                "&:active": {
                  transform: "scale(0.95)",
                },
              }}
            >
              <SearchIcon />
            </Button>
          </InputAdornment>
        ),
      }}
    />
  );
}
