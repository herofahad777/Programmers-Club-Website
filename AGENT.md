# AGENT

Project:
Programmers Club Official Website (AIKTC)

Assigned Module:
src/pages/Achievements.jsx (Route: `/achievements`)

You are responsible ONLY for the Achievements module.

---

## Required Reading

Before performing any task read:

1. docs/achievement/DESIGN.md
2. docs/achievement/TASK.md
3. docs/achievement/TEST.md
4. docs/achievement/DATA_SCHEMA.md
5. docs/achievement/PROGRESS.md

---

## Allowed Modifications

You may create or modify:

src/pages/Achievements.jsx

src/components/achievements/**

src/data/achievements.json

assets used by the achievements page

---

## Forbidden Modifications

Do NOT modify:

src/App.jsx
src/main.jsx
src/index.css

Navbar.jsx
Footer.jsx
Layout.jsx

Any page assigned to another team member.

If a change outside the Achievements module is required,
stop and explain why.

---

## Project Rules

The website currently has:

- No backend
- No database
- No authentication

Use local JSON files for content.

Design with future API integration in mind.

---

## Architecture Rules

Content must never be hardcoded inside JSX.

All achievement records must come from:

src/data/achievements.json

Components should be reusable.

Keep presentation separate from data.

---

## Design Rules

Follow official PC theme.

Primary:
#7bc142

Background:
#0b0b0f

Surface:
#151519

Border:
#2a2a30

Typography:
Poppins + Montserrat

Maintain visual consistency with existing PageHeader.

---

## Development Workflow

1. Read all docs in `docs/achievement/`.
2. Create implementation plan.
3. Build reusable components.
4. Connect components to JSON data.
5. Run automated browser test on route `/achievements` to verify changes.
6. Document manual test steps & results in `docs/achievement/TEST.md`.
7. Update `docs/achievement/PROGRESS.md`.

---

## Testing & Verification Protocol

When a TASK is completed, the AI must strictly follow this two-stage verification process:

### 1. Automated Browser Test (AI-Executed)
- The AI must launch the dev server (`npm run dev`) and test in the browser.
- Verify that the target route `/achievements` (`http://localhost:5173/achievements`) loads cleanly without blank screens or crashes.
- Inspect the browser console to confirm zero `console.error` or unhandled exceptions.
- Interact with updated elements (clicks, filters, toggles, hover states) to confirm functional correctness.
- Validate responsiveness across standard viewports (375px mobile, 768px tablet, 1440px desktop).

### 2. Manual Test Documentation (`docs/achievement/TEST.md`)
- The AI must update `docs/achievement/TEST.md` with a dedicated manual testing guide for human reviewers.
- Document exact, step-by-step instructions to test what was changed:
  - Which route/URL to open (`http://localhost:5173/achievements`)
  - Specific components or elements to visually inspect
  - Specific actions/interactions to execute (what to click, hover, filter)
  - Expected visual and functional behavior for each step
  - Edge cases, responsive checks, or empty states to test manually

---

## Placeholder Data

Verified achievement records are not yet available.

Use clearly marked placeholder/demo records.

Never present demo data as real achievements.

---

## Definition Of Done

- PlaceholderCard removed
- JSON-driven architecture
- Responsive layout
- Accessible UI
- Build passes (`npm run build`)
- No console errors
- Matches PC theme
- Automated browser test passed on route `/achievements`
- Manual test steps added to `docs/achievement/TEST.md`