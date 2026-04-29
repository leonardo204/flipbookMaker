# Log in

> **경로**: 0. Site Entry > Log in
> **원본 ID**: `eesrei`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id=eesrei)

## 목적

RMS 시스템 진입점으로, 사용자가 KT User ID와 LDAP Password를 입력해 인증하고 시스템에 로그인하는 화면이다. 신규 사용자 등록(User Registration)도 이 화면에서 시작한다.

## 진입 경로

- 브라우저에서 RMS URL 직접 접근
- 세션 만료로 자동 로그아웃된 후 OK 버튼 선택 시
- User Registration 완료 팝업에서 [Confirm] 선택 시
- User Registration 취소 팝업에서 [OK] 선택 시

## 화면 구성

![0.1 Site Entry](./log-in.0-1.png)

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 로고 | RMS 텍스트 로고 | 화면 상단 중앙 |
| 입력 필드 1 | KT User ID | LDAP 발급 KT User ID 입력 |
| 입력 필드 2 | LDAP Password | LDAP 비밀번호 입력 (마스킹 표시) |
| 버튼 1 | [Log in] | 로그인 실행 버튼 |
| 버튼 2 | [User Registration] | 사용자 등록 팝업 열기 (2026.04.24 추가) |

---

## 시나리오 상세

### 0.1.1 Log-in (로그인)

![0.1.1 Log-in](./log-in.0-1-1.png)

**화면 구성:**

| 번호 | 요소 | 규칙 |
|------|------|------|
| 1 | 로그인 정보 입력 | 표시 필드: KT User ID, LDAP Password |
| 2 | [Log in] 버튼 | 필수 항목 미입력 시 비활성. 모든 필수 항목 입력 시 활성화. 활성화 상태에서 선택 시 로그인 후 Home으로 이동. 로그인/인증 코드 오류 시 에러 메시지 표시 (2a) |
| 3 | [User Registration] 버튼 | 선택 시 User Registration 팝업 표시 (0.1.2 User Registration 참조) |

**에러 상태 (2a) — \<When a Login Error Occurs>:**

| 요소 | 내용 |
|------|------|
| 에러 메시지 | "ID or password is not valid. Please try again" |
| 표시 위치 | 입력 필드 하단 |

---

### 0.1.2 User Registration (사용자 등록)

#### 0.1.2.1 User Registration_User Authentication Pop-up (사용자 인증 팝업)

![0.1.2.1 User Registration_User Authentication Pop-up](./log-in.0-1-2-1.png)

**팝업 구성:**

```
User Registration
─────────────────────────────────────────
Enter the user's KT User ID and LDAP Password to verify their identity

KT User ID   [                    ]
LDAP Password [                    ]

                    [Cancel] [Next]
```

| 번호 | 요소 | 규칙 |
|------|------|------|
| 1 | 제목 및 안내 문구 | "User Registration" / "Enter the user's KT User ID and LDAP Password to verify their identity" |
| 2 | KT User ID / LDAP Password 입력 필드 | LDAP 발급 KT User ID와 LDAP 비밀번호 입력 |
| 3 | [Next] / [Cancel] 버튼 | [Next]: ID와 비밀번호 미입력 시 비활성. 둘 다 입력 시 활성화 |

**[Next] 버튼 동작 분기:**

| 케이스 | 결과 |
|--------|------|
| 사용자 인증 성공 | User Information Input 팝업 표시 (0.1.2.2) |
| 사용자를 찾을 수 없음 | 알림 팝업 표시 (3-a) |
| ID와 비밀번호 불일치 | 알림 팝업 표시 (3-b) |
| 이미 등록된 사용자 | 알림 팝업 표시 (3-c) |

**알림 팝업 상세:**

| 코드 | 메시지 | 버튼 |
|------|--------|------|
| 3-a | "User not found. Please check your ID" | [OK] |
| 3-b | "Invalid ID or password. Please try again" | [OK] |
| 3-c | "This user is already registered. Please log in" | [OK] |

#### 0.1.2.2 User Registration_User Information Input pop-up (사용자 정보 입력 팝업)

![0.1.2.2 User Registration_User Information Input pop-up](./log-in.0-1-2-2.png)

**팝업 구성:**

```
User Registration
─────────────────────────────────────────
Please verify the user's affiliation information before submitting

Username        John Park            (읽기 전용)
E-mail          abc@abc.com          (읽기 전용)
Team Name       Development Team 1   (읽기 전용)
Team Code       dev01                (읽기 전용)
Division Name   KT Development Div.  (읽기 전용)
Division Code   kt-01                (읽기 전용)
Phone Number    010-1234-5678        (읽기 전용)

                    [Cancel] [Submit]
```

| 번호 | 요소 | 규칙 |
|------|------|------|
| 1 | 제목 및 안내 문구 | "User Registration" / "Please verify the user's affiliation information before submitting" |
| 2 | 사용자 정보 필드 (읽기 전용) | LDAP 인증에서 자동으로 가져온 정보로, 수정 불가. 필드: Username / E-mail / Team Name / Team Code / Division Name / Division Code / Phone Number |
| 4 | [Submit] / [Cancel] 버튼 | [Submit]: 사용자 등록 실행. [Cancel]: 등록 취소 |

