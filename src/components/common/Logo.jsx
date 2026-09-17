import React from 'react';
import { Link } from 'react-router-dom';
import pcLogo from '../../assets/pc-logo.png';

/**
 * Official Programmers Club (PC) Logo Component
 * Renders the authoritative transparent PC logo with proper aspect ratio.
 */
export default function Logo({ className = '', showText = true, imgClassName = 'h-8 sm:h-9 w-auto' }) {
  return (
    <Link 
      to="/" 
      className={`inline-flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg ${className}`}
      aria-label="Programmers Club AIKTC Home"
    >
      {/* Official PC Logo Asset */}
      <img
        src={pcLogo}
        alt="Programmers Club AIKTC Logo"
        className={`object-contain transition-opacity group-hover:opacity-90 ${imgClassName}`}
      />

      {/* Brand Name */}
      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-heading font-bold text-xs sm:text-sm tracking-tight text-text-primary group-hover:text-primary transition-colors leading-tight">
            Programmers Club
          </span>
          <span className="text-[10px] sm:text-[11px] font-medium text-text-muted tracking-wider uppercase leading-tight">
            AIKTC
          </span>
        </div>
      )}
    </Link>
  );
}
