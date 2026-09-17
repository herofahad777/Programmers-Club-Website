import React from 'react';
import { Code2, Construction } from 'lucide-react';

export default function PlaceholderCard({
  title,
  description,
  moduleName,
  assignedTo = 'Unassigned (Technical Team Member)',
  plannedFeatures = [],
}) {
  return (
    <div className="rounded-xl border border-dashed border-border hover:border-border-hover bg-surface/50 p-6 sm:p-8 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-accent text-primary border border-border">
            <Construction className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold">
              Structural Placeholder v0.1
            </span>
            <h3 className="text-base sm:text-lg font-bold font-heading text-text-primary">
              {title}
            </h3>
          </div>
        </div>

        {moduleName && (
          <span className="hidden sm:inline-block px-2.5 py-1 text-[11px] font-mono text-text-muted bg-accent rounded border border-border">
            {moduleName}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-4 text-xs sm:text-sm text-text-secondary leading-relaxed">
          {description}
        </p>
      )}

      {plannedFeatures.length > 0 && (
        <div className="mt-5 pt-4 border-t border-border/60">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">
            Planned Module Scope:
          </span>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-secondary">
            {plannedFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border/60 text-xs text-text-muted">
        <div className="flex items-center gap-1.5">
          <Code2 className="w-3.5 h-3.5 text-primary" />
          <span>Status: Foundation Ready for Development</span>
        </div>
        <div>
          <span>Target: </span>
          <span className="text-text-secondary font-medium">{assignedTo}</span>
        </div>
      </div>
    </div>
  );
}
