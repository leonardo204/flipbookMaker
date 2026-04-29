# Command - Device Control

> **경로**: 4. Connecting Devices > Command - Device Control
> **원본 ID**: `5oo7eo`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=5oo7eo)

## 목적

기기 연결 팝업의 Command 영역에서 Device Control 카테고리를 선택했을 때 표시되는 하위 명령들을 정의한다. Screen Share, Restart, Shutdown, Standby, Awake, Mute/Unmute, Lock/Unlock 총 7개(8개 동작) 커맨드 팝업을 포함한다.

## 진입 경로

- 기기 연결 팝업 → Command 영역 → [Device Control] 선택 (기본 확장 상태)
- 각 하위 커맨드 버튼 선택 시 해당 팝업 표시

## 화면 구성

![4.3 Command](./command-device-control.4-3.png)

### Device Control 카테고리

| 항목 | 기본 상태 | 하위 커맨드 |
|------|-----------|-------------|
| Device Control | 확장 (기본) | Screen Share / Restart / Shutdown / Standby / Awake / Mute/Unmute / Lock/Unlock |

---

![4.3.1.1 Device Control > Screen share](./command-device-control.4-3-1-1.png)

### 4.3.1.1 Device Control > Screen Share

| 구성 요소 | 내용 |
|-----------|------|
| 1. 연결된 기기 화면 | 연결된 기기의 화면 실시간 표시 |
| 2. 리모컨 | 방향키 (상/하/좌/우) / OK(확인) / Back/Exit / Home / Volume Up/Down / Channel Up/Down |
| 3. 숫자 키 | 0~9 숫자키 (실제 리모컨과 동일한 키 동작) |
| 4. Close 버튼 | Close 버튼 선택 시 Popup A 표시 |
| 5. [Record Start], [Screen capture] 버튼 | [Record Start]: 녹화 시작, 버튼 레이블이 [End recording]으로 변경 / [End recording]: 녹화 종료 및 비디오 저장 / [Screen capture]: 현재 화면 캡처 및 저장 |

---

![4.3.1.2 Device Control > Restart](./command-device-control.4-3-1-2.png)

### 4.3.1.2 Device Control > Restart

**설명:** Device Control > [Restart] 선택 시 표시되는 팝업

| 구성 요소 | 내용 |
|-----------|------|
| 1. 제목 | Restart |
| 2. 안내 메시지 | "Are you sure you want to restart this device?" / "The device will disconnect when you run this" |
| 3. [Restart] / [Close] 버튼 | [Restart]: 선택한 기기 재시작 / [Close]: 팝업 닫기 |

---

![4.3.1.3 Device Control > Shutdown](./command-device-control.4-3-1-3.png)

### 4.3.1.3 Device Control > Shutdown

**설명:** Device Control > [Shutdown] 선택 시 표시되는 팝업

| 구성 요소 | 내용 |
|-----------|------|
| 1. 제목 | Shutdown |
| 2. 안내 메시지 | "Are you sure you want to shut down this device?" / "The device will disconnect when you run this" |
| 3. [Shutdown] / [Close] 버튼 | [Shutdown]: 선택한 기기 전원 종료 / [Close]: 팝업 닫기 |

---

![4.3.1.4 Device Control > Standby](./command-device-control.4-3-1-4.png)

### 4.3.1.4 Device Control > Standby

**설명:** Device Control > [Standby] 선택 시 표시되는 팝업

| 구성 요소 | 내용 |
|-----------|------|
| 1. 제목 | Standby |
| 2. 안내 메시지 | "Are you sure you want to standby this device?" |
| 3. [Standby] / [Close] 버튼 | [Standby]: 선택한 기기를 Standby 모드로 전환 / [Close]: 팝업 닫기 |

---

![4.3.1.5 Device Control > Awake](./command-device-control.4-3-1-5.png)

### 4.3.1.5 Device Control > Awake

**설명:** Device Control > [Awake] 선택 시 표시되는 팝업

| 구성 요소 | 내용 |
|-----------|------|
| 1. 제목 | Awake |
| 2. 안내 메시지 | "Are you sure you want to awake this device?" |
| 3. [Awake] / [Close] 버튼 | [Awake]: 선택한 기기를 깨움 / [Close]: 팝업 닫기 |

---

![4.3.1.6 Device Control > Mute / Unmute](./command-device-control.4-3-1-6.png)

### 4.3.1.6 Device Control > Mute (Unmute 상태의 기기)

**설명:** Device Control > [Mute / Unmute] 선택 시 표시되는 팝업 (기기가 Unmute 상태인 경우)

| 구성 요소 | 내용 |
|-----------|------|
| 1. 제목 | Mute |
| 2. 안내 메시지 | "Are you sure you want to mute this device" |
| 3. [Mute] / [Close] 버튼 | [Mute]: 선택한 기기에 음소거 실행 / [Close]: 팝업 닫기 |

