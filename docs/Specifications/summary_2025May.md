
---

## ai_onco_insight 전체 통합 기능 명세

| 기능 ID | 기능명              | 설명                                 | 입력 / 출력                        | 사용 라이브러리                                     | 위치 또는 모듈                                                     |
| ----- | ---------------- | ---------------------------------- | ------------------------------ | -------------------------------------------- | ------------------------------------------------------------ |
| A-001 | App 라우팅          | `/analytics` 라우팅 → 전체 구성 로드        | -                              | react-router-dom                             | `frontend/analytics/src/App.js`                              |
| A-002 | 상단 메뉴바           | 로고, 검색창, 알림, 계정 프로필 등 렌더링          | -                              | @mui/material                                | `frontend/analytics/src/Menubar/index.js`                    |
| A-003 | ProjectBar 구성    | 사이드바 제어 + 파일 업로드 + 탭 라우팅           | 업로드 파일 / 상태 갱신                 | @mui/material, xlsx                          | `frontend/analytics/src/ProjectBar/index.js`                 |
| A-004 | 탭 구성 및 처리        | DATA/ENGINEERING/ANALYSIS 탭 제어     | 탭 선택 / 탭 컴포넌트 렌더링              | @mui/material Tabs                           | `frontend/analytics/src/ProjectBar/component/RenderTabs.jsx` |
| A-005 | AG Grid 데이터 테이블  | 업로드된 데이터를 테이블로 출력 및 셀 선택           | headers, rows / 테이블 렌더링        | ag-grid-react                                | `frontend/analytics/src/DataSheet/index.js`                  |
| A-006 | 셀 데이터 추출         | 셀 클릭 시 LLM 기반 개체 추출 실행             | message / 분석 결과                | axios, Express API                           | `frontend/analytics/src/OutputView/Engineering1/index.js`    |
| A-007 | 통계 분석 UI         | 변수 이동 및 기술 통계 기능 UI 구성             | 선택된 변수 / 사용자 선택 값              | @mui/material, TransferList                  | `frontend/analytics/src/OutputView/Analysis1/index.js`       |
| M-001 | 검색 바 구성          | 키워드 입력 후 `/mcodesearch?query=`로 이동 | 검색어 / 검색 페이지 이동                | @mui/material                                | `mCODEExplorer/SearchBar/index.js`                           |
| M-002 | mCODE Trend 노드 맵 | React Flow 기반 mCODE 노드 시각화         | 노드 클릭 / 탐색 이동                  | @xyflow/react                                | `mCODETrend/mCODETrendMap/index.js`                          |
| M-003 | mCODE Search 결과  | AG Grid 기반 mCODE KG 검색 결과 시각화      | query / mCODE 결과               | ag-grid-react, axios                         | `mCODEExplorer/SearchResult/index.js`                        |
| M-004 | HybridRAG 논문 검색  | Chat 기반 논문 검색 + 즐겨찾기 기능 포함         | query / GPT 응답 및 논문 카드         | axios, LocalStorage                          | `ArticleSearch/index.js`                                     |
| M-005 | 키워드 트렌드 시각화      | 키워드 연도별 순위 분석 시각화                  | keywords / bump chart          | @nivo/bump, axios                            | `ArticleSearch/KeywordTrend/index.js`                        |
| B-001 | Basic 회원가입       | 이메일/비밀번호로 사용자 등록 (bcrypt 적용)       | 회원정보 / 가입 결과                   | bcrypt, express-validator                    | `backend/routes/auth/basic.js`                               |
| B-002 | Basic 로그인        | 로그인 시 JWT 발급 및 사용자 인증 처리           | 이메일/비번 / JWT, 사용자 정보           | JWT, bcrypt                                  | `backend/routes/auth/basic.js`                               |
| B-003 | Google OAuth 인증  | Google OAuth access token으로 사용자 인증 | access\_token / 사용자 정보         | @react-oauth/google, Google API              | `backend/routes/auth/google.js`                              |
| B-004 | Google 회원가입      | 구글 사용자 정보로 Mongo 사용자 생성            | 이름, 이메일, 기관 등                  | Google OAuth + MongoDB                       | `backend/routes/auth/google.js`                              |
| B-005 | PubMed 키워드 검색    | 키워드 기반 PubMed 논문 연도별 집계            | keywords / 연도별 count           | Mongo Aggregation, Express                   | `backend/routes/pubmed.js`                                   |
| B-006 | mCODE KG 검색      | search term 기반 정규식 필터 및 분류 카운트     | 검색어 / KG 결과 목록                 | Mongo Regex + Aggregation                    | `backend/routes/mcode.js`                                    |
| B-007 | AI 텍스트 분석 (단일)   | 단일 텍스트에 대해 mCODE 7개 항목 추출 (LLM 호출) | message / 항목별 추출 결과            | FastAPI + GPT-4o                             | `backend/main.py (/TMTP ~ /RP)`                              |
| B-008 | AI 텍스트 분석 (통합)   | 7개 항목 API 병렬 호출 및 JSON 통합 파싱       | message / 통합된 추출 JSON          | FastAPI + asyncio + OpenAI                   | `backend/main.py (/Result)`                                  |
| B-009 | PubMed RAG 벡터 검색 | 임베딩 기반 벡터 검색 (e5 모델 사용)            | query / 유사 논문 목록               | pymongo vectorSearch + sentence-transformers | `backend/main.py (/AdvancedPubSearch)`                       |
| B-010 | RAG 응답 생성        | 유사 논문 기반 Mistral7B 응답 생성           | query / GPT 응답 + 논문 context    | AWS Bedrock, boto3                           | `backend/main.py (/pubmed_vector_search)`                    |
| B-011 | PDF 번역 업로드       | PDF 업로드 후 CLI 기반 다국어 번역 실행         | 파일 + source/target\_lang / 파일명 | pdf2zh, subprocess                           | `backend/main.py (/translate)`                               |
| B-012 | PDF 번역 결과 다운로드   | 번역된 PDF 파일을 클라이언트에 제공              | 파일명 / PDF 다운로드                 | FastAPI FileResponse                         | `backend/main.py (/download)`                                |

---
