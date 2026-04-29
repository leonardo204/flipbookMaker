# Connecting Devices

> **경로**: 4. Connecting Devices > Connecting Devices
> **원본 ID**: `qa5ine`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=qa5ine)

## 목적

선택한 기기와 연결하여 Device Info, Device State, Device Dashboard, Data Usage, Diagnostics 등 기기 상태를 확인하고 원격 제어를 수행하는 메인 팝업 화면이다.

## 진입 경로

- Devices 목록에서 특정 기기를 선택하여 연결 시
- 4.2.1 Connecting devices 참조

## 화면 구성

![4.2 Connecting devices](./connecting-devices.4-2.png)

### 공통 헤더 영역 (4.2.1 Connecting devices)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 디바이스 정보 | SAID | 11자리 식별자, 마지막 3자리 마스킹 (예: 12345678***) |
| | Controllability Status | Controllable / View Only (아이콘 + 텍스트) |
| | Last Updated Time | 형식: Last Updated: YYYY-MM-DD HH:MM:SS |
| | Reload 버튼 | 선택 시 최신 정보 로드 및 업데이트 시각 갱신 |
| 최소화/닫기 | Minimize 버튼 | 팝업 최소화, 우측 하단 표시 (최대 5개) |
| | Close 버튼 | 팝업 닫기 (기기 연결 중이면 Popup A 표시) |

![4.2.1 Connecting devices](./connecting-devices.4-2-1.png)

### 4.2.1 기기 정보 상세 (Device Info 탭)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 상태 요약 | Device Status | Online / Offline |
| | Screen Status | Watch / Stand by / Screen saver / Locked / Unknown (Locked: 빨간 아이콘) |
| | CPU Temperature | 현재 온도 (임계값 초과 시 빨간 아이콘) |
| | Reboot Times | 최근 7일 재부팅 횟수 (00 times, 매일 00:00 집계) |
| | Uptime | 1일 미만: 시간 단위 / 1일 이상: 일+시간 단위 |
| | CPU Usage | 막대 그래프 (00% in use), 임계값 초과 시 빨간 아이콘 |
| | Memory | 막대 그래프 (000 GB of 000 are used), 소수점 2자리 |
| Device Info_1 | STB Manufacturer | STB 제조사 |
| | Model | 모델명 |
| | MAC | MAC 주소 |
| | OS Version | 운영체제 버전 |
| | Google Account | 구글 계정 (없으면 "-") |
| | Netflix ESN | 넷플릭스 ESN |
| | FW Version | 펌웨어 버전 |
| | Cas ID | CAS ID (없으면 항목 미표시) |
| | Device Group Name | 기기 그룹명 |
| | Last Reboot Time | YYYY-MM-DD HH:MM:SS (24시간 형식) |
| | Last Information Time | YYYY-MM-DD HH:MM:SS |
| | Last Report Time | YYYY-MM-DD HH:MM:SS |
| | Location | 소수 표기 위도/경도 (예: 37.579617 / 126.977041) |
| | Region code | 법정 동코드 + (괄호)안에 지역명 (예: 5178036026 (다산동)) |
| | Tags | 기기에 등록된 태그 목록 + [Edit Tags] 버튼 |
| Device Info_2 | HDMI Data | Manufacturer / Model / Current Resolution / Supported Resolutions / fps / Hdmi Connected / Hdmi CEC Enable / EDID Version / Hdcp Support / Hdcp Level / Dolby / HdrSupport |
| | USB Data | Mounted On / Manufacturer / Product Name / Version / Type |
| | Bluetooth | Bluetooth ON/OFF 상태 / 연결된 기기 정보 (Name, Connection Status, Battery, RSSI, Device type, Firmware version, Device mac) |

**필드 미제공 규칙:**
- 서버에서 값이 없으면 "-" 표시 (예: Google account: -)
- 값이 없으면 "Empty" 표시 (예: Private IP: Empty)
- Cas ID 필드가 없으면 항목 자체를 미표시

![4.2.1.1 Connecting devices (For Agent)](./connecting-devices.4-2-1-1.png)

### 4.2.1.1 Tags 팝업

| 구성 | 내용 |
|------|------|
| 1. 제목 및 안내 메시지 | 태그 추가 방법 안내 |
| 2. Tag 입력 필드 | 입력 후 [Add] 버튼으로 태그 추가 / 중복 태그 입력 시 Add 효과 없음 |
| 3. Tag 목록 | 등록된 태그 목록 (태그 + [X] 버튼), 목록 초과 시 스크롤 |
| 4. 버튼 영역 | [Save]: 변경사항 저장 후 팝업 닫기 / [Close]: 저장 없이 닫기 |

