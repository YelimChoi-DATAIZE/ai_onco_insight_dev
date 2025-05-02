// import React, { useState, useEffect } from 'react';
// import Plot from 'react-plotly.js';
// import { AppBar, Toolbar, Typography, Container, TextField, Button, Grid, Paper, Box, List, ListItem, ListItemText, Fade, InputAdornment, IconButton } from '@mui/material';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import PauseIcon from '@mui/icons-material/Pause';

// const trendingKeywords = [
//   'AI news',
//   'Oscars 2025',
//   'SpaceX launch',
//   'Euro 2024',
//   'Bitcoin price',
//   'Taylor Swift tour',
//   'GPT-5 release',
//   'Climate summit',
// ];

// // Generate random data for mock chart
// const generateChartData = () => {
//   const x = ['2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06'];
//   const y = x.map(() => Math.floor(Math.random() * 50) + 10);
//   return { x, y };
// };

// export default function GoogleTrendsMUI() {
//   const [currentKeyword, setCurrentKeyword] = useState(trendingKeywords[0]);
//   const [index, setIndex] = useState(0);
//   const [fadeIn, setFadeIn] = useState(true);
//   const [chartData, setChartData] = useState(generateChartData());
//   const [isPlaying, setIsPlaying] = useState(true);

//   useEffect(() => {
//     if (!isPlaying) return;
//     const interval = setInterval(() => {
//       setFadeIn(false);
//       setTimeout(() => {
//         const newIndex = (index + 1) % trendingKeywords.length;
//         setIndex(newIndex);
//         setFadeIn(true);
//         setChartData(generateChartData());
//       }, 300);
//     }, 2500);
//     return () => clearInterval(interval);
//   }, [index, isPlaying]);

//   useEffect(() => {
//     setCurrentKeyword(trendingKeywords[index]);
//   }, [index]);

//   return (
//     <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
//       {/* Header */}
//       <AppBar position="static" color="default" elevation={1}>
//         <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
//           <Typography variant="h6" color="primary">
//             Google Trends
//           </Typography>
//           <Box>
//             <Button color="inherit">Explore</Button>
//             <Button color="inherit">Trending</Button>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Search Section */}
//       <Box sx={{ backgroundColor: '#fff', py: 6, boxShadow: 1 }}>
//         <Container maxWidth="md">
//           <Grid container spacing={2} alignItems="center">
//             <Grid item xs={9}>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 placeholder=""
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Fade in={fadeIn} timeout={300}>
//                         <Typography noWrap sx={{ color: 'grey.500', maxWidth: '100%' }}>
//                           {currentKeyword}
//                         </Typography>
//                       </Fade>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
//             <Grid item xs={3}>
//               <Button variant="contained" fullWidth sx={{ height: '100%' }}>Search</Button>
//             </Grid>
//           </Grid>
//         </Container>

//         {/* Decorative Chart Below Search Bar */}
//         <Container maxWidth="md" sx={{ mt: 4 }}>
//           <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f0f8ff', borderRadius: 2 }}>
//             <Plot
//               data={[
//                 {
//                   x: chartData.x,
//                   y: chartData.y,
//                   type: 'scatter',
//                   mode: 'lines+markers',
//                   marker: { color: '#42a5f5' },
//                   name: 'Trending'
//                 },
//               ]}
//               layout={{
//                 autosize: true,
//                 margin: { t: 10, b: 30, l: 30, r: 10 },
//                 height: 180,
//                 paper_bgcolor: '#f0f8ff',
//                 plot_bgcolor: '#f0f8ff',
//                 xaxis: { color: '#90caf9', tickfont: { size: 10 } },
//                 yaxis: { color: '#90caf9', tickfont: { size: 10 } },
//               }}
//               style={{ width: '100%' }}
//               config={{ staticPlot: true, displayModeBar: false }}
//             />
//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
//               <IconButton
//                 size="small"
//                 color="primary"
//                 onClick={() => setIsPlaying(!isPlaying)}
//                 sx={{ border: '1px solid #90caf9', borderRadius: 2 }}
//               >
//                 {isPlaying ? <PauseIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" />}
//               </IconButton>
//             </Box>
//           </Paper>
//         </Container>
//       </Box>
//     </Box>
//   );
// }
// import React, { useState } from 'react';
// import {
//   Box,
//   TextField,
//   Button,
//   Grid,
//   Paper,
//   Container,
// } from '@mui/material';
// import { AgCharts } from 'ag-charts-react';

// const getData = () => [
//   { quarter: 'Q1 2023', iphone: 50, mac: 20, ipad: 15, wearables: 10, services: 25 },
//   { quarter: 'Q2 2023', iphone: 60, mac: 25, ipad: 20, wearables: 12, services: 30 },
//   { quarter: 'Q3 2023', iphone: 55, mac: 22, ipad: 18, wearables: 15, services: 28 },
//   { quarter: 'Q4 2023', iphone: 65, mac: 27, ipad: 22, wearables: 18, services: 35 },
// ];

