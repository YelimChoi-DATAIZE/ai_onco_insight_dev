import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';

const PathQ = ({ sentence, word1, word2 }) => {
  const [positions, setPositions] = useState({ left: 0, right: 0 });
  const wordsRef = useRef([]);

  useEffect(() => {
    const measurePositions = () => {
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
        left: rect1.left + rect1.width / 2,
        right: rect2.left + rect2.width / 2,
      });
    };

    setTimeout(measurePositions, 0);
  }, [sentence, word1, word2]);

  return (
    <>
      <p>
        {word1} {positions.left}
      </p>
      <p>
        {word2} {positions.right}
      </p>

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
        <div className="relative flex flex-col items-center w-full p-10">
          <svg width="100%" height="80" className="absolute top-0">
            <path
              d={`M ${positions.left} 60 Q ${positions.left} 30 ${positions.left + 25} 30
            L ${positions.right - 25} 30 Q ${positions.right} 30 ${positions.right} 60`}
              stroke="darkblue"
              strokeWidth="1"
              fill="transparent"
            />
            <polygon
              points={`${positions.left - 5},60 ${positions.left},70 ${positions.left + 5},60`}
              fill="darkblue"
            />
            <polygon
              points={`${positions.right - 5},60 ${positions.right},70 ${positions.right + 5},60`}
              fill="darkblue"
            />
          </svg>

          {/* 줄바꿈을 유지하는 문장 출력 */}
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
    </>
  );
};

export default PathQ;
