# Device Group

> **경로**: 2. Devices > Device Group
> **원본 ID**: `j82r2o`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=j82r2o)

## 목적

셋톱박스 디바이스를 그룹으로 묶어 관리하는 화면. 그룹 단위로 커맨드 실행 및 디바이스 일괄 관리 가능.

## 진입 경로

- 좌측 메뉴 > Devices > Device Group

## 화면 구성

![2.3 Devices>Device Group](./device-group.2-3.png)

### 2.3.1 Device Group_Group list (그룹 목록)

![2.3.1 Device Group_Group list](./device-group.2-3-1.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 상단 탭 | Group list / Command history | - |
| 검색 | 검색창 + Search 버튼 | 플레이스홀더: "Enter Device Group" (Group ID로 검색) |
| 버튼 영역 | Add, Download Excel | hover 시 버튼명 표시 (3-a) |
| Add 버튼 | 클릭 | 디바이스 그룹 등록 페이지 이동 |
| Download Excel | 그룹 체크 후 클릭 | Excel 파일 다운로드 팝업 (2.3.6.1) |
| Download Excel | 미체크 후 클릭 | 안내 팝업 (2.3.6.2) |
| Download Excel | 그룹 없으면 | 아무 동작 없음 |
| Execute Command 버튼 | 드롭다운 | 그룹 미선택 시 버튼 비활성 |
| 그룹 목록 | 표시 컬럼 | No., Device Group, Description, Group criteria, Number of Devices |
| 그룹 목록 | Description | 최대 3줄 표시, 초과 시 "..." 처리 |
| 그룹 목록 | Group criteria | 적용된 기준 유형만 표시 (상세 조건값 미표시) |
| Group criteria 유형 | 지원 값 | Manufacturer, Model, OS Version, IP Range |
| Apply to All | 체크박스 + 전체 그룹 수 | 전체 선택/해제 |
| Apply to All | 비활성 조건 | 검색 조건 없으면 첫 페이지 비활성, 검색 결과 있으면 활성 |
| 페이지네이션 | - | 《 〈 1 2 3 4 5 6 7 8 9 10 〉 》, 15 lines |
| Help 버튼 | 클릭 | Help 가이드 팝업 표시 |

#### 2.3.1.1 Command button_If no device is selected

![2.3.1.1 Command button_If no device is selected](./device-group.2-3-1-1.png)

#### 2.3.1.2 Command button

![2.3.1.2 Command button](./device-group.2-3-1-2.png)

### 2.3.2 Before Grouping (그룹 없는 상태)

![2.3.2 Before Grouping](./device-group.2-3-2.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 버튼 | Add, Download Excel | 동일 |
| Download Excel | 클릭 시 | 아무 동작 없음 |
| Command 버튼 | 그룹 미선택 | 비활성 |
| 안내 메시지 | - | "You can create a group using the [Add] button" |

### 2.3.3 Device Group Register (그룹 등록)

![2.3.3 Device group register](./device-group.2-3-3.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 필수 입력 | Device Group Name* | 고유 식별자 입력 |
| 그룹 기준 | Group Criteria* | Custom, Manufacturer, Model, OS version, IP range 중 선택 |
| 그룹 기준 | Custom 선택 시 | 디바이스 자동 할당 안 됨 |
| 그룹 기준 | 기타 선택 시 | 해당 조건에 맞는 디바이스 자동 포함 |
| 설명 | Description | 그룹 목적 설명 입력 |
| 버튼 | List | 저장 없이 그룹 목록 이동 |
| 버튼 | Register | 등록 완료 후 그룹 목록 이동 |
| 팝업 A | 필수 미입력 시 | "Please enter all required information(*)" |

#### 2.3.3.1 Group Criteria 옵션 상세

![2.3.3.1 Group Criteria](./device-group.2-3-3-1.png)

| 기준 | 입력 방식 | 내용 |
|------|-----------|------|
| Custom | - | 수동으로 디바이스 추가/제거 (자동 할당 없음) |
| Manufacturer | 드롭다운 | 등록된 제조사 목록 (예: Samsung, LG, Sony, TCL 등) |
| Model | 드롭다운 | 등록된 모델 목록 (예: webOS 5.0, Android TV 9 등) |
| OS Version | 드롭다운 | 등록된 OS 버전 목록 |
| IP Range | 범위 입력 | From (최소 IP) / To (최대 IP), IPv4 형식 필수, From <= To 조건 |

IP Range 규칙:
- IPv4 주소 형식으로만 입력
- From, To 모두 필수 입력
- From IP <= To IP 조건 충족 필요
- 지정된 범위 내 IP를 가진 디바이스 자동 그룹에 포함

### 2.3.4 Device Group Detail (그룹 상세)

![2.3.4 Device group detail](./device-group.2-3-4.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 그룹명 | Device Group Name | 편집 불가 |
| 설명 | Description | 편집 가능 |
| 그룹 기준 | 이전 저장 기준 표시 | 기준 변경 시 즉시 반영 안 됨, [Save] 클릭 후 반영 |
| 그룹 기준 | Custom 외 기준 선택 시 | 디바이스 목록 수동 편집 불가 |
| Edit 버튼 | 활성 조건 | Group Criteria가 Custom일 때만 활성화 |
| 디바이스 목록 | 표시 항목 | SAID, MAC, Model |
| 디바이스 목록 | SAID | 11자리 중 뒤 3자리 마스킹 (예: 12345678***) |
| 디바이스 목록 | 페이지당 최대 | 20개, 초과 시 페이지 내비게이션 표시 |
| 버튼 | List | 저장 없이 목록 이동 |
| 버튼 | Delete | 그룹 삭제 확인 팝업 표시 |
| 버튼 | Save | 편집 완료 후 목록 이동 |
| 팝업 A | 필수 미입력 | "Please enter all required information(*)" |
| 팝업 B | 그룹 기준 변경 시 | 기준 변경 확인 팝업 |
| 팝업 2-a | 그룹 내 디바이스 없을 때 Delete | "Are you sure you want to delete this device group?" + [Delete] / [Cancel] |
| 팝업 2-b | 그룹 내 디바이스 있을 때 Delete | "Deletion is not possible because this device group contains devices" + [OK] |

### 2.3.5 Edit Device List 팝업 (Add to Device Group)

![2.3.5 Edit Device List](./device-group.2-3-5.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 탭 | Add to Device Group (기본) | 디바이스 그룹에 추가 |
| 탭 | Remove from Device Group | 디바이스 그룹에서 제거 |
| 디바이스 목록 수 | 제목 | "Device List (124)" 형식 |
| 필터 | SAID, MAC, Model | SAID/MAC: 텍스트 입력, Model: 드롭다운 |
| 추가 가능 목록 | 표시 항목 | 체크박스, SAID, MAC, Model |
| 추가 가능 목록 | 이미 추가된 디바이스 | 흐리게(dimmed) + 체크박스 표시 |
| 추가 버튼 (↓) | 디바이스 선택 후 클릭 | "Devices to Add" 목록으로 이동 |
| 제거 버튼 (↑) | 디바이스 선택 후 클릭 | "Devices to Add" 목록에서 제거 |
| 버튼 비활성 | 미선택 시 | Add/Remove 버튼 비활성 |
| 추가 예정 목록 | 가이드 텍스트 (비어있을 때) | "Please add devices to the device group" |
| Submit 버튼 | 저장 | 편집된 디바이스 목록 저장 |
| Close 버튼 | 닫기 | 저장 없이 팝업 닫기 |

### 2.3.5.1 Edit Device List - Remove from Group

![2.3.5.1 Edit Device List](./device-group.2-3-5-1.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 선택된 그룹 | 그룹 목록 표시 | 그룹명(디바이스 수) 형식 |
| 필터 | SAID, MAC, Model | 동일 |
| 디바이스 목록 | 표시 항목 | 체크박스, SAID, MAC, Model |
| 제거 버튼 (↓) | 선택 후 클릭 | "Devices to Remove" 목록으로 이동 |
| 복원 버튼 (↑) | 선택 후 클릭 | "Devices to Remove" 목록에서 제거 |
| 삭제 예정 목록 | 가이드 텍스트 | "Please add devices to delete from the device group" |
| Submit 버튼 | 저장 | 편집 내용 적용 |
| Close 버튼 | 닫기 | 저장 없이 팝업 닫기 |

### 2.3.6 Download Excel 팝업

| 팝업 ID | 조건 | 내용 |
|---------|------|------|
| 2.3.6.1 | 그룹 체크 후 클릭 | 선택된 그룹 수 메시지 + [Download] / [Close] |
| 2.3.6.2 | 그룹 미체크 후 클릭 | 안내 메시지 + [OK] |

#### 2.3.6.1 Download excel pop_up

![2.3.6.1 Download excel pop_up](./device-group.2-3-6-1.png)

#### 2.3.6.2 Download excel pop_up

![2.3.6.2 Download excel pop_up](./device-group.2-3-6-2.png)

### 2.3.7 Command History 탭

![2.3.7 Management_Command history](./device-group.2-3-7.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 검색 | 검색창 + Search | 플레이스홀더: "Enter Command Category" |
| 기간 선택 | 기간 옵션 | 선택 기간에 따라 테이블 업데이트 |
| 컬럼 | Request type, Target, Command Category, Command, Command Time, Status | - |
| Target | 복수 그룹 | 대표 그룹명 1개 + 추가 수 (예: GroupA +2) |
| Target hover | 툴팁 | 전체 그룹명 목록 표시 (2.3.7.1 Tool tip) |
| Command Time | 형식 | YYYY-MM-DD HH:MM:SS (24시간) |
| Status | 표시 | Success:N, Progress:N, Failed:N |
| 행 선택 | - | Command history detail 팝업 표시 |

#### 2.3.7.1 Tool tip

![2.3.7.1 Tool tip](./device-group.2-3-7-1.png)

### 2.3.7 Group_Command History Detail 팝업

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 정보 | Command Category, Command, Command Time | - |
| 그룹 목록 | 제목 + 전체 그룹 수 | - |
| 컬럼 | No., SAID, Result Received Time, Status | SAID 뒤 3자리 마스킹 |
| Status 값 | - | Success / Fail / In_progress / Pending |
| 필터 | SAID, Status | Status 옵션: Success / Progress / Failed |

### 2.3.1.2 Command Button

| 영역 | 내용 |
|------|------|
| 커맨드 목록 | Device Control, App Control, Advanced Control |
| hover | 각 커맨드의 서브 커맨드 목록 표시 |
| 그룹 미선택 | Execute Command 버튼 비활성 |

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| 그룹 행 선택 | - | Device Group Detail 화면 표시 |
| [Add] 클릭 | - | Device Group Register 페이지 이동 |
| [Download Excel] (체크됨) | - | Download 팝업 (2.3.6.1) |
| [Download Excel] (미체크) | - | 안내 팝업 (2.3.6.2) |
| [Execute Command] 클릭 | 드롭다운 표시 | 그룹 미선택 시 비활성 |
| Command hover | 서브 커맨드 표시 | - |
| [Save] 클릭 (기준 변경) | 팝업 B 표시 | 기준 변경 확인 |
| [Delete] 클릭 (디바이스 없음) | 팝업 2-a | 삭제 확인 |
| [Delete] 클릭 (디바이스 있음) | 팝업 2-b | 삭제 불가 안내 |
| Edit 버튼 클릭 | Edit Device List 팝업 | Custom 기준일 때만 활성 |
| Target hover | 전체 그룹명 툴팁 표시 | - |
| Command history 행 클릭 | Detail 팝업 표시 | - |

## 상태 / 분기

| 상태 | 조건 | 표시 |
|------|------|------|
| 그룹 있음 | 정상 | 그룹 목록 테이블 표시 |
| 그룹 없음 | 등록된 그룹 없음 | 2.3.2 Before Grouping 안내 |
| Delete 가능 | 그룹 내 디바이스 없음 | 팝업 2-a (삭제 확인) |
| Delete 불가 | 그룹 내 디바이스 있음 | 팝업 2-b (삭제 불가) |
| Edit 버튼 활성 | Custom 기준 | 디바이스 수동 편집 가능 |
| Edit 버튼 비활성 | Custom 외 기준 | 자동 할당, 수동 편집 불가 |

## 연결된 화면

| 화면 | 링크 |
|------|------|
| Device List (2.1) | [./device-list.md](./device-list.md) |
| Command (2.4) | [./command-1.md](./command-1.md) |

## 비고

- 2026.04.24: SAID 뒤 3자리 마스킹 정책 추가
- 2026.03.26: Device ID → SAID로 변경 (그룹 상세 디바이스 목록, Edit Device List, Command history detail)
- 2026.03.31: Edit Device List 팝업 안내 문구 추가 및 [Save] 버튼명 수정
- Group Criteria가 Custom일 때만 디바이스 수동 편집 가능 (Edit 버튼 활성)
- IP Range: IPv4 형식, From <= To 조건 필수
- 그룹 기준 변경 시 [Save] 클릭 전까지 디바이스 목록 미반영
