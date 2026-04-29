# Firmware List

> **경로**: 6. Firmware > Firmware List
> **원본 ID**: `60pu3m`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=60pu3m)

![6.1 Firmware list](./firmware-list.6-1.png)

## 목적

OTA(Over-the-Air) 방식으로 사용할 펌웨어를 업로드하고 관리하는 화면이다. 등록된 펌웨어 목록을 조회하고, 펌웨어를 업로드하거나 삭제하며, 목록을 Excel로 다운로드할 수 있다.

## 진입 경로

- GNB(좌측 메뉴) > Firmware > Firmware List

## 화면 구성

![6.1.1 Firmware list](./firmware-list.6-1-1.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | 검색창 | 검색박스 + [Search] 버튼. 입력창 placeholder: "Enter firmware". Firmware 컬럼 기준으로 검색 결과 표시 |
| 2 | Download Excel 버튼 | 체크박스 선택된 펌웨어 항목을 Excel 파일로 다운로드. 미선택 시 팝업 표시 (6.1.6 Download Excel 참조). 목록이 비어있으면 반응 없음 |
| 3 | Firmware Upload 버튼 | 클릭 시 Firmware 등록 페이지(팝업)로 이동 (6.1.4 Firmware Upload 참조) |
| 4 | Firmware List 테이블 | 등록된 펌웨어 목록 표시. 표시 정보: Firmware, Version, Description |
| 4 | 행 선택 | 펌웨어 항목 선택 시 상세 정보 팝업 표시 (6.1.3 Firmware list_Firmware detail 참조) |
| 4 | 페이지네이션 | 15 lines / 페이지 단위 표시, 《 〈 1 2 3 ... 〉 》 형식 |
| 5 | Help 버튼 | 클릭 시 Help 팝업 표시 |

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| [Search] 클릭 | Firmware 컬럼 기준 검색 실행 | 검색 결과 필터링 표시 |
| 펌웨어 체크 + [Download Excel] 클릭 | 다운로드 확인 팝업 표시 (6.1.6.1) | 선택된 펌웨어 개수 + 다운로드 확인 메시지 |
| 미선택 + [Download Excel] 클릭 | 안내 팝업 표시 (6.1.6.2) | "Select the firmwares you want to download" |
| 빈 목록 + [Download Excel] 클릭 | 반응 없음 | - |
| [Firmware Upload] 클릭 | Firmware Upload 팝업 표시 | 신규 펌웨어 등록 화면 |
| 펌웨어 행 선택 | Firmware Detail 팝업 표시 | Firmware, Version, Description 상세 정보 |
| [Help] 클릭 | 도움말 팝업 표시 | 가이드 텍스트 표시 |

## 상태 / 분기

![6.1.2 Firmware list_No data](./firmware-list.6-1-2.png)

### 6.1.2 Firmware list_No data (펌웨어 없을 때)

- 메시지: "Please upload the firmware"
- No. 컬럼에 해당 메시지가 표시됨

![6.1.5 When no search results are found in the Firmware list](./firmware-list.6-1-5.png)

### 6.1.5 When no search results are found

- 메시지: "No search results found"

![6.1.3 Firmware list_Firmware detail](./firmware-list.6-1-3.png)

### 6.1.3 Firmware Detail 팝업

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | 상세 정보 | Firmware, Version, Description 표시 |
| 2 | Delete firmware 버튼 | 펌웨어 삭제 확인 팝업(2-a) 표시 |
| 2 | Close 버튼 | 팝업 닫기 |

**삭제 확인 팝업 (2-a)**

- 메시지: "Are you sure you want to delete this firmware?"
- [Delete]: 펌웨어 삭제 후 Firmware List 화면으로 이동
- [Cancel]: 삭제 확인 팝업 닫고 Firmware Detail 팝업 재표시

![6.1.4 Firmware upload](./firmware-list.6-1-4.png)

### 6.1.4 Firmware Upload 팝업

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | 팝업 제목 | "Firmware Upload" |
| 2 | 입력창 | Firmware, Version, Description 입력창 |
| 3 | 파일 첨부 영역 | 선택 시 PC의 파일 탐색기 오픈. 파일 선택 시 해당 영역에 표시됨 |
| 4 | Upload 버튼 | 첨부된 펌웨어 업로드. 입력창이 비어있거나 파일 미첨부 시 비활성화(Disabled) |
| 4 | Close 버튼 | 팝업 닫기 |

**파일 첨부 불가 시 팝업**

- 메시지: "This file cannot be attached"
- [OK] 버튼으로 닫기

**파일 추가 후 표시**

- 첨부된 파일명이 첨부 영역에 표시됨
- 새 파일 추가 시 기존 파일을 덮어씀

### 6.1.6 Download Excel 팝업

![6.1.6.1 Download excel pop_up](./firmware-list.6-1-6-1.png)

**6.1.6.1 — 펌웨어 선택 후 다운로드 시**

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | 팝업 제목 | "Download Excel" |
| 2 | 안내 메시지 | 선택된 펌웨어 수와 함께 안내 문구 표시. 예: "25 firmwares selected. Do you want to download them?" |
| 3 | Download 버튼 | 선택된 펌웨어 목록을 Excel 파일로 다운로드 |
| 3 | Close 버튼 | 팝업 닫기 |

![6.1.6.2 Download excel pop_up](./firmware-list.6-1-6-2.png)

**6.1.6.2 — 미선택 후 다운로드 시**

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | 팝업 제목 | "Download Excel" |
| 2 | 안내 메시지 | "Select the firmwares you want to download" |
| 3 | OK 버튼 | 팝업 닫기 |

### 6.1.7 Help 팝업 — "Firmware > Firmware list" guide

가이드 내용:
- **이 페이지는 펌웨어를 업로드하고 관리하는 페이지입니다.**
- **1. Search**: 펌웨어명으로 검색 시 일치하는 펌웨어가 표시됨
- **2. Firmware list**: 등록된 펌웨어 목록이 Firmware, Version, Description과 함께 표시됨. 목록에서 펌웨어를 선택하면 상세 정보가 표시됨. [Download] 버튼으로 Excel 파일 다운로드 가능
- **3. Register firmware**: [Firmware upload] 버튼 클릭 시 신규 펌웨어 추가 팝업 표시. 펌웨어명, 버전, 설명 입력 후 파일 첨부하여 업로드. 업로드 완료 시 목록에 표시됨

Help 팝업 규칙:
- 내용이 영역을 초과할 경우 스크롤바 표시
- Close 버튼 클릭 시 가이드 메시지 팝업 닫힘

## 연결된 화면

- [Firmware Install](./firmware-install.md) — 펌웨어 설치 화면

## 비고

- 페이지당 15개 항목 표시
- 체크박스로 다중 펌웨어 선택 가능 (Excel 다운로드용)
- Master 역할은 기본 생성되며 수정 불가
