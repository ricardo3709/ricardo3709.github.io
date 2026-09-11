# Xinyu Wang — Personal Website

[Visit the website](https://ricardo3709.github.io/) · [Other than academic](https://ricardo3709.github.io/other-than-academic.html)

A static personal website for Xinyu Wang, a Ph.D. researcher in Transportation Engineering at the University of Sydney. Adapted from [academic-homepage-template](https://github.com/w-r-s/academic-homepage-template).

The academic homepage includes a profile-photo placeholder, biography, Google Scholar link, published articles, education, experience, teaching, talks, and a News sidebar. Clicking the email address copies it. The **Other than academic** page provides space for personal interests and photographs, with placeholders until photos are added.

## Preview locally

```bash
python3 scripts/build.py
python3 -m http.server 8080 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:8080. There are no package dependencies. The pages also work by opening `index.html` directly. Without JavaScript, all publications remain visible and the email address opens the visitor's mail application.

## Add your photos

- **Profile photo:** save an image as `images/profile.jpg` (PNG, WebP, AVIF, and other common image formats are also supported). In `index.html`, replace `images/profile-placeholder.svg` with its path and set an appropriate `alt` description. Keep the `profile-photo` class; the homepage uses a portrait crop.
- **Personal photos:** save images under `images/personal/`. In `other-than-academic.html`, replace a `photo-placeholder` div with an `<img>` and edit its caption. For example:

```html
<figure class="photo-slot">
  <img src="images/personal/my-photo.jpg" alt="A description of the photograph" width="1200" height="900" loading="lazy">
  <figcaption>Your caption here.</figcaption>
</figure>
```

The build automatically includes supported images under `images/personal/` and files named `images/profile.*`. Add interest descriptions directly to `other-than-academic.html`.

## Update content

Edit `index.html` for academic content and the News sidebar, `other-than-academic.html` for personal content, `stylesheet.css` for presentation, and `script.js` for publication filters and email copying. News dates come from the published articles' online-publication dates.

## Publication policy

Only the three peer-reviewed journal articles listed in the September 2026 CV appear. Titles, authors, venues, article numbers, DOI links, and online-publication dates were checked against the PDFs in `papers/published/`. Under-review manuscripts and their findings are omitted.

The original CV is not linked or included in the public build because it contains under-review manuscripts. Personal phone details, research source PDFs, local editing history, and unused template assets are also excluded from deployment.

Publication figures are cropped from the corresponding open-access articles: RL architecture (Fig. 3), walking networks (Fig. 5), and Circular Quay berths (Fig. 1). Captions credit the authors and each adjacent publication links to its DOI.

## GitHub Pages

The `.github/workflows/pages.yml` workflow builds and deploys the contents of `dist/` whenever `main` is updated. In repository **Settings → Pages**, the publishing source is **GitHub Actions**. It can also be redeployed from the **Actions** tab using **Run workflow**.

Deploy the build output rather than the repository root. The `.openai/hosting.json` file records the earlier private Sites preview; GitHub Pages uses its own workflow and does not need that configuration.
