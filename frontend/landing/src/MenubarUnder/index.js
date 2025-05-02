import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const menuItems = [
  "ABOUT",
  "SERVICES",
  "USE CASES",
  "CONTACT US",
  "mCODE EXPLORER",
  "PRIVACY POLICY",
  "TERMS OF USE",
];

export default function MenubarUnder() {
  return (
    <>
      <Divider sx={{ marginTop: 0, display: { xs: "none", lg: "flex" } }} />
      <Box
        sx={{
          flexGrow: 1,
          px: { sm: 30, xs: 10 },
          backgroundColor: "#FBFBFB",
          minHeight: "57px",
          display: { xs: "none", lg: "flex" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="space-evenly"
          alignItems="center"
          sx={{ width: "100%", maxWidth: "1200px" }}
        >
          {menuItems.map((text, index) => (
            <Grid
              key={index}
              item
              sx={{
                flexGrow: 1,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                minWidth: "100px",
              }}
            >
              <Typography
                sx={{
                  color: "#4B4B4B",
                  fontFamily: "IBM Plex Sans KR",
                  fontSize: "14px",
                  fontWeight: 400,
                  whiteSpace: "nowrap",
                }}
              >
                {text}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Divider sx={{ marginBottom: 0 }} />
    </>
  );
}
