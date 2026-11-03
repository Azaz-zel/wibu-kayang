import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';
import { AdminLoginPage } from './admin/AdminLoginPage';
import { AdminDashboard } from './admin/AdminDashboard';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { MembersPage } from './pages/MembersPage';
import { GalleryPage } from './pages/GalleryPage';
import { StoriesPage } from './pages/StoriesPage';
import { SocialsPage } from './pages/SocialsPage';
import { Member, GalleryItem, Story, SettingsMap, LightboxData } from './types';
import {
  DEFAULT_MEMBERS,
  DEFAULT_GALLERY,
  DEFAULT_STORIES,
  DEFAULT_SETTINGS,
} from './defaultData';

export type PublicRoute = 'home' | 'about' | 'members' | 'gallery' | 'stories' | 'socials';

function getIsAdminRoute(): boolean {
  const p = window.location.pathname.toLowerCase();
  const h = window.location.hash.toLowerCase();
  const s = window.location.search.toLowerCase();
  return (
    p.startsWith('/admin') ||
    p.startsWith('/login') ||
    h === '#admin' ||
    h === '#login' ||
    s.includes('admin')
  );
}

function getPublicRoute(): PublicRoute {
  const p = window.location.pathname.toLowerCase();
  const h = window.location.hash.toLowerCase();

  if (p.startsWith('/tentang') || p.startsWith('/about') || h === '#tentang' || h === '#about') {
    return 'about';
  }
  if (p.startsWith('/anggota') || p.startsWith('/members') || h === '#anggota' || h === '#members') {
    return 'members';
  }
  if (p.startsWith('/galeri') || p.startsWith('/gallery') || h === '#galeri' || h === '#gallery') {
    return 'gallery';
  }
  if (p.startsWith('/cerita') || p.startsWith('/stories') || h === '#cerita' || h === '#stories') {
    return 'stories';
  }
  if (p.startsWith('/kanal') || p.startsWith('/socials') || h === '#kanal' || h === '#socials') {
    return 'socials';
  }
  return 'home';
}

