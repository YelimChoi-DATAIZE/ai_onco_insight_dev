import { ProjectMetaModel } from '../../schemas/projectmetaData.schema.js';
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';

export const saveToGridFsHandler = async (req, res) => {
    try {
      const { projectName, filename } = req.body;
      const headers = JSON.parse(req.body.headers || '[]');
      const rows = JSON.parse(req.body.rows || '[]');
  
      // 유효성 검사
      if (!projectName || !headers.length || !rows.length) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const db = mongoose.connection.db;
      const gfs = new GridFSBucket(db, { bucketName: 'projectDataFiles' });
  
      // 기존 메타 정보 확인 및 기존 파일 삭제
      const existing = await ProjectMetaModel.findOne({ projectName });
      if (existing?.fileId) {
        try {
          await gfs.delete(existing.fileId);
        } catch (err) {
          console.warn('[GridFS] 기존 파일 삭제 실패:', err.message);
        }
      }
  
      // JSON 데이터 버퍼로 변환
      const buffer = Buffer.from(JSON.stringify({ headers, rows }), 'utf-8');
  
      // GridFS 업로드 스트림
      const uploadStream = gfs.openUploadStream(`${projectName}-${Date.now()}.json`, {
        contentType: 'application/json',
      });
  
      // 파일 쓰기 시작
      uploadStream.end(buffer);
  
      // 저장 완료 시점에 메타데이터 upsert
      uploadStream.on('finish', async () => {
        try {
          await ProjectMetaModel.findOneAndUpdate(
            { projectName },
            {
              filename,
              fileId: uploadStream.id, // ✅ 여기서 id 접근 가능
              updatedAt: new Date(),
            },
            { upsert: true, new: true }
          );
  
          res.status(200).json({
            message: 'Saved to GridFS successfully',
            fileId: uploadStream.id,
          });
        } catch (metaErr) {
          console.error('[Meta Save Error]', metaErr);
          res.status(500).json({ message: 'Failed to save metadata' });
        }
      });
  
      uploadStream.on('error', (err) => {
        console.error('[GridFS Upload Error]', err);
        res.status(500).json({ message: 'Failed to upload to GridFS' });
      });
    } catch (err) {
      console.error('[GridFS Save Handler Error]', err);
      res.status(500).json({ message: 'Server error while saving to GridFS' });
    }
  };