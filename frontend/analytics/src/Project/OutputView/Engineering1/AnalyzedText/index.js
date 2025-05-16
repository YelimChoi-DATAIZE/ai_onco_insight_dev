import React, { useEffect, useRef, useState, useMemo } from 'react';
import Box from '@mui/material/Box';

const TextWithArrow = ({ sentence, words }) => {
  const [positions, setPositions] = useState([]);
  const wordsRef = useRef([]);
  const containerRef = useRef(null);

  const wrappedSentenceArray = useMemo(() => {
    const wordText = words.map((word) => word.text);
    const pattern = new RegExp(`(${wordText.join('|')})`, 'g');
    return sentence
      .replace(pattern, (match) => {
        return `<test>${match}<test>`;
      })
      .split('<test>')
      .map((part) => part.trim())
      .filter(Boolean);
  }, [words]);

  const targetArray = useMemo(() => {
    return words.reduce((acc, word) => {
      if (word.target) {
        word.target.forEach((target) => {
          acc.push({
            source: word.text,
            target: target.text,
            lineName: target.lineName,
            xOffset: target.xOffset,
          });
        });
      }
      return acc;
    }, []);
  }, [words]);

  useEffect(() => {
    const measurePositions = () => {
      setTimeout(() => {
        requestAnimationFrame(() => {
          if (!containerRef.current) return;

          const containerRect = containerRef.current.getBoundingClientRect();
          const wordSpans = containerRef.current.querySelectorAll('span');
          const positions = [];

          targetArray.forEach((target) => {
            const targetSpan1 = Array.from(wordSpans).find(
              (span) => span.textContent.trim() === target.source
            );

            const targetSpan2 = Array.from(wordSpans).find(
              (span) => span.textContent.trim() === target.target
            );

            if (!targetSpan1 || !targetSpan2) {
              return;
            }

            const rect1 = targetSpan1.getBoundingClientRect();
            const rect2 = targetSpan2.getBoundingClientRect();

            const startX =
              rect1.left + rect1.width / 2 - containerRect.left + (target.xOffset ?? 0);
            const endX = rect2.left + rect2.width / 2 - containerRect.left;

            const startY = rect1.top - containerRect.top;
            const endY = rect2.top - containerRect.top;
            const curve = Math.min(startY, endY) - 30;
            const midX = (startX + endX) / 2;

            positions.push({
              startX,
              startY,
              endX,
              endY,
              curve,
              midX,
              lineName: target.lineName,
            });
          });

          setPositions(positions);
        });
      }, 100);
    };

    measurePositions();
    window.addEventListener('resize', measurePositions);

    return () => {
      window.removeEventListener('resize', measurePositions);
    };
  }, [sentence, targetArray]);

  return (
    <>
      <Box
        ref={containerRef}
        sx={{
          width: '80%',
          backgroundColor: '#fff',
          padding: '50px 14px',
          fontSize: '14px',
          position: 'relative', // 부모 컨테이너를 relative로 설정
          minHeight: '200px', // SVG가 보일 수 있도록 최소 높이 설정
        }}
      >
        {positions.map((position, index) => {
          const r = 10;
          const path = `
                            M ${position.startX},${position.startY}
                            L ${position.startX},${position.curve + r}
                            Q ${position.startX},${position.curve} ${position.startX + (position.endX > position.startX ? r : -r)},${position.curve}
                            L ${position.endX + (position.endX > position.startX ? -r : r)},${position.curve}
                            Q ${position.endX},${position.curve} ${position.endX},${position.curve + r}
                            L ${position.endX},${position.endY}`;

          const textX = position.midX;
          const textY = (position.endY > position.startY ? position.startY : position.endY) - 30;

          const font = '14px Arial';
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          context.font = font;

          const measurement = context.measureText(position.lineName);
          const textWidth = measurement.width + 5;
          const textHeight = 20;
          const rectX = textX - textWidth / 2;
          const rectY = textY - textHeight / 2;

          return (
            <svg
              key={'svg' + index}
              width={containerRef.current?.offsetWidth || '100%'}
              height="100%"
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                overflow: 'visible',
                pointerEvents: 'none',
              }}
            >
              <defs>
                <path id={`connectorPath${index}`} d={path} />
                <marker
                  id={`arrowhead-start${index}`}
                  markerWidth="8"
                  markerHeight="6"
                  refX="4"
                  refY="3"
                  orient="0"
                >
                  <polygon points="0 6, 4 0, 8 6" fill="black" />
                </marker>
                <marker
                  id={`arrowhead-end${index}`}
                  markerWidth="8"
                  markerHeight="6"
                  refX="4"
                  refY="3"
                  orient="180"
                >
                  <polygon points="0 6, 4 0, 8 6" fill="black" />
                </marker>
                <marker
                  id={`arrowhead-middle${index}`}
                  markerWidth="8"
                  markerHeight="6"
                  refX="4"
                  refY="3"
                  orient={position.endX > position.startX ? '90' : '270'}
                >
                  <polygon points="0 6, 4 0, 8 6" fill="black" />
                </marker>
              </defs>
              <path
                d={path}
                stroke="black"
                fill="none"
                strokeWidth="1"
                markerStart={`url(#arrowhead-start${index})`}
                markerEnd={`url(#arrowhead-end${index})`}
              />

              <path
                d={`M ${position.startX},${position.startY}
                                  L ${position.startX},${position.curve + r}
                                  Q ${position.startX},${position.curve} ${position.startX + (position.endX > position.startX ? r : -r)},${position.curve}
                                  `}
                fill="transparent"
                stroke="black"
                markerEnd={`url(#arrowhead-middle${index})`} // 화살표 추가
              />

              <rect x={rectX} y={rectY} width={textWidth} height={textHeight} fill="white" />
              <text
                x={textX}
                y={textY}
                fill="black"
                fontSize="12"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {position.lineName}
              </text>
            </svg>
          );
        })}

        <div
          style={{
            fontSize: '14px',
            fontWeight: '400',
            whiteSpace: 'pre-line',
            wordBreak: 'break-word',
            textAlign: 'left',
            width: '100%',
            margin: 0,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '40px 0px',
          }}
        >
          {wrappedSentenceArray.map((word, index) => {
            const findWord = words.find((item) => item.text === word);
            return (
              <div key={'word' + index} className="px-1" style={{ lineHeight: 1.4 }}>
                <div>
                  <span
                    ref={(el) => {
                      if (el) wordsRef.current[index] = el;
                    }}
                    className="inline-block pt-1 pb-1.5"
                    style={{
                      textUnderlineOffset: '5px',
                      textDecoration: findWord
                        ? `underline 2px ${findWord?.underline?.[0]?.color || 'black'}`
                        : 'none',
                      fontWeight: findWord ? 'bold' : 'normal',
                      color: 'black',
                      ...(findWord?.underline?.[1]?.color && {
                        borderBottom: `2px solid ${findWord?.underline?.[1]?.color}`,
                      }),
                    }}
                  >
                    {word}
                  </span>
                </div>
                {findWord?.underline?.length > 0 && (
                  <div className="mt-1" style={{ lineHeight: 1.5 }}>
                    {findWord?.underline?.map((under, index) => (
                      <div key={'under' + index} className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full`}
                          style={{ backgroundColor: under.color }}
                        ></div>
                        <span
                          className="inline-block"
                          style={{
                            fontWeight: 'normal',
                            color: 'black',
                          }}
                        >
                          {under.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Box>
    </>
  );
};

export default TextWithArrow;
