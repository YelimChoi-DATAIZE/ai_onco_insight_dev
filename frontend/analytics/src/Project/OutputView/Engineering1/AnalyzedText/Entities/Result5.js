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
      setTimeout(() => {
        requestAnimationFrame(() => {
          if (!wordsRef.current || wordsRef.current.length === 0) {
            console.error('wordsRef.current is empty');
            return;
          }

          const wordRects = wordsRef.current.map((word) =>
            word ? word.getBoundingClientRect() : null
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
            console.error('rect1 or rect2 is null');
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
        <p className="text-sm">
          {word1}: ({Math.round(positions.left)}, {Math.round(positions.topLeft)})
        </p>
        <p className="text-sm">
          {word2}: ({Math.round(positions.right)}, {Math.round(positions.topRight)})
        </p>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-sm">polygon1: {positions.left}</p>
        <p className="text-sm">polygon2: {positions.right}</p>
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
          <div className="relative w-full h-24">
            <svg
              width="100%"
              height="100%"
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                overflow: 'visible',
                pointerEvents: 'none',
              }}
            >
              {/* word1의 위쪽에 polygon 추가 */}
              <polygon
                points={`
                  ${positions.left - 5},${positions.topLeft}
                  ${positions.left + 5},${positions.topLeft}
                  ${positions.left},${positions.topLeft + 10}
                `}
                fill="darkblue"
              />
              <polygon
                points={`
                  ${positions.right - 5},${positions.topRight}
                  ${positions.right + 5},${positions.topRight}
                  ${positions.right},${positions.topRight + 10}
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
              whiteSpace: 'pre-line',
              wordBreak: 'break-word',
              textAlign: 'left',
            }}
          >
            {sentence.split(' ').map((word, index) => (
              <span
                key={index}
                ref={(el) => {
                  if (el) wordsRef.current[index] = el;
                }}
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
