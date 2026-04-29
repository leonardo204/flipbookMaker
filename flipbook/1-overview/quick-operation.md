# Quick Operation

> **경로**: 1. Overview > Quick Operation
> **원본 ID**: `o2217s`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=o2217s)

## 목적

현재 임계치를 초과한 이슈 디바이스들을 한눈에 파악하고, 목록에서 디바이스를 직접 선택하여 Restart 커맨드를 즉시 실행할 수 있는 빠른 운영 화면이다. 이슈 유형별 현황 집계와 필터링을 통해 신속한 문제 대응을 지원한다.

## 진입 경로

- 좌측 사이드 내비게이션 > Overview > Quick Operation 선택 시

## 화면 구성

### 1.3 Quick Operation

![1.3 Quick Operation](./quick-operation.1-3.png)

### 1.3.1 Quick Operation

![1.3.1 Quick Operation](./quick-operation.1-3-1.png)

### 1. 헤더 영역

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 헤더 | Title | "Quick Operation" |
| 헤더 | Reload Button (새로고침 아이콘) | 클릭 시 최신 데이터를 수동으로 다시 로드. Reload 클릭 시 검색 결과 초기화 및 기본 뷰로 복원 |
| 헤더 | Last Updated Time | 대시보드 데이터가 마지막으로 갱신된 날짜/시간. 형식: `YYYY.MM.DD HH:mm:ss` (24시간제) |
| 헤더 | [My Command History] 버튼 | 현재 사용자가 실행한 커맨드 이력 팝업 열기 |

### 2. 이슈 위젯 영역

| 위젯 | 표시 값 | 툴팁 내용 |
|------|---------|-----------|
| **Current Issue Device** | 현재 활성 이슈가 있는 고유 디바이스 수 (기본 선택) | "Displays the number of unique devices that currently have active issues. A device is counted once even if it has multiple types of issues (Memory, CPU, or Network)" |
| **Memory Threshold Exceeded** | 현재 활성 메모리 임계치 초과 이벤트 총 수 (동일 디바이스 반복 발생 시 각각 별개 집계) | "Displays the total number of active Memory threshold exceedance events. Each occurrence is counted separately, even if repeated on the same device. Issue detection is based on the threshold values configured in the Device Policy." |
| **CPU Threshold Exceeded** | 현재 활성 CPU 임계치 초과 이벤트 총 수 (동일 디바이스 반복 발생 시 각각 별개 집계) | "Displays the total number of active CPU threshold exceedance events. Multiple occurrences on the same device are counted individually. Issue detection is based on the threshold values configured in the Device Policy." |
| **Network Threshold Exceeded** | 현재 활성 네트워크 임계치 초과 이벤트 총 수 (동일 디바이스 반복 발생 시 각각 별개 집계) | "Displays the total number of active Network threshold exceedance events. Each occurrence is counted separately, even if repeated on the same device. Issue detection is based on the threshold values configured in the Device Policy." |

**샘플 데이터**: Current Issue Device: 123,025 / Memory Threshold Exceeded: 45,074 / CPU Threshold Exceeded: 11,548 / Network Threshold Exceeded: 7,561

### 1.3.1.2 Quick Operation_Issue Statue Filter

![1.3.1.2 Quick Operation_Issue Statue Filter](./quick-operation.1-3-1-2.png)

### 2-1. 이슈 위젯 선택 시 추가 표시 영역 (Current Issue 제외)

Memory/CPU/Network 위젯 선택 시 선택 위젯 상단 영역에 Model Distribution, Group Distribution이 추가 표시됨:

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| Model Distribution | 모델별 분포 | 상위 3개 모델만 표시 (비율 기준 내림차순). 표시 정보: 모델 이름 / 비율(%) |
| Group Distribution | 그룹별 분포 | 상위 3개 그룹만 표시 (비율 기준 내림차순). 표시 정보: 그룹 이름 / 비율(%) |

**샘플 데이터**: Model A 67%, Model B 42%, Model C 17% / Group A 67%, Group B 42%, Group C 17%

### 1.3.2 Quick Operation_Flow

![1.3.2 Quick Operation_Flow](./quick-operation.1-3-2.png)

### 3. 필터링 옵션

| 필터 | 선택 방식 | 선택 가능 값 |
|------|-----------|-------------|
| Model | 드롭다운 | 등록된 모델 목록 (예: All, Model 1, Model 2, Model 3 …) |
| Device Group | 드롭다운 | 등록된 디바이스 그룹 목록 (예: Device group A, B, C, D, E …) |
| Issue | 드롭다운 | Memory Threshold Exceeded / CPU Threshold Exceeded / Network Threshold Exceeded |
| SAID | 텍스트 입력 | "Enter SAID" 플레이스홀더. 직접 입력 |
| Reload | 버튼 | 필터 초기화 및 기본 뷰 복원 |

### 1.3.3 Quick Operation_Issue widget

![1.3.3 Quick Operation_Issue widget](./quick-operation.1-3-3.png)

### 4. Device List (디바이스 목록 테이블)

| 컬럼 | 내용/규칙 |
|------|-----------|
| SAID | 11자리 식별자. 뒤 3자리 마스킹 (예: 12345678***) |
| Model | 디바이스 모델명 |
| Device Group | 기본 그룹 정보만 표시. 추가 그룹은 "+N"으로 표시. "+N" 호버 시 전체 그룹 이름 툴팁 표시 |
| Issue | 이슈 유형 (Memory Threshold Exceeded / CPU Threshold Exceeded / Network Threshold Exceeded) |
| Occurred At | 이슈 발생 시간. 형식: `YYYY.MM.DD HH:MM:SS` |
| Issue Status | 이슈 상태 (Unresolved / In Progress / Pending) |

