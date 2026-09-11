# AGENTS.md — OUTLOUD Landing Page

This file gives any coding agent (Claude Code, Codex, Cursor, etc.) everything
needed to build the OUTLOUD landing page from scratch, deployed on GitHub
Pages at the custom domain **outloud.cc**. Follow this as the source of truth
for brand, content, and technical decisions — don't invent colors, copy, or
structure not covered here without flagging it.

---

## 1. Project Overview

OUTLOUD is a public speaking and debate club based in Dubai. The core job of
this site is to explain what OUTLOUD is, show the format of a meeting, and
drive people to the application form for the next meeting. A single landing
page covers this fine — but splitting content across a few pages (e.g. a
separate `/events` page for a past/upcoming meetings archive, or `/info` for
extended FAQ/format details) is also fine if it keeps the homepage from
getting too long. Use judgment: if a section starts to feel like it's
padding out the homepage rather than helping someone decide to apply, it's a
candidate for its own page instead.

This is a small, low-traffic community site. Prioritize simplicity,
load speed, and easy editability by non-developers over architectural
sophistication.

---

## 2. Brand Identity

### Colors

| Role | Hex | Usage |
|---|---|---|
| Primary — Indigo | `#2B2D82` | Dominant color. Backgrounds, header/footer, primary buttons. ~60% of visual weight. |
| Secondary — Cyan | `#00C2CB` | Supporting color. Secondary text, links, icons, borders. ~30% of visual weight. |
| Accent — Coral | `#FF6B4A` | Sparingly. CTA buttons, the one thing on screen that should grab attention. ~10% of visual weight. Never use as a dominant background. |
| Text (dark) | `#1B1B29` | Body text on light backgrounds. Not pure black — stays in the indigo family. |
| Background (light) | `#F7F8FC` | Light section backgrounds, cards. |
| Divider (on indigo bg) | `#3D3F95` | Thin dividers/borders on dark sections. |
| Divider (on light bg) | `#CCCCCC` | Thin dividers/borders on light sections. |

Apply the 60/30/10 rule throughout: indigo dominant, cyan supporting, coral
rare and intentional. If coral shows up more than once or twice per screen,
it's being overused.

### Typography

**Montserrat**, loaded from Google Fonts. Weights needed: 500 (Medium), 600
(SemiBold), 700 (Bold), 800 (ExtraBold), 900 (Black).

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800;900&display=swap" rel="stylesheet">
```

Headlines: ExtraBold or Black. Body copy: Regular/Medium. Labels/eyebrows
(small caps-style tags): Bold or ExtraBold with letter-spacing.

### Logo / Wordmark

The OUTLOUD mark is a two-line stacked wordmark, not a circle badge or icon:

- **"OUT"** — smaller, SemiBold, cyan (`#00C2CB`)
- **"LOUD"** — larger, Black weight, coral (`#FF6B4A`), directly below "OUT"

The size jump between the two words is the entire concept: it visually
represents the name itself. There is no circle, ring, or icon around it in
the final logo — any circular outline seen in early drafts was only a
temporary crop-safety guide used while designing social media assets, not
part of the actual mark. Do not add a circle/badge shape around the wordmark
on the website.

Implement this as **real styled text (HTML + CSS), not an image**, wherever
it appears as a wordmark (header, footer, hero) — keeps it crisp at all
screen densities, keeps it accessible/selectable, and keeps it SEO-visible.
Example structure:

```html
<div class="wordmark">
  <span class="wordmark-out">OUT</span>
  <span class="wordmark-loud">LOUD</span>
</div>
```

A single-line version (`OUTLOUD` in one weight/color, used on the LinkedIn
banner) is acceptable for tight horizontal spaces like a mobile nav bar, but
the stacked two-line version is the primary mark and should be used in the
hero section.

### Voice & Tone

Casual, human, specific — never corporate or "AI-sounding." No em dashes in
body copy. No generic hype language ("game-changing," "elevate," "unlock").
Short sentences. Contractions are fine. When in doubt, write like a person
texting a friend, not like marketing copy.

---

## 3. Site Content

Use this copy directly — don't rewrite it unless asked.

### Hero section

Wordmark (stacked OUT/LOUD as described above), then:

> Come say the thing you've been rehearsing in your head. Then stay and meet the room.

Primary CTA button: **Apply now** → links to the Tally application form (see
Section 6, event data — the actual form URL is a configurable value, not
hardcoded copy).

### Mission / About section

> OUTLOUD is a public speaking and debate club based in Dubai, built around one idea: most people have something worth saying, and almost no one gets a low-stakes place to actually say it.
>
> Every session follows the same shape. We open with an icebreaker to get people out of their heads and into the room. Three people get ten minutes each to present on anything they're genuinely into — no set theme, just a topic they actually care about. We close with a live, structured debate: two teams, timed rounds, rebuttals, and a moderator's final call.
>
> We're not a speaking academy and we're not a formal debate league. OUTLOUD is for the people in between — anyone who's had the better idea in a meeting and said nothing, frozen on an easy interview question, or just wants to get louder without needing a stage that feels like a stage.

