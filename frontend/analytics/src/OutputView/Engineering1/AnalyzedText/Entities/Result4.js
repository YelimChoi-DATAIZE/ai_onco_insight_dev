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

          console.log("wordsRef:", wordsRef.current); // ✅ wordsRef 상태 확인

          const wordRects = wordsRef.current.map((word) =>
            word ? word.getBoundingClientRect() : null,
          );

          console.log("wordRects:", wordRects); // ✅ 각 단어의 위치 정보 확인

          const words = sentence.split(/\s+/);
          console.log("words:", words); // ✅ 단어 배열 확인

          const index1 = words.indexOf(word1);
          const index2 = words.indexOf(word2);
          console.log("index1:", index1, "index2:", index2); // ✅ 인덱스 확인

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

          console.log("rect1:", rect1, "rect2:", rect2); // ✅ getBoundingClientRect() 값 확인

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
    return `
      M ${positions.left}, ${positions.topLeft} 
      Q ${(positions.left + positions.right) / 2} ${positions.topLeft - 40}, ${positions.right} ${positions.topRight}
    `;
  };
  return (
    <>
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
      <Box
        sx={{
          width: "80%",
          borderRadius: "8px",
          padding: "10px",
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          minHeight: "1000px",
          maxHeight: "2000px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "auto",
          mt: "20px",
        }}
      >
        <div
          ref={containerRef}
          className="relative flex flex-col items-center w-full p-10"
        >
          <div className="relative w-full h-24">
            <svg
              width={Math.abs(positions.right - positions.left) + 50}
              height={Math.abs(positions.topLeft - positions.topRight) + 50}
              viewBox={`${Math.min(positions.left, positions.right) - 25} ${Math.min(positions.topLeft, positions.topRight) - 25} ${Math.abs(positions.right - positions.left) + 50} ${Math.abs(positions.topLeft - positions.topRight) + 50}`}
              style={{
                position: "fixed",
                left: 0,
                top: 0,
                overflow: "visible",
                pointerEvents: "none",
              }}
            >
              <polygon
                points={`
                  ${positions.left - 5},${positions.topLeft + 10}
                  ${positions.left + 5},${positions.topLeft + 10}
                  ${positions.left},${positions.topLeft}
                `}
                fill="darkblue"
              />
              <polygon
                points={`
                  ${positions.right - 5},${positions.topRight + 10}
                  ${positions.right + 5},${positions.topRight + 10}
                  ${positions.right},${positions.topRight}
                `}
                fill="darkblue"
              />
            </svg>
          </div>
          <p
            style={{
              fontSize: "14px",
              padding: "5px",
              fontWeight: "lighter",
              whiteSpace: "pre-line",
              wordBreak: "break-word",
              textAlign: "left",
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
    </>
  );
};

export default TextWithArrow;