**태그 입력 규칙:**
- 소문자만 입력 가능 (대문자 자동으로 소문자 변환)
- 동일한 태그는 추가되지 않음
- 태그 삭제 시 태그 번호가 재정렬되고 제목 옆 태그 수 업데이트

![4.2.1.2 Tags](./connecting-devices.4-2-1-2.png)

### 4.2.2 Device State 탭

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| Device State_1 (네트워크) | Ethernet | DHCP / MAC / Address / DNS / Subnet Mask / Gateway / Address V6 / Public IP |
| | Wi-Fi | DHCP / SSID / Address / DNS / BSSID / Address V6 / RSSI / Standard / Channel / Frequency / Channel Width / Bandwidth / Link Speed / Network quality |
| | Network quality | Data Rate (초당 전송 데이터량) / Jitter (패킷 도착 간격 변동) / Packet Loss (전송 실패 패킷 비율) |
| Device State_2 (설정) | HDR Settings | Auto HDR ON: 하위 설정 미표시 / Auto HDR OFF: 하위 설정 표시 (미지원 항목 dimmed) |
| | ECO Mode | Deep Standby 설정, ON 시 Popup 2-b 표시 |
| | Volume | Mute Master Volume / Volume Control Permission (Allow/Disallow) / Volume Control |
| | Time | Timezone / Auto Date and Time / 24-hour Mode / Set Date and Time (YYYY-MM-DD HH:MM:SS) |
| | Language | Language / Virtual Keyboard 선택 |
| | Debug | Debug Mode ON/OFF |
| | Set Wallpaper | Screensaver Type: Turn screen off / Backdrop / Color / Timeout Setting (10 min / 30 min / 1 hr / 2 hrs) |

**Device State 비활성 조건:**
- 기기가 연결되지 않은 경우: 토글 버튼 및 [Apply] 버튼 dimmed
- 활성 조건: On+Standby 또는 On+Connected 상태일 때만 활성화

**Volume 규칙:**
- Volume Control Permission = Allow: 볼륨 조절 옵션 활성화
- Volume Control Permission = Disallow: 볼륨 조절 옵션 비활성화
- 슬라이더 이동 시 입력 박스 값 자동 업데이트

**Set Date and Time:**
- 유효하지 않은 날짜/시간 입력 시 오류 메시지 표시 및 값 초기화

**Wallpaper 규칙:**
- Backdrop 또는 Color 선택 시 Timeout Setting 활성화
- Turn screen off 선택 시 Timeout Setting 비활성화

![2.8 ms](./connecting-devices.2-8.png)

### 4.2.3 Device Dashboard 탭

표시 차트 목록:
- CPU Usage Over Time
- CPU Temperature Over Time
- Memory Over Time
- Data Usage Over Time
- App Storage Over Time
- App Data Usage Over Time
- Latency
- Upload & Download

![4.2.3 Device dashboard](./connecting-devices.4-2-3.png)

### 4.2.4 Data Usage 탭

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1. Storage status | 시스템 내장 스토리지 전체 크기 | 사용 용량: App / Cache / Download / MISC / Media / Audio (내림차순 정렬) / 잔여 용량 |
| | 표시 단위 | 소수점 2자리 / 1000MB 이상 GB / 999MB 이하 MB |
| | 막대 그래프 | 색상 칩 / 영역명 / 사용량 (0.00 GB) |
| 2. App storage | 앱별 스토리지 사용 비율 | 색상 코드별 파일별 사용 공간 / 시스템 사용량 상단 표시 / 잔여 스토리지: 00% left |
| | Network usage | 인터페이스별 네트워크 트래픽 (Total TX / Total RX, 예: eth0, wlan0) |

![4.2.4 Data usage](./connecting-devices.4-2-4.png)

![134.51 GB](./connecting-devices.134-51.png)

### 4.2.5 Diagnostics 탭

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1. Last updated time | 최종 업데이트 시각 | HH:MM AM/PM (24시간 형식) |
| 2. Download 버튼 | 진단 정보 파일 다운로드 | 사용자 로컬 PC에 저장 |
| 3. Diagnostics_1 | Parameter + 값 | IP address / App running state / OS version / Model name / Manufacturer |
| 4. Diagnostics_2 | Parameter + 값 + 설명 + 현재 상태 | CPU usage / CPU temperature / Memory usage / Storage usage / Wi-Fi signal strength / Network speed / App crash logs / Reboot count / Bluetooth battery / Command result |
| | Status 표시 | Normal (녹색) / Warning (노란색) / Critical (빨간색) |
| | Warning/Critical | 정보 아이콘 표시, 마우스 오버 시 툴팁 표시 |

