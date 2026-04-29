# Set-top Box UI Scenario

> **경로**: 8. Set-top box UI scenario > Set-top box UI scenario
> **원본 ID**: `05xx9v`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=05xx9v)

![9.1 Set-top box UI scenario](./set-top-box-ui-scenario.9-1.png)

## 목적

셋톱박스(Android 기반)에서 RMS(Remote Management System) 앱을 통해 상담원과 연결하는 UI 시나리오를 정의하는 화면이다. 사용자가 Settings 메뉴에서 RMS 앱을 실행하고 상담원과 연결하기까지의 전체 흐름, 팝업 동작, 키 조작 방식, 연결 해제 및 오류 처리를 포함한다.

## 진입 경로

- 셋톱박스 Home > Settings > RMS 앱 선택

## 화면 구성 및 UI 시나리오 단계

---

![9.1.1 Setting menu](./set-top-box-ui-scenario.9-1-1.png)

### 9.1.1 Setting Menu (초기 진입)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | RMS 앱 포커스 위치 | Settings 메뉴 내 RMS 앱 항목에 포커스 |
| - | 우측 방향키 | 반응 없음 |
| - | OK 키 | RMS 앱 실행 팝업 표시 (9.1.2 참조) |

**Settings 메뉴 항목 예시**

- RMS
- Android Settings
- Account
- System Info
- Privacy Policy
- Dark Mode (ON)
- Manage Account PIN

---

![9.1.2 RMS app launch popup](./set-top-box-ui-scenario.9-1-2.png)

### 9.1.2 RMS App Launch Popup (실행 확인 팝업)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | 안내 텍스트 | "RMS is a screen share app for customer consultation. Is it right to connect the app according to the agent's request?" |
| 2 | [OK] / [Cancel] 버튼 | 기본 포커스: [OK] 버튼 |
| - | Up/Down 방향키 | 버튼 간 포커스 이동 |
| - | Left/Right 방향키 | 반응 없음 |
| - | [OK] 선택 | RMS 앱 동의 팝업 표시 |
| - | [Cancel] 선택 또는 Back/Exit 키 | 팝업 닫기. Settings 화면으로 복귀 (포커스 이력 유지) |

---

![9.1.3 RMS app agreement popup (displayed on first entry)](./set-top-box-ui-scenario.9-1-3.png)

### 9.1.3 RMS App Agreement Popup — 최초 진입 시

**표시 조건**: RMS 앱에 처음 진입하는 경우

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | 안내 텍스트 | "To use the RMS app, do you agree to the following two conditions?" |
| 2 | 동의 체크박스 1 | "Do you agree to let the RMS app collect your information?" — [Agree] |
| 3 | 동의 체크박스 2 | "Connecting the app allows the agent to change settings remotely. Do you agree to connect the app and let the agent control your TV settings?" — [Agree] |
| 4 | [Agree to All Terms] 버튼 | 모든 동의 체크박스를 한 번에 체크 후 [OK] 버튼으로 포커스 이동 |
| 5 | [OK] / [Cancel] 버튼 | 동의 미체크 시 [OK] 버튼 비활성화(Dimmed). 두 체크박스 모두 체크 시 [OK] 활성화 및 포커스 이동 |

**키 동작 규칙**

| 키 | 동작 |
|----|------|
| 기본 포커스 | [Agree to All Terms] 체크박스 |
| [Agree to All Terms] 체크 | 모든 동의 체크박스 체크 + [OK] 활성화 + 포커스 → [OK] |
| [Agree to All Terms] Up 방향키 | 포커스 → 두 번째 [Agree] 체크박스 |
| [Agree to All Terms] Down 방향키 (미체크) | 포커스 → [Cancel] 버튼 |
| 두 번째 [Agree] Up 방향키 | 포커스 → 첫 번째 [Agree] 체크박스 |
| Left/Right 방향키 | 반응 없음 |
| 두 체크박스 모두 체크 시 | [OK] 활성화 + 포커스 → [OK] |
| [OK] 선택 | Connection 팝업 표시 (9.1.5 참조) |
| Back 키 | RMS 앱 실행 팝업 표시 (9.1.2 참조) |
| [Cancel] 선택 또는 Exit 키 | 팝업 닫기. Settings 화면으로 복귀 (포커스 이력 유지) |

