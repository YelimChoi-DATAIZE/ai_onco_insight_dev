import React, { useEffect, useRef, useState } from "react";

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

      const wordRects = wordsRef.current.map((word) =>
        word ? word.getBoundingClientRect() : null,
      );

      const words = sentence.split(" ");
      const index1 = words.indexOf(word1);
      const index2 = words.indexOf(word2);

      if (index1 === -1 || index2 === -1) {
        console.error("Words not found in the sentence");
        return;
      }

      const rect1 = wordRects[index1];
      const rect2 = wordRects[index2];

      if (!rect1 || !rect2) return;

      setPositions({
        left: rect1.left + rect1.width / 2 + window.scrollX,
        topLeft: rect1.top + window.scrollY - 20, // 위로 올림
        right: rect2.left + rect2.width / 2 + window.scrollX,
        topRight: rect2.top + window.scrollY - 20, // 위로 올림
      });
    };

    window.addEventListener("resize", measurePositions);
    window.addEventListener("scroll", measurePositions);
    setTimeout(measurePositions, 200); // DOM 업데이트 후 실행

    return () => {
      window.removeEventListener("resize", measurePositions);
      window.removeEventListener("scroll", measurePositions);
    };
  }, [sentence, word1, word2]);

  return (
    <>
      <p>
        {word1}: ({Math.round(positions.left)}, {Math.round(positions.topLeft)})
      </p>
      <p>
        {word2}: ({Math.round(positions.right)},{" "}
        {Math.round(positions.topRight)})
      </p>

      <div
        ref={containerRef}
        className="relative flex flex-col items-center w-full p-10"
      >
        {/* SVG 화살표 (위로 갔다가 가로로 이동 후 아래로) */}
        <svg
          width={Math.abs(positions.right - positions.left) + 100}
          height="100"
          viewBox={`0 0 ${Math.abs(positions.right - positions.left) + 100} 100`}
          style={{
            position: "absolute",
            left: Math.min(positions.left, positions.right) - 50,
            top: Math.min(positions.topLeft, positions.topRight) - 50,
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          {/* 화살표 경로 */}
          <path
            d={`
              M ${positions.left - Math.min(positions.left, positions.right) + 50} 80
              Q ${positions.left - Math.min(positions.left, positions.right) + 50} 40, ${(positions.left + positions.right) / 2 - Math.min(positions.left, positions.right) + 50} 30
              L ${(positions.left + positions.right) / 2 - Math.min(positions.left, positions.right) + 50} 30
              Q ${positions.right - Math.min(positions.left, positions.right) + 50} 40, ${positions.right - Math.min(positions.left, positions.right) + 50} 80
            `}
            stroke="darkblue"
            strokeWidth="2"
            fill="transparent"
          />

          {/* 시작점 화살표 (아래 방향) */}
          <polygon
            points={`
              ${positions.left - Math.min(positions.left, positions.right) + 45},75
              ${positions.left - Math.min(positions.left, positions.right) + 50},85
              ${positions.left - Math.min(positions.left, positions.right) + 55},75
            `}
            fill="darkblue"
          />

          {/* 끝점 화살표 (아래 방향) */}
          <polygon
            points={`
              ${positions.right - Math.min(positions.left, positions.right) + 45},75
              ${positions.right - Math.min(positions.left, positions.right) + 50},85
              ${positions.right - Math.min(positions.left, positions.right) + 55},75
            `}
            fill="darkblue"
          />
        </svg>

        {/* 문장 출력 */}
        <p
          style={{
            fontSize: "24px",
            fontWeight: "lighter",
            whiteSpace: "nowrap",
            position: "relative",
            zIndex: 10,
          }}
        >
          {sentence.split(" ").map((word, index) => (
            <span
              key={index}
              ref={(el) => (wordsRef.current[index] = el)}
              style={{
                display: "inline-block",
                margin: "0 4px",
                position: "relative",
              }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </>
  );
};

export default TextWithArrow;
