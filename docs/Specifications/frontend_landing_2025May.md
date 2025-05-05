
# 📘 Research Idea & Design — 기능 명세서: `mCODE Trend`

- **페이지명**: `mCODE Trend`
- **폴더 위치**: `frontend/landing/src/mCODETrend/`
- **목적**:
  - 표준 종양 데이터 모델 **mCODE** 기반 핵심 개념 시각 탐색
  - 키워드 기반 **논문 및 임상시험** 연관 지식 검색 제공
  - 사용자 인터랙션 중심 **검색/시각화/트렌드 분석** 기능 제공

---

## 모듈별 상세 설계

### 🔎 1. SearchBar

| 항목             | 설명                                                                 |
|------------------|----------------------------------------------------------------------|
| 위치             | `mCODEExplorer/SearchBar/index.js`                                   |
| 주요 기능        | 키워드 입력 후 `/mcodesearch?query=` 로 이동                         |
| 입력 형태        | 텍스트 입력 필드 + 검색 아이콘 버튼                                   |
| UX 요소          | 자동완성 비활성화, 반응형 너비 지원                                   |
| 사용 라이브러리  | `@mui/material`, `react-router-dom` (`useNavigate`)                  |

---

### 🧭 2. MCODETrendMap (노드 시각화)

| 항목             | 설명                                                                 |
|------------------|----------------------------------------------------------------------|
| 위치             | `mCODETrend/mCODETrendMap/index.js`                                  |
| 기술 스택        | `@xyflow/react` (React Flow 12 이상)                                 |
| 주요 기능        | - mCODE 구성요소를 노드로 시각화<br/>- 노드 클릭 시 확장 및 키워드 표시<br/>- `/mcodesearch?query=`로 라우팅 |
| 노드 스타일링    | 배경색 및 테두리색 그룹 구분 (예: `Disease`, `Genomics`, `Outcome`) |

---

### 📋 3. SearchResult (검색 결과 페이지)

| 항목             | 설명                                                                 |
|------------------|----------------------------------------------------------------------|
| 위치             | `mCODEExplorer/SearchResult/index.js`                                |
| 주요 기능        | - `query` 기반 mCODE KG 검색<br/>- AG Grid 기반 테이블 출력<br/>- 그룹별 카운트 시각화<br/>- 페이지네이션 / 페이지 크기 조절 |
| 외부 API         | `GET /mcodekg?search=xxx`                                            |
| 사용 라이브러리  | `ag-grid-react`, `@mui/material`, `axios`                            |

---

### 🤖 4. HybridRAGLayout (논문 대화형 검색)

| 항목             | 설명                                                                 |
|------------------|----------------------------------------------------------------------|
| 위치             | `ArticleSearch/index.js`                                             |
| 주요 구성        | - 좌측: 최근 검색어, 즐겨찾기 논문<br/>- 중앙: `<ChatBox />`<br/>- 우측: `<KeywordTrend />` |
| 외부 API         | `GET /dataizeai_api/AdvancedPubSearch?query=xxx`                     |
| 기타 기능        | - 검색 히스토리 관리<br/>- 즐겨찾기 논문 관리(LocalStorage)<br/>- GPT RAG 응답 및 타이핑 효과 |

---

### 📈 5. KeywordTrend (키워드 트렌드 시각화)

| 항목             | 설명                                                                 |
|------------------|----------------------------------------------------------------------|
| 위치             | `ArticleSearch/KeywordTrend/index.js`                                |
| 기능 목적        | PubMed 기반 키워드 연도별 순위 분석                                  |
| 시각화 구성      | `@nivo/bump` 라이브러리 사용한 Bump Chart                            |
| API 연동         | `GET /cancerkeywords?keywords=xxx`                                   |
| 로직 요약        | - 연도별 keyword count 집계<br/>- Top-N 키워드만 시각화<br/>- 미사용 키워드는 `Other Keywords` 표시 |

---

## 🔗 외부 API 명세

| API 경로                                         | 설명                     |
|--------------------------------------------------|--------------------------|
| `/mcodekg?search={keyword}`                      | mCODE KG 검색            |
| `/cancerkeywords?keywords=kw1,kw2`               | 키워드별 연도별 등장 횟수 |
| `/dataizeai_api/AdvancedPubSearch?query=xxx`     | PubMed RAG 논문 검색     |

---

## 🧩 사용된 주요 라이브러리

| 라이브러리           | 용도                      |
|----------------------|---------------------------|
| `@xyflow/react`      | mCODE 노드 맵 시각화        |
| `ag-grid-react`      | 검색 결과 테이블 구성       |
| `@nivo/bump`         | 키워드 트렌드 분석 차트     |
| `@mui/material`      | 전반적인 UI 컴포넌트 구성   |
| `axios`              | REST API 호출              |
| `react-router-dom`   | 라우팅 및 URL 파라미터 핸들링 |




# 5/5 mCODE Trend 배포를 위해 개발/마무리해야 하는 것

1. 로그인/회원가입 --> creative tim과 기존 견적문의 기반
-- 이메일 인증은 내일하고
비밀번호 검증
직군 정보 추가


2. 즐겨찾기는 로그인 한 사람만 가능(비회원시, 즐겨찾기 추가 안됨)
3. DB에 회원별 검색 내역 + 즐겨찾기 내용 추가
4. 운영서버 API 연동/ WAS 서버 이관
5. 논문 검색엔진/키워드 검색엔진 버전관리 -> 현진 pubmed v2/v3차이


