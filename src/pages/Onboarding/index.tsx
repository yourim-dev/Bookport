import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ONBOARDING_KEY } from '@/constants/onboarding';
import styles from './Onboarding.module.scss';

// ─── Illustrations (component references only — no JSX at module scope) ───────
const Illustration1 = () => (
  <svg className={styles.illustration} viewBox="0 0 330 224" fill="none" aria-hidden="true">
    <rect width="330" height="224" fill="#eef3f7" />
    <rect x="68" y="48" width="26" height="142" rx="3" fill="#b8ccd8" />
    <rect x="68" y="48" width="8" height="142" rx="2" fill="#9db8c8" />
    <rect x="101" y="36" width="32" height="152" rx="3" fill="#c8d8e4" />
    <rect x="101" y="36" width="8" height="152" rx="2" fill="#adc0ce" />
    <rect x="140" y="28" width="28" height="158" rx="3" fill="#d4c9b8" />
    <rect x="140" y="28" width="8" height="158" rx="2" fill="#c0b5a4" />
    <rect x="175" y="42" width="24" height="148" rx="3" fill="#bdd0dc" />
    <rect x="200" y="54" width="26" height="136" rx="3" fill="#c8a96e" opacity="0.55" />
    <rect x="88" y="124" width="158" height="88" rx="10" fill="white" fillOpacity="0.95" />
    <line x1="100" y1="155" x2="234" y2="155" stroke="#d7e7f5" strokeWidth="1" strokeDasharray="5 3" />
    <circle cx="84" cy="155" r="13" fill="#f6fafd" stroke="#e1e9f0" strokeWidth="1" />
    <circle cx="248" cy="155" r="13" fill="#f6fafd" stroke="#e1e9f0" strokeWidth="1" />
    <rect x="100" y="133" width="100" height="8" rx="4" fill="#d7e7f5" />
    <rect x="100" y="163" width="72" height="6" rx="3" fill="#e5edf3" />
    <rect x="100" y="175" width="50" height="6" rx="3" fill="#e5edf3" />
  </svg>
);

const Illustration2 = () => (
  <svg className={styles.illustration} viewBox="0 0 330 224" fill="none" aria-hidden="true">
    <rect width="330" height="224" fill="#edf2f5" />
    <rect x="75" y="34" width="180" height="160" rx="8" fill="#e8f0f5" />
    <rect x="75" y="34" width="22" height="160" rx="8 0 0 8" fill="#b8ccd8" />
    <line x1="164" y1="34" x2="164" y2="194" stroke="#d0dce5" strokeWidth="1.5" strokeDasharray="4 3" />
    <rect x="104" y="62" width="52" height="5" rx="2.5" fill="#cfdbe5" />
    <rect x="104" y="74" width="44" height="5" rx="2.5" fill="#cfdbe5" />
    <rect x="104" y="86" width="48" height="5" rx="2.5" fill="#cfdbe5" />
    <rect x="104" y="98" width="38" height="5" rx="2.5" fill="#cfdbe5" />
    <rect x="172" y="62" width="52" height="5" rx="2.5" fill="#cfdbe5" />
    <rect x="172" y="74" width="40" height="5" rx="2.5" fill="#cfdbe5" />
    <rect x="172" y="86" width="50" height="5" rx="2.5" fill="#cfdbe5" />
    <path d="M218 34 L218 82 L210 74 L202 82 L202 34 Z" fill="#c8a96e" opacity="0.8" />
    <path d="M90 160 C120 130, 180 130, 240 100" stroke="#c8a96e" strokeWidth="2" strokeDasharray="6 4" fill="none" />
    <circle cx="90" cy="160" r="5" fill="#b8ccd8" />
    <circle cx="240" cy="100" r="6" fill="#1a2b3c" />
    <path d="M236 96 l10 0 M240 92 l2 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const Illustration3 = () => (
  <svg className={styles.illustration} viewBox="0 0 330 224" fill="none" aria-hidden="true">
    <rect width="330" height="224" fill="#f0ede6" />
    <line x1="70" y1="175" x2="268" y2="175" stroke="#e0d8ce" strokeWidth="1.5" />
    <line x1="70" y1="175" x2="70" y2="45" stroke="#e0d8ce" strokeWidth="1.5" />
    <rect x="88" y="138" width="28" height="37" rx="4" fill="#c8d8e4" />
    <rect x="124" y="110" width="28" height="65" rx="4" fill="#b8ccd8" />
    <rect x="160" y="80" width="28" height="95" rx="4" fill="#8fa8bd" />
    <rect x="196" y="55" width="28" height="120" rx="4" fill="#1a2b3c" fillOpacity="0.65" />
    <rect x="232" y="38" width="28" height="137" rx="4" fill="#1a2b3c" />
    <path d="M102 154 C130 120 160 90 250 36" stroke="#c8a96e" strokeWidth="2" fill="none" />
    <circle cx="258" cy="32" r="16" fill="#1a2b3c" />
    <path d="M251 32 l14 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M254 28 l4 4 l-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="88" y="186" width="28" height="5" rx="2.5" fill="#d4c8b8" />
    <rect x="124" y="186" width="28" height="5" rx="2.5" fill="#d4c8b8" />
    <rect x="160" y="186" width="28" height="5" rx="2.5" fill="#d4c8b8" />
    <rect x="196" y="186" width="28" height="5" rx="2.5" fill="#d4c8b8" />
    <rect x="232" y="186" width="28" height="5" rx="2.5" fill="#d4c8b8" />
  </svg>
);

