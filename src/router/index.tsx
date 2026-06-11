import { createBrowserRouter, Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import authStore from '../stores/authStore';
import bookStore from '../stores/bookStore';
import { ONBOARDING_KEY } from '../constants/onboarding';
import TopAppBar from '../components/layout/TopAppBar';
import BottomNavBar from '../components/layout/BottomNavBar';
import Dashboard from '../pages/Dashboard';
import Archive from '../pages/Archive';
import BookDetail from '../pages/BookDetail';
import SearchBook from '../pages/SearchBook';
import ManualAdd from '../pages/ManualAdd';
import EditProgress from '../pages/EditProgress';
import AddLog from '../pages/AddLog';
import Statistics from '../pages/Statistics';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Onboarding from '../pages/Onboarding';

// ─── Layouts ──────────────────────────────────────────────────
const MainLayout = () => (
  <>
    <TopAppBar />
    <Outlet />
    <BottomNavBar />
  </>
);

const DETAIL_TITLES: Record<string, string> = {
  'edit-progress': '진행률 수정',
  'add-log': '독서 기록 추가',
  'search': '도서 검색',
  'add': '책 추가',
};

// TopAppBar(뒤로가기 + 경로 기반 타이틀) + 본문, BottomNavBar 없음
const DetailLayout = observer(() => {
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const segment = pathname.split('/').at(-1) ?? '';

  let title: string | undefined;
  if (segment === id && id) {
    title = bookStore.findById(id)?.title;
  } else {
    title = DETAIL_TITLES[segment];
  }

  return (
    <>
      <TopAppBar showBack title={title} />
      <Outlet />
    </>
  );
});

// ─── PrivateRoute ─────────────────────────────────────────────
const PrivateRoute = observer(() => {
  if (!localStorage.getItem(ONBOARDING_KEY)) {
    return <Navigate to="/onboarding" replace />;
  }
  if (!authStore.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
});

// ─── Router ───────────────────────────────────────────────────
const router = createBrowserRouter([
  { path: '/onboarding', element: <Onboarding /> },
  { path: '/login',      element: <Login /> },
  { path: '/signup',     element: <Signup /> },

  {
    element: <PrivateRoute />,
    children: [
      // 메인 탭 (TopAppBar + BottomNavBar)
      {
        element: <MainLayout />,
        children: [
          { path: '/',             element: <Dashboard /> },
          { path: '/archive',      element: <Archive /> },
          { path: '/statistics',   element: <Statistics /> },
          { path: '/profile',      element: <Profile /> },
          { path: '/settings',     element: <Settings /> },
        ],
      },
      // 상세 화면 (TopAppBar 뒤로가기만)
      {
        element: <DetailLayout />,
        children: [
          { path: '/books/search',             element: <SearchBook /> },
          { path: '/books/add',                element: <ManualAdd /> },
          { path: '/books/:id',                element: <BookDetail /> },
          { path: '/books/:id/edit-progress',  element: <EditProgress /> },
          { path: '/books/:id/add-log',        element: <AddLog /> },
        ],
      },
    ],
  },

  { path: '*', element: <Navigate to="/" replace /> },
]);

export default router;
