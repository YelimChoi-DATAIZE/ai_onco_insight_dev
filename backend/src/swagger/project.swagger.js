/**
 * @swagger
 * tags:
 *   name: Project
 *   description: 프로젝트 메타데이터 관리 API
 */

/**
 * @swagger
 * /project/create:
 *   post:
 *     summary: 새로운 프로젝트 생성
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [projectId, projectName]
 *             properties:
 *               projectId:
 *                 type: string
 *                 description: 클라이언트 생성 UUID 또는 임의 ID
 *               projectName:
 *                 type: string
 *     responses:
 *       201:
 *         description: 프로젝트 생성 성공
 */

/**
 * @swagger
 * /project/read/{projectId}:
 *   get:
 *     summary: 특정 프로젝트 조회
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 프로젝트 조회 성공
 *       404:
 *         description: 프로젝트 없음
 */

/**
 * @swagger
 * /project/update/{projectId}:
 *   put:
 *     summary: 프로젝트 이름 수정
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [projectName]
 *             properties:
 *               projectName:
 *                 type: string
 *     responses:
 *       200:
 *         description: 프로젝트 수정 성공
 *       404:
 *         description: 수정 대상 없음
 */

/**
 * @swagger
 * /project/delete/{projectId}:
 *   delete:
 *     summary: 프로젝트 삭제
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 삭제 성공
 *       404:
 *         description: 삭제 대상 없음
 */

/**
 * @swagger
 * /project/list/read:
 *   get:
 *     summary: 사용자별 프로젝트 목록 조회
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 프로젝트 목록 반환
 */
