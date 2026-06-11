import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import bookStore from '@/stores/bookStore';
import styles from './EditProgress.module.scss';

const BookmarkIcon = () => (
  <svg viewBox="0 0 10 13" fill="currentColor" aria-hidden="true">
    <path d="M0 0h10v13L5 10 0 13V0z" />
  </svg>
);

const AirplaneIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="11" x2="12" y2="17" />
    <circle cx="12" cy="7.5" r="0.75" fill="currentColor" stroke="none" />
  </svg>
);

const EditProgress = observer(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const book = bookStore.findById(id ?? '');
  const [currentPage, setCurrentPage] = useState(book?.currentPage ?? 0);

  if (!book) {
    return (
      <div className={styles.notFound}>
        <p>책을 찾을 수 없어요.</p>
        <button onClick={() => navigate(-1)}>돌아가기</button>
      </div>
    );
  }

  const totalPages = book.totalPages;
  const progress = totalPages > 0 ? Math.min(100, (currentPage / totalPages) * 100) : 0;
  const clampedPct = Math.max(2, Math.min(96, progress));

  const handlePageChange = (val: number) => {
    setCurrentPage(Math.max(0, Math.min(val, totalPages)));
  };

  const handleSave = () => {
    bookStore.updateProgress(id!, currentPage);
    navigate(`/books/${id}`, { replace: true });
  };

  return (
    <div className={styles.page}>

      {/* ── Summary Card ─────────────────────────────────── */}
      <section className={styles.summaryCard}>
        <div className={styles.coverBox}>
          {book.cover
            ? <img src={book.cover} alt={book.title} className={styles.cover} />
            : <div className={styles.coverPlaceholder} />}
        </div>
        <div className={styles.bookInfo}>
          <p className={styles.bookTitle}>{book.title}</p>
          <p className={styles.bookAuthor}>{book.author}</p>
          <div className={styles.progressInfo}>
            <BookmarkIcon />
            <span>
              현재 진행 상황:&nbsp;
              <strong>{currentPage} / {totalPages} 페이지</strong>
            </span>
          </div>
        </div>
      </section>

      {/* ── Input Card ───────────────────────────────────── */}
      <section className={styles.inputCard}>
        <div className={styles.cardAccentBar} />
        <div className={styles.cardInner}>
          <h2 className={styles.cardTitle}>현재 위치 업데이트</h2>

          <div className={styles.pageInputRow}>
            <div className={styles.pageField}>
              <span className={styles.fieldLabelBold}>현재 페이지 (Seat)</span>
              <input
                className={styles.pageInput}
                type="number"
                value={currentPage}
                min={0}
                max={totalPages}
                onChange={(e) => handlePageChange(Number(e.target.value))}
              />
            </div>
            <span className={styles.pageSep}>/</span>
            <div className={styles.pageField}>
              <span className={styles.fieldLabel}>전체 페이지</span>
              <input
                className={`${styles.pageInput} ${styles.pageInputDisabled}`}
                type="number"
                value={totalPages}
                disabled
                readOnly
              />
            </div>
          </div>

          <div className={styles.achieveSection}>
            <div className={styles.achieveDivider} />
            <div className={styles.achieveRow}>
              <span className={styles.achieveLabel}>달성률</span>
              <span className={styles.achievePct}>{progress.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Progress Preview ──────────────────────────────── */}
      <section className={styles.progressCard}>
        <p className={styles.progressCardLabel}>진행률 미리보기</p>
        <div className={styles.flightRoute}>
          <div className={styles.flightOrigin} />
          <div className={styles.flightTrackBg} />
          <div className={styles.flightFill} style={{ width: `${clampedPct}%` }} />
          <div className={styles.planeMarker} style={{ left: `${clampedPct}%` }}>
            <AirplaneIcon />
          </div>
          <div className={styles.flightDest} />
        </div>
        <div className={styles.routeLabels}>
          <span>출발</span>
          <span>도착</span>
        </div>
      </section>

      {/* ── Helper Text ───────────────────────────────────── */}
      <div className={styles.helperText}>
        <span className={styles.helperIcon}><InfoIcon /></span>
        <p>현재 위치를 수정하면 진행률이 자동으로 계산돼요.</p>
      </div>

      {/* ── Save ─────────────────────────────────────────── */}
      <button className={styles.saveBtn} onClick={handleSave}>
        수정 완료
      </button>
    </div>
  );
});

export default EditProgress;
