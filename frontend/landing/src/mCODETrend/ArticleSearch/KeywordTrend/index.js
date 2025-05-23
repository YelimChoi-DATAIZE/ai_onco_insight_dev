import React, { useState, useEffect } from "react";
import { Box, Button, Paper, Snackbar, Alert, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import KeywordReport from "./component/KeywordReport";

export default function KeywordTrend({ inputKeywords }) {
  return (
    <Paper
      elevation={0}
      sx={{
        height: "90vh",
        position: "relative",
        overflowY: "auto",
        backgroundColor: "#F9F9F9",
      }}
    >
      <KeywordReport inputKeywords={inputKeywords} />
    </Paper>
  );
}
