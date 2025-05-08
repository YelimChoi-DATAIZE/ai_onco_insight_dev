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

  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const measurePositions = () => {
      setTimeout(() => {
        requestAnimationFrame(() => {
          if (!containerRef.current) return;

          const containerRect = containerRef.current.getBoundingClientRect();
          setContainerWidth(containerRef.current.offsetWidth); // ✅ 박스 넓이 저장

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

    return () => {
      window.removeEventListener('resize', measurePositions);
    };
  }, [sentence, word1, word2]);

  // useEffect(() => {
  //   const measurePositions = () => {
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

  //   measurePositions();
  //   window.addEventListener("resize", measurePositions);
  //   window.addEventListener("scroll", measurePositions);

  //   return () => {
  //     window.removeEventListener("resize", measurePositions);
  //     window.removeEventListener("scroll", measurePositions);
  //   };
  // }, [sentence, word1, word2]);

  const generatePathD = (positions) => {
    const heightReduction = 35;

    // 높이가 같은 경우 (기존 방식 유지)
    if (positions.topLeft === positions.topRight) {
      return `
        M ${positions.left} ${positions.topLeft}
        L ${positions.left} ${positions.topLeft - (30 - heightReduction)}
        Q ${positions.left} ${positions.topLeft - (50 - heightReduction)}, ${positions.left + 30} ${positions.topLeft - (50 - heightReduction)}
        L ${positions.right - 30} ${positions.topRight - (50 - heightReduction)}
        Q ${positions.right} ${positions.topRight - (50 - heightReduction)}, ${positions.right} ${positions.topRight - (30 - heightReduction)}
        L ${positions.right} ${positions.topRight}
      `;
    }

    // case 1: 왼쪽 단어가 위에 있고,(positions.topLeft < positions.topRight) 오른쪽 단어가 아래에 있는 경우 (내려가는 곡선)
    if (positions.topLeft < positions.topRight && positions.left < positions.right) {
      return `
        M ${positions.left} ${positions.topLeft}
        L ${positions.left} ${positions.topLeft - 15}
        L ${positions.left + containerWidth * 0.5} ${positions.topLeft - 15}
        L ${positions.left + containerWidth * 0.5} ${positions.topLeft + (positions.topRight - positions.topLeft) - 15}
        L ${positions.right} ${positions.topLeft + (positions.topRight - positions.topLeft) - 15}
        L ${positions.right} ${positions.topRight}
      `;
    }

    // case 2: 오른쪽 단어가 위에 있고, 왼쪽 단어가 아래에 있는 경우 (올라가는 곡선)
    if (positions.topLeft < positions.topRight && positions.left < positions.right) {
      return `
        M ${positions.left} ${positions.topLeft}
        L ${positions.left} ${positions.topLeft - (30 - heightReduction)}
        Q ${positions.left} ${positions.topLeft - (50 - heightReduction)}, 
          ${(positions.left + positions.right) / 2} ${(positions.topLeft + positions.topRight) / 2 - (50 - heightReduction)}
        L ${positions.right} ${positions.topRight - (30 - heightReduction)}
        L ${positions.right} ${positions.topRight}
      `;
    }

    // 기본적으로 기존 방식으로 반환
    return `
      M ${positions.left} ${positions.topLeft}
      L ${positions.left} ${positions.topLeft - (30 - heightReduction)}
      Q ${positions.left} ${positions.topLeft - (50 - heightReduction)}, ${positions.left + 30} ${positions.topLeft - (50 - heightReduction)}
      L ${positions.right - 30} ${positions.topRight - (50 - heightReduction)}
      Q ${positions.right} ${positions.topRight - (50 - heightReduction)}, ${positions.right} ${positions.topRight - (30 - heightReduction)}
      L ${positions.right} ${positions.topRight}
    `;
  };

  return (
    <>
      <Box
        ref={containerRef}
        sx={{
          width: '80%',
          backgroundColor: '#fff',
          padding: '50px 14px',
          fontSize: '14px',
          lineHeight: '3.5',
          position: 'relative', // 부모 컨테이너를 relative로 설정
          minHeight: '200px', // SVG가 보일 수 있도록 최소 높이 설정
        }}
      >
        <svg
          width={containerRef.current?.offsetWidth || '100%'} // 부모 컨테이너의 실제 너비를 반영
          height="100%"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            overflow: 'visible',
            pointerEvents: 'none',
          }}
        >
          <path d={generatePathD(positions)} stroke="black" fill="transparent" strokeWidth="1" />
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
        <p
          style={{
            fontSize: '14px',
            fontWeight: '400',
            whiteSpace: 'pre-line',
            wordBreak: 'break-word',
            textAlign: 'left',
            width: '100%',
            margin: 0,
            lineHeight: '3.5',
          }}
        >
          {sentence.split(' ').map((word, index) => (
            <span
              key={index}
              ref={(el) => {
                if (el) wordsRef.current[index] = el;
              }}
              className="inline-block px-1"
              style={{
                textDecoration: word === word1 || word === word2 ? 'underline' : 'none',
                textDecorationColor: word === word1 || word === word2 ? 'orange' : 'inherit',
                textDecorationThickness: word === word1 || word === word2 ? '2px' : 'auto',
                fontWeight: word === word1 || word === word2 ? 'bold' : 'normal',
                color: word === word1 || word === word2 ? 'orange' : 'black',
              }}
            >
              {word}{' '}
            </span>
          ))}
        </p>
      </Box>
      {/* <div className="flex flex-col items-center">
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
      </div> */}
    </>
  );
};

export default TextWithArrow;