#### 9.1.3.1 최초 진입 시 RMS 앱 동의 플로우

```
[기본 포커스: Agree to All Terms]
    │
    ├─ OK key → 체크박스 체크
    │
[Agree to All Terms 체크]
    │
    → 모든 동의 체크 + [OK] 활성화 + 포커스 → [OK]
    
[두 체크박스 개별 선택 시]
    [Agree to All Terms] → Down arrow → [Cancel]
    [Agree to All Terms] → Up arrow → 두 번째 [Agree]
    두 번째 [Agree] → Up arrow → 첫 번째 [Agree]
    두 [Agree] 모두 체크 → [OK] 활성화 + 포커스 → [OK]
```

---

![9.1.4 RMS app agreement popup (for subsequent entries)](./set-top-box-ui-scenario.9-1-4.png)

### 9.1.4 RMS App Agreement Popup — 재진입 시

**표시 조건**: RMS 앱에 이전에 진입한 적이 있는 경우 (최초 이후)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | 안내 텍스트 | "Are you sure you want to connect to the RMS app?" |
| 2 | 동의 체크박스 | "Connecting the app allows the agent to change settings remotely. Do you agree to connect the app and let the agent control your TV settings?" — [Agree] |
| 3 | [OK] / [Cancel] 버튼 | 체크박스 미체크 시 [OK] 비활성화. 체크 시 [OK] 활성화 및 포커스 이동 |

**키 동작 규칙**

| 키 | 동작 |
|----|------|
| 기본 포커스 | [Agree] 체크박스 |
| [Agree] 체크 | [OK] 활성화 + 포커스 → [OK] |
| Down 방향키 (미체크) | 포커스 → [Cancel] |
| Left/Right 방향키 | 반응 없음 |
| [OK] 선택 | Connection 팝업 표시 (9.1.5 참조) |
| Back 키 | RMS 앱 실행 팝업 표시 (9.1.2 참조) |
| [Cancel] 선택 또는 Exit 키 | 팝업 닫기. Settings 화면으로 복귀 (포커스 이력 유지) |

![9.1.4.1 RMS app agreement flow (for subsequent entries)](./set-top-box-ui-scenario.9-1-4-1.png)

#### 9.1.4.1 재진입 시 RMS 앱 동의 플로우

```
[기본 포커스: Agree 체크박스]
    │
    ├─ OK key → 체크박스 체크 + [OK] 활성화 + 포커스 → [OK]
    ├─ Down arrow (미체크) → [Cancel]로 포커스
    └─ [Agree] 체크 → [OK] 활성화 + 포커스 → [OK]
```

---

![9.1.5 Connection popup](./set-top-box-ui-scenario.9-1-5.png)

### 9.1.5 Connection Popup (연결 대기 팝업)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | 안내 텍스트 | "Please wait a moment. Please tell the agent the keycode" (연결 흐름 내에서는 "Please tell the agent the access key"로도 표시됨) |
| 2 | Access Key | 4자리 일회용 접근 키 생성 및 표시 (예: 1234) |
| 3 | [Close] 버튼 | 기본 포커스: [Close] 버튼 |
| - | Left/Right / Up/Down 방향키 | 반응 없음 |
| - | [Close] 선택 또는 Back/Exit 키 | 연결 해제 확인 팝업 표시 (9.1.6 참조) |

---

![9.1.6 Connection termination confirmation popup](./set-top-box-ui-scenario.9-1-6.png)

### 9.1.6 Connection Termination Confirmation Popup (연결 해제 확인 팝업)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | 안내 텍스트 | "Are you sure you want to disconnect? If you stop connecting now, you'll have to wait from the beginning." |
| 2 | [Disconnect] / [Cancel] 버튼 | 기본 포커스: [Disconnect] 버튼 |
| - | Up/Down 방향키 | 버튼 간 포커스 이동 |
| - | Left/Right 방향키 | 반응 없음 |
| - | [Disconnect] 선택 | 연결 해제 팝업 표시 (9.1.7 RMS Connection Termination Popup) |
| - | [Cancel] 선택 또는 Back/Exit 키 | Connection 팝업으로 복귀 (9.1.5 참조) |

