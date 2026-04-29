# Release History

> **경로**: (루트) > Release History
> **원본 ID**: `1akyi4`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=1akyi4)

## 목적

RMS 플립북의 버전별 변경 이력을 시간 순으로 기록한 레퍼런스 문서이다. 개발팀과 디자인팀이 각 배포 버전에서 무엇이 바뀌었는지 빠르게 파악할 수 있도록 Version / Date / Description / URL 컬럼으로 구성된 테이블 형태로 정리한다.

## 진입 경로

- Axshare 플립북 사이트맵 최상단에 독립 페이지로 배치되어 있으며, 내비게이션에서 직접 접근한다.

## 화면 구성

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 헤더 | 페이지 제목 | "Release History" |
| 테이블 헤더 | Version 컬럼 | 버전명 (예: 2.8 KT Ver, 2.7.2 KT Ver) |
| 테이블 헤더 | Date 컬럼 | 배포 날짜 (YYYY.MM.DD 형식) |
| 테이블 헤더 | Description 컬럼 | 변경 사항 상세 설명 |
| 테이블 헤더 | URL 컬럼 | 해당 버전 Axshare 링크 |

## 변경 이력 상세

| Version | Date | Description |
|---------|------|-------------|
| 2.8 KT Ver | 2026.03.26 | **KT Version Release** |
| | | **1.x Overview** |
| | | 1.2 Dashboard(RMS) 2depth > 검색 필터링 조건 및 테이블 컬럼 전반적인 수정: Device ID → SAID |
| | | 1.3.1 Quick Operation > 4. Device List: Device ID → SAID |
| | | 1.4 Report > 1.3.1 Log tab: Device ID → SAID 변경 |
| | | **2.x Devices** |
| | | 2.1.1.3 Device list_Devices detail: 상단 정보 영역 변경 — Device ID → SAID |
| | | 2.1.1.3 Device list_Devices detail: 동코드 (Region code) 추가 |
| | | 2.1.1.3 Device list_Devices detail > Device info: Serial number → MAC로 변경 |
| | | 2.1.1.3 Device list_Devices detail > Device info: Google Account 삭제 |
| | | 디바이스 리스트 컬럼 변경: Device ID, S/N 삭제 → SAID, MAC 추가 |
| | | 검색 필터링 조건에 Device ID, S/N 삭제 / SAID, MAC 추가 |
| | | 2.1.3 Column: Device ID, S/N 삭제 → SAID 추가 |
| | | 2.1.4 Device register, 2.1.5 Device detail, 2.1.10 Devices_Command history detail pop_up: Device ID → SAID |
| | | 도움말 수정 |
| | | 2.2 Search > 검색 필터 수정: Device ID, S/N 삭제 / SAID, MAC 추가 |
| | | 2.3.4 Device group detail > Device list: Device ID → SAID |
| | | 2.3.5 Edit Device List 검색 필터 및 테이블 수정: Device ID → SAID |
| | | 2.3.7 Group_Command history detail pop_up 검색 필터 및 테이블 수정: Device ID → SAID |
| | | 2.5 VOC Devices > 2.5.1 VOC Devices, 2.5.3 Initiate VOC Session Pop_up 검색 필터 및 테이블 수정: Device ID → SAID |
| | | **3.x VOC Center** |
| | | 3.1 VOC Devices > 3.1.1 VOC Devices, 3.1.3 Initiate VOC Session Pop_up 검색 필터 및 테이블 수정: Device ID → SAID |
| | | **4.x Connecting Devices** |
| | | 4.2.1 Connecting devices: 상단 정보 영역 변경 — Device ID → SAID |
| | | 4.2.1 Connecting devices: 동코드 (Region code) 추가 |
| | | 4.2.1 Connecting devices > Device info: Serial number → MAC로 변경 |
| | | 4.2.1 Connecting devices > Device info: Last on Time, Security Patch Version, DRM, Sdk Level, Brand 추가 |
| | | 4.2.7 Data history > Offline log collection history: Device ID → SAID |
| | | 4.4 Command > App control > System app 케이스 추가 |
| | | 4.6 Issue report > 4.6.1 Issue report, 4.6.4 Issue report (view): Device ID → SAID |
| | | **5.x Applications** |
| | | 5.2 App Install > 5.2.3 App install detail: Device ID → SAID로 변경 |
| | | 5.3 App Policy: Managed App 탭 추가 |
| | | 5.3 App Policy: Whitelist, Blacklist 내 Managed App 아이콘 추가 |
| | | 5.3 App Policy: 도움말 수정 |
| | | **6.x Firmware** |
| | | 6.2 Firmware Install > 6.2.3 Firmware install detail: Device ID → SAID |
| | | **URL**: https://lsx333.axshare.com/?g=4 |
| | 2026.03.30 | 디바이스 등록 시 MAC 정보 추가 |
| | 2026.03.31 | 2.6.3 Set-top box policy register: Action 필드 위치 조정 (기존: 각 설정값 하단에 Action 표시) |
| | | 5.3.3 App policy register: Action 필드 위치 조정 (기존: 각 설정값 하단에 Action 표시) |
| | | 2.3.5 Edit Device List 팝업 안내 문구 추가 및 [Save] 버튼명 수정 |
| | 2026.04.07 | **0.1 Site Entry** |
| | | ID(E-mail) → ID로 변경 |
| | | Forget Password 팝업 변경 |
| | | **7.1 Administrator List** |
| | | 테이블, 검색 필터 내에 아이디, 이메일 분리 |
| | | ID 관련 정책 추가 |
| | 2026.04.10 | **2.6 Device policy** |
| | | Device info update 주기 Default 값 5분 → 10분으로 변경 및 최솟값 10분으로 제한 |
| | | 2.6.3 Set-top box policy register: Device info update 안내 문구 변경 |
| | | **2.1 Devices_Device List** |
| | | 2.1.1.2 Command button_If the operator has no command permissions: 명령에 대한 권한이 없는 경우 Case 추가 |
| | | **7.1 Administrator List** |
| | | 7.1.3 Administrator detail page: 기존에 비밀번호 변경 이력에 관계없이 [Reset Password] 버튼 표시로 정책 변경 |
| | | **4.2 Connecting devices** |
| | | 4.2.2 Device state > Wifi 정보 내에 Channel Width 정보 추가 |
| | | Device info 내에 Date of Manufacture 정보 추가 |
| | | **2.1 Devices_Device List** |
| | | Device info 내에 Date of Manufacture 정보 추가 |
| | 2026.04.13 | **0.1 Site Entry** |
| | | Password Change 팝업 버튼 변경 |
| | | **1.1 Dashboard** |
| | | 1.1.2.10 Firmware Version Distribution: 툴팁 문구 변경 및 Collection Period 삭제 |
| | | **1.2 Dashboard(RMS) 2depth** |
| | | 1.2.3.10 Firmware Version Distribution: 2depth에서 기간 설정 옵션 삭제 |
| | 2026.04.17 | **1.2 Dashboard(RMS) 2depth** |
| | | 1.2.3.4 Crash App Devices: 테이블에서 Snapshot Link 삭제 / Date → Warning Date로 변경 |
| | | 1.2.3.7 Devices Exceeding CPU Thresholds, 1.2.3.8 Devices Exceeding Memory Thresholds, 1.2.3.9 Devices Exceeding Network Thresholds: Threshold Value 선택 시 메뉴로 이동하는 정책 삭제 (추후 반영 예정) |
| | | **3.1 VOC Devices** |
| | | My VOC Overview > Avg. Commands per Session에 단위 추가 |
| | | 2-2. Total Handled, Avg. Resolution Time, Avg. Commands per Session: 단/복수에 대한 단위 정책 추가 |
| | | **5.3 App Policy** |
| | | 5.3.11.1 App registration pop_up: Version 섹션 추가 |
| | | **5.2 App Install** |
| | | 5.2.3 App install detail에서 App installation 상태값 변경: 기존 1) Pending 2) Installing 3) Completed 4) Failed → 변경 1) Init 2) In_Progress 3) Success 4) Failed |
| | 2026.04.24 | 전반적으로 SAID 뒤에 3자리 마스킹 정책 추가 |
| | | **0.1 Site Entry** |
| | | [User Registration] 버튼 및 시나리오 추가 |
| | | [Forgot password?] 버튼 및 시나리오 삭제 |
| | | **2.1 Devices_Device List** |
| | | Device List에 Registration Date 추가 및 정렬 기준 추가 |
| | | 2.1.3 Column에 Registration Date 추가 |
| | | **4.2 Connecting devices** |
| | | 4.2.6.1 Command transaction_Filtering Options: Command Type 표기 방식 수정 |
| | | 4.6 Issue report > 4.6.4 Issue report (view): 이슈 수정 권한 추가 |
| | | **7.1 Administrator List** |
| | | 관리자 리스트에 Role → Role Level로 변경 |
| | | 관리자 리스트 승인 대기 탭 추가 |
| | | Administrator List 테이블 내용 수정 |
| | | [Register] Button 및 관리자 등록 시나리오 삭제 |
| | | 7.1.2 Administrator detail page: 표시 정보 변경 |
| | | 시나리오 추가: 7.1.7 Administrator List_Pending Approval |
| | | 7.1.8 Approval Request Detail |
| | | 7.1.9 "Administration > Administrator list" guide 가이드 문구 변경 |
| | | **7.3 Alert Setting** |
| | | 전반적으로 Alert로 용어 통일 |
| | | Device Status, OTT New Version 탭 추가 |
| | | 7.3.2 Register Device Status Alert: Device Status 메일 알림 등록 시 표시되는 페이지 이름 변경 |
| | | 7.3.3 Device Status Alert Detail: 디테일 페이지 이름 변경 |
| | | 7.3.5 When Device status alert list is empty: 문구 수정 |
| | | OTT New Version 관련 시나리오 추가 |
| | | 7.3.13 "Administration > Alert Setting" guide: 가이드 문구 수정 |
| | | **URL**: https://lsx333.axshare.com/?g=4 |
| 2.7.2 KT Ver | — | (다음 버전 내용 별도 참조) |