**Mute 실행 후 처리:**
- Device State 탭의 Volume 영역에서 "Mute master volume"이 ON으로 전환
- Volume control 옵션이 dimmed 처리됨 (4.2.2 Device State > 2-c 참조)

---

![4.3.1.7 Device Control > Mute / Unmute](./command-device-control.4-3-1-7.png)

### 4.3.1.7 Device Control > Unmute (Mute 상태의 기기)

**설명:** Device Control > [Mute / Unmute] 선택 시 표시되는 팝업 (기기가 Mute 상태인 경우)

| 구성 요소 | 내용 |
|-----------|------|
| 1. 제목 | Unmute |
| 2. 안내 메시지 | "Are you sure you want to unmute this device" |
| 3. [Unmute] / [Close] 버튼 | [Unmute]: 선택한 기기의 음소거 해제 / [Close]: 팝업 닫기 |

---

![4.3.1.8 Device control > Lock / Unlock](./command-device-control.4-3-1-8.png)

### 4.3.1.8 Device Control > Lock (Unlock 상태의 기기)

**설명:** Device Control > [Lock / Unlock] 선택 시 표시되는 팝업 (기기가 Unlock 상태인 경우)

| 구성 요소 | 내용 |
|-----------|------|
| 1. 제목 | Lock |
| 2. 안내 메시지 | "Are you sure you want to lock this device" |
| 3. [Lock] / [Close] 버튼 | [Lock]: 선택한 기기에 잠금 실행 / [Close]: 팝업 닫기 |

---

![4.3.1.9 Device control > Lock / Unlock](./command-device-control.4-3-1-9.png)

### 4.3.1.9 Device Control > Unlock (Lock 상태의 기기)

**설명:** Device Control > [Lock / Unlock] 선택 시 표시되는 팝업 (기기가 Lock 상태인 경우)

| 구성 요소 | 내용 |
|-----------|------|
| 1. 제목 | Unlock |
| 2. 안내 메시지 | "Are you sure you want to unlock this device" |
| 3. [Unlock] / [Close] 버튼 | [Unlock]: 선택한 기기의 잠금 해제 / [Close]: 팝업 닫기 |

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| [Screen Share] 선택 | Screen Share 팝업 열기 | 기기 화면 실시간 표시 + 리모컨 |
| 리모컨 버튼 선택 | 해당 키 액션 전송 | 연결된 기기에서 키 동작 실행 |
| [Record Start] 클릭 | 녹화 시작 | 버튼 레이블 → [End recording] |
| [End recording] 클릭 | 녹화 종료 | 비디오 저장 |
| [Screen capture] 클릭 | 화면 캡처 | 이미지 파일 저장 |
| [Restart] 선택 | Restart 팝업 표시 | 확인 후 기기 재시작 |
| [Shutdown] 선택 | Shutdown 팝업 표시 | 확인 후 기기 전원 종료 |
| [Standby] 선택 | Standby 팝업 표시 | 확인 후 Standby 모드 전환 |
| [Awake] 선택 | Awake 팝업 표시 | 확인 후 기기 깨움 |
| [Mute/Unmute] 선택 | Mute 또는 Unmute 팝업 표시 | 현재 상태에 따라 반전 |
| [Lock/Unlock] 선택 | Lock 또는 Unlock 팝업 표시 | 현재 상태에 따라 반전 |
| [Close] 클릭 (각 팝업) | 팝업 닫기 | 커맨드 미실행 |

## 상태 / 분기

| 커맨드 | 기기 현재 상태 | 팝업 제목 | 버튼 |
|--------|----------------|-----------|------|
| Mute / Unmute | Unmute 상태 | Mute | [Mute] / [Close] |
| Mute / Unmute | Mute 상태 | Unmute | [Unmute] / [Close] |
| Lock / Unlock | Unlock 상태 | Lock | [Lock] / [Close] |
| Lock / Unlock | Lock 상태 | Unlock | [Unlock] / [Close] |
| Restart / Shutdown | 연결 중 | 해당 제목 | 실행 시 기기 연결 해제 됨 |

## 연결된 화면

- [Connecting Devices](./connecting-devices.md)
- [Connecting Devices Policy](./connecting-devices-policy.md)

## 비고

- Restart / Shutdown 실행 시 기기 연결이 해제됨
- Mute 실행 후 Device State 탭 > Volume 영역의 "Mute master volume"이 자동으로 ON으로 전환됨
- Screen Share 팝업 닫기 시 Popup A (연결 종료 확인) 표시
- 팝업 구성 번호: 1 = 제목, 2 = 안내 메시지, 3 = 실행/닫기 버튼
