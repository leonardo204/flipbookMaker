# Dashboard (1-depth)

> **경로**: 1. Overview > Dashboard
> **원본 ID**: `1z237i`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=1z237i)

## 목적

RMS 시스템에 진입했을 때 처음으로 표시되는 대시보드 화면으로, 전체 디바이스 현황, 앱 사용량, 재부팅 현황, 성능 임계치 초과 현황, 펌웨어 배포 현황을 한눈에 파악할 수 있다.

## 진입 경로

- 로그인 후 시스템 최초 진입 시 자동으로 표시됨
- 좌측 사이드 내비게이션 > Overview > Dashboard 선택 시

## 화면 구성

### 1.1 Dashboard

![1.1 Dashboard](./dashboard-1-depth.1-1.png)

### 1.1.1 Dashboard

![1.1.1 Dashboard](./dashboard-1-depth.1-1-1.png)

### 1. 공통 영역 (헤더)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 헤더 | Last Updated Date | 대시보드 데이터가 마지막으로 갱신된 날짜/시간. 형식: `YYYY.MM.DD HH:mm:ss` (24시간제) |
| 헤더 | Reload Button (새로고침 아이콘) | 클릭 시 최신 데이터를 수동으로 다시 로드 |
| 헤더 | Online Devices | 실시간으로 현재 온라인 상태인 디바이스 수 표시. 클릭 불가(non-interactive). 아이콘 호버 시 툴팁 표시: "Number of devices currently online in real time" |

### 1.1.2 Dashboard Widget

### 2. 통계 카드 위젯

| 위젯 | 표시 정보 | 규칙 |
|------|-----------|------|
| **Total Devices** | 시스템에 등록된 전체 디바이스 수 | Info 아이콘 호버 시 툴팁 표시. 전일 대비 증감률(%) 표시. 양수=증가(빨강), 음수=감소(파랑) |
| **Active Devices** | 현재 서버에 연결된 활성 디바이스 수 | Info 아이콘 호버 시 툴팁 표시. 전일 대비 증감률(%) 표시 |
| **Warning Devices** | 임계치를 초과한 디바이스 수 (Devices > Device Policy 또는 Applications > App Policy 기준) | Info 아이콘 호버 시 툴팁 표시. 전일 대비 증감률(%) 표시 |
| **Crash App Devices** | 선택 기간 동안 앱 크래시를 경험한 디바이스 수. 동일 디바이스에서 여러 번 크래시가 발생해도 1회로 집계 | Info 아이콘 호버 시 툴팁 표시. 전일 대비 증감률(%) 표시 |

#### 툴팁 문구 상세

| 위젯 | 툴팁 문구 |
|------|-----------|
| Total Devices | Total number of registered devices in the system. Collection Period: YYYY.MM.DD HH:mm ~ YYYY.MM.DD HH:mm |
| Active Devices | Number of devices currently connected to the server. Collection Period: YYYY.MM.DD HH:mm ~ YYYY.MM.DD HH:mm |
| Warning Devices | Shows the number of devices that exceeded the configured threshold (Configured in Devices > Device Policy or Applications > App Policy). Collection Period: YYYY.MM.DD HH:mm ~ YYYY.MM.DD HH:mm |
| Crash App Devices | Number of devices that experienced app crashes during the selected period. Collection Period: YYYY.MM.DD HH:mm ~ YYYY.MM.DD HH:mm |

### 1.1.2.1 Total Devices

![1.1.2.1 Total Devices](./dashboard-1-depth.1-1-2-1.png)

### 1.1.2.2 Active Devices

![1.1.2.2 Active Devices](./dashboard-1-depth.1-1-2-2.png)

### 1.1.2.3 Warning Device

![1.1.2.3 Warning Device](./dashboard-1-depth.1-1-2-3.png)

### 1.1.2.4 Crash App Devices

![1.1.2.4 Crash App Devices](./dashboard-1-depth.1-1-2-4.png)

### 1.1.2.5 Top Apps by Usage Time

![1.1.2.5 Top Apps by Usage Time](./dashboard-1-depth.1-1-2-5.png)

### 3. Top Apps by Usage Time 위젯

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 제목 | Title, Info 아이콘 | 툴팁: "Provides information about the most frequently used apps based on total usage time. Collection Period: YYYY.MM.DD HH:mm ~ YYYY.MM.DD HH:mm" |
| 차트 | 파이 차트 | 앱 이름 및 비율은 차트 내부에 직접 표시되지 않음. 섹션 호버 시 툴팁으로 앱 이름과 비율 표시 (예: Netflix / Usage Time: 2754min (65%)) |
| 범례 | Legend 영역 | 색상 지표, 앱 이름, 사용 비율(%), 이전 기간 대비 변화율 표시 |
| 범례 | 변화율 색상 정책 | 빨강: 이전 기간 대비 증가 / 파랑: 이전 기간 대비 감소 / 회색: 변화 없음 |
| 범례 | 표시 개수 | 사용 시간 상위 4개 앱만 개별 표시. 나머지는 "Other Apps"로 통합. "Other Apps"는 항상 범례의 마지막에 표시 |