## 섹션별 크롭 이미지

> 아래 이미지는 sections.json 기반으로 원본 HTML 페이지에서 섹션별로 크롭된 이미지입니다. y좌표 순으로 정렬되어 있습니다.

### 2.8 KT Ver

![2.8 KT Ver](./release-history.2-8.png)

### 2.1 Devices_Device List

![2.1 Devices_Device List](./release-history.2-1.png)

### 2.1.1.3 Device list_Devices detail — Device info: Google Account 삭제

![2.1.1.3 Device list_Devices detail](./release-history.2-1-1-3.png)

### 2.1.3 Column: Device ID, S/N 삭제 → SAID 추가

![2.1.3 Column](./release-history.2-1-3.png)

### 2.3 Devices — Device Group

![2.3 Devices Device Group](./release-history.2-3.png)

### 3.1 VOC Devices

![3.1 VOC Devices](./release-history.3-1.png)

### 4.2 Connecting devices

![4.2 Connecting devices](./release-history.4-2.png)

### 4.2.1 Connecting devices — Device info: Serial number → MAC로 변경

![4.2.1 Connecting devices](./release-history.4-2-1.png)

### 4.4 Command — App control — System app 케이스 추가

![4.4 Command](./release-history.4-4.png)

### 5.3 App Policy

