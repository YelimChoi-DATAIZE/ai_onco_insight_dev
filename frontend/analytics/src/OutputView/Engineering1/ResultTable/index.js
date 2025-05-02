// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   Select,
//   MenuItem,
//   Pagination,
//   Box,
//   Typography,
// } from "@mui/material";

// const categoryColors = {
//   disease: "#EDB369",
//   treatment: "#E9E600",
//   outcome: "#E69CFF",
//   patient: "#92DAD8",
//   genomics: "#AAD190",
//   assessment: "#94B0FF",
// };

// const categoryMapping = {
//   TumorMarkerTest: "disease",
//   PrimaryCancerCondition: "disease",
//   CancerStage: "disease",
//   MedicationRequest: "treatment",
//   SurgicalProcedure: "treatment",
//   RadiotherapySummary: "treatment",
//   Tumor: "outcome",
// };

// const TableComponent = ({ response }) => {
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [category, setCategory] = useState("Any Category");
//   const [page, setPage] = useState(1);
//   const rowsPerPage = 10;

//   useEffect(() => {
//     if (response && response.length > 0) {
//       const transformedData = response.data.map((item) => ({
//         ...item,
//         category: categoryMapping[item.profile] || item.category,
//       }));
//       setData(transformedData);
//     }
//   }, [response]);

//   const filteredData = data.filter(
//     (row) =>
//       row.entity.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (category === "Any Category" || row.category === category)
//   );

//   const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, mb: 2 }}>
//         <TextField
//           variant="outlined"
//           placeholder="Search"
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{ width: "250px" }}
//         />
//         <Select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           displayEmpty
//           sx={{ width: "200px" }}
//         >
//           <MenuItem value="Any Category">Any Category</MenuItem>
//           {Object.keys(categoryColors).map((key) => (
//             <MenuItem key={key} value={key}>{key}</MenuItem>
//           ))}
//         </Select>
//         <Pagination
//           count={Math.ceil(filteredData.length / rowsPerPage)}
//           page={page}
//           onChange={(event, value) => setPage(value)}
//         />
//       </Box>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell><strong>Entity</strong></TableCell>
//               <TableCell><strong>Profile</strong></TableCell>
//               <TableCell><strong>Category</strong></TableCell>
//               <TableCell><strong>Relation</strong></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedData.map((row) => (
//               <TableRow key={row.id}>
//                 <TableCell sx={{ pl: row.indent ? 4 : 1 }}>{row.entity}</TableCell>
//                 <TableCell>
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <Box
//                       sx={{
//                         width: 8,
//                         height: 8,
//                         borderRadius: "50%",
//                         backgroundColor: categoryColors[row.category] || "gray",
//                         display: "inline-block",
//                         mr: 1,
//                       }}
//                     />
//                     {row.profile}
//                   </Box>
//                 </TableCell>
//                 <TableCell sx={{ backgroundColor: categoryColors[row.category] || "transparent" }}>
//                   {row.category}
//                 </TableCell>
//                 <TableCell>{row.traits}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default TableComponent;
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  Pagination,
  Box,
} from "@mui/material";

const categoryColors = {
  disease: "#EDB369",
  treatment: "#E9E600",
  outcome: "#E69CFF",
  patient: "#92DAD8",
  genomics: "#AAD190",
  assessment: "#94B0FF",
};

const categoryMapping = {
  TumorMarkerTest: "disease",
  PrimaryCancerCondition: "disease",
  CancerStage: "disease",
  MedicationRequest: "treatment",
  SurgicalProcedure: "treatment",
  RadiotherapySummary: "treatment",
  Tumor: "outcome",
};

const TableComponent = ({ response }) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("Any Category");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    console.log("Received response:", response);

    let dataArray = response;

    // response가 문자열(JSON string)인 경우 변환
    if (typeof response === "string") {
      try {
        dataArray = JSON.parse(response);
      } catch (error) {
        console.error("JSON parsing error:", error);
        setData([]); // JSON 변환 실패 시 빈 배열 설정
        return;
      }
    }

    // response가 객체 형태라면 .data를 사용하여 배열을 가져옴
    dataArray = dataArray?.data ? dataArray.data : dataArray;

    if (Array.isArray(dataArray)) {
      const transformedData = dataArray.map((item) => ({
        ...item,
        category: categoryMapping[item.profile] || item.category,
      }));
      setData(transformedData);
    } else {
      console.error("Error: response is not an array", response);
      setData([]); // 빈 배열 설정
    }
  }, [response]);

  // useEffect(() => {
  //   console.log("Received response:", response);
  //   if (Array.isArray(response)) {
  //     const transformedData = response.map((item) => ({
  //       ...item,
  //       category: categoryMapping[item.profile] || item.category,
  //     }));
  //     setData(transformedData);
  //   } else {
  //     console.error("Error: response is not an array", response);
  //     setData([]); // 빈 배열 설정
  //   }
  // }, [response]);

  const filteredData = data.filter(
    (row) =>
      row.entity?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === "Any Category" || row.category === category),
  );

  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", gap: 1, mb: 2 }}
      >
        <TextField
          variant="outlined"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: "250px" }}
        />
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          displayEmpty
          sx={{ width: "200px" }}
        >
          <MenuItem value="Any Category">Any Category</MenuItem>
          {Object.keys(categoryColors).map((key) => (
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          ))}
        </Select>
        <Pagination
          count={Math.ceil(filteredData.length / rowsPerPage)}
          page={page}
          onChange={(event, value) => setPage(value)}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Entity</strong>
              </TableCell>
              <TableCell>
                <strong>Profile</strong>
              </TableCell>
              <TableCell>
                <strong>Category</strong>
              </TableCell>
              <TableCell>
                <strong>Relation</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ pl: row.indent ? 4 : 1 }}>
                  {row.entity}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: categoryColors[row.category] || "gray",
                        display: "inline-block",
                        mr: 1,
                      }}
                    />
                    {row.profile}
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor:
                      categoryColors[row.category] || "transparent",
                  }}
                >
                  {row.category}
                </TableCell>
                <TableCell>{row.traits}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableComponent;
