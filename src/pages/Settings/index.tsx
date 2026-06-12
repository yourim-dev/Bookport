import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import authStore from '@/stores/authStore';
import styles from './Settings.module.scss';

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

interface SettingItem {
  label: string;
  description?: string;
  onClick?: () => void;
  danger?: boolean;
  disabled?: boolean;
}

interface SettingSection {
  title: string;
  items: SettingItem[];
}

const Settings = observer(() => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authStore.logout();
    navigate('/login', { replace: true });
  };

  const sections: SettingSection[] = [
    {
      title: '계정',
      items: [
        {
          label: '프로필 보기',
          onClick: () => navigate('/profile'),
        },
      ],
    },
    {
      title: '앱 설정',
      items: [
        {
          label: '알림 설정',
          description: '준비 중',
          disabled: true,
        },
        {
          label: '다크 모드',
          description: '준비 중',
          disabled: true,
        },
      ],
    },
    {
      title: '앱 정보',
      items: [
        {
          label: 'Bookport',
          description: '항공 탑승권 기반 독서 기록 앱',
          disabled: true,
        },
        {
          label: '버전',
          description: '1.0.0',
          disabled: true,
        },
      ],
    },
    {
      title: '계정 관리',
      items: [
        {
          label: '로그아웃',
          onClick: handleLogout,
          danger: true,
        },
      ],
    },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.heading}>설정</h1>
      </header>

      <div className={styles.content}>
        {sections.map((section) => (
          <section key={section.title} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <div className={styles.itemList}>
              {section.items.map((item) => (
                <button
                  key={item.label}
                  className={[
                    styles.item,
                    item.danger   ? styles.danger   : '',
                    item.disabled ? styles.disabled : '',
                  ].join(' ')}
                  onClick={item.onClick}
                  disabled={item.disabled}
                >
                  <div className={styles.itemContent}>
                    <span className={styles.itemLabel}>{item.label}</span>
                    {item.description && (
                      <span className={styles.itemDesc}>{item.description}</span>
                    )}
                  </div>
                  {!item.disabled && <ChevronRightIcon />}
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
});

export default Settings;
