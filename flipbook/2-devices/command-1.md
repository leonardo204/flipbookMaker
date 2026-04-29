# Command (Device Control / App Control)

> **경로**: 2. Devices > Device List > Execute Command
> **원본 ID**: `2p6rvk`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=2p6rvk)

## 목적

Device List 또는 Device Group에서 선택한 디바이스/그룹에 원격 커맨드를 실행하는 화면. Device Control 및 App Control 커맨드 팝업 포함.

## 진입 경로

- Device List > [Execute Command] 버튼 > 커맨드 선택
- Device Group List > [Execute Command] 버튼 > 커맨드 선택

## 화면 구성

![2.4 Command](./command-1.2-4.png)

### 2.4.1 Command Flow (공통 동작)

![2.4.1 Command flow](./command-1.2-4-1.png)

| 항목 | 내용 |
|------|------|
| 커맨드 완료 시 | 화면 우하단에 완료 팝업 표시 |
| 완료 팝업 | 3초 후 자동 소멸 |
| 팝업 표시 중 | 다른 버튼 계속 사용 가능 |
| 선택 수 표시 | 팝업 메시지에 실행된 디바이스/그룹 수 표시 |

### 커맨드 카테고리 구조

| 카테고리 | 서브 커맨드 |
|----------|------------|
| Device Control | Restart, Shutdown, Standby, Awake, Mute, Unmute, Lock, Unlock |
| App Control | App Update, Clear Cache |
| Advanced Control | Network Packet Capture, Send Dump, Factory Reset, Message, Connection Device, Disconnection Device, Enable RMS, Disable RMS, Firmware Update |

---

## Device Control 커맨드 상세

### 2.4.2 Restart (디바이스)