**샘플 데이터**: Netflix (+5%) 65%, Youtube (+17%) 32%, Tving (-%) 21%, Google (-11%) 11%, Other Apps 9%

### 1.1.2.6 Device Reboot Count

![1.1.2.6 Device Reboot Count](./dashboard-1-depth.1-1-2-6.png)

### 4. Device Reboot Count 위젯

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 제목 | Title, Info 아이콘 | 툴팁: "Shows device reboot activity during the selected period. Total Reboots: Total number of reboot events across all devices. Max Reboots: Highest reboot count recorded on a single device. Collection Period: YYYY.MM.DD HH:mm ~ YYYY.MM.DD HH:mm" |
| 요약 | Total Reboots | 선택 수집 기간 동안 기록된 전체 재부팅 이벤트 수. 동일 디바이스의 여러 번 재부팅은 각각 별개로 집계 |
| 요약 | Max Reboots (Single Device) | 단일 디바이스에서 수집 기간 동안 기록된 최고 재부팅 횟수 |
| 차트 | 막대 그래프(Bar chart) | X축: 시간 구간 / Y축: 해당 시간 구간의 재부팅 이벤트 수. 누적값이 아닌 구간별 개별 발생 횟수 |
| 차트 | 기준선(Reference line) | 굵은 수평 기준선 표시. 전일 총 재부팅 수 기준 평균값을 나타냄. 현재 기간과 비교 분석용 |
| 차트 | X축 레이블 | 시간 구간 레이블 (예: 4:00, 7:00, 10:00, 13:00, 16:00, 19:00, 21:00, 24:00) |
| 툴팁 | 호버 시 | Time (예: 4:00~6:59) / Total Reboots / Change vs Previous Hour / Max Reboots (Single Device) 표시 |

**샘플 데이터**: Total Reboots: 3,842 / Max Reboots (Single Device): 14

### 1.1.2.7 Devices Exceeding CPU Thresholds

![1.1.2.7 Devices Exceeding CPU Thresholds](./dashboard-1-depth.1-1-2-7.png)

### 5. Devices Exceeding CPU Thresholds 위젯

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 제목 | Title, Info 아이콘 | 툴팁: "Shows the number of devices that exceeded the configured CPU threshold (Configured in Devices > Device Policy). Exceeded Devices: Number of unique devices that exceeded the CPU threshold. Percentage: Calculated based on Active Devices. Collection Period: YYYY.MM.DD HH:mm ~ YYYY.MM.DD HH:mm" |
| 요약 | Exceeded Devices | 선택 기간 동안 CPU 임계치를 초과한 디바이스 수 및 비율 표시 (예: 1,240 (0.02% of Active Devices)) |
| 차트 | 꺾은선 그래프 | X축: 시간(현재 시간 기준) / Y축: 임계치 초과 디바이스 수 |
| 툴팁 | 호버 시 | 시간 구간 / Exceeded Devices 수 / Active Devices 대비 비율 / 날짜 표시 |

**샘플 데이터**: Exceeded Devices: 1,240 (0.02% of Active Devices)

### 1.1.2.8 Devices Exceeding Memory Thresholds

![1.1.2.8 Devices Exceeding Memory Thresholds](./dashboard-1-depth.1-1-2-8.png)

### 6. Devices Exceeding Memory Thresholds 위젯

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 제목 | Title, Info 아이콘 | 툴팁: "Shows the number of devices that exceeded the configured memory threshold (Configured in Devices > Device Policy). Exceeded Devices: Number of unique devices that exceeded the memory threshold. Percentage: Calculated based on Active Device. Collection Period: YYYY.MM.DD HH:mm ~ YYYY.MM.DD HH:mm" |
| 요약 | Exceeded Devices | 선택 기간 동안 메모리 임계치를 초과한 디바이스 수 및 비율 표시 |
| 차트 | 꺾은선 그래프 | X축: 시간(현재 시간 기준) / Y축: 임계치 초과 디바이스 수 |
| 툴팁 | 호버 시 | 시간 구간 / Exceeded Devices 수 / Active Devices 대비 비율 / 날짜 표시 |

### 1.1.2.9 Devices Exceeding Network Thresholds

![1.1.2.9 Devices Exceeding Network Thresholds](./dashboard-1-depth.1-1-2-9.png)

