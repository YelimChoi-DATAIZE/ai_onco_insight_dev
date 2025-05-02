// import React, { useEffect, useRef, useState } from "react";

// const TextWithArrow = ({ sentence, word1, word2 }) => {
//   const [positions, setPositions] = useState({ left: 0, right: 0 });
//   const wordsRef = useRef([]);

//   useEffect(() => {
//     // 모든 단어 요소가 렌더링된 후에 너비를 측정
//     const measurePositions = () => {
//       const wordWidths = wordsRef.current.map((word) => {
//         if (word) {
//           const style = window.getComputedStyle(word);
//           return parseFloat(style.width);
//         }
//         return 0;
//       });

//       // 각 단어의 시작 위치를 계산
//       const wordPositions = wordWidths.reduce((acc, width, index) => {
//         const previousPosition = acc[index - 1] || 0;
//         acc.push(previousPosition + width/2);
//         return acc;
//       }, []);

//       // 단어의 인덱스 찾기
//       const words = sentence.split(" ");
//       const index1 = words.indexOf(word1);
//       const index2 = words.indexOf(word2);

//       if (index1 === -1 || index2 === -1) {
//         console.error("Words not found in the sentence");
//         return;
//       }

//       // leftPosition과 rightPosition 설정
//       const leftPosition = wordPositions[Math.min(index1, index2)];
//       const rightPosition = wordPositions[Math.max(index1, index2)];

//       setPositions({ left: leftPosition, right: rightPosition });
//     };

//     // 단어 요소들이 모두 렌더링된 후에 위치 측정
//     measurePositions();
//   }, [sentence, word1, word2]);

//   return (
//     <div className="relative flex flex-col items-center w-full p-10">
//       {/* 숨겨진 단어 요소들 */}
//       {/* <div className="absolute top-0 w-full h-0 overflow-hidden">
//         {sentence.split(" ").map((word, index) => (
//           <span
//             key={index}
//             ref={(el) => (wordsRef.current[index] = el)}
//             style={{
//               fontSize: "24px",
//               fontWeight: "lighter",
//               whiteSpace: "nowrap",
//             }}
//           >
//             {word}
//           </span>
//         ))}
//       </div> */}

//       {/* 화살표를 그리는 SVG */}
//       {/* <svg width="100%" height="80" className="absolute top-0">
//         <path
//           d={`
//             M ${positions.left} 60
//             Q ${positions.left} 30 ${positions.left + 25} 30
//             L ${positions.right - 25} 30
//             Q ${positions.right} 30 ${positions.right} 60
//           `}
//           stroke="darkblue"
//           strokeWidth="1"
//           fill="transparent"
//         />
//         <polygon
//           points={`${positions.left - 5},60 ${positions.left},70 ${positions.left + 5},60`}
//           fill="darkblue"
//         />
//         <polygon
//           points={`${positions.right - 5},60 ${positions.right},70 ${positions.right + 5},60`}
//           fill="darkblue"
//         />
//       </svg> */}

//       {/* 실제 문장 출력 */}
//       <p>{positions.left}</p>
//       <p>{positions.right}</p>
//       <p
//         style={{
//           fontSize: "24px",
//           fontWeight: "lighter",
//           whiteSpace: "nowrap",
//         }}
//       >
//         {sentence}
//       </p>
//     </div>
//   );
// };

// export default TextWithArrow;
import React, { useEffect, useRef, useState } from "react";

const TextWithArrow = ({ sentence, word1, word2 }) => {
  const [positions, setPositions] = useState({ left: 0, right: 0 });
  const wordsRef = useRef([]);

  useEffect(() => {
    const measurePositions = () => {
      const wordWidths = wordsRef.current.map((word, index) => {
        if (word) {
          const style = window.getComputedStyle(word);
          const width = parseFloat(style.width);
          const marginRight = parseFloat(style.marginRight) || 0;
          const letterSpacing = parseFloat(style.letterSpacing) || 0;
          const wordSpacing = parseFloat(style.wordSpacing) || 0;

          // 단어의 너비 + 공백 크기 포함
          // return width + marginRight + wordSpacing + letterSpacing;
          return width + marginRight + wordSpacing + letterSpacing;
        }
        return 0;
      });

      // 각 단어의 시작 위치를 계산
      const wordPositions = wordWidths.reduce((acc, width, index) => {
        const previousPosition = acc[index - 1] || 0;
        acc.push(previousPosition + width);
        return acc;
      }, []);

      const words = sentence.split(" ");
      const index1 = words.indexOf(word1);
      const index2 = words.indexOf(word2);

      if (index1 === -1 || index2 === -1) {
        console.error("Words not found in the sentence");
        return;
      }

      setPositions({
        left: wordPositions[index1] - wordWidths[index1] / 2, // 중앙 위치 보정
        right: wordPositions[index2] - wordWidths[index2] / 2, // 중앙 위치 보정
      });
    };

    setTimeout(measurePositions, 0); // DOM 업데이트 후 실행
  }, [sentence, word1, word2]);

  return (
    <div className="relative flex flex-col items-center w-full p-10">
      {/* 실제 문장 출력 */}
      <p>
        {word1} {positions.left}
      </p>
      <p>
        {word2} {positions.right}
      </p>
      <svg width="100%" height="80" className="absolute top-0">
        <path
          d={`
            M ${positions.left} 60
            Q ${positions.left} 30 ${positions.left + 25} 30
            L ${positions.right - 25} 30
            Q ${positions.right} 30 ${positions.right} 60
          `}
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
      {/* <p
        style={{
          fontSize: "24px",
          fontWeight: "lighter",
          whiteSpace: "nowrap",
        }}
      >{sentence}</p> */}
      <p
        style={{
          fontSize: "24px",
          fontWeight: "lighter",
          whiteSpace: "nowrap",
        }}
      >
        {sentence.split(" ").map((word, index) => (
          <span
            key={index}
            ref={(el) => (wordsRef.current[index] = el)}
            style={{ display: "inline-block", margin: "0 4px" }}
          >
            {word}
          </span>
        ))}
      </p>
    </div>
  );
};

export default TextWithArrow;
