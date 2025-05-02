import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Menubar from "../Menubar";
import MenubarUnder from "../MenubarUnder";
import Footer from "../Footer";

import homesectiontool3 from "../Images/SearchIcon.svg";
import homesectiontool5 from "../Images/SearchIcon.svg";

const Item2 = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function Home() {
  return (
    <>
      <Menubar />
      <Box
        sx={{
          width: { xs: "90%", lg: "1800px" },
          mx: "auto",
          mt: { xs: 15, lg: "128px" },
        }}
      >
        <Grid
          container
          display="flex"
          direction="column"
          textAlign="center"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <Grid item xs={12} sx={{ width: "100%" }}>
            <Typography
              sx={{
                fontSize: { lg: "54px", xs: "30px" },
                fontFamily: "Noto Sans KR",
                fontWeight: 700,
                lineHeight: { lg: "90px", xs: "30px" },
                textAlign: "center",
                ml: 0,
              }}
            >
              All-in-One Intelligent Cancer Research Platform
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ width: "100%" }}>
            <Typography
              sx={{
                fontSize: { lg: "40px", xs: "17px" },
                fontFamily: "Noto Sans KR",
                fontWeight: 400,
                lineHeight: { lg: "90px", xs: "30px" },
                textAlign: "center",
                mt: 2,
              }}
            >
              Seamlessly connecting data standardization to AI-driven
              discovery—all your cancer research needs in one intelligent
              platform.
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center", // 이미지 가운데 정렬
            mt: { lg: 4, xs: 5 },
            width: "100%", // 부모의 전체 너비 사용
          }}
        >
          <img
            src={"/static/Images/Home_Prod2.png"}
            alt="prod"
            style={{ width: "90%", maxWidth: "1500px" }} // 부모의 90%로 설정
          />
        </Box>

        <Stack
          spacing={2}
          alignItems="center" // 모든 자식 컴포넌트 수평 가운데 정렬
          justifyContent="center" // 모든 자식 컴포넌트 수직 가운데 정렬
          sx={{ width: "100%", mx: "auto" }} // 부모 기준으로 가운데 정렬
        >
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            justifyContent={{ xs: "center", md: "center" }}
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              display="flex"
              justifyContent={{ xs: "center", md: "center" }}
              alignItems={{ xs: "center", md: "flex-start" }}
              textAlign={{ xs: "center", md: "left" }}
              sx={{ mt: 20, ml: { lg: 0, md: 5, sx: 0 } }}
            >
              <img
                src={"/static/Images/Landing_mCODESearch.svg"}
                alt="prod"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              display="flex"
              flexDirection="column"
              alignItems={{ xs: "center", md: "flex-start" }}
              textAlign={{ xs: "Justify", md: "left" }}
              sx={{
                maxWidth: "800px",
                mt: { md: 10, xs: 5 },
                // mx: { xs: 5, md: 4 },
                ml: { xs: 0, md: 15, lg: 3.2 },
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontFamily: "Noto Sans KR" }}
              >
                Research Idea & Design
              </Typography>
              <Typography
                sx={{
                  mt: "21px",
                  color: "#555D61",
                  fontFamily: "Noto Sans KR",
                  fontSize: "17px",
                  fontWeight: 400,
                  lineHeight: "31px",
                  ml: { xs: 5, md: 0, lg: 0 },
                  mr: { xs: 5, md: 0, lg: 0 },
                }}
              >
                {" "}
                Explore the world of oncology research with just one keyword.
                Powered by Agentic RAG, mCODE Trend automatically surfaces
                relevant clinical trials, research papers, and generates
                research ideas tailored to your focus. From inspiration to
                structured design, streamline early-stage research without the
                noise.
              </Typography>
              <Button sx={{ mt: "40px" }}>
                <img src={"/static/Images/home_button.svg"} alt="prod" />
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            justifyContent={{ xs: "center", md: "center" }}
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              display="flex"
              justifyContent={{ xs: "center", md: "flex-start" }}
              alignItems={{ xs: "center", md: "flex-start" }}
              textAlign={{ xs: "center", md: "left" }}
              sx={{ mt: 20, ml: { md: 0, sx: 0 } }}
            >
              <img
                src={"/static/Images/Landing_DataIntegration.svg"}
                alt="prod"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              display="flex"
              flexDirection="column"
              alignItems={{ xs: "center", md: "flex-start" }}
              textAlign={{ xs: "Justify", md: "left" }}
              sx={{
                maxWidth: "800px",
                mt: { md: 10, xs: 5 },
                ml: { xs: 5, md: 15, lg: 10 },
                mr: { xs: 5, md: 0 },
                // mx: { xs: 5, md: 4 },
              }}
            >
              <Typography
                sx={{
                  // color: "#848E93",
                  fontFamily: "Noto Sans KR",
                  fontSize: "26px",
                  fontWeight: 400,
                  lineHeight: "31.2px",
                }}
              >
                Data Processing & Integration
              </Typography>
              <Typography
                sx={{
                  mt: "21px",
                  color: "#555D61",
                  fontFamily: "Noto Sans KR",
                  fontSize: "17px",
                  fontWeight: 400,
                  lineHeight: "31px",
                }}
              >
                Convert raw, fragmented medical data into structured,
                standardized formats—automatically.Using the AI-Enabled mCODE
                Extraction Framework, extract and transform key variables from
                unstructured text, or convert into FHIR when needed. Handle all
                preprocessing steps—extraction, cleaning, structuring, and
                integration—in one intelligent flow.
              </Typography>
              <Button sx={{ mt: "40px" }}>
                <img src={"/static/Images/home_button.svg"} alt="prod" />
              </Button>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            justifyContent={{ xs: "center", md: "center" }}
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              display="flex"
              justifyContent={{ xs: "center", md: "center" }}
              alignItems={{ xs: "center", md: "flex-start" }}
              textAlign={{ xs: "center", md: "left" }}
              sx={{ mt: 20, ml: { md: 5, sx: 0 } }}
            >
              <img
                src={"/static/Images/Landing_DataAnalytics.svg"}
                alt="prod"
                style={{
                  maxWidth: "95%",
                  height: "auto",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              display="flex"
              flexDirection="column"
              alignItems={{ xs: "center", md: "flex-start" }}
              textAlign={{ xs: "Justify", md: "left" }}
              sx={{
                maxWidth: "800px",
                mt: { md: 10, xs: 5 },
                mx: { xs: 5, md: 7 },
                ml: { md: 15, lg: 8.7 },
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontFamily: "Noto Sans KR" }}
              >
                Data Analysis & Insights
              </Typography>
              <Typography
                sx={{
                  mt: "21px",
                  color: "#555D61",
                  fontFamily: "Noto Sans KR",
                  fontSize: "17px",
                  fontWeight: 400,
                  lineHeight: "31px",
                }}
              >
                Analyze cancer data effortlessly with one click—no code
                required. Let AI recommend and execute optimal statistical and
                machine learning models tailored to your dataset. Receive
                instantly visualized insights and AI-generated summaries to
                guide your next discovery.
              </Typography>
              <Button sx={{ mt: "40px" }}>
                <img src={"/static/Images/home_button.svg"} alt="prod" />
              </Button>
            </Grid>
          </Grid>

          {/* Rendering Card */}
          <Grid
            container
            spacing={1}
            sx={{
              display: "flex",
              flexDirection: { lg: "row", xs: "column" },
              justifyContent: { lg: "center", xs: "center" },
              alignItems: "center",
              gap: { lg: 2, xs: 0 },
            }}
          >
            <Grid
              item
              sx={{
                width: { lg: "354px", xs: "80%" },
                ml: 10,
                mr: 0.5,
                mt: 15,
              }}
            >
              <Box
                sx={{
                  border: "1px solid #DFDFDF",
                  borderRadius: "20px",
                  p: "40px",
                  height: "50%",
                  boxShadow: "4px rgba(0, 0, 0, 0.15)",
                }}
              >
                <Typography
                  sx={{
                    mt: "21px",
                    // color: "#555D61",
                    fontFamily: "Noto Sans KR",
                    fontSize: "20px",
                    fontWeight: 400,
                    lineHeight: "24px",
                  }}
                >
                  {" "}
                  ABOUT
                </Typography>
                <Typography
                  sx={{
                    mt: "21px",
                    color: "#555D61",
                    fontFamily: "Noto Sans KR",
                    fontSize: "17px",
                    fontWeight: 400,
                    lineHeight: "31px",
                  }}
                >
                  Among the vast array of data used to understand cancer, our
                  technology precisely extracts, combines, and
                </Typography>
                <Typography
                  mt={3}
                  component="p"
                  textAlign="justify"
                  color="black"
                >
                  MORE
                </Typography>
              </Box>
            </Grid>

            <Grid
              item
              sx={{
                width: { lg: "354px", xs: "80%" },
                ml: 0.5,
                mr: 0.5,
                mt: 15,
              }}
            >
              <Box
                sx={{
                  border: "1px solid #DFDFDF",
                  borderRadius: "20px",
                  p: "40px",
                  height: "50%",
                }}
              >
                <Typography
                  sx={{
                    mt: "21px",
                    // color: "#555D61",
                    fontFamily: "Noto Sans KR",
                    fontSize: "20px",
                    fontWeight: 400,
                    lineHeight: "24px",
                  }}
                >
                  {" "}
                  USE CASES
                </Typography>
                <Typography
                  sx={{
                    mt: "21px",
                    color: "#555D61",
                    fontFamily: "Noto Sans KR",
                    fontSize: "17px",
                    fontWeight: 400,
                    lineHeight: "31px",
                  }}
                >
                  Among the vast array of data used to understand cancer, our
                  technology precisely extracts, combines, and
                </Typography>
                <Typography
                  mt={3}
                  component="p"
                  textAlign="justify"
                  color="black"
                >
                  MORE
                </Typography>
              </Box>
            </Grid>

            <Grid
              item
              sx={{
                width: { lg: "354px", xs: "80%" },
                ml: 0.5,
                mr: 0.5,
                mt: 15,
              }}
            >
              <Box
                sx={{
                  border: "1px solid #DFDFDF",
                  borderRadius: "20px",
                  p: "40px",
                  height: "50%",
                }}
              >
                <Typography
                  sx={{
                    mt: "21px",
                    // color: "#555D61",
                    fontFamily: "Noto Sans KR",
                    fontSize: "20px",
                    fontWeight: 400,
                    lineHeight: "24px",
                  }}
                >
                  {" "}
                  CONTACT US
                </Typography>
                <Typography
                  sx={{
                    mt: "21px",
                    color: "#555D61",
                    fontFamily: "Noto Sans KR",
                    fontSize: "17px",
                    fontWeight: 400,
                    lineHeight: "31px",
                  }}
                >
                  Among the vast array of data used to understand cancer, our
                  technology precisely extracts, combines, and
                </Typography>
                <Typography
                  mt={3}
                  component="p"
                  textAlign="justify"
                  color="black"
                >
                  MORE
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* </Grid> */}
        </Stack>
      </Box>
      <MenubarUnder />
      <Footer />
    </>
  );
}