---

![9.1.7 RMS connection screen](./set-top-box-ui-scenario.9-1-7.png)

### 9.1.7 RMS Connection Screen (연결 중 화면)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | RMS 앱 연결 상태 표시 | "Connecting RMS" |
| 2 | RMS 연결 시간 | 상담원과의 연결 시간 표시 (HH:MM:SS 형식). 시작부터 경과 시간. 빈 자리는 0으로 표시 (예: 00:04:01 / 07:02:00) |
| - | Back/Exit 키 | RMS 연결 해제 불가 (키 동작 없음) |
| - | 상담원이 연결 종료 시 | 연결 종료 팝업 표시 (9.1.9 RMS Connection Termination Popup) |
| - | 오류로 연결 종료 시 | 에러 팝업 표시 (9.1.10 Error Popup) |

---

![9.1.8 Screen sharing request popup (Formal popup display)](./set-top-box-ui-scenario.9-1-8.png)

### 9.1.8 Screen Sharing Request Popup (화면 공유 요청 팝업)

**표시 조건**: 상담원이 Widget 내 [Screen share] 버튼 선택 시 표시

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| - | 안내 텍스트 | "Do you want to start recording or streaming with the RMS Client? The RMS Client can access all information displayed on the screen or played on the device during recording or streaming. This includes passwords, payment details, photos, messages, and any audio being played." |
| - | [Start] 버튼 | 화면 공유 시작. 화면은 기존 RMS 연결 화면(9.1.7)으로 유지됨 |
| - | [Cancel] 버튼 | 팝업 닫기 |

---

![9.1.9 RMS connection termination popup](./set-top-box-ui-scenario.9-1-9.png)

### 9.1.9 RMS Connection Termination Popup (상담 종료 팝업)

**표시 조건**: 상담원이 연결을 종료한 경우

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | 안내 텍스트 | "Exit the RMS app. Ending the consultation." |
| 2 | [OK] 버튼 | 기본 동작 |
| - | [OK] 선택 또는 Back/Exit 키 | 팝업 닫기. Home 메인 화면으로 복귀 |

---

![9.1.10 Error popup](./set-top-box-ui-scenario.9-1-10.png)

### 9.1.10 Error Popup (오류 팝업)

**표시 조건**: 오류로 인해 앱이 더 이상 실행될 수 없는 경우

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | 안내 텍스트 | "Error. Sorry, The app can no longer run due to an error. Please try again." |
| 2 | [OK] 버튼 | 기본 동작 |
| - | [OK] 선택 또는 Back/Exit 키 | 팝업 닫기. 앱 실행 전 화면으로 복귀 (포커스 이력 유지) |

---

![9.1.11 Connection Flow](./set-top-box-ui-scenario.9-1-11.png)

### 9.1.11 Connection Flow (전체 연결 흐름)

#### 최초 진입 vs 재진입 분기

```
Settings에서 RMS 앱 선택
    │
    ▼
[RMS 앱 실행 팝업 (9.1.2)]
    │
[OK] 선택
    │
    ├──── 최초 진입 ────────────────────────────────────────────────────────
    │         ↓
    │    [동의 팝업 (9.1.3) — 2가지 동의 항목]
    │    동의 체크 후 [OK] → Connection 팝업 (9.1.5)
    │    Back → 실행 팝업 (9.1.2) 복귀
    │    Cancel/Exit → Settings 화면 복귀
    │
    └──── 재진입 ────────────────────────────────────────────────────────
              ↓
         [동의 팝업 (9.1.4) — 1가지 동의 항목]
         동의 체크 후 [OK] → Connection 팝업 (9.1.5)
         Back → 실행 팝업 (9.1.2) 복귀
         Cancel/Exit → Settings 화면 복귀

[Connection 팝업 (9.1.5)]
    Access Key 표시 (4자리)
    상담원에게 Access Key 전달
    │
    ├─ [Close] / Back/Exit 키 → 연결 해제 확인 팝업 (9.1.6)
    │
    ▼ (상담원이 접속)
[연결 중 화면 (9.1.7)]
    Connecting RMS + 경과 시간 표시
    │
    ├─ 상담원이 Screen Share 요청 → 화면 공유 요청 팝업 (9.1.8)
    │       [Start] → 화면 공유 시작 (연결 화면 유지)
    │       [Cancel] → 팝업 닫기
    │
    ├─ 상담원이 연결 종료 → 상담 종료 팝업 (9.1.9)
    │       [OK] / Back/Exit → Home 메인 화면 복귀
    │
    └─ 오류 발생 → 에러 팝업 (9.1.10)
            [OK] / Back/Exit → 앱 실행 전 화면 복귀
```

