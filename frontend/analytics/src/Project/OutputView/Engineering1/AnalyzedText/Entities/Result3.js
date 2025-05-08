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

      const wordRects = wordsRef.current.map((word) =>
        word ? word.getBoundingClientRect() : null
      );

      const words = sentence.split(' ');
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
        topLeft: rect1.top + window.scrollY - 20, // 위로 올림
        right: rect2.left + rect2.width / 2 + window.scrollX,
        topRight: rect2.top + window.scrollY - 20, // 위로 올림
      });
    };

    window.addEventListener('resize', measurePositions);
    window.addEventListener('scroll', measurePositions);
    setTimeout(measurePositions, 200); // DOM 업데이트 후 실행

    return () => {
      window.removeEventListener('resize', measurePositions);
      window.removeEventListener('scroll', measurePositions);
    };
  }, [sentence, word1, word2]);

  const generatePathD = (positions) => {
    const leftX = positions.left - Math.min(positions.left, positions.right) + 50;
    const rightX = positions.right - Math.min(positions.left, positions.right) + 30;
    const y1 = 50;
    const y2 = 30;

    return `
      M ${leftX} ${y1}
      Q ${leftX} ${y2}, ${leftX + 20} ${y2}
      L ${rightX} ${y2}
      Q ${rightX + 20} ${y2}, ${rightX + 20} ${y1}
      L ${rightX + 20} ${y1 + 20}
      M ${leftX} ${y1}
      L ${leftX} ${y1 + 20}
    `;
  };

  return (
    // <div className="border border-gray-400 bg-white p-6 rounded-md shadow-md w-full max-w-xl mx-auto relative">
    <>
      <div className="flex flex-col items-center">
        <p className="text-sm">
          {word1}: ({Math.round(positions.left)}, {Math.round(positions.topLeft)})
        </p>
        <p className="text-sm">
          {word2}: ({Math.round(positions.right)}, {Math.round(positions.topRight)})
        </p>
      </div>
      <Box
        sx={{
          width: '80%', // TextField와 동일한 width
          borderRadius: '8px', // 동일한 둥근 모서리
          padding: '10px',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          minHeight: '1000px', // TextField의 높이에 맞춰 조정
          maxHeight: '2000px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'auto', // 내용이 많을 경우 스크롤 허용
          mt: '20px',
        }}
      >
        <div ref={containerRef} className="relative flex flex-col items-center w-full p-10">
          <div className="relative w-full h-24">
            <svg
              width={Math.abs(positions.right - positions.left) + 100}
              height="100"
              viewBox={`0 0 ${Math.abs(positions.right - positions.left) + 100} 100`}
              style={{
                //   position: "absolute",
                left: Math.min(positions.left, positions.right) - 50,
                top: Math.min(positions.topLeft, positions.topRight) - 50,
                overflow: 'visible',
                pointerEvents: 'none',
              }}
            >
              <path
                d={generatePathD(positions)}
                stroke="black"
                fill="transparent"
                strokeWidth="2"
              />
              <polygon
                points={`
                ${positions.left - Math.min(positions.left, positions.right) + 45},70
                ${positions.left - Math.min(positions.left, positions.right) + 50},80
                ${positions.left - Math.min(positions.left, positions.right) + 55},70
              `}
                fill="darkblue"
              />
              <polygon
                points={`
                ${positions.right - Math.min(positions.left, positions.right) + 45},70
                ${positions.right - Math.min(positions.left, positions.right) + 50},80
                ${positions.right - Math.min(positions.left, positions.right) + 55},70
              `}
                fill="darkblue"
              />
            </svg>
          </div>
          <p
            style={{
              fontSize: '14px',
              padding: '5px',
              fontWeight: 'lighter',
              whiteSpace: 'pre-line', // TextField처럼 줄바꿈 유지
              wordBreak: 'break-word', // 긴 단어 자동 줄바꿈
              textAlign: 'left', // 왼쪽 정렬
            }}
          >
            {sentence.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
      </Box>
      {/* // </div> */}
    </>
  );
};

export default TextWithArrow;
