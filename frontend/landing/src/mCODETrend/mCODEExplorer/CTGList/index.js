// import React, { useState, useEffect } from "react";
// import {
//   TextField,
//   Button,
//   Card,
//   CardContent,
//   Typography,
//   Container,
//   Grid,
//   CircularProgress,
// } from "@mui/material";
// import { Link, useLocation } from "react-router-dom";

// import Menubar from "../../Menubar";
// import MenubarUnder from "../../MenubarUnder";
// import Footer from "../../Footer";
// import ChatBox from "../CTGList/ChatBox";
// import Map from "../CTGList/component/Map";

// const ClinicalTrialsSearch = () => {
//   const [trials, setTrials] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [nextPageToken, setNextPageToken] = useState(null);
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const queryParam = params.get("query");
//   const [searchTerm, setSearchTerm] = useState(queryParam || "breast cancer");

//   useEffect(() => {
//     if (queryParam) {
//       fetchTrials();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [queryParam]);

//   const fetchTrials = async (pageToken = null) => {
//     setLoading(true);
//     try {
//       const baseUrl = "https://clinicaltrials.gov/api/v2/studies";
//       const params = new URLSearchParams({
//         "query.cond": searchTerm,
//         format: "json",
//         pageSize: "10",
//       });

//       if (pageToken) {
//         params.append("pageToken", pageToken);
//       }

//       const response = await fetch(`${baseUrl}?${params.toString()}`);
//       const data = await response.json();
//       const studies = data.studies.map((study) => {
//         const nctId = study.protocolSection?.identificationModule?.nctId;
//         const briefTitle =
//           study.protocolSection?.identificationModule?.briefTitle;
//         const overallStatus =
//           study.protocolSection?.statusModule?.overallStatus;
//         const hasResults = study.hasResults;

//         const locations =
//           study.protocolSection?.contactsLocationsModule?.locations?.map(
//             (loc) => ({
//               facility: loc?.facility || null,
//               city: loc?.city || null,
//               state: loc?.state || null,
//               zip: loc?.zip || null,
//               country: loc?.country || null,
//               geoPoint: loc?.geoPoint || null,
//             }),
//           ) || [];

//         return {
//           nctId,
//           briefTitle,
//           overallStatus,
//           hasResults,
//           locations,
//         };
//       });

//       setTrials(pageToken ? [...trials, ...studies] : studies);
//       setNextPageToken(data.nextPageToken || null);
//     } catch (error) {
//       console.error("데이터 가져오기 실패:", error);
//     }
//     setLoading(false);
//   };

//   return (
//     <>
//       <Menubar />
//       <Map />
//       <Container maxWidth="1920px" sx={{ mt: 4, display: "flex" }}>
//         <Container>
//           <Typography
//             sx={{
//               fontSize: "21px",
//               fontFamily: "IBM Plex Sans KR",
//               textAlign: "flex-start",
//               lineHeight: "63px",
//               fontWeight: "bold",
//             }}
//           >
//             Clinical Trials Search results
//           </Typography>

//           <Grid container spacing={2}>
//             <Grid item xs={10}>
//               <TextField
//                 fullWidth
//                 label="Search Condition"
//                 variant="outlined"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 sx={{ height: "50px" }}
//               />
//             </Grid>
//             <Grid item xs={2}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 onClick={() => fetchTrials()}
//                 sx={{ height: "55px" }}
//               >
//                 Search
//               </Button>
//             </Grid>
//           </Grid>

//           {loading ? (
//             <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
//           ) : (
//             <Grid container spacing={2} sx={{ mt: 3 }}>
//               {trials.map((trial, index) => (
//                 <Grid item xs={12} key={index}>
//                   <Card variant="outlined">
//                     <CardContent>
//                       <Typography variant="h6">
//                         <Link
//                           to={`/trial/${trial.nctId}`}
//                           style={{ textDecoration: "none", color: "blue" }}
//                         >
//                           {trial.briefTitle}
//                         </Link>
//                       </Typography>
//                       <Typography color="textSecondary">
//                         NCT ID: {trial.locations.facility}
//                       </Typography>
//                       <Typography>Status: {trial.overallStatus}</Typography>
//                       <Typography>
//                         Results Available:{" "}
//                         {trial.hasResults ? "✅ Yes" : "❌ No"}
//                       </Typography>
//                       {Array.isArray(trial.locations) &&
//                         trial.locations.length > 0 && (
//                           <div style={{ marginTop: "15px" }}>
//                             <Typography sx={{ fontWeight: "bold", mb: 1 }}>
//                               Locations ({trial.locations.length} sites):
//                             </Typography>
//                             <Grid container spacing={1}>
//                               {trial.locations.map((loc, i) => (
//                                 <Grid item xs={12} md={6} key={i}>
//                                   <Card
//                                     variant="outlined"
//                                     sx={{ p: 2, backgroundColor: "#f9f9f9" }}
//                                   >
//                                     <Typography
//                                       variant="subtitle1"
//                                       sx={{ fontWeight: "bold" }}
//                                     >
//                                       {loc.facility || "Unknown Facility"}
//                                     </Typography>
//                                     <Typography variant="body2">
//                                       {loc.city || "Unknown City"}
//                                       {loc.state ? `, ${loc.state}` : ""}
//                                       {loc.zip ? ` ${loc.zip}` : ""}
//                                     </Typography>
//                                     <Typography variant="body2">
//                                       🌍 {loc.country || "Unknown Country"}
//                                     </Typography>
//                                     {loc.geoPoint && (
//                                       <Typography
//                                         variant="body2"
//                                         sx={{ color: "#666" }}
//                                       >
//                                         📍 Lat: {loc.geoPoint.lat}, Lng:{" "}
//                                         {loc.geoPoint.lon}
//                                       </Typography>
//                                     )}
//                                   </Card>
//                                 </Grid>
//                               ))}
//                             </Grid>
//                           </div>
//                         )}
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           )}
//           {nextPageToken && (
//             <Button
//               variant="contained"
//               color="secondary"
//               fullWidth
//               sx={{ mt: 3 }}
//               onClick={() => fetchTrials(nextPageToken)}
//             >
//               Load More
//             </Button>
//           )}
//         </Container>
//         <ChatBox />
//       </Container>

