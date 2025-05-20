import axios from "axios";

export const getPubMedArticlesHandler = async (req, res) => {
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

// handlers/addFavoriteHandler.js
import { PubMedFavoriteModel } from "../../schemas/pubmed.favorite.schema.js";

export const addFavoriteHandler = async (req, res) => {
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
    const existing = await PubMedFavoriteModel.findOne({ userId, pmid });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "Already added to favorites." });
    }

    // 즐겨찾기 저장
    await PubMedFavoriteModel.create({ userId, pmid });

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
