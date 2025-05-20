/**
 * @swagger
 * tags:
 *   name: UserLog
 *   description: 사용자 행동 로그 기록 및 조회 API
 */

/**
 * @swagger
 * /userlog/create:
 *   post:
 *     summary: 사용자 로그 생성
 *     tags: [UserLog]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [project_id, action, target]
 *             properties:
 *               project_id:
 *                 type: string
 *               action:
 *                 type: string
 *                 enum: [submit_analysis, view_result, download, delete, edit]
 *               target:
 *                 type: string
 *                 enum: [ttest, anova, regression, descriptive, upload]
 *               data_asset_id:
 *                 type: string
 *               solution_instance_id:
 *                 type: string
 *               payload:
 *                 type: object
 *               result:
 *                 type: string
 *                 enum: [success, failed, timeout]
 *     responses:
 *       201:
 *         description: 로그 생성 성공
 *       400:
 *         description: 필수 값 누락
 */

/**
 * @swagger
 * /userlog/read:
 *   get:
 *     summary: 사용자 로그 목록 조회
 *     tags: [UserLog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: project_id
 *         schema:
 *           type: string
 *         required: false
 *         description: 특정 프로젝트의 로그만 조회
 *     responses:
 *       200:
 *         description: 로그 목록 반환
 */

/**
 * @swagger
 * /userlog/delete/{log_id}:
 *   delete:
 *     summary: 사용자 로그 삭제 (관리용)
 *     tags: [UserLog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: log_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 로그 삭제 성공
 *       404:
 *         description: 해당 로그 없음
 */
