# Portfolio Website

Plain HTML + Tailwind CSS (CDN) portfolio with a light/dark theme toggle.

## Structure
- `css/custom.css` — design tokens (light/dark CSS variables) and shared components (navbar, buttons, chips, cards, hero, CTA band).
- `js/tailwind-config.js` — shared Tailwind config (colours map to the CSS variables) and the no-flash theme bootstrap.
- `js/main.js` — theme toggle, dropdowns, mobile menu, FAQ accordions, scroll reveal.
- Every page repeats the same `<head>`, navbar and footer markup (no build step) — when changing the nav or footer, update all pages.

## Design
Neo-editorial look: warm paper + ink with an green (#42C775) accent (used only as a fill with dark text), Space Grotesk display type, JetBrains Mono labels and Inter body text. Bold bordered cards with offset shadows, a floating pill navbar, marquee, and a full-bleed green CTA band. Dark mode via the `dark` class on `<html>` (saved in `localStorage`, defaults to the OS setting).

## Important: gallery photos
The six files in `assets/images/gallery/` are clearly marked placeholders. Replace them with your real client/work photos while keeping the filenames if you want to avoid editing HTML. Do not publish the placeholders as if they are real client evidence.

## Replace before publishing
- `YOUR NAME` / `YN`
- Email, WhatsApp, LinkedIn, GitHub and Upwork URLs
- `yourdomain.com` canonical URLs
- Project statistics
- Placeholder testimonials
- Sample project copy and images
- Gallery placeholder images

Open `index.html` locally to preview the site. Tailwind, Lucide and Google Fonts are loaded by CDN, so the full visual styling requires internet access during local preview.


Latest revision notes:
- Site is now light-only with soft gradient surfaces.
- Added separate gallery.html and testimonials.html pages.
- Demo project and gallery images were replaced with relevant Unsplash-sourced visuals. Replace them with your own real client/work photos before publishing for best credibility.
