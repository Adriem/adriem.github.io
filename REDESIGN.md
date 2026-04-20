# Redesign — WIP Status

This document describes the current state of the `redesign` branch compared to `master`, including all known incomplete work, TODOs, and issues.

## Overview

The redesign replaces the old single-page layout (header + project list + contact) with a new section-based architecture. Pages are composed from reusable, data-driven section includes. A fullscreen splash hero, a collapsing fixed navbar, and a component-based section system have been introduced.

## Architecture changes

### Old (master)

- Static `header.html` section with brand and navigation
- `about.html` layout for a dedicated about page
- `home.html` layout with inline section markup
- Contact and footer data in `_data/en/contact.yml` and `_data/en/footer.yml`

### New (redesign)

- **Section-based layout**: `home.html` layout composes the page from section includes (`section-*.html`). Section content is defined in the page front matter (`pages/home-en.html`), passed as parameters to sections.
- **New splash section**: fullscreen hero with greeting text and social links, with parallax scrolling.
- **Collapsing navbar**: fixed navbar that collapses on scroll (controlled via `IntersectionObserver` in `script.js`), with slide-in animation.
- **Section types**: `section-text-block`, `section-text-statement`, `section-text-split`, `section-timeline`, `section-skills`, `section-card-grid`, `section-contact`.
- **SCSS foundation files**: `_colors.scss` (palette), `_layout.scss` (breakpoints, z-index, grid, container), `_animations.scss` (transition times, keyframe mixins), `_typography.scss` (typography mixins), `_mixins.scss` (link, paragraph).
- **Consolidated data**: `common.yml` centralises navbar, splash, and footer strings. Social/contact data lives in `_data/en/social.yml`. Section content lives in page front matter.
- **Removed**: `_layouts/about.html`, `pages/about-en.html`, `_includes/_sections/header.html`, old component files (inlined into sections), `_variables.scss`, `_base.scss`, `_nav/` directory, `_syntax-highlighting.scss`.

## TODOs

### Placeholder / dummy content

1. **`pages/home-en.html` — facts section** — The `paragraphs` entries ("code.", "learn.", "play.") contain placeholder text: *"I likez cln code cuz cln code is graet"* repeated across all items. The `summary` section repeats *"I am one with the code"*. All of this needs real copy.

2. **`pages/home-en.html` — about section** — References "currently working for Building Blocks Spain" and "finish my engineering studies" — likely outdated and needs updating.

### Commented-out code blocks

3. **`_includes/section-navbar.html:8-10`** — Commented-out avatar image in the navbar.

4. **`_includes/section-navbar.html:44-64`** — Old splash section HTML left inside a `{% comment %}` block.

5. **`_includes/section-footer.html:6-40`** — Old footer navigation (back-to-top link, nav tabs) wrapped in `{%comment%}`.

6. **`_includes/doc-head.html`** — Multiple commented-out blocks: old Font Awesome CSS links, dynamic CSS file loop, RSS XML link.

7. **`_data/en/portfolio.yml`** — Six portfolio projects and the entire `repositories` section are commented out.

8. **`_data/en/navigation.yml`** — The `url` field is commented out on all nav items. Navigation currently works via anchor links only.

9. **`_data/en/social.yml`** — Commented-out Twitter and email link entries.

### Unimplemented sections

10. **`_includes/section-timeline.html`** — Contains a TODO comment; the timeline/trajectory component is not yet implemented.

11. **`_includes/section-skills.html`** — Contains a TODO comment; the skills grid component is not yet implemented.

## Bugs and issues

### Wrong social link

- **`_data/en/social.yml`** — The Instagram entry points to `https://github.com/ClockworkAdriem` (a GitHub URL), not an Instagram profile.

### Insecure resource loading

- **`_includes/doc-head.html`** — jQuery is loaded over `http://` instead of `https://`, which will be blocked on HTTPS pages or trigger mixed-content warnings.

### Outdated URLs

- **`_config.yml`** — Site URL uses `http://adriem.me` instead of `https://`.
- **`_data/en/common.yml`** — Footer "Powered by" links use `http://` for Jekyll and GitHub Pages.

### CSS typo

- **`_sass/_section.scss`** — `section--border-botttom` has three t's.

### Copyright year

- **`_data/en/common.yml`** — Copyright notice says `2016-2018`.
