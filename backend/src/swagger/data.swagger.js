/**
 * @swagger
 * tags:
 *   name: Data
 *   description: 데이터 메타데이터 및 파일 관리 API
 */

/**
 * @swagger
 * /api/data/metadata/create:
 *   post:
 *     summary: 메타데이터 생성
 *     tags: [Data]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [asset_id, user_id, file_name, uri, data_storage_config]
 *             properties:
 *               asset_id:
 *                 type: string
 *               user_id:
 *                 type: string
 *               file_name:
 *                 type: string
 *               uri:
 *                 type: string
 *               data_storage_config:
 *                 type: object
 *               project_id:
 *                 type: string
 *               version:
 *                 type: string
 *               row_count:
 *                 type: number
 *               column_count:
 *                 type: number
 *     responses:
 *       201:
 *         description: 생성 성공
 */

/**
 * @swagger
 * /data/metadata/read/{asset_id}:
 *   get:
 *     summary: 특정 asset_id로 메타데이터 조회
 *     tags: [Data]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: asset_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 조회 성공
 */

/**
 * @swagger
 * /data/metadata/update/{asset_id}:
 *   put:
 *     summary: 메타데이터 업데이트
 *     tags: [Data]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: asset_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: 업데이트 성공
 */

/**
 * @swagger
 * /data/metadata/delete/{asset_id}:
 *   delete:
 *     summary: 메타데이터 삭제 (soft delete)
 *     tags: [Data]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: asset_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 삭제 완료
 */

/**
 * @swagger
 * /data/dataasset/create:
 *   post:
 *     summary: S3에 파일 업로드 및 메타데이터 생성
 *     tags: [Data]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               project_id:
 *                 type: string
 *               version:
 *                 type: string
 *               version_description:
 *                 type: string
 *               row_count:
 *                 type: number
 *               column_count:
 *                 type: number
 *     responses:
 *       201:
 *         description: 업로드 성공
 */

/**
 * @swagger
 * /data/dataasset/read/{asset_id}:
 *   get:
 *     summary: S3에 저장된 파일 내용 조회
 *     tags: [Data]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: asset_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 파일 내용 반환 (CSV/JSON)
 */
