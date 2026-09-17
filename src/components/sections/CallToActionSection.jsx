import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';

export default function CallToActionSection() {
  return (
    <SectionWrapper id="cta">
      <div className="rounded-2xl bg-surface border border-border p-8 sm:p-12 text-center relative overflow-hidden">
        {/* Subtle accent border top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-primary/80"></div>

        <div className="max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-primary bg-accent border border-primary/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community Driven</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-text-primary tracking-tight">
            Have an Idea for a Workshop or Tech Talk?
          </h2>

          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Programmers Club events are built for students, by students. Whether you want to learn a specific tech stack, organize a contest, or invite a speaker, let us know!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/suggest-event"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-semibold text-bg bg-primary hover:bg-primary-soft transition-colors shadow-sm"
            >
              <span>Suggest an Event</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium text-text-primary bg-accent hover:bg-surface-hover border border-border transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-primary" />
              <span>Contact the Team</span>
            </Link>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
