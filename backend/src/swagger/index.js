// src/swagger/index.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DATAIZE API Docs',
      version: '1.0.0',
      description: 'API documentation for DATAIZE data platform',
    },
    servers: [
      {
        url: 'http://localhost:8000', // 실제 배포 서버 주소
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  // ✅ 현재 index.js 기준 상대경로로 작성
  apis: [path.join(__dirname, '*.swagger.js')],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
