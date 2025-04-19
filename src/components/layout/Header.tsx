'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Sun, 
  Moon, 
  Search, 
  Home, 
  Compass, 
  BookmarkIcon, 
  Bell,
  User,
  Plus,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { NotificationPanel } from '@/components/notifications/NotificationPanel';

export function Header() {
  // Initialize state from localStorage or default to dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Ensure this runs only on the client
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('quiver-theme');
      return savedTheme === 'dark'; // Default to dark if no preference saved or value is 'dark'
    } 
    return true; // Default to dark on server/initial render before client check
  });
  
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const settingsRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const isExplorePage = pathname === '/explore' || pathname.startsWith('/explore/');
  const isHomePage = pathname === '/home';
  const isCreatePage = pathname === '/create';

  // Effect to apply theme class and save preference to localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    const currentTheme = isDarkMode ? 'dark' : 'light';
    root.classList.remove(isDarkMode ? 'light' : 'dark');
    root.classList.add(currentTheme);
    localStorage.setItem('quiver-theme', currentTheme);
  }, [isDarkMode]);

  // Effect to handle clicks outside menus
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettingsMenu(false);
      }
      // Notification panel handles its own outside clicks
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    // When opening notifications, mark as read (example logic)
    if (!showNotifications) {
      setHasUnreadNotifications(false);
    }
  };

  const handleLogout = () => {
    // In a real app, this would handle authentication logout
    router.push('/');
  };

  return (
    <>
      {/* Left side vertical navigation bar starting from the top of the page */}
      <div className="hidden md:block fixed left-0 top-0 bottom-0 z-50 w-20 bg-black dark:bg-black border-r border-gray-800">
        {/* Logo positioned to align with search bar */}
        <div className="flex justify-center pt-4 mb-6">
          <Link 
            href="/home" 
            className="p-2 rounded-full text-white hover:bg-gray-800"
            aria-label="Home"
          >
            <span className="text-4xl">🏹</span>
          </Link>
        </div>

        <div className="flex flex-col items-center space-y-8 pt-2">
          <Link 
            href="/home"
            className={`p-3.5 rounded-full ${
              pathname === '/home' 
                ? 'bg-primary text-primary-foreground' 
                : 'text-white hover:bg-gray-800'
            }`}
            aria-label="Home"
          >
            <Home size={26} />
          </Link>
          
          <Link 
            href="/explore"
            className={`p-3.5 rounded-full ${
              isExplorePage
                ? 'bg-primary text-primary-foreground' 
                : 'text-white hover:bg-gray-800'
            }`}
            aria-label="Explore"
          >
            <Compass size={26} />
          </Link>
          
          <Link 
            href="/create"
            className={`p-3.5 rounded-full ${
              isCreatePage
                ? 'bg-primary text-primary-foreground' 
                : 'text-white hover:bg-gray-800'
            }`}
            aria-label="Create"
          >
            <Plus size={26} />
          </Link>
          
          <div className="relative" ref={notificationRef}>
            <button
              onClick={toggleNotifications}
              className={`p-3.5 rounded-full relative ${
                showNotifications
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-white hover:bg-gray-800'
              }`}
              aria-label="Notifications"
            >
              <Bell size={26} />
              {hasUnreadNotifications && (
                <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full"></span>
              )}
            </button>
          </div>
        </div>
        
        {/* Settings at bottom */}
        <div className="absolute bottom-6 left-0 w-full flex flex-col items-center">
          <button
            onClick={toggleDarkMode}
            className="p-3.5 mb-4 rounded-full text-white hover:bg-gray-800"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun size={26} />
            ) : (
              <Moon size={26} />
            )}
          </button>
          
          <div className="relative" ref={settingsRef}>
            <button 
              onClick={() => setShowSettingsMenu(!showSettingsMenu)}
              className={`p-3.5 rounded-full ${
                pathname === '/settings'
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-white hover:bg-gray-800'
              }`}
              aria-label="Settings"
            >
              <Settings size={26} />
            </button>
            
            {showSettingsMenu && (
              <div className="absolute bottom-full left-16 mb-2 w-48 bg-card rounded-lg shadow-lg border border-border overflow-hidden z-50">
                <div className="py-1">
                  <Link
                    href="/settings"
                    className="flex items-center px-4 py-2 text-sm hover:bg-secondary"
                    onClick={() => setShowSettingsMenu(false)}
                  >
                    <Settings size={16} className="mr-2" />
                    Settings
                  </Link>
                  <button
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-secondary"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pinterest style top header with search bar - starts where left nav ends */}
      <header className="fixed top-0 left-0 right-0 z-40 h-20 bg-black dark:bg-black flex items-center border-b border-gray-800 md:pl-20">
        <div className="flex items-center w-full px-4 h-full">
          {/* Search bar - full width with more padding and larger size */}
          <div className="relative flex-grow mx-4">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search size={20} className="text-muted-foreground" />
            </div>
            <input
              type="search"
              placeholder="Search for prompts..."
              className="w-full h-12 pl-14 pr-4 rounded-full bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-primary border border-transparent text-base"
            />
          </div>
          
          {/* Right side icons */}
          <div className="flex items-center ml-2">
            <Link 
              href="/profile"
              className={`p-3 rounded-full ${
                pathname === '/profile'
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-white hover:bg-gray-800'
              }`}
              aria-label="Profile"
            >
              <User size={24} />
            </Link>
          </div>
        </div>
      </header>
      
      {/* Notification Panel */}
      <NotificationPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
      
      {/* Main content area properly positioned to account for both top and left navs */}
      <main className="md:pl-20 pt-20">
        <div className="w-full">
          {/* Main content will be rendered here by layout */}
        </div>
      </main>
      
      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border py-2 px-4 z-50">
        <div className="flex justify-around">
          <Link 
            href="/home"
            className={`flex flex-col items-center p-2 ${
              pathname === '/home' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Home size={22} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link 
            href="/explore"
            className={`flex flex-col items-center p-2 ${
              isExplorePage ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Compass size={22} />
            <span className="text-xs mt-1">Explore</span>
          </Link>
          
          <Link 
            href="/create"
            className={`flex flex-col items-center p-2 ${
              isCreatePage ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Plus size={22} />
            <span className="text-xs mt-1">Create</span>
          </Link>
          
          <button
            onClick={toggleNotifications}
            className={`flex flex-col items-center p-2 ${
              showNotifications ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <div className="relative">
              <Bell size={22} />
              {hasUnreadNotifications && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </div>
            <span className="text-xs mt-1">Notifications</span>
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowSettingsMenu(!showSettingsMenu)}
              className={`flex flex-col items-center p-2 ${
                showSettingsMenu ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Settings size={22} />
              <span className="text-xs mt-1">Settings</span>
            </button>
            
            {showSettingsMenu && (
              <div className="absolute bottom-full right-0 mb-2 w-48 bg-card rounded-lg shadow-lg border border-border overflow-hidden">
                <div className="py-1">
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-2 text-sm hover:bg-secondary"
                    onClick={() => setShowSettingsMenu(false)}
                  >
                    <User size={16} className="mr-2" />
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center px-4 py-2 text-sm hover:bg-secondary"
                    onClick={() => setShowSettingsMenu(false)}
                  >
                    <Settings size={16} className="mr-2" />
                    Settings
                  </Link>
                  <button
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-secondary"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Adjust container max-width to avoid empty space on the right */
        .container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1rem;
        }
      `}</style>
    </>
  );
} 