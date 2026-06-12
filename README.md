# Bookport ✈️

> 항공 탑승권 메타포 기반 독서 기록 앱

책 한 권을 읽는 여정을 마치 비행 탑승권처럼 기록하는 모바일 웹 앱입니다.

---

## 기술 스택

| 구분 | 기술 |
|---|---|
| Framework | React 18 + Vite |
| Language | TypeScript |
| Routing | React Router DOM v6 |
| State | MobX + mobx-react-lite |
| Styling | SCSS |
| HTTP | Axios |
| 코드 품질 | ESLint + Prettier |

---

## 폴더 구조

```
bookport-app/
├── src/
│   ├── pages/
│   │   ├── Dashboard/          # 메인 (탑승권 카드 목록)
│   │   ├── BookDetail/         # 책 상세 + 독서 기록 타임라인
│   │   ├── EditProgress/       # 진행률 수정 (드래그 슬라이더)
│   │   ├── AddLog/             # 독서 기록 추가
│   │   ├── SearchBook/         # 도서 검색
│   │   ├── ManualAdd/          # 직접 입력 (v2 검색결과 자동입력 / v3 수동입력)
│   │   ├── Archive/            # 완독 아카이브
│   │   ├── Statistics/         # 독서 통계
│   │   ├── Profile/            # 프로필
│   │   ├── ProfileEdit/        # 프로필 수정 (닉네임, 이미지)
│   │   ├── Settings/           # 설정
│   │   ├── Login/              # 로그인
│   │   ├── Signup/             # 회원가입
│   │   ├── Onboarding/         # 온보딩 (3슬라이드)
│   │   └── Splash/             # 스플래시
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
├── public/
├── index.html
├── vite.config.ts
└── package.json
```

---

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

---

## 구현 완료 화면

| 화면 | 라우팅 | 설명 | 완료일 |
|---|---|---|---|
| Splash | `/splash` | 앱 진입 스플래시 | - |
| Onboarding | `/onboarding` | 3슬라이드 온보딩, localStorage 완료 여부 저장 | - |
| Login | `/login` | authStore 연결, Dashboard로 이동 | - |
| Signup | `/signup` | 유효성 검사, Login으로 이동 | - |
| Dashboard | `/` | BoardingPassCard 목록, 필터, FAB, 통계 칩 | - |
| BookDetail | `/books/:id` | 진행바, 최근 요약, 독서 기록 타임라인 | - |
| EditProgress | `/books/:id/edit-progress` | 드래그 슬라이더, e-book 모드 | - |
| AddLog | `/books/:id/add-log` | 독서 기록 추가 | - |
| SearchBook | `/books/search` | 검색창 UI, 직접 추가 연결 (API 미연동) | 2026-06-12 |
| ManualAdd v2 | `/books/add?mode=search` | 검색 결과 자동 입력 | 2026-06-12 |
| ManualAdd v3 | `/books/add?mode=manual` | 표지 업로드, 탑승권 모티프, 전체 필드 | 2026-06-12 |
| Archive | `/archive` | 완독 책 목록, ARRIVED 배지, 탑승권 카드 | 2026-06-12 |
| Statistics | `/statistics` | 통계 카드 (클릭 이동), 독서 진행 목록 | 2026-06-12 |
| Profile | `/profile` | 프로필 이미지, 통계 요약, 설정 이동 | 2026-06-12 |
| ProfileEdit | `/profile/edit` | 닉네임 수정, 프로필 이미지 업로드 | 2026-06-12 |
| Settings | `/settings` | 계정/앱설정/앱정보/로그아웃 섹션 | 2026-06-12 |

---

## Figma 디자인

[Figma 링크](https://www.figma.com/design/9fch3rnTKbER01ItbJLHhK/Bookport)

---

## 앞으로 구현할 화면

- SearchBook — 도서 외부 API 연동
- Statistics — 월별 독서 차트 (recharts 등)
- 완독 처리 흐름 — 진행률 100% 달성 시 Archive 자동 이동
