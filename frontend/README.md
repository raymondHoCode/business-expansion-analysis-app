
# biz-map-analysis-app

Front end for a Business Location Analysis app using React, Vite, TypeScript, Tailwind, and Google Maps.

## Features
- Landing page with info request (business type, budget, city/address) and a button to open the map
- Main map page: Google Map, chosen property marker, surrounding businesses, interactable property sidebar
- Filters: keyword, radius, min rating, open now
- Heatmap toggle (uses Places results for heat points)
- Uses Maps JavaScript API and Places API through `@react-google-maps/api`
- API key via Vite env var

## Quick Start
1. Install
   ```bash
   npm i
   npm run dev
   ```
2. Configure your API key
   - Copy `.env.sample` to `.env`, paste your key as `VITE_GOOGLE_MAPS_API_KEY=...`
   - In Google Cloud Console, enable **Maps JavaScript API** and **Places API**.
   - Restrict the key to localhost during dev and your domain in prod.
3. Open http://localhost:5173

## Project Structure
- `src/pages/Landing.tsx` – input fields and CTA
- `src/pages/MapPage.tsx` – map, markers, nearby search, heatmap, filters
- `src/components/Sidebar.tsx` – interactable property list
- `src/components/Filters.tsx` – filter controls
- `src/components/BusinessList.tsx` – results list
- `src/utils/places.ts` – wrapper around Places Nearby Search

## Notes
- The sidebar uses mock properties. Replace with real data from your future Python API.
- Nearby search uses the Maps Places client from the loaded script. Billing is required for Places.
- Heatmap requires the `visualization` library, already included in `LoadScript`.
