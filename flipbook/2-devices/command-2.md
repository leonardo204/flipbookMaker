# Command (Advanced Control)

> **경로**: 2. Devices > Device List > Execute Command > Advanced Control
> **원본 ID**: `g3i1ta`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=g3i1ta)

## 목적

디바이스/그룹에 대한 고급 제어 커맨드 화면. Network Packet Capture, Send Dump, Factory Reset, Firmware Update, Message, Connection/Disconnection Device, Enable/Disable RMS 등 포함.

## 진입 경로

- Device List > [Execute Command] > Advanced Control > 서브 커맨드 선택
- Device Group > [Execute Command] > Advanced Control > 서브 커맨드 선택

## 화면 구성

![2.4 Command](./command-2.2-4.png)

### Advanced Control 커맨드 목록

| 섹션 | 커맨드 | 디바이스 | 그룹 |
|------|--------|---------|------|
| 2.4.12 | Network Packet Capture | devices | - (그룹 미지원) |
| 2.4.13 | Send Dump | devices / group | - |
| 2.4.14 | Factory Reset | devices / group | - |
| 2.4.15 | Firmware Update | devices / group | - |
| 2.4.16 | Message | devices / group | - |
| 2.4.17 | Connection Device | devices | - |
| 2.4.17 | Disconnection Device | devices | - |
| 2.4.18 | Enable RMS | devices / group | - |
| 2.4.19 | Disable RMS | devices / group | - |

---

### 2.4.12 Network Packet Capture (디바이스)

