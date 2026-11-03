# Shah Financial Services – redesigned website

Next.js (App Router) redesign of https://shahfs.com. All original pages, copy, calculators, logo and images are retained.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Where things live
- `content/site.ts` – contact details, nav/services/goals/tools data, calculator list, questionnaires
- `content/services.json`, `content/legal.json`, `content/blog.json` – page copy extracted from the original site (`scripts/` has the extractors)
- `components/` – header, footer, hero carousel, SIP calculator, calculator hub (iframes), quiz, forms, login
- `public/img/` – logo and all images downloaded from the original site

## Forms
Contact / questionnaire forms POST JSON to `NEXT_PUBLIC_FORM_ENDPOINT` if set (put it in `.env.local`).
If it is not set they open the visitor's mail app addressed to info@shahfs.com.
