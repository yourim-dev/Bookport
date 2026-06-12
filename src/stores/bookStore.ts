import { makeAutoObservable } from 'mobx';

export interface ReadingLog {
  id: string;
  date: string;       // ISO string
  fromPage: number;
  toPage: number;
  note: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  publisher?: string;
  publishYear?: string;
  isbn?: string;
  cover?: string;
  totalPages: number;
  currentPage: number;
  status: 'reading' | 'done' | 'wish';
  startedAt?: string;
  finishedAt?: string;
  lastReadAt?: string;
  lastSummary?: string;
  logs?: ReadingLog[];
}

class BookStore {
  books: Book[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get readingBooks() {
    return this.books.filter((b) => b.status === 'reading');
  }

  get doneBooks() {
    return this.books.filter((b) => b.status === 'done');
  }

  get wishBooks() {
    return this.books.filter((b) => b.status === 'wish');
  }

  // 이번 주(월~일)에 log가 추가된 reading 책 수
  get thisWeekLogCount(): number {
    const now = new Date();
    const day = now.getDay();
    const diff = day === 0 ? 6 : day - 1; // 월요일 기준 주 시작
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - diff);
    weekStart.setHours(0, 0, 0, 0);
    return this.readingBooks.filter((book) =>
      (book.logs ?? []).some((log) => new Date(log.date) >= weekStart)
    ).length;
  }

  // 실제 log가 있는 reading 책 중 lastReadAt 기준 가장 오래된 일수
  get longestNotReadDays(): number | null {
    const candidates = this.readingBooks.filter(
      (b) => (b.logs?.length ?? 0) > 0 && b.lastReadAt,
    );
    if (candidates.length === 0) return null;
    const max = candidates.reduce((acc, book) => {
      const ts = new Date(book.lastReadAt!).getTime();
      if (isNaN(ts)) return acc;
      const days = Math.floor((Date.now() - ts) / 86400000);
      return days > acc ? days : acc;
    }, 0);
    return max > 0 ? max : null;
  }

  findById(id: string): Book | undefined {
    return this.books.find((b) => b.id === id);
  }

  updateProgress(id: string, currentPage: number) {
    const book = this.books.find((b) => b.id === id);
    if (!book) return;
    book.currentPage = Math.max(0, Math.min(currentPage, book.totalPages));
    book.lastReadAt = new Date().toISOString();
  }

  addBook(book: Book) {
    this.books.push(book);
  }

  updateBook(id: string, updates: Partial<Book>) {
    const book = this.books.find((b) => b.id === id);
    if (book) Object.assign(book, updates);
  }

  addLog(bookId: string, log: ReadingLog) {
    const book = this.books.find((b) => b.id === bookId);
    if (book) {
      book.logs = [log, ...(book.logs ?? [])];
      book.lastReadAt = log.date; // lastReadAt을 실제 독서 일자와 동기화
    }
  }

  removeBook(id: string) {
    this.books = this.books.filter((b) => b.id !== id);
  }
}

export default new BookStore();
