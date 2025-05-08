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
//       setTimeout(() => {
//         requestAnimationFrame(() => {
//           if (!containerRef.current) return;

//           const containerRect = containerRef.current.getBoundingClientRect();
//           const wordSpans = containerRef.current.querySelectorAll("span");

//           const targetSpan1 = Array.from(wordSpans).find(
//             (span) => span.textContent.trim() === word1
//           );
//           const targetSpan2 = Array.from(wordSpans).find(
//             (span) => span.textContent.trim() === word2
//           );

//           if (!targetSpan1 || !targetSpan2) {
//             console.error("Words not found in the text.");
//             return;
//           }

//           const rect1 = targetSpan1.getBoundingClientRect();
//           const rect2 = targetSpan2.getBoundingClientRect();

//           setPositions({
//             left: rect1.left + rect1.width / 2 - containerRect.left,
//             topLeft: rect1.top - containerRect.top,
//             right: rect2.left + rect2.width / 2 - containerRect.left,
//             topRight: rect2.top - containerRect.top,
//           });
//         });
//       }, 100);
//     };

//     measurePositions();
//     window.addEventListener("resize", measurePositions);
//     window.addEventListener("scroll", measurePositions);

//     return () => {
//       window.removeEventListener("resize", measurePositions);
//       window.removeEventListener("scroll", measurePositions);
//     };
//   }, [sentence, word1, word2]);

//   // useEffect(() => {
//   //   const measurePositions = () => {
//   //     setTimeout(() => {
//   //       requestAnimationFrame(() => {
//   //         if (!wordsRef.current || wordsRef.current.length === 0) {
//   //           console.error("wordsRef.current is empty");
//   //           return;
//   //         }

//   //         const wordRects = wordsRef.current.map((word) =>
//   //           word ? word.getBoundingClientRect() : null,
//   //         );

//   //         const words = sentence.split(/\s+/);
//   //         const index1 = words.indexOf(word1);
//   //         const index2 = words.indexOf(word2);

//   //         if (index1 === -1 || index2 === -1) {
//   //           console.error(`Words not found: ${word1}, ${word2}`);
//   //           return;
//   //         }

//   //         const rect1 = wordRects[index1];
//   //         const rect2 = wordRects[index2];

//   //         if (!rect1 || !rect2) {
//   //           console.error("rect1 or rect2 is null");
//   //           return;
//   //         }

//   //         setPositions({
//   //           left: rect1.left + rect1.width / 2 + window.scrollX,
//   //           topLeft: rect1.top + window.scrollY - 10,
//   //           right: rect2.left + rect2.width / 2 + window.scrollX,
//   //           topRight: rect2.top + window.scrollY - 10,
//   //         });
//   //       });
//   //     }, 100);
//   //   };

//   //   measurePositions();
//   //   window.addEventListener("resize", measurePositions);
//   //   window.addEventListener("scroll", measurePositions);

//   //   return () => {
//   //     window.removeEventListener("resize", measurePositions);
//   //     window.removeEventListener("scroll", measurePositions);
//   //   };
//   // }, [sentence, word1, word2]);

//   const generatePathD = (positions) => {
//     const heightReduction = 35;
//     return `
//       M ${positions.left} ${positions.topLeft}
//       L ${positions.left} ${positions.topLeft - (30 - heightReduction)}
//       Q ${positions.left} ${positions.topLeft - (50 - heightReduction)}, ${positions.left + 30} ${positions.topLeft - (50 - heightReduction)}
//       L ${positions.right - 30} ${positions.topRight - (50 - heightReduction)}
//       Q ${positions.right} ${positions.topRight - (50 - heightReduction)}, ${positions.right} ${positions.topRight - (30 - heightReduction)}
//       L ${positions.right} ${positions.topRight}
//     `;
//   };

//   return (
//     <>
//     <Box
//       ref={containerRef}
//       sx={{
//         width: "80%",
//         backgroundColor: "#fff",
//         padding: "50px 14px",
//         fontSize: "14px",
//         lineHeight: "1.5",
//       }}
//     >
//         {/* <div
//           ref={containerRef}
//           className="relative flex flex-col items-center w-full p-10"
//         >
//           <div className="relative w-full h-24"> */}
//           <svg
//         width="100%"
//         height="100%"
//         style={{
//           position: "absolute",
//           left: 0,
//           top: 0,
//           overflow: "visible",
//           pointerEvents: "none",
//         }}
//       >
//               <path
//                 d={generatePathD(positions)}
//                 stroke="black"
//                 fill="transparent"
//                 strokeWidth="1"
//               />
//               <polygon
//                 points={`
//                   ${positions.left - 3},${positions.topLeft}
//                   ${positions.left + 3},${positions.topLeft}
//                   ${positions.left},${positions.topLeft + 6}
//                 `}
//                 fill="black"
//               />
//               <polygon
//                 points={`
//                   ${positions.right - 3},${positions.topRight}
//                   ${positions.right + 3},${positions.topRight}
//                   ${positions.right},${positions.topRight + 6}
//                 `}
//                 fill="black"
//               />
//             </svg>
//           {/* </div> */}