**[Submit] 버튼 동작:**

| 케이스 | 결과 |
|--------|------|
| [Submit] 선택 | 등록 요청 완료 확인 팝업 표시 (4-a) |

**등록 완료 확인 팝업 (4-a):**

| 요소 | 내용 |
|------|------|
| 메시지 | "Your registration request has been submitted successfully. You will be notified by email once your account has been approved by an administrator" |
| 버튼 | [Confirm] |
| [Confirm] 선택 | 로그인 페이지로 이동 |

**[Cancel] 버튼 동작:**

| 케이스 | 결과 |
|--------|------|
| [Cancel] 선택 | 등록 취소 확인 팝업 표시 (4-b) |

**취소 확인 팝업 (4-b):**

| 요소 | 내용 |
|------|------|
| 메시지 | "Are you sure you want to cancel the user registration? All entered information will be lost" |
| 버튼 | [OK] / [Cancel] |
| [OK] 선택 | 로그인 페이지로 이동 |
| [Cancel] 선택 | 팝업 닫기 (User Information Input 팝업 유지) |

---

### 0.1.3 When Logged Out Due to Session Expiration (세션 만료 로그아웃)

![0.1.3 When Logged Out Due to Session Expiration](./log-in.0-1-3.png)

| 요소 | 내용 |
|------|------|
| 조건 | 세션 만료로 사용자가 자동 로그아웃된 경우 |
| 팝업 메시지 | "Your session has expired and you have been logged out" |
| 버튼 | [OK] |
| [OK] 선택 | 팝업 닫고 로그인 화면 표시 |

---

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| KT User ID / LDAP Password 입력 | 버튼 상태 변경 | 모두 입력 시 [Log in] 활성화 |
| [Log in] 클릭 (활성) | 로그인 인증 | 성공 시 Home 화면 이동. 실패 시 에러 메시지 표시 (2a) |
| [User Registration] 클릭 | User Registration 팝업 오픈 | 0.1.2.1 팝업 표시 |
| [Next] 클릭 (인증 팝업) | LDAP 인증 | 성공 시 0.1.2.2 팝업 표시. 실패 시 3-a/3-b/3-c 알림 팝업 |
| [Submit] 클릭 (정보 입력 팝업) | 사용자 등록 요청 | 4-a 완료 팝업 표시 |
| [Confirm] 클릭 (4-a 팝업) | 팝업 닫기 | 로그인 페이지로 이동 |
| [Cancel] 클릭 (정보 입력 팝업) | 취소 확인 | 4-b 팝업 표시 |
| [OK] 클릭 (4-b 팝업) | 등록 취소 | 로그인 페이지로 이동 |
| [OK] 클릭 (세션 만료 팝업) | 팝업 닫기 | 로그인 화면 표시 |

## 상태 / 분기

### 로그인 화면

| 상태 | 조건 | 표시 |
|------|------|------|
| 초기 | 필드 미입력 | [Log in] 비활성 |
| 입력 완료 | KT User ID, LDAP Password 모두 입력 | [Log in] 활성화 |
| 로그인 오류 | ID 또는 비밀번호 불일치 | 에러 메시지: "ID or password is not valid. Please try again" |

### User Registration 팝업 — [Next] 버튼 분기

| 케이스 | 팝업 코드 | 메시지 |
|--------|-----------|--------|
| 사용자 인증 성공 | — | 0.1.2.2 User Information Input 팝업으로 진행 |
| 사용자 없음 | 3-a | "User not found. Please check your ID" |
| ID/비밀번호 불일치 | 3-b | "Invalid ID or password. Please try again" |
| 이미 등록됨 | 3-c | "This user is already registered. Please log in" |

### 세션 만료

| 상태 | 동작 |
|------|------|
| 세션 만료 자동 로그아웃 | 세션 만료 팝업 표시 후 로그인 화면 |

## 연결된 화면

- [Policy](../00-policy.md) — 공통 레이아웃 정책
- [IA](../00-ia.md) — 전체 정보 구조 참조

## 비고

### Update History

| Date | 변경 내용 |
|------|-----------|
| 2026.04.07 | ID(E-mail) → ID로 변경. Forget Password 팝업 변경 |
| 2026.04.13 | Password Change 팝업 버튼 변경 |
| 2026.04.24 | [User Registration] 버튼 및 시나리오 추가. [Forgot password?] 버튼 및 시나리오 삭제 |

- 2026.04.24 이후: [Forgot password?] 버튼이 삭제되고, [User Registration] 버튼이 새로 추가되었다.
- User Registration은 LDAP 기반 인증 후 소속 정보(읽기 전용)를 확인하는 2단계 팝업 플로우로 구성된다.
- 등록 완료 후 관리자 승인이 필요하며, 승인 알림은 이메일로 발송된다.
- 입력 필드 중 Username, E-mail, Team Name, Team Code, Division Name, Division Code, Phone Number는 LDAP에서 자동 조회되어 읽기 전용으로 표시된다.
