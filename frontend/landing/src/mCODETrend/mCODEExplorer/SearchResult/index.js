import React, { useMemo, useState, useEffect, useCallback } from "react";
import Menubar from "../../../Menubar";
import SearchBar from "../SearchBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import {} from // AllCommunityModule,
// ModuleRegistry,
// themeQuartz,
"ag-grid-community";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import "./style.css";
import CategoryImgRender from "./CategoryImgRender.js";
import CircularProgress from "@mui/material/CircularProgress";
import CircleIcon from "@mui/icons-material/Circle";
import Grid from "@mui/material/Grid2";
import MenubarUnder from "../../../MenubarUnder";
import Footer from "../../../Footer";
import SearchingOverlay from "./SearchingOverlay";

import LastPageIcon from "@mui/icons-material/LastPage";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import CTGList from "../CTGList";

const SearchResult = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const query = new URLSearchParams(location.search).get("query");
  const [filteredData, setFilteredData] = useState([]);
  const [groupCount, setGroupCount] = useState({
    genomics: 0,
    outcome: 0,
    treatment: 0,
    disease: 0,
    patient: 0,
    assessment: 0,
  });
  const [gridApi, setGridApi] = useState(null);
  const [pageSize, setPageSize] = useState(700);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/mcodekg", {
          params: { search: query },
        });

        // if (response.data.success) {
        //   setFilteredData(response.data.data);
        //   setGroupCount((prevState) => ({
        //     genomics: response.data.profileCounts.genomics ?? 0,
        //     treatment: response.data.profileCounts.treatment ?? 0,
        //     disease: response.data.profileCounts.disease ?? 0,
        //     outcome: response.data.profileCounts.outcome ?? 0,
        //     assessment: response.data.profileCounts.assessment ?? 0,
        //     patient: response.data.profileCounts.patient ?? 0,
        //   }));
        // }
        if (response.data.success) {
          setFilteredData(response.data.data);
          setTotalResults(response.data.total);
          setGroupCount((prevState) => ({
            genomics: response.data.profileCounts.genomics ?? 0,
            treatment: response.data.profileCounts.treatment ?? 0,
            disease: response.data.profileCounts.disease ?? 0,
            outcome: response.data.profileCounts.outcome ?? 0,
            assessment: response.data.profileCounts.assessment ?? 0,
            patient: response.data.profileCounts.patient ?? 0,
          }));
        }
      } catch (error) {
        console.error("데이터 불러오기 오류:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const shownCount = Math.min(currentPage * pageSize, totalResults);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Category",
        field: "icon",
        cellRenderer: CategoryImgRender,
        cellClass: "logoCell",
        minWidth: 120,
        maxWidth: 120,
      },
      {
        headerName: "Profile name",
        field: "ProfileName",
        sortable: true,
        filter: true,
        minWidth: 350,
        maxWidth: 350,
      },
      {
        field: "Display",
        headerName: "Display",
        sortable: true,
        filter: true,
        minWidth: 700,
        maxWidth: 1000,
        cellRenderer: (params) => {
          const displayValue = params.value;
          return (
            <Link
              to={`/ctg-list?query=${encodeURIComponent(displayValue)}`}
              style={{ textDecoration: "none", color: "#1a0dab" }}
            >
              {displayValue}
            </Link>
          );
        },
      },
      {
        field: "System",
        headerName: "System",
        sortable: true,
        filter: true,
        minWidth: 480,
        maxWidth: 500,
      },
      {
        field: "Code",
        headerName: "Code",
        sortable: true,
        filter: true,
      },
    ],
    [],
  );

  const defaultColDef = {
    resizable: true,
    editable: false,
  };

  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
    params.api.setGridOption("pagination", true);
    params.api.setGridOption("paginationPageSize", pageSize);
    updatePaginationInfo(params.api);
  }, []);

  const updatePaginationInfo = (api) => {
    setCurrentPage(api.paginationGetCurrentPage() + 1);
    setTotalPages(api.paginationGetTotalPages());
  };

  const handleFirstPage = () => {
    if (gridApi) {
      gridApi.paginationGoToFirstPage();
      updatePaginationInfo(gridApi);
    }
  };

  const handlePrevPage = () => {
    if (gridApi) {
      gridApi.paginationGoToPreviousPage();
      updatePaginationInfo(gridApi);
    }
  };

  const handleNextPage = () => {
    if (gridApi) {
      gridApi.paginationGoToNextPage();
      updatePaginationInfo(gridApi);
    }
  };

  const handleLastPage = () => {
    if (gridApi) {
      gridApi.paginationGoToLastPage();
      updatePaginationInfo(gridApi);
    }
  };

  const handlePageSizeChange = (event) => {
    const newSize = event.target.value;
    setPageSize(newSize);
    if (gridApi) {
      gridApi.setGridOption("paginationPageSize", newSize);
      updatePaginationInfo(gridApi);
    }
  };

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // xs일 때 true

  return (
    <>
      {/* Menu Bar */}
      <Menubar />

      {/* Search Bar */}
      <Box sx={{ backgroundColor: "#F9F9F9", height: "86px" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
          justifyContent="center"
          alignItems="center"
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
                  width: "100%",
                  // backgroundColor: "#F9F9F9",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* SearchBar */}
                <Box
                  sx={{
                    borderRadius: "30px",
                    height: "50px",
                    mt: "20px",
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
          </Grid>
        </Grid>
      </Box>
      <Divider />

      {/* Pagination Button */}
      <Box
        sx={{
          pl: { lg: 30, xs: 0 },
          pr: { lg: 30, xs: 0 },
          minHeight: "49px",
          backgroundColor: "#F9F9F9",
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction={isXs ? "column" : "row"} // xs일 때 세로 배치
          spacing={0} // xs일 때 간격 추가
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={0}
          >
            {/* First Button: Current/Total Keyword Count */}
            <Grid
              item
              xs={6}
              sm={4}
              md={4}
              lg={4}
              sx={{
                height: "49px",
                "--Grid-borderWidth": "1px",
                borderLeft: { sm: "var(--Grid-borderWidth) solid", xs: "none" },
                borderColor: { sm: "divider", xs: "none" },
                "& > div": {
                  borderRight: "var(--Grid-borderWidth) solid",
                  borderColor: "divider",
                },
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: { sm: "130px", xs: "100%" },
                }}
              >
                <Typography sx={{ fontSize: "12px", mx: 2 }}>
                  {Math.min((currentPage - 1) * pageSize, totalResults)} to{" "}
                  {Math.min(currentPage * pageSize, totalResults)} of{" "}
                  {totalResults}
                </Typography>
              </Box>
            </Grid>

            {/* Second Button: Page Size control */}
            <Grid
              item
              xs={6}
              sm={4}
              md={4}
              lg={4}
              sx={{
                height: "49px",
                "--Grid-borderWidth": "1px",
                "& > div": {
                  borderRight: {
                    sm: "var(--Grid-borderWidth) solid",
                    xs: "none",
                  },
                  borderColor: { sm: "divider", xs: "none" },
                },
              }}
            >
              <Box
                sx={{
                  width: { sm: "200px", xs: "100%" },
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ fontSize: "12px", mx: 2 }}>
                  PAGE SIZE
                </Typography>
                <Select
                  value={pageSize}
                  onChange={handlePageSizeChange}
                  sx={{ ml: 1, height: "36px", fontSize: "12px" }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={700}>700</MenuItem>
                  <MenuItem value={1000}>1000</MenuItem>
                </Select>
              </Box>
            </Grid>
          </Grid>

          {/* Divider: 반응형일 때만 보이도록 설정 */}
          {isXs && (
            <Grid item xs={12} sx={{ display: { xs: "block", sm: "none" } }}>
              <Divider sx={{ my: 1, backgroundColor: "divider" }} />
            </Grid>
          )}

          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            lg={4}
            sx={{
              height: "49px",
              "--Grid-borderWidth": "1px",
              "& > div": {
                borderRight: {
                  sm: "var(--Grid-borderWidth) solid",
                  xs: "none",
                },
                borderColor: { sm: "divider", xs: "none" },
              },
            }}
          >
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: { sm: "253px" },
                gap: "4px",
              }}
            >
              <Button
                onClick={handleFirstPage}
                disabled={currentPage === 1}
                sx={{ minWidth: 30, padding: "4px" }}
              >
                <FirstPageIcon />
              </Button>
              <Button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                sx={{ minWidth: 30, padding: "4px" }}
              >
                <KeyboardArrowLeftIcon />
              </Button>
              <Typography sx={{ fontSize: "12px", mx: 1 }}>
                Page {currentPage} of {totalPages}
              </Typography>
              <Button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                sx={{ minWidth: 30, padding: "4px" }}
              >
                <KeyboardArrowRightIcon />
              </Button>
              <Button
                onClick={handleLastPage}
                disabled={currentPage === totalPages}
                sx={{ minWidth: 30, padding: "4px" }}
              >
                <LastPageIcon />
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ marginBottom: 1 }} />

      {/* Category Count Result */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        mt={{ xs: "30px", sm: "40px" }}
        spacing={2}
      >
        {[
          {
            label: "Disease Group",
            color: "#EDB369",
            count: groupCount.disease,
          },
          {
            label: "Treatment Group",
            color: "#E9E600",
            count: groupCount.treatment,
          },
          {
            label: "Outcome Group",
            color: "#E69CFF",
            count: groupCount.outcome,
          },
          {
            label: "Patient Group",
            color: "#92DAD8",
            count: groupCount.patient,
          },
          {
            label: "Genomics Group",
            color: "#AAD190",
            count: groupCount.genomics,
          },
          {
            label: "Assessment Group",
            color: "#94B0FF",
            count: groupCount.assessment,
          },
        ].map((group, index) => (
          <Grid item xs={4} sm={6} md={4} lg={4} key={index}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: isXs ? "column" : "row",
                width: { sm: "180px", xs: "120px" },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Noto Sans KR",
                  fontSize: "12px",
                  textAlign: "center",
                  mb: "12px",
                }}
              >
                {group.label}
              </Typography>
              {/* Count */}
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <CircleIcon
                  sx={{
                    width: "50px",
                    height: "50px",
                    fontSize: "50px",
                    color: group.color,
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {group.count}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {isLoading ? (
        // <CircularProgress color="primary" />
        <SearchingOverlay isLoading={isLoading} />
      ) : filteredData.length > 0 ? (
        <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
          <div
            className="ag-theme-alpine"
            style={{ height: "393px", width: "100%" }}
          >
            <AgGridReact
              rowData={filteredData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              onGridReady={onGridReady}
              pagination={true}
              paginationPageSize={pageSize}
            />
          </div>
        </Box>
      ) : (
        <p>No results found.</p>
      )}
      {/* <CTGList /> */}
      <MenubarUnder />
      <Footer />
    </>
  );
};

export default SearchResult;
