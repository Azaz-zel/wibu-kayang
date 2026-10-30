import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { MemberRoster } from './components/MemberRoster';
import { GalleryLog } from './components/GalleryLog';
import { StoriesArchive } from './components/StoriesArchive';
import { SocialChannels } from './components/SocialChannels';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';
import { AdminLoginPage } from './admin/AdminLoginPage';
import { AdminDashboard } from './admin/AdminDashboard';
import { Member, GalleryItem, Story, SettingsMap, LightboxData } from './types';

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

export const App: React.FC = () => {
  // Routing state ('public' | 'admin')
  const [isAdminView, setIsAdminView] = useState<boolean>(getIsAdminRoute);

  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('wk_theme') === 'dark';
  });

  // Public Data states
  const [members, setMembers] = useState<Member[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [settings, setSettings] = useState<SettingsMap>({});
  const [isConnected, setIsConnected] = useState<boolean>(true);

  // Lightbox state for public view
  const [lightboxData, setLightboxData] = useState<LightboxData | null>(null);

  // Auth state
  const [authToken, setAuthToken] = useState<string | null>(() => {
    return localStorage.getItem('wk_admin_token');
  });
  const [adminUsername, setAdminUsername] = useState<string>('admin');
  const [isVerifyingToken, setIsVerifyingToken] = useState<boolean>(false);

  // Handle Theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('wk_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('wk_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // Route Listener (PopState & HashChange)
  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminView(getIsAdminRoute());
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
    try {
      const [resMembers, resGallery, resStories, resSettings] = await Promise.all([
        fetch('/api/members').then((r) => r.json()),
        fetch('/api/gallery').then((r) => r.json()),
        fetch('/api/stories').then((r) => r.json()),
        fetch('/api/settings').then((r) => r.json()),
      ]);

      if (resMembers.success) setMembers(resMembers.data);
      if (resGallery.success) setGallery(resGallery.data);
      if (resStories.success) setStories(resStories.data);
      if (resSettings.success) setSettings(resSettings.data);
      setIsConnected(true);
    } catch (err) {
      console.warn('Gagal memuat data API publik:', err);
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    if (!isAdminView) {
      fetchPublicData();
    }
  }, [isAdminView, fetchPublicData]);

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
            <span>MEMVERIFIKASI SESI OPERATOR...</span>
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
  // RENDER: Public Website (Full Width, Zero Side Gap)
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen flex flex-col w-full selection:bg-vermilion selection:text-white">
      {/* Navigation */}
      <Header
        isDark={isDark}
        toggleTheme={toggleTheme}
        isConnected={isConnected}
      />

      {/* Main Full-Width Content */}
      <main className="w-full pt-16 flex-1">
        <Hero />
        <About />
        <MemberRoster members={members} />
        <GalleryLog
          items={gallery}
          onOpenLightbox={(data) => setLightboxData(data)}
        />
        <StoriesArchive
          stories={stories}
          onOpenLightbox={(data) => setLightboxData(data)}
        />
        <SocialChannels settings={settings} />
      </main>

      {/* Footer */}
      <Footer isConnected={isConnected} />

      {/* Lightbox Modal */}
      <LightboxModal
        data={lightboxData}
        onClose={() => setLightboxData(null)}
      />
    </div>
  );
};

export default App;
