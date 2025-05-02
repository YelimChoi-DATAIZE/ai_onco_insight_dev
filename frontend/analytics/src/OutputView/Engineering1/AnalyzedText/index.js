import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import Entities from "./Entities";
import Rxnorm from "./Rxnorm";
import ICD from "./ICD10";
import SNOMED from "./Snomed";

// 각 탭에 대한 개별 화면 컴포넌트
const EntitiesScreen = ({ sentence, word1, word2, response }) => (
  <Entities sentence={sentence} word1={word1} word2={word2} />
);

const RxNormConceptsScreen = ({ response }) => <Rxnorm response={response} />;

const ICD10CMConceptsScreen = ({ sentence, word1, word2 }) => (
  <ICD sentence={sentence} word1={word1} word2={word2} />
);

const SNOMEDCTConceptsScreen = ({ sentence, word1, word2 }) => (
  <SNOMED sentence={sentence} word1={word1} word2={word2} />
);

const AnalyzedText = ({ sentence, word1, word2, response }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      sx={{
        width: "98%",
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "center",
        mt: "19px",
      }}
    >
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          // backgroundColor: "#f5f5f5",
          borderRadius: "8px 8px 0 0",
          width: "100%",
          "& .MuiTabs-flexContainer": {
            borderBottom: "none",
          },
          "& .MuiTab-root": {
            textTransform: "none",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px 8px 0 0",
            minHeight: "40px",
            fontSize: "14px",
            fontWeight: "500",
            color: "#777",
            // marginRight: "4px",
            border: "1px solid #ddd",
          },
          "& .Mui-selected": {
            backgroundColor: "white",
            // color: "black",
            // fontWeight: "bold",
            borderBottom: "none",
          },
          "& .MuiTabs-indicator": {
            display: "none",
          },
        }}
      >
        <Tab label="Entities" />
        <Tab label="RxNorm concepts" />
        <Tab label="ICD-10-CM concepts" />
        <Tab label="SNOMED CT concepts" />
      </Tabs>

      {/* 탭별 화면 렌더링 */}
      <Box sx={{ padding: 2, backgroundColor: "#ffffff", minHeight: "150px" }}>
        {activeTab === 0 && (
          <EntitiesScreen sentence={sentence} word1={word1} word2={word2} />
        )}
        {activeTab === 1 && <RxNormConceptsScreen response={response} />}
        {activeTab === 2 && (
          <ICD10CMConceptsScreen
            sentence={sentence}
            word1={word1}
            word2={word2}
          />
        )}
        {activeTab === 3 && (
          <SNOMEDCTConceptsScreen
            sentence={sentence}
            word1={word1}
            word2={word2}
          />
        )}
      </Box>
    </Box>
  );
};

export default AnalyzedText;
