import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Collapse,
} from "@mui/material";

const PDF2ZH = ({ onDownload }) => {
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("zh");
  const [open, setOpen] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setDownloadUrl(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("파일을 선택하세요.");
      return;
    }

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("source_lang", sourceLang);
    formData.append("target_lang", targetLang);

    try {
      const response = await axios.post(
        "http://3.38.200.207:8000/dataizeai_api/translate",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.download_url) {
        const downloadUrl = `http://3.38.200.207:8000/dataizeai_api${response.data.download_url}`;
        setDownloadUrl(downloadUrl);

        // ✅ 다운로드 URL을 상위 컴포넌트로 전달
        if (onDownload) {
          onDownload(downloadUrl);
        }
      } else if (response.data.error) {
        setError(response.data.error);
      }
    } catch (error) {
      console.error(error);
      setError("파일 업로드 및 번역 요청 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ mt: 0, bgcolor: "#fffff", p: 3, borderRadius: 2, color: "#1e1e1e" }}
    >
      <Typography variant="text" gutterBottom>
        File size under 5 MB
      </Typography>

      <Button component="label" fullWidth sx={{ mt: 2 }}>
        Click to Upload
        <input type="file" hidden onChange={handleFileChange} />
      </Button>

      <FormControl fullWidth margin="normal">
        <InputLabel>Service</InputLabel>
        <Select value="Google">
          <MenuItem value="Google" sx={{ fontsize: "15px" }}>
            Google
          </MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Translate From</InputLabel>
        <Select
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="zh">Chinese</MenuItem>
          <MenuItem value="fr">French</MenuItem>
          <MenuItem value="de">German</MenuItem>
          <MenuItem value="ja">Japanese</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Translate To</InputLabel>
        <Select
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
        >
          <MenuItem value="zh">Simplified Chinese</MenuItem>
          <MenuItem value="ko">Korean</MenuItem>
          <MenuItem value="en">English</MenuItem>
        </Select>
      </FormControl>

      <ToggleButtonGroup fullWidth exclusive sx={{ mt: 2 }}>
        <ToggleButton value="first">First</ToggleButton>
        <ToggleButton value="first20">First 20 pages</ToggleButton>
      </ToggleButtonGroup>

      <Button
        variant="text"
        onClick={() => setOpen(!open)}
        sx={{ mt: 2, mb: 2, color: "#4a90e2" }}
      >
        Open for More Experimental Options!
      </Button>

      <Collapse in={open}>More options go here...</Collapse>

      <Button
        onClick={handleUpload}
        disabled={loading}
        fullWidth
        sx={{ mt: 2, bgcolor: "#f5f5f5", color: "black" }}
      >
        {loading ? <CircularProgress size={24} /> : "Translate"}
      </Button>

      <Button
        variant="contained"
        onClick={() => setFile(null)}
        fullWidth
        sx={{ mt: 2, bgcolor: "#6c757d", color: "white" }}
      >
        Cancel
      </Button>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {downloadUrl && (
        <Button
          href={downloadUrl}
          variant="contained"
          sx={{ mt: 2, bgcolor: "#007bff", color: "white" }}
          download
        >
          Download
        </Button>
      )}
    </Container>
  );
};

export default PDF2ZH;