//           <p
//             style={{
//               fontSize: "14px",
//               fontWeight: "400",
//               whiteSpace: "pre-line",
//               wordBreak: "break-word",
//               textAlign: "left",
//               width: "100%",
//               margin: 0,
//               lineHeight: "3.5",
//             }}
//           >
//             {sentence.split(" ").map((word, index) => (
//               <span
//                 key={index}
//                 ref={(el) => {
//                   if (el) wordsRef.current[index] = el;
//                 }}
//                 className="inline-block px-1"
//                 style={{
//                   textDecoration: word === word1 || word === word2 ? "underline" : "none",
//                   textDecorationColor: word === word1 || word === word2 ? "orange" : "inherit",
//                   textDecorationThickness: word === word1 || word === word2 ? "2px" : "auto",
//                   fontWeight: word === word1 || word === word2 ? "bold" : "normal",
//                   color: word === word1 || word === word2 ? "orange" : "black",
//                 }}
//               >
//                 {word}{" "}
//               </span>
//             ))}
//           </p>
//         {/* </div> */}
//       </Box>
//       <div className="flex flex-col items-center">
//         <p className="text-sm">
//           {word1}: ({Math.round(positions.left)},{" "}
//           {Math.round(positions.topLeft)})
//         </p>
//         <p className="text-sm">
//           {word2}: ({Math.round(positions.right)},{" "}
//           {Math.round(positions.topRight)})
//         </p>
//       </div>

//       <div className="flex flex-col items-center">
//         <p className="text-sm">polygon1: {positions.left}</p>
//         <p className="text-sm">polygon2: {positions.right}</p>
//       </div>

//       <div className="flex flex-col items-center">
//         <p className="text-sm">Path d: {generatePathD(positions)}</p>
//       </div>
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

  const containerRef = useRef(null);

  useEffect(() => {
    const measurePositions = () => {
      setTimeout(() => {
        requestAnimationFrame(() => {
          if (!containerRef.current) return;

          const containerRect = containerRef.current.getBoundingClientRect();
          const wordSpans = containerRef.current.querySelectorAll('span');

          const targetSpan1 = Array.from(wordSpans).find(
            (span) => span.textContent.trim() === word1
          );
          const targetSpan2 = Array.from(wordSpans).find(
            (span) => span.textContent.trim() === word2
          );

          if (!targetSpan1 || !targetSpan2) {
            console.error('Words not found in the text.');
            return;
          }

          const rect1 = targetSpan1.getBoundingClientRect();
          const rect2 = targetSpan2.getBoundingClientRect();

          setPositions({
            left: rect1.left + rect1.width / 2 - containerRect.left,
            topLeft: rect1.top - containerRect.top,
            right: rect2.left + rect2.width / 2 - containerRect.left,
            topRight: rect2.top - containerRect.top,
          });
        });
      }, 100);
    };

    measurePositions();
    window.addEventListener('resize', measurePositions);
    window.addEventListener('scroll', measurePositions);

    return () => {
      window.removeEventListener('resize', measurePositions);
      window.removeEventListener('scroll', measurePositions);
    };
  }, [sentence, word1, word2]);

  const generatePathD = (positions) => `
      M ${positions.left} ${positions.topLeft}
      L ${positions.left} ${positions.topLeft - 20}
      L ${positions.right} ${positions.topRight - 20}
      L ${positions.right} ${positions.topRight}
    `;

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '80%',
        backgroundColor: '#fff',
        padding: '50px 14px',
        fontSize: '14px',
        lineHeight: '1.5',
        position: 'relative', // ✅ 부모 컨테이너를 relative로 설정
        minHeight: '200px', // ✅ SVG가 보일 수 있도록 최소 높이 설정
      }}
    >
      <svg
        width={containerRef.current?.offsetWidth || '100%'} // ✅ 부모 컨테이너의 실제 너비를 반영
        height={containerRef.current?.offsetHeight || '100%'}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          overflow: 'visible',
          pointerEvents: 'none',
        }}
      >
        <path d={generatePathD(positions)} stroke="black" fill="transparent" strokeWidth="1" />
      </svg>

      <p style={{ fontSize: '14px', lineHeight: '3.5', textAlign: 'left' }}>
        {sentence.split(' ').map((word, index) => (
          <span
            key={index}
            style={{
              textDecoration: [word1, word2].includes(word) ? 'underline' : 'none',
              fontWeight: [word1, word2].includes(word) ? 'bold' : 'normal',
              color: [word1, word2].includes(word) ? 'orange' : 'black',
            }}
          >
            {word}{' '}
          </span>
        ))}
      </p>
    </Box>
  );
};

export default TextWithArrow;
