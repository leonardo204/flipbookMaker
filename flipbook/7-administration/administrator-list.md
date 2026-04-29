# Administrator List

> **경로**: 7. Administration > Administrator List
> **원본 ID**: `gsnmie`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=gsnmie)

![7.1 Administrator List](./administrator-list.7-1.png)

## 목적

시스템에 등록된 관리자 목록을 조회하고, 개별 관리자의 상세 정보를 확인하거나 Role Level을 변경하고 계정을 삭제하는 화면이다. 또한 신규 관리자 등록 요청(승인 대기)을 검토하고 승인/거부하는 기능을 제공한다.

## 진입 경로

- GNB(좌측 메뉴) > Administration > Administrator List

## 화면 구성

![7.1.1 Administrator List](./administrator-list.7-1-1.png)

### 탭 구성

| 탭 | 설명 |
|----|------|
| Admin List (기본) | 현재 등록된 관리자 목록 표시 |
| Pending Approval | 계정 등록 요청 후 승인 대기 중인 관리자 목록 표시 |

### 1. 공통 요소

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | 탭 | Admin List / Pending Approval. 기본값: Admin List. 선택 탭에 따라 하단 내용 변경 |
| 2 | 검색 필터 (Select box) | 옵션: ID, E-mail, Name, Team, Division, Phone number. 선택 옵션에 따라 "Enter OOO" 형식의 placeholder 표시 |
| 2 | 검색 동작 | [Search] 클릭 시 현재 선택된 탭에서만 결과 표시 |
| 4 | Download excel 버튼 | 관리자 선택 후 클릭 시 Excel 파일 다운로드. 미선택 시 팝업 표시. 목록 비어있으면 반응 없음 |
| 5 | Help 버튼 | 클릭 시 도움말 팝업 표시 |

### 2. Admin List 탭 — 관리자 목록

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 3 | 테이블 컬럼 | No. / ID / E-mail / Name / Role Level / Team / Division / Phone Number / Last Login Time |
| 3 | ID 클릭 | 관리자 상세 페이지로 이동 (7.1.2 Administrator detail page) |
| 3 | Date registered 형식 | YYYY-MM-DD. 당일 등록 시: HH:MM:SS (24시간제) |
| 3 | Last Login Time 형식 | YYYY-MM-DD. 당일 로그인 시: HH:MM:SS (24시간제) |
| 3 | Role Level 값 | Level 1 / Level 2 / Level 3 |
| - | 페이지네이션 | 15 lines / 페이지 단위 표시, 《 〈 1 2 3 ... 〉 》 형식 |

### 3. Pending Approval 탭 — 승인 대기 관리자 목록

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 3 | 테이블 컬럼 | No. / ID / E-mail / Name / Team / Division / Phone Number / Date Requested |
| 3 | ID 클릭 | Approval Request Detail 페이지로 이동 (7.1.8 Approval Request Detail) |
| 3 | Date Requested 형식 | YYYY-MM-DD. 당일 요청 시: HH:MM:SS (24시간제) |
| - | 승인 처리 결과 | Approved → Admin List 탭으로 이동됨. Pending Approval 목록에서 제거 |
| - | 거부 처리 결과 | Rejected → 해당 관리자 모든 정보 영구 삭제. Pending Approval 목록에서 제거 |

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| 탭 전환 | 하단 내용 변경 | Admin List 또는 Pending Approval 목록 표시 |
| 검색 필터 변경 | placeholder 변경 | "Enter {옵션}" 형식 표시 |
| [Search] 클릭 | 검색 실행 | 현재 탭 내 결과 필터링 |
| ID 클릭 (Admin List) | 상세 페이지 이동 | Administrator detail page 표시 |
| ID 클릭 (Pending Approval) | 상세 페이지 이동 | Approval Request Detail 표시 |
| 관리자 체크 + [Download excel] 클릭 | 다운로드 팝업 표시 | 선택된 관리자 수와 함께 확인 메시지 |
| 미선택 + [Download excel] 클릭 | 안내 팝업 표시 | "Select the administrators you want to download" |
| 빈 목록 + [Download excel] 클릭 | 반응 없음 | - |

## 상태 / 분기

![7.1.4 Administrator list_When there is no list](./administrator-list.7-1-4.png)

### 7.1.4 Administrator list_When there is no list

- 메시지: "No administrators registered"

![7.1.5 Administrator list_ Administrator list_ No results found](./administrator-list.7-1-5.png)

### 7.1.5 Administrator list_No results found

- 메시지: "No search results found"

![7.1.7 Administrator List_Pending Approval](./administrator-list.7-1-7.png)

### 7.1.7.1 Pending Approval_When there is no list

![7.1.7.1 Administrator List_Pending Approval_When there is no list](./administrator-list.7-1-7-1.png)

- 메시지: "No pending approval requests"

![7.1.7.2 Administrator List_Pending Approval_No results found](./administrator-list.7-1-7-2.png)

### 7.1.7.2 Pending Approval_No results found

- 메시지: "No search results found"

### 7.1.2 Administrator Detail Page

관리자 목록에서 ID 선택 시 표시되는 상세 페이지.

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | Role Level | 현재 할당된 Role 표시. 클릭 시 리스트 팝업 표시. 선택 가능: Level 1 / Level 2 / Level 3 |
| 2 | 관리자 정보 | ID / E-mail / Administrator Name / Team Name / Team Code / Division Name / Division Code / Phone Number / Account Request Date / Account Approval Date 표시. 모든 필드 읽기 전용 (편집 불가) |
| 3 | [List] 버튼 | 변경 저장 없이 Administrator List로 이동 |
| 3 | [Delete Account] 버튼 | 계정 삭제 확인 팝업(3a) 표시 |
| 3 | [Save] 버튼 | 확인 팝업 표시 후 Role Level 변경 저장 및 Administrator List로 이동 (3c) |