// ─── Plain data — NO JSX at module scope ─────────────────────
const SLIDE_DATA = [
  {
    destination: 'DESTINATION 01',
    heading: ['여러 권을', '한눈에'],
    body: '동시에 여러 권을 읽어도 괜찮아요. 진행 상황을 하나의 대시보드에서 비행 경로처럼 명확하게 파악하세요.',
    Illustration: Illustration1,
  },
  {
    destination: 'DESTINATION 02',
    heading: ['끊긴 흐름을', '다시 연결'],
    body: '오랜만에 책을 다시 펼쳐도 걱정 마세요. 이전 독서의 핵심 메모를 통해 즉시 비행을 이어갑니다.',
    Illustration: Illustration2,
  },
  {
    destination: 'DESTINATION 03',
    heading: ['독서 여정을', '기록'],
    body: '완독한 책들은 나만의 비행 기록지에 쌓입니다. 통계와 기록을 통해 더 멀리 나아가세요.',
    Illustration: Illustration3,
  },
] as const;

const TOTAL = SLIDE_DATA.length;
const STEP_POSITIONS = [32, 56, 80] as const;

// ─── Icons ────────────────────────────────────────────────────
const GridIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
    <rect x="0" y="0" width="5" height="5" rx="1" />
    <rect x="7" y="0" width="5" height="5" rx="1" />
    <rect x="0" y="7" width="5" height="5" rx="1" />
    <rect x="7" y="7" width="5" height="5" rx="1" />
  </svg>
);

const PlaneIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────
const Onboarding = () => {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [cardStep, setCardStep] = useState(346);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    setCardStep(el.clientWidth - 44);
  }, []);

  const complete = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    navigate('/login', { replace: true });
  };

  const next = () => {
    if (slide < TOTAL - 1) setSlide((s) => s + 1);
    else complete();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    if (Math.abs(dx) < 40 || dy > Math.abs(dx)) return;
    if (dx < 0 && slide < TOTAL - 1) setSlide((s) => s + 1);
    if (dx > 0 && slide > 0) setSlide((s) => s - 1);
  };

  const cardWidth = Math.max(cardStep - 16, 330);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.skipBtn} onClick={complete}>
          건너뛰기
        </button>
      </div>

      <div
        className={styles.carouselArea}
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={styles.track}
          style={{ transform: `translateX(${-slide * cardStep}px)` }}
        >
          {SLIDE_DATA.map((s, i) => (
            <div
              key={i}
              className={styles.card}
              style={{ width: cardWidth }}
            >
              <div className={styles.imageHeader}>
                <s.Illustration />
                <div className={styles.imageGradient} />
                <div className={styles.badge}>
                  <GridIcon />
                  <span className={styles.badgeText}>{s.destination}</span>
                </div>
              </div>

              <div className={styles.ticketDivider}>
                <div className={`${styles.notch} ${styles.left}`} />
                <div className={`${styles.notch} ${styles.right}`} />
              </div>

              <div className={styles.content}>
                <h2 className={styles.heading}>
                  {s.heading.map((line, j) => (
                    <span key={j} style={{ display: 'block' }}>{line}</span>
                  ))}
                </h2>
                <p className={styles.body}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.pagination}>
          <div className={styles.paginationTrack}>
            {SLIDE_DATA.map((_, i) =>
              i === slide ? null : (
                <span
                  key={i}
                  className={styles.paginationDot}
                  style={{ left: `${STEP_POSITIONS[i]}%` }}
                />
              ),
            )}
            <span
              className={styles.paginationActive}
              style={{ left: `${STEP_POSITIONS[slide]}%` }}
            >
              <PlaneIcon />
            </span>
          </div>
        </div>

        <button className={styles.actionBtn} onClick={next}>
          {slide < TOTAL - 1 ? (
            <>
              다음
              <ArrowIcon />
            </>
          ) : (
            'Bookport 시작하기'
          )}
        </button>
      </footer>
    </div>
  );
};

export default Onboarding;
