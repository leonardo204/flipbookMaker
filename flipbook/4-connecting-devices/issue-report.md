# Issue Report

> **경로**: 4. Connecting Devices > Issue Report
> **원본 ID**: `m0v899`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=m0v899)

## 목적

기기 연결 팝업에서 [Close a Connection]을 선택하여 연결을 종료할 때 표시되는 화면이다. 상담 완료 후 사용한 커맨드, 이슈 유형, 이슈 결과를 기록하여 이슈 리포트를 완성한다.

## 진입 경로

- 기기 연결 팝업 → Close 버튼 선택 → Popup A 확인 (OK) → Issue Report 화면
- 스크롤 및 위젯 정책은 Connecting Devices 화면과 동일

## 업데이트 이력

| 날짜 | 변경 내용 |
|------|-----------|
| 2026.03.26 | 4.6.1 Issue report, 4.6.4 Issue report (view): Device ID → SAID |
| 2026.04.24 | SAID 뒤에 3자리 마스킹 정책 추가 |
| 2026.04.24 | 4.6.4 Issue report (view): 이슈 수정 권한 추가 |

## 화면 구성

![4.6 Issue report](./issue-report.4-6.png)

### 4.6.1 Issue Report 작성 화면

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 2. Widget (고정) | Connected Devices | SAID (11자리, 마지막 3자리 마스킹, 예: 12345678***) / Device info / OS version |
| | Consultation Time | 첫 연결 시각 (YYYY.MM.DD HH:MM AM/PM) / 연결 지속 시간 (HH:MM:SS) |
| | Connection time 형식 | 24시간, 앞자리 0 포함 (예: 04:04 / 19:00) |
| | Total Connection Time | 첫 연결 이후 경과 시간, 앞자리 0 포함 (예: 00:04:01 / 07:02:00) |
| | [Reporting Complete] 버튼 | 선택 시 리뷰 완료, Home 화면으로 이동 (Popup A 표시) |
| 1. Issue Report 서브카테고리 | - | Command / Issue Type / Issue Review |
| 3. Command | 사용한 커맨드 목록 | 연결 중 사용한 모든 커맨드 표시 / 첫 번째 커맨드가 기본 대표 커맨드로 선택됨 |
| 4. Issue Type | 이슈 유형 선택 | 이슈 유형 옵션 목록 표시 |
| | 이슈 유형 옵션 | Inexperienced operation / Low version / There are apps that are at risk / Insufficient storage / Weak internet signal / Required package is missing / Device Settings Issues |
| | 상세 설명 입력 | 기본 텍스트 표시 ("Please write down the details of the issue") |
| 5. Issue Review | 결과 옵션 선택 | 결과 옵션 목록 (C 목록) 표시 |
| | 상세 설명 입력 | 기본 텍스트 표시 ("Please write about the results in detail") |

![4.6.1 Issue report](./issue-report.4-6-1.png)

**위젯 특성:**
- 스크롤 중에도 화면 중앙에 고정 표시
- 연결된 기기 정보 + 상담 시간 정보 + [Reporting Complete] 버튼 포함

---

![4.6.2 Select the representative command](./issue-report.4-6-2.png)

### 4.6.2 대표 커맨드 선택

| 규칙 | 내용 |
|------|------|
| 기본 대표 커맨드 | 첫 번째 사용한 커맨드가 기본으로 선택됨 |
| 대표 커맨드 선택 | 커맨드 목록에서 원하는 커맨드를 선택하여 대표 커맨드로 지정 |
| 표시 | 선택된 커맨드 옆에 "Rep" 표시 |

---

![4.6.3 Select issue type](./issue-report.4-6-3.png)

### 4.6.3 이슈 유형 선택

| 이슈 유형 | 설명 |
|-----------|------|
| Inexperienced operation | 미숙한 조작 |
| Low version | 낮은 버전 |
| There are apps that are at risk | 위험 앱 존재 |
| Insufficient storage | 저장 공간 부족 |
| Weak internet signal | 약한 인터넷 신호 |
| Required package is missing | 필수 패키지 누락 |
| Device Settings Issues | 기기 설정 문제 |

