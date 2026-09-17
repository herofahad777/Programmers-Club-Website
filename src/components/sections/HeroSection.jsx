import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full border-b border-border py-16 sm:py-24 lg:py-28 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium text-primary bg-surface border border-primary/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>Programmers Club // AIKTC</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-text-primary tracking-tight leading-tight">
            Code. Collaborate. <br />
            <span className="text-primary">Create the Future.</span>
          </h1>

          {/* Subtitle / Mission */}
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
            The official student-driven technical club of Anjuman-I-Islam's Kalsekar Technical Campus. 
            Empowering students to build real-world software, master competitive programming, and contribute to open-source.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold text-bg bg-primary hover:bg-primary-soft transition-colors shadow-sm"
            >
              <span>Explore Events</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/suggest-event"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium text-text-primary bg-surface hover:bg-surface-hover border border-border transition-colors"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Suggest an Event</span>
            </Link>
          </div>

          {/* Developer Note */}
          <div className="pt-6">
            <div className="flex items-center gap-2 text-xs font-mono text-text-muted bg-surface/60 p-3 rounded-lg border border-border">
              <Terminal className="w-4 h-4 text-primary flex-shrink-0" />
              <span>[Section 1: Hero] Structural foundation ready. Team will refine typography and layout.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
