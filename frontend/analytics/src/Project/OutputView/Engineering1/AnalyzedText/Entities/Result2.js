// import React, { useEffect, useRef, useState } from "react";

// const TextWithArrow = ({ sentence, word1, word2 }) => {
//   const [positions, setPositions] = useState({
//     left: 0,
//     right: 0,
//     topLeft: 0,
//     topRight: 0,
//   });

//   const wordsRef = useRef([]);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const measurePositions = () => {
//       if (!wordsRef.current || wordsRef.current.length === 0) return;

//       const wordRects = wordsRef.current.map((word) =>
//         word ? word.getBoundingClientRect() : null,
//       );

//       const words = sentence.split(" ");
//       const index1 = words.indexOf(word1);
//       const index2 = words.indexOf(word2);

//       if (index1 === -1 || index2 === -1) {
//         console.error("Words not found in the sentence");
//         return;
//       }

//       const rect1 = wordRects[index1];
//       const rect2 = wordRects[index2];

//       if (!rect1 || !rect2) return;

//       setPositions({
//         left: rect1.left + rect1.width / 2 + window.scrollX,
//         topLeft: rect1.top + window.scrollY - 20, // 위로 올림
//         right: rect2.left + rect2.width / 2 + window.scrollX,
//         topRight: rect2.top + window.scrollY - 20, // 위로 올림
//       });
//     };

//     window.addEventListener("resize", measurePositions);
//     window.addEventListener("scroll", measurePositions);
//     setTimeout(measurePositions, 200); // DOM 업데이트 후 실행

//     return () => {
//       window.removeEventListener("resize", measurePositions);
//       window.removeEventListener("scroll", measurePositions);
//     };
//   }, [sentence, word1, word2]);

//   const generatePathD = (positions) => {
//     const leftX =
//       positions.left - Math.min(positions.left, positions.right) + 50;
//     const rightX =
//       positions.right - Math.min(positions.left, positions.right) + 30;
//     const y1 = 50;
//     const y2 = 30;

//     return `
//       M ${leftX} ${y1}
//       Q ${leftX} ${y2}, ${leftX + 20} ${y2}
//       L ${rightX} ${y2}
//       Q ${rightX + 20} ${y2}, ${rightX + 20} ${y1}
//       L ${rightX + 20} ${y1 + 20}
//       M ${leftX} ${y1}
//       L ${leftX} ${y1 + 20}
//     `;
//   };

//   return (
//     <>
//       <p>
//         {word1}: ({Math.round(positions.left)}, {Math.round(positions.topLeft)})
//       </p>
//       <p>
//         {word2}: ({Math.round(positions.right)},{" "}
//         {Math.round(positions.topRight)})
//       </p>

//       <div
//         ref={containerRef}
//         className="relative flex flex-col items-center w-full p-10"
//       >
//         {/* SVG 화살표 (위로 갔다가 가로로 이동 후 아래로) */}
//         <svg
//           width={Math.abs(positions.right - positions.left) + 100}
//           height="100"
//           viewBox={`0 0 ${Math.abs(positions.right - positions.left) + 100} 100`}
//           style={{
//             position: "absolute",
//             left: Math.min(positions.left, positions.right) - 50,
//             top: Math.min(positions.topLeft, positions.topRight) - 50,
//             overflow: "visible",
//             pointerEvents: "none",
//           }}
//         >
//           {/* 화살표 경로 */}
//           <path
//             d={generatePathD(positions)}
//             stroke="black"
//             fill="transparent"
//             strokeWidth="2"
//           />

//           {/* 시작점 화살표 (아래 방향) */}
//           <polygon
//             points={`
//               ${positions.left - Math.min(positions.left, positions.right) + 45},70
//               ${positions.left - Math.min(positions.left, positions.right) + 50},80
//               ${positions.left - Math.min(positions.left, positions.right) + 55},70
//             `}
//             fill="darkblue"
//           />

//           {/* 끝점 화살표 (아래 방향) */}
//           <polygon
//             points={`
//               ${positions.right - Math.min(positions.left, positions.right) + 45},70
//               ${positions.right - Math.min(positions.left, positions.right) + 50},80
//               ${positions.right - Math.min(positions.left, positions.right) + 55},70
//             `}
//             fill="darkblue"
//           />
//         </svg>

//         {/* 문장 출력 */}
//         <p
//           style={{
//             fontSize: "14px",
//             fontWeight: "lighter",
//             whiteSpace: "nowrap",
//             position: "relative",
//             zIndex: 10,
//           }}
//         >
//           {sentence.split(" ").map((word, index) => (
//             <span
//               key={index}
//               ref={(el) => (wordsRef.current[index] = el)}
//               style={{
//                 display: "inline-block",
//                 margin: "0 4px",
//                 position: "relative",
//               }}
//             >
//               {word}
//             </span>
//           ))}
//         </p>
//       </div>
//     </>
//   );
// };

