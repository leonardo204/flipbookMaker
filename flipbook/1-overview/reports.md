# Reports

> **경로**: 1. Overview > Reports
> **원본 ID**: `yp0fjk`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=yp0fjk)

## 목적

디바이스 로그, 통계 리포트, 장애(Failure) 리포트를 탭별로 조회하고 Excel 파일로 다운로드할 수 있는 화면이다. 운영자가 기간별 디바이스 현황 데이터를 체계적으로 관리하고 분석하도록 지원한다.

## 진입 경로

- 좌측 사이드 내비게이션 > Overview > Reports 선택 시

## 화면 구성

### 1.4 Report

![1.4 Report](./reports.1-4.png)

### 1. 카테고리 탭

| 탭 | 표시 정보 | 설명 |
|----|-----------|------|
| **Log** | 디바이스 로그 목록 | SAID 기반 검색. 디바이스별 로그 파일 다운로드 |
| **Report** | 통계 리포트 목록 | 리포트 타입별(Daily/Weekly/Monthly) 필터링 및 다운로드 |
| **Failure** | 장애 리포트 목록 | 리포트 타입별(Daily/Weekly/Monthly) 필터링 및 다운로드 |

탭 선택에 따라 하위 정보 표시가 변경됨.

---

### 1.3.1 Log 탭

