// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Container, Typography, Card, CardContent, CircularProgress } from "@mui/material";
// import ChatBox from "../ChatBox"; // 🔹 채팅창 추가

// const TrialDetails = () => {
//   const { nctId } = useParams();
//   const [trial, setTrial] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchTrialDetails = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`https://clinicaltrials.gov/api/v2/studies/${nctId}?format=json`);
//         const data = await response.json();

//         setTrial({
//           nctId: data.protocolSection.identificationModule.nctId,
//           briefTitle: data.protocolSection.identificationModule.briefTitle,
//           overallStatus: data.protocolSection.statusModule.overallStatus,
//         });
//       } catch (error) {
//         console.error("Failed to fetch trial details:", error);
//       }
//       setLoading(false);
//     };

//     fetchTrialDetails();
//   }, [nctId]);

//   return (
//     <Container sx={{ display: "flex", mt: 4 }}>
//       <Container>
//         {loading ? <CircularProgress sx={{ display: "block", margin: "20px auto" }} /> : <Card variant="outlined"><CardContent><Typography variant="h5">{trial?.briefTitle}</Typography></CardContent></Card>}
//       </Container>

//       <ChatBox /> {/* 🔹 우측 채팅창 추가 */}
//     </Container>
//   );
// };

// export default TrialDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Divider,
  Box,
} from "@mui/material";
import ChatBox from "../ChatBox";

const TrialDetails = () => {
  const { nctId } = useParams();
  const [trial, setTrial] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrialDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://clinicaltrials.gov/api/v2/studies/${nctId}?format=json`,
        );
        const data = await response.json();

        setTrial({
          nctId: data.protocolSection.identificationModule.nctId,
          briefTitle: data.protocolSection.identificationModule.briefTitle,
          overallStatus: data.protocolSection.statusModule.overallStatus,
          startDate: data.protocolSection.statusModule.startDate || "N/A",
          primaryCompletionDate:
            data.protocolSection.statusModule.primaryCompletionDate || "N/A",
          detailedDescription:
            data.protocolSection.descriptionModule?.detailedDescription ||
            "No description available",
          eligibilityCriteria:
            data.protocolSection.eligibilityModule?.eligibilityCriteria ||
            "Not Available",
          enrollmentCount:
            data.protocolSection.designModule?.enrollmentInfo?.count ||
            "Unknown",
          phase: data.protocolSection.designModule?.phase || "N/A",
          studyType: data.protocolSection.designModule?.studyType || "N/A",
          conditions:
            data.protocolSection.conditionsModule?.conditions?.join(", ") ||
            "Not specified",
          contactName:
            data.protocolSection.contactsLocationsModule?.centralContacts?.[0]
              ?.name || "No contact info",
          contactPhone:
            data.protocolSection.contactsLocationsModule?.centralContacts?.[0]
              ?.phone || "N/A",
          sponsor:
            data.protocolSection.sponsorCollaboratorsModule?.leadSponsor
              ?.name || "Unknown",
        });
      } catch (error) {
        console.error("Failed to fetch trial details:", error);
      }
      setLoading(false);
    };

    fetchTrialDetails();
  }, [nctId]);

  return (
    <Container sx={{ display: "flex", mt: 4 }}>
      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      ) : trial ? (
        <Card variant="outlined" sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {trial.briefTitle}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            NCT ID: {trial.nctId}
          </Typography>
          <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
            Status: {trial.overallStatus}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="subtitle1">
                <strong>Start Date:</strong> {trial.startDate}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">
                <strong>Primary Completion Date:</strong>{" "}
                {trial.primaryCompletionDate}
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Typography variant="subtitle1">
                <strong>Phase:</strong> {trial.phase}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">
                <strong>Study Type:</strong> {trial.studyType}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" sx={{ mt: 2 }}>
            Description
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
            {trial.detailedDescription}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" sx={{ mt: 2 }}>
            Conditions
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {trial.conditions}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" sx={{ mt: 2 }}>
            Eligibility Criteria
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {trial.eligibilityCriteria}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" sx={{ mt: 2 }}>
            Enrollment Count
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {trial.enrollmentCount}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" sx={{ mt: 2 }}>
            Sponsor
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {trial.sponsor}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" sx={{ mt: 2 }}>
            Contact Information
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>Name:</strong> {trial.contactName}
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> {trial.contactPhone}
          </Typography>
        </Card>
      ) : (
        <Typography sx={{ textAlign: "center", mt: 4 }}>
          No details available.
        </Typography>
      )}

      <ChatBox />
    </Container>
  );
};

export default TrialDetails;
