import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

/**
 * AchievementCTA — Legacy / Call-to-Action section at the bottom of the Achievements page.
 * Professional, encouraging tone aimed at current and prospective club members.
 */
export default function AchievementCTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      aria-label="Call to action"
      className="relative overflow-hidden bg-surface border border-border rounded-2xl p-8 sm:p-10 lg:p-12 text-center"
    >
      {/* Subtle gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
            <Sparkles className="w-6 h-6" aria-hidden="true" />
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading text-text-primary tracking-tight mb-3">
          Build Your Legacy
        </h2>

        <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-8">
          Every hackathon win, every published paper, and every open-source contribution adds
          to the legacy of the Programmers Club at AIKTC. Whether you're a first-year curious
          about code or a final-year building production systems — your next achievement starts here.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/suggest-event"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-bg text-sm font-semibold hover:bg-primary-soft transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            Suggest an Event
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-transparent text-text-secondary text-sm font-medium border border-border hover:border-border-hover hover:text-text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