---

![9.1.12 When the connection is disconnected](./set-top-box-ui-scenario.9-1-12.png)

### 9.1.12 When the Connection is Disconnected (연결 해제 시나리오)

**시나리오**: 연결 중 상담원이 강제로 세션을 종료하는 경우

```
[연결 중 화면 (9.1.7)]
    │
    상담원이 강제 세션 종료
    │
    ▼
[기존 팝업 닫기]
    │
    ▼
[Connection 팝업 재표시 (9.1.5)]
    Access Key 재생성 (새로운 4자리 키)
    │
    ▼
[재연결 화면]
    Connecting RMS + 00:00:00 표시
```

**재연결 흐름**

```
Settings에서 RMS 앱 재선택
    │
    ▼
[RMS 앱 실행 팝업 (9.1.2)]
    [OK] → 다음 안내 팝업 표시
    [Cancel] / Back/Exit → Settings 화면 복귀
    │
    ▼
[동의 팝업 (재진입용, 9.1.4)]
    동의 체크 후 [OK] → Connection 팝업
    [Back] → 이전 팝업으로
    [Cancel] / Exit 키 → Settings 화면 복귀
    │
    ▼
[Connection 팝업 (9.1.5)]
    [Close] / Back/Exit 키 → 연결 해제 확인 팝업
    │
    ▼
[연결 중 화면 (9.1.7)]
```

---

![9.1.13 Set-top Box Lock Alert Popup](./set-top-box-ui-scenario.9-1-13.png)

### 9.1.13 Set-top Box Lock Alert Popup (셋톱박스 잠금 알림 팝업)

**표시 조건**: 관리자가 [Lock] 명령을 전송한 경우

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| - | 팝업 제목 | "Notice" |
| - | 안내 텍스트 | "This set-top box is currently locked by the administrator. We apologize for any inconvenience." |
| - | 키 동작 | 전원 On/Off 키를 제외한 모든 키 동작 불가 |
| - | Lock 중 사용 시 | 모든 기능 중지 후 팝업 표시 |
| - | Lock 중 전원 꺼진 후 켤 때 | 셋톱박스 켜지면 팝업 표시 |
| - | [Unlock] 명령 수신 시 | 팝업 즉시 사라지고 정상 동작 재개 |

---

![9.1.14 Network Disconnection Issue Popup](./set-top-box-ui-scenario.9-1-14.png)

### 9.1.14 Network Disconnection Issue Popup (네트워크 이상 팝업)

**표시 조건**: 1시간 내 3회 네트워크 연결 해제 발생 시

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| - | 팝업 제목 | "Notice" |
| 1 | 표시 메시지 | "There is a network anomaly, would you like to try to fix it?" |
| 2 | [OK] 버튼 | 팝업 닫기 + 설정된 문제 해결 동작 실행 |
| - | [OK] / Back / Exit 키 | 팝업 닫기 + 설정된 문제 해결 동작 실행 |

---

## 인터랙션 요약

