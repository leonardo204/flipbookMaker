# VOC Devices (VOC Center)

> **경로**: 3. VOC Center for Agent > VOC Devices
> **원본 ID**: `hnok3a`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=hnok3a)

![3.1 VOC Devices](./voc-devices.3-1.png)

## 목적

상담원(Agent)이 자신이 처리한 VOC(고객 불만 접수) 케이스를 조회하고, 새로운 VOC 세션을 시작하기 위한 화면이다. My VOC Overview를 통해 처리 통계를 확인하고, My VOC History 목록에서 과거 케이스를 검색·열람할 수 있다.

## 진입 경로

- GNB(좌측 메뉴) > VOC Center > VOC Devices

## 화면 구성

![3.1.1 VOC Devices](./voc-devices.3-1-1.png)

### 1. 기간 선택 (Period Options)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 기간 필터 | 날짜 범위 선택 | 선택한 기간에 따라 My VOC Overview 차트와 My VOC History 데이터가 업데이트됨. 공통 정책은 Policy 3. Statistics Management_Common Policy 참조 |

### 2. My VOC Overview

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 헤더 | 제목 | "VOC Overview" |
| 2-1 | Reload 버튼 | 클릭 시 최신 데이터로 갱신 |
| 2-2 | Total Handled | 로그인한 상담원이 선택 기간 내 처리한 VOC 케이스 총 수. 직접 처리한 케이스만 포함. 단위: 1건이면 "Case", 2건 이상이면 "Cases" |
| 2-2 | Avg. Resolution Time | 로그인한 상담원의 평균 VOC 해결 시간. 직접 처리한 케이스 기준. 단위: 1시간이면 "Hour (hr)", 2시간 이상이면 "Hours (hrs)" |
| 2-2 | Avg. Commands per Session | 로그인한 상담원이 VOC 세션당 실행한 평균 명령 수. 직접 처리한 세션 내 명령만 포함. 단위: 1회면 "Count", 2회 이상이면 "Counts" |
| 2-3 | Top Issue Types | 로그인한 상담원이 처리한 VOC 케이스의 이슈 유형 분포 차트. 해당 수집 기간 내 현재 사용자가 처리한 케이스만 통계 포함 |
| 2-3 | Top Issue Types 정렬 | 이슈 유형은 비율(%) 내림차순으로 정렬 |
| 2-3 | Top Issue Types 개수 | 상위 5개 이슈 유형만 개별 표시. 6위 이하는 모두 "Others"로 묶어 표시 |
| 2-3 | Top Issue Types 표시 형식 | 이슈명 옆에 총 이슈 건수를 괄호 안에 표시. 각 바 오른쪽에 비율(%) 표시 |
| 2-4 | Resolution Status | 로그인한 상담원이 처리한 VOC 케이스의 결과 분포 차트. 현재 사용자가 처리한 케이스만 포함 |
| 2-4 | Resolution Status 상태 | Resolved / Not Resolved / Pending 3가지 상태의 비율(%) 표시. 각 비율은 차트 아래에 표시 |

### 3. My VOC History

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 3-1 | 검색 필터 (Select box) | 선택 옵션: SAID, Issue |
| 3-1 | 검색 입력창 | 선택한 옵션에 따라 "Enter OOO" 형식의 가이드 메시지 표시 |
| 3-1 | 검색 동작 | [Search] 클릭 시 현재 선택된 탭에서만 결과 표시 |
| 3-2 | VOC 목록 테이블 | 로그인한 상담원이 선택 기간 내 처리 완료(closed)된 VOC 케이스만 표시 |
| 3-2 | 테이블 컬럼 | No. / SAID / OS / Model / Issue / Completed At / Issue Result |
| 3-2 | SAID 마스킹 | SAID는 11자리 식별자. 보안상 마지막 3자리 마스킹 (예: 12345678***) |
| 3-2 | 정렬 | Completed At 기준 내림차순. 가장 최근 완료된 케이스가 상단에 표시 |
| 3-2 | Completed At | VOC 상담이 완료(closed)된 시각 |
| 3-2 | Issue Result | VOC 케이스의 최종 해결 상태 (예: Resolved, Not Resolved, Pending) |
| 3-2 | 행 선택 | 목록 항목 선택 시 해당 Issue Report 표시 (3.1.2 VOC Devices_issue report 참조) |
| 3-2 | 페이지네이션 | 15 lines / 페이지 단위 표시, 《 〈 1 2 3 ... 〉 》 형식 |
| 3-3 | Initiate VOC Session 버튼 | 클릭 시 Initiate VOC Session 팝업 표시. 특정 디바이스를 검색하여 새로운 VOC 세션을 시작하는 기능 |

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| 기간 변경 | My VOC Overview 차트 및 My VOC History 테이블 업데이트 | 선택 기간에 맞는 데이터로 갱신 |
| Reload 버튼 클릭 | 데이터 새로고침 | 최신 데이터로 화면 갱신 |
| 검색 필터 변경 | 입력창 placeholder 메시지 변경 | "Enter {선택 옵션}" 형식으로 표시 |
| [Search] 클릭 | 검색 실행 | 현재 선택 탭에서 결과 필터링 |
| VOC 목록 행 선택 | Issue Report 표시 | 3.1.2 VOC Devices_issue report 화면으로 이동 |
| [Initiate VOC Session] 클릭 | 팝업 표시 | Initiate VOC Session 팝업 오픈 |

