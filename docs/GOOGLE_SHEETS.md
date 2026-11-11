# Google Sheets forms

Submissions go to [your spreadsheet](https://docs.google.com/spreadsheets/d/1diq3pw6rcIO1c0rVkw1LX4vsesZB-5zRwWhHZ6qg0PQ/edit) on three tabs:

| Tab name | Form on site |
| --- | --- |
| `waitlist` | Join The Founding 500 (email signup) |
| `waitlist survey` | Optional questions after signup |
| `hostels` | For Hostels → Let’s talk |

## One-time setup

1. In the spreadsheet, add three sheet tabs with **exact** names: `waitlist`, `waitlist survey`, `hostels` (leave them empty; the script writes row 1 headers on the first submit).

2. **Extensions → Apps Script**, delete any starter code, paste everything from [`google-apps-script/TopBunkForms.gs`](../google-apps-script/TopBunkForms.gs), and save the project.

3. **Deploy → New deployment →** type **Web app**:
   - **Execute as:** Me
   - **Who has access:** Anyone

4. Copy the **Web app URL** (ends in `/exec`).

5. In `.env` on your machine:

```sh
PUBLIC_FORMS_ENDPOINT=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

6. Restart `npm run dev`, test all three flows, then `npm run deploy` so production gets the same URL.

You can still use separate Formspree URLs via `PUBLIC_TRAVELER_FORM_ENDPOINT` and `PUBLIC_HOSTEL_FORM_ENDPOINT`; if `PUBLIC_FORMS_ENDPOINT` is set, it is used for both traveler and hostel forms.

## Troubleshooting

- **403 / not connected:** Redeploy the web app after script changes and use **Anyone** access.
- **Missing tab:** Tab names must match exactly, including the space in `waitlist survey`.
- **Empty endpoint in production:** Set `.env` before `npm run deploy`; `PUBLIC_*` values are baked in at build time.