//       <MenubarUnder />
//       <Footer />
//     </>
//   );
// };

// export default ClinicalTrialsSearch;
import React, { useState, useEffect } from "react";
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  CircularProgress,
  IconButton,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useLocation } from "react-router-dom";
import ChatBox from "../CTGList/ChatBox";
import Menubar from "../../../Menubar";
import MenubarUnder from "../../../MenubarUnder";
import Footer from "../../../Footer";

const ClinicalTrialsSearch = () => {
  const [trials, setTrials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [selectedTrial, setSelectedTrial] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const queryParam = params.get("query");
  const [searchTerm, setSearchTerm] = useState(queryParam || "breast cancer");

  useEffect(() => {
    if (queryParam) fetchTrials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParam]);

  const fetchTrials = async (pageToken = null) => {
    setLoading(true);
    try {
      const baseUrl = "https://clinicaltrials.gov/api/v2/studies";
      const params = new URLSearchParams({
        "query.cond": searchTerm,
        format: "json",
        pageSize: "12",
      });

      if (pageToken) {
        params.append("pageToken", pageToken);
      }

      const response = await fetch(`${baseUrl}?${params.toString()}`);
      const data = await response.json();
      const studies = data.studies.map((study) => {
        const nctId = study.protocolSection?.identificationModule?.nctId;
        const briefTitle =
          study.protocolSection?.identificationModule?.briefTitle;
        const overallStatus =
          study.protocolSection?.statusModule?.overallStatus;
        const hasResults = study.hasResults;
        const locations =
          study.protocolSection?.contactsLocationsModule?.locations?.map(
            (loc) => ({
              facility: loc?.facility || null,
              city: loc?.city || null,
              state: loc?.state || null,
              zip: loc?.zip || null,
              country: loc?.country || null,
              geoPoint: loc?.geoPoint || null,
            }),
          ) || [];

        return { nctId, briefTitle, overallStatus, hasResults, locations };
      });

      setTrials(pageToken ? [...trials, ...studies] : studies);
      setNextPageToken(data.nextPageToken || null);
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <Menubar />
      <Container maxWidth="xl" sx={{ display: "flex", gap: 2, mt: 4 }}>
        {/* 왼쪽: 검색 결과 영역 */}
        <Container sx={{ width: "90%" }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ mb: 2 }}
          >
            <Grid item xs={10}>
              <TextField
                fullWidth
                placeholder="keyword"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton
                color="primary"
                onClick={() => fetchTrials()}
                sx={{ border: "1px solid #ccc", height: "56px", width: "56px" }}
              >
                <SearchIcon />
              </IconButton>
            </Grid>
          </Grid>

          {loading ? (
            <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
          ) : (
            <Grid container spacing={2}>
              {trials.map((trial, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    variant="outlined"
                    sx={{
                      height: "100%",
                      cursor: "pointer",
                      border:
                        selectedTrial?.nctId === trial.nctId
                          ? "2px solid #1976d2"
                          : "1px solid #ccc",
                    }}
                    onClick={() => setSelectedTrial(trial)}
                  >
                    <CardContent>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold", mb: 1, color: "#555" }}
                      >
                        {trial.nctId}
                      </Typography>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {trial.briefTitle}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {/* Condition: Breast Tumor */}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Location: {trial.locations?.[0]?.city},{" "}
                        {trial.locations?.[0]?.country}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {nextPageToken && (
            <Pagination
              count={10} // <- 실제 total page 수에 따라 조정 가능
              page={1}
              onChange={() => fetchTrials(nextPageToken)}
              sx={{ display: "flex", justifyContent: "center", mt: 4 }}
            />
          )}
        </Container>
        {/* 우측 하단 고정 챗봇 */}
        <div style={{ position: "fixed", bottom: 20, right: 20 }}>
          <ChatBox />
        </div>
      </Container>

      <MenubarUnder />
      <Footer />
    </>
  );
};

export default ClinicalTrialsSearch;
