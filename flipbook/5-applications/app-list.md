# App List

> **경로**: 5. Applications > App List
> **원본 ID**: `abxdpo`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=abxdpo)

## 목적

RMS에 등록된 앱 목록을 조회하고 관리하는 화면이다. 앱 업로드, 앱 상세 조회, 앱 삭제 기능을 제공하며, 삭제된 앱은 Deleted App 탭에서 확인 가능하다.

## 진입 경로

- GNB > Devices > Applications > App List

## 화면 구성

![5.1 App list](./app-list.5-1.png)

### 5.1.1 App List 탭

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1. 탭 | App List / Deleted App | 선택한 탭에 따라 하단 영역 변경 |
| 2. 검색 옵션 | 검색 박스 + [Search] 버튼 | placeholder: "Enter App name" / App name 컬럼 기준 검색 |
| 3. [App Upload] 버튼 | 앱 등록 팝업 표시 | 선택 시 5.1.3 App Upload 팝업 열기 |
| 4. App 목록 | 등록된 앱 목록 | 표시 정보: App name, Description, Version |
| | 정보 없음 처리 | 정보가 없으면 "-" 표시 |
| | 앱 선택 시 | 상세 정보 표시 |
| 5. [Help] 버튼 | 도움말 팝업 표시 | 선택 시 도움말 팝업 열기 |

**앱 없음 상태:**
- 메시지: "Please upload the app"

![5.1.1 App list](./app-list.5-1-1.png)

![5.1.1.1 App list_No data](./app-list.5-1-1-1.png)

---

### 5.1.1.2 Deleted App 탭

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1. 탭 | App List / Deleted App | 선택한 탭에 따라 하단 영역 변경 |
| 2. 검색 옵션 | 검색 박스 + [Search] 버튼 | placeholder: "Enter App name" / App name 컬럼 기준 검색 |
| 3. Deleted App 목록 | 삭제된 앱 목록 | 표시 정보: App name, Description, Version |
| | 정보 없음 처리 | 정보가 없으면 "-" 표시 |
| | 앱 선택 시 | 상세 정보 표시 |
| 4. [Help] 버튼 | 도움말 팝업 | 선택 시 도움말 팝업 열기 |

![5.1.2 Deleted pacakge](./app-list.5-1-2.png)

![5.1.1.2 Deleted App_No data](./app-list.5-1-1-2.png)

---

### 5.1.2 App List - App 상세 팝업

**설명:** App 목록에서 앱 선택 시 표시되는 팝업

![5.1.2 App list_App detail](./app-list.5-1-2.png)

| 구성 요소 | 내용 |
|-----------|------|
| 1. 상세 정보 | 표시 정보: App name, Version, Description |
| | Launcher 앱인 경우: 이름 옆에 Launcher 아이콘 표시 |
| 2. 버튼 | [Delete App]: 앱 삭제 확인 팝업 표시 (Popup 2-a) |
| | 기기 정책에서 활성화된 앱: "삭제 불가" 팝업 (Popup 2-b) |
| | [Close]: 팝업 닫기 |

**Popup 2-a (삭제 확인):**
- 메시지: "Are you sure you want to delete this App?"
- 버튼: [Delete] / [Cancel]
- [Delete] 선택: 앱 삭제 후 앱 목록으로 이동
- [Cancel] 선택: 팝업 닫기, 앱 상세 팝업 유지

**Popup 2-b (삭제 불가):**
- 메시지: "This App cannot be deleted because it is currently enabled in the device policy"
- 버튼: [OK]
- [OK] 선택: 팝업 닫기, 앱 상세 팝업 유지

---

![5.1.2.1 Deleted App_App detail](./app-list.5-1-2-1.png)

### 5.1.2.1 Deleted App - App 상세 팝업

**설명:** Deleted App 목록에서 앱 선택 시 표시되는 팝업

| 구성 요소 | 내용 |
|-----------|------|
| 1. 상세 정보 | 표시 정보: App name, Version, Description |
| 2. 버튼 | [Close]: 팝업 닫기 |

---

![5.1.3 App upload](./app-list.5-1-3.png)

### 5.1.3 App Upload 팝업

