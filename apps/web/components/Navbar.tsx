'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const pathname = usePathname(); 
  const isHome = pathname === '/';


  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/');
  };

  return (
    <>
      <div className="h-16"></div>
      <nav className="bg-neutral-900 fixed top-0 w-full z-50">
        {/* Changed to max-w-4xl to match TodoList */}
        <div className={`${
        isHome ? 'max-w-7xl' : 'max-w-4xl'
      } mx-auto px-4 w-full`} >
          <div className="flex items-center justify-between h-16">
            {/* Rest of the Navbar code remains the same */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                TaskFlow
              </Link>
            </div>

            <div className="hidden md:flex md:items-center md:space-x-4">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" passHref>
                    <button className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium">
                      Dashboard
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" passHref>
                    <button className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium">
                      Log in
                    </button>
                  </Link>
                  <Link href="/auth/signup" passHref>
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                      Sign up
                    </button>
                  </Link>
                </>
              )}
            </div>

            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="bg-neutral-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Open menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-neutral-800">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" passHref>
                  <button className="text-gray-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">
                    Dashboard
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" passHref>
                  <button className="text-gray-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">
                    Log in
                  </button>
                </Link>
                <Link href="/auth/signup" passHref>
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">
                    Sign up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}