### 7. Devices Exceeding Network Thresholds 위젯

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 제목 | Title, Info 아이콘 | 툴팁: "Shows the number of devices that exceeded the configured network usage threshold (Configured in Devices > Device Policy). Exceeded Devices: Number of unique devices that exceeded the network usage threshold. Percentage: Calculated based on Active Devices. Collection Period: YYYY.MM.DD HH:mm ~ YYYY.MM.DD HH:mm" |
| 요약 | Exceeded Devices | 선택 기간 동안 네트워크 임계치를 초과한 디바이스 수 및 비율 표시 |
| 차트 | 꺾은선 그래프 | X축: 시간(현재 시간 기준) / Y축: 임계치 초과 디바이스 수 |
| 툴팁 | 호버 시 | 시간 구간 / Exceeded Devices 수 / Active Devices 대비 비율 / 날짜 표시 |

### 1.1.2.10 Firmware Version Distribution

![1.1.2.10 Firmware Version Distribution](./dashboard-1-depth.1-1-2-10.png)

### 8. Firmware Version Distribution 위젯

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 제목 | Title, Info 아이콘 | 툴팁: "Displays the real-time percentage distribution of firmware versions across devices" |
| 차트 | 파이 차트 | 펌웨어 이름 및 비율은 차트 내부에 직접 표시되지 않음. 섹션 호버 시 펌웨어 이름과 디바이스 수/비율 표시 (예: FW_RMS_v2.3.1 / Devices 123,846 (65%)) |
| 범례 | Legend 영역 | 색상 지표, 펌웨어 이름, 비율(%), 이전 기간 대비 변화율 표시 |
| 범례 | 변화율 색상 정책 | 빨강: 증가 / 파랑: 감소 / 회색: 변화 없음 |
| 범례 | 표시 개수 | 상위 4개 펌웨어만 개별 표시. 나머지는 "Other Firmwares"로 통합. "Other Firmwares"는 항상 범례의 마지막에 표시 |

**샘플 데이터**: FW_RMS_v2.3.1_202602 (+5%) 65%, STB-Core_Release_1.8.0 (+7%) 32%, EdgeOS_Firmware_v3.0.5 (-%) 21%, KT-Global_FW_2.1.4_R (-7%) 11%, Other Firmwares 9%

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| Reload 버튼 클릭 | 대시보드 데이터 수동 새로고침 | 최신 데이터로 화면 갱신, Last Updated Date 업데이트 |
| 대시보드 위젯 클릭 | 해당 위젯에 대응하는 2-depth 팝업 열기 | [Dashboard 2-depth 팝업](./dashboard-2-depth.md) 표시 |
| [More] 버튼 클릭 | 해당 위젯의 상세 팝업 열기 | [Dashboard 2-depth 팝업](./dashboard-2-depth.md) 표시 |
| 통계 카드 위젯의 Info 아이콘 호버 | 메트릭 정의 및 계산 기준 툴팁 표시 | 각 위젯별 상세 툴팁 표시 |
| Online Devices 위젯의 아이콘 호버 | 툴팁 표시 | "Number of devices currently online in real time" |
| Top Apps 파이차트 섹션 호버 | 상세 툴팁 표시 | 앱 이름, 사용 시간, 비율 표시 (예: Netflix / Usage Time: 2754min (65%)) |
| Device Reboot Count 차트 호버 | 시간 구간별 상세 툴팁 표시 | Time / Total Reboots / Change vs Previous Hour / Max Reboots (Single Device) |
| CPU/Memory/Network Threshold 차트 호버 | 해당 시점 상세 툴팁 표시 | 시간 구간, Exceeded Devices 수, Active Devices 대비 비율, 날짜 |
| Firmware 파이차트 섹션 호버 | 상세 툴팁 표시 | FW Version 이름, Devices 수/비율 |

## 상태 / 분기

- **Online Devices 위젯**: 클릭 불가(non-interactive). 실시간 표시 전용
- **증감률 색상**: 양수(+) 값 = 빨강 표시, 음수(-) 값 = 파랑 표시
- **Top Apps / Firmware 범례**: 상위 4개만 개별 표시, 나머지는 "Other Apps" / "Other Firmwares"로 묶음
- **Device Reboot Count 기준선**: 전일 평균 재부팅 수를 굵은 수평선으로 표시하여 현재 기간과 비교 가능

## 연결된 화면

- [Dashboard 2-depth](./dashboard-2-depth.md) — 각 위젯 클릭 시 해당 위젯의 상세 팝업

## 비고

- **업데이트 이력 (2026.04.13)**: 1.1.2.10 Firmware Version Distribution — 툴팁 문구 변경 및 Collection Period 삭제
- 대시보드에 기본 표시되는 위젯 목록: Total Devices / Active Devices / Warning Devices / Crash App Devices / Top Apps by Usage Time / Device Reboot Count / Devices Exceeding CPU Thresholds / Devices Exceeding Memory Thresholds / Devices Exceeding Network Thresholds / Firmware Version Distribution
- 각 위젯에 표시되는 정보: 제목, 관련 그래프 데이터, Info 아이콘
