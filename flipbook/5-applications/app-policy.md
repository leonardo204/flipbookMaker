# App Policy

> **경로**: 5. Applications > App Policy
> **원본 ID**: `ximqh7`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=ximqh7)

## 목적

앱 정책을 관리하는 화면이다. Threshold(임계값 기반 정책), Managed App(관리 앱), Whitelist(허용 목록), Blacklist(금지 목록) 4개 탭으로 구성되며, 각 탭에서 해당 정책 유형을 등록·수정·삭제할 수 있다.

## 진입 경로

- GNB > Devices > Applications > App Policy

## 업데이트 이력

| 날짜 | 변경 내용 |
|------|-----------|
| 2026.03.26 | Managed App 탭 추가, 아이콘 추가 |
| 2026.03.31 | 5.3.3 App policy register: Action 필드 위치 조정 (기존: 각 설정값 하단에 Action 표시 → 변경: 별도 섹션으로 이동) |
| 2026.04.17 | 5.3.11.1 App registration pop_up: Version 섹션 추가 |

## 화면 구성

![5.3 App Policy](./app-policy.5-3.png)

### 5.3.1 App Policy (Threshold 탭)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1. 탭 | Threshold / Managed App / Whitelist / Blacklist | 선택한 탭에 따라 하단 영역 변경 |
| 2. 필터링 옵션 | 선택 박스 + 입력 박스 | 옵션: App name / App crash / Memory threshold / CPU threshold / Network Threshold / HDD Threshold / Policy state |
| | Memory/CPU/Network/HDD 필터 선택 시 | 텍스트 입력 박스 대신 최솟값/최댓값 선택 옵션 표시 |
| | Policy state 필터 선택 시 | 텍스트 입력 박스 대신 상태값 옵션(Enable/Disable) 표시 |
| | 기타 필터 선택 시 | placeholder: "Enter OOO" 형식으로 표시 |
| 3. [Register] 버튼 | 패키지 등록 페이지로 이동 | 5.3.3 App policy register 화면으로 이동 |
| 4. Policy List | 등록된 정책 목록 | 표시 정보: No., App name, App crash, Memory threshold, CPU threshold, Network Threshold, HDD Threshold, Action, Policy state |
| | 값 없음 처리 | 값이 없으면 "-" 표시 |
| | Policy state | Enable: 녹색 표시 / Disable: 빨간색 표시 |
| | 패키지명 선택 시 | 정책 상세 정보 표시 (5.3.5 App policy edit) |
| 5. [Help] 버튼 | 도움말 팝업 표시 | 선택 시 도움말 팝업 열기 |

**목록 없음 상태 (5.3.6):**
- 메시지: "Please register the app device policy"

![5.3.1 App Policy](./app-policy.5-3-1.png)

---

### 5.3.2 필터링 옵션 상세

| 필터 | 표시 형식 | 단위 |
|------|-----------|------|
| App Name | 텍스트 입력 박스 | - |
| App Crash | 최솟값/최댓값 선택 | Count (리스트 데이터 기반 동적 표시) |
| Memory Threshold | 최솟값/최댓값 선택 | % (리스트 데이터 기반 동적 표시) |
| CPU Threshold | 최솟값/최댓값 선택 | % (리스트 데이터 기반 동적 표시) |
| Network Threshold | 최솟값/최댓값 선택 | MB, GB (리스트 데이터 기반 동적 표시) |
| HDD Threshold | 최솟값/최댓값 선택 | % (리스트 데이터 기반 동적 표시) |
| Policy State | Enable / Disable 옵션 선택 | - |

![5.3.2 Filtering options](./app-policy.5-3-2.png)

![10.00 GB](./app-policy.10-00.png)

---

### 5.3.3 App Policy Register 화면

**설명:** [Register] 버튼 선택 시 표시되는 앱 정책 등록 화면

![5.3.3 App policy register](./app-policy.5-3-3.png)

