# Personal Homepage — Design Spec

**Owner:** Yong-Qiang Tan (谭永强)
**Date:** 2026-11-18
**Repo:** `tansor.github.io` (GitHub Pages, `master` serves the site)

## 1. Goal

Replace a 2017-era Hexo blog with a fast, single-page personal homepage that presents a
research-to-industry computer-vision profile: publications, work history, and a clear
point of view.

**Audience:** researchers and engineers who look the person up after a paper, a talk, or
a collaboration; recruiters for senior algorithm roles; former colleagues.

**Success criteria**

- The page loads in under a second on a phone and needs no build step.
- A reader understands, within the first screen, what the person works on and why it matters.
- Publications are verifiable and one click away from the source.
- Nothing on the page is fabricated: every claim maps to information the owner supplied.

## 2. Positioning

The profile is **computer vision across research and production**, not a single research
direction. The record supports this without needing a thesis about one specialty:

- ECCV 2020 — salient object detection with 100K parameters.
- CVPR 2020 — VecRoad, road graphs from point-based iterative exploration (first author).
- TPAMI 2021 — efficient models and the semantics of salient object detection.
- 2021–2023 — content moderation and computer vision at Tencent YouTu Lab.
- 2023–now — 3D Gaussian Splatting, LLM engineering, and visual understanding at Dewu.

Hero statement: *"Computer vision, from research to production."* The efficiency of the
published models is evidence, not a claimed research area — the page must not present
"Efficient Vision" as a dedicated focus.

## 3. Content model

| Section | Content | Source |
|---|---|---|
| Header | Dice mark + full name; anchor nav | — |
| Hero | Eyebrow (Shanghai · role), name, positioning statement | owner |
| 01 About | 2–3 sentence bio + three focus areas | owner |
| 02 Work | Three 3DGS footwear assets, cropped from app screenshots to a shared 3:4 frame, with a one-line caption | owner |
| 03 Publications | 3 papers: year, title, venue, authors, citation count, first-author marker; whole row links to the publisher page, with separate PDF and code links; paper figure as a faint background | Publisher pages, PDFs, GitHub |
| 04 Experience | 4 entries: years, organization, role, focus, city; institution logo as a colored background | owner |
| 05 Contact | Invitation line, email, Scholar | owner |
| Footer | Copyright, location, last-updated date | — |

No blog, no archive, no search. The old Hexo output is removed.

## 4. Visual system — "Swiss Index"

Reference direction: Swiss editorial grid, not a template.

**Type**

- UI/body: Inter (fallback `-apple-system`, Helvetica Neue, Arial).
- Meta/labels/numerals: JetBrains Mono (fallback `ui-monospace`, SFMono).
- Name: `clamp(46px, 6.6vw, 76px)`, weight 500, tracking `-0.055em`, two lines.
- Hero statement: `clamp(19px, 2.1vw, 23px)`, weight 400, line-height 1.45.
- Section titles: mono, 10px, uppercase, tracking `0.16em`.
- Body: 14px/1.6; secondary text 13.5px.

**Color**

| Token | Value | Use |
|---|---|---|
| `--ink` | `#0A0A0A` | Primary text, rules |
| `--accent` | `#1733E0` | Year numerals, links, active states, dice |
| `--muted` | `#5A5A5A` | Body secondary |
| `--faint` | `#6B6B6B` | Small meta text (meets 4.5:1 on white) |
| `--rule` | `#EDEDED` | Hairlines |
| `--bg` | `#FFFFFF` | Page |

**Layout**

- Content max-width 1180px, horizontal padding `clamp(24px, 5vw, 64px)`.
- Desktop: `150px | 1fr` grid — sticky numbered index on the left, content on the right.
- Hairline rule above every section; no cards, shadows, or rounded containers.

## 5. Components

- **Header** — 76px tall, 1px black bottom rule. Brand left; nav right in mono caps.
  Active nav item marked with a small accent dot. Nav hidden below 780px.
- **Index rail** — 01–04, sticky, active item in ink while others are faint. Hidden below 780px.
- **Hero** — eyebrow, two-line name, positioning statement, then a compact meta row.
- **About** — text column plus a "Focus" column listing three current areas with one line each.
- **Work gallery** — three images in a hairline-gapped row, each a 3:4 crop of a Dewu 3D Space
  screenshot with the app chrome removed. On mobile the row becomes a full-bleed horizontal
  scroller with scroll snapping. A caption names the technique and the product.
