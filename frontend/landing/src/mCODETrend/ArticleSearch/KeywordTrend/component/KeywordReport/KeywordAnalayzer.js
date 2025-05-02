// export default function generateBumpChartData(pubmedData, topN = 5) {
//   const keywordYearMap = {};

//   pubmedData.forEach((item) => {
//     const year = new Date(item.PubDate).getFullYear().toString();
//     const keywords = item.Keywords.split(";").map((kw) => kw.trim().toLowerCase());

//     keywords.forEach((kw) => {
//       if (!keywordYearMap[kw]) keywordYearMap[kw] = {};
//       if (!keywordYearMap[kw][year]) keywordYearMap[kw][year] = 0;
//       keywordYearMap[kw][year]++;
//     });
//   });

//   const allYears = [...new Set(pubmedData.map((d) => new Date(d.PubDate).getFullYear().toString()))].sort();

//   // 연도별 topN 키워드 선택 및 순위화
//   const rankByYear = {};
//   allYears.forEach((year) => {
//     const keywords = Object.entries(keywordYearMap)
//       .map(([kw, yearMap]) => ({ keyword: kw, count: yearMap[year] ?? 0 }))
//       .sort((a, b) => b.count - a.count)
//       .slice(0, topN)
//       .map((kw, index) => ({ ...kw, rank: index + 1 }));

//     rankByYear[year] = keywords;
//   });

//   // 키워드 기준 데이터 구조로 변환
//   const bumpData = [];
//   const keywordSet = new Set();

//   Object.values(rankByYear).forEach((yearRanks) => {
//     yearRanks.forEach((entry) => keywordSet.add(entry.keyword));
//   });

//   keywordSet.forEach((keyword) => {
//     const data = [];
//     allYears.forEach((year) => {
//       const found = rankByYear[year].find((r) => r.keyword === keyword);
//       if (found) {
//         data.push({ x: year, y: found.rank });
//       } else {
//         data.push({ x: year, y: null }); // gap 표시
//       }
//     });
//     bumpData.push({ id: keyword, data });
//   });

//   return bumpData;
// }

// KeywordAnalayzer.js

export default function generateBumpChartData(pubmedData, topN = 5) {
  const keywordYearMap = {};

  pubmedData.forEach((item) => {
    const year = new Date(item.PubDate).getFullYear().toString();
    const keywords = item.Keywords.split(";").map((kw) =>
      kw.trim().toLowerCase(),
    );

    keywords.forEach((kw) => {
      if (!keywordYearMap[kw]) keywordYearMap[kw] = {};
      if (!keywordYearMap[kw][year]) keywordYearMap[kw][year] = 0;
      keywordYearMap[kw][year]++;
    });
  });

  const allYears = [
    ...new Set(
      pubmedData.map((d) => new Date(d.PubDate).getFullYear().toString()),
    ),
  ].sort();

  const rankByYear = {};
  const topKeywordSet = new Set();
  const allKeywordSet = new Set();

  allYears.forEach((year) => {
    const rankedKeywords = Object.entries(keywordYearMap)
      .map(([kw, yearMap]) => {
        allKeywordSet.add(kw);
        return { keyword: kw, count: yearMap[year] ?? 0 };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, topN)
      .map((kw, index) => {
        topKeywordSet.add(kw.keyword);
        return { ...kw, rank: index + 1 };
      });

    rankByYear[year] = rankedKeywords;
  });

  const bumpData = [];
  topKeywordSet.forEach((keyword) => {
    const data = [];
    allYears.forEach((year) => {
      const found = rankByYear[year].find((r) => r.keyword === keyword);
      data.push({ x: year, y: found ? found.rank : null });
    });
    bumpData.push({ id: keyword, data });
  });

  return {
    bumpData,
    usedKeywords: Array.from(topKeywordSet),
    allKeywords: Array.from(allKeywordSet),
  };
}