| 구성 요소 | 내용/규칙 |
|-----------|-----------|
| 1. Add App | 모니터링 조건을 설정할 앱 추가 |
| | [Add] 버튼 클릭 시 App Package 선택 팝업 표시 (5.3.4) |
| | 이미 앱이 추가된 상태에서 [Add] 재클릭 후 다른 앱 선택 시 기존 앱이 새 앱으로 교체 |
| | 앱 미선택 상태에서 [Register] 클릭 시 Popup A 표시 |
| 2. Condition | 필드: App crash / Memory threshold / CPU threshold / Network Threshold / HDD Threshold |
| | 각 조건에 정보 아이콘(i) 표시 / 아이콘 위에 마우스 오버 시 툴팁 표시 (5.3.3.1 Tool tip) |
| | 기본값으로 채워짐 |
| | 기본값: App crash 3 counts / Memory threshold 85% / CPU threshold 85% / Network Threshold 500MB / HDD Threshold 85% |
| 2-1. Toggle | ON: 조건 활성화 / OFF: 입력 필드 비활성화 + 관련 Action 옵션 비활성화 |
| | 최소 1개 이상 조건이 ON이어야 함 |
| | 모든 조건 OFF 상태에서 [Register] 클릭 시 Popup B 표시 |
| 2-2. Input field | 숫자 입력만 허용 |
| | 새 값 입력 시 기존 기본값 초기화 |
| | 입력값 완전 삭제 시 기본값 자동 복원 |
| | 모든 조건값이 0인 상태에서 [Register] 클릭 시 Popup B 표시 |
| 3. Action | Send log / Restart app / Close background apps / Clear cache |
| | Action 미선택 상태에서 [Register] 클릭 시 Popup E 표시 |
| 4. [List] / [Register] 버튼 | [List]: 변경 저장 없이 목록 화면으로 이동 / [Register]: Popup D 표시 |

**Popup A (앱 미등록 시):**
- 메시지: "Please add an app before registering the policy"
- 버튼: [OK]

**Popup B (조건 미설정 시):**
- 메시지: "Please configure at least one monitoring condition before registering"
- 버튼: [OK] / [Cancel]

**Popup D (등록 확인):**
- 메시지: "This policy will take effect after the set-top box is restarted. To apply the policy immediately without rebooting, click the 'Apply Now' button"
- 버튼: [Apply now] / [Apply later] / [Cancel]
- [Apply now] 선택: 즉시 정책 적용 후 목록 표시
- [Apply later] 선택: 정책 저장 후 목록 표시
- [Cancel] 선택: 팝업 닫기

**Popup E (Action 미선택 시):**
- 메시지: "At least one action must be configured"
- 버튼: [OK]

---

![5.3.3.1 Tool tip](./app-policy.5-3-3-1.png)

### 5.3.3.1 Tool Tip

**설명:** 조건 항목 정보 아이콘(i)에 마우스 오버 시 표시되는 툴팁

| 조건 항목 | 툴팁 내용 |
|-----------|-----------|
| App Crash | If the number of crashes exceeds the defined threshold, the service may be interrupted or the app may fail to operate properly. |
| CPU Usage | If CPU usage exceeds the threshold, device responsiveness may decrease and screen lag may occur. |
| Memory Usage | If memory usage exceeds the threshold, the app may be force closed or system instability may occur. |
| Network Threshold | If Network Threshold exceeds the threshold, streaming quality may degrade or service access may become unavailable. |
| HDD Threshold | If storage usage exceeds the threshold, update failures or data storage errors may occur. |

---

![5.3.4 App Package pop_up](./app-policy.5-3-4.png)

### 5.3.4 App Package 팝업

**설명:** [Add] 버튼 선택 시 표시되는 패키지 선택 팝업

