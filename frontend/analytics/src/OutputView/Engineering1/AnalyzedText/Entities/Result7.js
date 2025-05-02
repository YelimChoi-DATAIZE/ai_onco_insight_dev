import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";

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
      setTimeout(() => {
        requestAnimationFrame(() => {
          if (!wordsRef.current || wordsRef.current.length === 0) {
            console.error("wordsRef.current is empty");
            return;
          }

          const wordRects = wordsRef.current.map((word) =>
            word ? word.getBoundingClientRect() : null,
          );

          const words = sentence.split(/\s+/);
          const index1 = words.indexOf(word1);
          const index2 = words.indexOf(word2);

          if (index1 === -1 || index2 === -1) {
            console.error(`Words not found: ${word1}, ${word2}`);
            return;
          }

          const rect1 = wordRects[index1];
          const rect2 = wordRects[index2];

          if (!rect1 || !rect2) {
            console.error("rect1 or rect2 is null");
            return;
          }

          setPositions({
            left: rect1.left + rect1.width / 2 + window.scrollX,
            topLeft: rect1.top + window.scrollY - 20,
            right: rect2.left + rect2.width / 2 + window.scrollX,
            topRight: rect2.top + window.scrollY - 20,
          });
        });
      }, 100);
    };

    measurePositions();
    window.addEventListener("resize", measurePositions);
    window.addEventListener("scroll", measurePositions);

    return () => {
      window.removeEventListener("resize", measurePositions);
      window.removeEventListener("scroll", measurePositions);
    };
  }, [sentence, word1, word2]);

  const generatePathD = (positions) => {
    const heightReduction = 35;
    return `
      M ${positions.left} ${positions.topLeft}
      L ${positions.left} ${positions.topLeft - (30 - heightReduction)}
      Q ${positions.left} ${positions.topLeft - (50 - heightReduction)}, ${positions.left + 30} ${positions.topLeft - (50 - heightReduction)}
      L ${positions.right - 30} ${positions.topRight - (50 - heightReduction)}
      Q ${positions.right} ${positions.topRight - (50 - heightReduction)}, ${positions.right} ${positions.topRight - (30 - heightReduction)}
      L ${positions.right} ${positions.topRight}
    `;
  };

  //   const generatePathD = (positions) => {
  //     const heightReduction = 35;
  //     const cornerSharpness = 5; //high value -> 더 각짐짐

  //     return `
  //       M ${positions.left} ${positions.topLeft}
  //       L ${positions.left} ${positions.topLeft - (30 - heightReduction)}
  //       Q ${positions.left + cornerSharpness} ${positions.topLeft - (50 - heightReduction)}, ${positions.left + 30} ${positions.topLeft - (50 - heightReduction)}
  //       L ${positions.right - 30} ${positions.topRight - (50 - heightReduction)}
  //       Q ${positions.right - cornerSharpness} ${positions.topRight - (50 - heightReduction)}, ${positions.right} ${positions.topRight - (30 - heightReduction)}
  //       L ${positions.right} ${positions.topRight}
  //     `;
  //   };

  return (
    <>
      <Box
        sx={{
          width: "80%",
          minHeight: "300px",
          maxHeight: "300px",
          overflow: "auto",
          backgroundColor: "#fff",
          border: "1px solid rgba(0, 0, 0, 0.23)",
          borderRadius: "4px",
          padding: "8px 14px",
          fontSize: "14px",
          lineHeight: "1.5",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          mt: "20px",
          transition: "border-color 0.2s ease-in-out",

          "&:focus-within": {
            borderColor: "#1976d2",
          },
        }}
      >
        <div
          ref={containerRef}
          className="relative flex flex-col items-center w-full p-10"
        >
          <div className="relative w-full h-24">
            <svg
              width="100%"
              height="100%"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                overflow: "visible",
                pointerEvents: "none",
                zIndex: 9999,
              }}
            >
              <path
                d={generatePathD(positions)}
                stroke="black"
                fill="transparent"
                strokeWidth="1"
              />
              <polygon
                points={`
                  ${positions.left - 3},${positions.topLeft}
                  ${positions.left + 3},${positions.topLeft}
                  ${positions.left},${positions.topLeft + 6}
                `}
                fill="black"
              />
              <polygon
                points={`
                  ${positions.right - 3},${positions.topRight}
                  ${positions.right + 3},${positions.topRight}
                  ${positions.right},${positions.topRight + 6}
                `}
                fill="black"
              />
            </svg>
          </div>

          <p
            style={{
              fontSize: "14px",
              fontWeight: "400",
              whiteSpace: "pre-line",
              wordBreak: "break-word",
              textAlign: "left",
              width: "100%",
              margin: 0,
            }}
          >
            {sentence.split(" ").map((word, index) => (
              <span
                key={index}
                ref={(el) => {
                  if (el) wordsRef.current[index] = el;
                }}
                className="inline-block px-1"
              >
                {word}{" "}
              </span>
            ))}
          </p>
        </div>
      </Box>
      <div className="flex flex-col items-center">
        <p className="text-sm">
          {word1}: ({Math.round(positions.left)},{" "}
          {Math.round(positions.topLeft)})
        </p>
        <p className="text-sm">
          {word2}: ({Math.round(positions.right)},{" "}
          {Math.round(positions.topRight)})
        </p>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-sm">polygon1: {positions.left}</p>
        <p className="text-sm">polygon2: {positions.right}</p>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-sm">Path d: {generatePathD(positions)}</p>
      </div>
    </>
  );
};

export default TextWithArrow;
