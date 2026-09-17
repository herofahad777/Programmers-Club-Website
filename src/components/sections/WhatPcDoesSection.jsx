import React from 'react';
import { Terminal, Code, Cpu, Users } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';

export default function WhatPcDoesSection() {
  const pillars = [
    {
      icon: <Terminal className="w-5 h-5 text-primary" />,
      title: 'Full-Stack & Systems Engineering',
      desc: 'Building practical web apps, mobile solutions, CLI tools, and exploring distributed computing.'
    },
    {
      icon: <Code className="w-5 h-5 text-primary" />,
      title: 'Competitive Programming & DSA',
      desc: 'Weekly algorithm practice, problem solving sessions, and preparation for college hackathons.'
    },
    {
      icon: <Cpu className="w-5 h-5 text-primary" />,
      title: 'Workshops & Hands-on Bootcamps',
      desc: 'Peer-led bootcamps covering Git, modern frameworks, Linux, APIs, and dev tooling.'
    },
    {
      icon: <Users className="w-5 h-5 text-primary" />,
      title: 'Open Source & Community Mentorship',
      desc: 'Mentoring junior batches, contributing to open repositories, and code reviews.'
    }
  ];

  return (
    <SectionWrapper
      id="what-pc-does"
      badge="Core Focus Areas"
      title="What Programmers Club Does"
      subtitle="Structural pillars shaping technical culture across engineering branches at AIKTC."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="p-6 rounded-xl bg-surface border border-border hover:border-border-hover transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center border border-border mb-4">
                {pillar.icon}
              </div>
              <h3 className="text-base font-bold font-heading text-text-primary mb-2">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {pillar.desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border/60 text-[11px] font-mono text-text-muted">
              Pillar 0{idx + 1}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
