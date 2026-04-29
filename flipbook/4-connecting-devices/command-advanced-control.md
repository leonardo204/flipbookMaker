# Command - Advanced Control

> **경로**: 4. Connecting Devices > Command - Advanced Control
> **원본 ID**: `ld6tgu`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=ld6tgu)

## 목적

기기 연결 팝업의 Command 영역에서 Advanced Control 카테고리를 선택했을 때 표시되는 고급 제어 명령들을 정의한다. Network Status, Network Packet Capture, Send Dump, Factory Reset, Message, Install Firmware, Control RMS 7개 커맨드를 포함한다.

## 진입 경로

- 기기 연결 팝업 → Command 영역 → [Advanced Control] 선택 (기본 접힘 상태에서 확장)
- 하위 커맨드: Network Status / Network Packet Capture / Send Dump / Factory Reset / Message / Install Firmware / Control RMS

## 화면 구성

![4.5 Command>Advanced Control](./command-advanced-control.4-5.png)

### Advanced Control 카테고리

| 항목 | 기본 상태 | 하위 커맨드 |
|------|-----------|-------------|
| Advanced Control | 접힘 (기본) | Network Status / Network Packet Capture / Send Dump / Factory Reset / Message / Install Firmware / Control RMS |

---

![4.5.1.1 Advanced Control > Network status_Ping](./command-advanced-control.4-5-1-1.png)

### 4.5.1 Advanced Control > Network Status

**설명:** Advanced Control > [Network status] 선택 시 표시되는 팝업

#### 공통 구성 요소

| 요소 | 내용 |
|------|------|
| 탭 | Ping / Traceroute / Speed test |
| 기본 탭 | Ping |
| Refresh 버튼 | 현재 탭 유지하며 정보 재로드, 로드 후 Reload 버튼 선택 시 정보 영역 초기화 |
| Close 버튼 | Network Status 팝업 닫기 |

#### 4.5.1.1 Ping 탭

| 구성 요소 | 내용 |
|-----------|------|
| 2. IP 입력 필드 | IP 입력 필드 + [Test] 버튼 / placeholder: "Enter target IP" |
| | [Test] 선택 시 하단에 결과 정보 표시 |
| | 유효하지 않은 IP 입력 시 오류 팝업 표시 |
| 3. 정보 필드 | 정보가 표시 영역 초과 시 스크롤 표시 |

![4.5.1.2 Network status_Traceroute](./command-advanced-control.4-5-1-2.png)

#### 4.5.1.2 Traceroute 탭

| 구성 요소 | 내용 |
|-----------|------|
| 2. IP 입력 필드 | IP 입력 필드 + [Test] 버튼 / placeholder: "Enter target IP" |
| | [Test] 선택 시 결과 표시 / 유효하지 않은 IP 입력 시 오류 팝업 |
| 3. 정보 필드 | 정보가 표시 영역 초과 시 스크롤 표시 |

![4.5.1.3 Network status_Speed test](./command-advanced-control.4-5-1-3.png)

#### 4.5.1.3 Speed Test 탭

| 구성 요소 | 내용 |
|-----------|------|
| 2. [Test] 버튼 | 선택 시 기기 네트워크 속도 실시간 측정 및 표시 |
| 3. 정보 필드 (속도 색상 코드) | 10 Mbps 미만: 빨간색 |
| | 10 Mbps ~ 50 Mbps 미만: 노란색 |
| | 50 Mbps 이상: 녹색 |
| | 속도 조회 불가: "-" 표시 |

---

![4.5.2 Network packet capture](./command-advanced-control.4-5-2.png)

### 4.5.2 Advanced Control > Network Packet Capture

**설명:** Advanced Control > [Network packet capture] 선택 시 표시되는 팝업

