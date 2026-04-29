# Alert Setting

> **경로**: 7. Administration > Alert Setting
> **원본 ID**: `uiw1py`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=uiw1py)

![7.3 Alert Setting](./alert-setting.7-3.png)

## 목적

이메일 알림(Alert)을 설정하는 화면이다. 디바이스 상태 알림(Device Status Alert)과 OTT 신규 버전 알림(OTT New Version Alert) 두 가지 유형의 알림을 등록하고 관리할 수 있다. 알림 이메일에 포함될 공통 메시지를 Mail Template으로 설정할 수도 있다.

## 진입 경로

- GNB(좌측 메뉴) > Administration > Alert Setting

## 화면 구성

### 탭 구성

| 탭 | 설명 |
|----|------|
| Device Status (기본) | 디바이스 상태 기반 알림 목록 |
| OTT New Version | OTT 앱 신규 버전 출시 알림 목록 |

### 공통 요소

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | 탭 | Device Status / OTT New Version. 기본값: Device Status. 선택 탭에 따라 하단 내용 변경 |
| 2 | 검색창 | 검색박스 + [Search] 버튼 |
| 3 | Mail template 버튼 | 클릭 시 Mail template 팝업 표시 |
| 4 | Alert Register 버튼 | 클릭 시 알림 등록 페이지로 이동 |
| 6 | Help 버튼 | 클릭 시 도움말 팝업 표시 |

---

## Device Status Alert

![7.3.1 Alert Setting_Device Status tab](./alert-setting.7-3-1.png)

### 7.3.1 Alert Setting_Device Status 탭

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 2 | 검색창 guide text | "Enter Alert Name" |
| 2 | 검색 기준 | Alert Name 컬럼 기준 검색 |
| 3 | Mail template 버튼 | 7.3.4 Mail template 팝업 표시 |
| 4 | Alert Register 버튼 | 7.3.2 Register Device Status Alert 페이지로 이동 |
| 5 | Device Status Alert List 테이블 | 등록된 Device Status Alert 목록 표시 |
| 5 | 테이블 컬럼 | Alert Name / Alert options / Period / Send time / Recipients / Last Sent |
| 5 | Send Immediately 선택 시 | Period = "-", Send time = "Immediately" |
| 5 | Last sent 미발송 시 | "-" 표시 |
| 5 | Send time 형식 | HH:MM (24시간제) |
| 5 | Recipients 표시 | 이메일 주소 표시. 여러 수신자 시 "+N" 형식으로 추가 수 표시 (예: abc@abc.com +2) |
| 5 | Last sent 형식 | YYYY-MM-DD HH:MM (24시간제) |
| 5 | 행 선택 | 알림 상세 페이지 표시 (7.3.3 Device Status Alert Detail) |

**Device Status Alert 목록 예시**

| No. | Alert Name | Alert options | Period | Send time | Recipients | Last Sent |
|-----|------------|---------------|--------|-----------|------------|-----------|
| 1 | Alert Name | Device exception | - | Immediately | abc@abc.com +2 | - |
| 2 | Alert Name | Threshold over | - | Immediately | abc@abc.com +2 | 2024-12-16 12:00 |
| 3 | Alert Name | abc | Weekly | 20:00 | abc@abc.com +1 | 2024-12-16 20:00 |
| 4 | Alert Name | abc | Weekly | 20:00 | abc@abc.com | 2024-12-16 20:00 |
| 5 | Alert Name | Device exception | - | Immediately | abc@abc.com +5 | 2024-12-16 12:00 |

![7.3.2 Register Device Status Alert](./alert-setting.7-3-2.png)

### 7.3.2 Register Device Status Alert

[Alert Register] 버튼 클릭 시 표시되는 디바이스 상태 알림 등록 페이지.

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | *Alert Name (필수) | 최대 20자 입력 가능. 20자 초과 시 입력 불가 |
| 2 | Alert Options | 선택 목록: Device exception / Threshold over |
| 3 | Period | 선택 목록: Daily / Weekly / Monthly |
| 3 | Period별 Send time 변경 | 아래 "Period별 Send Time 정책" 참조 |
| 4 | Send Time | Period 선택에 따라 옵션 변경. Send Immediately 선택 시 Send time 필드 비활성화 |
| 5 | Recipients | 제목 + 수신자 수 표시. [Add recipients] 클릭 시 새 수신자 입력 필드 추가. 이메일 형식 아닌 경우 에러 메시지 표시: "Invalid email format" |
| 6 | Register 버튼 | 알림 등록 및 확인 팝업(5a) 표시. 필수 필드(*) 미입력 시 팝업(B) 표시 |
| - | [List] 버튼 | 변경 저장 없이 Device Status Alert 목록으로 이동 |

