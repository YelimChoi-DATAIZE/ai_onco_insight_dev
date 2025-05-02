# Node.js 이미지를 기반으로 설정
FROM node:alpine

# 작업 디렉토리 설정
WORKDIR /aiscopebackend

# Node.js 애플리케이션 파일 복사
COPY . .

# 의존성 설치 및 forever 글로벌 설치
RUN npm install --legacy-peer-deps

EXPOSE 3000

# nodemon 설치
RUN npm install -g nodemon

# 앱 실행
CMD ["npm", "run", "start:dev"]