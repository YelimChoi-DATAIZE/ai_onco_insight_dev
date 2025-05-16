export function convertToTextWithArrowFormat(cellText, entities) {
  const words = [];

  const tokens = cellText.split(/\s+/); // 공백 단위로 단어 분리
  tokens.forEach((token) => {
    const matched = entities.filter((e) => e.matched && e.text === token);

    if (matched.length > 0) {
      words.push({
        text: token,
        underline: matched.map((e) => ({
          text: `${e.category} (${e.text})`,
          color: getColorByCategory(e.category),
        })),
        target:
          matched.length > 1
            ? matched.map((e) => ({ text: e.text, lineName: 'Overlap' }))
            : undefined,
      });
    } else {
      words.push({ text: token });
    }
  });

  // xOffset 적용 (arrow 겹침 방지)
  const updatedWords = words.map((word) => {
    if (word.target && word.target.length > 1) {
      const total = word.target.length;
      const gap = 10;
      const mid = (total - 1) / 2;
      word.target = word.target.map((target, index) => ({
        ...target,
        xOffset: (index - mid) * gap,
      }));
    } else if (word.target) {
      word.target[0].xOffset = 0;
    }
    return word;
  });

  return {
    sentence: cellText,
    words: updatedWords,
  };
}

function getColorByCategory(category) {
  const colorMap = {
    Age: '#a3f4c1',
    Gender: '#e91b6d',
    Profession: '#4b7dff',
    Date: '#e91b6d',
    'Procedure name': '#4b7dff',
    'System organ site': '#4b7dff',
    'Time to procedure name': '#4b7dff',
    // ...원하면 더 추가
  };
  return colorMap[category] || '#ccc';
}
