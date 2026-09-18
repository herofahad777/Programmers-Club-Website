# ACHIEVEMENTS PAGE — DESIGN SPECIFICATION

---

## Goal

Create a professional **Hall of Fame** page for the Programmers Club that communicates:

- **Excellence** — celebrating verified student accomplishments
- **Legacy** — building an institutional record of achievement history
- **Technical Growth** — showcasing the club's impact over time
- **Student Success** — highlighting individuals and teams who excelled

---

## Visual Direction

### Inspired By

- GitHub's clean dark-mode layouts (structured, minimal, data-focused)
- IEEE / ACM award pages (professional, academic credibility)
- University Hall of Fame pages (institutional pride, chronological history)

### Avoid

- Marketing / startup landing page aesthetics
- Excessive gradients or neon glow effects
- Heavy or continuous animations
- Overly decorative elements that distract from content

---

## Theme Reference

All colors and fonts must come from the project design system (`src/index.css`). Do not introduce ad-hoc values.

| Token                | Value       | Usage                          |
| :------------------- | :---------- | :----------------------------- |
| `--color-primary`    | `#7bc142`   | Accents, badges, stat numbers  |
| `--color-bg`         | `#0b0b0f`   | Page background                |
| `--color-surface`    | `#151519`   | Card and section backgrounds   |
| `--color-border`     | `#2a2a30`   | Card borders, dividers         |
| `--font-heading`     | `Poppins`   | Section titles, card titles    |
| `--font-sans`        | `Montserrat`| Body text, descriptions        |

---

## Page Layout

The page is served at route `/achievements` (mapped to `src/pages/Achievements.jsx`) and is composed of the following sections, in order:

### 1. Page Header

Use the existing `PageHeader` component with breadcrumbs.

- Title: "Achievements & Honors"
- Badge: "Programmers Club // AIKTC"
- Breadcrumbs: `Home > Achievements` (linking back from `/` to `/achievements`)

### 2. Statistics Bar

A row of 4 metric cards showing aggregate numbers:

| Stat                  | Icon suggestion        |
| :-------------------- | :--------------------- |
| Total Achievements    | `Trophy`               |
| Hackathon Wins        | `Flame`                |
| Students Recognized   | `Users`                |
| National/Intl Awards  | `Award`                |

- **Layout**: Horizontal row on desktop (4 columns), 2×2 grid on tablet, vertical stack on mobile.
- **Style**: Surface card with border, primary-colored stat number, muted label text.

### 3. Achievement Timeline / Featured Cards

Chronological display of achievement records.

- Each card shows: title, year, category badge, level badge, description, team members.
- **Featured achievements** (`featured: true`) should be visually distinguished (e.g., subtle primary border or "Featured" badge).
- **Layout**: Single column on mobile, 2-column grid on tablet+.

### 4. Achievement Gallery

Grid of certificates, event photos, and award moments.

- **Layout**: Responsive grid (1 column mobile → 2 tablet → 3 desktop).
- Images should have a title overlay or caption below.
- Handle missing images gracefully (show placeholder or hide item).

### 5. Legacy / Call-to-Action Section

A closing section with an inspirational message for future members.

- Tone: professional, encouraging.
- Optionally link to the Suggest Event or Contact page.

---

## Component Hierarchy

```
Achievements (page)
├── PageHeader (shared)
├── AchievementStats
│   └── StatCard × 4
├── AchievementTimeline / AchievementCard list
│   └── AchievementCard × N
│       ├── Category Badge
│       ├── Level Badge
│       └── Team Member List
├── AchievementGallery
│   └── GalleryItem × N
└── Legacy Section (static content)
```

---

## Interaction & Animation Guidelines

Use **Framer Motion** conservatively. The goal is polish, not spectacle.

### Allowed

| Animation    | Where                        | Duration  |
| :----------- | :--------------------------- | :-------- |
| Fade up      | Cards entering viewport      | 300–500ms |
| Stagger      | Sequential card reveal       | 50–100ms delay |
| Scale hover  | Cards and gallery images     | 150–200ms |

### Not Allowed

- Parallax scrolling
- Continuous / looping motion
- Flashy particle effects
- Animations that block content from being readable

---

## Responsive Breakpoints

| Breakpoint | Width   | Layout Notes                                  |
| :--------- | :------ | :-------------------------------------------- |
| Small Mobile | 320px | Single column, compact spacing                |
| Mobile     | 375px   | Single column, standard spacing               |
| Tablet     | 768px   | 2-column grids where appropriate              |
| Laptop     | 1024px  | Full layout, sidebar spacing                  |
| Desktop    | 1440px  | Max-width container, comfortable whitespace   |

---

## Accessibility Requirements

- All images must have descriptive `alt` text.
- Keyboard navigation must work for all interactive elements.
- Use semantic heading hierarchy (`h1` on PageHeader, `h2` for sections, `h3` for cards).
- Category and level badges must not rely on color alone — include text labels.
- Ensure focus indicators are visible.

---

## Empty / Edge States

| Scenario                    | Expected Behavior                                  |
| :-------------------------- | :------------------------------------------------- |
| JSON file is empty          | Show `EmptyState` component with helpful message   |
| `achievements` array empty  | Show empty state in achievements section           |
| `gallery` array empty       | Hide gallery section entirely                      |
| Achievement has no image    | Render card without image area (no broken icon)    |
| Achievement has no team     | Show "Individual Achievement" or omit team section |