import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

import Menubar from "../Menubar";
import MenubarUnder from "../MenubarUnder";
import Footer from "../Footer";

export default function BasicStack() {
  return (
    <>
      <Menubar />
      <Box sx={{ width: { xs: "100%", lg: "1020px" }, mx: "auto", mt: "89px" }}>
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
              ABOUT
            </Typography>
          </Grid>
        </Grid>
        <Stack spacing={2} mt={5}>
          <Grid
            item
            display="flex"
            flexDirection="column"
            alignItems={{ xs: "center", md: "flex-start" }}
            textAlign={{ xs: "Justify" }}
            sx={{ mt: 10, px: { xs: 5, md: 5 } }}
          >
            <Typography
              sx={{
                fontSize: "26px",
                fontFamily: "Noto Sans KR",
                fontWeight: 700,
                lineHeight: "31.2px",
              }}
            >
              Overview
            </Typography>
            <Typography
              sx={{
                mt: { lg: "9px", xs: 5 },
                fontFamily: "Noto Sans KR",
                fontSize: "16px",
                lineHeight: "26px",
              }}
            >
              The future of cancer research lies in data. We combine computable
              cancer data standards (mCODE) with artificial intelligence to help
              researchers of all scales create tangible value. Currently, cancer
              research fails to reach its full potential due to gaps in data
              accessibility, standardization, and analytical capabilities. Our
              platform removes these barriers, builds a collaborative research
              ecosystem, and ultimately contributes to improving patient care.
            </Typography>
          </Grid>

          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              sx={{ mt: 2, px: { xs: 5, md: 5 } }}
            >
              <Typography
                sx={{
                  fontSize: "26px",
                  fontFamily: "Noto Sans KR",
                  fontWeight: 700,
                  lineHeight: "31.2px",
                }}
              >
                Technology:{" "}
                <Typography
                  component="span"
                  sx={{
                    fontSize: "26px",
                    fontFamily: "Noto Sans KR",
                    fontWeight: 400,
                    lineHeight: "31.2px",
                  }}
                >
                  Realizing the Infinite Value of Computable Format Cancer Data
                </Typography>
              </Typography>

              <Grid
                container
                justifyContent={{ xs: "center", md: "flex-start" }}
                columnSpacing={{ md: "69px" }}
                sx={{ mt: { md: "53px" } }}
              >
                <Grid item xs={12} sm={12} md={4} display="flex">
                  <img
                    src={"/static/Images/About_Data.svg"}
                    alt="prod"
                    style={{ height: "100%" }}
                  />{" "}
                </Grid>
                <Grid
                  size={{ xs: 12, sm: 12, md: 8 }}
                  sx={{ mt: 1 }}
                  textAlign={{ xs: "Justify", md: "left" }}
                >
                  <Typography
                    sx={{
                      color: "#848E93",
                      fontFamily: "Noto Sans KR",
                      fontSize: "20px",
                      fontWeight: 400,
                      lineHeight: "24px",
                    }}
                  >
                    Data
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Noto Sans KR",
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "26px",
                      mt: "15px",
                      minWidth: { sm: "631px", xs: "80%" },
                    }}
                  >
                    Among the vast array of data used to understand cancer, our
                    technology precisely extracts, combines, and refines the
                    specific data researchers need, including the Patient
                    Information Group, Disease Characterization Group, Genomics
                    Group, Cancer Treatments Group, Outcomes Group, and Health
                    Assessment Group - all of which influence cancer treatment
                    outcomes.
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                container
                justifyContent={{ xs: "center", md: "flex-start" }}
                columnSpacing={{ md: "69px" }}
                sx={{ mt: { md: 5 } }}
              >
                <Grid item xs={12} sm={12} md={4} display="flex">
                  <img
                    src={"/static/Images/About_Medical_AI_Model_Design.svg"}
                    alt="prod"
                    style={{ height: "100%" }}
                  />{" "}
                </Grid>
                <Grid
                  size={{ xs: 12, sm: 12, md: 8 }}
                  sx={{ mt: 2 }}
                  textAlign={{ xs: "Justify", md: "left" }}
                >
                  <Typography
                    sx={{
                      color: "#848E93",
                      fontFamily: "Noto Sans KR",
                      fontSize: "20px",
                      fontWeight: 400,
                      lineHeight: "24px",
                    }}
                  >
                    Medical AI Model Design
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Noto Sans KR",
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "26px",
                      mt: "15px",
                      minWidth: { sm: "631px", xs: "80%" },
                    }}
                  >
                    We preprocess the refined data specifically for medical AI
                    model design. Through reinforcement learning, our medical AI
                    model design engine generates various medical AI model
                    proposals while enhancing its problem-solving capabilities
                    and derives optimal design solutions under given
                    constraints.
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                container
                justifyContent={{ xs: "center", md: "flex-start" }}
                columnSpacing={{ md: "69px" }}
                sx={{ mt: { md: 5 } }}
              >
                <Grid item xs={12} sm={12} md={4} display="flex">
                  <img
                    src={"/static/Images/About_Analysis.svg"}
                    alt="prod"
                    style={{ height: "100%" }}
                  />{" "}
                </Grid>
                <Grid
                  size={{ xs: 12, sm: 12, md: 8 }}
                  sx={{ mt: 2 }}
                  textAlign={{ xs: "Justify", md: "left" }}
                >
                  <Typography
                    sx={{
                      color: "#848E93",
                      fontFamily: "Noto Sans KR",
                      fontSize: "20px",
                      fontWeight: 400,
                      lineHeight: "24px",
                    }}
                  >
                    Analysis
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Noto Sans KR",
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "26px",
                      mt: "15px",
                      minWidth: { sm: "631px", xs: "80%" },
                    }}
                  >
                    We preprocess the refined data specifically for medical AI
                    model design. Through reinforcement learning, our medical AI
                    model design engine generates various medical AI model
                    proposals while enhancing its problem-solving capabilities
                    and derives optimal design solutions under given
                    constraints.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <Grid
            item
            display="flex"
            flexDirection="column"
            alignItems={{ xs: "center", md: "flex-start" }}
            textAlign={{ xs: "justify", md: "left" }}
            sx={{ px: { xs: 5, md: 0 } }}
          >
            <Typography
              sx={{
                mt: { xs: 5, md: "66px" },
                fontFamily: "Noto Sans KR",
                fontSize: "26px",
                fontWeight: 700,
                lineHeight: "31.2px",
              }}
            >
              DATAIZE focuses on two major challenges in the utilization and
              integration of cancer data:
            </Typography>

            <Grid
              item
              sx={{
                width: { xs: "95%", sm: "95%", md: "100%", lg: "100%" },
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={"/static/Images/about_desktopview.svg"}
                alt="prod"
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  height: "auto",
                  marginBottom: "10px",
                  marginTop: "29px",
                }}
              />
            </Grid>

            <Typography
              sx={{
                fontSize: "16px",
                fontFamily: "Noto Sans KR",
                mt: "32px",
                mb: "120px",
              }}
            >
              Integration of Fragmented Information
              <br /> <br />
              Cancer data is continuously generated in hospitals, research
              institutes, and clinical trials worldwide. Integrating this
              information is essential to find true insights in this vast sea of
              data. Our technology fundamentally transforms this process.We
              provide tools that specifically select and extract valuable
              information hidden in unstructured text data—physician notes,
              radiology reports, pathology results. This process accurately
              extracts selected data from free text using a framework based on
              knowledge graph-enhanced large language models. All relevant
              information, from patient details to disease characteristics,
              genetic variations, treatment responses, and long-term outcomes,
              is converted into standardized formats.The extracted information
              is structured in formats compatible with the international mCODE
              standard. By applying standardized ontologies, data generated from
              different institutions can now communicate in the same
              language—similar to translating knowledge recorded in different
              languages into a universal one.
              <br /> <br /> <br />
              Simplification of Complex Functions
              <br /> <br />
              Understanding and analyzing cancer's biological complexity
              requires the ability to intuitively interpret high-dimensional
              data. Our analytics platform streamlines this process. We provide
              key analytical methodologies through an intuitive interface,
              enabling researchers to perform sophisticated statistical analyses
              without complex coding knowledge. Survival analysis, biomarker
              correlations, and treatment response predictions now become
              possible with just a few clicks.Notably, this platform extends
              beyond being a simple analytical tool by promoting the sharing and
              reuse of research methodologies. Innovative analytical models
              developed by one researcher can be modularized and shared with
              others through the platform, accelerating knowledge dissemination
              and collective advancement.
              <br /> <br /> <br />
              The Great Potential of Small Teams
              <br /> <br />
              In the world of cancer clinical research, large-scale trials by
              major pharmaceutical companies and research institutions tend to
              receive attention. However, in reality, numerous small research
              teams conduct important studies based on original ideas and deep
              clinical experience. These small-scale studies often provide
              profound insights into rare cancers or specific patient subgroups
              that exhibit 'long-tail' phenomena.Our platform maximizes the
              potential of these small research teams. By removing technical
              barriers to data collection and refinement, we enable clinicians
              and cancer researchers to focus on their core expertise: deep
              understanding of cancer biology and patient care.
            </Typography>
          </Grid>
        </Stack>
      </Box>
      <MenubarUnder />
      <Footer />
    </>
  );
}
