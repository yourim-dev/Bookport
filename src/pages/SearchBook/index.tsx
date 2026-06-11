import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBook.module.scss';

export interface BookResult {
  title: string;
  author: string;
  publisher?: string;
  cover?: string;
  totalPages?: number;
  isbn?: string;
}

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const BookSearchIllustration = () => (
  <svg className={styles.illustration} viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="12" y="10" width="36" height="52" rx="3" />
    <line x1="20" y1="22" x2="40" y2="22" />
    <line x1="20" y1="30" x2="40" y2="30" />
    <line x1="20" y1="38" x2="32" y2="38" />
    <circle cx="56" cy="52" r="12" />
    <line x1="64.5" y1="60.5" x2="72" y2="68" />
    <line x1="51" y1="47" x2="61" y2="57" />
    <line x1="61" y1="47" x2="51" y2="57" />
  </svg>
);

const EmptyIllustration = () => (
  <svg className={styles.illustration} viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="40" cy="36" r="18" />
    <line x1="52.7" y1="48.7" x2="66" y2="62" />
    <line x1="32" y1="30" x2="48" y2="42" />
    <line x1="48" y1="30" x2="32" y2="42" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const SearchBook = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results] = useState<BookResult[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearched(true);
    // TODO: 도서 API 연동
  };

  const handleClear = () => {
    setQuery('');
    setSearched(false);
  };

  const handleSelect = (book: BookResult) => {
    navigate('/books/add?mode=search', { state: { book } });
  };

  const handleManualAdd = () => {
    navigate('/books/add?mode=manual');
  };

  return (
    <div className={styles.page}>

      {/* ── 검색창 ──────────────────────────────────── */}
      <div className={styles.searchBar}>
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <div className={styles.inputWrap}>
            <span className={styles.searchIconWrap}><SearchIcon /></span>
            <input
              type="search"
              className={styles.input}
              placeholder="제목 또는 저자를 입력하세요"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            {query && (
              <button type="button" className={styles.clearBtn} onClick={handleClear} aria-label="검색어 지우기">
                <XIcon />
              </button>
            )}
          </div>
          <button type="submit" className={styles.searchBtn} disabled={!query.trim()}>
            검색
          </button>
        </form>
      </div>

      {/* ── 초기 상태 ────────────────────────────────── */}
      {!searched && (
        <div className={styles.stateBox}>
          <BookSearchIllustration />
          <p className={styles.stateTitle}>책을 검색해보세요</p>
          <p className={styles.stateDesc}>제목이나 저자 이름으로 찾아보세요</p>
          <button className={styles.linkBtn} onClick={handleManualAdd}>
            직접 추가하기
          </button>
        </div>
      )}

      {/* ── 검색 결과 없음 ───────────────────────────── */}
      {searched && results.length === 0 && (
        <div className={styles.stateBox}>
          <EmptyIllustration />
          <p className={styles.stateTitle}>검색 결과가 없어요</p>
          <p className={styles.stateDesc}>
            "<strong>{query}</strong>"에 대한 결과를 찾지 못했어요.
            <br />직접 입력해서 추가할 수 있어요.
          </p>
          <button className={styles.manualBtn} onClick={handleManualAdd}>
            직접 추가하기
          </button>
        </div>
      )}

      {/* ── 검색 결과 목록 ───────────────────────────── */}
      {results.length > 0 && (
        <ul className={styles.resultList}>
          {results.map((book, i) => (
            <li key={i}>
              <button className={styles.resultItem} onClick={() => handleSelect(book)}>
                <div className={styles.coverBox}>
                  {book.cover
                    ? <img src={book.cover} alt={book.title} className={styles.coverImg} />
                    : <div className={styles.coverPlaceholder} />
                  }
                </div>
                <div className={styles.bookMeta}>
                  <p className={styles.bookTitle}>{book.title}</p>
                  <p className={styles.bookAuthor}>{book.author}</p>
                  {book.publisher && <p className={styles.bookPublisher}>{book.publisher}</p>}
                </div>
                <span className={styles.chevron}><ChevronRightIcon /></span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBook;
