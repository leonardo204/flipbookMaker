# Device List

> **경로**: 2. Devices > Device List
> **원본 ID**: `1pcqz9`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=1pcqz9)

## 목적

등록된 셋톱박스 디바이스 목록을 조회하고, 디바이스 등록/수정/삭제 및 원격 커맨드 실행을 제공하는 메인 디바이스 관리 화면

## 진입 경로

- 좌측 메뉴 > Devices > Device List
- 앱 진입 시 기본 화면

## 화면 구성

![2.1 Devices_Device List](./device-list.2-1.png)

### 2.1.1 Device List (메인 화면)

![2.1.1 Device List](./device-list.2-1-1.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 상단 탭 | Device list / Command history | 기본 선택 탭: Device list |
| 필터링 | 검색 조건 Select box | 옵션: SAID, MAC, Model, Device Group, Online, Session status |
| 필터링 | SAID / MAC 선택 시 | 텍스트 입력창 표시, 플레이스홀더: "Enter OOO" |
| 필터링 | Model / Device Group / Online / Session Status 선택 시 | 드롭다운 선택 메뉴 표시 (2-a 참조) |
| 필터링 | 추가 검색 조건 [+] 버튼 | 최대 3개 검색 필터 생성 가능 |
| 버튼 영역 | Column / Add / Refresh / Import / Download Excel / Delete | 각 아이콘 hover 시 버튼명 표시 (3-a) |
| 버튼 영역 | Column | Add column 팝업 표시 |
| 버튼 영역 | Add | 디바이스 등록 화면 이동 |
| 버튼 영역 | Refresh | 현재 화면 새로고침 |
| 버튼 영역 | Import | Import 팝업 표시 |
| 버튼 영역 | Download Excel | 선택된 디바이스 있으면 Excel 다운로드 / 없으면 팝업 표시 |
| 버튼 영역 | Delete | 선택된 디바이스 정보 삭제 |
| Execute Command | 커맨드 드롭다운 | 디바이스 미선택 또는 권한 없으면 버튼 비활성화 |
| 디바이스 목록 | 표시 컬럼 | No., SAID, MAC, Model, Device Group, Online, Registration Date, Edit |
| 디바이스 목록 | SAID | 11자리 식별자, 뒤 3자리 마스킹 (예: 12345678***) |
| 디바이스 목록 | 기본 정렬 | 최근 등록된 디바이스 순 (기본값) |
| 디바이스 목록 | SAID 컬럼 제목 클릭 | SAID 알파벳 순 정렬 |
| 디바이스 목록 | Device Group | 대표 그룹명 1개 + 추가 그룹 수 표시, hover 시 전체 목록 툴팁 표시 |
| 디바이스 목록 | Online | 현재 상태 표시 (상태 없으면 Unknown) |
| 디바이스 목록 | Online - Connecting hover | 마지막 상태 변경 일시 표시 (YYYY-MM-DD HH:MM:SS 24시간) |
| 디바이스 목록 | Edit 버튼 | 선택 디바이스 편집 페이지 이동 |
| 하단 | Apply to All 체크박스 | 전체 디바이스 수 표시, 선택 시 모든 페이지 전체 선택 |
| 하단 | Apply to All 비활성화 조건 | 검색 조건 미적용 시 첫 페이지에서 비활성(검색 결과 있으면 활성) |
| 하단 | 페이지네이션 | 《 〈 1 2 3 4 5 6 7 8 9 10 〉 》, 15 lines 표시 |
| 우상단 | Help 버튼 | Help 팝업 표시 |

### 필터 드롭다운 옵션 (2-a)

| 필터 옵션 | 표시 내용 |
|-----------|-----------|
| Model | 등록된 모델 목록 (Model 1~7 등) |
| Device Group | 등록된 그룹 목록 (Device group A~E 등) |
| Online | Online / Offline |
| Session State | 해당 상태 값 목록 |

### 2.1.1.2 Command button_If the operator has no command permissions (권한 없는 경우)

### 2.1.2 Status Before Importing (디바이스 없는 상태)

![2.1.2 Status Before Importing](./device-list.2-1-2.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 버튼 영역 | 동일 버튼 | Column, Add, Refresh, Import, Download Excel, Delete |
| 안내 메시지 | 가이드 텍스트 | 디바이스 없음 안내 메시지 표시 |

### 2.1.3 Column

![2.1.3 Column](./device-list.2-1-3.png)

| 항목 | 내용 |
|------|------|
| 목적 | 디바이스 목록에 추가 컬럼 추가 팝업 |
| 추가 가능한 컬럼 | Registration Date 포함 |
| 필터링 연동 | 추가된 컬럼이 검색 Select box 옵션에도 포함됨 |

### 2.1.4 Device Register (디바이스 등록)

![2.1.4 Device register](./device-list.2-1-4.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 필수 입력 | SAID, MAC, OS, Model | 필수 입력 필드 |
| 필수 선택 | Device Group | 드롭다운에서 디바이스 그룹 선택 |
| 버튼 | List | 저장 없이 디바이스 목록 화면 이동 |
| 버튼 | Save | 등록 완료 후 디바이스 목록 이동 |
| 팝업 A | 미입력 시 | "Please enter all required information(*)" |

### 2.1.5 Device Detail (디바이스 편집)

![2.1.5 Device detail](./device-list.2-1-5.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 읽기 전용 | SAID, MAC | 수정 불가, SAID 뒤 3자리 마스킹 |
| 수정 가능 | OS, Model, Device Group | 수정 가능 |
| 버튼 | List | 저장 없이 목록으로 이동 |
| 버튼 | Save | 편집 완료 후 목록 이동 |
| 팝업 A | 미입력 시 | "Please enter all required information(*)" |

### 2.1.6 Import

![2.1.6 Import](./device-list.2-1-6.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 안내 | 업로드 안내 + Download Format 버튼 | 버튼 클릭 시 Excel 포맷 파일 다운로드 |
| 파일 첨부 영역 | 클릭 시 PC 파일 탐색기 표시 | 파일 추가 시 이전 파일 덮어씀 |
| 버튼 | Import | Excel 파일 업로드 (첨부 없으면 비활성) |
| 버튼 | Close | 팝업 닫기 |
| 업로드 불가 시 | 오류 팝업 | "This file cannot be attached" |
| 업로드 진행 중 | 팝업 2-a | "Import is in progress" |
| 완료 후 | 결과 메시지 | 성공/실패 디바이스 수 표시, [Download failed list] 버튼 표시 |
| 완료 후 | OK 버튼 | 팝업 닫기 |

### 2.1.7 Download Excel

| 팝업 ID | 조건 | 내용 |
|---------|------|------|
| 2.1.7.1 | 디바이스 체크 후 버튼 클릭 | 선택된 디바이스 수 메시지 + [Download] / [Close] 버튼 |
| 2.1.7.2 | 디바이스 미체크 후 버튼 클릭 | 안내 메시지 + [OK] 버튼 |

#### 2.1.7.1 Download excel pop_up

![2.1.7.1 Download excel pop_up](./device-list.2-1-7-1.png)

#### 2.1.7.2 Download excel pop_up

![2.1.7.2 Download excel pop_up](./device-list.2-1-7-2.png)

### 2.1.8 Delete

![2.1.8 Delete](./device-list.2-1-8.png)

| 팝업 ID | 조건 | 내용 |
|---------|------|------|
| 2.1.8.1 | 디바이스 체크 후 버튼 클릭 | 선택된 디바이스 수 + [Delete] / [Close] 버튼 |
| 2.1.8.2 | 디바이스 미체크 후 버튼 클릭 | 안내 메시지 + [OK] 버튼 |

#### 2.1.8.2 Delete pop_up

![2.1.8.2 Delete pop_up](./device-list.2-1-8-2.png)

### 2.1.9 Command History 탭

![2.1.9 Devices_Command history](./device-list.2-1-9.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 검색 | 검색창 + Search 버튼 | 플레이스홀더: "Enter command category" |
| 기간 선택 | 기간 옵션 | 선택 기간에 따라 테이블 업데이트 |
| 컬럼 | Target, Command Category, Command, Command Time, Status | - |
| Target | 복수 디바이스 | 대표 SAID 1개 + 추가 디바이스 수 표시 |
| Command Time | 형식 | YYYY-MM-DD HH:MM:SS (24시간) |
| Status | 표시 | Success / Progress / Failed (각 상태별 디바이스 수 표시) |
| Status 예시 | - | Success:12, Progress:2, Failed:10 |
| 행 선택 | - | 해당 Command history 상세 팝업 표시 |

### 2.1.10 Command History Detail 팝업

![2.1.10 Devices_Command history detail pop_up](./device-list.2-1-10.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 정보 표시 | Command Category, Command, Command Time | - |
| 디바이스 목록 | 제목 + 전체 디바이스 수 | - |
| 컬럼 | No., SAID, Result Received Time, Status | SAID 뒤 3자리 마스킹 |
| Result Received Time | 형식 | YYYY-MM-DD HH:MM:SS (24시간) |
| Status | 값 | Success / Fail / In_progress / Pending |
| 필터링 | SAID, Status | Status 선택 시 옵션 선택기 변환 (Success/Progress/Failed) |
| Refresh 버튼 | 검색 후 | Reload 버튼으로 검색 결과 초기화 |

### 2.1.1.4 Device Detail (디바이스 상세 팝업)

![2.1.1.4 Device list_Devices detail](./device-list.2-1-1-4.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 상단 정보 | Controllability status, SAID, Last updated time, Reload 버튼 | - |
| Controllability Status | Controllable | icon + "Controllable" |
| Controllability Status | View Only | icon + "View Only" |
| Last Updated Time | 형식 | Last Updated: YYYY-MM-DD HH:MM:SS |
| Minimize 버튼 | 최소화 | 화면 우하단에 최소화 상태 표시 |
| Minimize 최대 수 | FIFO 정책 | 최대 N개, 초과 시 가장 오래된 팝업 자동 제거 |
| Close 버튼 | Connected 상태 시 | 팝업 A 표시 "End connection with device, go to Issue report page?" |
| 상태 항목 | 표시 항목 | Device Status, Screen Status, CPU Temperature, Reboot Times, Uptime, CPU Usage, Memory |
| Device Status | 값 | Online / Offline |
| Screen Status | 값 | Watch / Stand by / Screen saver / Locked / Unknown |
| CPU Temperature | 임계값 초과 시 | 아이콘 적색 표시 |
| Reboot Times | 집계 | 최근 7일간 재부팅 횟수 (00 times), 매일 00:00 집계 |
| Uptime | 1일 미만 | 시간 표시 (예: 12 hours 30 minutes) |
| Uptime | 1일 이상 | 일+시간 (예: 2 days 4 hours) |
| Uptime | 7일 초과 | 적색 아이콘 표시 |
| CPU Usage / Memory | 표시 | 막대 그래프, 총 용량 대비 사용 비율 |
| CPU Usage | 임계값 초과 | 적색 표시 |
| Memory | 표시 | 000 GB of 000 used (1000MB 이상: GB, 999MB 이하: MB) |
| Memory | 소수점 | 최대 2자리 (예: 000.00) |

#### 디바이스 상세 탭 목록

| 탭 | 기본 탭 |
|----|---------|
| Device Info | 기본 선택 |
| Device State | - |
| Device Dashboard | - |
| Data usage | - |
| Diagnostics | - |
| Command transaction | - |
| Data history | - |

#### Device Info 탭 구성

| 섹션 | 표시 항목 | 비고 |
|------|-----------|------|
| Device Info fields | STB Manufacturer, Model, MAC, OS Version, Netflix ESN, FW Version, Cas ID, Device group name, Last Reboot Time, Last Information Time, Last Report Time, Location | 값 없으면 "-" 표시 |
| 미제공 항목 | 서버에서 값 없으면 "Empty" 표시 | Private IP: Empty |
| Cas ID | 없으면 항목 미표시 | - |
| Last Reboot/Information/Report Time | YYYY-MM-DD / HH:MM:SS (24시간) | - |
| Region code | 법정 동코드 + (지역명) | 예: 5178036026 (다산동) |
| Location | 위도/경도 소수점 표기 | 예: 37.451861°, 127.017667° |
| Tags | 태그 정보 + [Edit Tags] 버튼 | 없으면 No Tags 표시 |

#### Device Info_2 (HDMI/USB/Bluetooth)

| 항목 | 표시 내용 |
|------|-----------|
| HDMI Data | Manufacturer, Model, Current Resolution, Supported Resolutions, fps, HdmiConnected, HdmiCecEnable, HdmiEDIDVersion, HdcpSupport, HdcpLevel, DolbySupport, HdrSupport |
| USB Data | MountedOn, Manufacturer, Product Name, Version, Type |
| Bluetooth | ON/OFF 상태, 연결 디바이스 정보 (Name, Connection Status, Battery, RSSI, Device type, Firmware version, Device mac, Connection status) |

#### Command 패널

| 카테고리 | 기본 상태 | 서브 커맨드 |
|----------|-----------|------------|
| Device Control | 펼쳐짐 (expanded) | Screen Share, Restart/Shutdown, Standby, Awake, Mute/Unmute, Lock/Unlock |
| App Control | 접힘 (collapsed) | App List, Install App, Clear Cache |
| Advanced Control | 접힘 (collapsed) | Network Status, Network Packet Capture, Send Dump, Factory Reset, Message, Install Firmware, Control RMS |

### 2.1.1.1 Command Button

![2.1.1.1 Command button_If no device is selected](./device-list.2-1-1-1.png)

| 조건 | 동작 |
|------|------|
| 디바이스 미선택 | 버튼 비활성화, hover 시 "디바이스를 선택해야 커맨드 실행 가능" 툴팁 |
| 권한 없음 | 버튼 비활성화, hover 시 "커맨드 실행 권한 필요" 툴팁 |
| 디바이스 선택됨 | 드롭다운 목록 표시, hover 시 서브 커맨드 표시 |

커맨드 카테고리: Device Control, App Control, Advanced Control

![2.1.1.3 Command button](./device-list.2-1-1-3.png)

### 2.1.9 Help Guide

| 영역 | 내용 |
|------|------|
| 가이드 텍스트 | 영역 초과 시 스크롤 표시 |
| Close 버튼 | 팝업 닫기 |

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| 상단 탭 선택 | Device list / Command history 전환 | 해당 탭 내용 표시 |
| 검색 조건 변경 | 필터 타입에 따라 입력 필드 변경 | 텍스트 입력 또는 드롭다운 표시 |
| [+] 버튼 클릭 | 검색 필터 추가 (최대 3개) | 추가 필터 행 생성 |
| [Column] 클릭 | Column 팝업 표시 | - |
| [Add] 클릭 | Device Register 화면 이동 | - |
| [Refresh] 클릭 | 현재 화면 새로고침 | - |
| [Import] 클릭 | Import 팝업 표시 | - |
| [Download Excel] 클릭 | 디바이스 선택 여부에 따라 분기 | 선택됨: 팝업 2.1.7.1 / 미선택: 팝업 2.1.7.2 |
| [Delete] 클릭 | 디바이스 선택 여부에 따라 분기 | 선택됨: 팝업 2.1.8.1 / 미선택: 팝업 2.1.8.2 |
| [Execute Command] 클릭 | 드롭다운 커맨드 목록 표시 | 권한/선택 없으면 비활성 |
| 커맨드 hover | 서브 커맨드 목록 표시 | - |
| 서브 커맨드 선택 | 해당 디바이스에 커맨드 실행 | - |
| 디바이스 행 [Edit] 클릭 | Device Detail 편집 페이지 이동 | - |
| SAID 컬럼 제목 클릭 | SAID 알파벳 정렬 | - |
| Apply to All 체크 | 모든 페이지 전체 디바이스 선택 | - |
| Command history 행 클릭 | Command history detail 팝업 표시 | - |
| [Help] 클릭 | Help 가이드 팝업 표시 | - |
| 디바이스 상세 Minimize | 화면 우하단 최소화 (FIFO) | - |
| 디바이스 상세 Close (Connected) | 팝업 A 표시 | "End connection with device, go to Issue report page?" |

## 상태 / 분기

| 상태 | 조건 | 표시 |
|------|------|------|
| 디바이스 목록 정상 | 목록 존재 | 디바이스 목록 테이블 표시 |
| 디바이스 없음 | 등록된 디바이스 없음 | 2.1.2 Status Before Importing (안내 메시지) |
| Online 상태 | 정상 | "Online" 표시 |
| Online 상태 | 정상 아닌 경우 | "Offline" 또는 "Unknown" |
| Controllability | 제어 가능 | icon + "Controllable" |
| Controllability | 보기 전용 | icon + "View Only" |
| CPU/Memory 임계 초과 | 임계값 초과 | 아이콘/수치 적색 표시 |
| Uptime 7일 초과 | 7일 이상 | 적색 아이콘 |
| Command 실행 완료 | 완료 | 우하단 완료 팝업 (3초 후 자동 소멸) |

## 연결된 화면

| 화면 | 링크 |
|------|------|
| 2.1.3 Column | 동일 페이지 내 팝업 |
| 2.1.4 Device Register | [Add] 버튼 → 등록 페이지 |
| 2.1.5 Device Detail | [Edit] 버튼 → 편집 페이지 |
| 2.1.6 Import | [Import] 버튼 → 팝업 |
| 2.1.9 Command History | Command history 탭 |
| 2.1.10 Command History Detail | 행 선택 → 상세 팝업 |
| 2.4 Command | Execute Command → command pages |
| Search (2.2) | [./search.md](./search.md) |
| Device Group (2.3) | [./device-group.md](./device-group.md) |

## 비고

- SAID 마스킹 정책 (2026.04.24 추가): 11자리 중 뒤 3자리 마스킹 표시 (예: 12345678***)
- Device ID, S/N 컬럼 삭제 → SAID, MAC 추가 (2026.03.26)
- Registration Date 컬럼 추가 및 정렬 기준 추가 (2026.04.24)
- Region code (법정 동코드) 추가 (2026.03.26)
- Device Info의 Google Account 삭제, Serial number → MAC 변경 (2026.03.26)
- 최소화 팝업은 FIFO 정책으로 관리 (최대 N개 초과 시 가장 오래된 것 자동 제거)
- 디바이스 목록 기본 정렬: 최근 등록된 디바이스 순
