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

  get longestNotReadDays(): number | null {
    const reading = this.readingBooks;
    if (reading.length === 0) return null;
    const max = reading.reduce((acc, book) => {
      if (!book.lastReadAt) return acc;
      const days = Math.floor((Date.now() - new Date(book.lastReadAt).getTime()) / 86400000);
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
    }
  }

  removeBook(id: string) {
    this.books = this.books.filter((b) => b.id !== id);
  }
}

export default new BookStore();
