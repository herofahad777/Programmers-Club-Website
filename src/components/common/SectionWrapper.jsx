import React from 'react';

export default function SectionWrapper({
  id,
  className = '',
  containerClassName = '',
  title,
  subtitle,
  badge,
  action,
  children,
}) {
  return (
    <section id={id} className={`py-12 sm:py-16 md:py-20 border-b border-border/50 last:border-b-0 ${className}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        {(title || badge || action) && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
            <div className="space-y-1.5">
              {badge && (
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-primary uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span>{badge}</span>
                </div>
              )}
              {title && (
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading text-text-primary tracking-tight">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-xs sm:text-sm text-text-secondary max-w-2xl">
                  {subtitle}
                </p>
              )}
            </div>
            {action && <div>{action}</div>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
