import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { name: 'Now', path: '/' },
    { name: 'Work', path: '/work' },
    { name: 'Collab with Kolabs', path: '/collab' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F8] text-[#111111] font-sans">
      <header className="sticky top-0 z-50 bg-[#F9F9F8]/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="font-bold text-xl tracking-tight">
                Kolabs.Design
              </Link>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors ${
                      isActive
                        ? 'border-[#0055FF] text-[#111111]'
                        : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0055FF]"
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
          <div className="md:hidden bg-white border-b border-gray-200">
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                      isActive
                        ? 'bg-blue-50 border-[#0055FF] text-[#0055FF]'
                        : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200 mt-24">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start space-x-6 md:order-2">
              <Link to="/collab" className="text-gray-400 hover:text-gray-500">
                Contact
              </Link>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                LinkedIn
              </a>
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center md:text-left text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Kolabs.Design. Decision Intelligence Think Tank.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
