import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Users, Award } from 'lucide-react';

const STAT_CONFIG = [
  { key: 'totalAchievements', label: 'Total Achievements', Icon: Trophy },
  { key: 'hackathonWins',     label: 'Hackathon Wins',     Icon: Flame },
  { key: 'studentsRecognized',label: 'Students Recognized',Icon: Users },
  { key: 'nationalAwards',   label: 'National / Intl Awards', Icon: Award },
];

/**
 * StatCard — Single metric card in the statistics bar.
 */
function StatCard({ label, value, Icon, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="flex items-center gap-4 bg-surface border border-border rounded-xl p-5 hover:border-primary/40 transition-colors"
    >
      <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-primary/10 text-primary shrink-0">
        <Icon className="w-5 h-5" aria-hidden="true" />
      </div>
      <div>
        <p className="text-2xl sm:text-3xl font-bold font-heading text-primary leading-none">
          {value}+
        </p>
        <p className="text-xs sm:text-sm text-text-muted mt-1">{label}</p>
      </div>
    </motion.div>
  );
}

/**
 * AchievementStats — Horizontal row of 4 metric cards showing aggregate numbers.
 * Completely dynamic: calculates counts directly from the achievements records array.
 */
export default function AchievementStats({ achievements = [], fallbackStats }) {
  // Dynamically derive statistics from the achievements array
  const dynamicStats = useMemo(() => {
    if (!achievements || achievements.length === 0) {
      return fallbackStats || {
        totalAchievements: 0,
        hackathonWins: 0,
        studentsRecognized: 0,
        nationalAwards: 0,
      };
    }

    const totalAchievements = achievements.length;
    const hackathonWins = achievements.filter((a) => a.category === 'Hackathon').length;

    // Calculate unique students recognized
    const studentSet = new Set();
    achievements.forEach((a) => {
      const roster = a.winners || a.team || [];
      roster.forEach((name) => {
        const clean = name.replace(/\s*\(.*?\)\s*/g, '').trim();
        if (clean) studentSet.add(clean);
      });
    });
    const studentsRecognized = studentSet.size;

    const nationalAwards = achievements.filter(
      (a) => a.level === 'National' || a.level === 'International'
    ).length;

    return {
      totalAchievements,
      hackathonWins,
      studentsRecognized,
      nationalAwards,
    };
  }, [achievements, fallbackStats]);

  return (
    <section aria-label="Achievement statistics" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CONFIG.map((item, index) => (
          <StatCard
            key={item.key}
            label={item.label}
            value={dynamicStats[item.key] ?? 0}
            Icon={item.Icon}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
