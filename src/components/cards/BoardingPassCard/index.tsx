import { useNavigate } from 'react-router-dom';
import type { Book } from '@/stores/bookStore';
import styles from './BoardingPassCard.module.scss';

interface Props {
  book: Book;
}

function daysSince(dateStr?: string): number {
  if (!dateStr) return Infinity;
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
}

function lastReadLabel(dateStr?: string): string {
  const days = daysSince(dateStr);
  if (days === Infinity) return '아직 읽지 않음';
  if (days === 0) return '오늘';
  if (days === 1) return '1일 전';
  return `${days}일 전`;
}

const PlaneIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const BoardingPassCard = ({ book }: Props) => {
  const navigate = useNavigate();
  const progress = book.totalPages > 0 ? Math.round((book.currentPage / book.totalPages) * 100) : 0;
  const days = daysSince(book.lastReadAt);
  const isDelayed = days > 7;
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <article
      className={styles.card}
      onClick={() => navigate(`/books/${book.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <div className={styles.upper}>
        <div className={styles.coverWrap}>
          {book.cover ? (
            <img src={book.cover} alt={book.title} className={styles.cover} />
          ) : (
            <div className={styles.coverPlaceholder} />
          )}
        </div>
        <div className={styles.meta}>
          <div className={styles.titleRow}>
            <span className={styles.title}>{book.title}</span>
            <span className={`${styles.badge} ${isDelayed ? styles.delayed : styles.onTime}`}>
              {isDelayed ? 'DELAYED' : 'ON TIME'}
            </span>
          </div>
          <span className={styles.author}>{book.author}</span>
          <span className={styles.lastRead}>마지막 독서: {lastReadLabel(book.lastReadAt)}</span>
        </div>
      </div>

      <div className={styles.divider}>
        <div className={styles.notchLeft} />
        <div className={styles.notchRight} />
      </div>

      <div className={styles.lower}>
        <div className={styles.trackSection}>
          <div
            className={styles.planeWrap}
            style={{ left: `${clampedProgress}%` }}
          >
            <PlaneIcon />
          </div>
          <div className={styles.track}>
            <div className={styles.fill} style={{ width: `${clampedProgress}%` }} />
          </div>
        </div>
        <span className={styles.percent}>{progress}%</span>
        <button
          className={styles.arrowBtn}
          aria-label="진행률 수정"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </article>
  );
};

export default BoardingPassCard;