| 트리거 | 동작 | 결과 |
|--------|------|------|
| Settings에서 RMS 앱 선택 + OK 키 | 실행 확인 팝업 표시 (9.1.2) | RMS 앱 실행 팝업 오픈 |
| [OK] (최초 진입) | 2가지 동의 팝업 표시 (9.1.3) | 정보 수집 + 원격 제어 동의 요청 |
| [OK] (재진입) | 1가지 동의 팝업 표시 (9.1.4) | 원격 제어 동의 요청 |
| 동의 완료 + [OK] | Connection 팝업 표시 (9.1.5) | 4자리 Access Key 생성 및 표시 |
| [Close] (Connection 팝업) | 연결 해제 확인 팝업 (9.1.6) | 해제 여부 확인 |
| [Disconnect] (해제 확인) | 연결 해제 및 화면 복귀 | Settings 화면으로 복귀 |
| 상담원 접속 | 연결 중 화면 (9.1.7) | "Connecting RMS" + 경과 시간 표시 |
| 상담원이 Screen Share 요청 | 화면 공유 요청 팝업 (9.1.8) | [Start]/[Cancel] 선택 |
| 상담원이 연결 종료 | 상담 종료 팝업 (9.1.9) | "Ending the consultation" + [OK] → Home |
| 오류 발생 | 에러 팝업 (9.1.10) | "Please try again" + [OK] → 이전 화면 |
| Lock 명령 수신 | 잠금 알림 팝업 (9.1.13) | 전원 키 외 모든 키 비활성화 |
| Unlock 명령 수신 | 잠금 해제 | 팝업 사라지고 정상 동작 재개 |
| 1시간 내 3회 네트워크 해제 | 네트워크 이상 팝업 (9.1.14) | 문제 해결 동작 실행 |

## 상태 / 분기

| 상태 | 분기 조건 | 결과 |
|------|-----------|------|
| 최초 RMS 진입 | 이전 RMS 사용 이력 없음 | 2가지 동의 항목 (9.1.3) |
| 재진입 | 이전 RMS 사용 이력 있음 | 1가지 동의 항목 (9.1.4) |
| 연결 중 | 상담원이 정상 종료 | 상담 종료 팝업 (9.1.9) → Home 복귀 |
| 연결 중 | 오류 발생 | 에러 팝업 (9.1.10) → 앱 실행 전 화면 복귀 |
| 연결 중 | 상담원이 강제 세션 종료 | Connection 팝업 재표시 + Access Key 재생성 (9.1.12) |
| 잠금 상태 | Lock 명령 수신 | 전원 키 외 모든 키 비활성화 (9.1.13) |
| 잠금 해제 | Unlock 명령 수신 | 즉시 정상 동작 재개 |
| 네트워크 이상 | 1시간 내 3회 연결 해제 | 문제 해결 팝업 표시 (9.1.14) |
| [OK] 비활성화 | 동의 미체크 | [OK] 버튼 Dimmed 상태 |

## 연결된 화면

- 9.1.2: RMS App Launch Popup → 9.1.3 또는 9.1.4로 분기
- 9.1.3: 최초 진입 동의 팝업 → 9.1.5 Connection Popup
- 9.1.4: 재진입 동의 팝업 → 9.1.5 Connection Popup
- 9.1.5: Connection Popup → 9.1.6 또는 9.1.7로 분기
- 9.1.6: 해제 확인 팝업 → 9.1.5 복귀 또는 연결 해제
- 9.1.7: 연결 중 화면 → 9.1.8, 9.1.9, 9.1.10으로 분기
- 9.1.8: 화면 공유 팝업 → 9.1.7로 복귀
- 9.1.9: 상담 종료 팝업 → Home 메인 화면
- 9.1.10: 에러 팝업 → 앱 실행 전 화면
- 9.1.12: 재연결 시나리오 → 9.1.5 재표시
- Lock 명령 관련 화면: [Lock Command] → ../2-devices/command-1.md 또는 ../4-connecting-devices/command-device-control.md

## 비고

- 모든 팝업에서 Left/Right 방향키는 반응 없음
- 연결 중(9.1.7) Back/Exit 키로 연결 해제 불가
- Access Key는 4자리 일회용 코드로 매 연결 시도마다 재생성
- 잠금 상태에서 전원 On/Off 키만 동작 가능
- 셋톱박스 꺼진 상태에서 Lock 명령 수신 시, 켜지면 잠금 팝업 표시
- 화면 공유 수락 시 화면 유지 (9.1.7 연결 중 화면). 상담원이 화면을 원격으로 제어 가능
- 네트워크 이상 팝업은 1시간 내 3회 연결 해제 시 자동 표시
