import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import bookStore from '@/stores/bookStore';
import type { Book } from '@/stores/bookStore';
import styles from './BookDetail.module.scss';

// ─── Helpers ──────────────────────────────────────────────────
const fmtDate = (iso?: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
};

const fmtLastRead = (iso?: string) => {
  if (!iso) return '아직 읽지 않음';
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days === 0) return '오늘';
  if (days === 1) return '1일 전';
  return `${days}일 전`;
};

const STATUS_LABEL: Record<Book['status'], string> = {
  reading: '읽는 중',
  done: '완독',
  wish: '읽고 싶음',
};

// ─── Icons ────────────────────────────────────────────────────
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const PlaneIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
);

const PencilIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const BookmarkIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const LogIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────
const BookDetail = observer(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const book = bookStore.findById(id ?? '');

  if (!book) {
    return (
      <div className={styles.notFound}>
        <p>책을 찾을 수 없어요.</p>
        <button onClick={() => navigate(-1)}>돌아가기</button>
      </div>
    );
  }

  const progress = book.totalPages > 0
    ? Math.min(100, Math.round((book.currentPage / book.totalPages) * 100))
    : 0;

  return (
    <div className={styles.page}>

      {/* ── Section 1: Journey Pass ──────────────────────── */}
      <section className={styles.journeyPass}>
        <div className={styles.passTop}>
          <div className={styles.coverBox}>
            {book.cover
              ? <img src={book.cover} alt={book.title} className={styles.cover} />
              : <div className={styles.coverPlaceholder} />
            }
          </div>

          <div className={styles.passInfo}>
            <span className={styles.statusBadge}>{STATUS_LABEL[book.status]}</span>
            <h1 className={styles.bookTitle}>{book.title}</h1>
            <p className={styles.bookAuthor}>{book.author}</p>
            <div className={styles.lastReadRow}>
              <ClockIcon />
              <span>마지막 읽음: {fmtLastRead(book.lastReadAt)}</span>
            </div>
          </div>
        </div>

        <div className={styles.passBottom}>
          <div className={styles.passField}>
            <span className={styles.fieldLabel}>ORIGIN</span>
            <span className={styles.fieldValue}>{fmtDate(book.startedAt)}</span>
          </div>
          <div className={`${styles.passField} ${styles.right}`}>
            <span className={styles.fieldLabel}>DESTINATION</span>
            <span className={styles.fieldValue}>
              {book.finishedAt ? fmtDate(book.finishedAt) : '목표 없음'}
            </span>
          </div>
        </div>
      </section>

      {/* ── Section 2: Progress ──────────────────────────── */}
      <section className={styles.progressCard}>
        <div className={styles.progressHeader}>
          <h2 className={styles.progressTitle}>독서 진행률</h2>
          <div className={styles.progressNums}>
            <span className={styles.progressPct}>{progress}%</span>
            <span className={styles.progressPages}>
              p.{book.currentPage} / {book.totalPages}
            </span>
          </div>
        </div>

        {/* Flight route bar */}
        <div className={styles.flightBar}>
          <div className={styles.flightTrack}>
            <div className={styles.flightFill} style={{ width: `${progress}%` }} />
          </div>
          <div
            className={styles.flightAnchor}
            style={{ left: `${Math.max(2, Math.min(98, progress))}%` }}
          >
            <div className={styles.planeCircle}><PlaneIcon /></div>
            <div className={styles.redDot} />
          </div>
        </div>
        <div className={styles.routeLabels}>
          <span className={styles.routeLabel}>출발</span>
          <span className={styles.routeLabel}>도착</span>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.btnPrimary}
            onClick={() => navigate(`/books/${id}/edit-progress`)}
          >
            <PencilIcon />
            진행률 수정
          </button>
          <button
            className={styles.btnSecondary}
            onClick={() => navigate(`/books/${id}/add-log`)}
          >
            <PlusIcon />
            독서 기록 추가
          </button>
        </div>
      </section>

      {/* ── Section 3: Recent Summary ─────────────────────── */}
      <section className={styles.summaryCard}>
        <div className={styles.summaryDeco} />
        <div className={styles.summaryHeader}>
          <BookmarkIcon />
          <h2 className={styles.summaryTitle}>최근 요약</h2>
        </div>
        {book.lastSummary ? (
          <p className={styles.summaryText}>{book.lastSummary}</p>
        ) : (
          <p className={styles.summaryEmpty}>아직 요약이 없어요. 독서 기록을 추가해보세요.</p>
        )}
      </section>

      {/* ── Section 4: Flight Log Timeline ───────────────── */}
      <section className={styles.logCard}>
        <div className={styles.logHeader}>
          <LogIcon />
          <h2 className={styles.logTitle}>독서 기록</h2>
        </div>

        {book.logs && book.logs.length > 0 ? (
          <div className={styles.logList}>
            {book.logs.map((log) => (
              <div key={log.id} className={styles.logItem}>
                <div className={styles.logMeta}>
                  <span className={styles.logDate}>{fmtDate(log.date)}</span>
                  <span className={styles.logPageRange}>
                    p.{log.fromPage} ~ {log.toPage}
                  </span>
                </div>
                <div className={styles.logNote}>{log.note}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.logEmpty}>
            <span>아직 독서 기록이 없어요</span>
            <button
              className={styles.logEmptyBtn}
              onClick={() => navigate(`/books/${id}/add-log`)}
            >
              + 독서 기록 추가
            </button>
          </div>
        )}
      </section>
    </div>
  );
});

export default BookDetail;
