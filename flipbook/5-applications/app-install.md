# App Install

> **경로**: 5. Applications > App Install
> **원본 ID**: `261ha2`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=261ha2)

## 목적

RMS에 등록된 앱을 대상 기기 그룹에 설치하고, 설치 이력을 관리하는 화면이다. 앱 설치 명령 발행, 설치 진행 상태 조회, 실패한 기기 재시도 기능을 제공한다.

## 진입 경로

- GNB > Devices > Applications > App Install

## 업데이트 이력

| 날짜 | 변경 내용 |
|------|-----------|
| 2026.03.26 | 5.2.3 App install detail: Device ID → SAID로 변경 |
| 2026.04.17 | 5.2.3 App install detail에서 App installation 상태값 변경 (기존: 1)Pending 2)Installing 3)Completed 4)Failed → 변경: 1)Init 2)In_Progress 3)Success 4)Failed) |
| 2026.04.24 | SAID 뒤에 3자리 마스킹 정책 추가 |

## 화면 구성

![5.2 App Install](./app-install.5-2.png)

### 5.2.1 App Install 목록 화면

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1. 필터링 옵션 | 선택 박스 + 입력 박스 | 옵션: App name / Version / Mode |
| | placeholder 규칙 | 선택한 옵션에 따라 "Enter OOO" 형식으로 표시 |
| 2. [App Install] 버튼 | 앱 설치 팝업 표시 | 선택 시 5.2.4 App install 팝업 열기 |
| 3. App 설치 이력 | 발행된 앱 설치 명령 이력 | 표시 정보: App name, Version, Mode, Install time, Target device group, Status |
| | App name 표시 규칙 | 첫 번째 App name + N (항목 수) |
| | Install time 표시 규칙 | YYYY-MM-DD HH:MM (24시간 형식) |
| | Target device group 표시 규칙 | 첫 번째 대상 기기 그룹 + N (그룹 수) |
| | Status 값 | 1_Init: 미시작 / 2)In_Progress: FCM 전송됨 / 3)Success: 완료 / 4)Failed: 실패 |
| | 목록 항목 선택 시 | 상세 정보 팝업 표시 (5.2.3 App install detail) |
| 4. [Help] 버튼 | 도움말 팝업 표시 | 선택 시 도움말 팝업 열기 |

![5.2.1 App Install](./app-install.5-2-1.png)

---

### 5.2.2 앱 설치 이력 없음

| 조건 | 표시 |
|------|------|
| 설치 이력 없음 | 메시지: "There is no App installation history" |

![5.2.2 Install_No data](./app-install.5-2-2.png)

---

### 5.2.3 App Install Detail 팝업

**설명:** App Install 목록에서 항목 선택 시 표시되는 상세 팝업

![5.2.3 App install detail](./app-install.5-2-3.png)

| 구성 요소 | 내용/규칙 |
|-----------|-----------|
| 1. App | 설치된 앱 목록 표시 |
| | 표시 규칙: App (설치 수) |
| | 표시 정보: No., App name, Version, Size |
| | 내용 초과 시 스크롤 활성화 |
| 2. Mode | 설치 모드 표시 |
| 3. Install Time | 설치 시각 표시 |
| 4. Target Device Group | 대상 기기 그룹 목록 표시 |
| | 표시 규칙: Target device group (그룹 수) |
| | 내용 초과 시 스크롤 활성화 |
| 5. Target Device List | 대상 기기 목록 표시 |
| | 표시 규칙: Target device list (기기 수) |
| | 표시 정보: SAID, Device group, Status, Retry count, Last install time |
| | SAID: 11자리 식별자, 마지막 3자리 마스킹 (예: 12345678***) |
| | Device group: 기기가 속한 기기 그룹명 표시 |
| | Status: 1)Init / 2)In_Progress / 3)Success / 4)Failed |
| | Retry count: 해당 기기의 재시도 횟수 (Failed 상태에서 Retry 실행 시마다 증가) |
| | Last install time: 해당 기기의 최근 설치 시도 시각 (초기 설치 및 재시도 포함, Retry 실행 시 갱신) |
| | 내용 초과 시 스크롤 활성화 / 페이지당 최대 20개 / 20개 초과 시 페이지 네비게이션 표시 |
| 6. [Retry] 버튼 | Failed 상태 기기가 있을 때만 활성화 |
| | Failed 기기 없으면 비활성화 표시 |
| | 선택 시 Failed 상태의 모든 대상 기기에 앱 설치 명령 재전송 |
| | 재시도 시 해당 기기의 Retry count 1 증가, Last install time 갱신 |
| 7. [Close] 버튼 | 팝업 닫기 |

---

### 5.2.4 App Install 팝업

![5.2.4 App install pop_up](./app-install.5-2-4.png)

**설명:** [App Install] 버튼 선택 시 표시되는 팝업

