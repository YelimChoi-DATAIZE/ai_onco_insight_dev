import { Box } from "@mui/material";

export default function LoadingOverlay({ isLoading }) {
  if (!isLoading) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#3CA7DFBA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 13000,
      }}
    >
      {/* 하얀 원 박스 */}
      <Box
        sx={{
          width: 120, // 원의 크기 조절
          height: 120,
          backgroundColor: "#FFFFFF", // 흰색 배경
          borderRadius: "50%", // 원형으로 만들기
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // 살짝 그림자 추가
        }}
      >
        {/* GIF 이미지 */}
        <img
          src="/static/Images/loading.gif"
          alt="Loading..."
          width={60} // GIF 크기 조절
          height={60}
        />
      </Box>
    </Box>
  );
}
