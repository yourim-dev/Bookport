import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authStore from '@/stores/authStore';
import styles from './Signup.module.scss';

const TakeoffIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M2.5 19h19v2h-19v-2zm7.18-1.73L5 12l2-2 4.5 2.5 4.94-4.94-3.44-3.44 1.42-1.43 4.68 1.57 1.57 4.68-1.42 1.41-3.44-3.44-4.93 4.94 2.5 4.5-2 2z" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true">
    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" />
    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" />
    <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" />
    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
  </svg>
);

const AppleIcon = () => (
  <svg width="14" height="16" viewBox="0 0 814 1000" fill="currentColor" aria-hidden="true">
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 457.8 43.8 327.7 43.8 310c0-177.4 116-266.7 190-266.7 74 0 130.2 49.5 174.4 49.5 42.2 0 108.5-52.3 190.5-52.3 30.5 0 110.2 2.6 167.8 76.5zm-160.5-109.4c-35.3-47.8-84.4-70.1-134.2-70.1-51.5 0-102.8 24.5-138.9 73.8-28.5 38.6-51.9 98.7-51.9 161.7 0 8.3.6 16.5 1.9 24.2 4.5.3 9 .3 13.5.3 47.8 0 98.7-22.7 133.5-70.4 24.2-33.1 51.9-93.1 51.9-156.1-.1-7.7-.7-15.4-1.8-22.9-.7-.2-1.4-.4-1.4-.5z" />
  </svg>
);

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const isValid =
    name.trim() !== '' &&
    email.trim() !== '' &&
    password.length >= 8 &&
    password === confirmPassword &&
    agreeTerms;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    authStore.login(email, name);
    navigate('/login');
  };

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.brand}>
            <TakeoffIcon />
            <span className={styles.brandName}>BOOKPORT</span>
          </div>
          <h1 className={styles.title}>새 여정을 시작해요</h1>
          <p className={styles.subtitle}>읽고 있는 책들을 한곳에서 관리해보세요</p>
        </header>

        <form className={styles.card} onSubmit={handleSubmit} noValidate>
          <div className={styles.topDecoration} />

          <div className={styles.formSection}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">이름</label>
              <div className={styles.inputWrap}>
                <input
                  id="name"
                  type="text"
                  className={styles.input}
                  placeholder="이름을 입력하세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">이메일</label>
              <div className={styles.inputWrap}>
                <input
                  id="email"
                  type="email"
                  className={styles.input}
                  placeholder="boarding@bookport.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">비밀번호</label>
              <div className={styles.inputWrap}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`${styles.input} ${styles.withToggle}`}
                  placeholder="최소 8자 이상"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="confirmPassword">비밀번호 확인</label>
              <div className={styles.inputWrap}>
                <input
                  id="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  className={`${styles.input} ${styles.withToggle}`}
                  placeholder="비밀번호 다시 입력"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label={showConfirm ? '비밀번호 숨기기' : '비밀번호 보기'}
                >
                  {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>
          </div>

          <div className={styles.divider}>
            <div className={`${styles.notch} ${styles.left}`} />
            <div className={`${styles.notch} ${styles.right}`} />
          </div>

          <div className={styles.bottomSection}>
            <span className={styles.socialLabel}>소셜 계정으로 탑승하기</span>
            <div className={styles.socialButtons}>
              <button type="button" className={`${styles.socialBtn} ${styles.google}`}>
                <GoogleIcon />
                Google
              </button>
              <button type="button" className={`${styles.socialBtn} ${styles.apple}`}>
                <AppleIcon />
                Apple
              </button>
            </div>

            <label className={styles.termsRow}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <span className={styles.termsText}>
                서비스 이용약관 및 개인정보 처리방침에 동의합니다.
              </span>
            </label>

            <button type="submit" className={styles.submitBtn} disabled={!isValid}>
              회원가입
              <ArrowRightIcon />
            </button>
          </div>
        </form>

        <footer className={styles.footer}>
          이미 탑승권이 있으신가요?{' '}
          <Link to="/login">로그인</Link>
        </footer>
      </div>
    </div>
  );
};

export default Signup;
