# Search (검색 조건 추가)

> **경로**: 2. Devices > Device List > Search
> **원본 ID**: `t49z8w`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=t49z8w)

## 목적

Device List 화면에서 검색 조건을 추가하여 디바이스를 필터링하는 기능. 최대 3개의 검색 조건을 조합하여 검색할 수 있다.

## 진입 경로

- Device List 화면 > 검색 영역 > [+] (Add condition) 버튼 클릭

## 화면 구성

![2.2 Search](./search.2-2.png)

### 2.2.1 Search_Add condition (검색 조건 추가)

![2.2.1 Search_Add condition](./search.2-2-1.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 기본 필터 | Select box | 기본 표시 옵션: SAID, MAC, Model, Device Group, Online |
| 검색 입력 | SAID 선택 시 | 텍스트 입력창, 플레이스홀더: "Enter SAID" |
| 검색 입력 | MAC 선택 시 | 텍스트 입력창, 플레이스홀더: "Enter MAC" |
| 검색 입력 | Model 선택 시 | 드롭다운 (등록된 모델 목록: Model 1~7 등) |
| 검색 입력 | Device Group 선택 시 | 드롭다운 (등록된 그룹 목록) |
| 검색 입력 | Online 선택 시 | 드롭다운 (Online / Offline) |
| [+] 버튼 | 조건 추가 | 추가 검색 필터 행 생성 |
| [X] 버튼 | 조건 삭제 | 해당 검색 조건 행 제거 |

#### 조건 추가 시 Select box 옵션 제외 규칙

| 경우 | 표시되는 옵션 |
|------|--------------|
| 1번째 필터가 SAID | 2번째 Select box: MAC, Model, Device Group, Online (SAID 제외) |
| 1번째 필터가 SAID, 2번째가 MAC | 3번째 Select box: Model, Device Group, Online (SAID, MAC 제외) |
| 특정 옵션 이미 선택된 경우 | 이미 선택된 옵션은 다음 Select box에서 제외 |

#### 조건 수에 따른 변화

| 조건 수 | [+] 버튼 |
|---------|---------|
| 1개 | 표시됨 |
| 2개 | 표시됨 |
| 3개 (최대) | [+] 버튼 더 이상 표시 안 됨 |

#### 탭/카테고리 변경 시 검색 리셋

- Devices 탭 또는 Management 카테고리 선택 시 검색 필터 및 결과 초기화

#### 2.2.1.1 Search_Add condition_flow

![2.2.1.1 Search_Add condition_flow](./search.2-2-1-1.png)

### 2.2.2 Search result (검색 결과)

![2.2.2 Search result](./search.2-2-2.png)

### 검색 결과 없음 상태

![2.2.2.1 In case there are no search results](./search.2-2-2-1.png)

| 영역 | 내용 |
|------|------|
| 표시 메시지 | "No search results found" |
| 테이블 | 데이터 행 없이 컬럼 헤더만 표시 |

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| [+] 버튼 클릭 | 추가 검색 필터 행 생성 | 최대 3개까지 추가 가능 |
| Select box 변경 | 이미 선택된 옵션 제외한 목록 표시 | 중복 선택 방지 |
| SAID 선택 | 텍스트 입력창 표시 | 플레이스홀더: "Enter SAID" |
| MAC 선택 | 텍스트 입력창 표시 | 플레이스홀더: "Enter MAC" |
| Model 선택 | 드롭다운 목록 표시 | 등록된 모델 목록 |
| Device Group 선택 | 드롭다운 목록 표시 | 등록된 그룹 목록 |
| Online 선택 | 드롭다운 표시 | Online / Offline |
| [X] 버튼 클릭 | 해당 필터 행 제거 | 이전 상태로 복원 |
| 탭/카테고리 전환 | 검색 필터 및 결과 초기화 | 빈 상태로 리셋 |

## 상태 / 분기

| 상태 | 조건 | 표시 |
|------|------|------|
| 1개 조건 추가 (a-1) | [+] 1회 클릭 | 필터 1개 추가, [+] 버튼 유지 |
| 2개 조건 추가 (a-2) | [+] 2회 클릭 | 필터 2개 추가, [+] 버튼 유지 |
| 3개 조건 추가 (최대) | [+] 3회 클릭 | [+] 버튼 숨김 |
| 검색 결과 없음 | 조건에 맞는 결과 없음 | "No search results found" 표시 |

## 연결된 화면

| 화면 | 링크 |
|------|------|
| Device List (2.1.1) | [./device-list.md](./device-list.md) |

## 비고

- 2026.03.26 검색 필터 수정: Device ID, S/N 삭제 → SAID, MAC 추가
- 이미 선택된 옵션은 다음 조건 Select box에서 자동으로 제외되어 중복 선택 방지
- 최대 3개의 검색 조건을 동시에 적용할 수 있음