![5.3 App Policy](./release-history.5-3.png)

### 6.2 Firmware Install — 6.2.3 Firmware install detail: Device ID → SAID

![6.2 Firmware Install](./release-history.6-2.png)

### 5.3.3 App policy register

![5.3.3 App policy register](./release-history.5-3-3.png)

### 0.1 Site Entry

![0.1 Site Entry](./release-history.0-1.png)

### 7.1 Administrator List

![7.1 Administrator List](./release-history.7-1.png)

### 2.7.2 KT Ver

![2.7.2 KT Ver](./release-history.2-7-2.png)

### 1.1 Dashboard

![1.1 Dashboard](./release-history.1-1.png)

### 1.2 Dashboard(RMS) 2depth

![1.2 Dashboard(RMS) 2depth](./release-history.1-2.png)

### 5.2 App Install

![5.2 App Install](./release-history.5-2.png)

### 7.1.8 Approval Request Detail

![7.1.8 Approval Request Detail](./release-history.7-1-8.png)

### 7.3 Alert Setting

![7.3 Alert Setting](./release-history.7-3.png)

### 7.3.3 Device Status Alert Detail: 디테일 페이지 이름 변경

![7.3.3 Device Status Alert Detail](./release-history.7-3-3.png)

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| URL 컬럼 링크 클릭 | 해당 Axshare 버전 페이지로 이동 | 외부 링크 오픈 |

> 이 페이지는 정적 레퍼런스 문서이므로 interactions.json에 등록된 클릭 인터랙션이 없다.

## 상태 / 분기

- 해당 없음 (정적 이력 문서)

## 연결된 화면

- [IA](./00-ia.md)
- [Policy](./00-policy.md)
- [Log in](./0-site-entry/log-in.md)

## 비고

- Release History 페이지는 단일 테이블로 구성된 정적 문서이다.
- 테이블 컬럼 구성: Version / Date / Description / URL
- 변경 이력이 같은 Version에 여러 날짜에 걸쳐 기록되는 경우 Version 셀은 병합(rowspan) 처리된다.
- URL 컬럼은 해당 배포 버전의 Axshare 링크를 표시하며, 일부 날짜 행에는 URL이 없을 수 있다.