| 구성 요소 | 내용/규칙 |
|-----------|-----------|
| 1. 제목 | |
| 2. Package Search Box | 검색 박스 + [Search] + [Reload] 버튼 / placeholder: "Enter package" |
| | [Search]: 입력 키워드와 일치하는 패키지만 표시 |
| | [Reload]: 검색 박스 초기화, 전체 패키지 표시 |
| 3. Default Package | 제목 + 현재 표시 패키지 수 |
| | 이미 앱 정책에 등록된 앱: 선택 불가 (Dimmed) |
| | 상단의 미등록 앱이 기본 선택됨 |
| | 다른 앱 선택 시 이전 선택 해제 (단일 선택) |
| 4. [Add] / [Close] 버튼 | [Add]: 선택한 패키지 추가 후 팝업 닫기 (미선택 시 [Add] 버튼 dimmed) |
| | [Close]: 저장 없이 팝업 닫기 |

---

![5.3.5 App policy edit](./app-policy.5-3-5.png)

### 5.3.5 App Policy Edit 화면

**설명:** App Policy 목록에서 패키지명 선택 시 표시되는 상세/편집 화면

| 구성 요소 | 내용/규칙 |
|-----------|-----------|
| 1. Policy state | 현재 정책 상태 표시 |
| | Enable / Disable로 변경 가능 |
| | Disable 시 정책 미적용 |
| 2. 현재 설정값 | 현재 구성된 입력값 표시 / 수정 가능 |
| 3. [List] / [Save] 버튼 | [List]: 저장 없이 목록 화면으로 이동 / [Save]: Popup B 표시 |

---

![5.3.6 App Policy _ When there is no app list](./app-policy.5-3-6.png)

### 5.3.7 Managed App 탭