### Format section

Public-facing summary (use this version on the page):

- **Icebreaker** — 30 minutes to warm up and meet people.
- **3 short talks** — 10 minutes each. This is the presenter's stage — any topic they care about.
- **Live debate** — two teams, structured rounds, a moderator's final call.

Full internal runsheet (include as an optional expandable "see the full
format" detail if there's room — this is real detail, not required, but
adds credibility for people curious about the structure):

1. Icebreaker — 30 min
2. Presentations — 3 presentations, 10 min each
3. Break — 10 min
4. Debate prep — 10 min
5. Debate:
   - Team A first speaker — 3 min
   - Team B first speaker — 3 min
   - 2 min gap for rebuttal prep
   - Team A rebuttal — 3 min
   - Team B rebuttal — 3 min
   - Team A conclusion — 3 min
   - Team B conclusion — 3 min
   - Moderator gives judgment and reasoning — 3 min

### How to Apply section

Three tracks, presented as three equal cards/columns:

- **Present** — "Have something to say? Apply for a speaking slot." (10-minute presentation)
- **Attend** — "Just want to watch and connect? Apply to attend."
- **Debate team** — "Think fast, argue faster. Apply for a spot on a debate team."

CTA button under all three: **Apply here** → Tally form link.

Deadline text is **event-specific and must be driven from the event data
file** (see Section 4) — never hardcode a specific date/time directly in the
HTML, since this repeats every meeting.

Recording consent notice — must appear in this section, visible without
needing to click through:

> By participating in or attending this event, you consent to being recorded for social media.

### Venue / Next Meeting section

Also driven from the event data file. Fields needed: date, time, venue name,
venue address. Current values for reference/testing:

- Date: Thursday, Sept 10
- Time: 7 PM – 9 PM
- Venue: The Hood by Mamahood
- Address: API 1000, Block B, Um Al Sheif, Dubai, UAE

Consider embedding a Google Maps link (not necessarily an embedded iframe —
a simple "Get directions" link out to Google Maps is enough for a page this
size).

### Footer

- Wordmark (small, single-line version is fine here)
- Social links: Instagram, LinkedIn — **actual URLs need to be supplied by
  the club, do not invent handles**
- Short line repeating the recording consent notice
- Simple copyright line, e.g. `© 2026 OUTLOUD`

---

## 4. Technical Requirements

### Stack

