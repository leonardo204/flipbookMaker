# Dashboard 2-depth (팝업)

> **경로**: 1. Overview > Dashboard > (위젯 클릭)
> **원본 ID**: `ohpevu`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=ohpevu)

## 목적

대시보드의 각 위젯을 클릭했을 때 표시되는 2-depth 상세 팝업 화면이다. 선택한 위젯에 해당하는 통계 그래프와 상세 디바이스 목록을 제공하여 운영자가 상황을 심층 분석할 수 있도록 한다.

## 진입 경로

- [Dashboard (1-depth)](./dashboard-1-depth.md) 화면에서 각 위젯 클릭 또는 [More] 버튼 클릭 시

## 화면 구성

### 1.2 Dashboard(RMS) 2depth

![1.2 Dashboard(RMS) 2depth](./dashboard-2-depth.1-2.png)

### 1.2.1 Dashboard 2depth Flow

![1.2.1 Dashboard 2depth Flow](./dashboard-2-depth.1-2-1.png)

### 공통 구조 (모든 2-depth 팝업 공통)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 제목 | Title | 선택한 위젯의 이름을 표시 |
| 필터 | 기간/그룹 선택 + 다운로드 버튼 | 기간 선택(Day/Week/Month 등), 그룹 필터(All Groups 기본), 다운로드(Excel) |
| 그래프 | 위젯별 그래프 | 선택 기간에 따라 데이터 업데이트 |
| 테이블 | 디바이스 상세 목록 | 그래프의 날짜/구간 선택 시 해당 데이터로 동적 업데이트. 기본 15행 표시. 페이지네이션: 《 〈 1 2 3 … 10 〉 》 |
| 필터 | 검색 필터 | Model, OS, SAID 선택 가능. SAID 선택 시 텍스트 입력 필드. Model/OS 선택 시 드롭다운 메뉴 |
| 버튼 | [Close] 버튼 | 팝업 닫기 |
| 버튼 | 다운로드 버튼 | 그래프 통계값을 Excel 파일로 다운로드 |

### 그래프 공통 정책 (1.2.2 2depth Graph Policy)

#### X축 정책

| X축 단위 | 규칙 |
|----------|------|
| Day | 기본 최대 9개 데이터 포인트 수평 표시. 최소 5일 ~ 최대 90일. 가장 최근 날짜가 항상 오른쪽 끝에 위치 |
| Month | 기본 최대 9개 데이터 포인트 수평 표시. 최소 5개월 ~ 최대 12개월. 가장 최근 월이 항상 오른쪽 끝에 위치 |
| Day (Hourly) | 시간 단위(24시간제). 현재 날짜는 최근 완료 시간까지 표시(예: 현재 15:46이면 마지막 표시 시간은 15:00). 과거 날짜는 00:00~23:00 전체 표시 |
| Weekly | 고정 7일 단위. 기본으로 현재 날짜 기준 최근 7일 표시. 시작일 선택 시 종료일은 자동으로 6일 후로 설정. 정확히 7일 고정 (증감 불가) |
| 공통 | 9개 초과 데이터 포인트 시 수평 스크롤 활성화 |

#### Y축 정책

- 최댓값은 선택 기간 내 최고 데이터 값을 기준으로 동적으로 결정
- Y축을 10등분하고, 5개 지점에 숫자 레이블 표시
- 최댓값은 항상 시각적 여백을 위해 올림 처리
  - 10 이상의 값: 둘째 자리에서 올림 (예: 87 → 90, 123 → 130)
  - 9 이하의 단일 자리 값: 10으로 표시 (예: 9 → 10)
- 대형 값 약어 표기: 100,000 이상 → K (예: 123,221 → 124K), 1,000,000 이상 → M (예: 2,450,000 → 2.5M)

#### 테이블 공통 정책

- 기본으로 가장 최근 데이터 포인트가 선택되고 하단 테이블에 해당 데이터 표시
- 날짜 기반 축이 아닌 경우, 가장 높은 값의 데이터 포인트가 기본 선택
- 다른 날짜/데이터 포인트 선택 시 테이블이 동적으로 업데이트

---

### 1.2.3 Graph Type

### 1.2.3.1 Total Devices 팝업

