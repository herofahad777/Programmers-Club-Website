import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import Logo from '../common/Logo';
import { NAV_LINKS, CTA_LINK } from '../../data/navigation';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-[#0b0b0f]/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-xs font-medium tracking-wide transition-colors ${
                    isActive
                      ? 'text-primary bg-accent/60 font-semibold border border-primary/20'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right CTA Button */}
          <div className="hidden lg:flex items-center">
            <Link
              to={CTA_LINK.path}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold text-bg bg-primary hover:bg-primary-soft transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{CTA_LINK.name}</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface border border-border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-text-primary" />
              ) : (
                <Menu className="w-5 h-5 text-text-primary" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-menu" 
          className="lg:hidden border-t border-border bg-[#0b0b0f] px-4 pt-2 pb-6 shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto"
        >
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary bg-accent/80 font-semibold border border-primary/20'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <div className="pt-3 border-t border-border mt-2">
              <Link
                to={CTA_LINK.path}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-md text-sm font-semibold text-bg bg-primary hover:bg-primary-soft transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>{CTA_LINK.name}</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
