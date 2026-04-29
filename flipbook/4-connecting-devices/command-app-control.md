# Command - App Control

> **경로**: 4. Connecting Devices > Command - App Control
> **원본 ID**: `jpn8gy`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=jpn8gy)

## 목적

기기 연결 팝업의 Command 영역에서 App Control 카테고리를 선택했을 때 표시되는 하위 명령들을 정의한다. App List(앱 목록 조회 및 제어), Install Application(앱 설치), Clear Cache(캐시 삭제) 3개 커맨드를 포함한다.

## 진입 경로

- 기기 연결 팝업 → Command 영역 → [App Control] 선택 (기본 접힘 상태에서 확장)
- 확장 후 하위 커맨드: App List / Install App / Clear Cache

## 업데이트 이력

| 날짜 | 변경 내용 |
|------|-----------|
| 2026.03.26 | System app 케이스 추가 |

## 화면 구성

![4.4 Command > App control](./command-app-control.4-4.png)

### 4.4.1 App Control > App List

**설명:** App Control > [App List] 선택 시 표시되는 팝업

![4.4.1 App control >App List](./command-app-control.4-4-1.png)

#### 1. 탭 구성

| 탭 | 설명 | 기본 정렬 |
|----|------|-----------|
| All | 기기에 설치된 모든 앱 표시 | 앱 크기 내림차순 |
| Setable | 설정 가능한 앱 표시 | 앱 크기 내림차순 |
| Prebuilt | 기기에 사전 설치된 앱 표시 | 앱 크기 내림차순 |
| Userapp | 사용자가 설치한 앱 표시 | 앱 크기 내림차순 |

- 기본 탭: All

#### 2. 검색 옵션

- 검색 박스 + [Search] 버튼
- 입력 박스 placeholder: "Enter app name"
- App name 기준으로 검색 결과 표시

#### 3. 앱 정렬 옵션

| 옵션 | 설명 |
|------|------|
| Alphabetical Order (A–Z) | 앱 이름 알파벳 순 |
| App Size (기본) | 패키지별 앱 크기 내림차순 |
| Last Updated | 최신 업데이트 날짜 기준 |
| App usage time | 사용 시간 기준 |
| Memory | 메모리 기준 |

#### 4. 앱 목록

| 표시 정보 | 내용 |
|-----------|------|
| App Icon | 앱 아이콘 |
| App Name | 앱 이름 |
| App Size | 앱 크기 |
| Last Update Time | YYYY-MM-DD HH:MM:SS (24시간 형식) |
| Setable Icon (4-1) | Setable 앱에만 표시 (RMS Client App, RMS Service App에는 미표시) |
| More 버튼 (4-2) | 선택 시 추가 정보 확장 표시 |

**4-1. 아이콘 표시 우선순위:** Whitelist > Launcher > System > Setable > Prebuilt > Userapp

![4.4.1.2 App control menu](./command-app-control.4-4-1-2.png)

**4-2. More 버튼 확장 정보:**
- Total usage (Daily) / Total tx/rx / Usage time / Memory / App data size / Cache size / Version name / Version code / Package name / First install time
- First Install Time 형식: YYYY-MM-DD HH:MM:SS (24시간 형식)
- 상향 표시기 선택 시 정보 접힘

![4.4.1.3 App search flow](./command-app-control.4-4-1-3.png)

**4-3. App Control 버튼:**

| 앱 유형 | 표시 버튼 |
|---------|-----------|
| User App | Start App / Stop App / Restart App / Enable App / Disable App / Clear cache / Clear Data / Setting App / Delete App |
| Prebuilt App | Start App / Stop App |
| System App | Start App / Stop App / Restart App / Enable App / Disable App / Clear cache / Clear Data / Uninstall Updates (Delete App 미표시) |
| Setable App | Setting App 버튼 추가 표시 |
| Whitelist App | Delete App 버튼 미표시 |
| RMS Client / RMS Service App | Setable Icon 및 App Control 버튼 미표시 |

![4.4.1.4 Setting app > setting type](./command-app-control.4-4-1-4.png)