| 구성 요소 | 내용 |
|-----------|------|
| 1. 제목 및 안내 텍스트 | |
| 2. Capture 설정 | - App 설정: [Add] 버튼 선택 시 앱 추가 팝업 표시 |
| | - Duration 설정: 기본값 5분, 최대 10분 (1~10 사이 값만 허용) |
| | - [Capture] 버튼: 선택 시 캡처 시작 |
| 3. Capture 파일 | - 캡처된 파일 목록 표시 |
| | - 표시 정보: 캡처 시각, 지속 시간, 파일 크기, 다운로드 |
| | - 캡처 시각: YYYY-MM-DD / 당일이면 HH:MM:SS (24시간) |
| | - Download 버튼으로 파일 다운로드 |
| 4. Refresh 버튼 | 현재 탭 유지하며 재로드 |
| 5. Close | 팝업 닫기 |

![4.5.2.1 Network packet capture_Add App pop_up](./command-advanced-control.4-5-2-1.png)

**4.5.2.1 Add App 팝업 (Network Packet Capture)**

| 구성 요소 | 내용 |
|-----------|------|
| 1. 제목 | |
| 2. 패키지 검색 박스 | 검색 박스 + [Search] + [Reload] 버튼 / placeholder: "Enter package" |
| | [Search]: 키워드와 일치하는 패키지만 표시 |
| | [Reload]: 검색 초기화, 전체 패키지 표시 |
| 3. Default Package | 제목 + 현재 표시 패키지 수 |
| | 이미 기기 정책에 등록된 앱: 선택 불가 (Dimmed) |
| | 상단의 미등록 앱이 기본 선택됨 |
| | 다른 앱 선택 시 이전 선택 해제 (단일 선택) |
| 4. [Add] / [Close] 버튼 | [Add]: 선택한 패키지 추가 후 팝업 닫기 (미선택 시 버튼 dimmed) |
| | [Close]: 저장 없이 팝업 닫기 |

---

![4.5.3 Advanced Control > Send dump](./command-advanced-control.4-5-3.png)

### 4.5.3 Advanced Control > Send Dump

**설명:** Advanced Control > [Send dump] 선택 시 표시되는 팝업

| 구성 요소 | 내용 |
|-----------|------|
| 1. 제목 | Send Dump |
| 2. 안내 메시지 | "Are you sure you want to send the dump?" |
| 3. [Send] / [Close] 버튼 | [Send]: 덤프 파일 전송 / [Close]: 팝업 닫기 |

---

![4.5.4 Advanced Control > Factory reset](./command-advanced-control.4-5-4.png)

### 4.5.4 Advanced Control > Factory Reset

**설명:** Advanced Control > [Factory reset] 선택 시 표시되는 팝업

| 구성 요소 | 내용 |
|-----------|------|
| 1. 제목 | Factory Reset |
| 2. 안내 메시지 | "Are you sure you want to factory reset this device?" |
| 3. [Factory reset] / [Close] 버튼 | [Factory reset]: 공장 초기화 수행 / [Close]: 팝업 닫기 |

---

![4.5.5 Advanced Control > Message](./command-advanced-control.4-5-5.png)

### 4.5.5 Advanced Control > Message

**설명:** Advanced Control > [Message] 선택 시 표시되는 팝업

| 구성 요소 | 내용 |
|-----------|------|
| 1. 제목 | Message |
| 2. 안내 메시지 | "Do you want to send message?" |
| 3. 메시지 유형 | 옵션: Text / Image / Text+Image |
| 4. 제목 및 메시지 입력 필드 | Text 타입: 제목 + 메시지 입력 필드 |
| | Image 타입: 제목 입력 필드 + 이미지 업로드 필드 |
| | Text+Image 타입: 제목 + 메시지 + 이미지 업로드 필드 |
| | 이미지 형식: PNG, JPG만 지원 |
| 5. 버튼 | [Send]: 메시지 전송 / [Close]: 팝업 닫기 |

---

![4.5.6 Advanced Control > Install firmware](./command-advanced-control.4-5-6.png)

### 4.5.6 Advanced Control > Install Firmware

**설명:** Advanced Control > [Install firmware] 선택 시 표시되는 팝업

| 구성 요소 | 내용 |
|-----------|------|
| 1. 펌웨어 목록 | 연결된 기기에 설치 가능한 펌웨어만 표시 |
| | 표시 정보: 펌웨어 이름, 펌웨어 설명, 펌웨어 버전 |
| | 영역 초과 시 스크롤 표시 |
| 2. Close 버튼 | Close 버튼 선택 시 팝업 닫기 |

