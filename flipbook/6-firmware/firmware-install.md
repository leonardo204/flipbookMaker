# Firmware Install

> **경로**: 6. Firmware > Install
> **원본 ID**: `2dngd2`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=2dngd2)

![6.2 Firmware Install](./firmware-install.6-2.png)

## 목적

등록된 펌웨어를 대상 디바이스 그룹에 설치 명령을 실행하고, 설치 이력을 관리하는 화면이다. 설치 모드(Force/Normal/Optional), 설치 시각, 대상 디바이스 그룹을 설정하여 펌웨어를 배포할 수 있다.

## 진입 경로

- GNB(좌측 메뉴) > Firmware > Install

## 화면 구성

![6.2.1 Firmware Install](./firmware-install.6-2-1.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | 검색 필터 | Select box 옵션: Firmware, Version, Mode. 선택 옵션에 따라 입력창에 "Enter OOO" placeholder 표시 |
| 2 | Firmware Install 버튼 | 클릭 시 Firmware Install 팝업 표시 |
| 3 | Firmware Install History 테이블 | 실행된 펌웨어 설치 명령 이력 표시 |
| 3 | 테이블 컬럼 | Firmware / Version / Mode / Install Time / Target Device Group / Status |
| 3 | Install Time 형식 | YYYY-MM-DD HH:MM (24시간제) |
| 3 | Status 값 | 1) Init – 미시작 / 2) In progress – FCM이 디바이스에 전송됨 / 3) Success – 설치 완료 / 4) Failed – 설치 실패 |
| 3 | 행 선택 | 이력 항목 선택 시 상세 팝업 표시 (6.2.3 Firmware Install Detail 참조) |
| 4 | Help 버튼 | 클릭 시 Help 팝업 표시 |
| - | 페이지네이션 | 15 lines / 페이지 단위 표시, 《 〈 1 2 3 ... 〉 》 형식 |

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| 검색 필터 변경 | 입력창 placeholder 변경 | "Enter {선택 옵션}" 형식 표시 |
| [Search] 클릭 | 검색 실행 | 필터 조건에 맞는 이력 목록 표시 |
| [Firmware Install] 클릭 | 팝업 표시 | 펌웨어 설치 설정 팝업 오픈 |
| 이력 행 선택 | 상세 팝업 표시 | Firmware Install Detail 팝업 오픈 |
| [Help] 클릭 | 도움말 팝업 표시 | 가이드 텍스트 표시 |

## 상태 / 분기

![6.2.2 Install_No data](./firmware-install.6-2-2.png)

### 6.2.2 Install_No data (이력 없을 때)

- 메시지: "There is no firmware installation history"

![6.2.5 When no search results are found in the Firmware install](./firmware-install.6-2-5.png)

### 6.2.5 When no search results are found

- 메시지: "There is no firmware installation history" (검색 결과 없을 때도 동일 메시지)

![6.2.3 Firmware install detail](./firmware-install.6-2-3.png)

### 6.2.3 Firmware Install Detail 팝업

펌웨어 이력 항목 선택 시 표시되는 상세 팝업.

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | Firmware 정보 | Install Firmware (Version, Size) / Rescue Firmware (Version, Size) 표시. 내용이 영역 초과 시 스크롤바 표시 |
| 2 | Mode | 설치 모드 표시 |
| 3 | Install Time | 설치 시각 표시 |
| 4 | Target Device Group | 대상 디바이스 그룹 목록. 표시 형식: 대상 디바이스 그룹 (그룹 수). 내용 초과 시 스크롤바 표시 |
| 5 | Target Device List | 대상 디바이스 목록. 표시 형식: 대상 디바이스 목록 (디바이스 수) |
| 5 | 디바이스 목록 컬럼 | SAID / Device Group / Status |
| 5 | SAID 마스킹 | SAID는 11자리 식별자. 마지막 3자리 마스킹 (예: 12345678***) |
| 5 | Device Group | 디바이스가 속한 디바이스 그룹명 표시 |
| 5 | Status (디바이스별) | 1) Pending / 2) Installing / 3) Completed / 4) Failed |
| 5 | 페이지당 최대 | 20개 항목. 20개 초과 시 페이지 네비게이션 표시 |
| 5 | 스크롤 | 내용이 영역 초과 시 스크롤 가능 |
| 6 | Close 버튼 | 팝업 닫기 |

**Target Device Group 표시 예시**

- 1개 그룹: A group
- 여러 그룹: A group, B group, C group (모두 표시)

![6.2.4 Firmware install pop_up](./firmware-install.6-2-4.png)

