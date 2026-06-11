import { useNavigate, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import authStore from '@/stores/authStore';
import styles from './TopAppBar.module.scss';

interface TopAppBarProps {
  title?: string;
  showBack?: boolean;
  actions?: React.ReactNode;
}

const LogoIcon = () => (
  <svg className={styles.logoIcon} viewBox="0 0 34 34" fill="none" aria-hidden="true">
    <rect width="34" height="34" rx="8" fill="currentColor" fillOpacity="0.1" />
    <path
      d="M9 8h10a5 5 0 0 1 0 10H9V8z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M9 18h11a5 5 0 0 1 0 10H9V18z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const TopAppBar = observer(({ title, showBack = false, actions }: TopAppBarProps) => {
  const navigate = useNavigate();
  const profileDest = authStore.isLoggedIn ? '/profile' : '/login';

  return (
    <header className={styles.topAppBar}>
      {showBack ? (
        <button className={styles.backBtn} onClick={() => navigate(-1)} aria-label="뒤로가기">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      ) : (
        <Link to="/" className={styles.brand}>
          <LogoIcon />
          <span className={styles.wordmark}>Bookport</span>
        </Link>
      )}

      {showBack && title && (
        <span className={styles.pageTitle}>{title}</span>
      )}

      <div className={styles.actions}>
        {actions ?? (
          !showBack && (
            <Link to={profileDest} className={styles.profileBtn}>
              프로필
            </Link>
          )
        )}
      </div>
    </header>
  );
});

export default TopAppBar;
