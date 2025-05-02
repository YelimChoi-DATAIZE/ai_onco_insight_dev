// @mui material components
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// Material Kit 2 React components
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Menubar from "../Menubar";
import MenubarUnder from "../MenubarUnder";
import Footer from "../Footer";

import prod_image_sample from "../Images/prod_image_sample.svg";
import Service1 from "../Images/Service1.png";
import Service2 from "../Images/Service2.png";
import Service3 from "../Images/Service3.png";
import ServiceIntro from "../Images/service_intro.svg";
import Keyfeatures from "../Images/service_keyfeatures.svg";
import WhoItsfor from "../Images/service_whoitsfor.svg";
import Benefit from "../Images/service_benefits.svg";

function Service() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80, // 80px 만큼 보정
          behavior: "smooth",
        });
      }
    }
  }, [location]);

  return (
    <>
      <Menubar />

      {/* Service1 */}
      <Box sx={{ width: { xs: "100%", lg: "1020px" }, mx: "auto", mt: "95px" }}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item>
            <Typography
              sx={{
                fontSize: "42px",
                fontFamily: "IBM Plex Sans KR",
                letterSpacing: "0.21em",
                textAlign: "center",
                lineHeight: "63px",
              }}
            >
              SERVICES
            </Typography>
          </Grid>
        </Grid>

        <div id="mCODESearch">
          <Container sx={{ mt: "58px" }}>
            <Typography
              sx={{
                fontSize: "26px",
                fontFamily: "Noto Sans KR",
                fontWeight: 700,
                lineHeight: "31.2px",
              }}
            >
              mCODE Search
            </Typography>
            <Grid
              component="section"
              container
              spacing={"0px"}
              mt="13px"
              maWwidth="1006px"
            >
              <Grid container item xs={12}>
                <Box
                  sx={{
                    border: "2px solid #DFDFDF",
                    borderRadius: "20px",
                    p: "40px",
                    height: "777px",
                  }}
                >
                  <Grid item container>
                    <Grid xs={12} md={12} spacing={2}>
                      <Box
                        component="img"
                        src={ServiceIntro}
                        alt="homesectiontool"
                        width="48px"
                      />

                      <Typography
                        sx={{
                          fontSize: { lg: "20px", xs: "20px" },
                          fontFamily: "Noto Sans KR",
                          fontWeight: 700,
                          // lineHeight: { lg: "90px", xs: "30px" },
                          // textAlign:{ xs: "center", md: "center" },
                          ml: 0,
                        }}
                      >
                        {" "}
                        Empowering the Future of Cancer Research by Delivering
                        Comprehensive Recommendations
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: { lg: "16px", xs: "16px" },
                          fontFamily: "Noto Sans KR",
                          fontWeight: 400,
                          lineHeight: "26px",
                          // textAlign:{ xs: "center", md: "center" },
                          mt: "17px",
                          color: "#212324",
                        }}
                      >
                        Explore high-quality cancer research data effortlessly
                        with our innovative search tool. Access critical
                        datasets and discover research ideas tailored to your
                        objectives. Powered by AI-driven indexing and search
                        algorithms, our tool recommends related studies that
                        incorporate the data you need. Whether you're involved
                        in clinical trials, epidemiological studies, or
                        exploring new therapies, our solution streamlines data
                        discovery and accelerates your journey to impactful
                        outcomes.
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={12}>
                      <Box mt="32px">
                        <img
                          src={"/static/Images/Service1_JPEG.jpg"}
                          alt="prod"
                          width="150%"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid container item xs={12} mt="38px">
                <Box
                  sx={{
                    border: "2px solid #DFDFDF",
                    borderRadius: "20px",
                    p: "40px",
                    maxHeight: "357px",
                  }}
                >
                  <Grid item container>
                    <Grid xs={12} md={12} spacing={0}>
                      <Box
                        component="img"
                        src={Keyfeatures}
                        alt="homesectiontool"
                        width={36}
                      />

                      <Typography
                        sx={{
                          fontSize: { lg: "20px", xs: "20px" },
                          fontFamily: "Noto Sans KR",
                          fontWeight: 700,
                          // lineHeight: { lg: "90px", xs: "30px" },
                          // textAlign:{ xs: "center", md: "center" },
                          ml: 0,
                        }}
                      >
                        {" "}
                        Key features
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: { lg: "16px", xs: "16px" },
                          fontFamily: "Noto Sans KR",
                          fontWeight: 400,
                          lineHeight: "26px",
                          // textAlign:{ xs: "center", md: "center" },
                          mt: "17px",
                          color: "#212324",
                        }}
                      >
                        AI-Driven Querying: Utilize AI-powered NLP to quickly
                        search mCODE-compliant records and publications for
                        relevant insights.
                        <br />
                        Comprehensive Indexing: Seamlessly index diverse
                        datasets—from EHRs to clinical trials—for a unified
                        repository of actionable cancer research data. <br />
                        Advanced Filtering & Sorting: Refine your search with
                        intelligent filters like date ranges, study types, and
                        data quality indicators to pinpoint exactly what you
                        need.
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: { lg: "row", xs: "column" },
                  justifyContent: { lg: "space-between", xs: "center" },
                  mt: "38px",
                }}
              >
                <Grid item sx={{ width: { lg: "48%", sx: 12 } }}>
                  <Box
                    sx={{
                      border: "2px solid #DFDFDF",
                      borderRadius: "20px",
                      p: "40px",
                      minHeight: "519px",
                    }}
                  >
                    <Box component="img" src={WhoItsfor} alt="Service1" />
                    <Typography
                      sx={{
                        fontSize: { lg: "20px", xs: "20px" },
                        fontFamily: "Noto Sans KR",
                        fontWeight: 700,
                        // lineHeight: { lg: "90px", xs: "30px" },
                        // textAlign:{ xs: "center", md: "center" },
                        ml: 0,
                      }}
                    >
                      {" "}
                      Who Its for
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { lg: "16px", xs: "16px" },
                        fontFamily: "Noto Sans KR",
                        fontWeight: 400,
                        lineHeight: "26px",
                        // textAlign:{ xs: "center", md: "center" },
                        mt: "17px",
                        color: "#212324",
                      }}
                    >
                      Clinical Researchers:
                      <br />
                      Effortlessly locate the datasets that underpin
                      groundbreaking cancer studies, streamlining your research
                      process.
                      <br />
                      Healthcare Institutions:
                      <br />
                      Enhance data discoverability and support better clinical
                      decision-making by rapidly accessing comprehensive
                      oncology data.
                      <br />
                      Data Scientists:
                      <br />
                      Find structured, high-quality data to fuel advanced
                      analytics, model development, and AI training initiatives.
                    </Typography>
                  </Box>
                </Grid>

                <Grid
                  item
                  sx={{
                    width: { lg: "48%", xs: "100%" },
                    mt: { xs: "38px", sm: 16, md: 16, lg: 0 },
                  }}
                >
                  {" "}
                  <Box
                    sx={{
                      border: "2px solid #DFDFDF",
                      borderRadius: "20px",
                      p: "40px",
                      minHeight: "519px",
                    }}
                  >
                    <Box component="img" src={Benefit} alt="Service1" />
                    <Typography
                      sx={{
                        fontSize: { lg: "20px", xs: "20px" },
                        fontFamily: "Noto Sans KR",
                        fontWeight: 700,
                        // lineHeight: { lg: "90px", xs: "30px" },
                        // textAlign:{ xs: "center", md: "center" },
                        ml: 0,
                      }}
                    >
                      {" "}
                      Benefit
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { lg: "16px", xs: "16px" },
                        fontFamily: "Noto Sans KR",
                        fontWeight: 400,
                        lineHeight: "26px",
                        // textAlign:{ xs: "center", md: "center" },
                        mt: "17px",
                        color: "#212324",
                      }}
                    >
                      Save Time and Resources:
                      <br />
                      Eliminate hours of manual data hunting with a robust,
                      automated search solution that delivers results in
                      seconds.
                      <br />
                      Boost Research Efficiency:
                      <br />
                      Quickly retrieve research-ready data, allowing you to
                      focus more on analysis and innovation rather than data
                      collection.
                      <br />
                      Empower Innovation:
                      <br />
                      Unlock actionable insights faster to drive impactful
                      cancer research and accelerate breakthroughs in treatment.
                      <br />
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Box>

      {/* Service2 */}
      <div id="DataIntegration">
        <Box
          sx={{ width: { xs: "100%", lg: "1020px" }, mx: "auto", mt: "95px" }}
        >
          <Container sx={{ mt: "58px" }}>
            <Typography
              sx={{
                fontSize: "26px",
                fontFamily: "Noto Sans KR",
                fontWeight: 700,
                lineHeight: "31.2px",
              }}
            >
              Data Integration
            </Typography>
            <Grid
              component="section"
              container
              spacing={"0px"}
              mt="13px"
              maWwidth="1006px"
            >
              <Grid container item xs={12}>
                <Box
                  sx={{
                    border: "2px solid #DFDFDF",
                    borderRadius: "20px",
                    p: "40px",
                    height: "763px",
                  }}
                >
                  <Grid item container>
                    <Grid xs={12} md={12} spacing={2}>
                      <Box
                        component="img"
                        src={ServiceIntro}
                        alt="homesectiontool"
                        width="48px"
                      />

                      <Typography
                        sx={{
                          fontSize: { lg: "20px", xs: "20px" },
                          fontFamily: "Noto Sans KR",
                          fontWeight: 700,
                          // lineHeight: { lg: "90px", xs: "30px" },
                          // textAlign:{ xs: "center", md: "center" },
                          ml: 0,
                        }}
                      >
                        {" "}
                        Seamless Data Integration for Smarter Cancer Research
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: { lg: "16px", xs: "16px" },
                          fontFamily: "Noto Sans KR",
                          fontWeight: 400,
                          lineHeight: "26px",
                          // textAlign:{ xs: "center", md: "center" },
                          mt: "17px",
                          color: "#212324",
                        }}
                      >
                        Data Extraction & Integration, powered by the AI-enabled
                        mCODE Extraction Framework, simplifies the process of
                        extracting, standardizing, and integrating clinical
                        data. This service ensures researchers have access to
                        clean, consistent, and actionable datasets to drive
                        impactful cancer studies.
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={12}>
                      <Box
                        component="img"
                        src={Service2}
                        alt="img"
                        width="100%"
                        // style={{ height: "auto", width: "100%" }}
                        mt="32px"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid container item xs={12} mt="38px">
                <Box
                  sx={{
                    border: "2px solid #DFDFDF",
                    borderRadius: "20px",
                    p: "40px",
                    maxHeight: "357px",
                  }}
                >
                  <Grid item container>
                    <Grid xs={12} md={12} spacing={0}>
                      <Box
                        component="img"
                        src={Keyfeatures}
                        alt="homesectiontool"
                        width={36}
                      />

                      <Typography
                        sx={{
                          fontSize: { lg: "20px", xs: "20px" },
                          fontFamily: "Noto Sans KR",
                          fontWeight: 700,
                          // lineHeight: { lg: "90px", xs: "30px" },
                          // textAlign:{ xs: "center", md: "center" },
                          ml: 0,
                        }}
                      >
                        {" "}
                        Key features
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: { lg: "16px", xs: "16px" },
                          fontFamily: "Noto Sans KR",
                          fontWeight: 400,
                          lineHeight: "26px",
                          // textAlign:{ xs: "center", md: "center" },
                          mt: "17px",
                          color: "#212324",
                        }}
                      >
                        AI-Driven Data Extraction: Automatically extract
                        mCODE-compliant data from EHRs and other clinical
                        sources with precision and speed.
                        <br />
                        Streamlined Integration: Consolidate diverse datasets
                        into a unified, research-ready format.Standardization:
                        Ensure compatibility with industry standards for
                        consistent and reliable data.
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: { lg: "row", xs: "column" },
                  justifyContent: { lg: "space-between", xs: "center" },
                  mt: "38px",
                }}
              >
                <Grid item sx={{ width: { lg: "48%", sx: 12 } }}>
                  <Box
                    sx={{
                      border: "2px solid #DFDFDF",
                      borderRadius: "20px",
                      p: "40px",
                      minHeight: "361px",
                    }}
                  >
                    <Box component="img" src={WhoItsfor} alt="Service1" />
                    <Typography
                      sx={{
                        fontSize: { lg: "20px", xs: "20px" },
                        fontFamily: "Noto Sans KR",
                        fontWeight: 700,
                        // lineHeight: { lg: "90px", xs: "30px" },
                        // textAlign:{ xs: "center", md: "center" },
                        ml: 0,
                      }}
                    >
                      {" "}
                      Who Its for
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { lg: "16px", xs: "16px" },
                        fontFamily: "Noto Sans KR",
                        fontWeight: 400,
                        lineHeight: "26px",
                        // textAlign:{ xs: "center", md: "center" },
                        mt: "17px",
                        color: "#212324",
                      }}
                    >
                      Clinical Researchers: Streamline data preparation for
                      cancer studies.
                      <br /> Healthcare Institutions: Standardize and manage
                      large-scale oncology datasets. <br />
                      Data Scientists: Access high-quality, structured data for
                      advanced analytics and model development.
                    </Typography>
                  </Box>
                </Grid>

                <Grid
                  item
                  sx={{
                    width: { lg: "48%", xs: "100%" },
                    mt: { xs: "38px", sm: 16, md: 16, lg: 0 },
                  }}
                >
                  {" "}
                  <Box
                    sx={{
                      border: "2px solid #DFDFDF",
                      borderRadius: "20px",
                      p: "40px",
                      minHeight: "361px",
                    }}
                  >
                    <Box component="img" src={Benefit} alt="Service1" />
                    <Typography
                      sx={{
                        fontSize: { lg: "20px", xs: "20px" },
                        fontFamily: "Noto Sans KR",
                        fontWeight: 700,
                        // lineHeight: { lg: "90px", xs: "30px" },
                        // textAlign:{ xs: "center", md: "center" },
                        ml: 0,
                      }}
                    >
                      {" "}
                      Benefit
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { lg: "16px", xs: "16px" },
                        fontFamily: "Noto Sans KR",
                        fontWeight: 400,
                        lineHeight: "26px",
                        // textAlign:{ xs: "center", md: "center" },
                        mt: "17px",
                        color: "#212324",
                      }}
                    >
                      Save Time and Resources: Eliminate manual data processing
                      with automated solutions.
                      <br />
                      Improve Data Quality: Maintain accuracy and consistency
                      with mCODE standards.
                      <br />
                      Enhance Research Efficiency: Focus on analysis and
                      insights rather than data preparation.
                      <br />
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </div>

      {/* Service3 */}
      <div id="DataAnalytics">
        <Box
          sx={{
            width: { xs: "100%", lg: "1020px" },
            mx: "auto",
            mt: "95px",
            mb: "118px",
          }}
        >
          <Container sx={{ mt: "58px" }}>
            <Typography
              sx={{
                fontSize: "26px",
                fontFamily: "Noto Sans KR",
                fontWeight: 700,
                lineHeight: "31.2px",
              }}
            >
              Data Analytics
            </Typography>
            <Grid
              component="section"
              container
              spacing={"0px"}
              mt="13px"
              maWwidth="1006px"
            >
              <Grid container item xs={12}>
                <Box
                  sx={{
                    border: "2px solid #DFDFDF",
                    borderRadius: "20px",
                    p: "40px",
                    height: "763px",
                  }}
                >
                  <Grid item container>
                    <Grid xs={12} md={12} spacing={2}>
                      <Box
                        component="img"
                        src={ServiceIntro}
                        alt="homesectiontool"
                        width="48px"
                      />

                      <Typography
                        sx={{
                          fontSize: { lg: "20px", xs: "20px" },
                          fontFamily: "Noto Sans KR",
                          fontWeight: 700,
                          // lineHeight: { lg: "90px", xs: "30px" },
                          // textAlign:{ xs: "center", md: "center" },
                          ml: 0,
                        }}
                      >
                        {" "}
                        Unlock Actionable Insights for Smarter Cancer Research
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: { lg: "16px", xs: "16px" },
                          fontFamily: "Noto Sans KR",
                          fontWeight: 400,
                          lineHeight: "26px",
                          // textAlign:{ xs: "center", md: "center" },
                          mt: "17px",
                          color: "#212324",
                        }}
                      >
                        Data Analytics & Insights, powered by the AI-enabled
                        mCODE Extraction Framework, enables researchers to
                        transform raw data into meaningful insights. By
                        leveraging advanced analytics and visualization tools,
                        this service helps accelerate discoveries and supports
                        data-driven decision-making in cancer research.
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={12}>
                      <Box
                        component="img"
                        src={Service2}
                        alt="img"
                        style={{ height: "auto", width: "100%" }}
                        mt="32px"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid container item xs={12} mt="38px">
                <Box
                  sx={{
                    border: "2px solid #DFDFDF",
                    borderRadius: "20px",
                    p: "40px",
                    maxHeight: "357px",
                  }}
                >
                  <Grid item container>
                    <Grid xs={12} md={12} spacing={0}>
                      <Box
                        component="img"
                        src={Keyfeatures}
                        alt="homesectiontool"
                        width={36}
                      />

                      <Typography
                        sx={{
                          fontSize: { lg: "20px", xs: "20px" },
                          fontFamily: "Noto Sans KR",
                          fontWeight: 700,
                          // lineHeight: { lg: "90px", xs: "30px" },
                          // textAlign:{ xs: "center", md: "center" },
                          ml: 0,
                        }}
                      >
                        {" "}
                        Key features
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: { lg: "16px", xs: "16px" },
                          fontFamily: "Noto Sans KR",
                          fontWeight: 400,
                          lineHeight: "26px",
                          // textAlign:{ xs: "center", md: "center" },
                          mt: "17px",
                          color: "#212324",
                        }}
                      >
                        Advanced Analytics Tools: Harness AI and machine
                        learning to analyze complex clinical datasets and
                        uncover hidden patterns. <br />
                        Intuitive Data Visualization: Generate dynamic charts
                        and dashboards for clear and impactful insights. <br />
                        Predictive Insights: Evaluate treatment outcomes and
                        identify trends for better decision-making.
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: { lg: "row", xs: "column" },
                  justifyContent: { lg: "space-between", xs: "center" },
                  mt: "38px",
                }}
              >
                <Grid item sx={{ width: { lg: "48%", sx: 12 } }}>
                  <Box
                    sx={{
                      border: "2px solid #DFDFDF",
                      borderRadius: "20px",
                      p: "40px",
                      minHeight: "375px",
                    }}
                  >
                    <Box component="img" src={WhoItsfor} alt="Service1" />
                    <Typography
                      sx={{
                        fontSize: { lg: "20px", xs: "20px" },
                        fontFamily: "Noto Sans KR",
                        fontWeight: 700,
                        // lineHeight: { lg: "90px", xs: "30px" },
                        // textAlign:{ xs: "center", md: "center" },
                        ml: 0,
                      }}
                    >
                      {" "}
                      Who Its for
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { lg: "16px", xs: "16px" },
                        fontFamily: "Noto Sans KR",
                        fontWeight: 400,
                        lineHeight: "26px",
                        // textAlign:{ xs: "center", md: "center" },
                        mt: "17px",
                        color: "#212324",
                      }}
                    >
                      Cancer Researchers: Uncover deeper insights from clinical
                      and genomic data.
                      <br />
                      Healthcare Decision-Makers: Support evidence-based
                      strategies with actionable analytics.
                      <br />
                      AI/ML Teams: Leverage high-quality datasets for training
                      predictive models.
                    </Typography>
                  </Box>
                </Grid>

                <Grid
                  item
                  sx={{
                    width: { lg: "48%", xs: "100%" },
                    mt: { xs: "38px", sm: 16, md: 16, lg: 0 },
                  }}
                >
                  {" "}
                  <Box
                    sx={{
                      border: "2px solid #DFDFDF",
                      borderRadius: "20px",
                      p: "40px",
                      minHeight: "375px",
                    }}
                  >
                    <Box component="img" src={Benefit} alt="Service1" />
                    <Typography
                      sx={{
                        fontSize: { lg: "20px", xs: "20px" },
                        fontFamily: "Noto Sans KR",
                        fontWeight: 700,
                        // lineHeight: { lg: "90px", xs: "30px" },
                        // textAlign:{ xs: "center", md: "center" },
                        ml: 0,
                      }}
                    >
                      {" "}
                      Benefit
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { lg: "16px", xs: "16px" },
                        fontFamily: "Noto Sans KR",
                        fontWeight: 400,
                        lineHeight: "26px",
                        // textAlign:{ xs: "center", md: "center" },
                        mt: "17px",
                        color: "#212324",
                      }}
                    >
                      Accelerate Discoveries: Quickly identify patterns and
                      trends to fast-track research outcomes.
                      <br />
                      Make Data-Driven Decisions: Rely on clear, actionable
                      insights to inform clinical strategies.
                      <br />
                      Enhance Research Impact: Turn data into valuable findings
                      that improve patient care and outcomes.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </div>
      <MenubarUnder />
      <Footer />
    </>
  );
}
export default Service;
