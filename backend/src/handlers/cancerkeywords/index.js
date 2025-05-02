import { cancer_pubmed_keywords } from "../../schemas/cancer_pubmed_keywords.schema.js";

export const getPubmedKeywordDataHandler = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10000;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.keywords) {
      const keywordList = req.query.keywords
        .split(",")
        .map((kw) => kw.trim().toLowerCase());

      filter.$or = keywordList.map((kw) => ({
        Keywords: { $regex: kw, $options: "i" }, // 대소문자 구분 없는 정규식 검색
      }));
    }

    // ✅ 데이터 조회 (MongoDB 숫자, 날짜, 문자열 정상 처리)
    const total = await cancer_pubmed_keywords.countDocuments(filter);
    const data = await cancer_pubmed_keywords
      .find(filter, { _id: 0 }) // _id 제거
      .skip(skip)
      .limit(limit);

    // ✅ 연도별 PubDate 통계
    const yearCounts = await cancer_pubmed_keywords.aggregate([
      { $match: filter },
      {
        $group: {
          _id: { $substr: ["$PubDate", 0, 4] },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const yearCountMap = yearCounts.reduce((acc, cur) => {
      acc[cur._id] = cur.count;
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      total,
      page,
      limit,
      data,
      yearDistribution: yearCountMap,
    });
  } catch (error) {
    console.error("❌ PubMed 키워드 조회 오류:", error);
    res.status(500).json({ success: false, error: "서버 오류" });
  }
};