**삭제 확인 팝업 (3a)**

- 제목: "Delete Account"
- 메시지: "Are you sure you want to delete this account? All information related to this account will be permanently removed and cannot be recovered."
- [Delete]: 계정 삭제 후 Administrator List로 이동
- [Cancel]: 팝업 닫기

**저장 완료 팝업 (3c)**

- 메시지: "Account has been modified successfully"
- [OK] 클릭 시 Administrator List로 이동

![7.1.8 Approval Request Detail](./administrator-list.7-1-8.png)

### 7.1.8 Approval Request Detail Page

Pending Approval 탭에서 ID 선택 시 표시.

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | Role Level | 현재 할당된 Role Level 표시. 클릭 시 리스트 팝업 표시. 이 페이지에서 유일하게 편집 가능한 필드 |
| 2 | 관리자 정보 | ID / E-mail / Administrator Name / Team Name / Team Code / Division Name / Division Code / Phone Number / Account Request Date 표시. 모든 필드 읽기 전용 |
| 3 | [List] 버튼 | 변경 저장 없이 Pending Approval 목록으로 이동 |
| 3 | [Reject] 버튼 | 거부 확인 팝업(3a) 표시. 확인 시 해당 관리자 모든 정보 영구 삭제 및 Pending Approval 목록에서 제거 |
| 3 | [Approve] 버튼 | 완료 팝업(3b) 표시. 확인 시 관리자 등록 완료 및 Admin List로 이동. Pending Approval 목록에서 제거. 관리자에게 승인 알림 이메일 발송 |

**거부 확인 팝업 (3a)**

- 메시지: "Are you sure you want to reject this account? All information for this administrator will be permanently deleted and cannot be recovered."
- [Reject]: 거부 처리 실행
- [Cancel]: 팝업 닫기

**승인 완료 팝업 (3b)**

- 메시지: "The account has been approved and successfully registered. A notification email has been sent to the administrator."
- [OK] 클릭 시 완료

### 7.1.6 Download Excel 팝업

![7.1.6.1 Download excel pop_up](./administrator-list.7-1-6-1.png)

**7.1.6.1 — 관리자 선택 후 다운로드 시**

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | 팝업 제목 | "Download Excel" |
| 2 | 안내 메시지 | 선택된 관리자 수와 함께 안내 문구 표시. 예: "25 administrators selected. Do you want to download them?" |
| 3 | Download 버튼 | 선택된 관리자 목록을 Excel 파일로 다운로드 |
| 3 | Close 버튼 | 팝업 닫기 |

**7.1.6.2 — 미선택 후 다운로드 시**

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 1 | 팝업 제목 | "Download Excel" |
| 2 | 안내 메시지 | "Select the administrators you want to download" |
| 3 | OK 버튼 | 팝업 닫기 |

## 업데이트 이력

| 날짜 | 내용 |
|------|------|
| 2026.04.07 | 테이블, 검색필터 내에 아이디, 이메일 분리. ID 관련 정책 추가 |
| 2026.04.10 | 7.1.3 Administrator detail page: 비밀번호 변경 이력에 관계없이 [Reset Password] 버튼 표시로 정책 변경 |
| 2026.04.24 | 관리자 리스트에 Role → Role Level로 변경 |
| 2026.04.24 | 관리자 리스트, 승인 대기 탭 추가 |
| 2026.04.24 | Administrator List 테이블 내용 수정 |
| 2026.04.24 | [Register] Button 및 관리자 등록 시나리오 삭제 |
| 2026.04.24 | 7.1.2 Administrator detail page: 표시 정보 변경 |
| 2026.04.24 | 시나리오 추가: 7.1.7 Administrator List_Pending Approval / 7.1.8 Approval Request Detail |
| 2026.04.24 | 7.1.9 "Administration>Administrator list" guide 가이드 문구 변경 |

### 7.1.9 Help 팝업 — "Administration > Administrator list" guide

가이드 내용:
- **Administration > Administrator list는 관리자 목록을 조회하고 신규 관리자를 등록할 수 있는 메뉴입니다.**
- **1. Search**: Select box 옵션: ID, E-mail, Name, Team, Division. 선택 옵션에 따라 "Enter OOO" placeholder. [Search] 클릭 시 현재 탭에서만 결과 표시
- **2. Admin List 탭**: No., ID, E-mail, Name, Role Level, Team, Division, Last Login Time 정보 표시. ID 선택 시 상세 페이지 이동. [Download] 버튼으로 Excel 다운로드 가능
- **3. Pending Approval 탭**: 계정 등록 요청 후 승인 대기 중인 관리자 표시. 표시 정보: No., ID, E-mail, Name, Team, Division, Date Requested. ID 선택 시 Approval Request Detail 페이지 이동. 승인/거부 처리 가능

## 연결된 화면

- [Role Setting](./role-setting.md) — 역할 설정
- [Alert Setting](./alert-setting.md) — 알림 설정

## 비고

- 페이지당 15개 항목 표시
- ID는 고유 식별자로, Admin List에서 ID 클릭 시 상세 페이지로 이동
- Pending Approval에서 ID 클릭 시 승인/거부 처리 가능한 상세 페이지로 이동
- 승인 완료 시 관리자에게 이메일 알림 자동 발송
- 거부 처리 시 해당 관리자 모든 정보 영구 삭제
