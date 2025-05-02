import { mCODEKG } from "../../schemas/mcodekg.schema.js";

export const getAllmCODEKGHandler = async (req, res) => {
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
    const total = await mCODEKG.countDocuments(filter);
    const data = await mCODEKG.find(filter).skip(skip).limit(limit);

    // ✅ Profile name별 개수 계산
    const profileCounts = await mCODEKG.aggregate([
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
