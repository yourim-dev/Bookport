import { useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import bookStore from '@/stores/bookStore';
import type { Book } from '@/stores/bookStore';
import type { BookResult } from '@/pages/SearchBook';
import styles from './ManualAdd.module.scss';

interface LocationState {
  book?: BookResult;
}

const STATUS_OPTIONS: { value: Book['status']; label: string }[] = [
  { value: 'reading', label: '읽는 중' },
  { value: 'wish',    label: '읽고 싶어요' },
  { value: 'done',    label: '완독' },
];

const ManualAdd = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { state } = useLocation() as { state: LocationState | null };

  const mode = searchParams.get('mode') ?? 'manual';
  const isSearchMode = mode === 'search' && !!state?.book;
  const prefilled = state?.book;

  const [title, setTitle]           = useState(prefilled?.title ?? '');
  const [author, setAuthor]         = useState(prefilled?.author ?? '');
  const [totalPages, setTotalPages] = useState(
    prefilled?.totalPages ? String(prefilled.totalPages) : ''
  );
  const [currentPage, setCurrentPage] = useState('0');
  const [startedAt, setStartedAt]     = useState(
    new Date().toISOString().split('T')[0]
  );
  const [status, setStatus] = useState<Book['status']>('reading');

  const total = Number(totalPages);
  const current = Math.min(Number(currentPage) || 0, total || Infinity);
  const isValid = title.trim() && author.trim() && total > 0;

  const handleSave = () => {
    if (!isValid) return;
    bookStore.addBook({
      id:          Date.now().toString(),
      title:       title.trim(),
      author:      author.trim(),
      cover:       prefilled?.cover,
      totalPages:  total,
      currentPage: current,
      status,
      startedAt:   startedAt || undefined,
      lastReadAt:  new Date().toISOString(),
    });
    navigate('/', { replace: true });
  };

  return (
    <div className={styles.page}>

      {/* ── 책 정보 카드 (검색 모드) ────────────────────── */}
      {isSearchMode && prefilled && (
        <section className={styles.previewCard}>
          <div className={styles.coverBox}>
            {prefilled.cover
              ? <img src={prefilled.cover} alt={prefilled.title} className={styles.coverImg} />
              : <div className={styles.coverPlaceholder} />
            }
          </div>
          <div className={styles.previewInfo}>
            <p className={styles.previewTitle}>{prefilled.title}</p>
            <p className={styles.previewAuthor}>{prefilled.author}</p>
            {prefilled.publisher && (
              <p className={styles.previewPublisher}>{prefilled.publisher}</p>
            )}
            {prefilled.totalPages && (
              <p className={styles.previewPages}>{prefilled.totalPages} 페이지</p>
            )}
          </div>
        </section>
      )}

      {/* ── 입력 폼 ──────────────────────────────────────── */}
      <section className={styles.formCard}>
        <div className={styles.accentBar} />
        <div className={styles.formInner}>

          {/* 직접 입력 모드 전용 필드 */}
          {!isSearchMode && (
            <>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="title">제목 *</label>
                <input
                  id="title"
                  type="text"
                  className={styles.input}
                  placeholder="책 제목을 입력하세요"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="author">저자 *</label>
                <input
                  id="author"
                  type="text"
                  className={styles.input}
                  placeholder="저자명을 입력하세요"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="totalPages">전체 페이지 *</label>
                <input
                  id="totalPages"
                  type="number"
                  inputMode="numeric"
                  className={styles.input}
                  placeholder="0"
                  min={1}
                  value={totalPages}
                  onChange={(e) => setTotalPages(e.target.value)}
                />
              </div>
            </>
          )}

          {/* 공통 필드 */}
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="currentPage">현재 페이지</label>
            <input
              id="currentPage"
              type="number"
              inputMode="numeric"
              className={styles.input}
              placeholder="0"
              min={0}
              max={total || undefined}
              value={currentPage}
              onChange={(e) => setCurrentPage(e.target.value)}
            />
            {total > 0 && (
              <span className={styles.hint}>전체 {total} 페이지 중</span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="startedAt">시작일</label>
            <input
              id="startedAt"
              type="date"
              className={styles.input}
              value={startedAt}
              onChange={(e) => setStartedAt(e.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>상태</label>
            <div className={styles.statusRow}>
              {STATUS_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  className={`${styles.statusBtn} ${status === value ? styles.active : ''}`}
                  onClick={() => setStatus(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── 저장 버튼 ─────────────────────────────────────── */}
      <button
        className={styles.saveBtn}
        onClick={handleSave}
        disabled={!isValid}
      >
        저장하기
      </button>
    </div>
  );
};

export default ManualAdd;
