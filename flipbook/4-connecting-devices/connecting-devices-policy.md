# Connecting Devices Policy

> **경로**: 4. Connecting Devices > Connecting Devices Policy
> **원본 ID**: `k9ewm5`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=k9ewm5)

## 목적

기기 연결 팝업(Connecting Devices) 전반에 적용되는 공통 정책 및 서브 기능(Tooltip, Scroll, Minimize, Apply, Reload)을 정의한다.

## 진입 경로

- Devices 목록에서 기기를 선택하여 연결 팝업을 열었을 때 적용
- 4.1 Connecting devices policy 문서에 해당

## 화면 구성

![4.1 Connecting devices policy](./connecting-devices-policy.4-1.png)

### 4.1 메인 팝업 구성 요소

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1. 디바이스 정보 헤더 | Controllability Status | 아이콘 + 텍스트: Controllable / View Only |
| | SAID | 11자리 식별자, 마지막 3자리 마스킹 (예: 12345678***) |
| | Last Updated Time | 형식: Last Updated: YYYY-MM-DD HH:MM:SS |
| | Reload 버튼 | 선택 시 최신 정보 로드 및 업데이트 시각 갱신 |
| 2. Minimize / Close 버튼 | Minimize 버튼 | 팝업을 최소화하여 화면 우측 하단에 표시 |
| | Close 버튼 | 팝업 닫기 (기기 Connected 상태이면 Popup A 표시) |
| 3. 기기 상태 상세정보 | Device Status | 현재 온라인 상태 (Online / Offline) |
| | Screen Status | Watch / Stand by / Screen saver / Locked / Unknown |
| | CPU Temperature | 현재 CPU 온도 (임계값 초과 시 빨간 아이콘) |
| | Reboot Times | 최근 7일 재부팅 횟수 (표시 형식: 00 times) |
| | Uptime | 1일 미만: 시간 단위 / 1일 이상: 일 + 시간 단위 |
| | CPU Usage | 막대 그래프 (00% in use), 임계값 초과 시 빨간 아이콘 |
| | Memory | 막대 그래프 (000 GB of 000 are used), 소수점 2자리 |
| 4. 탭 | 기본 탭 | Device Info (기본 선택) |
| | 전체 탭 목록 | Device Info / Device State / Device Dashboard / Data usage / Diagnostics / Command transaction / Data history |
| 5. Command 영역 | Device Control (기본 확장) | Screen Share / Restart / Shutdown / Standby / Awake / Mute / Unmute / Lock / Unlock |
| | App Control (기본 접힘) | 선택 시 App List / Install App / Clear Cache 표시 |
| | Advanced Control (기본 접힘) | 선택 시 Network Status / Network Packet Capture / Send Dump / Factory Reset / Message / Install Firmware / Control RMS 표시 |

![4.1.1 Tool_tip](./connecting-devices-policy.4-1-1.png)

### 4.1.1 Tooltip

| 항목 | 설명 |
|------|------|
| CPU usage | 데이터 처리 및 앱 실행에 사용된 처리 능력의 총 비율 |
| CPU temperature | CPU에서 발생하는 열 |
| Reboot times | 오늘 00:00 기준 최근 7일간 재부팅 횟수 |
| Uptime | 셋톱박스가 켜진 상태를 유지한 시간 |
| Device status | 셋톱박스의 현재 연결 상태 |
| Memory | 기기에서 사용 중인 메모리와 가용 메모리 |
| Screen status | 셋톱박스의 현재 화면 활동 상태 |

- 각 아이콘에 마우스를 올리면 툴팁이 표시된다

![4.1.2 Scroll policy](./connecting-devices-policy.4-1-2.png)

### 4.1.2 Scroll Policy

| 규칙 | 내용 |
|------|------|
| 독립 스크롤 영역 | 팝업은 두 개의 독립적인 스크롤 영역으로 구성 |
| 스크롤 적용 범위 | 마우스 포인터가 위치한 영역에만 스크롤 적용 |
| 영역 간 영향 없음 | 한 영역 스크롤이 다른 영역에 영향을 주지 않음 |

![4.1.3 Minimize](./connecting-devices-policy.4-1-3.png)

### 4.1.3 Minimize

| 규칙 | 내용 |
|------|------|
| 최소화 위치 | 화면 우측 하단 |
| 최대 최소화 수 | N개 (GUI guide 참조) |
| FIFO 정책 | 최대 개수 초과 시 가장 오래된 최소화 팝업이 자동으로 제거되고 새 팝업 추가 |
| 디바이스명 표시 | 영역 초과 시 "..."으로 잘림 |
| 복원 | 기기명 영역 선택 시 해당 팝업 복원 |
| 닫기 | Close 버튼 선택 시 해당 팝업 닫힘 |