**정렬 규칙**:
- 기본 정렬: Occurred At 기준 최신순(내림차순)
- 필터 적용 시: 오름차순으로 재정렬 (필터는 오름차순/내림차순 토글 기능)

**페이지네이션**: 《 〈 1 2 3 … 10 〉 》. Row per page: 20 / 40 / 60 / 80 / 100

**Issue Status 필터**: Issue Status 컬럼의 필터 아이콘 선택 시 체크박스 목록 팝업 표시. 원하는 상태값만 필터링하여 표시 가능. 기본값은 모든 상태 선택. 팝업 외부 클릭 시 팝업 닫힘

### 1.3.4 My Command History Pop_up

![1.3.4 My Command History Pop_up](./quick-operation.1-3-4.png)

### 1.3.4.1 My Command History Pop_up (If no command history exists)

![1.3.4.1 My Command History Pop_up (If no command history exists)](./quick-operation.1-3-4-1.png)

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| Current Issue Device 위젯 선택 (기본) | 이슈 디바이스 목록 표시 | 활성 이슈가 있는 디바이스만 하단 테이블에 표시 |
| Memory/CPU/Network 위젯 선택 | 해당 이슈 유형 화면으로 전환 | 선택 위젯 하이라이트, Model/Group Distribution 영역 추가 표시, 해당 이슈 디바이스 목록 갱신 |
| 위젯 Info 아이콘 호버 | 툴팁 표시 | 각 위젯별 이슈 집계 방식 설명 툴팁 표시 |
| Device List 행 클릭 | 디바이스 연결 모달 오픈 → 커맨드 확인 팝업 | Restart 커맨드 실행 확인 팝업 표시. [Restart] 버튼 선택 시 STB 재부팅 시작. 디바이스 연결 시 연결이 끊김 안내 포함 |
| Reload 버튼 클릭 | 검색 결과 초기화 | 필터/검색 조건 초기화 및 기본 뷰로 복원 |
| Issue Status 컬럼 필터 아이콘 클릭 | 체크박스 필터 팝업 표시 | Unresolved / In Progress / Pending 상태 필터 선택 가능. 팝업 외부 클릭 시 닫힘 |
| [My Command History] 버튼 클릭 | 나의 커맨드 이력 팝업 열기 | 현재 사용자가 실행한 커맨드 이력 목록 표시 |
| Occurred At 또는 컬럼 헤더 클릭 | 정렬 토글 | 해당 컬럼 기준 오름차순/내림차순 전환 |

### Restart 확인 팝업

디바이스 행 클릭 시 표시되는 확인 팝업:

| 요소 | 내용 |
|------|------|
| 팝업 제목 | "Restart" |
| 메시지 | "Are you sure you want to restart this device? The device will disconnect when you run this." |
| [Restart] 버튼 | 선택 시 STB 재부팅 프로세스 시작 |
| [Close] 버튼 | 팝업 닫기, 재부팅 취소 |

## 상태 / 분기

### Issue Status 3가지 상태

| 상태 | 설명 |
|------|------|
| Unresolved | 미해결 상태 |
| In Progress | 처리 중 상태 |
| Pending | 대기 중 상태 |

### 위젯별 선택 분기

- **Current Issue Device 기본 선택**: 테이블에 활성 이슈 디바이스만 표시. Model/Group Distribution 영역 미표시
- **Memory/CPU/Network 위젯 선택**: 선택 위젯 시각적 하이라이트. 상단에 Model Distribution / Group Distribution 추가 표시. 해당 이슈 유형의 디바이스만 테이블에 표시

### My Command History 팝업 분기

| 상태 | 표시 |
|------|------|
| 커맨드 이력 있음 | 이력 목록 테이블 표시 |
| 커맨드 이력 없음 | "There is no command history to display" 메시지 표시 |

## My Command History 팝업 상세

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 필터 | 검색 옵션 | Model, Device Group, Issue, SAID. SAID 선택 시 텍스트 입력. 나머지는 드롭다운 |
| 테이블 | 표시 컬럼 | SAID, Model, Device Group, Issue, Issue Occurred At, Command Executed At, Issue Status |
| 테이블 | 기본 정렬 | Command Executed At 기준 내림차순 (가장 최근 실행 커맨드 상단) |
| 테이블 | Issue Status | Resolved / Unresolved / In Progress / Pending (4가지 상태, 메인 화면보다 Resolved 추가) |
| 테이블 | Device Group | 기본 그룹 정보만 표시, 추가 그룹은 "+N"으로 표시. "+N" 호버 시 전체 그룹 이름 툴팁 |
| 정렬 | Occurred At / Command Executed At | 클릭 시 최신순/오래된순 토글 |
| 기간 | 기간 선택 옵션 | 선택 기간에 따라 데이터 업데이트 (예: 2022.12.30 - 2023.01.05) |

## 연결된 화면

- [Dashboard 1-depth](./dashboard-1-depth.md) — 좌측 내비게이션 Overview > Dashboard
- [Reports](./reports.md) — 좌측 내비게이션 Overview > Reports
- 디바이스 상세 연결 모달 → `../2-devices/device-list.md`

## 비고

- **업데이트 이력**:
  - 2026.03.26: 1.3.1 Quick Operation > 4. Device List — Device ID → SAID 변경
  - 2026.04.24: SAID 뒤 3자리 마스킹 정책 추가
- 이 화면의 커맨드는 Restart로 고정되어 있으며, 디바이스 행 클릭 시 Restart 커맨드 실행 확인 팝업이 자동으로 트리거됨
- Device Group 컬럼은 기본 그룹만 표시하며, 다중 그룹 소속 디바이스는 "+N"으로 나머지 개수를 표시
