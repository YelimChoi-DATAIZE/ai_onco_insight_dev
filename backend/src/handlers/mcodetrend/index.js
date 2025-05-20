import { mCODETrendmCODEKGModel } from "../../schemas/mcodetrend_mcodekg.schema.js";
import { mcodeTrendPubmedKeywordModel } from "../../schemas/mcodetrend_pubmed_keywords.schema.js";
import { mCODETrendFavoritesModel } from "../../schemas/mcodetrend_favorite.schema.js";
import axios from "axios";

export const readmCODEKGHandler = async (req, res) => {
  try {
    // 📌 페이징 처리
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10000;
    const skip = (page - 1) * limit;

    // 📌 필터 & 검색 기능 추가
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, "i");
      filter.$or = [
        { ProfileName: searchRegex },
        { VSname: searchRegex },
        { Display: searchRegex },
      ];
    }
    8;
    // ✅ MongoDB에서 데이터 조회
    const total = await mCODETrendmCODEKGModel.countDocuments(filter);
    const data = await mCODETrendmCODEKGModel
      .find(filter)
      .skip(skip)
      .limit(limit);

    // ✅ Profile name별 개수 계산
    const profileCounts = await mCODETrendmCODEKGModel.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    const profileCountMap = profileCounts.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      total,
      page,
      limit,
      data,
      profileCounts: profileCountMap,
    });
  } catch (error) {
    console.error("❌ 데이터 조회 오류:", error);
    res.status(500).json({ success: false, error: "서버 오류" });
  }
};

export const readPubmedKeywordHandler = async (req, res) => {
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
    const total = await mcodeTrendPubmedKeywordModel.countDocuments(filter);
    const data = await mcodeTrendPubmedKeywordModel
      .find(filter, { _id: 0 }) // _id 제거
      .skip(skip)
      .limit(limit);

    // ✅ 연도별 PubDate 통계
    const yearCounts = await mcodeTrendPubmedKeywordModel.aggregate([
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

export const readPubmedArticleHandler = async (req, res) => {
  try {
    const keyword = req.query.keyword;

    if (!keyword) {
      return res
        .status(400)
        .json({ success: false, message: "Keyword is required." });
    }

    const searchResponse = await axios.get(
      "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi",
      {
        params: {
          db: "pubmed",
          term: keyword,
          retmode: "json",
          retmax: 3,
          // api_key: process.env.PUBMED_API_KEY,
        },
      },
    );

    const ids = searchResponse.data.esearchresult.idlist.join(",");

    if (!ids) {
      return res.status(200).json({ success: true, articles: [] });
    }

    const summaryResponse = await axios.get(
      "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi",
      {
        params: {
          db: "pubmed",
          id: ids,
          retmode: "json",
          // api_key: process.env.PUBMED_API_KEY,
        },
      },
    );

    const articles = Object.values(summaryResponse.data.result)
      .filter((article) => article.uid)
      .map((article) => ({
        uid: article.uid,
        title: article.title,
        source: article.source,
        authors: article.authors,
        pubdate: article.pubdate,
      }));

    res.status(200).json({ success: true, articles });
  } catch (error) {
    console.error("❌ PubMed API 요청 오류:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createmCODETrendFavoriteHandler = async (req, res) => {
  try {
    const { pmid } = req.body;

    if (!pmid) {
      return res
        .status(400)
        .json({ success: false, message: "PMID is required." });
    }

    const userId = req.user?.id;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized. No user found." });
    }

    // 이미 등록된 즐겨찾기인지 확인
    const existing = await mCODETrendFavoritesModel.findOne({ userId, pmid });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "Already added to favorites." });
    }

    // 즐겨찾기 저장
    await mCODETrendFavoritesModel.create({ userId, pmid });

    return res
      .status(201)
      .json({ success: true, message: "Favorite successfully added." });
  } catch (error) {
    console.error("❌ Add favorite error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Server error while saving favorite." });
  }
};