---

![4.5.6 Advanced Control > Control RMS](./command-advanced-control.4-5-6.png)

### 4.5.6 (추가) Advanced Control > Control RMS

**설명:** Advanced Control > [Control RMS] 선택 시 표시되는 팝업

| 구성 요소 | 내용 |
|-----------|------|
| 1. 제목 | Control RMS |
| 2. 안내 메시지 | RMS Client 상태에 따라 메시지 다름 |
| | - RMS Client Enabled: "Are you sure you want to disable the RMS on this device?" |
| | - RMS Client Disabled: "Are you sure you want to enable RMS for this device?" |
| 3. 버튼 (Enabled 상태) | [Disable]: 선택한 기기의 RMS 앱 비활성화 / [Close]: 팝업 닫기 |
| 3. 버튼 (Disabled 상태) | [Enable]: 선택한 기기의 RMS 앱 활성화 / [Close]: 팝업 닫기 |

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| [Advanced Control] 선택 | 카테고리 확장 | 7개 하위 커맨드 표시 |
| [Network Status] 선택 | Network Status 팝업 열기 | Ping 탭 기본 표시 |
| Ping/Traceroute [Test] 클릭 | IP 유효성 검사 | 유효 시 결과 표시, 유효하지 않으면 오류 팝업 |
| Speed Test [Test] 클릭 | 속도 측정 | 결과 색상 코드 표시 |
| [Network Packet Capture] 선택 | 팝업 열기 | 캡처 설정 표시 |
| [Add] 버튼 (패킷 캡처) | Add App 팝업 열기 | 앱 선택 후 추가 |
| [Capture] 버튼 | 캡처 시작 | 캡처 파일 목록에 추가 |
| Download 버튼 | 파일 다운로드 | 로컬 PC에 저장 |
| [Send Dump] 선택 | Send Dump 팝업 열기 | 확인 후 덤프 전송 |
| [Factory Reset] 선택 | Factory Reset 팝업 열기 | 확인 후 초기화 |
| [Message] 선택 | Message 팝업 열기 | 메시지 유형 선택 후 전송 |
| [Install Firmware] 선택 | Install Firmware 팝업 열기 | 펌웨어 선택 후 설치 |
| [Control RMS] 선택 | Control RMS 팝업 열기 | RMS Client 상태에 따라 Enable/Disable |

## 상태 / 분기

| 조건 | 표시 |
|------|------|
| Speed Test 결과 10 Mbps 미만 | 빨간색 표시 |
| Speed Test 결과 10~50 Mbps | 노란색 표시 |
| Speed Test 결과 50 Mbps 이상 | 녹색 표시 |
| Speed Test 속도 조회 불가 | "-" 표시 |
| Network Packet Capture Duration | 1~10 사이만 허용, 기본값 5분, 최대 10분 |
| Add App - 패키지 미선택 | [Add] 버튼 dimmed |
| 이미 기기 정책 등록된 앱 | Add App 팝업에서 선택 불가 (dimmed) |
| Message Type = Text | 제목 + 메시지 입력 필드만 표시 |
| Message Type = Image | 제목 + 이미지 업로드 필드만 표시 |
| Message Type = Text+Image | 제목 + 메시지 + 이미지 업로드 필드 표시 |
| RMS Client Enabled | [Disable] 버튼 표시 |
| RMS Client Disabled | [Enable] 버튼 표시 |
| 캡처 시각 (당일) | HH:MM:SS (24시간 형식) 표시 |
| 캡처 시각 (당일 외) | YYYY-MM-DD 표시 |

## 연결된 화면

- [Connecting Devices](./connecting-devices.md)
- [Connecting Devices Policy](./connecting-devices-policy.md)

## 비고

- Advanced Control 카테고리는 기본 접힘(collapsed) 상태
- Message 이미지 지원 형식: PNG, JPG만 허용
- Network Packet Capture duration 기본값: 5분, 최대 10분, 1~10 사이 값만 허용
- Control RMS: RMS Client 상태에 따라 Enable/Disable 버튼이 전환됨
