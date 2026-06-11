import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import bookStore from '@/stores/bookStore';
import BoardingPassCard from '@/components/cards/BoardingPassCard';
import styles from './Dashboard.module.scss';

type FilterType = 'recent' | 'oldest' | 'progress';

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'recent', label: '최근 읽은 순' },
  { key: 'oldest', label: '오래 안 읽은 순' },
  { key: 'progress', label: '진행률 높은 순' },
];

const EmptyBookIcon = () => (
  <svg className={styles.emptyIcon} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 56V12a4 4 0 0 1 4-4h28l16 16v32a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4z" />
    <polyline points="40 8 40 24 56 24" />
    <line x1="24" y1="36" x2="40" y2="36" />
    <line x1="24" y1="44" x2="36" y2="44" />
  </svg>
);

const Dashboard = observer(() => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterType>('recent');

  const readingBooks = bookStore.readingBooks;
  const longestDays = bookStore.longestNotReadDays;

  const sortedBooks = useMemo(() => {
    const books = [...readingBooks];
    switch (filter) {
      case 'recent':
        return books.sort((a, b) => {
          const at = a.lastReadAt ? new Date(a.lastReadAt).getTime() : 0;
          const bt = b.lastReadAt ? new Date(b.lastReadAt).getTime() : 0;
          return bt - at;
        });
      case 'oldest':
        return books.sort((a, b) => {
          const at = a.lastReadAt ? new Date(a.lastReadAt).getTime() : 0;
          const bt = b.lastReadAt ? new Date(b.lastReadAt).getTime() : 0;
          return at - bt;
        });
      case 'progress':
        return books.sort((a, b) => {
          const ap = a.totalPages > 0 ? a.currentPage / a.totalPages : 0;
          const bp = b.totalPages > 0 ? b.currentPage / b.totalPages : 0;
          return bp - ap;
        });
    }
  }, [readingBooks, filter]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.heading}>지금 읽는 책</h1>
        <p className={styles.subheading}>이어 읽을 책을 한눈에 확인해요</p>

        {readingBooks.length > 0 && (
          <div className={styles.chips}>
            <span className={`${styles.chip} ${styles.neutral}`}>
              읽는 중 {readingBooks.length}권
            </span>
            {longestDays !== null && longestDays > 0 && (
              <span className={`${styles.chip} ${styles.warn}`}>
                가장 오래 안 읽은 책 {longestDays}일 전
              </span>
            )}
          </div>
        )}
      </header>

      {readingBooks.length > 0 && (
        <div className={styles.filters}>
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              className={`${styles.filterBtn} ${filter === key ? styles.active : ''}`}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {sortedBooks.length > 0 ? (
        <ul className={styles.cardList}>
          {sortedBooks.map((book) => (
            <li key={book.id}>
              <BoardingPassCard book={book} />
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.empty}>
          <EmptyBookIcon />
          <p className={styles.emptyText}>
            읽고 있는 책이 없어요.<br />
            책을 추가해볼까요?
          </p>
          <button className={styles.emptyBtn} onClick={() => navigate('/search')}>
            책 검색하기
          </button>
        </div>
      )}
    </div>
  );
});

export default Dashboard;
