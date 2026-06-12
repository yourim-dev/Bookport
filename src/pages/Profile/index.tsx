import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import authStore from '@/stores/authStore';
import bookStore from '@/stores/bookStore';
import styles from './Profile.module.scss';

const Profile = observer(() => {
  const navigate = useNavigate();
  const { nickname, userId, profileImage } = authStore;
  const { books, readingBooks, doneBooks } = bookStore;

  const totalPages = books.reduce((sum, b) => sum + b.currentPage, 0);
  const initial = nickname ? nickname[0].toUpperCase() : '?';

  return (
    <div className={styles.page}>

      {/* ── Avatar Section ───────────────────────────────── */}
      <section className={styles.avatarSection}>
        <div className={styles.avatar}>
          {profileImage
            ? <img src={profileImage} alt="프로필" className={styles.avatarImg} />
            : <span className={styles.avatarInitial}>{initial}</span>
          }
        </div>
        <h1 className={styles.nickname}>{nickname ?? '여행자'}</h1>
        {userId && <p className={styles.userId}>{userId}</p>}
        <button
          className={styles.editBtn}
          onClick={() => navigate('/profile/edit')}
        >
          프로필 수정
        </button>
      </section>

      {/* ── Stats Row ────────────────────────────────────── */}
      <section className={styles.statsRow}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{readingBooks.length}</span>
          <span className={styles.statLabel}>비행 중</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statValue}>{doneBooks.length}</span>
          <span className={styles.statLabel}>완독</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statValue}>{totalPages.toLocaleString()}</span>
          <span className={styles.statLabel}>읽은 페이지</span>
        </div>
      </section>

      {/* ── Info List ────────────────────────────────────── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>계정 정보</h2>
        <div className={styles.infoList}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>닉네임</span>
            <span className={styles.infoValue}>{nickname ?? '-'}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>아이디</span>
            <span className={styles.infoValue}>{userId ?? '-'}</span>
          </div>
        </div>
      </section>

      {/* ── Go to Settings ───────────────────────────────── */}
      <section className={styles.section}>
        <button
          className={styles.settingsBtn}
          onClick={() => navigate('/settings')}
        >
          <span>설정으로 이동</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </section>

    </div>
  );
});

export default Profile;