![1.2.3.1 Total Devices](./dashboard-2-depth.1-2-3-1.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 제목 | Total Devices + 오늘 기준 총 디바이스 수 | 타이틀 하단에 "(As of Today)" 기준 총 수 표시 |
| 그래프 | 꺾은선 그래프 (Line Graph) | X축: 날짜(기본: Day) / Y축: 디바이스 수. 선택 기간 내 전체 등록 디바이스 수 추이 표시 |
| 툴팁 | 날짜 호버 시 | Date / Total Devices / Transferred / New / Deleted |
| 필터 | 검색 옵션 | Model, OS, SAID |
| 테이블 | 표시 컬럼 | Registration Date, SAID, Model, OS, Deleted Date |
| 테이블 | SAID 마스킹 | 11자리 식별자, 뒤 3자리 마스킹 (예: 12345678***) |
| 테이블 | Deleted Date 규칙 | 삭제된 디바이스만 날짜 표시. 미삭제 디바이스는 "-" 표시 |
| 테이블 | 기본 정렬 | Registration Date 내림차순 (최신 등록 디바이스가 상단) |

### 1.2.3.2 Active Devices 팝업

![1.2.3.2 Active Devices](./dashboard-2-depth.1-2-3-2.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 제목 | Active Devices + 오늘 기준 활성 디바이스 수 | 타이틀 하단에 "(As of Today)" 기준 총 수 표시 |
| 그래프 | 꺾은선 그래프 (Line Graph) | X축: 날짜(기본: Day) / Y축: 디바이스 수. 선택 기간 내 활성 디바이스 수 추이 표시 |
| 툴팁 | 날짜 호버 시 | 날짜, 해당 날짜의 활성 디바이스 수 |
| 필터 | 검색 옵션 | Model, OS, SAID |
| 테이블 | 표시 컬럼 | Date, SAID, Model, OS |
| 테이블 | 기본 정렬 | SAID 내림차순 |

### 1.2.3.3 Warning Devices 팝업

![1.2.3.3 Warning Devices](./dashboard-2-depth.1-2-3-3.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 제목 | Warning Devices + 오늘 기준 경고 디바이스 수 | 타이틀 하단에 "(As of Today)" 기준 총 수 표시 |
| 그래프 | 꺾은선 그래프 (Line Graph) | X축: 날짜(기본: Day) / Y축: 디바이스 수. 선택 기간 내 경고 디바이스 수 추이 표시 |
| 툴팁 | 날짜 호버 시 | Date / Warning Device / Device / App |
| 탭 | All / Device / App | All: 디바이스+앱 임계치 정책 기반 경고 모두 표시. Device: 디바이스 관련 임계치 정책(Device Policy 메뉴) 기반 경고. App: 앱 관련 임계치 정책(App Policy 메뉴) 기반 경고. 탭 선택 시 그래프 및 테이블 데이터 업데이트 |
| 필터 | 검색 옵션 | Model, OS, SAID |
| 테이블 | 표시 컬럼 | Warning Date, SAID, Model, OS, Description |
| 테이블 | Warning Date | 경고가 발생한 날짜 및 시간 |
| 테이블 | 기본 정렬 | Warning Date 내림차순 (최신 경고 레코드가 상단) |

### 1.2.3.4 Crash App Devices 팝업

![1.2.3.4 Crash App Devices](./dashboard-2-depth.1-2-3-4.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 제목 | Crash App Devices + 오늘 기준 크래시 디바이스 수 | 타이틀 하단에 "(As of Today)" 기준 총 수 표시 |
| 그래프 | 꺾은선 그래프 (Line Graph) | X축: 날짜(기본: Day) / Y축: 디바이스 수. 선택 기간 내 앱 크래시 경험 디바이스 수 추이 표시 |
| 툴팁 | 날짜 호버 시 | 날짜 및 해당 날짜 앱 크래시 경험 디바이스 수 |
| 필터 | 검색 옵션 | Model, OS, SAID |
| 테이블 | 표시 컬럼 | Warning Date, SAID, Model, OS, Exception Type |
| 테이블 | SAID 마스킹 | 11자리 식별자, 뒤 3자리 마스킹 (예: 12345678***) |
| 테이블 | 기본 정렬 | SAID 내림차순 |
| **변경 이력** | 2026.04.17 | 테이블에서 Snapshot Link 삭제, Date → Warning Date로 컬럼명 변경 |

### 1.2.3.5 Top Apps by Usage Time 팝업

![1.2.3.5 Top Apps by Usage Time](./dashboard-2-depth.1-2-3-5.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 그래프 | 누적 막대 차트 (Stacked Bar Chart) | X축: 날짜(기본: Day) / Y축: 사용 시간(Hours). 각 막대는 해당 날짜의 총 앱 사용 시간을 상위 앱별로 누적 표시. 상위 4개 앱 개별 표시, 나머지는 "Other Apps" |
| 툴팁 | 날짜 호버 시 | Date / App Name / Usage Percentage / Usage Time |
| 필터 | 검색 옵션 | App Name (드롭다운 선택) |
| 테이블 | 표시 컬럼 | App, Ver., Usage Time, Avg. Time, Launch Count, Avg. Count, Device Count |
| 테이블 | 시간 형식 | 00d 00h 00m 형식으로만 표시 |

### 1.2.3.6 Device Reboot Count 팝업

![1.2.3.6 Device Reboot Count](./dashboard-2-depth.1-2-3-6.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 그래프 | 막대 차트 (Bar Chart) | X축: 1시간 단위 시간. 오른쪽 마지막 레이블은 현재 시스템 시간 기준 최근 완료 시간. Y축: 재부팅 발생 횟수. 수평 스크롤로 추가 시간 구간 열람 가능 |
| 툴팁 | 시간 구간 호버 시 | Date / Time / Device Reboot Count / Max Reboots (Single Device) |
| 필터 | 검색 옵션 | Model, OS, SAID |
| 테이블 | 표시 컬럼 | Reboot Count, SAID, Model, OS, Last Reboot Time |
| 테이블 | 기본 선택 | 팝업 열릴 때 가장 최근 시간 구간 기본 선택 |
| 테이블 | 기본 정렬 | Reboot Count 내림차순 (재부팅 횟수가 가장 많은 디바이스가 상단) |

### 1.2.3.7 Devices Exceeding CPU Thresholds 팝업

![1.2.3.7 Devices Exceeding CPU Thresholds](./dashboard-2-depth.1-2-3-7.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 그래프 | 꺾은선 그래프 | X축: 1시간 단위. 오른쪽 마지막 시간은 현재 시스템 시간 기준 최근 완료 시간 (예: 15:15이면 마지막 표시 15:00). Y축: CPU 임계치 초과 디바이스 수. 임계치 초과 디바이스 수 추이 시각화 |
| 요약 | Exceeded Devices | 선택 시간 구간의 초과 디바이스 수 및 Active Devices 대비 비율 |
| 툴팁 | 시간 구간 호버 시 | Date / Time / Exceeded Devices / % of Active Devices |
| 임계치 | Threshold Value | 현재 설정된 CPU 임계치 값 표시 (예: Threshold Value: 85%) |
| 필터 | 검색 옵션 | Model, OS, SAID |
| 테이블 | 표시 컬럼 | Date, SAID, Model, OS, CPU Usage, CPU Change, Top Process |
| 테이블 | 기본 정렬 | CPU Usage 내림차순 (CPU 사용량이 가장 높은 디바이스가 상단) |
| **변경 이력** | 2026.04.17 | Threshold Value 선택 시 메뉴로 이동하는 정책 삭제 (추후 반영 예정) |

### 1.2.3.8 Devices Exceeding Memory Thresholds 팝업

![1.2.3.8 Devices Exceeding Memory Thresholds](./dashboard-2-depth.1-2-3-8.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 그래프 | 꺾은선 그래프 | X축: 1시간 단위. Y축: 메모리 임계치 초과 디바이스 수 |
| 요약 | Exceeded Devices | 선택 시간 구간의 초과 디바이스 수 및 Active Devices 대비 비율 |
| 툴팁 | 시간 구간 호버 시 | Date / Time / Exceeded Devices / % of Active Devices |
| 임계치 | Threshold Value | 현재 설정된 메모리 임계치 값 표시 |
| 필터 | 검색 옵션 | Model, OS, SAID |
| 테이블 | 표시 컬럼 | Date, SAID, Model, OS, Memory Usage, Memory Change |
| 테이블 | 기본 정렬 | Memory Usage 내림차순 (메모리 사용량이 가장 높은 디바이스가 상단) |
| **변경 이력** | 2026.04.17 | Threshold Value 선택 시 메뉴로 이동하는 정책 삭제 (추후 반영 예정) |

### 1.2.3.9 Devices Exceeding Network Thresholds 팝업

![1.2.3.9 Devices Exceeding Network Thresholds](./dashboard-2-depth.1-2-3-9.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 그래프 | 꺾은선 그래프 | X축: 1시간 단위. Y축: 네트워크 임계치 초과 디바이스 수 |
| 요약 | Exceeded Devices | 선택 시간 구간의 초과 디바이스 수 및 Active Devices 대비 비율 |
| 툴팁 | 시간 구간 호버 시 | Date / Time / Exceeded Devices / % of Active Devices |
| 임계치 | Threshold Value | 현재 설정된 네트워크 임계치 값 표시 (예: Threshold Value: 150MB) |
| 필터 | 검색 옵션 | Model, OS, SAID |
| 테이블 | 표시 컬럼 | Date, SAID, Model, OS, Network Usage, Network Change, Type |
| 테이블 | Type 컬럼 | 네트워크 타입 (예: Ethernet, Wi-Fi) |
| 테이블 | 기본 정렬 | Network Usage 내림차순 (네트워크 사용량이 가장 높은 디바이스가 상단) |
| **변경 이력** | 2026.04.17 | Threshold Value 선택 시 메뉴로 이동하는 정책 삭제 (추후 반영 예정) |

### 1.2.3.10 Firmware Version Distribution 팝업

![1.2.3.10 Firmware Version Distribution](./dashboard-2-depth.1-2-3-10.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 그래프 | 막대 차트 (Bar Chart) | X축: 펌웨어 버전 / Y축: 디바이스 수. 설치된 펌웨어 버전별 디바이스 분포 표시. 막대는 디바이스 수 기준 내림차순(왼쪽부터 많은 순) |
| 툴팁 | 막대 호버 시 | FW Version / Devices |
| 필터 | 검색 옵션 | Model, OS, FW Version, SAID |
| 테이블 | 표시 컬럼 | SAID, Model, OS, FW Version, FW Update Date |
| 테이블 | 기본 선택 | 팝업 열릴 때 디바이스 수가 가장 많은 펌웨어 버전이 기본 선택 |
| 테이블 | 기본 정렬 | FW Update Date 내림차순 (가장 최근에 업데이트된 디바이스가 상단) |
| **변경 이력** | 2026.04.13 | 2-depth에서 기간 설정 옵션 삭제 |

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| 위젯 선택 | 해당 위젯의 2-depth 팝업 표시 | 선택한 위젯에 대응하는 그래프 + 테이블 팝업 열림 |
| 기간 변경 | 그래프 및 테이블 업데이트 | 선택 기간에 맞는 데이터로 갱신 |
| 그룹 필터 변경 | 그래프 및 테이블 업데이트 | 선택 그룹에 맞는 데이터로 갱신 |
| 그래프의 날짜/구간 클릭 | 테이블 업데이트 | 선택된 날짜/구간에 해당하는 디바이스 목록 표시 |
| 검색 필터(Model/OS/SAID) 선택 | 테이블 필터링 | 조건에 맞는 디바이스만 표시 |
| 컬럼 헤더 클릭 | 정렬 변경 | 선택한 컬럼 기준으로 테이블 재정렬 |
| [Download] 버튼 클릭 | Excel 다운로드 | 그래프 통계 데이터를 Excel 파일로 다운로드 |
| [Close] 버튼 클릭 | 팝업 닫기 | 팝업이 닫히고 Dashboard 1-depth 화면으로 복귀 |
| Warning Devices 탭 전환 (All/Device/App) | 그래프 및 테이블 필터링 | 선택 탭에 해당하는 경고 유형만 표시 |

## 상태 / 분기

- **SAID 마스킹**: 모든 테이블에서 SAID는 11자리 식별자이며, 뒤 3자리는 마스킹 처리 (예: 12345678***)
- **기본 선택 규칙**: 팝업 열릴 때 날짜 기반 그래프는 가장 최근 날짜가 선택됨. 날짜 기반이 아닌 그래프(Firmware Distribution 등)는 가장 높은 값의 데이터 포인트가 기본 선택됨
- **X축 스크롤**: 9개 초과 데이터 포인트가 있는 경우 수평 스크롤 활성화
- **테이블 페이지**: 기본 15행 표시, 페이지네이션으로 추가 데이터 열람

## 연결된 화면

- [Dashboard 1-depth](./dashboard-1-depth.md) — 상위 화면 (팝업 닫기 시 복귀)
- 디바이스 상세 확인: `../2-devices/device-list.md`

## 비고

- **업데이트 이력**:
  - 2026.03.26: Device ID → SAID로 변경 (검색 필터링 조건 및 테이블 컬럼 전반)
  - 2026.04.13: 1.2.3.10 Firmware Version Distribution — 2-depth에서 기간 설정 옵션 삭제
  - 2026.04.17: 1.2.3.4 Crash App Devices — 테이블에서 Snapshot Link 삭제, Date → Warning Date로 변경
  - 2026.04.17: 1.2.3.7/8/9 CPU/Memory/Network — Threshold Value 선택 시 메뉴 이동 정책 삭제 (추후 반영 예정)
  - 2026.04.24: SAID 뒤 3자리 마스킹 정책 추가
