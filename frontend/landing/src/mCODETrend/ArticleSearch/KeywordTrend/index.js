// import React, { useState, useEffect } from "react";
// import { Box, Button, Paper, Typography, Divider } from "@mui/material";
// import KeywordReport from "./component/KeywordReport";

// const KeywordTrend = () => {
//   const [overlayVisible, setOverlayVisible] = useState(true);
//   const [dataLoaded, setDataLoaded] = useState(false);

//   const handleViewClick = () => {
//     setOverlayVisible(false);
//     // setDataLoaded(true);
//   };

//   useEffect(() => {
//     setDataLoaded(true);
//   }, []);

//   return (
//     <Paper
//       elevation={0}
//       sx={{ height: "90vh", position: "relative", overflowY: "auto" }}
//     >
//       {overlayVisible && (
//         <Box
//           sx={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(255, 255, 255, 0.8)",
//             zIndex: 10,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             backdropFilter: "blur(2px)",
//           }}
//         >
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleViewClick}
//             sx={{
//               fontSize: "1.2rem",
//               padding: "12px 30px",
//               mt: "-100px",
//               fontSize: "12px",
//               backgroundColor: "#4361ee",
//               "&:hover": { backgroundColor: "#3a53d6" },
//               boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//               borderRadius: "8px",
//             }}
//           >
//             View Related Keywords
//           </Button>
//         </Box>
//       )}

//       {dataLoaded && <KeywordReport />}
//     </Paper>
//   );
// };

// export default KeywordTrend;

import React, { useState, useEffect } from "react";
import { Box, Button, Paper, Snackbar, Alert, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import KeywordReport from "./component/KeywordReport";

const KeywordTrend = () => {
  return (
    <Paper
      elevation={0}
      sx={{ height: "90vh", position: "relative", overflowY: "auto" }}
    >
      <KeywordReport />
    </Paper>
  );
};

export default KeywordTrend;
