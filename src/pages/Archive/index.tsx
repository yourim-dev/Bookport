import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import bookStore from '@/stores/bookStore';
import styles from './Archive.module.scss';

const CheckIcon = () => (
  <svg className={styles.emptyIcon} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="32" cy="32" r="26" />
    <path d="M20 32l9 9 15-18" />
  </svg>
);

const ArrivalIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
);

function formatDate(dateStr?: string) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

const Archive = observer(() => {
  const navigate = useNavigate();
  const doneBooks = bookStore.doneBooks;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.heading}>완독 아카이브</h1>
        <p className={styles.subheading}>착륙한 모든 여정의 기록</p>
        {doneBooks.length > 0 && (
          <span className={styles.countChip}>{doneBooks.length}권 완독</span>
        )}
      </header>

      {doneBooks.length > 0 ? (
        <ul className={styles.list}>
          {doneBooks.map((book) => (
            <li key={book.id}>
              <article
                className={styles.card}
                onClick={() => navigate(`/books/${book.id}`)}
              >
                {/* Upper section */}
                <div className={styles.upper}>
                  <div className={styles.coverWrap}>
                    {book.cover
                      ? <img src={book.cover} alt={book.title} className={styles.cover} />
                      : <div className={styles.coverPlaceholder} />
                    }
                  </div>
                  <div className={styles.meta}>
                    <span className={styles.arrivedBadge}>
                      <ArrivalIcon />
                      ARRIVED
                    </span>
                    <p className={styles.title}>{book.title}</p>
                    <p className={styles.author}>{book.author}</p>
                    {book.publisher && <p className={styles.publisher}>{book.publisher}</p>}
                  </div>
                </div>

                {/* Divider with notches */}
                <div className={styles.divider}>
                  <div className={styles.notchLeft} />
                  <div className={styles.dashes} />
                  <div className={styles.notchRight} />
                </div>

                {/* Lower section */}
                <div className={styles.lower}>
                  <div className={styles.infoRow}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>총 페이지</span>
                      <span className={styles.infoValue}>{book.totalPages.toLocaleString()} p</span>
                    </div>
                    {book.startedAt && (
                      <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>시작일</span>
                        <span className={styles.infoValue}>{formatDate(book.startedAt)}</span>
                      </div>
                    )}
                    {book.finishedAt && (
                      <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>완독일</span>
                        <span className={styles.infoValue}>{formatDate(book.finishedAt)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.empty}>
          <CheckIcon />
          <p className={styles.emptyText}>
            아직 완독한 책이 없어요.<br />
            독서 여정을 계속해보세요!
          </p>
        </div>
      )}
    </div>
  );
});

export default Archive;
