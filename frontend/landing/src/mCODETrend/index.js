import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import MCODETrendMap from "./mCODETrendMap";
import Menubar from "../Menubar";
import MenubarUnder from "../MenubarUnder";
import Footer from "../Footer";

export default function Home_F() {
  return (
    <>
      <Menubar />

      {/* Cancer Keyword Trend Part */}
      <SearchBar />

      {/* mCODE Diagram */}
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          flexDirection: "column",
          mt: 30,
        }}
      >
        <Typography fontWeight="700" fontSize="24px">
          mCODE STU4
        </Typography>
        <Box
          sx={{
            width: "100%",
            maxWidth: "1800px",
            // overflowX: "auto",
            overflowY: "hidden",
            whiteSpace: "nowrap",
            mt: 5,
            mb: 10,
          }}
        >
          <MCODETrendMap />
        </Box>
      </Grid>
      {/* <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          mt: 30,
        }}
      >
        <Typography fontWeight="700" fontSize="24px">
          mCODE STU4
        </Typography>
        <Box
          sx={{
            width: "100%",
            maxWidth: "1097px",
            // overflowX: "auto",
            overflowY: "hidden",
            whiteSpace: "nowrap",
            mt: 5,            
            backgroundColor: "white",
          }}
        >
          <img
            src="static/Images/mCodeDiagram.drawio.svg"
            alt="mCODE Diagram"
            style={{
              minWidth: "1097px",
              height: "auto",
              backgroundColor: "white",
            }}
          />
        </Box>
      </Grid> */}
      <MenubarUnder />
      <Footer />
    </>
  );
}
