import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * ScrollToTop helper: scrolls window to (0, 0) on route transition
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/**
 * Main Layout wrapper for all pages.
 */
export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-text-primary selection:bg-primary selection:text-bg">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 w-full flex flex-col" id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
