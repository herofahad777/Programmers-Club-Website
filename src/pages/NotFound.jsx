import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface border border-border text-primary font-mono text-2xl font-bold">
          404
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-text-primary">
            Page Not Found
          </h1>
          <p className="text-sm text-text-secondary">
            The route you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="pt-2 flex justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold text-bg bg-primary hover:bg-primary-soft transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
