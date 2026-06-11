import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import bookStore from '@/stores/bookStore';
import styles from './AddLog.module.scss';

const BookmarkIcon = () => (
  <svg viewBox="0 0 10 13" fill="currentColor" aria-hidden="true">
    <path d="M0 0h10v13L5 10 0 13V0z" />
  </svg>
);

const AddLog = observer(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const book = bookStore.findById(id ?? '');

  const [summary, setSummary] = useState('');
  const [impressiveSentence, setImpressiveSentence] = useState('');
  const [nextPoint, setNextPoint] = useState('');

  if (!book) {
    return (
      <div className={styles.notFound}>
        <p>책을 찾을 수 없어요.</p>
        <button onClick={() => navigate(-1)}>돌아가기</button>
      </div>
    );
  }

  const totalPages = book.totalPages;

  const handleSave = () => {
    if (!id) return;

    const note = [summary, impressiveSentence, nextPoint].filter(Boolean).join('\n\n');

    bookStore.addLog(id, {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      fromPage: book.currentPage,
      toPage: book.currentPage,
      note: note || '-',
    });

    if (summary) bookStore.updateBook(id, { lastSummary: summary });

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
              <strong>{book.currentPage} / {totalPages} 페이지</strong>
            </span>
          </div>
        </div>
      </section>

      {/* ── Input Card ───────────────────────────────────── */}
      <section className={styles.inputCard}>
        <div className={styles.cardAccentBar} />
        <div className={styles.cardInner}>
          <h2 className={styles.cardTitle}>현재 위치 업데이트</h2>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>짧은 요약</label>
            <textarea
              className={styles.textarea}
              rows={6}
              placeholder="오늘 읽은 내용의 핵심을 기록하세요."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>인상 깊은 문장</label>
            <textarea
              className={styles.textarea}
              rows={3}
              placeholder="기억하고 싶은 문장을 남겨주세요."
              value={impressiveSentence}
              onChange={(e) => setImpressiveSentence(e.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>다음에 읽을 포인트</label>
            <textarea
              className={styles.textarea}
              rows={3}
              placeholder="다음에 이어서 읽을 내용이나 확인할 부분을 메모하세요."
              value={nextPoint}
              onChange={(e) => setNextPoint(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* ── Submit ───────────────────────────────────────── */}
      <button className={styles.submitBtn} onClick={handleSave}>
        기록 추가
      </button>
    </div>
  );
});

export default AddLog;
