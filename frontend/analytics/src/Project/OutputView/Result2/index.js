// import React, { Component } from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Plot from "react-plotly.js";

// class PastePlot extends Component {
//   constructor() {
//     super();
//     this.state = {
//       data: [],
//       layout: {},
//       frames: [],
//     };

//     this.handlePaste = this.handlePaste.bind(this);
//   }

//   async handlePaste() {
//     try {
//       const text = await navigator.clipboard.readText();
//       const figure = JSON.parse(text);
//       this.setState({
//         data: figure.data || [],
//         layout: figure.layout || {},
//         frames: figure.frames || [],
//       });
//       alert("✅ 그래프가 붙여넣기 되었습니다.");
//     } catch (err) {
//       alert("❌ 붙여넣기 실패: " + err.message);
//     }
//   }

//   render() {
//     return (
//       <Box sx={{ p: 2 }}>
//         <Button variant="contained" onClick={this.handlePaste} sx={{ mb: 2 }}>
//           📋 그래프 붙여넣기
//         </Button>

//         {this.state.data.length > 0 && (
//           <Plot
//             data={this.state.data}
//             layout={{ ...this.state.layout, responsive: true }}
//             frames={this.state.frames}
//             useResizeHandler
//             style={{ width: "100%", height: "100%" }}
//             config={{ displayModeBar: true }}
//           />
//         )}
//       </Box>
//     );
//   }
// }

// export default PastePlot;