| 구성 요소 | 내용/규칙 |
|-----------|-----------|
| 1. App List | 체크박스 + App + Version + Size 표시 |
| | Version 드롭다운: 사용 가능한 버전 목록 표시 |
| | 기본값: 최신 버전 표시 |
| | 버전 선택 시 Size 자동 갱신 |
| | 복수 앱 동시 선택 가능 |
| 2. Mode | 드롭다운으로 펼쳐짐 |
| | 옵션: Force / Normal / Optional |
| | Force: 조건 없이 즉시 다운로드 및 설치 |
| | Normal: 기기가 사용 중이 아닐 때(예: Standby 상태)만 다운로드 및 설치 |
| | Optional: 사용자에게 팝업 알림을 표시하여 다운로드 여부를 선택하도록 함 |
| 3. Installation Time Setting | 설치 예약 시각 설정 |
| | 표시 형식: YYYY-MM-DD HH:MM |
| | 현재 시각보다 이전 시각 선택 불가 (예: 현재 2024.12.13 14:00이면 14:01 이후부터 선택 가능) |
| | "Install immediately" 옵션 선택 시 날짜/시각 선택 필드 dimmed 처리 |
| 4. Target Device Group | 설치 대상 기기 그룹 선택 |
| | 드롭다운으로 펼쳐짐 |
| | 등록된 기기 그룹 목록 표시 |
| | 복수 선택 허용 |
| 5. [Install] / [Close] 버튼 | [Install]: 설치 등록 / [Close]: 팝업 닫기 |

---

![5.2.5 App install_When No Search Results Exist](./app-install.5-2-5.png)

### 5.2.5 검색 결과 없음

| 조건 | 표시 |
|------|------|
| 검색 결과 없음 | 메시지: "No search results found" |

---

### 5.2.6 도움말 가이드 (Applications > App Install)

**가이드 내용:**

| 번호 | 항목 | 설명 |
|------|------|------|
| 1 | Search | 필터를 사용하여 상세 검색 가능 / 필터 옵션: App Name, Version, Mode / 키워드와 일치하는 목록만 표시 |
| 2 | Install App history list | 설치된 앱 이력 표시 / 표시 정보: 앱 이름, 버전, 모드, 설치 시각, 대상 기기 그룹, 상태 / 행 선택 시 상세 정보 표시 |
| 3 | Install App | [App Install] 버튼 클릭 시 설치 팝업 표시 / 앱 목록에서 선택하여 설치 설정 / 복수 앱 동시 설치 가능 |

**설치 모드 설명:**
- Force: 조건 없이 즉시 앱 다운로드 및 설치
- Normal: 기기를 사용 중이 아닐 때(Standby 상태 등)에만 다운로드 및 설치
- Optional: 사용자에게 팝업 알림 표시, 사용자가 다운로드 여부 결정

**도움말 동작:**
- [Close] 버튼: 도움말 팝업 닫기

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| [App Install] 버튼 | App install 팝업 열기 | 앱 설치 설정 가능 |
| 목록 항목 선택 | App install detail 팝업 열기 | 상세 정보 및 기기별 상태 표시 |
| [Install] 클릭 (팝업) | 설치 명령 등록 | 설치 이력 목록에 추가 |
| [Retry] 클릭 (상세 팝업) | Failed 기기에 재설치 명령 전송 | Retry count 증가, Last install time 갱신 |
| "Install immediately" 체크 | 날짜/시각 필드 dimmed | 즉시 설치로 설정 |
| 버전 드롭다운 변경 | Size 자동 갱신 | 선택 버전의 파일 크기 표시 |
| 필터 검색 실행 | 검색 결과 표시 | 일치 이력 표시 또는 "No search results found" |
| [Help] 버튼 | 도움말 팝업 표시 | 가이드 메시지 표시 |

## 상태 / 분기

| 조건 | 표시 |
|------|------|
| 설치 이력 없음 | "There is no App installation history" 메시지 |
| 검색 결과 없음 | "No search results found" 메시지 |
| Target Device List - Failed 기기 있음 | [Retry] 버튼 활성화 |
| Target Device List - Failed 기기 없음 | [Retry] 버튼 비활성화 |
| "Install immediately" 선택 | 날짜/시각 선택 필드 dimmed |
| 현재 시각 이전 시각 선택 시 | 선택 불가 처리 |
| Target Device List 20개 초과 | 페이지 네비게이션 표시 |

**Status 값 상세:**
- 1_Init: 아직 시작되지 않은 상태
- 2)In_Progress: 기기에 FCM 전송된 상태
- 3)Success: 설치 완료 상태
- 4)Failed: 설치 실패 상태

## 연결된 화면

- [App List](./app-list.md)
- [App Policy](./app-policy.md)
- [Command - App Control](../4-connecting-devices/command-app-control.md) (Install Application)

## 비고

- App Install 팝업에서 복수 앱 동시 설치 가능
- Version 드롭다운 기본값: 최신 버전
- Installation Time Setting: 현재 시각 이후만 선택 가능 / "Install immediately" 선택 시 날짜/시각 필드 비활성화
- Target Device Group: 복수 선택 허용
- Retry: Failed 상태 기기에만 재시도 명령 전송 (Init/In_Progress/Success 상태 기기는 영향 없음)
- Last install time: 초기 설치 및 재시도 포함, Retry 실행 시마다 갱신
