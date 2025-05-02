import React from "react";
import Box from "@mui/material/Box";
import videoSource from "../Images/bg_video.mp4";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";

function App() {
  return (
    <>
      <div
        style={{
          position: "relative",
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
        >
          <source src={videoSource} type="video/mp4" />
        </video>

        {/* Content */}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={10} sm={8} md={6}>
            <Typography
              variant="h2"
              fontWeight="medium"
              color="white"
              gutterBottom
            >
              Coming Soon
            </Typography>
            <Typography
              variant="h4"
              fontWeight="light"
              color="white"
              gutterBottom
            >
              Dataize...
            </Typography>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default App;