![2.8 ms](./connecting-devices-policy.2-8.png)

### 4.1.4 Apply

| 규칙 | 내용 |
|------|------|
| [Apply] 선택 | 변경된 설정값이 저장됨 |
| [Reload] 선택 (Apply 전) | 변경된 값이 초기화됨 |
| 다른 카테고리 이동 (Apply 전) | 확인 팝업 표시 |
| 설정 완료 알림 | 우측 하단 팝업 (3초 후 자동 사라짐): "Changes to settings have been applied" |
| 팝업 표시 중 조작 | 다른 버튼 선택 및 동작 정상 작동 |

**Apply Confirm Pop-up (설정 변경 후 이동 시)**
- 조건: 설정값 변경 후 [Apply] 버튼 없이 다른 탭으로 이동 시도
- 팝업 메시지: "Changed setting value not applied. Are you sure you want to move?"
- 버튼: [OK] / [Close]

![4.1.4 Apply](./connecting-devices-policy.4-1-4.png)

### 4.1.5 Reload

| 규칙 | 내용 |
|------|------|
| [Reload] 선택 | 모든 정보가 최신 데이터로 갱신됨 |
| 탭 유지 | 현재 선택된 탭은 그대로 유지 |
| 설정 변경 후 Reload | Apply 없이 Reload 선택 시 변경값이 초기화됨 |
| 완료 알림 | 우측 하단 팝업 (3초 후 자동 사라짐): "All information has been reloaded" |
| 팝업 표시 중 조작 | 다른 버튼 선택 및 동작 정상 작동 |

![4.1.5 Reload](./connecting-devices-policy.4-1-5.png)

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| Close 버튼 (기기 연결 중) | Popup A 표시 | "Do you really terminate the connection with the device?" → [OK] / [Cancel] |
| OK 선택 (Popup A) | 기기 연결 종료 | Issue report 페이지로 이동 |
| Minimize 버튼 | 팝업 최소화 | 화면 우측 하단에 최소화 상태로 표시 |
| 최소화 팝업 기기명 클릭 | 팝업 복원 | 해당 팝업이 원래 크기로 복원 |
| 최소화 팝업 Close 클릭 | 팝업 닫기 | 해당 팝업 제거 |
| [Apply] 클릭 | 설정 저장 | 완료 알림 팝업 표시 (3초) |
| [Reload] 클릭 | 정보 갱신 | 완료 알림 팝업 표시 (3초) |
| 각 아이콘 마우스 오버 | 툴팁 표시 | 해당 항목 설명 표시 |

## 상태 / 분기

| 상태 | 조건 | 표시 |
|------|------|------|
| Controllable | 기기 제어 가능 | 아이콘 + "Controllable" 텍스트 |
| View Only | 기기 제어 불가 | 아이콘 + "View Only" 텍스트 |
| Screen Status: Locked | 화면 잠금 상태 | 빨간색 아이콘 표시 |
| CPU Temperature 임계값 초과 | 온도 초과 | 빨간색 아이콘 표시 |
| CPU Usage 임계값 초과 | 사용률 초과 | 빨간색 아이콘 표시 |
| Memory 임계값 초과 | 메모리 초과 | 빨간색 아이콘 표시 |
| Memory 단위 | 1000MB 이상 | GB로 표시 |
| Memory 단위 | 999MB 이하 | MB로 표시 |
| Uptime 단위 | 1일 미만 | 시간 단위 (예: 12 hours 30 minutes) |
| Uptime 단위 | 1일 이상 | 일+시간 단위 (예: 2 days 4 hours) |
| Reboot Times | 집계 기준 | 매일 00:00 집계, 최근 7일 커버 |

## 연결된 화면

- [Connecting Devices](./connecting-devices.md)
- [Issue Report](./issue-report.md)
- [Command - Device Control](./command-device-control.md)
- [Command - App Control](./command-app-control.md)
- [Command - Advanced Control](./command-advanced-control.md)

## 업데이트 이력

| 날짜 | 변경 내용 |
|------|-----------|
| 2026.04.24 | SAID 뒤에 3자리 마스킹 정책 추가 |

## 비고

- Memory 표시: 소수점 최대 2자리 (예: 000.00)
- SAID: 11자리 식별자, 마지막 3자리는 보안상 마스킹 (예: 12345678***)
- Last Updated Time 형식: Last Updated: YYYY-MM-DD HH:MM:SS
- Reboot Times 표시 형식: 00 times