### 6.2.4 Firmware Install 팝업

[Firmware Install] 버튼 클릭 시 표시되는 설치 설정 팝업.

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | Firmware 목록 | 체크박스, Firmware, Version, Size 표시 |
| 1 | Version 드롭다운 | 펌웨어별 사용 가능한 버전 목록. 기본값: 최신 버전 표시. 버전 변경 시 Size도 함께 변경 |
| 1 | 단일 선택 | 한 개의 펌웨어 선택 시 나머지 체크박스 비활성화 (동시에 하나만 선택 가능) |
| 2 | Install firmware / Rescue firmware | 펌웨어 선택 후 [Add install firmware] 또는 [Add rescue firmware] 클릭 시 각 영역에 추가 |
| 2 | Add install firmware | 설치 펌웨어가 추가되면 [Add install firmware] 버튼 비활성화 |
| 2 | Add rescue firmware | 복구 펌웨어가 추가되면 [Add rescue firmware] 버튼 비활성화 |
| 2 | [X] 버튼 | Install firmware / Rescue firmware 옆 [X] 클릭 시 해당 펌웨어 제거 |
| 3 | Mode | 드롭다운. 옵션: Force / Normal / Optional |
| 3 | Force | 무조건 다운로드 |
| 3 | Normal | 시청 중에는 다운로드하지 않으며, 대기 모드에서만 다운로드 |
| 3 | Optional | 사용자에게 팝업 알림 표시 (사용자가 결정) |
| 4 | Installation Time Setting | 표시 형식: YYYY-MM-DD HH:MM. 현재 시각보다 이전 날짜/시각은 선택 불가. 예: 현재 시각이 2024.12.13 14:00이면 2024.12.13 14:01 이후만 설정 가능 |
| 4 | Install Immediately 옵션 | 선택 시 날짜/시각 선택창 비활성화(Dimmed) |
| 5 | Target Device Group | 설치 대상 디바이스 그룹 선택. 드롭다운으로 펼쳐짐. 등록된 디바이스 그룹 목록 표시. 다중 선택 가능 |
| 5 | 드롭다운 닫힌 후 표시 | 1개 선택 시: 선택한 그룹명 표시. 2개 이상 선택 시: 첫 번째 그룹명 + 나머지 수 표시 (예: a group, B group + 1) |
| 5 | 내용 초과 시 | 스크롤 가능 |
| 6 | Install 버튼 | 설치 등록 |
| 6 | Close 버튼 | 팝업 닫기 |

**Target Device Group 드롭다운 표시 옵션 예시**

```
Please Select a Device Group
A group
B group
C group
D group
E group
```

**Mode 드롭다운 옵션**

```
Please Select a Mode
Force
Normal
Optional
```

### 6.2.6 Help 팝업 — "Firmware > Firmware Install" guide

가이드 내용:
- **이 페이지는 대상 그룹에 펌웨어를 설치하고 설치 이력을 관리하는 페이지입니다.**
- **1. Search**: 필터(Firmware, Version, Mode)로 상세 검색 가능. 검색 시 입력한 키워드와 일치하는 목록만 표시
- **2. Install firmware history list**: 설치된 펌웨어 이력 표시. 표시 정보: Firmware, Version, Mode, 대상 그룹. 행 선택 시 상세 정보 표시
- **3. Install firmware**: [Firmware Install] 버튼 클릭 시 설치 옵션 선택 팝업 표시. 여러 펌웨어를 동시에 설치 가능. 설치 모드 3가지: Force(무조건 다운로드), Normal(대기 모드에서만 다운로드), Optional(사용자가 선택). 설치 날짜/시각 선택 가능. 다수의 대상 디바이스 그룹 선택 가능

Help 팝업 규칙:
- 내용이 영역을 초과할 경우 스크롤바 표시
- Close 버튼 클릭 시 가이드 팝업 닫힘

## 업데이트 이력

| 날짜 | 내용 |
|------|------|
| 2026.04.24 | SAID 뒤에 3자리 마스킹 정책 추가 |
| 2026.03.26 | 6.2.3 Firmware install detail: Device ID → SAID 변경 |

## 연결된 화면

- [Firmware List](./firmware-list.md) — 펌웨어 목록 화면

## 비고

- 설치 이력의 Status는 Init / In progress / Success / Failed 4가지 상태
- 디바이스별 설치 Status는 Pending / Installing / Completed / Failed 4가지 상태
- Target Device List는 페이지당 최대 20개 항목 표시
- Install Time 형식: YYYY-MM-DD HH:MM (24시간제)
