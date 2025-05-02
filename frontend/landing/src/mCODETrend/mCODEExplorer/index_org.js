import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import Menubar from "../Menubar";
import MenubarUnder from "../MenubarUnder";
import Footer from "../Footer";

export default function Home_F() {
  return (
    <>
      <Menubar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
          justifyContent="center"
          alignItems="center"
          sx={{ mt: "56px" }}
        >
          <Grid item xs={12} sm={8} md={8} lg={12}>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "100%",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  width: "100vw",
                  // backgroundColor: "#F9F9F9",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px 0",
                }}
              >
                {/* Titles */}
                <Grid
                  container
                  spacing={2}
                  direction="column"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: "24px",
                        fontFamily: "Noto Sans KR",
                        textAlign: "center",
                        lineHeight: "28.8px",
                        fontWeight: 700,
                      }}
                    >
                      mCODE STU4
                    </Typography>
                  </Grid>
                  {/* <Grid item>
                    <Typography>
                      Click a block to see the corresponding profile definition
                    </Typography>
                  </Grid> */}
                </Grid>

                {/* SearchBar */}
                <Box
                  sx={{
                    borderRadius: "30px",
                    height: "50px",
                    mt: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "30px",
                      height: "50px",
                      paddingRight: "8px",
                      border: "0.1px solid black",
                      "& input": {
                        height: "57px",
                        padding: "0 14px",
                      },
                    },
                  }}
                >
                  <SearchBar />
                </Box>
              </Box>
            </Grid>

            {/* mCODE Diagram */}
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                mt: 2,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "1097px",
                  // overflowX: "auto", // ✅ 가로 스크롤 추가
                  overflowY: "hidden", // ✅ 세로 스크롤 방지 (선택 사항)
                  whiteSpace: "nowrap", // ✅ 줄바꿈 방지
                  mb: 10,
                }}
              >
                <object
                  data="static/Images/mCodeDiagram.drawio.svg"
                  type="image/svg+xml"
                  style={{
                    minWidth: "1097px", // ✅ 최소 너비 고정 (xs에서도 크기 유지)
                    height: "auto",
                  }}
                ></object>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <MenubarUnder />
      <Footer />
    </>
  );
}