Plain **HTML + CSS + vanilla JS**. No framework, no build step, no
bundler. This keeps it trivially deployable on GitHub Pages with zero CI
configuration, and easy for a non-developer to hand-edit later (e.g.
updating the next meeting's date).

If interactivity beyond basic nav/scroll effects is needed later, vanilla JS
is still preferred over introducing a framework for a page this size.

### File structure

```
/
├── index.html
├── CNAME                  ← contains exactly: outloud.cc
├── .nojekyll              ← empty file, see note below
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── data/
│   └── next-event.json    ← see below
├── assets/
│   ├── favicon.png         (or .ico — derive from the OUT/LOUD wordmark)
│   ├── og-image.png         (social share preview image, 1200x630)
│   └── ... any other exported brand images
├── events/                 ← optional, only if a separate events archive page is built
│   └── index.html
└── info/                   ← optional, only if extended FAQ/format detail gets its own page
    └── index.html
```

### Routing / multi-page structure on GitHub Pages

GitHub Pages is plain static file hosting — there's no server-side routing
to configure. For clean URLs on any additional page, use the
folder-with-`index.html` pattern shown above: a file at `events/index.html`
is served at `outloud.cc/events/` automatically. Avoid relying on bare
`.html` files for top-level routes (e.g. `events.html`) if a clean URL
matters, since GitHub Pages won't rewrite `outloud.cc/events` to
`events.html` without Jekyll-style permalink config — the folder+index
pattern avoids that problem entirely and needs no configuration.

Shared elements (nav, footer, brand CSS, the wordmark) should live in the
shared `css/styles.css` and be duplicated in each page's HTML `<head>`/body
structure, since this stack has no templating layer. If the site grows past
2-3 pages and duplication becomes painful, that's the signal to reconsider
(e.g. a lightweight static site generator) — not a requirement to start with
one now.

### Event data as data, not hardcoded HTML

Because the date, time, venue, and application deadline change every
meeting, put these in `data/next-event.json` and load them into the page
with a small JS fetch on page load, rather than hardcoding them in
`index.html`. This means updating for the next meeting is a one-file edit,
not an HTML hunt. Example shape:

```json
{
  "date": "Thursday, Sept 10",
  "timeStart": "7:00 PM",
  "timeEnd": "9:00 PM",
  "venueName": "The Hood by Mamahood",
  "venueAddress": "API 1000, Block B, Um Al Sheif, Dubai, UAE",
  "applyUrl": "https://tally.so/r/REPLACE_WITH_REAL_FORM_ID",
  "applyDeadline": "Monday, Sept 7, 11:59 PM"
}
```

Note: GitHub Pages serves static files, so a `fetch('data/next-event.json')`
works fine client-side with no server needed — JSON is not a restricted file
type. The thing that *can* interfere is that GitHub Pages runs every site
through Jekyll by default unless told otherwise, and Jekyll has its own
file-processing behavior (special handling of underscore-prefixed folders,
default exclude lists, etc.) that has been known to cause static files —
including JSON data files — to not get served as expected, even though
they're committed to the repo.

**Fix: add an empty file named `.nojekyll` at the repository root** (already
shown in the file structure above). This tells GitHub Pages to skip Jekyll
entirely and serve every file exactly as committed, byte for byte. Since
this project has no Jekyll templating, front matter, or `_config.yml`
anyway, there's no downside to disabling it — do this from the start rather
than only if a file mysteriously 404s later.

### Responsiveness & Accessibility

- Mobile-first. Most traffic to a club page like this will be from
  Instagram/LinkedIn bio links opened on phones.
- Maintain WCAG AA contrast — check white text on cyan specifically, since
  cyan is lighter than indigo and has less contrast headroom; increase font
  weight or add a dark text-shadow/backdrop if needed rather than lowering
  the color's saturation.
- All interactive elements (the Apply button especially) need visible focus
  states, not just hover states.
- Real text for the wordmark (per Section 2) rather than an image is itself
  an accessibility and SEO win — keep it that way.
- `alt` text on any images used.

### Performance

- No heavy JS libraries. This page should be near-instant to load.
- Self-host or use Google Fonts' CDN (shown above) rather than bundling font
  files unless load-speed testing says otherwise.
- Compress any exported PNG assets before committing them.

---

## 5. Assets

Existing brand assets already produced (across earlier design work) that
should be reused/adapted rather than redesigned:

- OUT/LOUD wordmark logo — implement as styled text per Section 2, not as an
  image, but a PNG/SVG export may still be useful for the favicon and social
  share image.
- Full brand palette and Montserrat typography, as specified above.
- Instagram/LinkedIn post visuals exist but are not meant for the website —
  they're social-specific; don't reuse those exact compositions as page
  sections, just the underlying brand system (colors/fonts/voice).

If a favicon or Open Graph share image needs generating, base it on the
OUT/LOUD wordmark on an indigo background — consistent with everything else
in the brand.

---

## 6. Deployment — GitHub Pages + outloud.cc

### GitHub Pages setup

1. Repository Settings → Pages → set the source branch (typically `main`,
   root directory).
2. Add a `CNAME` file at the repository root containing exactly:
   ```
   outloud.cc
   ```
   (If the custom domain is instead configured through the repository
   Settings → Pages → "Custom domain" field, GitHub will create/commit this
   file automatically — either approach is fine, don't do both manually in
   conflicting ways.)

### DNS records (configured at the domain registrar for outloud.cc, not in the repo)

Since `outloud.cc` is an apex/root domain (no subdomain), GitHub Pages
requires **A records**, not a simple CNAME, at the apex:

| Type | Host | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| AAAA (optional, IPv6) | @ | 2606:50c0:8000::153 |
| AAAA (optional, IPv6) | @ | 2606:50c0:8001::153 |
| AAAA (optional, IPv6) | @ | 2606:50c0:8002::153 |
| AAAA (optional, IPv6) | @ | 2606:50c0:8003::153 |
| CNAME (recommended) | www | `<github-username>.github.io` |

Setting up the `www` CNAME alongside the apex A records is recommended by
GitHub — `www` subdomains are more stable since they aren't affected by any
future change to GitHub's IP addresses, whereas the apex A records would
need manual updating if that ever happened.

After DNS propagates (can take up to a few hours), enable **"Enforce
HTTPS"** in the repository's Pages settings once it becomes available —
GitHub provisions a TLS certificate automatically once the domain is
verified, but this can take some time after DNS first resolves correctly.

---

## 7. Future Maintenance Notes

- This club runs recurring meetings. Anything meeting-specific (date, time,
  deadline, application link) must live in `data/next-event.json`, never
  hardcoded in HTML, so a non-technical organizer can update it via a simple
  file edit or eventually a small admin form, without touching markup.
- If additional pages get built (`/events`, `/info`, or otherwise), keep them
  in the same plain HTML/CSS/JS stack rather than introducing a framework —
  the whole point of this stack choice is that anyone on the team can edit it
  directly.
