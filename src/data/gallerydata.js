/**
 * ============================================================================
 * Programmers Club — Gallery Data Source
 * ============================================================================
 * Centralized data module for the Event Gallery (`/gallery`).
 *
 * Every photo or video lives inside an EVENT, and every event belongs to a
 * CATEGORY. Adding a new event only requires editing this file — no
 * component code needs to change.
 *
 * HOW TO ADD A NEW EVENT
 * ---------------------------------------------------------------------------
 * 1. Drop the (compressed) image/video into `src/assets/gallery/images`
 *    (or `/videos`).
 * 2. Import it at the top of this file.
 * 3. Add an event object to `GALLERY_EVENTS` with its `media` array.
 *
 * Only categories that currently have at least one event should be listed
 * in GALLERY_CATEGORIES below — add a category back once it has real events.
 * ============================================================================
 */

// LaTeX & Overleaf Workshop — real event photos (Computer Engineering dept, AIKTC)
import latexS1_1 from '../assets/gallery/images/latex-workshop-session1-1.jpg';
import latexS1_2 from '../assets/gallery/images/latex-workshop-session1-2.jpg';
import latexS1_3 from '../assets/gallery/images/latex-workshop-session1-3.jpg';
import latexS1_4 from '../assets/gallery/images/latex-workshop-session1-4.jpg';
import latexS1_5 from '../assets/gallery/images/latex-workshop-session1-5.jpg';
import latexS1_6 from '../assets/gallery/images/latex-workshop-session1-6.jpg';
import latexS1_7 from '../assets/gallery/images/latex-workshop-session1-7.jpg';

import latexS2_1 from '../assets/gallery/images/latex-workshop-session2-1.jpg';
import latexS2_2 from '../assets/gallery/images/latex-workshop-session2-2.jpg';
import latexS2_3 from '../assets/gallery/images/latex-workshop-session2-3.jpg';
import latexS2_4 from '../assets/gallery/images/latex-workshop-session2-4.jpg';
import latexS2_5 from '../assets/gallery/images/latex-workshop-session2-5.jpg';
import latexS2_6 from '../assets/gallery/images/latex-workshop-session2-6.jpg';
import latexS2_7 from '../assets/gallery/images/latex-workshop-session2-7.jpg';

// ---- Real event photos (Jul–Sep 2026) ----------------------------------
// Programmers Club Orientation 2026
import orient26_1 from '../assets/gallery/images/orientation-2026-1.jpg';
import orient26_2 from '../assets/gallery/images/orientation-2026-2.jpg';
import orient26_3 from '../assets/gallery/images/orientation-2026-3.jpg';
import orient26_4 from '../assets/gallery/images/orientation-2026-4.jpg';
import orient26_5 from '../assets/gallery/images/orientation-2026-5.jpg';
import orient26_6 from '../assets/gallery/images/orientation-2026-6.jpg';
import orient26_7 from '../assets/gallery/images/orientation-2026-7.jpg';

// Communiquest
import communiquest_1 from '../assets/gallery/images/communiquest-1.jpg';
import communiquest_2 from '../assets/gallery/images/communiquest-2.jpg';
import communiquest_3 from '../assets/gallery/images/communiquest-3.jpg';
import communiquest_4 from '../assets/gallery/images/communiquest-4.jpg';
import communiquest_5 from '../assets/gallery/images/communiquest-5.jpg';
import communiquest_6 from '../assets/gallery/images/communiquest-6.jpg';
import communiquest_7 from '../assets/gallery/images/communiquest-7.jpg';
import communiquestPoster_1 from '../assets/gallery/images/communiquest-video-poster-1.jpg';
import communiquestVideo_1 from '../assets/gallery/videos/communiquest-video-1.mp4';

// Programmers Club Quiz
import quiz26_1 from '../assets/gallery/images/quiz-2026-1.jpg';
import quiz26_2 from '../assets/gallery/images/quiz-2026-2.jpg';
import quiz26_3 from '../assets/gallery/images/quiz-2026-3.jpg';
import quiz26_4 from '../assets/gallery/images/quiz-2026-4.jpg';