![3.1.3 Initiate VOC Session Pop_up](./voc-devices.3-1-3.png)

### 3.1.3 Initiate VOC Session 팝업

#### 검색 전 (Before searching)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | 팝업 제목 | "Initiate VOC Session" |
| 1 | 안내 메시지 | "When a device is selected, the VOC session will begin automatically" |
| 2 | 검색 필터 (Select box) | SAID, MAC, Model, Group ID, Online |
| 2 | SAID/MAC 선택 시 | 텍스트 입력창에 "Enter OOO" 형식의 placeholder 표시 |
| 2 | Model/Device Group/Online/Session Status 선택 시 | 드롭다운 메뉴가 나타나며 해당 옵션의 값 선택 가능 (2.1.1 Device List 2-a 참조) |
| 2 | 컬럼 추가 시 | 추가된 컬럼도 Select box 옵션에 포함 |
| 3 | 디바이스 목록 (검색 전) | "Search for a device to start a VOC session." 메시지 표시 |
| 4 | Close 버튼 | 팝업 닫기 |

#### 검색 후 (After searching)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 3 | 디바이스 검색 결과 | 팝업에서 입력한 검색 조건에 맞는 디바이스 목록 표시 |
| 3 | 표시 컬럼 | SAID / MAC / Model / Device Group / Online / Session status |
| 3 | 디바이스 선택 시 | VOC 세션 자동 시작 |

**검색 결과 예시 데이터**

| SAID | MAC | Model | Device Group | Online | Session status |
|------|-----|-------|--------------|--------|----------------|
| 12345678*** | 001-ABC-789 | Model 1 | ABC | Online | Connected |
| 12345678*** | 001-ABC-789 | Model 1 | ABCDE | Online | Standby |
| 12345678*** | 001-ABC-789 | Model 1 | ABC | Online | Connected |
| 12345678*** | 001-ABC-789 | Model 1 | ABCDE | Offline | Connected |
| 12345678*** | 001-ABC-789 | Model 1 | ABCDE | Online | Standby |

![3.1.2 VOC Devices_ issue report](./voc-devices.3-1-2.png)

### 3.1.2 VOC Devices_Issue Report

VOC 목록에서 행을 선택하면 Issue Report가 표시된다.

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 디바이스 정보 | SAID | 예: 201804022-N |
| 디바이스 정보 | MAC | 예: (54E1AD55331E) |
| 디바이스 정보 | Model | 예: Model 1 |
| 디바이스 정보 | OS | 예: 26(16) |
| 디바이스 정보 | Connection time | 예: 2025-04-19 14:55:03 |
| 디바이스 정보 | Total connection time | 예: 02:24:01 |
| 디바이스 정보 | Agent | 상담원 이름 (마스킹 처리, 예: Pe***) |
| 디바이스 정보 | Representative command | 예: Install Package |
| Command | Command (N) | 실행한 명령 목록 및 수. 예: Install Package / Change language / Power restart / Screen share / Turn on wi-fi / Turn off wi-fi |
| Issue report | Issue type | 이슈 유형 |
| Issue report | Issue review | 이슈 세부 내용 |
| Issue report | Issue Result | 처리 결과 (예: Resolved) |

## 상태 / 분기

| 상태 | 설명 |
|------|------|
| Resolved | VOC 케이스가 해결됨 |
| Not resolved | VOC 케이스가 해결되지 않음 |
| Pending | VOC 케이스가 보류 중 |
| Session status: Connected | 디바이스가 현재 VOC 세션에 연결됨 |
| Session status: Standby | 디바이스가 대기 중 |
| Session status: Disconnected | 디바이스 연결 해제됨 |

## 업데이트 이력

| 날짜 | 내용 |
|------|------|
| 2026.03.26 | 3.1.1 VOC Devices, 3.1.3 Initiate VOC Session 팝업 검색 필터 및 테이블 수정: Device ID → SAID |
| 2026.04.17 | My VOC Overview > Avg. Commands per Session에 단위 추가 |
| 2026.04.17 | 2-2. Total Handled, Avg. Resolution Time, Avg. Commands per Session: 단/복수에 대한 단위 정책 추가 |

## 연결된 화면

- [VOC Devices (2-Devices)](../2-devices/voc-devices.md) — Section 2의 VOC Devices
- Issue Report (3.1.2): 동일 페이지 내 상세 패널
- Initiate VOC Session 팝업 (3.1.3): 동일 페이지 내 팝업

## 비고

- VOC Center 섹션은 상담원(Agent) 전용 메뉴로, 로그인한 상담원이 직접 처리한 케이스만 통계에 포함됨
- SAID 마스킹 정책: 11자리 중 마지막 3자리 `***` 처리 (예: 12345678***)
- 페이지당 15개 항목 표시