![5.3.7 Managed App](./app-policy.5-3-7.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1. 탭 | Threshold / Managed App / Whitelist / Blacklist | 선택한 탭에 따라 하단 영역 변경 |
| 2. 검색 옵션 | 검색 박스 + [Search] 버튼 | placeholder: "Enter app name" / App name 컬럼 기준 검색 |
| 3. [Download Excel] 버튼 | 체크된 앱 Excel 다운로드 | 앱 체크 후 선택 시 해당 목록 Excel 다운로드 |
| | 미체크 시 | 팝업 표시 |
| | 목록 없을 시 | 선택해도 동작 없음 |
| 4. [Upload Managed App] 버튼 | Upload managed app 팝업 표시 | 5.3.7.2 Upload managed app pop_up 열기 |
| 5. Managed App 목록 | 앱 목록 표시 | 표시 정보: App name, Description, Version |
| | Managed App 표시 | 앱 이름 좌측에 Managed 아이콘 표시 |
| | 항목 선택 시 | Managed app detail 팝업 표시 (5.3.7.1) |
| 6. Version 정렬 | 기본: 내림차순 (최신 버전 상단) | Version 컬럼 선택 시 오름차순으로 재정렬 |
| | 이후 선택 시마다 내림차순/오름차순 토글 | |
| 7. [Help] 버튼 | 도움말 팝업 표시 | 선택 시 도움말 팝업 열기 |

---

![5.3.7.1 Managed app detail popup](./app-policy.5-3-7-1.png)

### 5.3.7.1 Managed App Detail 팝업

| 구성 요소 | 내용/규칙 |
|-----------|-----------|
| 1. 상세 정보 | 표시 정보: App name, Managed app 아이콘, Description |
| 2. 버튼 | [Delete App]: 앱 삭제 확인 팝업 표시 (Popup 2-a) / [Close]: 팝업 닫기 |

**Popup 2-a (삭제 확인):**
- 메시지: "Are you sure you want to delete this package?"
- 버튼: [Delete] (App name 표시) / [Cancel]
- [Delete] 선택: 앱 삭제 후 앱 목록 표시
- [Cancel] 선택: 팝업 닫기, 앱 상세 팝업 유지

---

![5.3.7.2 Upload managed app pop_up](./app-policy.5-3-7-2.png)

### 5.3.7.2 Upload Managed App 팝업

**설명:** [Upload Managed App] 버튼 선택 시 표시되는 팝업

| 구성 요소 | 내용/규칙 |
|-----------|-----------|
| 1. 제목 및 안내 텍스트 | "Please choose how you would like to register managed apps" |
| 2. 등록 방법 선택 | Upload XML file: XML 파일로 복수 앱 일괄 등록 |
| | Add manually: 기존 앱 형식으로 앱 개별 등록 |
| | 두 방법은 상호 배타적 (하나 선택 시 다른 것 자동 해제) |
| | 진입 시 Upload XML file 기본 선택 |
| 3. [Next] / [Close] 버튼 | [Next]: 선택한 방법에 해당하는 업로드 팝업 표시 / [Close]: 팝업 닫기 |

![5.3.7.3 Pop-up displayed when "Upload XML file" method is selected](./app-policy.5-3-7-3.png)

![5.3.7.4 Pop-up displayed when "Upload XML file" method is selected](./app-policy.5-3-7-4.png)

**5.3.7.3 Upload XML file 팝업 (Upload XML file 선택 후 [Next]):**
- 파일 첨부 영역: 선택 시 로컬 파일 브라우저 열림 / .xml 파일만 필터링
- [Upload] 버튼: 파일 첨부 시 활성화, 미첨부 시 비활성화
- [Close] 버튼: 팝업 닫기

![5.3.7.5 Pop-up displayed when "Add manually" method is selected](./app-policy.5-3-7-5.png)

**5.3.7.5 Add manually 팝업 (Add manually 선택 후 [Next]):**
- App Name, Version, Description 입력 필드
- [+] 버튼으로 앱 항목 추가 가능
- [Upload] / [Close] 버튼

---

![5.3.8 Whitelist](./app-policy.5-3-8.png)

### 5.3.8 Whitelist 탭

**기능 설명:** Whitelist는 기기에서 필수적으로 설치 상태를 유지해야 하는 앱 목록이다. Whitelist에 등록된 앱은 OS 레벨에서 보호되어 의도적·우발적 제거가 방지된다.

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1. 탭 | Threshold / Managed App / Whitelist / Blacklist | 선택한 탭에 따라 하단 영역 변경 |
| 2. 기능 설명 | Whitelist 안내 텍스트 | "The Whitelist protects critical applications from being deleted, disabled, or terminated. Apps registered in the Whitelist are protected at the OS level, preventing removal either intentionally or accidentally." |
| 3. 검색 옵션 | 검색 박스 + [Search] 버튼 | placeholder: "Enter App name" / App name 컬럼 기준 검색 |
| 4. [Download Excel] 버튼 | 체크된 앱 Excel 다운로드 | 앱 체크 후 선택 시 해당 목록 Excel 다운로드 |
| | 미체크 시 | 팝업 표시 |
| | 목록 없을 시 | 선택해도 동작 없음 |
| 5. [Edit whitelist] 버튼 | Whitelist Edit 팝업 열기 | 5.3.9 Whitelist edit pop_up 표시 |
| 6. Whitelist 목록 | 등록된 Whitelist 앱 표시 | 표시 정보: App name, Description, Version |
| | Managed App 표시 | 앱 이름 좌측에 Managed 아이콘 표시 |
| | 항목 선택 시 | Package detail 팝업 표시 (5.3.5.1 Package detail pop_up — 5.3.10.1 App Detail 팝업과 동일 구조) |
| 7. [Help] 버튼 | 도움말 팝업 표시 | 선택 시 도움말 팝업 열기 |

**Whitelist 없음 상태 (5.3.8.1):**
- 메시지: "There is no whitelist"
- [Download Excel] 버튼 선택 시 동작 없음

![5.3.8.1 When there is no whitelist](./app-policy.5-3-8-1.png)

---

### 5.3.9 Whitelist Edit 팝업

**설명:** [Edit whitelist] 버튼 선택 시 표시되는 팝업

![5.3.9 Whitelist edit pop_up](./app-policy.5-3-9.png)

| 구성 요소 | 내용/규칙 |
|-----------|-----------|
| 1. 제목 | |
| 2. App Search Bar | 검색 박스 + [Search] + [Reload] 버튼 / placeholder: "Enter App Name" |
| | [Search]: 키워드와 일치하는 앱만 App List에 표시 |
| | [Reload]: 검색 박스 초기화, 전체 앱 표시 |
| 3. App List | 제목 + 표시 앱 수 |
| | Default App으로 등록된 패키지 목록 표시 |
| | Blacklist 또는 Whitelist에 이미 포함된 앱: 체크박스 비활성화 |
| 4. [Add] / [Delete] 버튼 | [Add]: 체크된 앱을 Whitelist에 추가 (미체크 시 동작 없음) |
| | [Delete]: 체크된 앱을 Whitelist에서 삭제 (미체크 시 동작 없음) |
| 5. Whitelist | 제목 + 현재 포함된 앱 수 / 현재 Whitelist에 포함된 앱 목록 표시 |
| 6. [Register a New app to the whitelist] 버튼 | 앱 등록 팝업 열기 |
| 7. [Save] / [Close] 버튼 | [Save]: 편집 내용 저장 후 팝업 닫기 (변경 내용 Whitelist에 반영) |
| | [Close]: 저장 없이 팝업 닫기 |

---

![5.3.10 Blacklist](./app-policy.5-3-10.png)

### 5.3.10 Blacklist 탭

**기능 설명:** Blacklist는 기기에 설치 또는 실행을 금지할 앱 목록이다. Blacklist에 등록된 앱은 OS 레벨에서 차단되어 설치가 방지되고, 실행 시 자동 종료된다.

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1. 탭 | Threshold / Managed App / Whitelist / Blacklist | 선택한 탭에 따라 하단 영역 변경 |
| 2. 기능 설명 | Blacklist 안내 텍스트 | "The Blacklist prevents specified applications from being installed or executed on the device. Apps registered in the Blacklist are blocked at the OS level, preventing installation and automatically terminating execution." |
| 3. 검색 옵션 | 검색 박스 + [Search] 버튼 | placeholder: "Enter App name" / App name 컬럼 기준 검색 |
| 4. [Download Excel] 버튼 | 체크된 앱 Excel 다운로드 | 앱 체크 후 선택 시 해당 목록 Excel 다운로드 |
| | 미체크 시 | 팝업 표시 |
| | 목록 없을 시 | 선택해도 동작 없음 |
| 5. [Edit Blacklist] 버튼 | Blacklist Edit 팝업 열기 | 5.3.11 Blacklist edit pop_up 표시 |
| 6. Blacklist 목록 | 등록된 Blacklist 앱 표시 | 표시 정보: App name, Description, Version |
| | Managed App 표시 | 앱 이름 좌측에 Managed 아이콘 표시 |
| | 항목 선택 시 | App detail 팝업 표시 (5.3.10.1) |
| 7. [Help] 버튼 | 도움말 팝업 표시 | 선택 시 도움말 팝업 열기 |

**Blacklist 없음 상태 (5.3.10.2):**
- 메시지: "There is no blacklist"
- [Download Excel] 버튼 선택 시 동작 없음

![5.3.10.1 App detail pop_up](./app-policy.5-3-10-1.png)

![5.3.10.2 When no blacklist exists](./app-policy.5-3-10-2.png)

---

### 5.3.10.1 App Detail 팝업 (Blacklist)

| 구성 요소 | 내용/규칙 |
|-----------|-----------|
| 1. 상세 정보 | 표시 정보: App name, Description |
| 2. 버튼 | [Delete App]: 앱 삭제 확인 팝업 표시 (Popup 2-a) / [Close]: 팝업 닫기 |

**Popup 2-a (삭제 확인):**
- 메시지: "Are you sure you want to delete this app?"
- 버튼: App name + [Delete] / [Cancel]
- [Delete] 선택: 앱 삭제 후 앱 목록 표시
- [Cancel] 선택: 팝업 닫기, 앱 상세 팝업 유지

---

![5.3.11 Blacklist edit pop_up](./app-policy.5-3-11.png)

### 5.3.11 Blacklist Edit 팝업

**설명:** [Edit Blacklist] 버튼 선택 시 표시되는 팝업

| 구성 요소 | 내용/규칙 |
|-----------|-----------|
| 1. 제목 | |
| 2. App Search Bar | 검색 박스 + [Search] + [Reload] 버튼 / placeholder: "Enter app" |
| | [Search]: 키워드와 일치하는 앱만 App List에 표시 |
| | [Reload]: 검색 박스 초기화, 전체 패키지 표시 |
| 3. App List | 제목 + 표시 앱 수 |
| | Default App으로 등록된 패키지 목록 표시 |
| | Whitelist 및 Blacklist에 이미 포함된 앱: 체크박스 비활성화 |
| 4. [Add] / [Delete] 버튼 | [Add]: 체크된 앱을 Blacklist에 추가 (미체크 시 동작 없음) |
| | [Delete]: 체크된 앱을 Blacklist에서 삭제 (미체크 시 동작 없음) |
| 5. Blacklist | 제목 + 현재 포함된 앱 수 / 현재 Blacklist에 포함된 앱 목록 표시 |
| 6. [Register a New app to the Blacklist] 버튼 | 앱 등록 팝업 열기 (5.3.11.1) |
| 7. [Save] / [Close] 버튼 | [Save]: 편집 내용 저장 후 팝업 닫기 (변경 내용 Blacklist에 반영) |
| | [Close]: 저장 없이 팝업 닫기 |

---

### 5.3.11.1 App Registration 팝업 (Blacklist 신규 앱 등록)

![5.3.11.1 App registration pop_up](./app-policy.5-3-11-1.png)

**설명:** [Register a New app to the Blacklist] 버튼 선택 시 표시되는 팝업

| 구성 요소 | 내용/규칙 |
|-----------|-----------|
| 1. 제목 | App Registration |
| 2. 입력 박스 | App Name / Version / Description 입력 박스 |
| 3. 버튼 | [Register]: 입력한 앱을 Blacklist에 추가 / 입력 박스가 비어 있으면 비활성화 |
| | [Close]: 팝업 닫기 |

---

### 5.3.12 도움말 가이드 (Applications > App Policy)

**가이드 내용:**

| 번호 | 항목 | 설명 |
|------|------|------|
| 1 | Threshold | 관리자가 앱의 임계값 정책을 설정하는 탭 / 앱 동작 및 기기 리소스 사용 관련 조건 정의 가능 / 임계값 초과 시 설정된 Action 자동 실행 / 조건: App crash 횟수, Memory 사용률, CPU 사용률, Network 사용량, HDD 사용률 |
| 2 | Managed App | 서비스 제공자가 배포·제어하는 앱을 관리하는 탭 / 검색, 업로드, 상세 조회, 버전 정렬, Excel 다운로드 기능 제공 / Managed App은 전용 레이블로 일반 앱과 구분 |
| 3 | Whitelist | 기기에 필수적으로 설치 상태를 유지해야 하는 앱 목록 관리 탭 / 수동 추가 및 Default Package 목록에서 가져오기 가능 / Excel 다운로드 가능 |
| 4 | Blacklist | 설치 또는 실행을 금지할 앱 패키지 목록 관리 탭 / Default Package 목록에서 가져오거나 목록에 없는 패키지 직접 업로드 가능 / Excel 다운로드 가능 |

**도움말 동작:**
- 내용이 영역 초과 시 스크롤 바 표시
- [Close] 버튼: 도움말 팝업 닫기

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| [Register] 버튼 (Threshold 탭) | App policy register 화면으로 이동 | 앱 정책 등록 가능 |
| [Add] 버튼 (Register 화면) | App Package 팝업 열기 | 패키지 선택 가능 |
| 조건 Toggle OFF | 입력 필드 및 Action 비활성화 | 해당 조건 미적용 |
| [Register] 클릭 (앱 미등록) | Popup A 표시 | "Please add an app before registering the policy" |
| [Register] 클릭 (조건 미설정) | Popup B 표시 | "Please configure at least one monitoring condition before registering" |
| [Register] 클릭 (Action 미선택) | Popup E 표시 | "At least one action must be configured" |
| [Register] 클릭 (정상) | Popup D 표시 | Apply now / Apply later 선택 |
| [Apply now] 선택 | 즉시 정책 적용 | 목록 화면으로 이동 |
| [Apply later] 선택 | 정책 저장 | 목록 화면으로 이동 |
| 패키지명 선택 (목록) | App policy edit 화면으로 이동 | 정책 상세 및 편집 가능 |
| [Upload Managed App] 버튼 | Upload managed app 팝업 열기 | XML 업로드 또는 수동 추가 선택 |
| [Edit whitelist] 버튼 | Whitelist edit 팝업 열기 | 앱 추가/삭제 가능 |
| [Edit Blacklist] 버튼 | Blacklist edit 팝업 열기 | 앱 추가/삭제 가능 |
| [Register a New app to the Blacklist] | App registration 팝업 열기 | 신규 앱 등록 가능 |
| [Download Excel] (체크 앱 있음) | Excel 파일 다운로드 | 체크된 목록 다운로드 |
| [Download Excel] (체크 앱 없음) | 팝업 표시 | 선택 요청 |
| [Help] 버튼 | 도움말 팝업 표시 | 가이드 메시지 표시 |

## 상태 / 분기

| 조건 | 표시 |
|------|------|
| Threshold 목록 없음 | "Please register the app device policy" 메시지 |
| Policy state = Enable | 녹색 표시 |
| Policy state = Disable | 빨간색 표시 |
| 조건 Toggle OFF | 입력 필드 및 Action 비활성화 |
| 모든 조건 OFF / 조건값 모두 0 | [Register] 클릭 시 Popup B 표시 |
| Action 미선택 | [Register] 클릭 시 Popup E 표시 |
| Whitelist 없음 | "There is no whitelist" 메시지 |
| Blacklist 없음 | "There is no blacklist" 메시지 |
| Managed App | 앱 이름 좌측 Managed 아이콘 표시 |
| Whitelist/Blacklist에 포함된 앱 (Edit 팝업) | 체크박스 비활성화 |
| App registration 입력 박스 비어 있음 | [Register] 버튼 비활성화 |
| Upload XML file - 파일 미첨부 | [Upload] 버튼 비활성화 |
| Version 컬럼 선택 (Managed App) | 내림차순 ↔ 오름차순 토글 |

## 연결된 화면

- [App List](./app-list.md)
- [App Install](./app-install.md)

## 비고

- Threshold 기본값: App crash 3회 / Memory 85% / CPU 85% / Network 500MB / HDD 85% (2GB RAM 표준 환경 기준)
- Condition Toggle: 최소 1개 이상 ON 상태 유지 필요
- Blacklist: OS 레벨에서 설치 차단 + 실행 시 자동 종료
- Whitelist: OS 레벨에서 삭제 보호 (의도적·우발적 제거 방지)
- Managed App Version 정렬: 기본 내림차순, 컬럼 선택 시마다 오름차순/내림차순 토글
- Upload Managed App: XML 파일 업로드 또는 수동 입력 방식 지원
- 5.3.11.1 App registration pop_up: Version 섹션 추가 (2026.04.17)