// Programmers Club Interviews
import interview26_1 from '../assets/gallery/images/interviews-2026-1.jpg';
import interview26_2 from '../assets/gallery/images/interviews-2026-2.jpg';
import interview26_3 from '../assets/gallery/images/interviews-2026-3.jpg';
import interview26_4 from '../assets/gallery/images/interviews-2026-4.jpg';

/**
 * Ordered list of gallery categories. "All" is a virtual category handled
 * by the UI and should not be added here.
 */
export const GALLERY_CATEGORIES = [
  'Workshops',
  'Orientation',
  'Coding Contests',
  'Interviews',
];

/**
 * Each event groups related media together for the "Category / Event
 * grouping" requirement. `media[].type` is either 'image' or 'video'.
 * Video items include a `poster` (thumbnail/cover) and a `src` (playable
 * file) so the Lightbox can render a real <video> element.
 */
export const GALLERY_EVENTS = [
  {
    id: 'latex-overleaf-workshop-session-1',
    title: 'LaTeX & Overleaf Workshop — Session 1',
    category: 'Workshops',
    date: '2025-03-19',
    description: 'Hands-on session on academic document typesetting with LaTeX and Overleaf, covering project report structure and formatting.',
    media: [
      { id: 'latex-s1-1', type: 'image', src: latexS1_1, alt: 'LaTeX & Overleaf Workshop Session 1 — Overleaf walkthrough' },
      { id: 'latex-s1-2', type: 'image', src: latexS1_2, alt: 'LaTeX & Overleaf Workshop Session 1 — report template demo' },
      { id: 'latex-s1-3', type: 'image', src: latexS1_3, alt: 'LaTeX & Overleaf Workshop Session 1 — session in progress' },
      { id: 'latex-s1-4', type: 'image', src: latexS1_4, alt: 'LaTeX & Overleaf Workshop Session 1 — hands-on practice' },
      { id: 'latex-s1-5', type: 'image', src: latexS1_5, alt: 'LaTeX & Overleaf Workshop Session 1 — student participation' },
      { id: 'latex-s1-6', type: 'image', src: latexS1_6, alt: 'LaTeX & Overleaf Workshop Session 1 — explaining document structure' },
      { id: 'latex-s1-7', type: 'image', src: latexS1_7, alt: 'LaTeX & Overleaf Workshop Session 1 — Q&A' },
    ],
  },
  {
    id: 'latex-overleaf-workshop-session-2',
    title: 'LaTeX & Overleaf Workshop — Session 2',
    category: 'Workshops',
    date: '2025-03-20',
    description: 'Follow-up session diving deeper into references, formatting, and finalizing mini-project reports in LaTeX.',
    media: [
      { id: 'latex-s2-1', type: 'image', src: latexS2_1, alt: 'LaTeX & Overleaf Workshop Session 2 — full classroom session' },
      { id: 'latex-s2-2', type: 'image', src: latexS2_2, alt: 'LaTeX & Overleaf Workshop Session 2 — students at workstations' },
      { id: 'latex-s2-3', type: 'image', src: latexS2_3, alt: 'LaTeX & Overleaf Workshop Session 2 — guided walkthrough' },
      { id: 'latex-s2-4', type: 'image', src: latexS2_4, alt: 'LaTeX & Overleaf Workshop Session 2 — hands-on formatting practice' },
      { id: 'latex-s2-5', type: 'image', src: latexS2_5, alt: 'LaTeX & Overleaf Workshop Session 2 — mentor assistance' },
      { id: 'latex-s2-6', type: 'image', src: latexS2_6, alt: 'LaTeX & Overleaf Workshop Session 2 — lab overview' },
      { id: 'latex-s2-7', type: 'image', src: latexS2_7, alt: 'LaTeX & Overleaf Workshop Session 2 — closing discussion' },
    ],
  },
  {
    id: 'programmers-club-orientation-2026',
    title: 'Programmers Club Orientation 2026',
    category: 'Orientation',
    date: '2026-07-28',
    description: 'Orientation session introducing students to Programmers Club, with speaker addresses and a certificate handover.',
    media: [
      { id: 'orientation-2026-1', type: 'image', src: orient26_1, alt: 'Programmers Club Orientation 2026 — photo 1' },
      { id: 'orientation-2026-2', type: 'image', src: orient26_2, alt: 'Programmers Club Orientation 2026 — photo 2' },
      { id: 'orientation-2026-3', type: 'image', src: orient26_3, alt: 'Programmers Club Orientation 2026 — photo 3' },
      { id: 'orientation-2026-4', type: 'image', src: orient26_4, alt: 'Programmers Club Orientation 2026 — photo 4' },
      { id: 'orientation-2026-5', type: 'image', src: orient26_5, alt: 'Programmers Club Orientation 2026 — photo 5' },
      { id: 'orientation-2026-6', type: 'image', src: orient26_6, alt: 'Programmers Club Orientation 2026 — photo 6' },
      { id: 'orientation-2026-7', type: 'image', src: orient26_7, alt: 'Programmers Club Orientation 2026 — photo 7' },
    ],
  },
  {
    id: 'communiquest-workshop-2026',
    title: 'Communiquest',
    category: 'Workshops',
    date: '2026-09-03',
    description: 'Workshop session on presentation and communication skills, featuring "Presentation Made Easy".',
    media: [
      { id: 'communiquest-1', type: 'image', src: communiquest_1, alt: 'Communiquest workshop — photo 1' },
      { id: 'communiquest-2', type: 'image', src: communiquest_2, alt: 'Communiquest workshop — photo 2' },
      { id: 'communiquest-3', type: 'image', src: communiquest_3, alt: 'Communiquest workshop — photo 3' },
      { id: 'communiquest-4', type: 'image', src: communiquest_4, alt: 'Communiquest workshop — photo 4' },
      { id: 'communiquest-5', type: 'image', src: communiquest_5, alt: 'Communiquest workshop — photo 5' },
      { id: 'communiquest-6', type: 'image', src: communiquest_6, alt: 'Communiquest workshop — photo 6' },
      { id: 'communiquest-7', type: 'image', src: communiquest_7, alt: 'Communiquest workshop — photo 7' },
      {
        id: 'communiquest-video-1',
        type: 'video',
        src: communiquestVideo_1,
        poster: communiquestPoster_1,
        alt: 'Communiquest workshop — video',
        duration: '0:30',
      },
    ],
  },
  {
    id: 'programmers-club-quiz-2026',
    title: 'Programmers Club Quiz',
    category: 'Coding Contests',
    date: '2026-07-17',
    description: 'Quiz session held in the computer lab, with participants answering on-screen.',
    media: [
      { id: 'quiz-2026-1', type: 'image', src: quiz26_1, alt: 'Programmers Club Quiz — photo 1' },
      { id: 'quiz-2026-2', type: 'image', src: quiz26_2, alt: 'Programmers Club Quiz — photo 2' },
      { id: 'quiz-2026-3', type: 'image', src: quiz26_3, alt: 'Programmers Club Quiz — photo 3' },
      { id: 'quiz-2026-4', type: 'image', src: quiz26_4, alt: 'Programmers Club Quiz — photo 4' },
    ],
  },
  {
    id: 'programmers-club-interviews-2026',
    title: 'Programmers Club Interviews',
    category: 'Interviews',
    date: '2026-07-20',
    description: "Interview sessions conducted as part of the club's selection process.",
    media: [
      { id: 'interviews-2026-1', type: 'image', src: interview26_1, alt: 'Programmers Club Interviews — photo 1' },
      { id: 'interviews-2026-2', type: 'image', src: interview26_2, alt: 'Programmers Club Interviews — photo 2' },
      { id: 'interviews-2026-3', type: 'image', src: interview26_3, alt: 'Programmers Club Interviews — photo 3' },
      { id: 'interviews-2026-4', type: 'image', src: interview26_4, alt: 'Programmers Club Interviews — photo 4' },
    ],
  },
];

/**
 * Flattened list of every media item across all events, each carrying a
 * reference back to its parent event. This is what powers the grid and the
 * Lightbox's next/previous navigation.
 */
export const GALLERY_MEDIA = GALLERY_EVENTS.flatMap((event) =>
  event.media.map((item) => ({
    ...item,
    eventId: event.id,
    eventTitle: event.title,
    category: event.category,
    date: event.date,
  }))
);
