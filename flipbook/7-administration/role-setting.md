# Role Setting

> **경로**: 7. Administration > Role Setting
> **원본 ID**: `zjgbdz`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=zjgbdz)

![7.2 Role setting](./role-setting.7-2.png)

## 목적

관리자 역할(Role)을 등록하고 관리하는 화면이다. 각 역할에 대해 Role Level, Role Name, 접근 가능한 메뉴, 메뉴 권한(Hidden/Read Only/Editable), 디바이스 그룹 접근 권한, Connecting Devices 명령 실행 권한을 설정할 수 있다.

## 진입 경로

- GNB(좌측 메뉴) > Administration > Role Setting

## 화면 구성

![7.2.1 Role setting](./role-setting.7-2-1.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | 검색창 | 검색박스 + [Search] 버튼. 입력창 guide text: "Enter role name". Role name 컬럼 기준으로 검색 |
| 2 | Role List 테이블 | 등록된 역할 목록 표시. 표시 정보: Role Level / Role Name / Description / Assigned Users / Create Date |
| 2 | Assigned Users | 해당 역할에 포함된 관리자 수 |
| 2 | Create date 형식 | YYYY-MM-DD HH:MM (24시간제) |
| 2 | Master 역할 | 기본 생성된 역할. 편집 불가 (선택해도 반응 없음) |
| 2 | 역할 행 선택 | 역할 상세 페이지로 이동 (7.2.3 Role detail page). Master 역할은 선택 시 반응 없음 |
| 3 | Download excel 버튼 | 역할 선택 후 클릭 시 Excel 파일 다운로드. 미선택 시 팝업 표시. 목록 비어있으면 반응 없음 |
| 4 | Register 버튼 | 역할 등록 페이지로 이동 (7.2.2 Role registration) |
| 5 | Help 버튼 | 클릭 시 도움말 팝업 표시 |
| - | 페이지네이션 | 15 lines / 페이지 단위, 《 〈 1 2 3 ... 〉 》 형식 |

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| [Search] 클릭 | Role name 기준 검색 | 검색 결과 필터링 표시 |
| 역할 행 선택 (Master 제외) | 상세 페이지 이동 | Role detail page 표시 |
| Master 역할 선택 | 반응 없음 | - |
| 역할 체크 + [Download excel] 클릭 | 다운로드 팝업 표시 | 선택된 역할 수와 확인 메시지 |
| 미선택 + [Download excel] 클릭 | 안내 팝업 표시 | "Select the roles you want to download" |
| 빈 목록 + [Download excel] 클릭 | 반응 없음 | - |
| [Register] 클릭 | 역할 등록 페이지 이동 | Role Registration 화면 표시 |

## 상태 / 분기

![7.2.4 Role setting_When there are no list](./role-setting.7-2-4.png)

### 7.2.4 Role setting_When there are no list

- 메시지: "Please register a role"

![7.2.5 Role setting When there are no search results](./role-setting.7-2-5.png)

### 7.2.5 Role setting_When there are no search results

- 메시지: "No search results found"

![7.2.2 Role registration](./role-setting.7-2-2.png)

### 7.2.2 Role Registration 페이지

[Register] 버튼 클릭 시 표시되는 역할 등록 화면.

#### 입력 필드

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | *Role Level (필수) | 드롭다운에서 레벨 선택. 옵션: Level 1 / Level 2 / Level 3 / All. 동일 레벨에 여러 역할 할당 가능. 레벨 선택 시 해당 레벨의 기본 메뉴 권한 자동 적용 후 알림 팝업(1-A) 표시. i 아이콘 호버 시 툴팁 표시 |
| 2 | *Role Name (필수) | 역할 이름 입력. 중복 시 "Not available" 메시지 표시 |
| 3 | Device Group | 역할이 접근할 수 있는 디바이스 그룹 선택. 기본값: All. 체크박스로 다중 선택 가능. i 아이콘 호버 시 툴팁 표시 |
| 4 | Description (선택) | 역할 설명 입력. 최대 100자. 선택 필드 |
| 5 | Menu Permission Settings | 각 메뉴의 접근 권한 설정. 메인 메뉴 선택 시 하위 메뉴 목록 펼침. i 아이콘 호버 시 툴팁 표시 |
| 6 | Connecting Devices – Command | Connecting Devices 명령 실행 권한 설정. i 아이콘 호버 시 툴팁 표시 |
| 7 | [List] 버튼 | 변경 저장 없이 Role List로 이동 |
| 7 | [Save] 버튼 | 필수 필드 미입력 또는 접근 가능 메뉴 미설정 시 팝업(4-A) 표시. 정상 입력 시 팝업(4-B) 표시 후 Role List로 이동 |

#### Role Name 입력 규칙

| 규칙 | 내용 |
|------|------|
| 허용 문자 | 영문 대소문자(A–Z, a–z) 및 숫자(0–9) |
| 시작 문자 | 반드시 문자로 시작 (숫자 또는 특수문자로 시작 불가) |
| 특수문자 | 하이픈(-) 및 언더스코어(_)만 허용 |
| 길이 제한 | 최소 3자, 최대 20자 |
| 대소문자 구분 | userName ≠ username (대소문자 구별함) |
| 공백 | 불가 |
| 위반 시 | "Not available" 메시지 표시 |

#### 저장 관련 팝업

| 팝업 | 조건 | 메시지 | 버튼 |
|------|------|--------|------|
| 4-A | 필수 필드 미입력 또는 접근 가능 메뉴 미체크 | "Please enter all required information(*)" | [OK]: Role Registration 화면으로 복귀 |
| 4-B | 정상 입력 완료 | "Registration completed" | [OK]: Role List 화면으로 이동 |

#### 기본 권한 알림 팝업 (1-A)

- 조건: Role Level 선택 시 자동 표시
- 메시지: "The default menu permissions for {Level N} have been applied. You can modify the settings if needed."
- 표시 위치: 화면 오른쪽 하단 알림 형태
- 표시 시간: 3초 후 자동 소멸

![7.2.2.2 Menu Details (when unfolded)](./role-setting.7-2-2-2.png)

### 메뉴 권한 설정 (Menu Permission Settings)

#### 권한 옵션

| 권한 | 설명 |
|------|------|
| Hidden | 메뉴가 전혀 표시되지 않음 |
| Read Only | 메뉴는 표시되지만 기능이 제한됨 |
| Editable | 메뉴 표시 및 기능 사용 가능 |

#### 권한 설정 규칙

| 규칙 | 내용 |
|------|------|
| 메인 메뉴 On/Off | 하위 메뉴 전체에 동일 설정 자동 적용 |
| 하위 메뉴 | 개별적으로 토글 가능 |
| 상위 메뉴 Hidden 설정 시 | 모든 하위 메뉴 자동으로 Hidden 설정 |
| 편집 불가 컴포넌트 | Read Only / Editable 옵션 비활성화(Dimmed) |
| 5-1 Reset 버튼 | 현재 선택된 Role Level의 기본 메뉴 권한으로 초기화. Level 미선택 시 모든 권한을 미선택 상태로 초기화 |

#### 메뉴 구조

| 메인 메뉴 | 하위 메뉴 |
|-----------|-----------|
| Overview | Dashboard / Quick Operation / Reports |
| Devices | Device List / Device Group / VOC Devices / Device Policy |
| VOC Center | VOC Devices |
| Applications | App List / Install / App policy |
| Firmware | Firmware List / Install |
| Administration | Administrator List / Role setting / Alert setting |

![7.2.2.3 Connecting Devices-Command (when unfolded)](./role-setting.7-2-2-3.png)

### Connecting Devices – Command 권한 설정

#### 권한 옵션

| 권한 | 설명 |
|------|------|
| Hidden | 명령이 표시되지 않으며 실행 불가 |
| View & Control | 명령 표시 및 실행 가능 |

#### 명령 구조

| 카테고리 | 하위 명령 |
|----------|-----------|
| Device Control | Screen Share / Restart / Shutdown / Standby / Awake / Mute / Unmute / Lock / Unlock |
| App Control | App List / Install App / Clear Cache |
| Advanced Control | Network Status / Network Packet Capture / Send Dump / Factory Reset / Message |

- 토글 Off 시: 명령 옵션 비표시
- 토글 On 시: 명령 옵션 표시 및 실행 가능
- 카테고리 선택 시 하위 명령 목록 펼침
- 6-1 Reset 버튼: 현재 선택된 Role Level의 기본 명령 권한으로 초기화. Level 미선택 시 모든 명령 권한을 미선택 상태로 초기화

![7.2.2.1 Tooltips](./role-setting.7-2-2-1.png)

### 7.2.2.1 툴팁 (Tooltips)

| 필드 | 툴팁 내용 |
|------|-----------|
| Role Level (a) | "Select a role level to automatically apply the default menu permissions for that level. You can modify the permissions after selection." |
| Device Group (b) | "Select the device group(s) this role can access. Administrators assigned to this role will only have access to the selected groups." |
| Menu Permission Settings (c) | "Configure access levels for each menu. Hidden menus are not displayed, and Read Only menus are viewable but cannot be modified." |
| Connecting Devices - Command (d) | "Grant permission to execute device commands. When enabled, administrators can view and run available commands." |

![7.2.2.4 Menu Access by Level](./role-setting.7-2-2-4.png)

### 7.2.2.4 레벨별 기본 메뉴 권한 (Menu Access by Level)

| 메뉴 | Level 1 | Level 2 | Level 3 |
|------|---------|---------|---------|
| Overview | View / Editable | Hidden / Read Only | 전체 권한 (모든 권한 활성화) |
| Devices | View / Editable | Hidden / Read Only | 전체 권한 |
| VOC Center | Hidden / Read Only | Hidden / Read Only | 전체 권한 |
| Applications | View / Editable | Hidden / Read Only | 전체 권한 |
| Firmware | View / Editable | Hidden / Read Only | 전체 권한 |
| Administration | Hidden / Read Only | Hidden / Read Only | 전체 권한 |
| Device Control (Command) | View & Control | Hidden | 전체 권한 |
| App Control (Command) | View & Control | Hidden | 전체 권한 |
| Advanced Control (Command) | View & Control | Hidden | 전체 권한 |

- Level 1과 Level 2는 위 이미지 구성에 따라 권한 설정
- Level 3는 전체 접근 권한 (모든 권한 활성화)

### Device Group 드롭다운 동작

| 상태 | 표시 내용 |
|------|-----------|
| 드롭다운 펼침 | All / A group / B group / C group / D group ... |
| All 선택 | 모든 디바이스 그룹 접근 가능 |
| 내용 초과 시 | 스크롤 가능 |

![7.2.3 Role detail page](./role-setting.7-2-3.png)

### 7.2.3 Role Detail Page

역할 목록에서 역할 선택 시 표시되는 상세 페이지.

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | Role 정보 | 기존 등록된 역할 정보 표시: Role Level / Role Name / Description / Assigned Users / Device Group. 모든 필드 편집 가능. Assigned Users: 해당 역할에 할당된 관리자 수 |
| 2 | Menu Permissions | 현재 등록된 상태의 메뉴 설정 및 명령 권한 표시 |
| 3 | [List] 버튼 | 변경 저장 없이 Role List로 이동 |
| 3 | [Delete] 버튼 | 삭제 확인 팝업(3-A) 표시. 역할에 관리자가 없을 때만 삭제 가능. 관리자가 포함된 경우 팝업(3-C) 표시 |
| 3 | [Save] 버튼 | 필수 필드 미입력 또는 접근 가능 메뉴 미설정 시 팝업(3-D) 표시. 정상 입력 시 팝업(3-E) 표시 |

**삭제 관련 팝업**

| 팝업 | 조건 | 메시지 | 버튼 |
|------|------|--------|------|
| 3-A | 삭제 확인 | "Are you sure delete this role?" | [OK]: 역할 삭제 후 3-B 팝업 표시 / [Cancel]: 팝업 닫기 역할 유지 |
| 3-B | 삭제 완료 | 'The "Agent" role has been deleted' | [OK]: Role List 화면으로 이동 |
| 3-C | 관리자 포함 시 삭제 불가 | "This role has assigned users. It can only be deleted if no users are assigned to it." | [OK]: Role Detail 화면으로 복귀 |

**저장 관련 팝업**

| 팝업 | 조건 | 메시지 | 버튼 |
|------|------|--------|------|
| 3-D | 필수 필드 미입력 | "Please enter all required information(*)" | [OK]: Role Detail 화면으로 복귀 |
| 3-E | 정상 입력 완료 | "Role has been modified successfully" | [OK]: Role Detail 화면으로 복귀 |

### 7.2.6 Download Excel 팝업

![7.2.6 Download excel](./role-setting.7-2-6.png)

**7.2.6.1 — 역할 선택 후 다운로드 시**

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | 팝업 제목 | "Download Excel" |
| 2 | 안내 메시지 | 선택된 역할 수와 함께 안내 문구. 예: "25 roles selected. Do you want to download them?" |
| 3 | Download 버튼 | 선택된 역할 목록을 Excel 파일로 다운로드 |
| 3 | Close 버튼 | 팝업 닫기 |

![7.1.6.2 Download excel pop_up](./role-setting.7-1-6-2.png)

**7.1.6.2 — 미선택 후 다운로드 시**

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | 팝업 제목 | "Download Excel" |
| 2 | 안내 메시지 | "Select the roles you want to download" |
| 3 | OK 버튼 | 팝업 닫기 |

## 연결된 화면

- [Administrator List](./administrator-list.md) — 관리자 목록
- [Alert Setting](./alert-setting.md) — 알림 설정

## 비고

- Master 역할은 기본 생성되며 편집/삭제 불가
- Role Level은 Level 1 / Level 2 / Level 3 / All 4가지
- 동일한 Role Level에 여러 역할을 할당할 수 있음
- 역할에 관리자가 포함된 경우 삭제 불가
- 역할이 삭제되면 해당 역할의 관리자는 역할 없는 상태가 됨
- 페이지당 15개 항목 표시
