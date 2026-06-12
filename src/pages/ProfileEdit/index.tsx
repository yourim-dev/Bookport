import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import authStore from '@/stores/authStore';
import styles from './ProfileEdit.module.scss';

const CameraIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const ProfileEdit = observer(() => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [nickname, setNickname]         = useState(authStore.nickname ?? '');
  const [profileImage, setProfileImage] = useState<string | null>(authStore.profileImage);

  const initial = nickname ? nickname[0].toUpperCase() : '?';
  const isValid = nickname.trim().length > 0;

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setProfileImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!isValid) return;
    authStore.updateProfile(nickname.trim(), profileImage);
    navigate('/profile', { replace: true });
  };

  return (
    <div className={styles.page}>

      {/* ── Avatar Edit ────────────────────────────────── */}
      <section className={styles.avatarSection}>
        <button
          className={styles.avatarBtn}
          onClick={() => fileInputRef.current?.click()}
          aria-label="프로필 이미지 변경"
        >
          {profileImage ? (
            <img src={profileImage} alt="프로필" className={styles.avatarImg} />
          ) : (
            <span className={styles.avatarInitial}>{initial}</span>
          )}
          <div className={styles.avatarOverlay}>
            <CameraIcon />
          </div>
        </button>
        <p className={styles.avatarHint}>탭하여 이미지 변경</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          style={{ display: 'none' }}
        />
      </section>

      {/* ── Form ─────────────────────────────────────────── */}
      <section className={styles.formCard}>
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel} htmlFor="nickname">닉네임</label>
          <input
            id="nickname"
            type="text"
            className={styles.fieldInput}
            placeholder="닉네임을 입력하세요"
            value={nickname}
            maxLength={20}
            onChange={(e) => setNickname(e.target.value)}
          />
          <span className={styles.fieldCount}>{nickname.length} / 20</span>
        </div>
      </section>

      {/* ── Remove Image ─────────────────────────────────── */}
      {profileImage && (
        <button
          className={styles.removeImgBtn}
          onClick={() => setProfileImage(null)}
        >
          프로필 이미지 제거
        </button>
      )}

      {/* ── Save ─────────────────────────────────────────── */}
      <button
        className={styles.saveBtn}
        onClick={handleSave}
        disabled={!isValid}
      >
        저장하기
      </button>
    </div>
  );
});

export default ProfileEdit;
