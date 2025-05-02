import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Typography, Box } from "@mui/material";
import Menubar from "../Menubar";
import MenubarUnder from "../MenubarUnder";
import Footer from "../Footer";
// import HubspotForm from "./hubspotform.html";

const HubspotForm = () => {
  return (
    <div
      className="hs-form-frame"
      data-region="na1"
      data-form-id="6bf3f114-effd-4b57-9c44-82dc91853500"
      data-portal-id="48203486"
    ></div>
  );
};

export default function ContactUs() {
  return (
    <>
      <Menubar />
      <HubspotForm />

      {/* Service1 */}
      {/* <Box sx={{ width: { xs: "100%", lg: "1020px" }, mx: "auto", mt: "95px" }}>
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
              CONTACT US
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          maxWidth: 800,
          mx: "auto",
          mt: 5,
          p: 4,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          boxShadow: 2,
          bgcolor: "white",
        }}
      >
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <TextField fullWidth label="Name*" required variant="outlined" />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email*"
              required
              type="email"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company or Hospital name"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Introduce your study"
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1">Reference Paper</Typography>
            <Button variant="contained" component="label">
              Select File
              <input
                type="file"
                hidden
                onChange={(event) => handleFileChange(event, setReferencePaper)}
              />
            </Button>
            {referencePaper && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                {referencePaper.name}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Introduce your data"
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1">Sample Data (if you have)</Typography>
            <Button variant="contained" component="label">
              Select File
              <input
                type="file"
                hidden
                onChange={(event) => handleFileChange(event, setSampleData)}
              />
            </Button>
            {sampleData && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                {sampleData.name}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} textAlign="center">
            <Button variant="contained" color="primary" size="large">
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </Box> */}

      <MenubarUnder />
      <Footer />
    </>
  );
}
