# VOC Devices

> **경로**: 2. Devices > VOC Devices
> **원본 ID**: `5sciwl`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=5sciwl)

## 목적

셋톱박스 VOC(Voice of Customer) 세션 이력을 관리하고, VOC Overview 통계를 제공하는 화면. 신규 VOC 세션 시작 및 이슈 리포트 조회 가능.

## 진입 경로

- 좌측 메뉴 > Devices > VOC Device

## 화면 구성

![2.5 VOC Devices](./voc-devices.2-5.png)

### 2.5.1 VOC Devices (메인 화면)

![2.5.1 VOC Devices](./voc-devices.2-5-1.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 기간 선택 | Period Options | 선택 기간에 따라 그래프 업데이트 (통계 관리 공통 정책 참조) |
| VOC Overview | 제목 + Reload 버튼 | Reload 클릭 시 VOC Distribution, Top Issue Types 차트 최신 데이터 갱신 |
| VOC Distribution | 파이 차트 | 선택 기간 내 VOC 발생 디바이스 분포 표시 (Device Model / OS 기준) |
| VOC Distribution | 표시 규칙 | 상위 4개 카테고리 표시, 나머지는 "Others"로 묶음 |
| VOC Distribution | hover | 파이 차트 섹션 hover 시 상세 정보 툴팁 표시 |
| Top Issue Types | 막대 차트 | 선택 기간 내 VOC 이슈 카테고리 분포 |
| Top Issue Types | 정렬 | 비율 내림차순 정렬 |
| Top Issue Types | 표시 규칙 | 상위 5개 이슈 개별 표시, 나머지는 "Others"로 묶음 |
| Top Issue Types | 표시 형식 | 이슈명 (이슈 수) + 우측 비율(%) |
| VOC History | 검색 | Select box: SAID, Issue / 텍스트 입력, 플레이스홀더 "Enter OOO" |
| VOC History | 검색 결과 | 현재 선택된 탭에서만 결과 표시 |
| VOC History | 정렬 | Connected Time 기준 내림차순 (최근 연결 세션 상단) |
| VOC History | 표시 컬럼 | No., Connected Time, OS, Model, SAID, Issue, Agent |
| VOC History | SAID | 11자리 중 뒤 3자리 마스킹 (예: 12345678***) |
| VOC History | Connected Time | VOC 세션 연결 타임스탬프 |
| VOC History | 포함 조건 | 완료(Completed) 상태인 VOC 세션만 목록에 표시 |
| VOC History | 행 선택 | 해당 VOC 이슈 리포트 표시 (2.5.2 참조) |
| Initiate VOC Session 버튼 | 클릭 | Initiate VOC Session 팝업 표시 |
| 페이지네이션 | - | 《 〈 1 2 3 4 5 6 7 8 9 10 〉 》, 15 lines |

### 2.5.2 VOC Devices Issue Report

![2.5.2 VOC Devices_ issue report](./voc-devices.2-5-2.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 디바이스 정보 | SAID, MAC | 상단 표시 (예: 201804022-N, 54E1AD55331E) |
| Device Info | Model, OS, Connection time, Total connection time, Agent | - |
| Connection time | 형식 | YYYY-MM-DD HH:MM:SS |
| Total connection time | 형식 | HH:MM:SS |
| Agent | 표시 | 이름 마스킹 (예: Pe***) |
| Representative command | - | 주요 실행 커맨드 표시 (예: Install Package) |
| Issue report | Issue type, Issue review | - |
| Issue review | DetailsDetails... | 이슈 상세 내용 표시 |
| 커맨드 목록 | Command (N) | 실행된 커맨드 수 + 목록 (예: Install Package, Change language, Power restart, Screen share, Turn on wi-fi, Turn off wi-fi) |
| 행 선택 | Select row | - |

### 2.5.3 Initiate VOC Session 팝업

![2.5.3 Initiate VOC Session Pop_up](./voc-devices.2-5-3.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 팝업 제목 | Initiate VOC Session | - |
| 안내 메시지 | "Search for a device to start a VOC session" / "When a device is selected, the VOC session will begin automatically" | - |
| 검색 필터 | SAID, MAC, Model, Device Group, Online | - |
| SAID / MAC 선택 시 | 텍스트 입력창 표시 | 플레이스홀더: "Enter OOO" |
| Model / Device Group / Online / Session Status 선택 시 | 드롭다운 표시 | 2.1.1 Device List 2-a 참조 |
| 검색 전 | 디바이스 목록 영역 | "Search for a device to start a VOC session" 안내 문구 표시 |
| 검색 후 | 디바이스 목록 | 검색 조건에 맞는 디바이스 목록 표시 |
| 목록 컬럼 | SAID, MAC, Model, Device Group, Online, Session Status | SAID 뒤 3자리 마스킹 |
| 디바이스 선택 | - | 선택 즉시 VOC 세션 자동 시작 |
| Close 버튼 | 클릭 | 팝업 닫기 |
| 페이지네이션 | - | 《 〈 1 2 3 4 5 6 7 8 9 10 〉 》 |

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| 기간 옵션 변경 | VOC 그래프/테이블 업데이트 | - |
| VOC Overview Reload | 차트 최신 데이터 갱신 | VOC Distribution + Top Issue Types 갱신 |
| VOC Distribution hover | 파이 섹션 툴팁 표시 | 해당 카테고리 상세 정보 |
| VOC History 행 선택 | 이슈 리포트 표시 | 2.5.2 VOC Devices issue report |
| [Initiate VOC Session] 클릭 | 팝업 표시 | 디바이스 검색 및 VOC 세션 시작 |
| 팝업 검색 실행 | 검색 조건 매칭 디바이스 목록 표시 | - |
| 팝업 디바이스 선택 | VOC 세션 자동 시작 | - |
| 팝업 Close | 팝업 닫기 | - |

## 상태 / 분기

| 상태 | 조건 | 표시 |
|------|------|------|
| VOC 목록 있음 | 완료된 VOC 세션 있음 | Connected Time 내림차순 목록 |
| 검색 전 팝업 디바이스 영역 | 검색 미실행 | "Search for a device to start a VOC session" |
| 검색 후 팝업 디바이스 영역 | 검색 실행 | 매칭 디바이스 목록 표시 |
| VOC Distribution | 카테고리 5개+ | 상위 4개 + Others |
| Top Issue Types | 이슈 6개+ | 상위 5개 + Others |

## 연결된 화면

| 화면 | 링크 |
|------|------|
| VOC Issue Report (2.5.2) | VOC History 행 선택 시 이슈 리포트 표시 |
| Device List (2.1) | [./device-list.md](./device-list.md) |

## 비고

- 2026.03.26: 검색 필터 및 테이블 수정 - Device ID → SAID
- 2026.04.24: SAID 뒤 3자리 마스킹 정책 추가
- VOC History: 완료(Completed) 상태 세션만 표시
- VOC History 정렬: Connected Time 기준 내림차순 (최신 순)
- Initiate VOC Session: 디바이스 선택 즉시 VOC 세션 자동 시작
- VOC Distribution: Model / OS 두 가지 기준으로 분류하여 파이차트 표시
- Top Issue Types: 비율 내림차순, 상위 5개 + Others
