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
- **Collapsing navbar**: fixed navbar that collapses on scroll (controlled via `IntersectionObserver` in `script.js`), with slide-in animation. Its tabs (and the mobile menu links) are anchor links to the page sections, defined in `_data/en/navigation.yml` (`label` + `anchor` per entry).
- **Mobile menu**: below `$width-navbar-collapse` (700px) the navbar tabs collapse into a hamburger toggle. The menu slides down from the top like a sheet of paper, with the navbar hanging from it as a pull tab, over a fading gray backdrop. It closes on toggle, outside click or navigation, and when it stops being rendered (`ResizeObserver` in `script.js`, e.g. after rotating the device).
- **Timeline section**: vertical timeline on mobile, zigzag with overlapping entries from `md` up. The line and dots share a single brand gradient.
- **Skills section**: one card per category in a 2x2 grid (single column below `md`), with a pink gradient background, a slanted highlight on the category title and the skills as an inline list separated by bullets (`bullet-list` mixin).
- **Projects section**: bordered cards with a lilac-to-pink background, a gradient separator under the thumbnail, and the project tags as a bullet list. Cards on the same row have equal heights (flex grid), and stack centered on mobile. Projects without a URL render as non-clickable cards; an optional notice (e.g. "Coming soon!") is laid over the thumbnail.
- **Contact section**: social links in a single row of four from `lg` up, two balanced rows of two below it. Hovering or focusing a link dims the others (a single color transition, like the navbar tabs; the links have no gaps between them so the effect doesn't flicker). The email link is underlined.
- **AI stance section** (`#ai-stance`, front matter `ai_stance`, formerly "my philosophy"): text split with a headline and a two-paragraph body.
- **Work ethics section** (`#work-ethics`, front matter `work_ethics`, "How I work", formerly "fun facts" / "Get to know me"): text grid whose body mixes paragraphs and a bullet list (`list:` items in the page front matter).
- **Collapsible text**: on single-column viewports (below `md`), the text split body and everything after the first paragraph of a text block collapse behind a "read more / show less" button with an animated chevron (`collapsible` mixin, CSS only). Body paragraphs share the `body-paragraph` mixin: same spacing, pretty wrapping, justified (left-aligned below `md`).
- **Hosting and URLs**: served by GitHub Pages at `https://adriem.me` (`url` in `_config.yml` is `https://`), built and deployed by a GitHub Actions workflow (`.github/workflows/pages.yml`) on every push to `master`. It uses the same toolchain as local development (Jekyll 4 and Dart Sass from the `Gemfile`, Ruby from `.ruby-version`); GitHub's classic branch builds use Jekyll 3 and LibSass, which order the compiled CSS rules differently. Local assets are linked with `relative_url` (root-relative, protocol-independent, so they can't become blocked mixed content) and the canonical link with `absolute_url`; nothing depends on the build-time `site.github.url` anymore. Project docs (`README.md`, `REDESIGN.md`) are excluded from the build.
- **Fonts**: a single family (Montserrat) in three weights (300, 400, 700), loaded with the Google Fonts `css2` API (`display=swap`, with `preconnect`) in `doc-head.html`. Italics are synthesized by the browser.
- **Section types**: `section-text-statement`, `section-text-block`, `section-text-split`, `section-text-grid`, `section-timeline`, `section-skills`, `section-card-grid`, `section-contact`.
- **SCSS foundation files**:
  - `_colors.scss`: palette and brand gradients, including the solid gradient endpoints shared by the timeline and the skills titles.
  - `_layout.scss`: breakpoints, z-index, grid, container, and the responsive mixins. Breakpoint ranges have exclusive upper bounds, so adjacent ranges don't overlap. Also defines the navbar collapse width, aspect-ratio mixins (`screen-ratio-*`), `screen-phone-landscape`, the shared max widths for narrow content blocks (`$content-max-width--*`) and the width limit and padding of single-column text (`$text-*--single-col`, used by section titles and the text split).
  - `_animations.scss` (transition times, keyframe mixins), `_typography.scss` (typography mixins, font family and the three font weights in use: `$font-weight__light` / `__regular` / `__bold`, i.e. 300 / 400 / 700), `_mixins.scss` (link, paragraph, bullet list), `_themes.scss` (section color themes).
  - `_section.scss`: base section styles. Sections have a `regular` vertical padding by default, adjustable per section with `section--padding-{y,top,bottom}-{none,regular,large,xlarge}` modifiers (used in `home.html` to keep consistent spacing between consecutive sections that share a color).