**Period별 Send Time 정책 (a. 일반 전송)**

| Period | Send Time 옵션 |
|--------|---------------|
| Daily | 01:00 ~ 24:00 (시간 단위 선택) |
| Weekly | 요일 선택 (Monday ~ Sunday) + 시간 선택 (01:00 ~ 24:00) |
| Monthly | 날짜 선택 (1 day ~ 31 day) + 시간 선택 (01:00 ~ 24:00) |

**Period별 Send Time 정책 (b. Send Immediately 선택 시)**

| Period | Send Time |
|--------|-----------|
| Send Immediately 선택 | 시간: 00:00 고정 표시. Daily/Weekly/Monthly의 날짜/요일 선택 비활성화 |

**저장 관련 팝업**

| 팝업 | 조건 | 메시지 | 버튼 |
|------|------|--------|------|
| 5a | 정상 등록 완료 | "The alert has been successfully registered" | [OK]: Device Status Alert list로 이동 |
| B | 필수 필드 미입력 | "Please enter all required information(*)" | [OK]: 등록 페이지로 복귀 |

![7.3.3 Device Status Alert Detail](./alert-setting.7-3-3.png)

### 7.3.3 Device Status Alert Detail

Device Status Alert 목록에서 항목 선택 시 표시되는 상세 페이지.

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | *Alert Name | 기존 등록된 알림명 표시 |
| 2 | Recipients | 제목 + 수신자 수 표시 (예: Recipients (23)) |
| 2-1 | 수신자 삭제 버튼 | 클릭 시 해당 수신자 삭제 |
| 3 | Delete Alert 버튼 | 삭제 확인 팝업(3a) 표시 |
| 3 | Save 버튼 | 저장 확인 팝업(3b) 표시 |
| - | [List] 버튼 | 변경 저장 없이 목록으로 이동 |

**삭제 확인 팝업 (3a)**

- 메시지: "Are you sure you want to delete this alert?"
- [Delete]: 알림 삭제 후 Device Status Alert list로 이동
- [Cancel]: 팝업 닫기. Device Status Alert detail 유지

**저장 확인 팝업 (3b)**

- 메시지: "The alert has been successfully modified"
- [OK]: Device Status Alert list로 이동

![7.3.4 Mail template](./alert-setting.7-3-4.png)

### 7.3.4 Mail Template 팝업 (Device Status)

[Mail template] 버튼 클릭 시 표시.

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | Mail template 내용 | 기본 텍스트 표시 및 편집 가능. 영역 클릭 시 편집 활성화 |
| 1 | 기본 텍스트 | "Please find the latest report on device errors and alarm cases. The details of the issues may vary, and this report is being sent either as a regular update or as a one-time notification. For your reference, the content of the report may change based on the current incidents or system status. If you have any questions or require further details, feel free to reach out." |
| 2 | Insert Default Template 버튼 | 서버의 기본값으로 내용 교체. [Save] 클릭 시 저장됨 |
| 3 | Save 버튼 | 변경 사항 저장 후 팝업 닫기 |
| 3 | Close 버튼 | 팝업 닫기 |

![7.3.5 When Device status alert list is empty](./alert-setting.7-3-5.png)

### 7.3.5 Device Status Alert 목록 비어있을 때

- 메시지: "Please register a device status alert"

![7.3.6 When there are no search results in the Alert list](./alert-setting.7-3-6.png)

### 7.3.6 Device Status Alert 검색 결과 없을 때

- 메시지: "No search results found"

---

## OTT New Version Alert

![7.3.7 Alert Setting_OTT New Version](./alert-setting.7-3-7.png)

### 7.3.7 Alert Setting_OTT New Version 탭

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 2 | 검색창 guide text | "Enter OTT App" |
| 2 | 검색 기준 | OTT App 컬럼 기준 검색 |
| 3 | Mail template 버튼 | 7.3.10 Mail template 팝업 표시 |
| 4 | Alert Register 버튼 | 7.3.8 Register OTT New Version Alert 페이지로 이동 |
| 5 | OTT New Version Alert List 테이블 | 등록된 OTT New Version Alert 목록 표시 |
| 5 | 테이블 컬럼 | OTT App / Recipients / Last Sent |
| 5 | Last sent 미발송 시 | "-" 표시 |
| 5 | Recipients 표시 | 이메일 주소 표시. 여러 수신자 시 "+N" 형식으로 추가 수 표시 |
| 5 | Last sent 형식 | YYYY-MM-DD HH:MM (24시간제) |
| 5 | 행 선택 | 알림 상세 페이지 표시 (7.3.9 OTT New Version Alert Detail) |