![1.3.1 Log tab](./reports.1-3-1.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 검색 | 검색 박스 | 플레이스홀더: "Enter SAID". SAID 기반 검색 결과 표시 |
| 검색 | [Search] 버튼 | 입력한 SAID로 검색 실행 |
| 검색 | [Refresh] 버튼 | 검색 조건 및 목록 초기화 (기본값으로 복원) |
| 기간 | 기간 선택 옵션 | 선택 기간에 따라 테이블 업데이트 (예: 2022.12.30 - 2023.01.05). 통계 관리 공통 정책(Calendar Policy) 참고 |
| 목록 | 로그 목록 테이블 | No., SAID, File type, Report time, Download 표시 |
| 목록 | SAID 마스킹 | 11자리 식별자, 뒤 3자리 마스킹 (예: 12345678***) |
| 목록 | Report Time 형식 | `YYYY-MM-DD HH:MM` (24시간제) |
| 목록 | [Download] 버튼 | 행 단위로 Excel 파일 다운로드 |
| 페이지 | 페이지네이션 | 15 lines / 《 〈 1 2 3 … 10 〉 》 |
| 버튼 | [Help] 버튼 | 선택 시 Help 팝업 표시 |

#### 다운로드 Excel 파일 포함 필드 (Log 탭)

| 필드 | 설명 |
|------|------|
| SAID | 디바이스 식별자 |
| MAC | MAC 주소 |
| Model | 디바이스 모델 |
| OS | 운영체제 |
| F/W Version | 펌웨어 버전 |
| Screen Time | 화면 사용 시간 |
| Last Online Time | 마지막 온라인 시간 |
| Network Type | 네트워크 유형 |
| App Top1 | 사용 시간 1위 앱 |
| App Top2 | 사용 시간 2위 앱 |
| App Top3 | 사용 시간 3위 앱 |

---

### 1.3.2 Report 탭

![1.3.2 Report tab](./reports.1-3-2.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 필터 | Report Type 옵션 | 유형 선택 창 표시. 선택 가능 옵션: Daily / Weekly / Monthly |
| 필터 | [Refresh] 버튼 | 필터 및 목록을 기본값으로 초기화 |
| 기간 | 기간 선택 옵션 | 선택 기간에 따라 테이블 업데이트 (통계 관리 공통 정책(Calendar Policy) 참고) |
| 목록 | 리포트 목록 테이블 | No., Report time, Report type, Device count, Download 표시 |
| 목록 | [Download] 버튼 | 행 단위로 Excel 파일 다운로드 |
| 페이지 | 페이지네이션 | 15 lines / 《 〈 1 2 3 … 10 〉 》 |
| 버튼 | [Help] 버튼 | 선택 시 Help 팝업 표시 |

#### Report time 표시 형식

| Report Type | 형식 |
|-------------|------|
| Daily | `YYYY-MM-DD` |
| Weekly | `YYYY-MM-DD ~ YYYY-MM-DD` |
| Monthly | `YYYY-MM-DD ~ YYYY-MM-DD` |

#### 다운로드 Excel 파일 포함 필드 (Report 탭)

Log 탭과 동일: SAID, MAC, Model, OS, F/W Version, Screen Time, Last Online Time, Network Type, App Top1, App Top2, App Top3

---

### 1.3.3 Failure 탭

![1.3.3 Failure tab](./reports.1-3-3.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 필터 | Report Type 옵션 | 유형 선택 창 표시. 선택 가능 옵션: Daily / Weekly / Monthly |
| 필터 | [Refresh] 버튼 | 필터 및 목록을 기본값으로 초기화 |
| 기간 | 기간 선택 옵션 | 선택 기간에 따라 테이블 업데이트 |
| 목록 | 장애 목록 테이블 | No., Report time, Report type, Device count, Download 표시 |
| 목록 | [Download] 버튼 | 행 단위로 Excel 파일 다운로드 |
| 페이지 | 페이지네이션 | 15 lines / 《 〈 1 2 3 … 10 〉 》 |
| 버튼 | [Help] 버튼 | 선택 시 Help 팝업 표시 |

#### Report time 표시 형식

Report 탭과 동일: Daily(`YYYY-MM-DD`), Weekly/Monthly(`YYYY-MM-DD ~ YYYY-MM-DD`)

#### 다운로드 Excel 파일 포함 필드 (Failure 탭)

Report 탭과 동일: SAID, MAC, Model, OS, F/W Version, Screen Time, Last Online Time, Network Type, App Top1, App Top2, App Top3

---

### 1.3.4 Help 팝업 (Overview > Report Guide)

[Help] 버튼 선택 시 표시되는 가이드 팝업:

| 영역 | 내용 |
|------|------|
| 제목 | "Overview>Report" guide |
| 내용 | 각 탭(Log, Report, Failure)의 기능 안내 텍스트 표시 |
| 스크롤 | 내용이 영역을 초과하면 스크롤바 표시 |
| [Close] 버튼 | 선택 시 가이드 텍스트 팝업 닫기 |

#### Help 팝업 가이드 내용

**1. Search**
- Log tab: SAID로 검색 가능하며, 날짜 기준 정렬 가능
- Report / Failure tab: Report Type (Daily / Weekly / Monthly)으로 테이블 조회 가능하며, 날짜 기준 정렬 가능

**2. Log tab**

디바이스 로그 관련 리포트 데이터를 표시. 표시 정보: SAID, File Type, Report Time, Download. Download 버튼 클릭 시 Excel 파일 다운로드. 다운로드 파일 포함 필드: SAID, MAC, Model, OS, F/W Version, Screen Time, Last Online Time, Network Type, App Top1, App Top2, App Top3

**3. Report / Failure tab**

리포트 및 장애 분석용 데이터를 표시. 표시 정보: Report Time, Report Type (Daily / Weekly / Monthly), Device Count, Download. Download 버튼 클릭 시 Excel 파일 다운로드. 다운로드 파일 포함 필드: SAID, MAC, Model, OS, F/W Version, Screen Time, Last Online Time, Network Type, App Top1, App Top2, App Top3

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| Log 탭 클릭 | Log 탭으로 전환 | Log 목록 (No., SAID, File type, Report time, Download) 표시. SAID 검색 박스 활성화 |
| Report 탭 클릭 | Report 탭으로 전환 | Report 목록 (No., Report time, Report type, Device count, Download) 표시. Report Type 필터 활성화 |
| Failure 탭 클릭 | Failure 탭으로 전환 | Failure 목록 (No., Report time, Report type, Device count, Download) 표시. Report Type 필터 활성화 |
| SAID 입력 후 [Search] 클릭 (Log 탭) | SAID 기반 검색 실행 | 입력한 SAID에 해당하는 로그 목록 표시 |
| [Refresh] 버튼 클릭 | 필터 및 목록 초기화 | 검색/필터 조건 초기화 및 기본 목록 복원 |
| 기간 변경 | 테이블 업데이트 | 선택 기간에 해당하는 데이터로 갱신 |
| Report Type 옵션 선택 (Report/Failure 탭) | 리포트 타입별 필터링 | Daily / Weekly / Monthly 중 선택한 타입의 리포트 목록만 표시 |
| [Download] 버튼 클릭 | Excel 파일 다운로드 | 해당 행의 리포트 데이터를 Excel 파일로 다운로드 |
| [Help] 버튼 클릭 | Help 팝업 표시 | Overview > Report 가이드 텍스트 팝업 표시 |
| Help 팝업 [Close] 버튼 클릭 | 팝업 닫기 | 가이드 팝업 닫힘 |
| 페이지네이션 클릭 | 페이지 이동 | 선택한 페이지의 데이터 표시 |

## 상태 / 분기

- **탭별 검색 방식 분기**:
  - Log 탭: SAID 텍스트 입력 검색
  - Report / Failure 탭: Report Type(Daily/Weekly/Monthly) 드롭다운 필터
- **SAID 마스킹 (Log 탭)**: 11자리 식별자, 뒤 3자리 마스킹 (예: 12345678***)
- **Report Time 형식 분기**:
  - Daily: `YYYY-MM-DD`
  - Weekly: `YYYY-MM-DD ~ YYYY-MM-DD`
  - Monthly: `YYYY-MM-DD ~ YYYY-MM-DD`
- **Help 팝업 스크롤**: 내용이 영역을 초과하면 스크롤바 자동 표시

## 연결된 화면

- [Dashboard 1-depth](./dashboard-1-depth.md) — 좌측 내비게이션 Overview > Dashboard
- [Quick Operation](./quick-operation.md) — 좌측 내비게이션 Overview > Quick Operation

## 비고

- **업데이트 이력**:
  - 2026.03.26: 1.3.1 Log tab — Device ID → SAID 변경
  - 2026.04.24: SAID 뒤 3자리 마스킹 정책 추가
- 다운로드 Excel 파일 포함 필드는 Log / Report / Failure 탭 모두 동일: SAID, MAC, Model, OS, F/W Version, Screen Time, Last Online Time, Network Type, App Top1, App Top2, App Top3
- 탭은 Log / Report / Failure 3개로 구성되며, Report와 Failure 탭은 동일한 구조(컬럼, 필터, 다운로드 방식)를 공유함
