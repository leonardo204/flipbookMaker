# Device Policy

> **경로**: 2. Devices > Device Policy
> **원본 ID**: `xvoj3y`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=xvoj3y)

## 목적

셋톱박스의 상태/성능 임계값 조건을 정의하고, 조건 충족 시 자동으로 실행될 액션을 설정하는 디바이스 정책 관리 화면.

## 진입 경로

- 좌측 메뉴 > Devices > Device Policy

## 화면 구성

![2.6 Device policy](./device-policy.2-6.png)

### 2.6.1 Device Policy List (정책 목록)

![2.6.1 Device policy list](./device-policy.2-6-1.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 필터링 | Select box 옵션 | Device Info Update, Memory threshold, CPU threshold, CPU Temp Threshold, Network Threshold, HDD Threshold, Policy state |
| 필터링 | SAID / 텍스트 입력 필터 | 해당 필터 선택 시 텍스트 입력창 표시, 플레이스홀더: "Enter OOO" |
| 필터링 | Device Info Update, Memory threshold, CPU threshold, CPU Temp Threshold, Network Threshold, HDD Threshold | 텍스트 입력창 대신 최소값/최대값 입력창 표시 (2.6.2 참조) |
| 필터링 | Policy state | 텍스트 입력창 대신 상태값 옵션 표시 (Enable/Disable) |
| Register 버튼 | 클릭 | 정책 등록 페이지 이동 (2.6.3 참조) |
| 정책 목록 | 표시 컬럼 | No., Memory Threshold, CPU Threshold, CPU Temp Threshold, Network Threshold, HDD Threshold, Action, Device Info Update, Policy State |
| 정책 목록 | 값 없는 항목 | "-" 표시 |
| 정책 목록 | Policy State | Enable (녹색) / Disable (적색) 표시 |
| 정책 목록 | 최초 등록 시 | Enable로 설정 |
| 정책 목록 | 신규 정책 등록 시 | 이전 정책 자동으로 Disable 전환 |
| 정책 목록 | 행 선택 | 해당 정책 상세 정보 표시 (2.6.4 참조) |
| Help | hover | 가이드 메시지 표시: "Do not enable two Device policies simultaneously" |
| 페이지네이션 | - | 《 〈 1 2 3 4 5 6 7 8 9 10 〉 》, 15 lines |

### 2.6.2 Filtering Options

![2.6.2 Filtering options](./device-policy.2-6-2.png)

| 필터 | 단위 | 표시 방식 |
|------|------|-----------|
| a. Device Info Update | min | 최소값/최대값 입력 (동적 표시, 목록 데이터 기반) |
| b. Memory Threshold | % | 최소값/최대값 입력 (동적 표시) |
| c. CPU Threshold | % | 최소값/최대값 입력 (동적 표시) |
| d. CPU Temp Threshold | ℃ | 최소값/최대값 입력 (동적 표시) |
| e. Network Threshold | MB, GB | 최소값/최대값 입력 (동적 표시) |
| f. HDD Threshold | % | 최소값/최대값 입력 (동적 표시) |
| g. Policy State | - | 상태값 옵션: Enable / Disable |

범위 필터 입력 예시:
- Device Info Update: 0 min ~ 100 min (범위 내 min/max 입력)
- Memory Threshold: 0% ~ 100%
- CPU Temp Threshold: 0℃ ~ 100℃
- Network Threshold: 0 MB ~ 10.00 GB

![10.00 GB](./device-policy.10-00.png)

### 2.6.3 Set-top box Policy Register (정책 등록)

![2.6.3 Set-top box policy register](./device-policy.2-6-3.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 진입 | < List / Register 버튼 영역 | [< List] 버튼과 화면 번호 표시 |
| 조건 설정 (Condition) | 필드 | Memory threshold, CPU threshold, Network Threshold, HDD Threshold |
| 조건 설정 | 각 필드 | 정보 아이콘(i) 포함, hover 시 메트릭 설명 및 평가 방법 툴팁 |
| 조건 설정 | 기본값 | Memory threshold: 85%, CPU threshold: 85%, Network Threshold: 500 MB, HDD Threshold: 85% |
| 조건 설정 안내 | - | "Default thresholds are based on a standard 2GB RAM environment and common service conditions. Values may vary depending on device specifications and operational policies." |
| 1-1. 토글 | ON | 조건 활성화 |
| 1-1. 토글 | OFF | 입력 필드 비활성, 연관 Action 옵션도 비활성 |
| 1-1. 토글 | 최소 1개 ON | 모든 조건 OFF 상태에서 [Register] 클릭 시 팝업 A 표시 |
| 1-2. 입력 필드 | 규칙 | 숫자만 입력 가능 |
| 1-2. 입력 필드 | 새 값 입력 시 | 기존 기본값 삭제 |
| 1-2. 입력 필드 | 값 전부 삭제 시 | 기본값 자동 복원 |
| 1-2. 입력 필드 | 모든 조건값이 0일 때 Register | 팝업 A 표시 |
| 2. Action | 옵션 | Send log, Restart app, Close background apps, Clear cache |
| 2. Action | Action 미선택 Register | 팝업 D 표시 |
| 3. Device Info Update | 단위 | 분(min), 숫자만 입력 |
| 3. Device Info Update | 기본값 | 10분 (2026.04.10 변경: 5분 → 10분) |
| 3. Device Info Update | 최솟값 | 10분 미만 입력 불가 (2026.04.10 변경) |
| 3. Device Info Update | 적용 범위 | App 설정에도 동일 적용 |
| 3. Device Info Update | 안내 문구 | "All threshold conditions are evaluated based on the device info update interval defined below. Changes to this value will also be applied to the app settings. Values below 10 minutes cannot be entered." |
| 3. Device Info Update | 미입력 또는 유효하지 않은 값 | Register 클릭 시 팝업 B 표시 |
| 4. List / Register 버튼 | List | 저장 없이 목록으로 이동 |
| 4. Register 버튼 | Register | 팝업 C 표시 |

#### 팝업 상세

| 팝업 ID | 발생 조건 | 내용 | 버튼 |
|---------|-----------|------|------|
| A | 모든 조건 OFF 또는 모든 조건값 0인 상태에서 Register | "Please configure at least one monitoring condition before registering" | [OK] |
| B | Device Info Update 미입력 또는 유효하지 않은 값 | "Please enter a valid device info update period value" | [OK] |
| C | Register 버튼 정상 클릭 시 | "Policy Registration - When this policy is applied, all previously set policies will be disabled. This policy will take effect after the set-top box restarts. To apply the policy immediately without rebooting, click the 'Apply Now' button." | [Apply now] / [Apply later] / [Cancel] |
| D | Action 미선택 상태에서 Register | "At least one action must be configured" | [OK] |
| E | Device Info Update에 10분 미만 값 입력 후 Register | "The device info update interval must be at least 10 minutes. Please enter 10 minutes or more." | [OK] |

팝업 C 동작:
- [Apply now]: 즉시 정책 적용 후 목록 표시
- [Apply later]: 정책 저장 후 목록 표시
- [Cancel]: 팝업 닫기

### 2.6.4 Set-top box Policy Edit (정책 편집)

![2.6.4 set-top box policy edit](./device-policy.2-6-4.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 정책 상태 | Policy State | Enable / Disable 표시 |
| 정책 상태 변경 | 좌측 정보 영역 | Enable/Disable 변경에 따라 업데이트 (1a 참조) |
| 정책 비활성화 상태 | <정책 비활성화> | Disable 상태 시 정책 미적용 표시 |
| 현재 입력값 | - | 등록된 값 표시, 편집 가능 |
| 편집 규칙 | - | 2.6.3 Set-top box policy register 참조 |
| 버튼 | List | 저장 없이 목록 이동 |
| 버튼 | Save | 팝업 B 표시 |
| 필수 정보 미입력 | Save 클릭 시 | 팝업 A 표시 |

### 2.6.5 Empty / No Result 상태

#### 2.6.5.1 목록 없음 (Set-top box 등록 전)

![2.6.5.1 Device policy list _When there is no Set-top box list](./device-policy.2-6-5-1.png)

| 영역 | 내용 |
|------|------|
| 테이블 | 컬럼 헤더만 표시 |
| 안내 메시지 | "Please register the set-top box device policy" |

#### 2.6.5.2 검색 결과 없음

![2.6.5.2 Device policy list _When no search results are found for Set-top boxes](./device-policy.2-6-5-2.png)

| 영역 | 내용 |
|------|------|
| 테이블 | 컬럼 헤더만 표시 |
| 안내 메시지 | "No search results found" |

### 2.6.6 Help Guide 팝업

| 영역 | 내용 |
|------|------|
| 가이드 텍스트 | "Devices>Device policy" 관련 설명 |
| 스크롤 | 내용 초과 시 스크롤 표시 |
| Close 버튼 | 팝업 닫기 |

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| 필터 Select box 변경 | 필터 타입에 따라 입력 필드 변경 | 범위 입력 또는 상태 선택 |
| [Register] 버튼 클릭 | 정책 등록 페이지 이동 | 2.6.3 |
| 정책 목록 행 선택 | 정책 상세 편집 화면 표시 | 2.6.4 |
| 토글 OFF | 입력 필드 + 연관 Action 비활성 | - |
| 모든 조건 OFF + Register | 팝업 A 표시 | - |
| 모든 조건값 0 + Register | 팝업 A 표시 | - |
| Device Info Update 미입력 + Register | 팝업 B 표시 | - |
| 10분 미만 + Register | 팝업 E 표시 | - |
| Action 미선택 + Register | 팝업 D 표시 | - |
| Register 정상 클릭 | 팝업 C 표시 | Apply now / Apply later / Cancel |
| [Apply now] | 즉시 적용 + 목록 이동 | - |
| [Apply later] | 저장 + 목록 이동 | - |
| Help 아이콘 hover | 가이드 메시지 표시 | "Do not enable two Device policies simultaneously" |
| [Help] 아이콘 클릭 | 2.6.6 Help Guide 팝업 | - |

## 상태 / 분기

| 상태 | 조건 | 표시 |
|------|------|------|
| 정책 목록 있음 | 등록된 정책 있음 | 정책 목록 테이블 |
| 정책 없음 | 미등록 | 2.6.5.1 안내 메시지 |
| 검색 결과 없음 | 검색 조건 불일치 | 2.6.5.2 안내 메시지 |
| Policy State: Enable | - | 녹색 표시 |
| Policy State: Disable | - | 적색 표시 |
| 신규 정책 등록 | - | 기존 Enable 정책 자동 Disable 전환 |
| 편집 화면 Disable | - | 좌측 정보 영역 "<정책 비활성화>" 표시 |
| 모든 조건 OFF 또는 값 0 | Register 시 | 팝업 A |
| Device Info Update 유효하지 않음 | Register 시 | 팝업 B |
| Action 미선택 | Register 시 | 팝업 D |
| 10분 미만 | Register 시 | 팝업 E |

## 연결된 화면

| 화면 | 링크 |
|------|------|
| Device List (2.1) | [./device-list.md](./device-list.md) |
| 2.6.3 Policy Register | Register 버튼 → 등록 화면 |
| 2.6.4 Policy Edit | 목록 행 선택 → 편집 화면 |

## 비고

- 2026.04.10 변경: Device Info Update 기본값 5분 → 10분, 최솟값 10분으로 제한
- 2026.04.10 변경: Set-top box policy register 안내 문구 변경 ("Values below 10 minutes cannot be entered")
- 2026.03.31 변경: Action 필드 위치 조정 (기존: 각 설정값 하단 → 조건 영역 외부)
- 신규 정책 등록 시 이전 정책 자동 Disable
- 동시에 두 개의 정책을 Enable 하지 않도록 권장 (Help 메시지)
- 정책 적용: Apply now(즉시 적용) / Apply later(다음 재시작 시 적용)
- 모든 임계값 조건은 Device Info Update 주기를 기준으로 평가됨
