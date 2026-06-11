# Bookport 작업 현황

> 마지막 업데이트: 2026-06-11

---

## 기술 스택

| 구분 | 기술 |
|---|---|
| Framework | React 18 + Vite |
| Language | TypeScript |
| Routing | React Router DOM v6 |
| State | MobX + mobx-react-lite |
| Styling | SCSS (CSS Modules) |
| HTTP | Axios |
| 코드 품질 | ESLint + Prettier |
| 패키지 | npm |

---

## 폴더 구조

```
bookport-app/
├── src/
│   ├── pages/
│   │   ├── Dashboard/
│   │   ├── BookDetail/
│   │   ├── EditProgress/
│   │   ├── AddLog/
│   │   ├── Archive/          # 미구현
│   │   ├── Statistics/       # 미구현
│   │   ├── SearchBook/       # 미구현
│   │   ├── ManualAdd/        # 미구현
│   │   ├── Profile/          # 미구현
│   │   ├── Settings/         # 미구현
│   │   ├── Login/
│   │   ├── Signup/
│   │   ├── Onboarding/
│   │   └── Splash/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopAppBar/
│   │   │   └── BottomNavBar/
│   │   └── cards/
│   │       └── BoardingPassCard/
│   ├── stores/
│   │   ├── bookStore.ts
│   │   └── authStore.ts
│   ├── router/
│   │   └── index.tsx
│   ├── constants/
│   │   └── onboarding.ts
│   └── styles/
│       ├── _variables.scss
│       ├── _reset.scss
│       └── global.scss
```

---

## 화면별 구현 현황

### ✅ 완료

| 화면 | 라우팅 | 비고 |
|---|---|---|
| Splash | `/splash` | |
| Onboarding | `/onboarding` | 3슬라이드, localStorage 완료 여부 저장 |
| Login | `/login` | authStore 연결, Dashboard로 이동 |
| Signup | `/signup` | 유효성 검사, Login으로 이동 |
| Dashboard | `/` | BoardingPassCard, 필터, FAB |
| BookDetail | `/books/:id` | 진행바, 최근 요약, 독서 기록 타임라인 |
| EditProgress | `/books/:id/edit-progress` | 페이지 스테퍼, 진행률 슬라이더 |
| AddLog | `/books/:id/add-log` | 독서 기록 추가 |

### ❌ 미구현

| 화면 | 라우팅 | 비고 |
|---|---|---|
| SearchBook | `/books/search` | 도서 API 연동 포함 |
| ManualAdd | `/books/add` | 직접 입력 폼 |
| Archive | `/archive` | 완독 아카이브 |
| Statistics | `/statistics` | 비행 통계, 차트 |
| Profile | `/profile` | |
| Settings | `/settings` | |

---

## 기능 연결 현황

### ✅ 연결 완료
- Dashboard 책 카드 클릭 → BookDetail
- BookDetail 진행률 수정 버튼 → EditProgress
- BookDetail 독서 기록 추가 버튼 → AddLog
- EditProgress 저장 → bookStore.updateProgress() → BookDetail
- AddLog 저장 → bookStore.addLog() → BookDetail
- 앱 최초 진입 → Onboarding → Login
- 로그인 상태 아닌 경우 → Login 리다이렉트 (PrivateRoute)
- 프로필 버튼 → 로그인 상태면 /profile, 아니면 /login

### ❌ 미연결
- Dashboard FAB(+) → SearchBook
- 완독 처리 흐름 (진행률 100% → Archive)
- BottomNavBar 탭 → 각 화면 (Archive, Statistics, Settings)

---

## Store 현황

### bookStore
- `books: Book[]`
- `findById(id)`
- `addBook(book)`
- `updateProgress(id, currentPage)`
- `updateBook(id, partial)`
- `addLog(id, log)`

### authStore
- `isLoggedIn: boolean`
- `user: User | null`
- `login(email, password)`
- `logout()`

---

## GitHub 저장소

- **저장소**: https://github.com/yourim-dev/Bookport
- **최초 푸시**: 2026-06-11
- **브랜치**: `main`
- **커밋**: `feat: initial project setup - Dashboard, Auth, BookDetail, EditProgress, AddLog`

### ✅ Git 설정 완료 (2026-06-11)
- .gitignore 업데이트 (`.mcp.json`, `.env`, `*.pem`, `*.key` 등 보안 파일 제외)
- README.md 프로젝트 정보로 업데이트
- `npm run push --msg="..."` 스크립트 추가
- GitHub 초기 푸시 완료

---

## 알려진 이슈

| 이슈 | 상태 |
|---|---|
| Component is not a function (router import 충돌) | 반복 발생, 매번 수동 수정 중 |
| BookDetail TopAppBar 사라짐 | 수정 요청 중 |

---

## 나중에 한번에 할 것

1. **도서 외부 API 연동** (SearchBook)
2. **백엔드 API 연동** (Axios)
3. **디자인 토큰 전체 통일** (피그마 실제 색상 기준)
4. **피그마 색상 차이 조정**
   - `$color-bg: #F5F5F0` → 실제 피그마 `#f6fafd`
   - `$color-primary: #1B3A5C` ≈ `#1a2b3c` (거의 동일)

---

## 남은 구현 순서 (권장)

1. SearchBook + ManualAdd (책 추가 흐름 완성)
2. Archive (완독 흐름 연결)
3. Statistics
4. Profile + Settings
5. 전체 디자인 토큰 통일
6. 도서 API + 백엔드 API 연동
