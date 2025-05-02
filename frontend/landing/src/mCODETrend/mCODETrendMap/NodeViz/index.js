export default function CustomNode({ data }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "10px",
        boxSizing: "border-box",
        overflow: "auto",
        border: "2px solid #2196f3",
        borderRadius: 6,
        background: "#f0f8ff",
      }}
    >
      <strong>{data.label}</strong>
      {data.keywordInfo && (
        <div style={{ marginTop: 10 }}>
          {data.keywordInfo.map((kw, i) => (
            <div key={i} style={{ fontSize: 12, marginBottom: 4 }}>
              <span>{kw.name}</span>
              <div
                style={{
                  width: "100%",
                  height: 10,
                  background: "#BBDEFB",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${kw.percentage}%`,
                    height: "100%",
                    background: "#1976D2",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
// import React from "react";

// export default function CustomNode({ data }) {
//   return (
//     <div style={{ position: "relative", width: "100%", height: "100%" }}>
//       {/* 논문 수 표시: 노드 윗부분 */}
//       {data.paperCount !== undefined && (
//         <div
//           style={{
//             position: "absolute",
//             top: "-20px",
//             left: "50%",
//             marginBottom: "20px",
//             transform: "translateX(-50%)",
//             color: "red",
//             backgroundColor: "transparent",
//             fontSize: "12px",
//             fontWeight: "bold",
//             padding: "2px 6px",
//             borderRadius: "6px",
//             whiteSpace: "nowrap",
//             zIndex: 10,
//           }}
//         >
//           {data.paperCount} papers searched
//         </div>
//       )}

//       {/* 노드 본체 */}
//       <div
//         style={{
//           padding: 10,
//           borderRadius: "16px", // ✅ 더 둥글게
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           // marginTop: "20px", // 🔥 여기에 공백 주기
//         }}
//       >
//         <strong>{data.label}</strong>
//     </div>
//     </div>
//   );
// }
