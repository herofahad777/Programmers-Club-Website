import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Instagram, MessageSquare, Mail, MapPin } from 'lucide-react';
import Logo from '../common/Logo';
import { FOOTER_SECTIONS, SOCIAL_LINKS, CLUB_INFO } from '../../data/navigation';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Helper icon map for social placeholders
  const getSocialIcon = (iconName) => {
    switch (iconName) {
      case 'Github':
        return <Github className="w-4 h-4" />;
      case 'Linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'Instagram':
        return <Instagram className="w-4 h-4" />;
      case 'MessageSquare':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <footer className="w-full bg-surface border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Organization Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo imgClassName="h-10 sm:h-11 w-auto" />
            <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
              {CLUB_INFO.description}
            </p>
            <div className="text-xs text-text-muted space-y-1 pt-1">
              <p className="font-medium text-text-secondary">{CLUB_INFO.institute}</p>
              <div className="flex items-center gap-1.5 pt-1">
                <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span>{CLUB_INFO.locationPlaceholder}</span>
              </div>
              <div className="flex items-center gap-1.5 pt-0.5">
                <Mail className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span>{CLUB_INFO.emailPlaceholder}</span>
              </div>
            </div>

            {/* Social Media Placeholders */}
            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted block mb-2">
                Social Channels (Placeholders)
              </span>
              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.map((item) => (
                  <a
                    key={item.name}
                    href={item.placeholderUrl}
                    title={`${item.name} (Official link pending)`}
                    aria-label={`${item.name} placeholder`}
                    className="p-2 rounded-md bg-accent text-text-secondary hover:text-primary hover:bg-surface-hover border border-border transition-colors"
                  >
                    {getSocialIcon(item.iconName)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links Columns */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-3">
              <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                {section.title}
              </h4>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-text-secondary hover:text-primary transition-colors text-xs inline-block py-0.5"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Copyright & Note */}
        <div className="pt-8 mt-8 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>
            &copy; {currentYear} Programmers Club, AIKTC. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-text-muted">
            <span className="inline-block w-2 h-2 rounded-full bg-primary/70 animate-pulse"></span>
            <span>Frontend Base v0.1 — Built by PC Technical Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
