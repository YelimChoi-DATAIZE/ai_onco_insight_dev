# Analytics 기능 명세서

## 개요

`frontend/analytics` 모듈은 사용자가 Excel/CSV 데이터를 업로드하고, 전처리 및 분석을 수행할 수 있도록 구성된 웹 기반 데이터 분석 도구입니다. 주요 구성요소는 파일 업로드, 동적 테이블 편집, 시각화, 엔티티 추출, 통계 분석 UI로 구성됩니다.

---

## 1. 📄 App.js

| 항목        | 설명                                                     |
| --------- | ------------------------------------------------------ |
| 주요 기능     | `/analytics` 라우트에 진입 시 전체 Analytics 페이지 구성 렌더링         |
| 주요 컴포넌트   | `<Menubar />`, `<ProjectBar />`, `<DataSheet />`       |
| 상태 관리     | 데이터 저장 (`data`), 사이드바 열림 여부, 탭 선택 상태 등                 |
| 데이터 저장 방식 | IndexedDB(`idb` 라이브러리 사용) - `AnalyticsDB.uploadedData` |
| 데이터 흐름    | `onUpload` 함수 → IndexedDB 저장 → setData → DataSheet 반영  |

---

## 2. 📊 Menubar

| 항목    | 설명                                            |
| ----- | --------------------------------------------- |
| 위치    | `frontend/analytics/src/Menubar/index.js`     |
| 주요 기능 | App 상단 고정형 메뉴바 (로고, 검색창, 알림, 계정 메뉴 포함)        |
| 서브 기능 | 반응형 UI 지원, Material UI `AppBar`, `Toolbar` 활용 |
| 인터랙션  | 알림, 프로필 드롭다운 메뉴, 모바일 대응 메뉴 렌더링 포함             |

---

## 3. 📁 ProjectBar

| 항목    | 설명                                           |
| ----- | -------------------------------------------- |
| 위치    | `frontend/analytics/src/ProjectBar/index.js` |
| 주요 기능 |                                              |

* 좌측 사이드바 열기/닫기 제어
* 데이터 파일 업로드 (Excel/CSV 지원)
* 그룹별 탭 전환 (DATA, ENGINEERING, ANALYSIS, RESULT)
* `RenderTabs` 호출 및 탭 상호작용 제어 |
  \| 파일 업로드 처리 |
* `FileReader` → `xlsx.read` 파싱
* 유효성 검사 (확장자, 크기 등)
* 부모 컴포넌트에 `{ headers, rows }` 형태로 전달 |
  \| 탭 그룹 | DATA, ENGINEERING, ANALYSIS, RESULT (버튼 그룹으로 전환) |

---

## 4. 📝 RenderTabs

| 항목       | 설명                                                           |
| -------- | ------------------------------------------------------------ |
| 위치       | `frontend/analytics/src/ProjectBar/component/RenderTabs.jsx` |
| 탭 그룹별 구성 |                                                              |

* `data`: Upload, Add Row, Add Column (파일 업로드 및 테이블 편집 기능)
* `engineering`: Comprehend, FOI Extraction, FHIR 매핑 등
* `analysis`: EDA, T-Test, ANOVA, Regression 등 통계 메뉴
* `result`: 커스텀 아이콘 그리드로 구성된 결과 탭 (big/small 분할) |
  \| 탭 이벤트 | 클릭 시 `handleTabChange(index)` 통해 `activeTab` 갱신 |

---

## 5. 📈 DataSheet

| 항목      | 설명                                                          |
| ------- | ----------------------------------------------------------- |
| 위치      | `frontend/analytics/src/DataSheet/index.js`                 |
| 주요 기능   | AG Grid로 테이블 출력 + 우측 출력 영역 뷰 렌더링                            |
| 상태 관리   | `columnDefs`, `rowData`, `selectedCellValue`, `activeTab` 등 |
| 추가 기능   | Add Row / Column 동적 지원, 셀 클릭 시 엔티티 분석 연동                    |
| 출력 뷰 종류 |                                                             |

* `Engineering1` (전체 추출 + 분석 결과)
* `Engineering2` (컬럼 선택 기반 추출)
* `Analysis1` (통계 분석 화면)
* `Result1~4` (시각화 결과) |

---

## 6. 🤖 Engineering1 (추출기)

| 항목 | 설명                                                        |
| -- | --------------------------------------------------------- |
| 위치 | `frontend/analytics/src/OutputView/Engineering1/index.js` |
| 기능 |                                                           |

* 셀 선택 시 해당 텍스트 분석 요청
* `POST /dataizeai_api/Result/` 호출 → AI 추출 결과 수신
* Tabs로 결과 분할: Entities, RxNorm, ICD-10, SNOMED CT
* ResultTable, ResultCard 구성 포함 |
  \| 결과 구성 | 분석된 Text 강조 표시, 엔티티 Table, 요약 카드 |

---

## 7. 🔬 Analysis1 (통계 분석)

| 항목     | 설명                                                     |
| ------ | ------------------------------------------------------ |
| 위치     | `frontend/analytics/src/OutputView/Analysis1/index.js` |
| 구성 요소  | TransferList, 변수 선택, 통계 옵션, 도표 옵션 (Accordion 기반)       |
| 분석 종류  | 평균, 분산, 표본수, 백분위수, 왜도/첨도, 정규성 검정 등                     |
| 시각화 옵션 | 히스토그램, 박스플롯, 막대그래프, Q-Q, 바이올린 등                        |
| UI 구성  | Accordion 기반 섹션, 각 항목 체크박스 + 텍스트필드 구성                  |

---

## 8. \u{1f6e0️} 시스템 저장소 구조

| 항목           | 설명                                            |
| ------------ | --------------------------------------------- |
| IndexedDB 이름 | `AnalyticsDB`                                 |
| 오브젝트 스토어     | `uploadedData`                                |
| 저장 형식        | `{ headers: [...], rows: [...] }` 형태의 JSON 객체 |

---

## 9. 📃 외부 API 목록

| API 경로                        | 설명                   |
| ----------------------------- | -------------------- |
| `POST /dataizeai_api/Result/` | 텍스트 기반 엔티티/코드 추출 API |

---

## 10. 📦 사용된 주요 라이브러리

* `ag-grid-react`: 테이블 시각화 및 인터랙션
* `@mui/material`: 전반적 UI 컴포넌트
* `xlsx`: Excel, CSV 파일 파싱
* `idb`: IndexedDB 접근 (indexedDB 활용 저장소 구성)
* `axios`: API 통신

---

필요 시 각 OutputView 탭별 명세서도 세분화하여 정리 가능합니다.
