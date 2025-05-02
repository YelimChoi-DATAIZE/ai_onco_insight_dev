import React, { useMemo, useState, useCallback, useEffect } from "react";
import Menubar from "../../Menubar";
import SearchBar from "../SearchBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid2";
import MenubarUnder from "../../MenubarUnder";
import Footer from "../../Footer";
import SearchingOverlay from "./SearchingOverlay";
import sfilteredData from "./example.json";

import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import CategoryImgRender from "./CategoryImgRender.js";
import CircleIcon from "@mui/icons-material/Circle";
import { useTheme, useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";

ModuleRegistry.registerModules([AllCommunityModule]);

const SearchResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(sfilteredData);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
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

  const defaultColDef = {
    resizable: true,
    editable: true,
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

  const columnDefs = useMemo(
    () => [
      {
        headerName: "#",
        width: 70,
        valueFormatter: (params) => `${parseInt(params.node.id) + 1}`,
      },
      {
        headerName: "Category",
        field: "icon",
        cellRenderer: CategoryImgRender,
        minWidth: 120,
        maxWidth: 120,
      },
      {
        headerName: "Profile name",
        field: "Profile name",
        sortable: true,
        filter: true,
        minWidth: 350,
        maxWidth: 350,
      },
      { field: "VS name", headerName: "VS name", sortable: true, filter: true },
      { field: "Code", headerName: "Code", sortable: true, filter: true },
      {
        field: "System",
        headerName: "System",
        sortable: true,
        filter: true,
        minWidth: 400,
        maxWidth: 400,
      },
      {
        field: "Display",
        headerName: "Display",
        sortable: true,
        filter: true,
        minWidth: 600,
        maxWidth: 1000,
      },
    ],
    [],
  );

  //   useEffect(() => {
  //     if (query) {
  //       const filtered = sfilteredData.filter((item) =>
  //         item.Display.toLowerCase().includes(query.toLowerCase())
  //       );
  //       setFilteredData(filtered);
  //     } else {
  //       setFilteredData(sfilteredData);
  //     }
  //   }, [query]);

  useEffect(() => {
    if (query) {
      const filtered = sfilteredData.filter(
        (item) =>
          (typeof item["Profile name"] === "string" &&
            item["Profile name"].toLowerCase().includes(query.toLowerCase())) ||
          (typeof item["VS name"] === "string" &&
            item["VS name"].toLowerCase().includes(query.toLowerCase())) ||
          (typeof item["Code"] === "string" &&
            item["Code"].toLowerCase().includes(query.toLowerCase())) ||
          (typeof item["System"] === "string" &&
            item["System"].toLowerCase().includes(query.toLowerCase())) ||
          (typeof item["Display"] === "string" &&
            item["Display"].toLowerCase().includes(query.toLowerCase())),
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(sfilteredData);
    }
  }, [query]);

  return (
    <>
      <Menubar />
      <Box sx={{ backgroundColor: "#F9F9F9" }}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={8} md={8} lg={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "20px 0",
              }}
            >
              <SearchBar />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Divider />

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
          spacing={isXs ? 2 : 0} // xs일 때 간격 추가
        >
          {/* First Button: Current/Total Keyword Count */}
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            lg={4}
            sx={{
              height: "49px",
              "--Grid-borderWidth": "1px",
              borderLeft: "var(--Grid-borderWidth) solid",
              borderColor: "divider",
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
                width: "300px",
              }}
            >
              <Typography sx={{ fontSize: "14px", mx: 2 }}>
                Page {currentPage} of {totalPages}
              </Typography>
            </Box>
          </Grid>

          {/* Second Button: Page Size control */}
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
                borderRight: "var(--Grid-borderWidth) solid",
                borderColor: "divider",
              },
            }}
          >
            <Box
              sx={{
                width: "300px",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ fontSize: "14px", mx: 2 }}>
                PAGE SIZE
              </Typography>
              <Select
                value={pageSize}
                onChange={handlePageSizeChange}
                sx={{ ml: 2, height: "36px", fontSize: "14px" }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={700}>700</MenuItem>
                <MenuItem value={1000}>1000</MenuItem>
              </Select>
            </Box>
          </Grid>

          {/* Third Button: Before/Next Page control */}
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
                width: "500px",
              }}
            >
              <Button onClick={handleFirstPage} disabled={currentPage === 1}>
                First
              </Button>
              <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                Prev
              </Button>
              <Typography sx={{ fontSize: "14px", mx: 2 }}>
                Page {currentPage} of {totalPages}
              </Typography>
              <Button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
              <Button
                onClick={handleLastPage}
                disabled={currentPage === totalPages}
              >
                Last
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ marginBottom: 1 }} />

      {/* Category Count Result */}
      <Grid
        container
        justifyContent={isXs ? "flex-end" : "center"}
        alignItems="center"
        mr={{ xs: 8 }}
      >
        <Grid
          item
          xs={12}
          sm={4}
          md={4}
          lg={4}
          sx={{
            height: "49px",
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: isXs ? "flex-end" : "center", // xs일 때 좌측 정렬
              width: "200px",
            }}
          >
            <Typography sx={{ fontSize: "12px", mx: 2 }}>
              Disease Group
            </Typography>
            {/* Count*/}
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <CircleIcon sx={{ fontSize: 40, color: "#EDB369" }} />
              <Typography
                variant="caption"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {groupCount.disease}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          md={4}
          lg={4}
          sx={{
            height: "49px",
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: isXs ? "flex-end" : "center", // xs일 때 좌측 정렬
              width: "200px",
            }}
          >
            <Typography sx={{ fontSize: "12px", mx: 2 }}>
              Treatment Group
            </Typography>
            {/* Count*/}
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <CircleIcon sx={{ fontSize: 40, color: "#E9E600" }} />
              <Typography
                variant="caption"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {groupCount.treatment}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          md={4}
          lg={4}
          sx={{
            height: "49px",
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: isXs ? "flex-end" : "center", // xs일 때 좌측 정렬
              width: "200px",
            }}
          >
            <Typography sx={{ fontSize: "12px", mx: 2 }}>
              Outcome Group
            </Typography>
            {/* Count*/}
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <CircleIcon sx={{ fontSize: 40, color: "#E69CFF" }} />
              <Typography
                variant="caption"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {groupCount.outcome}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          md={4}
          lg={4}
          sx={{
            height: "49px",
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: isXs ? "flex-end" : "center", // xs일 때 좌측 정렬
              width: "200px",
            }}
          >
            <Typography sx={{ fontSize: "12px", mx: 2 }}>
              Patient Group
            </Typography>
            {/* Count*/}
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <CircleIcon sx={{ fontSize: 40, color: "#92DAD8" }} />
              <Typography
                variant="caption"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {groupCount.patient}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          md={4}
          lg={4}
          sx={{
            height: "49px",
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: isXs ? "flex-end" : "center", // xs일 때 좌측 정렬
              width: "200px",
            }}
          >
            <Typography sx={{ fontSize: "12px", mx: 2 }}>
              Genomics Group
            </Typography>
            {/* Count*/}
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <CircleIcon sx={{ fontSize: 40, color: "#AAD190" }} />
              <Typography
                variant="caption"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {groupCount.genomics}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: isXs ? "flex-end" : "center", // xs일 때 좌측 정렬
              width: "200px",
            }}
          >
            <Typography sx={{ fontSize: "12px", mx: 2 }}>
              Assessment Group
            </Typography>

            {/* Count */}
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <CircleIcon sx={{ fontSize: 40, color: "#94B0FF" }} />
              <Typography
                variant="caption"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {groupCount.assessment}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {isLoading ? (
        <SearchingOverlay isLoading={isLoading} />
      ) : filteredData.length > 0 ? (
        <Box sx={{ p: 2 }}>
          <div
            className="ag-theme-alpine"
            style={{ height: "1093px", width: "100%" }}
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
      <MenubarUnder />
      <Footer />
    </>
  );
};

export default SearchResult;
