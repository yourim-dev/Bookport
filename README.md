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
│   │   ├── EditProgress/       # 진행률 수정
│   │   ├── AddLog/             # 독서 기록 추가
│   │   ├── Login/              # 로그인
│   │   ├── Signup/             # 회원가입
│   │   ├── Onboarding/         # 온보딩 (3슬라이드)
│   │   ├── Archive/            # 완독 아카이브 (미구현)
│   │   ├── Statistics/         # 독서 통계 (미구현)
│   │   ├── SearchBook/         # 도서 검색 (미구현)
│   │   ├── ManualAdd/          # 직접 입력 (미구현)
│   │   ├── Profile/            # 프로필 (미구현)
│   │   └── Settings/           # 설정 (미구현)
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

| 화면 | 라우팅 | 설명 |
|---|---|---|
| Splash | `/splash` | 앱 진입 스플래시 |
| Onboarding | `/onboarding` | 3슬라이드 온보딩, localStorage 완료 여부 저장 |
| Login | `/login` | authStore 연결, Dashboard로 이동 |
| Signup | `/signup` | 유효성 검사, Login으로 이동 |
| Dashboard | `/` | BoardingPassCard 목록, 필터, FAB |
| BookDetail | `/books/:id` | 진행바, 최근 요약, 독서 기록 타임라인 |
| EditProgress | `/books/:id/edit-progress` | 페이지 스테퍼, 진행률 슬라이더 |
| AddLog | `/books/:id/add-log` | 독서 기록 추가 |

---

## Figma 디자인

[Figma 링크](https://www.figma.com/design/9fch3rnTKbER01ItbJLHhK/Bookport)

---

## 앞으로 구현할 화면

- SearchBook — 도서 API 연동
- ManualAdd — 직접 입력 폼
- Archive — 완독 아카이브
- Statistics — 비행 통계, 차트
- Profile / Settings
