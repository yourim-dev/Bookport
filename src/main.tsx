import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import authStore from './stores/authStore';
import bookStore from './stores/bookStore';
import { ONBOARDING_KEY } from './constants/onboarding';
import './styles/global.scss';

// ─── DEV SEED (삭제 예정) ──────────────────────────────────────
if (import.meta.env.DEV) {
  localStorage.setItem(ONBOARDING_KEY, 'true');
  authStore.login('dev@bookport.com', 'Dev User');
  if (bookStore.books.length === 0) {
    bookStore.addBook({
      id: '1',
      title: '생각의 지도',
      author: '리처드 니스벳',
      totalPages: 288,
      currentPage: 184,
      status: 'reading',
      startedAt: '2023-10-12T00:00:00.000Z',
      lastReadAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      lastSummary:
        '동양과 서양의 사고방식 차이를 비교하며, 환경이 어떻게 인지 과정에 영향을 미치는지 흥미롭게 설명하고 있다. 특히 고대 그리스와 중국의 철학적 배경이 현대까지 이어지는 부분이 인상적이다.',
      logs: [
        {
          id: 'log-3',
          date: '2023-10-24T00:00:00.000Z',
          fromPage: 145,
          toPage: 184,
          note: '서양의 분석적 사고와 동양의 종합적 사고에 대한 구체적인 실험 결과들이 제시되었다. 세상을 바라보는 렌즈 자체가 다르다는 점이 놀랍다.',
        },
        {
          id: 'log-2',
          date: '2023-10-20T00:00:00.000Z',
          fromPage: 90,
          toPage: 144,
          note: '사회 구조가 인지 과정에 미치는 영향. 독립성과 상호의존성에 대한 논의.',
        },
        {
          id: 'log-1',
          date: '2023-10-12T00:00:00.000Z',
          fromPage: 1,
          toPage: 89,
          note: '독서 여정 시작. 도입부가 흥미로움.',
        },
      ],
    });
  }
}
// ─── DEV SEED END ─────────────────────────────────────────────

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
