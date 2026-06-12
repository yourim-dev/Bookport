# Bookport 작업 현황

> 마지막 업데이트: 2026-06-12 (4차)

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
│   │   ├── Archive/          # ✅ 2026-06-12
│   │   ├── Statistics/       # ✅ 2026-06-12
│   │   ├── SearchBook/       # ✅ 2026-06-12
│   │   ├── ManualAdd/        # ✅ 2026-06-12
│   │   ├── Profile/          # ✅ 2026-06-12
│   │   ├── ProfileEdit/      # ✅ 2026-06-12
│   │   ├── Settings/         # ✅ 2026-06-12
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
| SearchBook | `/books/search` | ✅ 2026-06-12 구현 — 검색창 UI, 빈 상태, 직접 추가 연결 (API 미연동) |
| ManualAdd v2 | `/books/add?mode=search` | ✅ 2026-06-12 구현 — 검색 결과 자동 입력, currentPage/startedAt/status 입력 |
| ManualAdd v3 | `/books/add?mode=manual` | ✅ 2026-06-12 구현 → 2026-06-12 피그마 디자인 적용 — 표지 업로드, 탑승권 모티프 퍼포레이션, 전체 필드(제목/저자/출판사/출간연도/ISBN/전체페이지/현재페이지/시작일/상태), 비행 진행률 미리보기, 등록하기 버튼 |
| Archive | `/archive` | ✅ 2026-06-12 구현 — 완독(done) 책 목록, ARRIVED 배지, 탑승권 카드 스타일, 빈 상태 포함 |
| Statistics | `/statistics` | ✅ 2026-06-12 구현 / ✅ 2026-06-12 카드 클릭 이동 추가 (전체→검색, 완독→아카이브, 읽는중/대기→Dashboard) |
| Profile | `/profile` | ✅ 2026-06-12 구현 / ✅ 2026-06-12 프로필 이미지 표시, "프로필 수정" 버튼 추가 |
| ProfileEdit | `/profile/edit` | ✅ 2026-06-12 구현 — 닉네임 수정, 프로필 이미지 업로드, authStore 업데이트 |
| Settings | `/settings` | ✅ 2026-06-12 구현 — 계정/앱설정/앱정보/로그아웃 섹션, 로그아웃 → Login 리다이렉트 |

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
- Dashboard FAB(+) → SearchBook (2026-06-12)
- Dashboard 빈 상태 버튼 → SearchBook (2026-06-12)
- SearchBook 결과 선택 → ManualAdd v2 (mode=search) (2026-06-12)
- SearchBook 직접 추가 버튼 → ManualAdd v3 (mode=manual) (2026-06-12)
- ManualAdd 저장 → bookStore.addBook() → Dashboard (2026-06-12)
- BottomNavBar 완독 탭 → Archive (/archive) (2026-06-12)
- BottomNavBar 비행통계 탭 → Statistics (/statistics) (2026-06-12)
- BottomNavBar 설정 탭 → Settings (/settings) (2026-06-12)
- Settings 로그아웃 → authStore.logout() → Login (2026-06-12)
- Profile 설정 버튼 → Settings (2026-06-12)
- Profile "프로필 수정" 버튼 → ProfileEdit (2026-06-12)
- ProfileEdit 저장 → authStore.updateProfile() → Profile (2026-06-12)
- Statistics 전체 책 카드 → /books/search (2026-06-12)
- Statistics 완독 카드 → /archive (2026-06-12)
- Statistics 읽는중/읽기전 카드 → / (2026-06-12)

### ❌ 미연결
- ~~BottomNavBar 탭 → 각 화면 (Archive, Statistics, Settings)~~ (2026-06-12 완료)
- 완독 처리 흐름 (진행률 100% → Archive 자동 이동)
- SearchBook 도서 API 연동 (현재 UI만)

---

## Store 현황

### bookStore
- `books: Book[]`
- `readingBooks` (status === 'reading')
- `doneBooks` (status === 'done') — Archive에서 사용
- `wishBooks` (status === 'wish')
- `thisWeekLogCount` — 이번 주 기록 추가된 책 수
- `longestNotReadDays` — logs 있는 reading 책 중 lastReadAt 기준 최장 경과일
- `findById(id)`
- `addBook(book)`
- `updateProgress(id, currentPage)`
- `updateBook(id, partial)`
- `addLog(id, log)` — logs 추가 + lastReadAt 갱신

### authStore
- `isLoggedIn: boolean`
- `nickname: string | null`
- `userId: string | null`
- `profileImage: string | null` — ✅ 2026-06-12 추가
- `login(userId, nickname)`
- `updateProfile(nickname, profileImage?)` — ✅ 2026-06-12 추가
- `logout()`

---

## GitHub 저장소

- **저장소**: https://github.com/yourim-dev/Bookport
- **최초 푸시**: 2026-06-11
- **브랜치**: `main`

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
| Statistics 읽기 전(대기) 카드 → Dashboard로 이동 (wish 전용 필터 미구현) | Dashboard에 wish 필터 추가 시 개선 예정 |

---

## 나중에 한번에 할 것

1. **도서 외부 API 연동** (SearchBook)
2. **백엔드 API 연동** (Axios)
3. **완독 처리 흐름** (진행률 100% → status 'done' 자동 변경 + Archive 연결)
4. **Statistics 차트** (월별 독서 기록 시각화)
5. **디자인 토큰 전체 통일** (피그마 실제 색상 기준)

---

## 남은 구현 순서 (권장)

1. 완독 처리 흐름 (EditProgress에서 100% 달성 시 Archive로)
2. Statistics 차트 시각화 (recharts 등)
3. 전체 디자인 토큰 통일
4. 도서 API + 백엔드 API 연동
