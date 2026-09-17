import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function PageHeader({ 
  title, 
  description, 
  badge = 'Programmers Club // AIKTC',
  breadcrumbs = []
}) {
  return (
    <div className="w-full bg-surface border-b border-border py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-text-muted/60" />
                <span className={idx === breadcrumbs.length - 1 ? 'text-text-secondary font-medium' : 'hover:text-primary transition-colors'}>
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Section Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium text-primary bg-accent border border-primary/20 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span>{badge}</span>
          </div>
        )}

        {/* Heading & Subtitle */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-text-primary tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-sm sm:text-base text-text-secondary max-w-3xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
