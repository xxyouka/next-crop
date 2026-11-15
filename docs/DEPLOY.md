# Deploy Next Crop

The app is a static site with no build step and no runtime network calls. Any static host works. The local preview is **not** a public project link.

## What to publish

From the project root, create a clean public folder:

```bash
rm -rf /tmp/next-crop-site
mkdir -p /tmp/next-crop-site
cp -R index.html styles.css app.js field.js field-art.js plant-art.js globe.js model.js sites.js assets docs /tmp/next-crop-site/
```

`docs/` is optional for the app itself but is needed for the in-app links to the demo deck and one-page brief. The public folder should contain:

```text
index.html
styles.css
app.js
field.js
field-art.js
plant-art.js
globe.js
model.js
sites.js
assets/
docs/
```

## Cloudflare Pages

If `wrangler` is already authenticated:

```bash
npx wrangler pages deploy /tmp/next-crop-site --project-name next-crop
```

Use the URL returned by Wrangler. Do not deploy the whole repository: `.git` and the test screenshots do not belong in the public site.

## GitHub Pages

1. Create a public repository.
2. Push the files listed above to the default branch.
3. In **Settings → Pages**, publish from the repository root.
4. Open the Pages URL in a private browser.

## Netlify Drop

1. Open Netlify Drop.
2. Drag the `/tmp/next-crop-site` folder.
3. Open the public URL.

## Verify before pasting the link

- Open the URL in a private/incognito window with no login.
- Choose all seven regions; the globe, field replay, planner and three-season check work.
- Open **Project brief** and both PDF links.
- Try the wet-harvest demo: 39.34 mm, then 0.59 mm in 2024/25.
- Check the page at a phone width; no horizontal overflow.
- Confirm the demo deck link is public as well.

## Demo link

The submission page asks for a **project demonstration**, separate from the project link. Upload `docs/Next-Crop-Demo-Deck.pdf` to Google Drive, Dropbox or OneDrive, make the file public, and paste that URL. It is 7 slides, within the limit. A 30-second English-subtitled video is an alternative.

## Deadline

The current guide says the project closes **Sunday 15 November 2026 at 23:59 in the Team Owner's local time** (Universal Event: Team Owner's local time). For a China-based owner that is 15 November 23:59 Beijing, not 16 November 07:59. Submit early; saving is not submitting.
