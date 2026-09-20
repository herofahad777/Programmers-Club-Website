# DATA SCHEMA — Achievements Module

- **Module Route**: `/achievements`
- **Page Component**: `src/pages/Achievements.jsx`
- **Data File**: `src/data/achievements.json`
- **Assets Location**: `src/assets/Achievements/` (Specifications in `image-specifications.txt`)

---

## Top-Level Structure

```json
{
  "achievements": [ ... ],
  "gallery": [ ... ]
}
```

| Field          | Type     | Required | Description                                                         |
| :------------- | :------- | :------- | :------------------------------------------------------------------ |
| `achievements` | Array    | Yes      | List of achievement records (drives cards, stats, and highlights)   |
| `gallery`      | Array    | Yes      | List of gallery/certificate memorabilia images                      |

> **Note on Statistics**: Statistics (`totalAchievements`, `hackathonWins`, `studentsRecognized`, `nationalAwards`) are **calculated dynamically** at runtime from the `achievements` array to eliminate stale data.

---

## Achievement Record

```json
{
  "id": 1,
  "title": "[DEMO] Smart India Hackathon 2025 — Grand Finale Finalists",
  "date": "October 2025",
  "year": 2025,
  "category": "Hackathon",
  "level": "National",
  "description": "Selected among top teams nationally in SIH 2025 under the Ministry of Education problem statement, developing an AI-driven student mentorship platform.",
  "winners": ["Student A (Leader)", "Student B", "Student C", "Student D"],
  "image": "demo-sih-2025.svg",
  "featured": true,
  "demo": true
}
```

| Field         | Type     | Required | Default | Constraints / Notes                                                        |
| :------------ | :------- | :------- | :------ | :------------------------------------------------------------------------- |
| `id`          | number   | Yes      | —       | Unique integer ID. No duplicates across array.                             |
| `title`       | string   | Yes      | —       | Official title of the achievement or honor.                                |
| `date`        | string   | Yes      | —       | Readable date string, e.g. `"October 2025"` or `"2025-10-15"`.             |
| `year`        | number   | Yes      | —       | 4-digit calendar year (e.g. `2025`). Must be `<= currentYear`.             |
| `category`    | string   | Yes      | —       | Must match one of the **allowed categories**.                              |
| `level`       | string   | Yes      | —       | Must match one of the **allowed levels**.                                  |
| `description` | string   | Yes      | —       | 1–3 sentence summary of the accomplishment or project.                     |
| `winners`     | string[] | Yes      | `[]`    | Array of winner / team member names. Empty indicates individual award.    |
| `image`       | string   | No       | `""`    | Filename in `src/assets/Achievements/` (see image specifications guide).   |
| `featured`    | boolean  | No       | `false` | If `true`, eligible for the top **Highlight Spotlight** system.            |
| `demo`        | boolean  | No       | `false` | Set to `true` while placeholder records are displayed.                    |

### Allowed Categories

| Value                      | Use For                                          |
| :------------------------- | :----------------------------------------------- |
| `Hackathon`                | Hackathon competitions, hackfests, and prizes    |
| `Competitive Programming`  | ICPC, IEEE Xtreme, LeetCode, CodeChef, and CP    |
| `Research`                 | Research symposiums and conference presentations |
| `Publication`              | Published papers, journal articles, and preprints|
| `Patent`                   | Filed or granted provisional/complete patents    |
| `Open Source`              | Merged pull requests and OSS recognitions        |
| `Workshop`                 | Certifications, bootcamps, or technical summits  |
| `Other`                    | Miscellaneous recognitions                       |

### Allowed Levels

| Value            | Scope                                                  |
| :--------------- | :----------------------------------------------------- |
| `College`        | Intra-college or department-level achievements         |
| `District`       | City / district / university zonal level competitions  |
| `State`          | State-level hackathons and technical festivals         |
| `National`       | National-level competitions, SIH, AICTE symposiums    |
| `International`  | Global hackathons (HackMIT, IEEE Xtreme, Google Devs)  |

---

## Image Specifications & Asset Linking

Images are located in:
```
src/assets/Achievements/
├── image-specifications.txt   <-- Technical guidelines
├── demo-sih-2025.svg
├── demo-ieee-2024.svg
├── demo-research-2024.svg
└── ...
```

- **In `achievements.json`**: Reference by filename only (e.g. `"image": "demo-sih-2025.svg"` or `"image": "sih-2025.webp"`).
- **Resolver**: The application imports images dynamically using Vite's `import.meta.glob`.
- **Card Aspect Ratio**: 16:9 widescreen orientation recommended (1200 × 675 px).
- **Graceful Fallback**: If `image` is empty or fails to load, a fallback banner is displayed without breaking card alignment.

---

## Gallery Item

```json
{
  "id": 1,
  "title": "[DEMO] SIH 2025 Grand Finale Presentation",
  "image": "",
  "year": 2025
}
```

| Field   | Type   | Required | Constraints / Notes                                |
| :------ | :----- | :------- | :------------------------------------------------- |
| `id`    | number | Yes      | Unique within the gallery array.                   |
| `title` | string | Yes      | Caption / alt text for the memorabilia image.      |
| `image` | string | No       | Filename in assets or URL. Fallback UI provided.   |
| `year`  | number | Yes      | 4-digit year.                                      |

---

## Validation Rules

1. **Strict Year Boundary**: `year` must be `<= current calendar year`. Future years are disallowed.
2. **Dynamic Stats Safety**: `winners` roster should list names cleanly to ensure accurate unique student counting.
3. **Card Rendering Contract**: Every card renders in order: **Image → Date → Title → Description → Winners name**.
4. **Spotlight Selection**: Top highlight system selects from items with `featured: true` or falls back to pool.