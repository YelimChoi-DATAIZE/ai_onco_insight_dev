export default function generateBumpChartData(
  pubmedData,
  topN = 10,
  offset = 0,
) {
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

  const keywordTotalCounts = Object.entries(keywordYearMap).map(
    ([kw, yearlyMap]) => ({
      keyword: kw,
      totalCount: Object.values(yearlyMap).reduce((a, b) => a + b, 0),
    }),
  );

  const slicedKeywords = keywordTotalCounts
    .sort((a, b) => b.totalCount - a.totalCount)
    .slice(offset, offset + topN)
    .map((item) => item.keyword);

  const bumpData = slicedKeywords.map((keyword) => {
    const dataPoints = allYears
      .map((year) => {
        const count = keywordYearMap[keyword]?.[year] || 0;
        return count > 0 ? { x: year, y: count } : null;
      })
      .filter(Boolean); // ❗ y가 없는 경우 제거

    return { id: keyword, data: dataPoints };
  });

  return {
    bumpData,
    usedKeywords: slicedKeywords,
    allKeywords: Object.keys(keywordYearMap),
  };
}
