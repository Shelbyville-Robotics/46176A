# BEC Robotics · Team 46176A

A static HTML, CSS, and JavaScript website for Shelbyville Robotics, hosted with GitHub Pages.

## Pages

- Home and team profiles: `index.html`
- Robot build notes and photo viewer: `robot.html`
- Competition archive: `comp.html`
- Searchable engineering archive: `docs.html`
- Season goals and demo practice scoreboard: `season.html`
- Existing website policies: `Legal/index.html`

## Local preview

From the repository root, run:

```sh
python3 -m http.server 4173
```

Open `http://localhost:4173`. No install or application build is required.

## Updating the engineering archive

Add files to `docs/` or its subfolders. The recommended filename convention is
`YYYY-MM-DD_Category_Title.ext`, for example `2026-09-30_Design_IntakeRevision.txt`.

Then run with Node.js 20 or newer:

```sh
node tools/build-archive.mjs
```

Commit the new files and the updated `docs.html`. The generator includes nested notes,
escapes filenames, and creates category/type filters. It excludes `docs/photos/`,
which contains the team’s avatar artwork. Files without a date remain available under
General. All records and links are present in the HTML, so browsing does not depend on
JavaScript, GitHub API availability, or API rate limits.

## Updating the site

Keep the navigation and footer consistent when editing the HTML pages. Links use
relative paths so the site works at both its custom domain and `/46176A/` on GitHub Pages.
The `CNAME` file preserves the existing custom domain.

Robot gallery thumbnails are optimized WebP assets; the viewer opens the original
photos in `docs/`. To add a photo, add the thumbnail and a `.gallery-item` link in
`robot.html`, with a useful image description and `data-caption`.

Use verified team records when publishing robot specifications, season totals, or
competition results. The season scoreboard currently contains **demo data**.
The archived competition entries retain the previous site’s dates and event notes;
qualification and missing results are explicitly marked as unconfirmed.

## Motion and accessibility

Page entrances, scroll reveals, photo scanning, card interactions, and the optional
BEC boot sequence use native CSS and JavaScript. No CDN animation library is needed.
Reduced-motion preferences disable movement. The photo viewer supports Escape and
left/right arrow keys; keyboard focus returns to the selected photo when it closes.
The mobile menu also closes with Escape. Without JavaScript, navigation, file links,
gallery originals, team information, and the scoreboard remain usable.
