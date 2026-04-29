# RMS Flipbook 스펙 문서

> 원본 프로토타입: https://lsx333.axshare.com/?g=14&id=release_history
> 마지막 업데이트: 2026-04-28

## 메타 문서

- [Release History](./00-release-history.md)
- [IA (Information Architecture)](./00-ia.md)
- [Policy (공통 정책)](./00-policy.md)

## 섹션

- [0. Site Entry](./0-site-entry/index.md)
- [1. Overview](./1-overview/index.md)
- [2. Devices](./2-devices/index.md)
- [3. VOC Center (For agent)](./3-voc-center-for-agent/index.md)
- [4. Connecting Devices](./4-connecting-devices/index.md)
- [5. Applications](./5-applications/index.md)
- [6. Firmware](./6-firmware/index.md)
- [7. Administration](./7-administration/index.md)
- [8. Set-top box UI scenario](./8-set-top-box-ui-scenario/index.md)

## 전체 사이트맵

```
RMS Flipbook
├── Release History                        [release_history.html]
├── IA                                     [ia.html]
├── Policy                                 [policy.html]
│
├── 0. Site Entry
│   └── Log in                             [log_in.html]
│
├── 1. Overview
│   ├── Dashboard_1 depth                  [dashboard_1_depth.html]
│   ├── Dashboard_2 depth                  [dashboard_2_depth.html]
│   ├── Quick Operation                    [quick_operation.html]
│   └── Reports                            [reports.html]
│
├── 2. Devices
│   ├── Device List                        [device_list.html]
│   ├── Search                             [search.html]
│   ├── Device Group                       [device_group.html]
│   ├── Command (1)                        [command__1_.html]
│   ├── Command (2)                        [command__2_.html]
│   ├── VOC Devices                        [voc_devices.html]
│   └── Device Policy                      [device_policy.html]
│
├── 3. VOC Center (For agent)
│   └── VOC Devices                        [voc_devices_1.html]
│
├── 4. Connecting Devices
│   ├── Connecting Devices Policy          [connecting_devices_policy.html]
│   ├── Connecting Devices                 [connecting_devices.html]
│   ├── Command>Device Control             [command_device_control.html]
│   ├── Command>App Control                [command_app_control.html]
│   ├── Command>Advanced Control           [command_advanced_control.html]
│   └── Issue report                       [issue_report.html]
│
├── 5. Applications
│   ├── App List                           [app_list.html]
│   ├── App Install                        [app_install.html]
│   └── App Policy                         [app_policy.html]
│
├── 6. Firmware
│   ├── Firmware List                      [firmware_list.html]
│   └── Firmware Install                   [firmware_install.html]
│
├── 7. Administration
│   ├── Administrator List                 [administrator_list.html]
│   ├── Role Setting                       [role_setting.html]
│   └── Alert Setting                      [alert_setting.html]
│
└── 8. Set-top box UI scenario
    └── Set-top box UI scenario            [set-top_box_ui_scenario.html]
```

## 주요 화면 흐름

```mermaid
flowchart TD
    A["브라우저 접속"] --> B["Log in<br>0. Site Entry"]
    B -->|로그인 성공| C["Dashboard<br>1. Overview"]

    C --> D["Quick Operation<br>1. Overview"]
    C --> E["Reports<br>1. Overview"]

    C --> F["Device List<br>2. Devices"]
    F --> F1["Search<br>검색 조건 추가"]
    F --> F2["Device Group<br>그룹 관리"]
    F --> F3["Command 1<br>Device, App Control"]
    F --> F4["Command 2<br>Advanced Control"]
    F --> F5["VOC Devices<br>2. Devices"]
    F --> F6["Device Policy<br>정책 설정"]

    F5 -->|VOC 세션 시작| G["Connecting Devices<br>4. Connecting Devices"]
    G --> G1["Command — Device Control"]
    G --> G2["Command — App Control"]
    G --> G3["Command — Advanced Control"]
    G -->|연결 종료| G4["Issue Report"]

    C --> H["VOC Center<br>3. For agent"]
    H --> G

    C --> I["App List<br>5. Applications"]
    I --> I1["App Install<br>설치 배포"]
    I --> I2["App Policy<br>정책 관리"]

    C --> J["Firmware List<br>6. Firmware"]
    J --> J1["Firmware Install<br>배포"]

    C --> K["Administrator List<br>7. Administration"]
    K --> K1["Role Setting<br>역할 권한"]
    K --> K2["Alert Setting<br>알림 설정"]
```