**OTT New Version Alert 목록 예시**

| No. | OTT App | Recipients | Last Sent |
|-----|---------|------------|-----------|
| 1 | Netflix | abc@abc.com +2 | - |
| 2 | Tving | abc@abc.com +2 | 2024-12-16 12:00 |
| 3 | Wavve | abc@abc.com +1 | 2024-12-16 20:00 |
| 4 | Disney+ | abc@abc.com | 2024-12-16 20:00 |
| 5 | Coupang Play | abc@abc.com +5 | 2024-12-16 12:00 |
| 6 | YouTube | abc@abc.com | 2024-12-16 12:00 |

![7.3.8 Register OTT New Version Alert](./alert-setting.7-3-8.png)

### 7.3.8 Register OTT New Version Alert

[Alert Register] 버튼 클릭 시 표시되는 OTT 신규 버전 알림 등록 페이지.

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | OTT App | 시스템에 등록된 OTT 앱 드롭다운 목록. 기본값: 목록의 첫 번째 항목 (예: Netflix) |
| 1 | OTT App 드롭다운 옵션 | Netflix / Tving / Wavve / Disney+ / Coupang Play / YouTube |
| 2 | *Recipients (필수) | 제목 + 수신자 수 (예: Recipients (0)). [Add Recipients] 클릭 시 새 수신자 입력 필드 추가. 이메일 형식 아닌 경우 에러 메시지: "Invalid email format" |
| 3 | Register 버튼 | OTT New Version Alert 등록 및 확인 팝업 표시. 필수 필드(*) 미입력 시 에러 팝업 표시 |
| - | 안내 메시지 | "※ Recipients will be notified by email immediately when a new version of the selected OTT app is released" |
| - | [List] 버튼 | 변경 저장 없이 목록으로 이동 |

**등록 관련 팝업**

| 팝업 | 조건 | 메시지 | 버튼 |
|------|------|--------|------|
| 5a | 정상 등록 완료 | "The alert has been successfully registered" | [OK]: OTT New Version Alert list로 이동 |
| B | 필수 필드 미입력 | "Please enter all required information(*)" | [OK]: 등록 페이지로 복귀 |

### 7.3.9 OTT New Version Alert Detail

OTT New Version Alert 목록에서 항목 선택 시 표시되는 상세 페이지.

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | OTT App | 등록 시 선택한 OTT 앱 표시. 편집 불가 |
| 1 | 안내 메시지 | "※ Recipients will be notified by email immediately when a new version of the selected OTT app is released" |
| 2 | Recipients | 제목 + 수신자 수 (예: Recipients (23)). 등록된 수신자 이메일 주소를 개별 입력 필드로 표시. [Add Recipients] 클릭 시 새 수신자 입력 필드 추가. 이메일 형식 아닌 경우 에러 메시지 표시 |
| 2-1 | 수신자 삭제 버튼 | 클릭 시 해당 수신자 삭제 |
| 3 | Delete Alert 버튼 | 삭제 확인 팝업 표시. 확인 시 알림 삭제 후 목록으로 복귀 |
| 3 | Save 버튼 | 저장 확인 팝업 표시. 확인 시 변경 사항 저장 후 목록으로 복귀 |

**삭제 확인 팝업 (3a)**

- 메시지: "Are you sure you want to delete this alert?"
- [Delete]: 알림 삭제 후 OTT New Version Alert list로 이동
- [Cancel]: 팝업 닫기

**저장 확인 팝업 (3b)**

- 메시지: "The alert has been successfully modified"
- [OK]: OTT New Version Alert list로 이동

![7.3.10 Mail template](./alert-setting.7-3-10.png)

### 7.3.10 Mail Template 팝업 (OTT New Version)

[Mail template] 버튼 클릭 시 표시.

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | Mail template 내용 | 기본 텍스트 표시 및 편집 가능. 영역 클릭 시 편집 활성화 |
| 1 | 기본 텍스트 | "We would like to inform you that a new version of {OTT App Name} has been released. New Version: {Version}" |
| 2 | Insert Default Template 버튼 | 서버의 기본값으로 내용 교체. [Save] 클릭 시 저장됨 |
| 3 | Save 버튼 | 변경 사항 저장 후 팝업 닫기 |
| 3 | Close 버튼 | 팝업 닫기 |

![7.3.11 When OTT New Version alert list is empty](./alert-setting.7-3-11.png)

### 7.3.11 OTT New Version Alert 목록 비어있을 때

- 메시지: "Please register a OTT new version alert"

![7.3.12 When there are no search results in the Alert list](./alert-setting.7-3-12.png)

### 7.3.12 OTT New Version Alert 검색 결과 없을 때