![4.4.1.5 Setting app (Launcher setting) (Example)](./command-app-control.4-4-1-5.png)

![5.1 Channels (Dolby AC3)](./command-app-control.5-1.png)

**System App - Uninstall Updates:**
- 팝업 메시지: "Uninstall updates and revert to the original version?"
- 버튼: App name + [Uninstall]

![4.4.1.6 App setting flow](./command-app-control.4-4-1-6.png)

#### 5. Refresh 버튼

- 현재 탭 유지하며 정보 재로드
- 검색 수행 후 Reload 선택 시 검색 결과 초기화

#### 6. Close 버튼

- App Control 팝업 닫기

---

![4.4.2 App Control > Install Application](./command-app-control.4-4-2.png)

### 4.4.2 App Control > Install Application

**설명:** App Control > [Install Application] 선택 시 표시되는 팝업

| 구성 요소 | 내용 |
|-----------|------|
| 1. App 목록 | 연결된 기기에 설치 가능한 앱만 표시 / 표시 정보: App name, Description, Version / 영역 초과 시 스크롤 |
| 2. Close 버튼 | Close 버튼 선택 시 팝업 닫기 |

---

![4.4.3 App Control > Clear Cache](./command-app-control.4-4-3.png)

### 4.4.3 App Control > Clear Cache

**설명:** App Control > [Clear Cache] 선택 시 표시되는 팝업

| 구성 요소 | 내용 |
|-----------|------|
| 1. 제목 | Clear Cache |
| 2. 선택된 기기명 | 선택한 기기 이름 표시 |
| 3. App 목록 | 체크박스 + 앱 이름 표시 |
| 4. 버튼 | [Apply]: 선택한 앱의 캐시 삭제, 완료 시 우측 하단 확인 팝업 표시 / [Close]: 팝업 닫기 |

**Apply 조건:** 앱이 선택되지 않으면 [Apply] 버튼 비활성화

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| [App Control] 선택 | App Control 카테고리 확장 | App List / Install App / Clear Cache 하위 커맨드 표시 |
| [App List] 선택 | App List 팝업 열기 | 앱 목록 표시 |
| 탭 전환 (All/Setable/Prebuilt/Userapp) | 탭별 앱 목록 필터링 | 해당 탭 앱만 표시 |
| [More] 버튼 클릭 | 앱 상세 정보 확장 | 추가 정보 표시 |
| 상향 표시기 클릭 | 상세 정보 접힘 | 확장 정보 숨김 |
| App Control 버튼 선택 | 해당 제어 버튼 목록 표시 | 앱 제어 작업 실행 |
| [Install Application] 선택 | Install Application 팝업 열기 | 설치 가능 앱 목록 표시 |
| [Clear Cache] 선택 | Clear Cache 팝업 열기 | 앱 선택 후 캐시 삭제 |
| [Apply] 클릭 (Clear Cache) | 캐시 삭제 실행 | 완료 확인 팝업 표시 (우측 하단) |
| [Refresh] 버튼 | 앱 목록 재로드 | 현재 탭 유지, 검색 초기화 |

## 상태 / 분기

| 조건 | 표시 |
|------|------|
| RMS Client App / RMS Service App | Setable Icon, App Control 버튼 미표시 |
| Whitelist 등록 앱 | Delete App 버튼 미표시 |
| System App | Delete App 미표시, Uninstall Updates 표시 |
| Setable App | Setting App 버튼 추가 표시 |
| Prebuilt App | Start App / Stop App만 표시 |
| Clear Cache - 앱 미선택 | [Apply] 버튼 비활성화 |
| 아이콘 중복 | 우선순위: Whitelist > Launcher > System > Setable > Prebuilt > Userapp |

## 연결된 화면

- [Connecting Devices](./connecting-devices.md)
- [Connecting Devices Policy](./connecting-devices-policy.md)
- [App List](../5-applications/app-list.md)

## 비고

- App Control 카테고리는 기본 접힘(collapsed) 상태
- Last Update Time 형식: YYYY-MM-DD HH:MM:SS (24시간)
- First Install Time 형식: YYYY-MM-DD HH:MM:SS (24시간)
