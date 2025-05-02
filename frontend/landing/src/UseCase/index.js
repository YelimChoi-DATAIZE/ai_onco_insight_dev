// @mui material components
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

// Material Kit 2 React components
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Menubar from "../Menubar";
import MenubarUnder from "../MenubarUnder";
import Footer from "../Footer";

import prod_image_sample from "../Images/prod_image_sample.svg";
import Service1 from "../Images/Service1.png";
import UseCase2 from "../Images/usecase2.svg";
import UseCase3 from "../Images/usecase3.svg";
import StudyTopic from "../Images/usecase_studytopic.svg";
import Result from "../Images/usecase_result.svg";
import Solution from "../Images/usecase_solution.svg";
import Title1 from "../Images/usecase_title1.svg";
import Title2 from "../Images/usecase_title2.svg";
import Title3 from "../Images/usecase_title3.svg";

function UseCase() {
  return (
    <>
      <Menubar />

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
              USE CASES
            </Typography>
          </Grid>
        </Grid>

        {/* UseCase1 */}
        <Container sx={{ mt: "42px" }}>
          <Grid item container>
            <Grid xs={12} md={12} spacing={2}>
              <Box
                component="img"
                src={Title1}
                alt="homesectiontool"
                width="123px"
                height="38px"
              />

              <Typography
                sx={{
                  fontSize: { lg: "26px", xs: "20px" },
                  fontFamily: "Noto Sans KR",
                  fontWeight: 700,
                  // lineHeight: "31.2px",
                  mt: "15px",
                }}
              >
                Diagnosis and Risk Stratification of HFpEF
              </Typography>
            </Grid>
          </Grid>
          <Typography
            sx={{
              fontSize: { lg: "20px", xs: "16px" },
              fontFamily: "Noto Sans KR",
              fontWeight: 400,
              lineHeight: "100%",
              color: "#7C8489",
              mt: "4px",
            }}
          >
            Chonnam National University, Professor Tae-Ryeom Oh
          </Typography>
          <Grid component="section" container spacing={"0px"} mt="20px">
            <Grid container item xs={12}>
              <Box
                sx={{
                  border: "2px solid #DFDFDF",
                  borderRadius: "20px",
                  p: "40px",
                  height: "100%",
                }}
              >
                <Grid item container>
                  <Grid xs={12} md={12} spacing={2}>
                    <Box
                      component="img"
                      src={StudyTopic}
                      alt="homesectiontool"
                      width={36}
                    />

                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontFamily: "Noto Sans KR",
                        fontWeight: 700,
                        lineHeight: "100%",
                        // color: "#7C8489",
                        mt: "9px",
                      }}
                    >
                      {" "}
                      Study Topic:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontFamily: "Noto Sans KR",
                        fontWeight: 400,
                        lineHeight: "26px",
                        // color: "#7C8489",
                        mt: "12px",
                      }}
                    >
                      Heart Failure with preserved Ejection Fraction (HFpEF)
                      requires accurate diagnosis and risk stratification. This
                      project aims to apply the 2022 AHA/ACC/HFSA heart failure
                      guidelines to real-world datasets to identify high-risk
                      patients.
                    </Typography>
                  </Grid>

                  <Grid xs={12} md={12} spacing={2}>
                    <Box
                      component="img"
                      src={Result}
                      alt="homesectiontool"
                      width={36}
                      mt="42px"
                    />

                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontFamily: "Noto Sans KR",
                        fontWeight: 700,
                        lineHeight: "100%",
                        // color: "#7C8489",
                        mt: "9px",
                      }}
                    >
                      {" "}
                      Result:
                    </Typography>
                    <Typography
                      mt={1}
                      component="p"
                      textAlign="justify"
                      color="black"
                    >
                      Developed an automated diagnostic model for HFpEF based on
                      AHA/ACC/HFSA guidelines, eliminating the need for manual
                      processes. Successfully identified the top 1% of high-risk
                      HFpEF patients (score > 5) using echocardiography reports
                      and clinical progress notes in PDF and CSV formats from
                      actual hospital data.
                    </Typography>
                  </Grid>

                  <Grid xs={12} md={12} spacing={2}>
                    <Box
                      component="img"
                      src={Solution}
                      alt="homesectiontool"
                      width={36}
                      mt="42px"
                    />

                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontFamily: "Noto Sans KR",
                        fontWeight: 700,
                        lineHeight: "100%",
                        // color: "#7C8489",
                      }}
                    >
                      {" "}
                      Our Solution:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontFamily: "Noto Sans KR",
                        fontWeight: 400,
                        lineHeight: "26px",
                        // color: "#7C8489",
                        mt: "12px",
                      }}
                    >
                      Parse and perform text recognition on echocardiography
                      reports in PDF format. Extract fields of interest (e.g.,
                      symptoms, LVEF, LVMI, test results) from EMR progress
                      notes and convert the extracted data into HL7 FHIR
                      Observation Resources. Develop a classification algorithm
                      based on AHA/ACC/HFSA heart failure guidelines. Provide a
                      comprehensive report on analysis results.
                    </Typography>
                  </Grid>

                  <Grid xs={12} md={12}>
                    <Box
                      component="img"
                      src={Service1}
                      alt="img"
                      sx={{ width: "100%", mt: "54px" }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* UseCase2 */}
        <Container sx={{ mt: "127px" }}>
          <Grid item container>
            <Grid xs={12} md={12} spacing={2}>
              <Box
                component="img"
                src={Title2}
                alt="homesectiontool"
                width="123px"
                height="38px"
                mt="127px"
              />

              <Typography
                sx={{
                  fontSize: { lg: "26px", xs: "20px" },
                  fontFamily: "Noto Sans KR",
                  fontWeight: 700,
                  // lineHeight: "31.2px",
                  mt: "15px",
                }}
              >
                Analysis of Neonatal Hospital Visit Reasons
              </Typography>
            </Grid>
          </Grid>
          <Typography
            sx={{
              fontSize: { lg: "20px", xs: "16px" },
              fontFamily: "Noto Sans KR",
              fontWeight: 400,
              lineHeight: "100%",
              color: "#7C8489",
              mt: "4px",
            }}
          >
            Ewha Womans University, Professor Do-Sang Cho
          </Typography>
          <Grid component="section" container spacing={"0px"} mt="20px">
            <Grid container item xs={12}>
              <Box
                sx={{
                  border: "2px solid #DFDFDF",
                  borderRadius: "20px",
                  p: "40px",
                  height: "100%",
                }}
              >
                <Grid item container>
                  <Grid xs={12} md={12} spacing={2}>
                    <Box
                      component="img"
                      src={StudyTopic}
                      alt="homesectiontool"
                      width={36}
                    />

                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontFamily: "Noto Sans KR",
                        fontWeight: 700,
                        lineHeight: "100%",
                        // color: "#7C8489",
                        mt: "9px",
                      }}
                    >
                      {" "}
                      Study Topic:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontFamily: "Noto Sans KR",
                        fontWeight: 400,
                        lineHeight: "26px",
                        // color: "#7C8489",
                        mt: "12px",
                      }}
                    >
                      Analyze reasons for neonatal hospital visits to identify
                      trends and caregiver needs.
                    </Typography>
                  </Grid>

                  <Grid xs={12} md={12} spacing={2}>
                    <Box
                      component="img"
                      src={Result}
                      alt="homesectiontool"
                      width={36}
                      mt="42px"
                    />

                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontFamily: "Noto Sans KR",
                        fontWeight: 700,
                        lineHeight: "100%",
                        // color: "#7C8489",
                        mt: "9px",
                      }}
                    >
                      {" "}
                      Result:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontFamily: "Noto Sans KR",
                        fontWeight: 400,
                        lineHeight: "26px",
                        // color: "#7C8489",
                        mt: "12px",
                      }}
                    >
                      Extracted 3,297 symptom data entries from 2,964 neonates
                      and provided weekly and monthly trend information on
                      symptoms.
                    </Typography>
                  </Grid>

                  <Grid xs={12} md={12} spacing={2}>
                    <Box
                      component="img"
                      src={Solution}
                      alt="homesectiontool"
                      width={36}
                      mt="42px"
                    />

                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontFamily: "Noto Sans KR",
                        fontWeight: 700,
                        lineHeight: "100%",
                        // color: "#7C8489",
                      }}
                    >
                      {" "}
                      Our Solution:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontFamily: "Noto Sans KR",
                        fontWeight: 400,
                        lineHeight: "26px",
                        // color: "#7C8489",
                        mt: "12px",
                      }}
                    >
                      Extract neonatal symptoms, symptom body site, and symptom
                      status information from EMR progress notes and transform
                      the data into Observation Resources. Visualize symptom
                      variation trends and pivot symptom data by month and week.
                    </Typography>
                  </Grid>

                  <Grid xs={12} md={12}>
                    <Box
                      component="img"
                      src={UseCase2}
                      alt="img"
                      sx={{ width: "100%", mt: "54px" }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* UseCase3 */}
        <Container sx={{ mt: "127px", mb: "201px" }}>
          <Grid item container>
            <Grid xs={12} md={12} spacing={2}>
              <Box
                component="img"
                src={Title3}
                alt="homesectiontool"
                width="123px"
                height="38px"
                mt="127px"
              />

              <Typography
                sx={{
                  fontSize: { lg: "26px", xs: "20px" },
                  fontFamily: "Noto Sans KR",
                  fontWeight: 700,
                  // lineHeight: "31.2px",
                  mt: "15px",
                }}
              >
                Prognostic Analysis of Breast Cancer Patients Undergoing NAC
              </Typography>
            </Grid>
          </Grid>
          <Typography
            sx={{
              fontSize: { lg: "20px", xs: "16px" },
              fontFamily: "Noto Sans KR",
              fontWeight: 400,
              lineHeight: "100%",
              color: "#7C8489",
              mt: "4px",
            }}
          >
            Yonsei University, Professor Eun-Jung Yang
          </Typography>
          <Grid component="section" container spacing={"0px"} mt="20px">
            <Grid container item xs={12}>
              <Box
                sx={{
                  border: "2px solid #DFDFDF",
                  borderRadius: "20px",
                  p: "40px",
                  height: "100%",
                }}
              >
                <Grid item container>
                  <Grid xs={12} md={12} spacing={2}>
                    <Box
                      component="img"
                      src={StudyTopic}
                      alt="homesectiontool"
                      width={36}
                    />

                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontFamily: "Noto Sans KR",
                        fontWeight: 700,
                        lineHeight: "100%",
                        // color: "#7C8489",
                        mt: "9px",
                      }}
                    >
                      {" "}
                      Study Topic:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontFamily: "Noto Sans KR",
                        fontWeight: 400,
                        lineHeight: "26px",
                        // color: "#7C8489",
                        mt: "12px",
                      }}
                    >
                      Analyze the prognosis of breast cancer patients treated
                      with Neoadjuvant Chemotherapy (NAC) to predict treatment
                      outcomes and identify high-risk patients with poor
                      prognosis in advance.
                    </Typography>
                  </Grid>

                  <Grid xs={12} md={12} spacing={2}>
                    <Box
                      component="img"
                      src={Result}
                      alt="homesectiontool"
                      width={36}
                      mt="42px"
                    />

                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontFamily: "Noto Sans KR",
                        fontWeight: 700,
                        lineHeight: "100%",
                        // color: "#7C8489",
                        mt: "9px",
                      }}
                    >
                      {" "}
                      Result:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontFamily: "Noto Sans KR",
                        fontWeight: 400,
                        lineHeight: "26px",
                        // color: "#7C8489",
                        mt: "12px",
                      }}
                    >
                      Demonstrated the importance of clinical N and T stages and
                      hormone receptor status in predicting prognosis and NAC
                      treatment efficacy for 3,285 breast cancer patients.
                    </Typography>
                  </Grid>

                  <Grid xs={12} md={12} spacing={2}>
                    <Box
                      component="img"
                      src={Solution}
                      alt="homesectiontool"
                      width={36}
                      mt="42px"
                    />

                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontFamily: "Noto Sans KR",
                        fontWeight: 700,
                        lineHeight: "100%",
                        // color: "#7C8489",
                        mt: "9px",
                      }}
                    >
                      {" "}
                      Our Solution:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontFamily: "Noto Sans KR",
                        fontWeight: 400,
                        lineHeight: "26px",
                        // color: "#7C8489",
                        mt: "12px",
                      }}
                    >
                      Extract subtype information, tumor marker test results,
                      tumor status, tumor stage, symptom details, symptom body
                      site, and symptom status from 13,000,000-byte-sized EMR
                      pathology reports and progress notes. Transform the
                      extracted data into mCODE format. Predict the non-pCR
                      group among breast cancer patients using a trained machine
                      learning model.
                    </Typography>
                  </Grid>

                  <Grid xs={12} md={12}>
                    <Box
                      component="img"
                      src={UseCase3}
                      alt="img"
                      sx={{ width: "100%", mt: "54px" }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <MenubarUnder />
      <Footer />
    </>
  );
}
export default UseCase;