- 메시지: "No search results found"

---

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| 탭 전환 | 하단 내용 변경 | Device Status 또는 OTT New Version 알림 목록 표시 |
| [Search] 클릭 (Device Status) | Alert Name 기준 검색 | 검색 결과 필터링 |
| [Search] 클릭 (OTT New Version) | OTT App 기준 검색 | 검색 결과 필터링 |
| [Mail template] 클릭 (Device Status) | 메일 템플릿 팝업 표시 | Device Status 메일 템플릿 편집 팝업 오픈 |
| [Mail template] 클릭 (OTT New Version) | 메일 템플릿 팝업 표시 | OTT New Version 메일 템플릿 편집 팝업 오픈 |
| [Alert Register] 클릭 (Device Status) | 알림 등록 페이지 이동 | Register Device Status Alert 화면 |
| [Alert Register] 클릭 (OTT New Version) | 알림 등록 페이지 이동 | Register OTT New Version Alert 화면 |
| 알림 행 선택 | 상세 페이지 표시 | 해당 알림 유형의 Detail 페이지 |
| [Add Recipients] 클릭 | 새 수신자 입력 필드 추가 | 이메일 입력창 추가 |
| 이메일 형식 오류 입력 | 에러 메시지 표시 | "Invalid email format" |

## 상태 / 분기

| 상태 | 메시지 |
|------|--------|
| Device Status Alert 목록 비어있을 때 | "Please register a device status alert" |
| Device Status Alert 검색 결과 없을 때 | "No search results found" |
| OTT New Version Alert 목록 비어있을 때 | "Please register a OTT new version alert" |
| OTT New Version Alert 검색 결과 없을 때 | "No search results found" |

## 업데이트 이력

| 날짜 | 내용 |
|------|------|
| 2026.04.24 | 전반적으로 Alert로 용어 통일 |
| 2026.04.24 | Device Status, OTT New Version 탭 추가 |
| 2026.04.24 | 7.3.2 Register Device Status Alert: Device Status 메일 알림 등록 시 표시되는 페이지 이름 변경 |
| 2026.04.24 | 7.3.3 Device Status Alert Detail: 디테일 페이지 이름 변경 |
| 2026.04.24 | 7.3.5 When Device status alert list is empty: 문구 수정 |
| 2026.04.24 | OTT New Version 관련 시나리오 추가 |
| 2026.04.24 | 7.3.13 "Administration>Alert Setting" guide: 가이드 문구 수정 |

### 7.3.13 Help 팝업 — "Administration > Alert Setting" guide

가이드 내용:
- **이 페이지는 자동으로 발송될 이메일 알림의 수신자를 설정하는 페이지입니다.**
- **1. Device Status Alert**: 알림 등록 시 Alert options(Device exception, Threshold over) 선택. 발송 주기: Daily, Weekly, Monthly 설정 가능. 주기, 날짜, 시간 설정 후 알림 이메일이 설정된 Alert options에 따라 주기적으로 발송됨. 여러 수신자 동시 지정 가능. Search: Alert Name으로 등록된 Device Status Alert 검색. Mail Template: Device Status 알림 이메일에 포함될 공통 메시지 설정. 기본 메시지가 사전 설정되어 있으며 수정 가능. 저장 시 이후 모든 이메일에 해당 메시지 포함
- **2. OTT New Version Alert**: 알림 등록 시 시스템에 등록된 앱 목록에서 OTT 앱 선택. 선택한 OTT 앱의 새 버전 출시 즉시 지정된 수신자에게 알림 이메일 발송. 여러 수신자 동시 지정 가능. Search: OTT App명으로 등록된 OTT New Version Alert 검색. Mail Template: OTT New Version 알림 이메일에 포함될 공통 메시지 설정. 기본 메시지 수정 가능. 저장 시 이후 모든 이메일에 해당 메시지 포함

Help 팝업 규칙:
- 내용이 영역을 초과할 경우 스크롤 표시
- Close 버튼 클릭 시 가이드 팝업 닫힘

## 연결된 화면

- [Administrator List](./administrator-list.md) — 관리자 목록
- [Role Setting](./role-setting.md) — 역할 설정

## 비고

- Alert 유형: Device Status (디바이스 예외/임계 초과) / OTT New Version (신규 버전 출시)
- Device Status Alert는 주기(Daily/Weekly/Monthly) 또는 즉시 발송 설정 가능
- OTT New Version Alert는 신규 버전 출시 시 즉시 발송
- 각 탭마다 별도의 Mail Template 설정 가능
- 메일 템플릿의 {OTT App Name}, {Version}은 서버에서 실제 값으로 치환됨
