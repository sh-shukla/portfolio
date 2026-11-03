# Shashank Shukla · Portfolio

Personal site for Shashank Shukla, Senior Platform Engineer. Live at https://sh-shukla.github.io/portfolio/

## Stack

React 18, TypeScript, Vite and Tailwind CSS, with light and dark themes. No new dependencies. No server: the contact form posts to a Google Apps Script you own.

The first screen is a small interactive terminal (type `help`). Scrolling zooms into it and through to the page; with reduced motion the page is static.

Inspired by [edh.dev](https://edh.dev/) (the zoom into a screen), [aitdahmane.com](https://aitdahmane.com/) (tool logos in chips), [tamalsen.dev](https://tamalsen.dev/) and [ilyavlasov.netlify.app](https://ilyavlasov.netlify.app/), with an apple.com-style layout. The code here is written from scratch.

Tool logos in `src/lib/logos.ts` come from [Simple Icons](https://simpleicons.org/) (CC0) and, for AWS, [Devicon](https://devicon.dev/) (MIT). Logos are trademarks of their owners.

## Develop

```sh
npm ci
npm run dev      # http://localhost:8080/portfolio/
npm run build    # type-check + production build into dist/
```

## Edit content

All copy lives in `src/content.ts`. Keep it in step with the resume. The downloadable resume is `public/Shashank_Shukla_DevOps_Resume.pdf`.

## Contact form

The form posts to a small Google Apps Script in your own Google account (`contact/apps-script.gs`), which emails each message to your Gmail. Setup steps are at the top of that file. Put the deployed Web app URL in `contactForm` in `src/content.ts`; until then the form is hidden and the email, LinkedIn, GitHub and phone buttons remain.

## Deploy

Every push to `main` builds and deploys to GitHub Pages through `.github/workflows/deploy.yml`.
