# MODULE TASK SPECIFICATION — Achievements & Hall of Fame

- **Module**: Achievements & Hall of Fame
- **Page**: `src/pages/Achievements.jsx`
- **Route**: `/achievements`
- **Status**: `In Progress`
- **Last Updated**: 2026-09-18

---

## Objective

Build a professional Hall of Fame & Achievements module driven by JSON data, featuring:
1. Dynamic statistical metrics computed in real-time from records.
2. Contained top highlight / spotlight system above stats.
3. Simplified center date filter with dynamic year selection (`Previous Year | Selected Year | Next Year`), strictly preventing future years, with a manual calendar-style quick year selector.
4. Clean dropdown-type filters for Category and Level.
5. Standardized card layout: **Image → Date → Title → Description → Winners name**.
6. Image asset linking from `src/assets/Achievements/` with an official image specifications guide.
7. Event gallery and legacy call-to-action sections.

---

## Required Deliverables

### 1. Data & Asset Files
- [x] `src/data/achievements.json` — Structured JSON with demo records spanning multiple years (2021–2025), categories, levels, and image keys.
- [x] `src/assets/Achievements/image-specifications.txt` — Official image aspect ratio, resolution, format, and safe-area guidelines.
- [x] `src/assets/Achievements/*.svg` — Demo image assets for hackathons, competitive programming, research, and awards.

### 2. Component Inventory (`src/components/achievements/`)

| Component                     | Purpose                                                                 | Status |
| :---------------------------- | :---------------------------------------------------------------------- | :----: |
| `AchievementHighlight`        | Contained spotlight card above stats highlighting key or random items   | [x]    |
| `AchievementStats`            | Real-time dynamic metrics (Total, Hackathons, Unique Students, National)| [x]    |
| `AchievementDateFilter`       | Center year navigator (Prev/Current/Next, no future years, quick picker)| [x]    |
| `AchievementDropdownFilters`  | Dropdown-type Category and Level selectors with Reset action            | [x]    |
| `AchievementCard`             | Card with strict order: Image → Date → Title → Description → Winners    | [x]    |
| `AchievementDetailModal`      | Modal dialog displaying full in-depth details on card/highlight click   | [x]    |
| `EmptyState`                  | Fallback UI when query/filter returns 0 results                         | [x]    |
| `DemoBanner`                  | Top disclaimer regarding placeholder data pending verified records      | [x]    |
| `imageResolver.js`            | Vite dynamic import resolver for assets in `src/assets/Achievements/`   | [x]    |

> Note: `Event Gallery & Memorabilia` and `Build Your Legacy` CTA sections were removed from the page per user requirements to keep the focus on the Hall of Fame cards and their in-depth detail views.

---

## Core Requirements & Constraints

1. **Dynamic Statistics**: Stats must not be hardcoded in JSON or JSX; they must be derived dynamically from the `achievements` array.
2. **Strict Future Year Blocking**: The date filter must never display or navigate to calendar years in the future (`year <= currentCalendarYear`).
3. **Manual Year Picker**: Provide a one-click calendar modal/popover so visitors can jump back 5 or 10 years without clicking 'previous' repeatedly.
4. **Card Presentation**: Each card must strictly display: **Image of achievement**, **Date**, **Title**, **Description**, and **Winners name**.
5. **Contained Highlight System**: Spotlight banner must appear above the stats bar and must not take over the full screen.
6. **No Shared File Modifications**: Absolutely zero modifications to `App.jsx`, `Layout.jsx`, `Navbar.jsx`, `Footer.jsx`, `index.css`, or other module pages.

---

## Verification Checklist

- [x] Dynamic stats calculate total, hackathons, unique students, and national awards accurately.
- [x] Highlight system renders above stats with next and shuffle controls.
- [x] Date filter navigates years and blocks future years.
- [x] Quick year picker opens and selects past years in 1 click.
- [x] Category and Level dropdowns filter cards cleanly.
- [x] Cards render Image, Date, Title, Description, and Winners in exact order.
- [x] `image-specifications.txt` and demo images created in `src/assets/Achievements/`.
- [x] `npm run build` passes with 0 errors and 0 warnings.
- [x] Automated browser verification passed on route `/achievements`.
- [x] Documentation updated across `DATA_SCHEMA.md`, `TASK.md`, and `TEST.md`.