- **Publication figure background** — each row uses its own paper figure in full color at low
  opacity, scaled to the row's full height (`auto 100%`, no cropping) and pinned to the right
  edge, where it may overlap the citation column. Opacity 30% on desktop, 40% on hover. The two
  saliency papers share the gOctConv diagram; VecRoad uses a single aerial panel to avoid seams.
  Hidden on mobile and in print.
- **Experience logos** — each row carries its institution mark in the right margin, centered on
  a common vertical axis inside a fixed 150px column. Marks are de-backgrounded to transparent
  PNG, keep their brand colors, and are normalized to one 46px height with per-mark opacity.
  Hidden on mobile and in print.
- **Per-paper links** — a stretched link on the title opens the publisher page (Springer/IEEE);
  the row behaves as a single target. PDF and Code sit as independent icon links above the
  overlay so they keep their own destinations.
- **Profile links** — Google Scholar, DBLP, and ORCID are grouped in the publications header and
  repeated in the contact row.
- **Publication row** — `year | title + venue + authors | citations`. Whole row is a link;
  hover moves an arrow and underlines the title. First-author marker in accent.
- **Experience row** — `years | organization + role | city`, separated by hairlines.
- **Contact** — one large invitation sentence, then email and Scholar links; email copies
  to clipboard on click with a short confirmation.
- **Footer** — copyright and last-updated, mono 9px.

## 6. Behavior

- Anchor navigation with smooth scroll; respects `prefers-reduced-motion`.
- Scroll-spy: a throttled scroll listener marks the section whose top has passed 35% of
  the viewport; at the true bottom of the page the last section is marked. Implemented with
  a `requestAnimationFrame` guard rather than an observer so the bottom edge behaves.
  The page carries extra bottom whitespace after the footer so the final section can reach
  the spy line without the previous section staying highlighted.
- Copy-email button announces "Copied" for 1.5s and sets `aria-live`.
- No JavaScript required for reading: every section is static HTML; JS only enhances.
- One transition per element, 120–160ms, ease-out. No parallax, no scroll-jacking.

## 7. Responsive

- ≤780px: index rail and nav removed; content becomes one column; name scales down;
  publication rows collapse to year + body, citations move under the authors.
- ≥781px: two-column grid as described.
- Tested at 375px, 768px, 1280px, 1600px.

## 8. Accessibility & quality

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), one `h1`.
- Skip link to main content.
- Contrast: all small text ≥ 4.5:1; focus-visible outlines 2px accent.
- `lang="en"`, descriptive `alt`/`aria-label` on the mark and links.
- Print stylesheet: white background, no nav/index, links shown in full.

## 9. Performance

- Three static files plus an SVG favicon; no framework, no webfont library beyond two
  Google Fonts families with `display=swap` and preconnect.
- Target: < 60KB transferred excluding fonts, no layout shift.

## 10. Files

```
index.html                    new single page
assets/style.css              design system + layout
assets/main.js                scroll-spy, copy-email (progressive enhancement)
assets/favicon.svg            redrawn dice mark
assets/apple-touch-icon.png   full-bleed icon for iOS
assets/gconv.png              gOctConv diagram, used behind both saliency papers
assets/vecroad-bg.jpg         single VecRoad aerial panel, used behind the CVPR row
assets/logo-dewu.png          Dewu mark, transparent, color
assets/logo-tencent.png       Tencent mark, transparent, color
assets/logo-nankai.png        Nankai mark, transparent, color
assets/logo-xidian.png        Xidian mark, transparent, color
assets/work-shoe-white.jpg    3DGS footwear asset (Dewu app screenshot, cropped)
assets/work-shoe-black.jpg    3DGS footwear asset (Dewu app screenshot, cropped)
assets/work-shoe-blue.jpg     3DGS footwear asset (Dewu app screenshot, cropped)
.gitignore                    ignores .superpowers/ and .DS_Store
docs/superpowers/specs/       this document
```

Removed: `2017/`, `about/`, `archives/`, `css/`, `images/`, `js/`, `lib/`, `tags/`,
`uploads/`, `favicon.ico`, old `index.html`. Git history retains them.

## 11. Out of scope

- Blog, CMS, search, comments, analytics, dark mode, i18n toggle.
- A real portrait photograph (owner prefers the dice mark).
- Custom domain, deployment changes.

## 12. Verification

- Open the page at four widths and screenshot each.
- Keyboard-only pass: skip link, nav, publication links, email copy.
- Check every outbound link resolves to the right paper.
- Confirm no horizontal scroll at 320px.