**설명:** [App Upload] 버튼 선택 시 표시되는 팝업

| 구성 요소 | 내용 |
|-----------|------|
| 1. 제목 | App Upload |
| 2. Launcher App 체크박스 | 선택 시 앱 목록에서 [Launcher] 아이콘 표시 |
| 3. 입력 박스 | App name / Version / Description / Min SDK version / Target SDK version |
| 4. 파일 첨부 영역 | 선택 시 PC 파일 목록 창 열기 / 파일 선택 시 해당 영역에 표시 |
| | 새 파일 추가 시 기존 파일 덮어쓰기 |
| 5. 버튼 | [Upload]: 첨부된 앱 업로드 / [Close]: 팝업 닫기 |

**Upload 비활성화 조건:** App name 또는 Version 미입력 시 [Upload] 버튼 비활성화

**파일 첨부 불가 시:**
- 팝업 메시지: "This file cannot be attached"
- 버튼: [OK]

---

![5.1.4 No search results](./app-list.5-1-4.png)

### 5.1.4 검색 결과 없음

| 조건 | 표시 |
|------|------|
| 검색 결과 없음 | 메시지: "No search results found" |

---

### 5.1.5 도움말 가이드 (Applications > App List)

**가이드 내용:**

| 번호 | 항목 | 설명 |
|------|------|------|
| 1 | Search | 앱 이름으로 검색하면 일치하는 앱이 표시됨 |
| 2 | App list | 등록된 앱 목록 표시 (앱 이름, 설명, 버전) / 앱 선택 시 상세 정보 표시 |
| 3 | App upload | 업로드 버튼으로 앱 추가 팝업 오픈 / 앱 이름, 버전, 설명 입력 후 파일 추가 / 업로드 완료 시 목록에 표시 |
| 4 | Deleted App list | 앱 삭제 시 Deleted App 목록에 표시 / 앱 선택 시 상세 정보 표시 |

**도움말 동작:**
- 내용이 영역 초과 시 스크롤 활성화
- [Close] 버튼: 도움말 팝업 닫기

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| [App Upload] 버튼 | App Upload 팝업 열기 | 앱 등록 가능 |
| 앱 목록에서 앱 선택 | App 상세 팝업 열기 | 상세 정보 표시 |
| [Delete App] 클릭 | 삭제 확인 팝업 표시 | 삭제 확인 또는 불가 팝업 |
| [Delete] 클릭 (Popup 2-a) | 앱 삭제 | 앱 목록으로 이동 |
| [Cancel] 클릭 (Popup 2-a) | 팝업 닫기 | 앱 상세 팝업 유지 |
| [OK] 클릭 (Popup 2-b) | 팝업 닫기 | 앱 상세 팝업 유지 |
| [Upload] 클릭 | 앱 업로드 | 앱 목록에 새 앱 추가 |
| Deleted App 탭 선택 | 탭 전환 | 삭제된 앱 목록 표시 |
| [Help] 버튼 | 도움말 팝업 표시 | 가이드 메시지 표시 |
| 검색 실행 | 검색 결과 표시 | 일치 앱 표시 또는 "No search results found" |

## 상태 / 분기

| 조건 | 표시 |
|------|------|
| 앱 목록 없음 | "Please upload the app" 메시지 |
| Deleted App 목록 없음 | 빈 목록 표시 |
| 검색 결과 없음 | "No search results found" 메시지 |
| Launcher 앱 | App Upload 팝업에서 체크박스 선택 시 목록에 Launcher 아이콘 표시 |
| 기기 정책 활성화 앱 삭제 시도 | Popup 2-b 표시 (삭제 불가) |
| App name 또는 Version 미입력 | [Upload] 버튼 비활성화 |

## 연결된 화면

- [App Install](./app-install.md)
- [App Policy](./app-policy.md)
- [Command - App Control](../4-connecting-devices/command-app-control.md) (Install Application)

## 비고

- App Upload 팝업에서 파일 추가 시 기존 파일은 덮어쓰기됨
- App name과 Version은 업로드 필수 항목
- Launcher 앱 여부는 업로드 시 체크박스로 설정
