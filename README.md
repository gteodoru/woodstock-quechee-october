# Woodstock & Quechee · Early October itinerary

A single-page, mobile-friendly family itinerary for **Thursday, October 1 – Monday, October 5, 2026** (4 nights / 5 calendar days) from Old Greenwich, CT to Woodstock / Quechee, Vermont. Pure static HTML, CSS, and JavaScript — no build step, no backend.

Travelers: Gabriel, his wife, their 22-month-old, and an au pair. Car naps on the drives; lodging naps Friday–Sunday; bedtime at 8.

## Live site

**https://vt-itinerary.vercel.app**

Open it on a phone. Checklists persist in `localStorage` on that device after the first load.

Source is also on GitHub: [gteodoru/woodstock-quechee-october](https://github.com/gteodoru/woodstock-quechee-october)

## What’s on the page

- Overview: exact dates, Woodstock as a soft-yes base, car-nap drive strategy (Elizabeth Park / Wickham), Harvest weekend foliage
- Named-date tabs (Thu Oct 1 – Mon Oct 5) with expandable activity cards, official links, and Harvest Celebration on Saturday
- Nap-window toggle that highlights 12:30–2:30 across the plan
- Lodging: On The River Inn Farmhouse 2BR (primary), Fat Sheep Four Corners Cabin, Newton Village 2B
- Dining, rain backups, booking + pack checklists
- Share-this-day and print / PDF styles

Hours are only those listed in the plan or on the linked official pages. Official sites win if anything has changed.

## Run locally

Any static server works. From this folder:

```bash
python3 -m http.server 47261
```

Then open [http://127.0.0.1:47261](http://127.0.0.1:47261).

Or open `index.html` directly. Checklists need a non-`file://` origin on some browsers, so the tiny server is safer.

## Redeploy

The site is a folder of static files (`index.html`, `styles.css`, `app.js`, `favicon.svg`, `manifest.json`).

```bash
# Vercel (current host)
npx vercel --prod --yes

# Netlify
npx netlify-cli deploy --dir=. --prod

# Surge
npx surge . your-name.surge.sh

# Cloudflare Pages
npx wrangler pages deploy . --project-name woodstock-quechee-october
```

`index.html` must stay at the root of the upload.
