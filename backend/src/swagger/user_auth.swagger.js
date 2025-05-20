/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 사용자 인증 및 프로필 API
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: 일반 회원가입
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               country:
 *                 type: string
 *               company:
 *                 type: string
 *               job:
 *                 type: string
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *       409:
 *         description: 이미 존재하는 이메일
 */

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: 일반 로그인
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 로그인 성공 및 토큰 반환
 *       401:
 *         description: 비밀번호 오류
 *       404:
 *         description: 사용자 없음
 */

/**
 * @swagger
 * /auth/google-signup:
 *   post:
 *     summary: 구글 회원가입
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               country:
 *                 type: string
 *               company:
 *                 type: string
 *               job:
 *                 type: string
 *     responses:
 *       200:
 *         description: 구글 회원가입 성공
 */

/**
 * @swagger
 * /auth/google-signin:
 *   post:
 *     summary: 구글 로그인
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token]
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: 로그인 성공 및 토큰 반환
 *       500:
 *         description: 인증 오류
 */

/**
 * @swagger
 * /auth/read/profile:
 *   get:
 *     summary: 사용자 프로필 조회
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 사용자 정보 반환
 *       401:
 *         description: 인증 실패
 */

/**
 * @swagger
 * /auth/update/profile:
 *   put:
 *     summary: 사용자 프로필 업데이트
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               profile_image:
 *                 type: string
 *               country:
 *                 type: string
 *               company:
 *                 type: string
 *               job:
 *                 type: string
 *     responses:
 *       200:
 *         description: 프로필 업데이트 성공
 *       401:
 *         description: 인증 실패
 */
