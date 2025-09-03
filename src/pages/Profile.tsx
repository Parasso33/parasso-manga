import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bookmark, Clock, Settings, User as UserIcon } from 'lucide-react';
import MangaCard from '@/components/MangaCard';
import { mangaData } from '@/data/manga';
import type { Manga } from '@/types/manga';

const STORAGE_KEY = 'mp_user';
const GLOBAL_FAV_KEY = 'mp_favorites';

const getFavKeyForUser = (): string => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const u = JSON.parse(raw);
      if (u?.email) return `mp_favs_${u.email}`;
    }
  } catch {
    /* ignore */
  }
  return GLOBAL_FAV_KEY;
};

const readFavIds = (): string[] => {
  try {
    const raw = localStorage.getItem(getFavKeyForUser());
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeFavIds = (ids: string[]) => {
  try {
    localStorage.setItem(getFavKeyForUser(), JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent('mp:favs:changed'));
  } catch {
    /* ignore */
  }
};

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [favIds, setFavIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'fav' | 'history' | 'reader' | 'account'>('fav');

  const loadUser = useCallback(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      setUser(raw ? JSON.parse(raw) : null);
    } catch {
      setUser(null);
    }
  }, []);

  const loadFavs = useCallback(() => {
    setFavIds(readFavIds());
  }, []);

  useEffect(() => {
    loadUser();
    loadFavs();
    const handler = () => loadFavs();
    window.addEventListener('mp:favs:changed', handler as EventListener);
    return () => window.removeEventListener('mp:favs:changed', handler as EventListener);
  }, [loadFavs, loadUser]);

  const allMangas = useMemo(() => Object.values(mangaData) as Manga[], []);
  const favMangas = useMemo(
    () => favIds.map((id) => allMangas.find((m) => m.id === id)).filter(Boolean) as Manga[],
    [favIds, allMangas]
  );

  const initials = user
    ? user.name
        .split(' ')
        .map((s) => s[0]?.toUpperCase() ?? '')
        .slice(0, 2)
        .join('')
    : '';

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    navigate('/login', { replace: true });
  };

  const removeFavorite = (id: string) => {
    const next = favIds.filter((i) => i !== id);
    writeFavIds(next);
    setFavIds(next);
  };

  const clearFavorites = () => {
    writeFavIds([]);
    setFavIds([]);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-xl w-full text-center">
          <p className="mb-6 text-lg text-muted-foreground">يرجى تسجيل الدخول للوصول للملف الشخصي.</p>
          <Link to="/login" className="inline-block px-4 py-2 bg-primary text-white rounded">
            تسجيل الدخول
          </Link>
        </div>
      </div>
    );
  }

  // Tab content renderers
  const renderTabContent = () => {
    switch (activeTab) {
      case 'fav':
        return favMangas.length === 0 ? (
          <div className="p-6 bg-white/80 dark:bg-gray-800/75 rounded text-sm text-muted-foreground">
            لا توجد عناصر في المفضلة. اضغط على القلب في أي بطاقة لإضافتها.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {favMangas.map((m) => (
              <div key={m.id} className="relative">
                <MangaCard manga={m} />
                <button
                  onClick={() => removeFavorite(m.id)}
                  className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 focus:outline-none"
                  title="Remove from favorites"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        );
      case 'history':
        return <p className="text-muted-foreground">سجل التصفح فارغ حالياً.</p>;
      case 'reader':
        return <p className="text-muted-foreground">إعدادات القارئ: حجم الخط، ثيم، ... (قيد التجريب)</p>;
      case 'account':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-white/80 dark:bg-gray-800/75 rounded">
              <div className="text-sm text-muted-foreground">البريد الإلكتروني</div>
              <div className="font-medium break-all">{user.email}</div>
            </div>
            <div className="p-4 bg-white/80 dark:bg-gray-800/75 rounded">
              <div className="text-sm text-muted-foreground">الاسم</div>
              <div className="font-medium">{user.name}</div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => window.alert('Edit profile not implemented')} className="px-4 py-2 bg-gray-100 text-[#fb5922] rounded">
                تعديل الحساب
              </button>
              <button onClick={handleLogout} className="px-4 py-2 bg-[#fb5922] text-white rounded">
                تسجيل الخروج
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar (icons style) */}
        <aside className="lg:col-span-1 bg-white/80 dark:bg-gray-800/75 rounded-lg shadow p-6">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-2xl">
              {initials || 'U'}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-muted-foreground break-all">{user.email}</p>
            </div>
          </div>

          <nav className="mt-6 space-y-2">
            <button
              onClick={() => setActiveTab('fav')}
              className={`w-full flex items-center gap-3 p-2 rounded-lg ${activeTab === 'fav' ? 'bg-primary text-white' : 'hover:bg-muted'}`}
            >
              <Bookmark className="w-4 h-4" />
              المفضلة
              <span className="ml-auto text-sm text-muted-foreground">{favIds.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`w-full flex items-center gap-3 p-2 rounded-lg ${activeTab === 'history' ? 'bg-primary text-white' : 'hover:bg-muted'}`}
            >
              <Clock className="w-4 h-4" />
              سجل التصفح
            </button>

            <button
              onClick={() => setActiveTab('reader')}
              className={`w-full flex items-center gap-3 p-2 rounded-lg ${activeTab === 'reader' ? 'bg-primary text-white' : 'hover:bg-muted'}`}
            >
              <Settings className="w-4 h-4" />
              إعدادات القارئ
            </button>

            <button
              onClick={() => setActiveTab('account')}
              className={`w-full flex items-center gap-3 p-2 rounded-lg ${activeTab === 'account' ? 'bg-primary text-white' : 'hover:bg-muted'}`}
            >
              <UserIcon className="w-4 h-4" />
              إعدادات الحساب
            </button>
          </nav>

          <div className="mt-6 border-t pt-4 text-sm text-muted-foreground">
            <p>Favorites: <span className="font-medium">{favIds.length}</span></p>
            <p className="mt-2">Joined: <span className="font-medium">—</span></p>
            <p className="mt-2">Plan: <span className="font-medium">Free</span></p>
          </div>
        </aside>

        {/* Main */}
        <main className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">
              {activeTab === 'fav'
                ? 'المفضلة'
                : activeTab === 'history'
                ? 'سجل التصفح'
                : activeTab === 'reader'
                ? 'إعدادات القارئ'
                : 'إعدادات الحساب'}
            </h1>

            <div className="flex items-center gap-2">
              {activeTab === 'fav' && (
                <>
                  <button
                    onClick={clearFavorites}
                    className="px-3 py-2 text-sm bg-[#fb5922] text-white rounded"
                    disabled={favIds.length === 0}
                    title="Clear all favorites"
                  >
                    مسح الكل
                  </button>
                </>
              )}
              {/* <button onClick={() => navigate('/')} className="px-2 py-1.5 rounded bg-[#fb5922] text-white">
  الرئيسية
</button> */}
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">نظرة عامة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white/70 dark:bg-gray-700/60 rounded shadow">
                <div className="text-sm text-muted-foreground">لمفضلة</div>
                <div className="text-2xl font-bold">{favIds.length}</div>
              </div>
              <div className="p-4 bg-white/70 dark:bg-gray-700/60 rounded shadow">
                <div className="text-sm text-muted-foreground">قوائم القراءة</div>
                <div className="text-2xl font-bold">0</div>
              </div>
              <div className="p-4 bg-white/70 dark:bg-gray-700/60 rounded shadow">
                <div className="text-sm text-muted-foreground">الفصول المقروءة</div>
                <div className="text-2xl font-bold">—</div>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-4">{/* title already above */}</div>
            <div className="text-muted-foreground">{renderTabContent()}</div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Profile;
