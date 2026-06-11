import { useState, useRef } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import bookStore from '@/stores/bookStore';
import type { Book } from '@/stores/bookStore';
import type { BookResult } from '@/pages/SearchBook';
import styles from './ManualAdd.module.scss';

interface LocationState {
  book?: BookResult;
}

const STATUS_OPTIONS: { value: Book['status']; label: string }[] = [
  { value: 'wish',    label: '탑승 대기 (읽기 전)' },
  { value: 'reading', label: '비행 중 (읽는 중)' },
  { value: 'done',    label: '착륙 완료 (완독)' },
];

// ─── Icons ────────────────────────────────────────────────────
const UploadImageIcon = () => (
  <svg width="27" height="27" viewBox="0 0 27 27" fill="none" stroke="#44474c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="21" height="17" rx="2" />
    <circle cx="9" cy="11" r="2" />
    <polyline points="3 19 8 14 12 18 17 13 24 19" />
    <line x1="17" y1="5" x2="17" y2="1" />
    <line x1="21" y1="3" x2="13" y2="3" />
  </svg>
);

const AirplaneIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#44474c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ─── Search Mode (simplified) ─────────────────────────────────
const SearchModeForm = ({
  prefilled,
  onSave,
}: {
  prefilled: BookResult;
  onSave: (data: { currentPage: string; startedAt: string; status: Book['status'] }) => void;
}) => {
  const [currentPage, setCurrentPage] = useState('0');
  const [startedAt, setStartedAt]     = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus]           = useState<Book['status']>('reading');

  return (
    <div className={styles.page}>
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
          {prefilled.publisher && <p className={styles.previewPublisher}>{prefilled.publisher}</p>}
          {prefilled.totalPages && <p className={styles.previewPages}>{prefilled.totalPages} 페이지</p>}
        </div>
      </section>

      <section className={styles.simpleFormCard}>
        <div className={styles.accentBar} />
        <div className={styles.simpleFormInner}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="s-currentPage">현재 읽은 페이지</label>
            <input
              id="s-currentPage" type="number" inputMode="numeric"
              className={styles.fieldInput} placeholder="0" min={0}
              value={currentPage} onChange={(e) => setCurrentPage(e.target.value)}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="s-startedAt">독서 시작일</label>
            <input
              id="s-startedAt" type="date"
              className={styles.fieldInput}
              value={startedAt} onChange={(e) => setStartedAt(e.target.value)}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>상태</label>
            <div className={styles.selectWrap}>
              <select
                className={styles.fieldSelect}
                value={status}
                onChange={(e) => setStatus(e.target.value as Book['status'])}
              >
                {STATUS_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <ChevronDownIcon />
            </div>
          </div>
        </div>
      </section>

      <button
        className={styles.submitBtnOutside}
        onClick={() => onSave({ currentPage, startedAt, status })}
      >
        저장하기
      </button>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────
const ManualAdd = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { state } = useLocation() as { state: LocationState | null };

  const mode = searchParams.get('mode') ?? 'manual';
  const isSearchMode = mode === 'search' && !!state?.book;
  const prefilled = state?.book;

  // Cover upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [coverPreview, setCoverPreview] = useState<string | undefined>(undefined);

  // Book info
  const [title, setTitle]             = useState('');
  const [author, setAuthor]           = useState('');
  const [publisher, setPublisher]     = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [isbn, setIsbn]               = useState('');

  // Reading progress
  const [totalPages, setTotalPages]   = useState('');
  const [currentPage, setCurrentPage] = useState('0');
  const [startedAt, setStartedAt]     = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus]           = useState<Book['status']>('wish');

  const total    = Number(totalPages) || 0;
  const current  = Math.min(Number(currentPage) || 0, total || Infinity);
  const progress = total > 0 ? (current / total) * 100 : 0;
  const isValid  = title.trim() && author.trim() && total > 0;

  const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setCoverPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSaveManual = () => {
    if (!isValid) return;
    bookStore.addBook({
      id:          Date.now().toString(),
      title:       title.trim(),
      author:      author.trim(),
      publisher:   publisher.trim() || undefined,
      publishYear: publishYear.trim() || undefined,
      isbn:        isbn.trim() || undefined,
      cover:       coverPreview,
      totalPages:  total,
      currentPage: current,
      status,
      startedAt:   startedAt || undefined,
      lastReadAt:  new Date().toISOString(),
    });
    navigate('/', { replace: true });
  };

  const handleSaveSearch = ({ currentPage: cp, startedAt: sa, status: st }: {
    currentPage: string; startedAt: string; status: Book['status'];
  }) => {
    if (!prefilled) return;
    const tot = prefilled.totalPages ?? 0;
    bookStore.addBook({
      id:          Date.now().toString(),
      title:       prefilled.title,
      author:      prefilled.author,
      publisher:   prefilled.publisher,
      cover:       prefilled.cover,
      totalPages:  tot,
      currentPage: Math.min(Number(cp) || 0, tot),
      status:      st,
      startedAt:   sa || undefined,
      lastReadAt:  new Date().toISOString(),
    });
    navigate('/', { replace: true });
  };

  // ── Search mode ──────────────────────────────────────────────
  if (isSearchMode && prefilled) {
    return <SearchModeForm prefilled={prefilled} onSave={handleSaveSearch} />;
  }

  // ── Manual mode (Figma v3) ───────────────────────────────────
  return (
    <div className={styles.page}>

      {/* ── Page Header ─────────────────────────────────── */}
      <section className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>책 직접 추가</h1>
        <p className={styles.pageSubtitle}>새로운 여정을 등록합니다.</p>
      </section>

      {/* ── Form Card ───────────────────────────────────── */}
      <div className={styles.formCard}>

        {/* Cover Upload */}
        <div
          className={styles.coverUpload}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
          aria-label="표지 이미지 업로드"
        >
          {coverPreview ? (
            <img src={coverPreview} alt="표지 미리보기" className={styles.coverImg} />
          ) : (
            <div className={styles.coverUploadInner}>
              <UploadImageIcon />
              <span className={styles.coverUploadLabel}>표지 추가</span>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleCoverSelect}
            style={{ display: 'none' }}
          />
        </div>

        {/* ── Perforation 1 ──────────────────────────────── */}
        <div className={styles.perforationWrap}>
          <div className={styles.perforation} />
        </div>

        {/* ── Book Info Fields ────────────────────────────── */}
        <div className={styles.fieldSection}>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="title">책 제목 *</label>
            <input
              id="title" type="text" className={styles.fieldInput}
              placeholder="도착지를 입력하세요"
              value={title} onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="author">저자 *</label>
            <input
              id="author" type="text" className={styles.fieldInput}
              placeholder="기장 이름을 입력하세요"
              value={author} onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="publisher">출판사</label>
            <input
              id="publisher" type="text" className={styles.fieldInput}
              placeholder="항공사 이름을 입력하세요"
              value={publisher} onChange={(e) => setPublisher(e.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="publishYear">출간연도</label>
            <input
              id="publishYear" type="text" inputMode="numeric" className={styles.fieldInput}
              placeholder="YYYY"
              maxLength={4}
              value={publishYear} onChange={(e) => setPublishYear(e.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="isbn">ISBN</label>
            <input
              id="isbn" type="text" inputMode="numeric" className={styles.fieldInput}
              placeholder="978-0-000-00000-0"
              value={isbn} onChange={(e) => setIsbn(e.target.value)}
            />
          </div>

        </div>

        {/* ── Perforation 2 ──────────────────────────────── */}
        <div className={styles.perforationWrap}>
          <div className={styles.perforation} />
        </div>

        {/* ── Reading Progress Fields ─────────────────────── */}
        <div className={styles.fieldSection}>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="totalPages">전체 페이지 수 *</label>
            <input
              id="totalPages" type="number" inputMode="numeric" className={styles.fieldInput}
              placeholder="총 비행 거리"
              min={1}
              value={totalPages} onChange={(e) => setTotalPages(e.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="currentPage">현재 읽은 페이지</label>
            <input
              id="currentPage" type="number" inputMode="numeric" className={styles.fieldInput}
              placeholder="현재 위치 (선택)"
              min={0} max={total || undefined}
              value={currentPage} onChange={(e) => setCurrentPage(e.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="startedAt">독서 시작일</label>
            <input
              id="startedAt" type="date" className={styles.fieldInput}
              value={startedAt} onChange={(e) => setStartedAt(e.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="status">상태</label>
            <div className={styles.selectWrap}>
              <select
                id="status"
                className={styles.fieldSelect}
                value={status}
                onChange={(e) => setStatus(e.target.value as Book['status'])}
              >
                {STATUS_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <span className={styles.selectChevron}><ChevronDownIcon /></span>
            </div>
          </div>

        </div>

        {/* ── Progress Preview ────────────────────────────── */}
        <div className={styles.progressPreview}>
          <p className={styles.progressPreviewLabel}>진행률 미리보기</p>

          <div className={styles.flightTrackWrap}>
            <div className={styles.trackLine} />
            <div
              className={styles.airplaneMarker}
              style={{ left: `clamp(0px, calc(${progress}% - 12px), calc(100% - 24px))` }}
            >
              <AirplaneIcon />
            </div>
          </div>

          <div className={styles.trackEndLabels}>
            <span>0% (출발)</span>
            <span>100% (도착)</span>
          </div>
        </div>

        {/* ── Submit ──────────────────────────────────────── */}
        <div className={styles.submitWrap}>
          <button
            className={styles.submitBtn}
            onClick={handleSaveManual}
            disabled={!isValid}
          >
            등록하기
          </button>
        </div>

      </div>
    </div>
  );
};

export default ManualAdd;
