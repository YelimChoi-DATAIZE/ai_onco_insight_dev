import React from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  Grid,
  Divider,
  IconButton,
} from "@mui/material";
import InsightsIcon from "@mui/icons-material/Insights";
import VisibilityIcon from "@mui/icons-material/Visibility";

const TrialCard = ({ trial, index, searchTerm, setInput, setExpanded }) => {
  const getChipStyle = (status) => {
    switch (status.toUpperCase()) {
      case "COMPLETED":
        return { backgroundColor: "#EDB369", color: "#fff" };
      case "RECRUITING":
        return { backgroundColor: "#94B0FF", color: "#fff" };
      case "NOT_YET_RECRUITING":
        return { backgroundColor: "#AAD190", color: "#fff" };
      case "ACTIVE_NOT_RECRUITING":
        return { backgroundColor: "#AAD190", color: "#fff" };
      case "WITHDRAWN":
        return { backgroundColor: "#AAD190", color: "#fff" };
      case "TERMINATED":
        return { backgroundColor: "#AAD190", color: "#fff" };
      default:
        return { backgroundColor: "#E0E0E0", color: "#000" };
    }
  };

  return (
    <Box
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
      {/* 상단 영역: NCT ID와 상태 */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            color: "#848E93",
          }}
        >
          {trial.nctId}
        </Typography>
        <Chip
          label={trial.overallStatus}
          size="small"
          sx={{
            ml: 1,
            ...getChipStyle(trial.overallStatus),
          }}
        />
      </Box>
      <Grid item sx={{ width: "100%", mt: "5px", mb: "15px" }}>
        <Divider sx={{ borderColor: "#D8D8D8", width: "100%" }} />
      </Grid>

      {/* brief title */}
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 400,
              color: "#212324",
              maxWidth: "60%",
              overflow: "hidden",
            }}
          >
            {trial.briefTitle}
            <IconButton
              size="small"
              sx={{ padding: "4px", color: "#3CA7DF", marginLeft: "4px" }}
              onClick={() =>
                window.open(
                  `https://clinicaltrials.gov/study/${trial.nctId}/`,
                  "_blank",
                )
              }
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Typography>
        </Grid>

        {/* buttons */}
        <Grid item>
          <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
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
              onClick={() => {
                setInput(
                  `what is most related pubmed article about clinical trial "${trial.briefTitle}"?`,
                );
                setExpanded(true);
              }}
            >
              <InsightsIcon fontSize="small" /> Ask AI
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TrialCard;
