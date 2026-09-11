# Xinyu Wang — Academic Homepage

Personal website for Xinyu Wang, a Ph.D. researcher in Transportation Engineering at the University of Sydney. Adapted from [academic-homepage-template](https://github.com/w-r-s/academic-homepage-template).

The site is plain HTML, CSS, and JavaScript with no package installation required. It includes a research biography, three published journal articles, education, research and industry experience, teaching, selected presentations, and technical expertise.

## Preview

Build the public files and serve them locally:

```bash
python3 scripts/build.py
python3 -m http.server 8080 --bind 127.0.0.1 --directory dist
```

Then open http://127.0.0.1:8080. The site also works by opening `index.html` directly. Publication filters and copy controls progressively enhance the page; all publications remain visible without JavaScript.

## Content and publication policy

- Biography and experience are grounded in the supplied September 2026 CV.
- Only the three articles listed as peer-reviewed journal publications are displayed. Under-review manuscripts and their findings are omitted.
- Publication titles, authors, journals, article numbers, and DOI links were checked against the published PDFs in `papers/published/`.
- The original CV is intentionally not linked or included in the public build, because it includes under-review manuscripts. Personal phone details are also omitted.
- Publication thumbnails in `images/publications/` are figure crops from the corresponding open-access articles: RL architecture (Fig. 3), walking study networks (Fig. 5), and Circular Quay berths (Fig. 1). Attribution is displayed with each figure and the related article is linked beside it.
- The example paper illustrations and profile assets from the original template are not used or included in the public build. The template's landscape footer is retained.

## Editing and publishing

Edit `index.html` for content, `stylesheet.css` for presentation, and `script.js` for publication filters and clipboard actions. Update the explicit public-file list in `scripts/build.py` when adding assets. Rebuild after changes.

Deploy the contents of `dist/`, not the repository root, to a static host. This keeps the original CV, unpublished manuscripts, local edit history, and research source files out of the published website. Sites configuration lives in `.openai/hosting.json`.