// export default function GoogleTrendStyleOverlay() {
//   const [options] = useState({
//     title: {
//       text: "Apple's Revenue by Product Category",
//     },
//     subtitle: {
//       text: 'In Billion U.S. Dollars',
//     },
//     data: getData(),
//     series: [
//       { type: 'bar', xKey: 'quarter', yKey: 'iphone', yName: 'iPhone' },
//       { type: 'bar', xKey: 'quarter', yKey: 'mac', yName: 'Mac' },
//       { type: 'bar', xKey: 'quarter', yKey: 'ipad', yName: 'iPad' },
//       { type: 'bar', xKey: 'quarter', yKey: 'wearables', yName: 'Wearables' },
//       { type: 'bar', xKey: 'quarter', yKey: 'services', yName: 'Services' },
//     ],
//   });

//   return (
//     <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
//       <Container maxWidth="md">
//         <Box sx={{ position: 'relative', height: 400 }}>
//           {/* 차트 */}
//           <Paper sx={{ height: '100%', p: 2 }}>
//             <AgCharts options={options} />
//           </Paper>

//           {/* 검색바 오버레이 */}
//           <Box
//             sx={{
//               position: 'absolute',
//               top: 20,
//               left: 20,
//               right: 20,
//               backgroundColor: 'white',
//               borderRadius: 2,
//               boxShadow: 3,
//               p: 2,
//             }}
//           >
//             <Grid container spacing={2}>
//               <Grid item xs={9}>
//                 <TextField fullWidth variant="outlined" placeholder="Search a topic..." />
//               </Grid>
//               <Grid item xs={3}>
//                 <Button variant="contained" fullWidth>
//                   Search
//                 </Button>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </Container>
//     </Box>
//   );
// }

// import * as React from "react";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid2";
// import Divider from "@mui/material/Divider";
// import { Typography } from "@mui/material";
// import SearchBar from "./SearchBar";
// import Menubar from "../Menubar";
// import MenubarUnder from "../MenubarUnder";
// import Footer from "../Footer";

// export default function Home_F() {
//   return (
//     <>
//       <Menubar />
//       <Box sx={{ flexGrow: 1 }}>
//         <Grid
//           container
//           spacing={{ xs: 2, md: 3 }}
//           columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
//           justifyContent="center"
//           alignItems="center"
//           sx={{ mt: "56px" }}
//         >
//           <Grid item xs={12} sm={8} md={8} lg={12}>
//             <Grid
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 flexDirection: "column",
//                 height: "100%",
//                 width: "100%",
//               }}
//             >
//               <Box
//                 sx={{
//                   width: "100vw",
//                   // backgroundColor: "#F9F9F9",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   padding: "20px 0",
//                 }}
//               >
//                 {/* Titles */}
//                 <Grid
//                   container
//                   spacing={2}
//                   direction="column"
//                   alignItems="center"
//                 >
//                   <Grid item>
//                     <Typography
//                       sx={{
//                         fontSize: "24px",
//                         fontFamily: "Noto Sans KR",
//                         textAlign: "center",
//                         lineHeight: "28.8px",
//                         fontWeight: 700,
//                       }}
//                     >
//                       mCODE STU4
//                     </Typography>
//                   </Grid>
//                   {/* <Grid item>
//                     <Typography>
//                       Click a block to see the corresponding profile definition
//                     </Typography>
//                   </Grid> */}
//                 </Grid>

//                 {/* SearchBar */}
//                 <Box
//                   sx={{
//                     borderRadius: "30px",
//                     height: "50px",
//                     mt: 2,
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: "30px",
//                       height: "50px",
//                       paddingRight: "8px",
//                       border: "0.1px solid black",
//                       "& input": {
//                         height: "57px",
//                         padding: "0 14px",
//                       },
//                     },
//                   }}
//                 >
//                   <SearchBar />
//                 </Box>
//               </Box>
//             </Grid>

//             {/* mCODE Diagram */}
//             <Grid
//               item
//               xs={12}
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 height: "100%",
//                 mt: 2,
//               }}
//             >
//               <Box
//                 sx={{
//                   width: "100%",
//                   maxWidth: "1097px",
//                   // overflowX: "auto", // ✅ 가로 스크롤 추가
//                   overflowY: "hidden", // ✅ 세로 스크롤 방지 (선택 사항)
//                   whiteSpace: "nowrap", // ✅ 줄바꿈 방지
//                   mb: 10,
//                 }}
//               >
//                 <object
//                   data="static/Images/mCodeDiagram.drawio.svg"
//                   type="image/svg+xml"
//                   style={{
//                     minWidth: "1097px", // ✅ 최소 너비 고정 (xs에서도 크기 유지)
//                     height: "auto",
//                   }}
//                 ></object>
//               </Box>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Box>
//       <MenubarUnder />
//       <Footer />
//     </>
//   );
// }
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import Menubar from "../../Menubar";
import MenubarUnder from "../../MenubarUnder";
import Footer from "../../Footer";

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
