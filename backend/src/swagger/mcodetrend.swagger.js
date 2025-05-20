/**
 * @swagger
 * tags:
 *   name: mCODETrend
 *   description: mCODE 기반 키워드 그래프 및 PubMed 연동 API
 */

/**
 * @swagger
 * /mcodetrend/mcodekg/read:
 *   get:
 *     summary: mCODE Knowledge Graph 조회
 *     tags: [mCODETrend]
 *     responses:
 *       200:
 *         description: mCODE KG 조회 성공
 */

/**
 * @swagger
 * /mcodetrend/pubmed/article/read:
 *   get:
 *     summary: PubMed 논문 검색
 *     tags: [mCODETrend]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: false
 *         schema:
 *           type: string
 *         description: 검색 키워드
 *     responses:
 *       200:
 *         description: PubMed 논문 목록 반환
 */

/**
 * @swagger
 * /mcodetrend/pubmed/keyword/read:
 *   get:
 *     summary: PubMed 키워드 추천
 *     tags: [mCODETrend]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: false
 *         schema:
 *           type: string
 *         description: 입력 키워드 기반 추천
 *     responses:
 *       200:
 *         description: 키워드 추천 결과 반환
 */

/**
 * @swagger
 * /mcodetrend/favorite/create:
 *   post:
 *     summary: mCODE 트렌드 즐겨찾기 생성
 *     tags: [mCODETrend]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               keyword:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: 즐겨찾기 등록 성공
 */
