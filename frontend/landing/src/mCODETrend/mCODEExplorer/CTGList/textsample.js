import React, { useState, useRef } from "react";
import { Search } from "lucide-react";

const HighlightSearch: React.FC = () => {
  const [selectedText, setSelectedText] = useState(null);  // ✅ 타입 선언 제거

  const [showIcon, setShowIcon] = useState(false);
  const [iconPosition, setIconPosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textRef = useRef(null);

  const handleMouseUp = (event: React.MouseEvent) => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();

    if (text && typeof text === "string") {  // ✅ 올바른 문자열 검사
      setSelectedText(text);

      // 선택한 영역의 위치를 가져와 아이콘 배치
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setIconPosition({ x: rect.right + 5, y: rect.top - 5 });
      setShowIcon(true);
    } else {
      setShowIcon(false);
    }
  };

  const handleIconClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="relative p-6">
      <div
        ref={textRef}
        onMouseUp={handleMouseUp}
        className="border p-4 rounded-lg shadow-md cursor-text"
      >
        <p>
          드래그 가능한 텍스트입니다. 일부 텍스트를 드래그하면 돋보기 아이콘이 나타납니다. 
          아이콘을 클릭하면 선택한 텍스트를 조회하는 팝업이 열립니다.
        </p>
      </div>

      {showIcon && (
        <Search
          className="absolute w-6 h-6 text-blue-500 cursor-pointer"
          style={{ top: `${iconPosition.y}px`, left: `${iconPosition.x}px` }}
          onClick={handleIconClick}
        />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">선택한 텍스트 조회</h2>
            <p className="text-gray-800">{selectedText}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={() => setIsModalOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HighlightSearch;
