import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import bookStore from '@/stores/bookStore';
import styles from './Statistics.module.scss';

const ChartIcon = () => (
  <svg className={styles.emptyIcon} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="32" width="12" height="24" rx="2" />
    <rect x="26" y="20" width="12" height="36" rx="2" />
    <rect x="44" y="10" width="12" height="46" rx="2" />
    <line x1="4" y1="56" x2="60" y2="56" />
  </svg>
);

const Statistics = observer(() => {
  const navigate = useNavigate();
  const { books, readingBooks, doneBooks, wishBooks } = bookStore;

  const totalPages = books.reduce((sum, b) => sum + b.currentPage, 0);
  const totalLogs  = books.reduce((sum, b) => sum + (b.logs?.length ?? 0), 0);
  const avgProgress =
    readingBooks.length > 0
      ? Math.round(
          readingBooks.reduce((sum, b) =>
            sum + (b.totalPages > 0 ? (b.currentPage / b.totalPages) * 100 : 0), 0
          ) / readingBooks.length
        )
      : 0;

  const isEmpty = books.length === 0;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.heading}>비행 통계</h1>
        <p className={styles.subheading}>나의 독서 여정 한눈에 보기</p>
      </header>

      {isEmpty ? (
        <div className={styles.empty}>
          <ChartIcon />
          <p className={styles.emptyText}>
            아직 통계 데이터가 없어요.<br />
            책을 추가해 독서를 시작해보세요!
          </p>
        </div>
      ) : (
        <>
          {/* ── Summary Grid ──────────────────────────────── */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>전체 현황</h2>
            <div className={styles.statGrid}>
              <div
                className={`${styles.statCard} ${styles.clickable}`}
                onClick={() => navigate('/books/search')}
                role="button" tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && navigate('/books/search')}
              >
                <span className={styles.statValue}>{books.length}</span>
                <span className={styles.statLabel}>전체 책</span>
              </div>
              <div
                className={`${styles.statCard} ${styles.accent} ${styles.clickable}`}
                onClick={() => navigate('/archive')}
                role="button" tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && navigate('/archive')}
              >
                <span className={styles.statValue}>{doneBooks.length}</span>
                <span className={styles.statLabel}>완독 (착륙)</span>
              </div>
              <div
                className={`${styles.statCard} ${styles.clickable}`}
                onClick={() => navigate('/')}
                role="button" tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
              >
                <span className={styles.statValue}>{readingBooks.length}</span>
                <span className={styles.statLabel}>읽는 중 (비행)</span>
              </div>
              <div
                className={`${styles.statCard} ${styles.clickable}`}
                onClick={() => navigate('/')}
                role="button" tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
              >
                <span className={styles.statValue}>{wishBooks.length}</span>
                <span className={styles.statLabel}>읽기 전 (대기)</span>
              </div>
            </div>
          </section>

          {/* ── Reading Detail ────────────────────────────── */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>독서 기록</h2>
            <div className={styles.detailList}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>총 읽은 페이지</span>
                <span className={styles.detailValue}>{totalPages.toLocaleString()} p</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>독서 기록 수</span>
                <span className={styles.detailValue}>{totalLogs}회</span>
              </div>
              {readingBooks.length > 0 && (
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>읽는 중 평균 진행률</span>
                  <span className={styles.detailValue}>{avgProgress}%</span>
                </div>
              )}
            </div>
          </section>

          {/* ── In-Progress List ──────────────────────────── */}
          {readingBooks.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>진행 중인 비행</h2>
              <div className={styles.progressList}>
                {readingBooks.map((book) => {
                  const pct = book.totalPages > 0
                    ? Math.round((book.currentPage / book.totalPages) * 100)
                    : 0;
                  return (
                    <div key={book.id} className={styles.progressItem}>
                      <div className={styles.progressHeader}>
                        <span className={styles.progressTitle}>{book.title}</span>
                        <span className={styles.progressPct}>{pct}%</span>
                      </div>
                      <div className={styles.trackBar}>
                        <div className={styles.trackFill} style={{ width: `${pct}%` }} />
                      </div>
                      <div className={styles.progressMeta}>
                        <span>{book.currentPage.toLocaleString()} / {book.totalPages.toLocaleString()} p</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
});

export default Statistics;