**선택 규칙:**
- 이슈 유형 목록이 영역을 초과하면 수직 스크롤 활성화
- 이전에 선택한 이슈 유형은 "Selected" 표시로 강조

---

![4.6.4 Issue report (view)](./issue-report.4-6-4.png)

### 4.6.4 Issue Report (View) 화면

**설명:** 이슈 리포트 완성 후 조회 화면

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1. 기기 정보 | SAID | 11자리 식별자, 마지막 3자리 마스킹 |
| | Device info / OS version | |
| | 첫 연결 시각 | YYYY.MM.DD HH:MM AM/PM (24시간) |
| | 연결 지속 시간 | HH:MM:SS |
| | 상담 에이전트 정보 | ID (첫 두 자리 표시, 나머지 ***로 마스킹, 예: Pe***) |
| 2. 리포트 상세 | Command | 사용 커맨드 수, 대표 커맨드, 사용 커맨드 목록 |
| | Issue Type | 입력된 내용 표시 |
| | Issue Review | 입력된 내용 표시 |
| 3. [Modify] 버튼 | 표시 조건 | 자신의 상담 이력인 경우에만 표시 |
| | 예외 | Level 3 (Super Admin)은 모든 이슈 리포트 수정 가능 |
| | 선택 시 | 편집 모드로 전환 |

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| Close 버튼 (기기 연결 팝업) | Popup A 표시 | 연결 종료 확인 |
| Popup A [OK] 선택 | 연결 종료 | Issue Report 화면으로 이동 |
| Popup A [Cancel] 선택 | 취소 | 팝업 닫기, 연결 유지 |
| 커맨드 선택 (Command 목록) | 대표 커맨드 지정 | 선택 커맨드에 "Rep" 표시 |
| Issue Type 옵션 선택 | 이슈 유형 지정 | 선택 항목 강조 표시 |
| [Reporting Complete] 클릭 | Popup A 표시 | "Are you sure you want to complete the issue report?" |
| Popup A [OK] | 리포트 완료 | Home 화면으로 이동 |
| [뒤로 이동/나가기 시도] | Popup B 표시 | "If you exit now, the issue report will not be saved" → [OK] / [Cancel] |
| [Modify] 버튼 (조회 화면) | 편집 모드 전환 | 내용 수정 가능 |

## 상태 / 분기

| 조건 | 표시 |
|------|------|
| 자신의 상담 이력 | [Modify] 버튼 표시 |
| 다른 에이전트의 상담 이력 | [Modify] 버튼 미표시 |
| Level 3 (Super Admin) | 모든 이슈 리포트 [Modify] 접근 가능 |
| 이슈 유형 미선택 | "Select an Issue Type" 기본 텍스트 표시 |
| 결과 미선택 | "Please Select the Result" 기본 텍스트 표시 |
| 이슈 저장 없이 나가기 | Popup B 경고 표시 |

**이슈 리뷰 결과 옵션 (C 목록):**
- Resolved (해결됨)
- Not Resolved (미해결)
- Pending (보류)

**팝업 구분:**
- Popup A: "Are you sure you want to complete the issue report?" → [OK] / [Cancel]
- Popup B: "If you exit now, the issue report will not be saved. Select the [Reporting complete] button to save the issue report" → [OK] / [Cancel]

## 연결된 화면

- [Connecting Devices](./connecting-devices.md)
- [Connecting Devices Policy](./connecting-devices-policy.md)

## 비고

- Widget: 스크롤 중에도 화면 중앙에 고정
- SAID: 11자리 식별자, 마지막 3자리 마스킹 (예: 12345678***)
- 상담 에이전트 ID: 첫 두 자리 표시, 나머지 ***로 마스킹 (예: Pe***)
- Connection time 형식: 24시간, 앞자리 0 포함 (예: 04:04 / 19:00)
- Total connection time 형식: HH:MM:SS, 앞자리 0 포함 (예: 00:04:01 / 07:02:00)