// export default TextWithArrow;
// import React, { useEffect, useRef, useState } from "react";
// import Box from "@mui/material/Box";

// const TextWithArrow = ({ sentence, word1, word2 }) => {
//   const [positions, setPositions] = useState({
//     left: 0,
//     right: 0,
//     topLeft: 0,
//     topRight: 0,
//   });

//   const wordsRef = useRef([]);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const measurePositions = () => {
//       if (!wordsRef.current || wordsRef.current.length === 0) return;

//       const wordRects = wordsRef.current.map((word) =>
//         word ? word.getBoundingClientRect() : null
//       );

//       const words = sentence.split(/\s+/); // 여러 공백을 허용하여 분리
//       const index1 = words.indexOf(word1);
//       const index2 = words.indexOf(word2);

//       if (index1 === -1 || index2 === -1) {
//         console.error("Words not found in the sentence");
//         return;
//       }

//       const rect1 = wordRects[index1];
//       const rect2 = wordRects[index2];

//       if (!rect1 || !rect2) return;

//       setPositions({
//         left: rect1.left + rect1.width / 2 + window.scrollX,
//         topLeft: rect1.top + window.scrollY - 20, // 위로 올림
//         right: rect2.left + rect2.width / 2 + window.scrollX,
//         topRight: rect2.top + window.scrollY - 20, // 위로 올림
//       });
//     };

//     setTimeout(measurePositions, 200);

//     window.addEventListener("resize", measurePositions);
//     window.addEventListener("scroll", measurePositions);

//     return () => {
//       window.removeEventListener("resize", measurePositions);
//       window.removeEventListener("scroll", measurePositions);
//     };
//   }, [sentence, word1, word2]);

//   // ✅ 선을 부드럽게 그리는 SVG Path 생성 함수
//   const generatePathD = (positions) => {
//     const leftX =
//       positions.left - Math.min(positions.left, positions.right) + 50;
//     const rightX =
//       positions.right - Math.min(positions.left, positions.right) + 30;
//     const y1 = 50;
//     const y2 = 30;

//     return `
//       M ${leftX} ${y1}
//       Q ${leftX} ${y2}, ${leftX + 20} ${y2}
//       L ${rightX} ${y2}
//       Q ${rightX + 20} ${y2}, ${rightX + 20} ${y1}
//       L ${rightX + 20} ${y1 + 20}
//       M ${leftX} ${y1}
//       L ${leftX} ${y1 + 20}
//     `;
//   };

//   return (
//     <>
//       <div className="flex flex-col items-center">
//         <p className="text-sm">
//           {word1}: ({Math.round(positions.left)}, {Math.round(positions.topLeft)})
//         </p>
//         <p className="text-sm">
//           {word2}: ({Math.round(positions.right)}, {Math.round(positions.topRight)})
//         </p>
//       </div>

//       <Box
//         sx={{
//           width: "80%",
//           borderRadius: "8px",
//           padding: "10px",
//           backgroundColor: "#fff",
//           border: "1px solid #ddd",
//           minHeight: "1000px",
//           maxHeight: "2000px",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           overflow: "auto",
//           mt: "20px",
//         }}
//       >
//         <div ref={containerRef} className="relative flex flex-col items-center w-full p-10">
//           {/* ✅ SVG를 브라우저 좌표계 기준으로 설정 */}
//           <svg
//             width={Math.abs(positions.right - positions.left) + 100}
//             height="100"
//             viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
//             style={{
//               position: "absolute",
//               left: "0px",
//               top: "0px",
//               width: "100vw",
//               height: "100vh",
//               pointerEvents: "none",
//             }}
//           >
//             {/* ✅ 브라우저 좌표계 기준으로 SVG 위치를 설정 */}
//             <path
//               d={`M ${positions.left} ${positions.topLeft}
//                  L ${positions.right} ${positions.topRight}`}
//               stroke="black"
//               fill="transparent"
//               strokeWidth="2"
//             />
//             <polygon
//               points={`
//                 ${positions.left - 5},${positions.topLeft - 5}
//                 ${positions.left},${positions.topLeft + 5}
//                 ${positions.left + 5},${positions.topLeft - 5}
//               `}
//               fill="darkblue"
//             />
//             <polygon
//               points={`
//                 ${positions.right - 5},${positions.topRight - 5}
//                 ${positions.right},${positions.topRight + 5}
//                 ${positions.right + 5},${positions.topRight - 5}
//               `}
//               fill="darkblue"
//             />
//           </svg>

