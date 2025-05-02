import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Menubar from "../Menubar";
import MenubarUnder from "../MenubarUnder";
import Footer from "../Footer";
import Divider from "@mui/material/Divider";
import StarIcon from "@mui/icons-material/Star";

const pricingPlans = [
  {
    title: "Onco-Insight Starter",
    monthly: "$9/Month",
    yearly: "$99/Year",
    description:
      "Need a conference abstract fast? Turn your ideas into a polished, AI-crafted draft in minutes.",
    features: [
      "All features for mCODE TREND",
      "Basic features for DATA",
      "Basic features for ENGINEERING",
      "Basic features for ANALYSIS",
      "Basic features for RESULT",
    ],
    buttonText: "Get Started",
    buttonColor: "inherit",
    popular: false,
  },
  {
    title: "Onco-Insight Pro",
    monthly: "$49/Month",
    yearly: "$499/Year",
    description:
      "From messy to clarity. Turn raw clinical text into structured, sharable data for faster cancer research.",
    features: [
      "All features for mCODE TREND",
      "All features for DATA",
      "All features for ENGINEERING",
      "Basic features for ANALYSIS",
      "Basic features for RESULT",
    ],
    buttonText: "Upgrade to Pro",
    buttonColor: "primary",
    popular: true,
  },
  {
    title: "Onco-Insight Advanced",
    monthly: "$99/Month",
    yearly: "$999/Year",
    description:
      "From data-rich to discovery-ready. Connect, customize, and analyze at scale—built for dedicated cancer researchers.",
    features: [
      "All features for mCODE TREND",
      "All features for DATA",
      "All features for ENGINEERING",
      "All features for ANALYSIS",
      "All features for RESULT",
    ],
    buttonText: "Upgrade to Advanced",
    buttonColor: "inherit",
    popular: false,
  },
];

const PricingPage = () => {
  const [animatedTitle, setAnimatedTitle] = useState("");
  useEffect(() => {
    const fullTitle = "PLANS";
    let current = "";
    let i = 0;

    const typeTitle = () => {
      if (i < fullTitle.length) {
        current += fullTitle[i];
        setAnimatedTitle(current);
        i++;
        setTimeout(typeTitle, 100); // 글자 간 간격 조절
      }
    };

    typeTitle();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <Menubar />

      <Box
        sx={{
          width: { xs: "100%", md: "80%", lg: "60%" },
          mx: "auto",
          mt: "95px",
          mb: "200px",
        }}
      >
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item>
            <Typography
              sx={{
                fontSize: "36px",
                fontWeight: "bold",
                fontFamily: "IBM Plex Sans KR",
                letterSpacing: "0.21em",
                textAlign: "center",
                lineHeight: "63px",
              }}
            >
              {animatedTitle}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="center">
          {pricingPlans.map((plan, index) => (
            <Grid
              item
              xs={10}
              sm={10}
              md={4}
              sx={{ mb: { xs: 10, md: 0 } }}
              key={index}
              flexDirection="row"
            >
              <Card
                sx={{
                  mt: "47px",
                  p: 3,
                  borderRadius: 12,
                  boxShadow: 3,
                  height: "90%",
                  position: "relative",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0 0 20px rgba(60, 167, 223, 0.6)",
                    transform: "scale(1.02)",
                  },
                }}
              >
                {plan.popular && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    <Chip
                      label="Popular"
                      color="primary"
                      size="small"
                      alignItems="center"
                      sx={{
                        fontWeight: "regular",
                        fontFamily: "Noto Sans KR",
                      }}
                    />
                    <StarIcon sx={{ color: "#FFD700", fontSize: "30px" }} />
                  </Box>
                )}
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    fontFamily="Noto Sans KR"
                    gutterBottom
                    mb={"26px"}
                  >
                    {plan.title}
                  </Typography>
                  <Divider />
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    fontFamily="Noto Sans KR"
                    mt={"26px"}
                  >
                    <Typography variant="h5" fontWeight="bold">
                      {plan.monthly}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight="medium"
                      color="text.secondary"
                      fontFamily="Noto Sans KR"
                    >
                      {plan.yearly}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    fontFamily="Noto Sans KR"
                    color="text.secondary"
                    mt={"26px"}
                  >
                    {plan.description}
                  </Typography>
                  <ul
                    style={{ paddingLeft: 20, marginTop: 50, marginBottom: 16 }}
                  >
                    {plan.features.map((feature, idx) => (
                      <li key={idx}>
                        <Typography fontFamily="Noto Sans KR" variant="body2">
                          {feature}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                  <Link to="/tosspayment">
                    <Box display="flex" justifyContent="center">
                      <Button
                        sx={{
                          width: "80%",
                          mt: "50px",
                          textTransform: "none",
                          fontWeight: 300,
                          fontFamily: "Noto Sans KR",
                          borderRadius: 12,
                          boxShadow: 3,
                          color: "#FFFFFF",
                          bgcolor:
                            plan.buttonColor === "inherit"
                              ? "#3CA7DF"
                              : "#2F72B9",
                          "&:hover": {
                            bgcolor:
                              plan.buttonColor === "inherit"
                                ? "#3CA7DF"
                                : undefined,
                          },
                        }}
                      >
                        {plan.buttonText}
                      </Button>
                    </Box>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <MenubarUnder />
      <Footer />
    </>
  );
};

export default PricingPage;
