'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, Search } from 'lucide-react';

const categories = [
  { name: 'All', path: '/' },
  { name: 'Popular', path: '/popular' },
  { name: 'New', path: '/new' },
  { name: 'Text', path: '/text' },
  { name: 'Image', path: '/image' },
  { name: 'Video', path: '/video' },
];

export function Header() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className="sticky top-0 z-10 bg-background border-b border-border py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="font-bold text-2xl">
            <span className="flex items-center gap-2">
              <span>🏹</span>
              <span>Quiver</span>
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-secondary hover:bg-secondary/80"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun size={20} className="text-secondary-foreground" />
              ) : (
                <Moon size={20} className="text-secondary-foreground" />
              )}
            </button>

            <div className="hidden md:flex space-x-2">
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:w-1/2 lg:w-1/3 mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-muted-foreground" />
            </div>
            <input
              type="search"
              placeholder="Search for prompts..."
              className="w-full py-2 pl-10 pr-4 rounded-full bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <nav className="flex overflow-x-auto py-2 md:py-0 no-scrollbar">
            <ul className="flex space-x-1 md:space-x-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.path}
                    className={`px-4 py-2 rounded-full whitespace-nowrap ${
                      pathname === category.path
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
} 