//           {/* ✅ 단어를 개별 span으로 감싸기 */}
//           <p
//             style={{
//               fontSize: "14px",
//               padding: "5px",
//               fontWeight: "lighter",
//               whiteSpace: "pre-line",
//               wordBreak: "break-word",
//               textAlign: "left",
//             }}
//           >
//             {sentence.split(" ").map((word, index) => (
//               <span
//                 key={index}
//                 ref={(el) => (wordsRef.current[index] = el)}
//                 className="inline-block px-1"
//               >
//                 {word}{" "}
//               </span>
//             ))}
//           </p>
//         </div>
//       </Box>
//     </>
//   );
// };

// export default TextWithArrow;

import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';

const TextWithArrow = ({ sentence, word1, word2 }) => {
  const [positions, setPositions] = useState({
    left: 0,
    right: 0,
    topLeft: 0,
    topRight: 0,
  });

  const wordsRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const measurePositions = () => {
      if (!wordsRef.current || wordsRef.current.length === 0) return;

      requestAnimationFrame(() => {
        const wordRects = wordsRef.current.map((word) =>
          word ? word.getBoundingClientRect() : null
        );

        const words = sentence.split(/\s+/);
        const index1 = words.indexOf(word1);
        const index2 = words.indexOf(word2);

        if (index1 === -1 || index2 === -1) {
          console.error('Words not found in the sentence');
          return;
        }

        const rect1 = wordRects[index1];
        const rect2 = wordRects[index2];

        if (!rect1 || !rect2) return;

        setPositions({
          left: rect1.left + rect1.width / 2 + window.scrollX,
          topLeft: rect1.top + window.scrollY - 20,
          right: rect2.left + rect2.width / 2 + window.scrollX,
          topRight: rect2.top + window.scrollY - 20,
        });
      });
    };

    setTimeout(measurePositions, 200);

    window.addEventListener('resize', measurePositions);
    window.addEventListener('scroll', measurePositions);

    return () => {
      window.removeEventListener('resize', measurePositions);
      window.removeEventListener('scroll', measurePositions);
    };
  }, [sentence, word1, word2]);

  return (
    <>
      <div className="flex flex-col items-center">
        word
        <p className="text-sm">
          {word1}: ({Math.round(positions.left)}, {Math.round(positions.topLeft)})
        </p>
        <p className="text-sm">
          {word2}: ({Math.round(positions.right)}, {Math.round(positions.topRight)})
        </p>
      </div>

      <div className="flex flex-col items-center">
        ploygon
        <p className="text-sm">{positions.left}</p>
        <p className="text-sm">{positions.right}</p>
      </div>

      <Box
        sx={{
          width: '80%',
          borderRadius: '8px',
          padding: '10px',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          minHeight: '1000px',
          maxHeight: '2000px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'auto',
          mt: '20px',
        }}
      >
        <div ref={containerRef} className="relative flex flex-col items-center w-full p-10">
          {/* ✅ SVG를 브라우저 좌표계 기준으로 설정 */}
          <svg
            width={Math.abs(positions.right - positions.left) + 100}
            height="100"
            viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
            style={{
              position: 'absolute',
              left: '0px',
              top: '0px',
              width: '100vw',
              height: '100vh',
              pointerEvents: 'none',
            }}
          >
            {/* ✅ 브라우저 좌표계 기준으로 SVG 위치를 설정 */}
            <path
              d={`M ${positions.left} ${positions.topLeft} 
                 L ${positions.right} ${positions.topRight}`}
              stroke="black"
              fill="transparent"
              strokeWidth="2"
            />
            <polygon
              points={`
                ${positions.left - 5},${positions.topLeft - 5}
                ${positions.left},${positions.topLeft + 5}
                ${positions.left + 5},${positions.topLeft - 5}
              `}
              fill="darkblue"
            />
            <polygon
              points={`
                ${positions.right - 5},${positions.topRight - 5}
                ${positions.right},${positions.topRight + 5}
                ${positions.right + 5},${positions.topRight - 5}
              `}
              fill="darkblue"
            />
          </svg>
          <p
            style={{
              fontSize: '14px',
              padding: '5px',
              fontWeight: 'lighter',
              whiteSpace: 'pre-line',
              wordBreak: 'break-word',
              textAlign: 'left',
            }}
          >
            {sentence.split(' ').map((word, index) => (
              <span
                key={index}
                ref={(el) => (wordsRef.current[index] = el)}
                className="inline-block px-1"
              >
                {word}{' '}
              </span>
            ))}
          </p>
        </div>
      </Box>
    </>
  );
};

export default TextWithArrow;
