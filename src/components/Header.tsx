"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Now', path: '/' },
    { name: 'Work', path: '/work' },
    { name: 'Collab with Kolabs', path: '/collab' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-soft-gray/80 border-b border-ink/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <img src="/logo-kolabs.png" alt="Kolabs Logo" className="h-10 md:h-12 object-contain contrast-125 sepia-[.10]" />
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.path || (item.path !== '/' && pathname?.startsWith(item.path));
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors ${
                    isActive
                      ? 'border-orange text-charcoal'
                      : 'border-transparent text-charcoal/50 hover:text-charcoal hover:border-ink/30'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-charcoal/40 hover:text-charcoal/50 hover:bg-soft-gray/80 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-ink/15">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path || (item.path !== '/' && pathname?.startsWith(item.path));
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive
                      ? 'bg-blue-50 border-primary text-primary'
                      : 'border-transparent text-charcoal/50 hover:bg-soft-gray/50 hover:border-border-gray/80 hover:text-charcoal'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
