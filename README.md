# Top Bunk Travel

A one-page coming-soon site for the WanderPass. Static Astro, plain CSS, and a little vanilla JavaScript for the menu, city carousel, FAQ, and forms.

## Setup

Requires Node 22.12 or newer.

```sh
npm install
cp .env.example .env
npm run dev
```

The dev server runs at [http://localhost:4321](http://localhost:4321).

## Edit the copy

All visitor-facing text is in [`src/content/site.ts`](src/content/site.ts): headlines, navigation, FAQ, form labels, and the footer.

Before launch, replace these stand-ins in that file:

- `contactEmail` (currently `hello@example.com`, which is not a real inbox)
- `instagramUrl`
- `tiktokUrl`

Canonical and social links use `https://topbunktravel.westonwatson.com`. Set `PUBLIC_SITE_URL` in `.env` only if the site moves, with no trailing slash.

## Form endpoints

Both forms post JSON from the browser. They work with [Formspree](https://formspree.io) or any endpoint that accepts:

```http
POST /
Content-Type: application/json
Accept: application/json
```

Create two forms, then add the URLs to `.env`:

```sh
PUBLIC_TRAVELER_FORM_ENDPOINT=https://formspree.io/f/your-traveler-id
PUBLIC_HOSTEL_FORM_ENDPOINT=https://formspree.io/f/your-hostel-id
```

Restart the dev server after changing `.env`.

If an endpoint is empty, submit still validates, then shows a message that the form is not connected. A hidden `_gotcha` field is included for Formspree’s spam filter. Leave it blank.

There is a TODO in [`src/components/TravelerForm.astro`](src/components/TravelerForm.astro) where a “move up the list by inviting friends” tool can be added later.

## Photos

The pictures in `src/assets/images` are real travel frames copied into this project. Astro optimizes them at build time. Alt text is in `src/content/site.ts`.

| File | Where it appears |
| --- | --- |
| `syd-hostel.png` | Hero. Shot from the top bunk. The source is 906px wide, so a larger file will look sharper on big screens. |
| `lisbon.png` | Lisbon card. A real travel frame, not stock. |
| `porto.jpg` | Porto card. Unsplash, Dom Luís I Bridge, Andre Fonseca. |
| `seville.jpg` | Seville card. Unsplash, Plaza de España. |
| `granada.jpg` | Granada card. Unsplash, the Alhambra, Jimmy Hu. |
| `madrid.jpg` | Madrid card. Unsplash, Gran Vía, Alev Takil. |
| `valencia.jpg` | Valencia card. Unsplash, an old-town street, Jimmy Hu. |

The city cards other than Lisbon are stock photos under the [Unsplash License](https://unsplash.com/license). Swap them for your own frames when you have them. `public/og.jpg` is a 1200×630 crop of the hero for link previews. Replace it when the hero photo changes.

`src/pages/privacy.astro` is placeholder text. Replace it with a reviewed privacy policy before collecting real addresses. There is a TODO at the top of that file.

## Deploy on GitHub Pages

The site is a static build. `.github/workflows/deploy.yml` builds it on every push to `main` and publishes `dist/`. `public/CNAME` sets the custom domain to `topbunktravel.westonwatson.com`.

One-time setup in the GitHub repo:

1. **Settings → Pages → Build and deployment → Source:** choose **GitHub Actions**.
2. **Settings → Pages → Custom domain:** `topbunktravel.westonwatson.com`, then enable **Enforce HTTPS** once the certificate is ready.
3. **Settings → Secrets and variables → Actions → Variables:** add `PUBLIC_TRAVELER_FORM_ENDPOINT` and `PUBLIC_HOSTEL_FORM_ENDPOINT`. Use the Formspree URLs.
4. DNS: add a `CNAME` record for `topbunktravel` on `westonwatson.com` pointing to `westonrwatson.github.io`.

`PUBLIC_` values are baked in at build time. Change one, then push or re-run the workflow.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Local development |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
