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
- **New splash section**: fullscreen hero with parallax scrolling. The title is split into a kicker and a headline (`common.yml`), followed by a gradient bar with social links.
  - The kicker is only shown from `lg` up (and not on landscape phones).
  - The title gets a marker-style highlight: a single box around both lines while the kicker is shown, one highlight per line otherwise.
  - Landscape phones (`screen-phone-landscape`) get a reduced splash: smaller single-line headline, and the social bar becomes a decorative line without links.
  - Social links are kept to a single line; links that don't fit are hidden.
- **Collapsing navbar**: fixed navbar that collapses on scroll (controlled via `IntersectionObserver` in `script.js`), with slide-in animation.
- **Mobile menu**: below `$width-navbar-collapse` (700px) the navbar tabs collapse into a hamburger toggle. The menu slides down from the top like a sheet of paper, with the navbar hanging from it as a pull tab, over a fading gray backdrop. It closes on toggle, outside click or navigation, and when it stops being rendered (`ResizeObserver` in `script.js`, e.g. after rotating the device).
- **Timeline section**: vertical timeline on mobile, zigzag with overlapping entries from `md` up. The line and dots share a single brand gradient.
- **Skills section**: one card per category in a 2x2 grid (single column below `md`), with a gradient border, a slanted highlight on the category title and the skills as an inline list separated by bullets.
- **Section types**: `section-text-statement`, `section-text-block`, `section-text-split`, `section-text-grid`, `section-timeline`, `section-skills`, `section-card-grid`, `section-contact`.
- **SCSS foundation files**:
  - `_colors.scss`: palette and brand gradients, including the solid gradient endpoints shared by the timeline and the skills titles.
  - `_layout.scss`: breakpoints, z-index, grid, container, and the responsive mixins. Breakpoint ranges have exclusive upper bounds, so adjacent ranges don't overlap. Also defines the navbar collapse width, aspect-ratio mixins (`screen-ratio-*`), `screen-phone-landscape` and the shared max widths for narrow content blocks (`$content-max-width--*`).
  - `_animations.scss` (transition times, keyframe mixins), `_typography.scss` (typography mixins), `_mixins.scss` (link, paragraph), `_themes.scss` (section color themes).
- **Consolidated data**: `common.yml` centralises navbar, splash, and footer strings. Social/contact data lives in `_data/en/social.yml`. Section content lives in page front matter.
- **Removed**: `_layouts/about.html`, `pages/about-en.html`, `_includes/_sections/header.html`, old component files (inlined into sections), `_variables.scss`, `_base.scss`, `_nav/` directory, `_syntax-highlighting.scss`.

## TODOs

### Placeholders

1. **`_includes/section-navbar.html`** — The mobile menu toggle uses Font Awesome's `fa-bars` as a placeholder icon.

2. **`_includes/doc-head.html`** — Font Awesome is loaded from cdnjs; replace it with a personalised Font Awesome kit.

### Commented-out code blocks

3. **`_includes/section-navbar.html:8-10`** — Commented-out avatar image in the navbar.

4. **`_includes/section-navbar.html:65-85`** — Old splash section HTML left inside a `{% comment %}` block.

5. **`_includes/section-footer.html:6-40`** — Old footer navigation (back-to-top link, nav tabs) wrapped in `{%comment%}`.

6. **`_includes/doc-head.html`** — Commented-out blocks: dynamic CSS file loop, RSS XML link.

7. **`_data/en/portfolio.yml`** — Six portfolio projects and the entire `repositories` section are commented out.

8. **`_data/en/navigation.yml`** — The `url` field is commented out on all nav items. Navigation currently works via anchor links only.

9. **`_data/en/social.yml`** — Commented-out Twitter and email link entries.

### Layout

10. **Sections** — Fix the vertical padding between consecutive sections that share the same color.

### Content

11. **Skills section** — See how to include SEO / GEO / marketing technologies / attribution, perhaps along with soft skills such as communication, teamwork, etc.

12. **Projects section** — Update the projects list:
    - Include the MTG proxy generator, with a "Coming soon" notice.
    - Include the Milight bridge repo.
    - Exclude ChatSockets and the OGame calculator.
    - Check other repos worth including.
    - Fix the project grid on mobile, and improve the cards rendering.

13. **Socials (contact section)**:
    - Replace the Wizards logo with Moxfield's, and update the description.
    - Remove the grow animation; keep fading out the other links and highlighting the current one (ensure it works properly).
    - Add an underline to the email, making sure the colors are different enough.
    - Fix the grid on tablet viewports.

14. **"Get to know me" section** — Finish it, either:
    - A) "Get to know me" + subtitle + a 3-item text grid with personality claims, or
    - B) Another text-split component with a headline and a 2-paragraph body.

15. **Footer** — Simplify it: remove the Jekyll and GitHub Pages mentions unless required by their licenses.

16. **Trajectory section** — Consider adding an education section.

## Bugs and issues

### Wrong social link

- **`_data/en/social.yml`** — The Instagram entry points to `https://github.com/ClockworkAdriem` (a GitHub URL), not an Instagram profile.

### Outdated URLs

- **`_config.yml`** — Site URL uses `http://adriem.me` instead of `https://`.
- **`_data/en/common.yml`** — Footer "Powered by" links use `http://` for Jekyll and GitHub Pages.

### Mobile viewport height

- **`_sass/_parallax.scss`, `_sass/_sections/_splash.scss`** — `.parallax`, `.parallax__group` and `.splash` use `height: 100vh`. On iOS Safari and Android Chrome, `100vh` is the viewport height with the browser toolbars hidden, but since the page scrolls inside `.parallax` (not the document) the toolbars never collapse. The splash bottom (social bar, scroll arrow) and the end of the page may end up hidden behind the toolbars. Likely fix: `100svh` / `100dvh`.

## To review

### Short laptop viewports

- **Splash** — On short landscape viewports (1366×768 / 1280×720 minus browser chrome, ~600–650px tall), check that the title (kicker + headline) plus the 20vh social margin and scroll arrow fit without the title sliding under the fixed navbar.

### Larger default font size / browser zoom

- **Global** — Font sizes, paddings and spacing are in `rem`, but breakpoints are in `px`. With a larger default font size (e.g. 20px) or 125–150% zoom, each breakpoint applies with bigger text than it was designed for. Check the splash title wrapping and the navbar tabs fitting before the 700px collapse.

### Timeline width on narrow viewports

- **`_sass/_sections/_timeline.scss`** — Wrapped text can't shrink its box, so the timeline may still leave some empty space at the right of the entries. `text-wrap: pretty` and the narrower max widths reduce it; measuring the widest line with JS would be the exact fix if it's still noticeable.
