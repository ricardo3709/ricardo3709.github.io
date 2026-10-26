# Xinyu Wang — Personal Website

[Visit the website](https://ricardo3709.github.io/) · [Other than academic](https://ricardo3709.github.io/other-than-academic.html) · [中文版](https://ricardo3709.github.io/zh/)

A static personal website for Xinyu Wang, a Ph.D. researcher in Transportation Engineering at the University of Sydney. Adapted from [academic-homepage-template](https://github.com/w-r-s/academic-homepage-template).

The academic homepage includes a biography with a profile photo, a postdoc-availability note, News, Google Scholar link, published articles, education, experience, teaching, and talks. The design is a light, Apple-inspired system: system fonts (SF Pro on Apple devices), white and light-gray bands, pill buttons, and a translucent sticky header, with no decorative animation. Clicking the email address copies it. The **Other than academic** page is a photo journal of life outside research.

Every page also has a Simplified Chinese version under `zh/` (`zh/index.html` and `zh/other-than-academic.html`). English stays the default; the **EN | 中文** switcher at the right end of the header links each page to its counterpart and keeps the reader on the same section. Paper and talk titles, author names, and journal names stay in English as they are cited.

## Preview locally

```bash
python3 scripts/build.py
python3 -m http.server 8080 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:8080. There are no package dependencies. The pages also work by opening `index.html` directly. Without JavaScript, all publications remain visible, the navigation links wrap instead of collapsing into a menu, and the email address opens the visitor's mail application.

## Add your photos

- **Profile photo:** save an image as `images/profile.jpg` (PNG, WebP, AVIF, and other common image formats are also supported). Point the `profile-photo` image at it in both `index.html` (`images/...`) and `zh/index.html` (`../images/...`), and set an appropriate `alt` description in each language. Keep the `profile-photo` class; the homepage uses a portrait crop on larger screens and a square crop on phones, so keep your face in the upper-middle of the image.
- **Personal photos:** save images under `images/personal/`. In `other-than-academic.html` and `zh/other-than-academic.html`, copy a `photo-slot` figure in the photo journal and edit its image, `alt` text, size, and caption. Portrait photos are cropped to 3:4; add `photo-wide` to a landscape photo so it fills a whole row. Keep the number of portrait photos a multiple of three so the rows stay complete. For example:

```html
<figure class="photo-slot">
  <img src="images/personal/my-photo.jpg" alt="A description of the photograph" width="1080" height="1440" loading="lazy">
  <figcaption>Your caption here.</figcaption>
</figure>
```

The build automatically includes supported images under `images/personal/` and `images/publications/`, and files named `images/profile.*`. Add interest descriptions directly to `other-than-academic.html`, and their Chinese version to `zh/other-than-academic.html`.

## Update content

Edit `index.html` for academic content, News, and the postdoc note (the hero status pill links to `#postdoc`; the footer repeats the message), `other-than-academic.html` for personal content, the matching files in `zh/` for the Chinese version (keep both languages in step; asset paths there start with `../`), `stylesheet.css` for presentation (colors, radii, fonts, and the main layout measures are custom properties at the top), and `script.js` for the mobile menu, publication filters, email copying, and the English and Chinese interface text. News dates come from the published articles' online-publication dates. When the postdoc search ends, remove the status pill, the `#postdoc` section, and the footer line, and update both `description` meta tags, in both languages.

## Add a publication

Copy an existing `<article class="publication">` block in `index.html` and place it in date order (newest first). Save its figure under `images/publications/`; the build picks it up automatically. Give the heading a unique `id` and point the article's `aria-labelledby` at it. Set `data-tags` to the `data-tag` of one or more filter buttons, comma-separated with no spaces (the filter counts update themselves; a new topic needs a new button). Move the "New" label to the newest paper, add a News item, and update the footer's "Updated" month. Make the same changes in `zh/index.html` by copying one of its own publication blocks and News items (keep `lang="en"` on the English title and citation text), with figure paths starting `../images/` and the summary, figure `alt` text, caption, and News item in Chinese.

## Publication policy

Only published peer-reviewed journal articles appear: the three listed in the September 2026 CV, plus *Who should pick the meeting point? Efficiency–fairness trade-offs between operator and users in ridepooling* (Transportation Research Part A 215, 105326; published online October 23, 2026; volume year 2027). Titles, authors, venues, article numbers, DOI links, and online-publication dates were checked against the published PDFs. Under-review manuscripts and their findings are omitted.

The original CV is not linked or included in the public build because it contains under-review manuscripts. Personal phone details, research source PDFs, local editing history, and unused template assets are also excluded from deployment.

Publication figures are cropped from the corresponding open-access articles: meeting-point disagreement in Manhattan (Fig. 4), RL architecture (Fig. 3), walking networks (Fig. 5), and Circular Quay berths (Fig. 1). Captions credit the authors and each adjacent publication links to its DOI. The former mountain-photo footer images in `images/experience/` are no longer used and are excluded from the build.

## GitHub Pages

The `.github/workflows/pages.yml` workflow builds and deploys the contents of `dist/` whenever `main` is updated. In repository **Settings → Pages**, the publishing source is **GitHub Actions**. It can also be redeployed from the **Actions** tab using **Run workflow**.

Deploy the build output rather than the repository root. The `.openai/hosting.json` file records the earlier private Sites preview; GitHub Pages uses its own workflow and does not need that configuration.
