# Redesign — WIP Status

This document describes the current state of the `redesign` branch compared to `master`, including all known incomplete work, TODOs, and issues.

## Overview

The redesign replaces the old single-page layout (header + project list + contact) with a new section-based architecture. Pages are now composed from reusable, data-driven components rendered via a generic `section.html` include. A new fullscreen splash hero, a collapsing fixed navbar, and a component-based section system have been introduced.

## Architecture changes

### Old (master)

- Static `header.html` section with brand and navigation
- `about.html` layout for a dedicated about page
- `home.html` layout with inline section markup
- Contact and footer data in `_data/en/contact.yml` and `_data/en/footer.yml`

### New (redesign)

- **Generic section system**: `section.html` iterates over a section's YAML keys and dynamically includes a matching `_components/<key>.html` for each one. Sections are declared in the page front matter (`pages/home-en.html`).
- **New splash section**: fullscreen hero with avatar image, greeting text, and social links, with parallax scrolling.
- **Collapsing navbar**: fixed navbar that collapses on scroll (controlled via `script.coffee`).
- **New components**: `section-title`, `text-block`, `paragraph-grid`, `social-grid`, `email-notice`, `project-grid`.
- **Consolidated data**: `common.yml` centralises navbar, splash, and footer strings. Per-section data lives in `_data/en/sections/<section-name>.yml`.
- **Removed**: `_layouts/about.html`, `pages/about-en.html`, `_includes/_sections/header.html`, `_includes/_components/project.html`, `_includes/_components/repository.html`.

## TODOs

### Explicit TODO comments

1. **`_sass/_section.scss:15`** — `// Fonts -- TODO: Extract`
   Font variables are defined inline inside `.section`. They should be moved to `_variables.scss`.

2. **`_sass/_nav/_header.scss:71`** — `// TODO FIX THIS`
   Mobile padding for the old header. The entire file is commented out (155 lines) and is dead code — it can likely be deleted.

### Placeholder / dummy content

3. **`_data/en/sections/home-facts.yml`** — The `paragraph-grid` entries ("code.", "learn.", "play.") contain placeholder text: *"I likez cln code cuz cln code is graet"* repeated across all three items. The `text-block` section repeats *"I am one with the code"*. All of this needs real copy.

4. **`_data/en/sections/home-pics.yml`** — `text-block.pargraphs` is an empty array `[]`. The commented-out `instagram-feed` component below it was never implemented. This section currently renders with a title ("My life in pictures") but no content.

5. **`_data/en/sections/home-motto.yml`** — References "currently working for Building Blocks Spain" and "finish my engineering studies" — likely outdated and needs updating.

### Empty stylesheets

6. **`_sass/_components/_email-notice.scss`** — 0 bytes. The `email-notice` component has no styles.
7. **`_sass/_components/_navbar-animations.scss`** — 0 bytes. Created but never filled in. Not imported anywhere.

### Commented-out code blocks

8. **`_sass/_nav/_header.scss`** — The entire file (155 lines) is commented out. It contains the old header styles that were replaced by `_components/_navbar.scss`. Should be deleted.

9. **`_includes/_sections/navbar.html:8-10`** — Commented-out avatar image in the navbar.

10. **`_includes/_sections/navbar.html:44-64`** — Old splash section HTML left inside a `{% comment %}` block.

11. **`_includes/_sections/footer.html:6-40`** — Old footer navigation (back-to-top link, nav tabs) wrapped in `{%comment%}`.

12. **`_layouts/default.html:11`** — Old contact section include commented out: `{%comment%}{% include _sections/contact.html %}{%endcomment%}`.

13. **`_includes/head.html`** — Multiple commented-out blocks: old Font Awesome CSS links (lines 28-40), dynamic CSS file loop (lines 51-58), RSS XML link (lines 66-71).

14. **`_data/en/portfolio.yml`** — Six portfolio projects and the entire `repositories` section are commented out.

15. **`_data/en/navigation.yml`** — The `url` field is commented out on all nav items (home, about, projects). Navigation currently works via anchor links only.

16. **`_data/en/social.yml:22-29`** — Commented-out email link entry and alternative email markup.

### Deprecated code

17. **`_sass/_base.scss:18-22`** — The `#who-am-i` rule is marked `// deprecated`. It styled the old about page which has been removed.

## Bugs and issues

### Wrong social link

- **`_data/en/social.yml:11-13`** — The Instagram entry points to `https://github.com/ClockworkAdriem` (a GitHub URL), not an Instagram profile.

### Insecure resource loading

- **`_includes/head.html:76`** — jQuery is loaded over `http://` instead of `https://`, which will be blocked on HTTPS pages or trigger mixed-content warnings.

### Outdated URLs

- **`_config.yml:6`** — Site URL uses `http://adriem.me` instead of `https://`.
- **`_data/en/common.yml:11`** — Footer "Powered by" links use `http://` for Jekyll and GitHub Pages.

### Duplicate variable definition

- **`_sass/_components/_navbar.scss:18-19`** — `$navbar-tab__font--desktop` is defined twice; the second value silently overrides the first.

### CSS typo

- **`_sass/_section.scss:147`** — `section--border-botttom` has three t's.

### Copyright year

- **`_data/en/common.yml:9`** — Copyright notice says `2016-2018`.

### Unused old contact section

- **`_includes/_sections/contact.html`** — References `site.data[page.language].contact`, but `_data/en/contact.yml` was deleted. This file is currently commented out in `default.html` but would break if re-enabled. The new contact section uses the generic section system with `_data/en/sections/contact.yml` instead.