export const App: React.FC = () => {
  // Routing state ('public' | 'admin')
  const [isAdminView, setIsAdminView] = useState<boolean>(getIsAdminRoute);
  const [publicRoute, setPublicRoute] = useState<PublicRoute>(getPublicRoute);

  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('wk_theme') === 'dark';
  });

  // Public Data states (initialized with default data so pages are immediately rich and filled)
  const [members, setMembers] = useState<Member[]>(DEFAULT_MEMBERS);
  const [gallery, setGallery] = useState<GalleryItem[]>(DEFAULT_GALLERY);
  const [stories, setStories] = useState<Story[]>(DEFAULT_STORIES);
  const [settings, setSettings] = useState<SettingsMap>(DEFAULT_SETTINGS);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Lightbox state for public view
  const [lightboxData, setLightboxData] = useState<LightboxData | null>(null);

  // Auth state
  const [authToken, setAuthToken] = useState<string | null>(() => {
    return localStorage.getItem('wk_admin_token');
  });
  const [adminUsername, setAdminUsername] = useState<string>('admin');
  const [isVerifyingToken, setIsVerifyingToken] = useState<boolean>(false);

  // Tema gelap hanya dipakai di panel admin; situs publik selalu terang.
  useEffect(() => {
    const useDark = isAdminView && isDark;
    document.documentElement.classList.toggle('dark', useDark);
    if (isAdminView) {
      localStorage.setItem('wk_theme', isDark ? 'dark' : 'light');
    }
  }, [isDark, isAdminView]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // Route Listener (PopState & HashChange)
  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminView(getIsAdminRoute());
      setPublicRoute(getPublicRoute());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Programmatic Navigation
  const navigateTo = useCallback((path: string) => {
    window.history.pushState(null, '', path);
    setIsAdminView(getIsAdminRoute());
    setPublicRoute(getPublicRoute());
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Expose global openAdmin helper
  useEffect(() => {
    (window as any).openAdmin = () => navigateTo('/admin');
  }, [navigateTo]);

  // Verify Auth Token on mount or when switching to admin view
  useEffect(() => {
    if (!isAdminView || !authToken) return;

    let isMounted = true;
    const verifyToken = async () => {
      setIsVerifyingToken(true);
      try {
        const res = await fetch('/api/auth/verify', {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        const json = await res.json();
        if (isMounted) {
          if (json.success && json.data?.valid) {
            setAdminUsername(json.data.username || 'admin');
          } else {
            setAuthToken(null);
            localStorage.removeItem('wk_admin_token');
          }
        }
      } catch {
        // If network glitch, keep token or let user re-login
      } finally {
        if (isMounted) setIsVerifyingToken(false);
      }
    };

    verifyToken();
    return () => {
      isMounted = false;
    };
  }, [isAdminView, authToken]);

  // Fetch Public Data only when in public view
  const fetchPublicData = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);

    const getPublicData = async (url: string) => {
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(`${url} returned ${res.status}`);

      const json = await res.json();
      if (!json?.success) throw new Error(json?.error || `${url} failed`);

      return json.data;
    };

    try {
      const [membersData, galleryData, storiesData, settingsData] = await Promise.all([
        getPublicData('/api/members'),
        getPublicData('/api/gallery'),
        getPublicData('/api/stories'),
        getPublicData('/api/settings'),
      ]);

      if (Array.isArray(membersData) && membersData.length > 0) {
        setMembers(membersData);
      }
      if (Array.isArray(galleryData) && galleryData.length > 0) {
        setGallery(galleryData);
      }
      if (Array.isArray(storiesData) && storiesData.length > 0) {
        setStories(storiesData);
      }
      if (
        settingsData &&
        typeof settingsData === 'object' &&
        !Array.isArray(settingsData) &&
        Object.keys(settingsData).length > 0
      ) {
        setSettings(settingsData);
      }
      setIsConnected(true);
      setLoadError(null);
    } catch (err) {
      console.warn('Backend API publik belum aktif, menggunakan data arsip lokal:', err);
      setIsConnected(false);
      setLoadError(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAdminView) {
      fetchPublicData();
    }
  }, [isAdminView, fetchPublicData]);

  const openLightbox = useCallback((data: LightboxData) => {
    setLightboxData(data);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxData(null);
  }, []);

  // Auth Handlers
  const handleLoginSuccess = (token: string, user: string) => {
    setAuthToken(token);
    setAdminUsername(user);
    localStorage.setItem('wk_admin_token', token);
  };

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('wk_admin_token');
  };

  // -------------------------------------------------------------
  // RENDER: Admin Route (Dedicated Full-Screen Workspace)
  // -------------------------------------------------------------
  if (isAdminView) {
    if (isVerifyingToken) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#F6F5F2] dark:bg-[#0E0E0E] text-ink dark:text-paper font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-vermilion animate-pulse"></span>
            <span>Memeriksa sesi admin...</span>
          </div>
        </div>
      );
    }

    if (!authToken) {
      return (
        <AdminLoginPage
          onLoginSuccess={handleLoginSuccess}
          onBackToPublic={() => navigateTo('/')}
        />
      );
    }

    return (
      <AdminDashboard
        token={authToken}
        username={adminUsername}
        onLogout={handleLogout}
        onNavigatePublic={() => navigateTo('/')}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
    );
  }

  // -------------------------------------------------------------
  // RENDER: Public Website with Dedicated Pages
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen flex flex-col w-full selection:bg-vermilion selection:text-white">
      <a href="#main-content" className="skip-link">
        Lewati ke konten
      </a>

      {/* Navigation */}
      <Header
        isConnected={isConnected}
        currentRoute={publicRoute}
        onNavigate={navigateTo}
      />

      {/* Main Full-Width Content */}
      <main id="main-content" tabIndex={-1} className="w-full pt-16 flex-1 focus:outline-none">
        <p className="sr-only" role="status" aria-live="polite">
          {isLoading
            ? 'Memuat data komunitas.'
            : loadError
              ? loadError
              : 'Data komunitas selesai dimuat.'}
        </p>

        {publicRoute === 'home' && (
          <HomePage
            members={members}
            gallery={gallery}
            stories={stories}
            settings={settings}
            onNavigate={navigateTo}
            onOpenLightbox={openLightbox}
          />
        )}

        {publicRoute === 'about' && (
          <AboutPage onNavigate={navigateTo} />
        )}

        {publicRoute === 'members' && (
          <MembersPage
            members={members}
            isLoading={isLoading}
            hasError={Boolean(loadError)}
            onRetry={fetchPublicData}
            onNavigate={navigateTo}
          />
        )}

        {publicRoute === 'gallery' && (
          <GalleryPage
            items={gallery}
            isLoading={isLoading}
            hasError={Boolean(loadError)}
            onRetry={fetchPublicData}
            onOpenLightbox={openLightbox}
            onNavigate={navigateTo}
          />
        )}

        {publicRoute === 'stories' && (
          <StoriesPage
            stories={stories}
            isLoading={isLoading}
            hasError={Boolean(loadError)}
            onRetry={fetchPublicData}
            onOpenLightbox={openLightbox}
            onNavigate={navigateTo}
          />
        )}

        {publicRoute === 'socials' && (
          <SocialsPage
            settings={settings}
            isLoading={isLoading}
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Footer */}
      <Footer isConnected={isConnected} isLoading={isLoading} onNavigate={navigateTo} />

      {/* Lightbox Modal */}
      <LightboxModal
        data={lightboxData}
        onClose={closeLightbox}
      />
    </div>
  );
};

export default App;