![2.4.12 Advanced Control > Network Packet Capture](./command-2.2-4-12.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 팝업 제목 | Network Packet Capture | - |
| 안내 문구 | - | "Captures network packets for the specified duration" / "Captured data is saved as a pcap file and can be downloaded for analysis" |
| 제한 안내 | - | "*You can set it for up to 10 minutes" |
| Capture 설정 | App | [Add] 버튼으로 앱 추가 (2.4.12.1 Add App 팝업 참조) |
| Capture 설정 | Duration | 기본값 5분, 최대 10분, 1~10 사이 값만 입력 가능 |
| Capture 설정 | [Capture] 버튼 | 클릭 시 캡처 시작 |
| Capture Files | 표시 항목 | Captured Time, Duration, File Size, Download |
| Captured Time | 형식 | YYYY-MM-DD (당일 수정 시 HH:MM:SS 24시간 표시) |
| Download | 버튼 | 클릭 시 파일 다운로드 |
| Refresh 버튼 | 클릭 | 현재 탭 유지하며 정보 재로드 |
| Close 버튼 | 클릭 | 팝업 닫기 |
| 완료 팝업 | - | "Packet capture started on {N} devices" |

#### 2.4.12.1 Add App 팝업 (Network Packet Capture)

![2.4.12.1 Advanced Control > Network Packet Capture_Add App pop_up](./command-2.2-4-12-1.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 팝업 제목 | Add App | - |
| 검색창 | Enter App Name | 앱명 입력 후 검색 |
| [Search] 버튼 | - | 키워드 매칭 앱 목록 표시 |
| [Reload] 버튼 | - | 검색창 초기화 + 전체 앱 목록 표시 |
| Default Package | 제목 + 현재 표시 패키지 수 | - |
| 패키지 목록 | 앱명, 버전 | 이미 등록된 앱 비활성(dimmed) |
| 선택 정책 | 상단 앱 기본 선택 | 등록된 앱 제외한 최상단 앱 기본 선택 |
| 다른 앱 선택 시 | 이전 선택 해제 | 단일 선택 |
| [Add] 버튼 | 체크된 패키지 추가 | 팝업 닫힘, 미선택 시 비활성(dimmed) |
| [Close] 버튼 | - | 저장 없이 팝업 닫기 |
| App List | "App List (124)" | 현재 표시 패키지 수 |

---

### 2.4.13 Send Dump (디바이스)

![2.4.13 Advanced Control > Send dump](./command-2.2-4-13.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 팝업 제목 | Send Dump | - |
| 안내 메시지 | "Do you want to send the dump to '{N}' devices?" | - |
| 버튼 | Send / Close | - |
| 완료 팝업 | "Dump sent successfully to {N} devices" | - |

### 2.4.13.1 Send Dump (그룹)

![2.4.13.1 Advanced Control > Send dump _ Group](./command-2.2-4-13-1.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 안내 메시지 | "Do you want to send the dump to '{N}' groups?" | - |
| 완료 팝업 | "Dump sent successfully to {N} groups" | - |

---

### 2.4.14 Factory Reset (디바이스)

![2.4.14 Advanced Control > Factory reset](./command-2.2-4-14.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 팝업 제목 | Factory Reset | - |
| 안내 메시지 | "Do you want to factory reset to '{N}' devices?" | - |
| 버튼 | Factory Reset / Close | - |
| 완료 팝업 | "Factory reset completed successfully on {N} devices" | - |

### 2.4.14.1 Factory Reset (그룹)

![2.4.14.1 Advanced Control > Factory reset _ Group](./command-2.2-4-14-1.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 안내 메시지 | "Do you want to factory reset to '{N}' groups?" | - |
| 완료 팝업 | "Factory reset completed successfully on {N} groups" | - |

---

### 2.4.15 Firmware Update (디바이스)

![2.4.15 Advanced Control > Firmware update_devices](./command-2.2-4-15.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 팝업 제목 | Firmware Update | - |
| 선택 수 | "N Devices" | 예: "18 Devices" |
| 펌웨어 목록 | 체크박스 + 펌웨어명 | - |
| [Apply] 버튼 | 선택된 펌웨어 업데이트 | 미선택 시 비활성 |
| [Close] 버튼 | 팝업 닫기 | - |
| 완료 팝업 | "The firmware update has been completed on {N} devices" | - |

### 2.4.15.1 Firmware Update (그룹)

![2.4.15.1 Advanced Control > Firmware update_group](./command-2.2-4-15-1.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 선택 수 | "N Groups" | 예: "18 Groups" |
| 완료 팝업 | "The firmware update has been completed on {N} groups" | - |

---

### 2.4.16 Message (디바이스)

![2.4.16 Advanced Control > Message_devices](./command-2.2-4-16.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 팝업 제목 | Message | - |
| 안내 메시지 | "Do you want to send message to '{N}' devices?" | N = 선택된 디바이스 수 |
| Type 선택 | Text / Image / Text+Image | - |
| Text 선택 시 | Title + Message 입력창 표시 | - |
| Image 선택 시 | Title 입력창 + 이미지 업로드 영역 표시 | - |
| Text+Image 선택 시 | Title + Message 입력창 + 이미지 업로드 영역 표시 | - |
| 이미지 업로드 | 지원 형식 | PNG, JPG만 업로드 가능 |
| [Send] 버튼 | 선택된 디바이스에 메시지 전송 | - |
| [Close] 버튼 | 팝업 닫기 | - |
| 완료 팝업 | "Message sent successfully to {N} devices" | - |

### 2.4.16.1 Message (그룹)

![2.4.16.1 Advanced Control > Message_group](./command-2.2-4-16-1.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 안내 메시지 | "Do you want to send message to '{N}' groups?" | - |
| Type / 입력 | Text / Image / Text+Image | 동일 |
| 완료 팝업 | "Message sent successfully to {N} groups" | - |

---

### 2.4.17 Connection Device (디바이스)

![2.4.17 Advanced Control > Connection Device_devices](./command-2.2-4-17.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 팝업 제목 | Connection Device | - |
| 안내 메시지 | "Do you want to connect '{N}' devices?" | - |
| 버튼 | Connect / Close | - |
| 완료 팝업 | "{N} devices have been connected" | - |

### 2.4.17 Disconnection Device (디바이스)

| 영역 | 요소 | 내용 |
|------|------|------|
| 팝업 제목 | Disconnection Device | - |
| 안내 메시지 | "Do you want to disconnect '{N}' devices?" | - |
| 버튼 | Disconnection / Close | - |
| 완료 팝업 | "{N} devices have been disconnected" | - |

---

### 2.4.18 Enable RMS (디바이스)

![2.4.18 Device control > Enable RMS_devices](./command-2.2-4-18.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 팝업 제목 | Enable RMS | - |
| 안내 메시지 | "Do you want to enable the RMS on the selected '{N}' devices?" | - |
| 버튼 | Enable / Close | - |
| 완료 팝업 | "The RMS app has been enabled on {N} devices" | - |

### 2.4.18.1 Enable RMS (그룹)

![2.4.18.1 Device control > Enable RMS_group](./command-2.2-4-18-1.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 안내 메시지 | "Do you want to enable the RMS for {N} groups?" | - |
| 완료 팝업 | "The RMS app has been enabled on {N} groups" | - |

---

### 2.4.19 Disable RMS (디바이스)

![2.4.19 Device control > Disable RMS_devices](./command-2.2-4-19.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 팝업 제목 | Disable RMS | - |
| 안내 메시지 | "Do you want to disable the RMS on the selected '{N}' devices?" | - |
| 버튼 | Disable / Close | - |
| 완료 팝업 | "The RMS app has been disabled on {N} devices" | - |

### 2.4.19.1 Disable RMS (그룹)

![2.4.19.1 Device control > Disable RMS_group](./command-2.2-4-19-1.png)

| 영역 | 요소 | 내용 |
|------|------|------|
| 안내 메시지 | "Do you want to disable the RMS for {N} groups?" | - |
| 완료 팝업 | "The RMS app has been disabled for {N} groups" | - |

---

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| Network Packet Capture > [Add] | Add App 팝업 표시 | - |
| Add App > [Search] | 키워드 매칭 앱 목록 필터링 | - |
| Add App > [Reload] | 검색 초기화, 전체 앱 목록 | - |
| Add App > [Add] | 선택 앱 추가 후 팝업 닫힘 | 미선택 시 비활성 |
| Packet Capture > [Capture] | 캡처 시작 | 완료 팝업 (우하단, 3초) |
| Packet Capture > Refresh | 정보 재로드 | - |
| Packet Capture > Download | 파일 다운로드 | - |
| Send Dump > [Send] | Dump 전송 | 완료 팝업 (우하단, 3초) |
| Factory Reset > [Factory Reset] | 초기화 실행 | 완료 팝업 (우하단, 3초) |
| Firmware Update > [Apply] | 선택 펌웨어 업데이트 | 완료 팝업 (우하단, 3초) |
| Message Type 변경 | 입력 필드 변경 | Text/Image/Text+Image에 따라 |
| Message > [Send] | 메시지 전송 | 완료 팝업 (우하단, 3초) |
| Connection Device > [Connect] | 연결 실행 | 완료 팝업 (우하단, 3초) |
| Disconnection Device > [Disconnection] | 연결 해제 | 완료 팝업 (우하단, 3초) |
| Enable RMS > [Enable] | RMS 활성화 | 완료 팝업 (우하단, 3초) |
| Disable RMS > [Disable] | RMS 비활성화 | 완료 팝업 (우하단, 3초) |

## 상태 / 분기

| 상태 | 조건 | 처리 |
|------|------|------|
| 디바이스 대상 | devices 선택 | 각 커맨드 _devices 팝업 |
| 그룹 대상 | groups 선택 | 각 커맨드 _group 팝업 (지원되는 경우) |
| Network Packet Capture | 디바이스 전용 | 그룹 선택 시 해당 커맨드 미지원 |
| Message Type | Text | Title + Message 입력 |
| Message Type | Image | Title + 이미지 업로드 |
| Message Type | Text+Image | Title + Message + 이미지 업로드 |
| Firmware 미선택 | - | [Apply] 버튼 비활성 |
| Duration 유효범위 | 1~10 | 그 외 값 입력 불가 |

## 연결된 화면

| 화면 | 링크 |
|------|------|
| Device Control / App Control | [./command-1.md](./command-1.md) |
| Device List (2.1) | [./device-list.md](./device-list.md) |
| Device Group (2.3) | [./device-group.md](./device-group.md) |

## 비고

- 모든 커맨드 완료 팝업: 우하단 표시, 3초 후 자동 소멸
- 완료 팝업 표시 중에도 다른 버튼 동작 가능
- Network Packet Capture: Duration 1~10분 범위만 허용, pcap 파일로 저장
- Message: PNG/JPG 이미지만 업로드 가능
- Add App 팝업: 이미 등록된 앱은 dimmed 처리, 상단 앱 기본 선택 (등록 앱 제외)
- Firmware/App 미선택 시 [Apply] 버튼 비활성
