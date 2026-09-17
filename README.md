# Programmers Club Official Website

The official web portal for the **Programmers Club (PC)** of **Anjuman-I-Islam's Kalsekar Technical Campus (AIKTC)**.

---

## 1. Project Overview

Programmers Club is the official student-led technical body at AIKTC dedicated to fostering software engineering excellence, competitive programming, and collaborative open-source culture. 

This repository houses the modern frontend web application designed to showcase club activities, upcoming workshops, student-built projects, academic notes, achievements, and community initiatives.

---

## 2. Current Project Status

- **Current Release**: `v0.1.0 (Clean Frontend Base)`
- **Scope**: Frontend foundation, responsive design system, centralized routing, layout architecture, and structural placeholder pages.
- **Backend / Database**: **NOT implemented yet**. Backend architecture, authentication, database selection, and APIs will be specified and integrated in later project phases under the direction of the Technical Team Lead.

---

## 3. Technology Stack

- **Core Framework**: React 18 (JavaScript)
- **Build Tool & Bundler**: Vite
- **Styling**: Tailwind CSS v4 (with centralized PC brand theme tokens)
- **Routing**: React Router DOM (v6)
- **Icons**: Lucide React
- **Animations**: Framer Motion

### Preserved Club Brand Identity
- **Primary Green**: `#7bc142`
- **Soft Accent**: `#8fd147`
- **Dark Accent**: `#6bae38`
- **Canvas / Background**: `#0b0b0f`
- **Surface**: `#151519`
- **Border**: `#2a2a30`
- **Typography**: Montserrat (body), Poppins (headings)

---

## 4. Folder Structure

```
PC Website/
├── public/
│   └── favicon.svg              # Temporary vector favicon placeholder
│
├── src/
│   ├── assets/                  # Images and media assets (see README inside)
│   │   └── README.md
│   │
│   ├── components/
│   │   ├── common/              # Reusable UI primitives
│   │   │   ├── Logo.jsx         # PC Emblem & branding placeholder
│   │   │   ├── PageHeader.jsx   # Standardized page title & breadcrumbs
│   │   │   ├── PlaceholderCard.jsx # Team member placeholder indicator
│   │   │   └── SectionWrapper.jsx  # Standard section layout wrapper
│   │   │
│   │   ├── layout/              # Persistent structural layout
│   │   │   ├── Navbar.jsx       # Responsive header with mobile drawer
│   │   │   ├── Footer.jsx       # Footer with quick links & info placeholders
│   │   │   └── Layout.jsx       # Root layout wrapper with ScrollToTop
│   │   │
│   │   └── sections/            # Home page modular sections
│   │       ├── HeroSection.jsx
│   │       ├── AboutSection.jsx
│   │       ├── UpcomingEventsSection.jsx
│   │       ├── WhatPcDoesSection.jsx
│   │       ├── ProjectsSection.jsx
│   │       ├── AchievementsSection.jsx
│   │       ├── TeamSection.jsx
│   │       ├── GallerySection.jsx
│   │       └── CallToActionSection.jsx
│   │
│   ├── data/
│   │   └── navigation.js        # Centralized navigation & link definitions
│   │
│   ├── hooks/
│   │   └── useMediaQuery.js     # Responsive helper hook
│   │
│   ├── pages/                   # Route-level pages
│   │   ├── Home.jsx             # Home landing page (10 sections)
│   │   ├── About.jsx            # About PC & AIKTC
│   │   ├── Events.jsx           # Workshops & contest directory
│   │   ├── Projects.jsx         # Student project showcase
│   │   ├── Team.jsx             # Leadership & technical team
│   │   ├── Achievements.jsx     # Hall of fame & hackathon awards
│   │   ├── Notes.jsx            # Academic notes & syllabus resources
│   │   ├── Gallery.jsx          # Event photograph archive
│   │   ├── SuggestEvent.jsx     # Student event idea submission
│   │   ├── Contact.jsx          # Official contact channels
│   │   └── NotFound.jsx         # 404 handler
│   │
│   ├── utils/
│   │   └── helpers.js           # Shared formatting utilities
│   │
│   ├── App.jsx                  # Centralized React Router definition
│   ├── index.css                # Tailwind CSS v4 @theme design tokens
│   └── main.jsx                 # React root mount
│
├── .env.example                 # Safe environment configuration template
├── .gitignore                   # Excludes secrets, node_modules, and builds
├── index.html                   # HTML entry point with fonts & metadata
├── package.json                 # Dependency definitions and scripts
├── vite.config.js               # Vite bundler configuration
└── README.md                    # Project documentation
```

---

## 5. Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) (version 9.0.0 or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd "PC Website"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

---

## 6. Available Scripts

| Script | Command | Description |
|---|---|---|
| Development | `npm run dev` | Runs the Vite dev server with hot module reloading |
| Production Build | `npm run build` | Compiles optimized production bundle into `dist/` |
| Preview Build | `npm run preview` | Locally serves the production build for testing |

---

## 7. Team Collaboration Guidelines (11 Members)

This foundation has been built to enable independent work across team members with minimal merge conflicts:

1. **Independent Pages**:
   - Each subpage (`About.jsx`, `Events.jsx`, `Projects.jsx`, `Team.jsx`, `Achievements.jsx`, `Notes.jsx`, `Gallery.jsx`, `SuggestEvent.jsx`, `Contact.jsx`) is isolated in `src/pages/`.
   - Team members assigned to a specific page should keep page-specific components in their respective file or create dedicated subcomponents without altering shared components.

2. **Stable Shared Components**:
   - `Navbar.jsx`, `Footer.jsx`, `Layout.jsx`, `App.jsx`, and `src/index.css` are core files.
   - Do **NOT** modify core layout files without consulting the Technical Team Lead.

3. **Centralized Data**:
   - Navigation links and club metadata reside in `src/data/navigation.js`.

4. **Git Branching Workflow**:
   - Always create a dedicated feature branch from `main`:
     ```bash
     git checkout -b feature/<page-or-feature-name>
     # Example: git checkout -b feature/events-page
     ```
   - Make atomic, meaningful commits.
   - Submit a Pull Request (PR) for review by the Technical Team Lead before merging.

---

## 8. Security Guidelines

- **NEVER commit sensitive credentials**: Do NOT push `.env`, `.env.local`, API keys, passwords, database URLs, or service account certificates to Git.
- The `.gitignore` is preconfigured to ignore environment files and secrets.
- Use `.env.example` as a template for team members to create their own `.env.local` if environment variables are introduced later.

---

## 9. Official Assets Note

- The official high-resolution PC logo asset and institute crests will be provided by leadership and placed in `public/` and `src/assets/`.
- Temporary clean SVG placeholders are currently rendered.

---

*Maintained by the Programmers Club Technical Team — AIKTC.*