- **Consolidated data**: `common.yml` centralises navbar, splash, and footer strings (the footer is just the copyright notice). Social/contact data lives in `_data/en/social.yml`. Section content lives in page front matter.
- **Removed**: `_layouts/about.html`, `pages/about-en.html`, `_includes/_sections/header.html`, old component files (inlined into sections), `_variables.scss`, `_base.scss`, `_nav/` directory, `_syntax-highlighting.scss`.

## TODOs

### Placeholders

1. **`_includes/section-navbar.html`** — The mobile menu toggle uses Font Awesome's `fa-bars` as a placeholder icon.

2. **`_includes/doc-head.html`** — Font Awesome is loaded from cdnjs; replace it with a personalised Font Awesome kit.

### Content

3. **Skills section** — See how to include SEO / GEO / marketing technologies / attribution, perhaps along with soft skills such as communication, teamwork, etc.

4. **`_data/en/social.yml`** — The Moxfield link uses Font Awesome's Wizards of the Coast logo as its icon; replace it with Moxfield's logo.

5. **Trajectory section** — Consider adding an education section.

6. **"Download full CV" CTA** — Once there's a proper CV export (brand colours, sensitive information such as the phone number redacted), add a download button under the trajectory or skills section. The site itself stays a concise, generalist overview rather than a full CV.

## Bugs and issues

### HTTPS on secondary domains

- **Enforce HTTPS** — Currently off: GitHub refuses to enable it while a certificate is still being issued, so plain `http://adriem.me` doesn't redirect to HTTPS. Tick "Enforce HTTPS" in the repo's Pages settings once it becomes available again.
- **`www.adriem.me`** — The certificate GitHub issued only covers `adriem.me`, so `https://www.adriem.me` fails with a certificate error (`http://www.adriem.me` redirects fine). The `www` CNAME now points to `adriem.github.io`; if GitHub doesn't add `www` to the certificate by itself, remove and re-add the custom domain in the repo's Pages settings.
- **`map-generator.adriem.me`** — Still points to GitHub's legacy IPs (`192.30.252.153/154`), so it can't get a certificate. Replace its A records with a CNAME to `adriem.github.io`, enforce HTTPS in the `random-map-generator` repo's Pages settings, then point the project link in `_data/en/portfolio.yml` directly to `https://map-generator.adriem.me` (it currently goes through `http://adriem.me/random-map-generator`, which redirects to the subdomain over HTTP).

### Mobile viewport height

- **`_sass/_parallax.scss`, `_sass/_sections/_splash.scss`** — `.parallax`, `.parallax__group` and `.splash` use `height: 100vh`. On iOS Safari and Android Chrome, `100vh` is the viewport height with the browser toolbars hidden, but since the page scrolls inside `.parallax` (not the document) the toolbars never collapse. The splash bottom (social bar, scroll arrow) and the end of the page may end up hidden behind the toolbars. Likely fix: `100svh` / `100dvh`.

## To review

### Short laptop viewports

- **Splash** — On short landscape viewports (1366×768 / 1280×720 minus browser chrome, ~600–650px tall), check that the title (kicker + headline) plus the 20vh social margin and scroll arrow fit without the title sliding under the fixed navbar.

### Larger default font size / browser zoom

- **Global** — Font sizes, paddings and spacing are in `rem`, but breakpoints are in `px`. With a larger default font size (e.g. 20px) or 125–150% zoom, each breakpoint applies with bigger text than it was designed for. Check the splash title wrapping and the navbar tabs fitting before the 700px collapse.

### Timeline width on narrow viewports

- **`_sass/_sections/_timeline.scss`** — Wrapped text can't shrink its box, so the timeline may still leave some empty space at the right of the entries. `text-wrap: pretty` and the narrower max widths reduce it; measuring the widest line with JS would be the exact fix if it's still noticeable.
