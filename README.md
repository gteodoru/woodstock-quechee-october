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
- Lodging: Quechee Airbnb under review; On The River Farmhouse 2BR as the strong alt; Fat Sheep and Newton Village backups
- Dining, rain backups, booking + pack checklists
- Photo gallery (local `/images`), Google Maps embeds, and Google review links
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

The site is a folder of static files (`index.html`, `styles.css`, `app.js`, `favicon.svg`, `manifest.json`, `images/`).

## Photo credits

Images are downloaded into `/images` (not hotlinked). Wikimedia Commons file pages have the full licenses.

| File | Subject | Source / author |
| --- | --- | --- |
| `foliage.jpg` | Woodstock autumn hills | [Woodstock foliage1920.jpg](https://commons.wikimedia.org/wiki/File:Woodstock_foliage1920.jpg) |
| `bridge.jpg` | Middle Covered Bridge | Daveynin, [Woodstock Middle Bridge](https://commons.wikimedia.org/wiki/File:Daveynin_-_Woodstock_Middle_Bridge.jpg) |
| `billings.jpg` | Billings Farm meadows | [Billings Farm, Vermont wide view](https://commons.wikimedia.org/wiki/File:Billings_Farm,_Vermont_wide_view.jpg) |
| `billings-meadow.jpg` | Billings / NPS meadow | NPS HALS, [NPS and the Billings Farm and Museum 3](https://commons.wikimedia.org/wiki/File:NPS_and_the_Billings_Farm_and_Museum_3.jpg) |
| `gorge.jpg` | Quechee Gorge Bridge | [Quechee Gorge Bridge.jpg](https://commons.wikimedia.org/wiki/File:Quechee_Gorge_Bridge.jpg) |
| `owl.jpg` | Great horned owl at VINS | Šarūnas Burdulis, [VINS owl](https://commons.wikimedia.org/wiki/File:Great_Horned_Owl_Virgininis_didysis_apuokas_(51524575795).jpg) |
| `maple.jpg` | Maple syrup grades | [Morse Farm, Vermont](https://commons.wikimedia.org/wiki/File:Different_grades_of_maple_syrup.jpg) |
| `maple-walk.jpg` | Sap bucket | Rhavasy, [Maple syrup bucket](https://commons.wikimedia.org/wiki/File:Maple_syrup_bucket.jpg) |
| `pumpkins.jpg` | Woodstock fall fence | Anthony Quintano, [Fall Foliage Woodstock](https://commons.wikimedia.org/wiki/File:Fall_Foliage_Woodstock,_Vermont_-_Flickr_-_Anthony_Quintano.jpg) |

Ratings on the page are approximate Google-Maps figures with a “Read reviews on Google” link — not scraped review dumps. Maps use the standard Google Maps `output=embed` place iframe (no API key).

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
