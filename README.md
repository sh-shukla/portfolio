# Shashank Shukla · Portfolio

Personal site for Shashank Shukla, Senior Platform Engineer. Live at https://sh-shukla.github.io/portfolio/

## Stack

React 18, TypeScript, Vite and Tailwind CSS, with light and dark themes and a ⌘K command palette. No new dependencies. No backend: the contact form posts to Formspree.

The split layout (sticky identity column, scrolling content, cursor spotlight) is inspired by [Brittany Chiang's portfolio](https://brittanychiang.com), the most-starred personal portfolio on GitHub ([bchiang7/v4](https://github.com/bchiang7/v4)). The code here is written from scratch.

## Develop

```sh
npm ci
npm run dev      # http://localhost:8080/portfolio/
npm run build    # type-check + production build into dist/
```

## Edit content

All copy lives in `src/content.ts`. Keep it in step with the résumé. The downloadable résumé is `public/Shashank_Shukla_DevOps_Resume.pdf`.

## Deploy

Every push to `main` builds and deploys to GitHub Pages through `.github/workflows/deploy.yml`.