![2.4.2 Device Control > Restart_devices](./command-1.2-4-2.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 팝업 제목 | Restart | - |
| 안내 메시지 | "Do you want to restart on '{N}' devices?" | N = 선택된 디바이스 수 |
| 버튼 | Forced Restart | 현재 시청 상태 무관, 즉시 재시작 |
| 버튼 | Standby Restart | 디바이스가 Standby 모드 진입 시 재시작 |
| 버튼 | Close | 팝업 닫기 |
| 완료 팝업 | "Restart completed successfully on {N} devices" | - |

### 2.4.2.1 Restart (그룹)

![2.4.2.1 Device Control > Restart_group](./command-1.2-4-2-1.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 안내 메시지 | "Do you want to restart the '{N}' groups?" | N = 선택된 그룹 수 |
| 버튼 | Forced Restart / Standby Restart / Close | 동일 |
| 완료 팝업 | "Restart completed successfully on {N} devices" | - |

---

### 2.4.3 Shutdown (디바이스)

![2.4.3 Device Control > Shutdown_devices](./command-1.2-4-3.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 팝업 제목 | Shutdown | - |
| 안내 메시지 | "Do you want to shutdown to '{N}' devices?" | - |
| 경고 | "The device will disconnect when you run this" | - |
| 버튼 | Shutdown / Close | - |
| 완료 팝업 | "Shutdown completed successfully on {N} devices" | - |

### 2.4.3.1 Shutdown (그룹)

![2.4.3.1 Device Control > Shutdown_group](./command-1.2-4-3-1.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 안내 메시지 | "Do you want to shutdown to '{N}' groups?" | - |
| 경고 | "The device will disconnect when you run this" | - |
| 완료 팝업 | "Shutdown completed successfully on {N} groups" | - |

---

### 2.4.4 Standby (디바이스)

![2.4.4 Device Control > Standby_devices](./command-1.2-4-4.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 팝업 제목 | Standby | - |
| 안내 메시지 | "Do you want to set '{N}' devices to standby mode?" | - |
| 버튼 | Standby / Close | - |
| 완료 팝업 | "{N} devices have been set to standby mode" | - |

### 2.4.4.1 Standby (그룹)

![2.4.4.1 Device Control > Standby_group](./command-1.2-4-4-1.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 안내 메시지 | "Do you want to set '{N}' groups to standby mode?" | - |
| 완료 팝업 | "{N} groups have been set to standby mode" | - |

---

### 2.4.5 Awake (디바이스)

![2.4.5 Device Control > Awake_devices](./command-1.2-4-5.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 팝업 제목 | Awake | - |
| 안내 메시지 | "Do you want to wake up '{N}' devices from standby mode?" | - |
| 버튼 | Awake / Close | - |
| 완료 팝업 | "Awake command has been executed for {N} devices" | - |

### 2.4.5.1 Awake (그룹)

![2.4.5.1 Device Control > Awake_group](./command-1.2-4-5-1.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 안내 메시지 | "Do you want to wake up '{N}' groups from standby mode?" | - |
| 완료 팝업 | "Awake command has been applied to {N} groups" | - |

---

### 2.4.6 Mute (디바이스)

![2.4.6 Device control > Mute_devices](./command-1.2-4-6.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 팝업 제목 | Mute | - |
| 안내 메시지 | "Do you want to mute on '{N}' devices?" | - |
| 버튼 | Mute / Close | - |
| 완료 팝업 | "Mute has been enabled on {N} devices" | - |

### 2.4.6.1 Mute (그룹)

![2.4.6.1 Device control > Mute_group](./command-1.2-4-6-1.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 안내 메시지 | "Do you want to mute this group on {N} devices?" | - |
| 완료 팝업 | "Mute has been enabled on {N} groups" | - |

---

### 2.4.7 Unmute (디바이스)

![2.4.7 Device control > Unmute_devices](./command-1.2-4-7.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 팝업 제목 | Unmute | - |
| 안내 메시지 | "Do you want to release mute on '{N}' devices?" | - |
| 버튼 | Unmute / Close | - |
| 완료 팝업 | "Mute has been released on {N} devices" | - |

### 2.4.7.1 Unmute (그룹)

![2.4.7.1 Device control > Unmute_group](./command-1.2-4-7-1.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 안내 메시지 | "Do you want to release mute on '{N}' groups?" | - |
| 완료 팝업 | "Mute has been released on {N} groups" | - |

---

### 2.4.8 Lock (디바이스)

![2.4.8 Device control > Lock_devices](./command-1.2-4-8.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 팝업 제목 | Lock | - |
| 안내 메시지 | 선택된 디바이스 수 포함 가이드 메시지 | - |
| 버튼 | Lock / Close | - |
| 완료 팝업 | 완료 메시지 + N devices | - |

### 2.4.8.1 Lock (그룹)

![2.4.8.1 Device control > Lock_group](./command-1.2-4-8-1.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 안내 메시지 | 선택된 그룹 수 포함 가이드 메시지 | - |
| 완료 팝업 | 완료 메시지 + N groups | - |

---

### 2.4.9 Unlock (디바이스)

![2.4.9 Device control > Unlock_devices](./command-1.2-4-9.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 팝업 제목 | Unlock | - |
| 안내 메시지 | 선택된 디바이스 수 포함 가이드 메시지 | - |
| 버튼 | Unlock / Close | - |
| 완료 팝업 | 완료 메시지 + N devices | - |

### 2.4.9.1 Unlock (그룹)

![2.4.9.1 Device control > Unlock_group](./command-1.2-4-9-1.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 안내 메시지 | 선택된 그룹 수 포함 가이드 메시지 | - |
| 완료 팝업 | 완료 메시지 + N groups | - |

---

## App Control 커맨드 상세

### 2.4.10 App Update (디바이스)

![2.4.10 App Control > App update_devices](./command-1.2-4-10.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 팝업 제목 | App Update | - |
| 선택 수 표시 | "N Devices" | 예: "18 Devices" |
| 앱 목록 | 체크박스, 앱명, 버전 드롭다운 | 설치 가능한 버전 목록 표시 |
| 버튼 | Apply | 선택된 앱 업데이트, 미선택 시 비활성 |
| 버튼 | Close | 팝업 닫기 |
| 완료 팝업 | "The app update has been completed on {N} devices" | - |

### 2.4.10.1 App Update (그룹)

![2.4.10.1 App Control > App update_group](./command-1.2-4-10-1.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 선택 수 표시 | "N Groups" | - |
| 앱 목록 | 체크박스, 앱명, 버전 드롭다운 | 동일 |
| 완료 팝업 | "The app update has been completed on {N} groups" | - |

---

### 2.4.11 Clear Cache (디바이스)

![2.4.11 App Control > Clear cache_devices](./command-1.2-4-11.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 팝업 제목 | Clear Cache | - |
| 선택 수 표시 | "N Devices" | 예: "18 Devices" |
| 앱 목록 | 체크박스, 앱명 | (버전 없음) |
| 버튼 | Apply | 선택된 앱 캐시 삭제, 미선택 시 비활성 |
| 버튼 | Close | 팝업 닫기 |
| 완료 팝업 | "Cache cleared successfully on {N} devices" | - |

### 2.4.11.1 Clear Cache (그룹)

![2.4.11.1 App Control > Clear cache_group](./command-1.2-4-11-1.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 선택 수 표시 | "N Groups" | - |
| 완료 팝업 | "Cache clearing completed on {N} groups" | - |

---

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| Execute Command 클릭 | 드롭다운 표시 | Device Control, App Control, Advanced Control |
| 커맨드 hover | 서브 커맨드 표시 | - |
| 서브 커맨드 클릭 | 해당 커맨드 팝업 표시 | - |
| [Forced Restart] | 즉시 재시작 | 완료 팝업 (우하단, 3초) |
| [Standby Restart] | Standby 시 재시작 | 완료 팝업 (우하단, 3초) |
| [Shutdown] | 즉시 종료 | 완료 팝업 (우하단, 3초) |
| [Standby] | Standby 전환 | 완료 팝업 (우하단, 3초) |
| [Awake] | Standby 해제 | 완료 팝업 (우하단, 3초) |
| [Mute] | 음소거 | 완료 팝업 (우하단, 3초) |
| [Unmute] | 음소거 해제 | 완료 팝업 (우하단, 3초) |
| [Lock] | 화면 잠금 | 완료 팝업 (우하단, 3초) |
| [Unlock] | 잠금 해제 | 완료 팝업 (우하단, 3초) |
| App Update [Apply] | 선택 앱 업데이트 | 완료 팝업 (우하단, 3초) |
| Clear Cache [Apply] | 선택 앱 캐시 삭제 | 완료 팝업 (우하단, 3초) |
| App/Cache 미선택 시 | [Apply] 비활성 | - |

## 상태 / 분기

| 상태 | 조건 | 처리 |
|------|------|------|
| 디바이스 대상 | devices 선택 | 각 커맨드 _devices 팝업 |
| 그룹 대상 | groups 선택 | 각 커맨드 _group 팝업 |
| 커맨드 완료 | 성공 | 우하단 완료 팝업 3초 표시 |
| 팝업 표시 중 | - | 다른 버튼 계속 동작 가능 |

## 연결된 화면

| 화면 | 링크 |
|------|------|
| Device List (2.1) | [./device-list.md](./device-list.md) |
| Device Group (2.3) | [./device-group.md](./device-group.md) |
| Command Advanced (2.4.12~) | [./command-2.md](./command-2.md) |

## 비고

- 모든 커맨드 완료 팝업: 우하단 표시, 3초 후 자동 소멸
- 완료 팝업 표시 중에도 다른 버튼 동작 가능
- App Update: 버전 드롭다운으로 설치할 버전 선택 가능
- Clear Cache: 버전 선택 없이 앱명만 표시
- Restart: Forced(즉시) / Standby(대기 후) 두 가지 방식 제공
- Shutdown 경고: "The device will disconnect when you run this"