![4.2.5 Diagnostics](./connecting-devices.4-2-5.png)

![3.26 GB / 6.00 GB (54.3%)](./connecting-devices.3-26.png)

![4.2.5.1 Diagnostics_Tool tips](./connecting-devices.4-2-5-1.png)

### 4.2.8 Command - App Control (하위 참조)

선택 시 표시 커맨드:
- App List
- Install App
- Clear Cache

![4.2.6 Command transaction](./connecting-devices.4-2-6.png)

![4.2.6.1 Command transaction_Filtering Options](./connecting-devices.4-2-6-1.png)

![4.2.7 Data history](./connecting-devices.4-2-7.png)

![4.2.8 Command_App Control](./connecting-devices.4-2-8.png)

![4.2.9 Command_Advanced Control](./connecting-devices.4-2-9.png)

### Command 구성 (4.2.1)

| 카테고리 | 기본 상태 | 하위 커맨드 |
|----------|-----------|-------------|
| Device Control | 확장 (기본) | Screen Share / Restart / Shutdown / Standby / Awake / Mute/Unmute / Lock/Unlock |
| App Control | 접힘 (기본) | App List / Install App / Clear Cache |
| Advanced Control | 접힘 (기본) | Network Status / Network Packet Capture / Send Dump / Factory Reset / Message / Install Firmware / Control RMS |

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| 기기 선택 (Devices 목록) | 연결 팝업 열기 | Device Info 탭 기본 표시 |
| Close 버튼 (연결 중) | Popup A 표시 | 연결 종료 확인 후 Issue report 이동 |
| Minimize 버튼 | 팝업 최소화 | 우측 하단에 기기명 표시 |
| [Edit Tags] 버튼 | Tags 팝업 열기 | 태그 추가/삭제 가능 |
| [Add] 버튼 (Tags 팝업) | 태그 추가 | 목록에 새 태그 추가 |
| [X] 버튼 (태그 항목) | 태그 삭제 | 해당 태그 제거 및 목록 재정렬 |
| [Apply] 버튼 (Device State) | 설정 저장 | 완료 알림 팝업 (3초) |
| [Reload] 버튼 | 정보 갱신 | 모든 정보 최신화 |
| "Please add a tags" 버튼 | Add Tag 팝업 표시 | 태그 추가 팝업 오픈 |

## 상태 / 분기

| 상태 | 조건 | 결과 |
|------|------|------|
| Controllable | 기기 제어 가능 | 커맨드 실행 가능 |
| View Only | 기기 제어 불가 | 커맨드 실행 불가 |
| 기기 미연결 | Device State 탭 | 토글 및 Apply dimmed |
| 태그 없음 | Device Info_1 | "Please add a tags" 버튼 표시 |
| Auto HDR ON | Device State | HDR 하위 설정 미표시 |
| Auto HDR OFF | Device State | HDR 하위 설정 표시 (미지원 dimmed) |
| Volume Permission Allow | Device State | 볼륨 조절 활성화 |
| Volume Permission Disallow | Device State | 볼륨 조절 비활성화 |
| Wallpaper Backdrop/Color | Device State | Timeout Setting 활성화 |
| Wallpaper Turn screen off | Device State | Timeout Setting 비활성화 |
| Diagnostics Normal | 정상 | 녹색 표시 |
| Diagnostics Warning | 정상 범위 초과 또는 잠재적 위험 | 노란색 + 정보 아이콘 |
| Diagnostics Critical | 시스템 오류/고장 | 빨간색 + 정보 아이콘 |

## 연결된 화면

- [Connecting Devices Policy](./connecting-devices-policy.md)
- [Command - Device Control](./command-device-control.md)
- [Command - App Control](./command-app-control.md)
- [Command - Advanced Control](./command-advanced-control.md)
- [Issue Report](./issue-report.md)

## 비고

- Minimize 최대 수: 5개 (GUI guide 참조), FIFO 정책 적용
- Uptime: 1일 미만 → 시간 표시 (예: 12 hours 30 minutes), 1일 이상 → 일+시간 표시 (예: 2 days 4 hours)
- SAID: 마지막 3자리 마스킹 (예: 12345678***)
- 소수점: 최대 2자리
- 날짜 형식: YYYY-MM-DD / HH:MM:SS (24시간)
