# Project Rules

This repository is a Next.js blog and portfolio for Rodrigo Oler.

## Content Rules
- Blog posts must always be written in English.
- Keep blog content Markdown-first in `content/blog`.
- Prefer concise, technical, formal writing.
- When republishing external content, keep canonical links intact.

## Design Rules
- Preserve the original site colors unless explicitly asked to change them.
- Keep the blog visually aligned with the original HTML site.
- Prefer pixel-perfect migration over redesign.
- Use atomic design internally, but do not add unnecessary component layers.

## SEO Rules
- Every page needs page-specific metadata.
- Keep canonical URLs correct.
- Preserve sitemap, RSS, and robots generation.
- Do not sacrifice static SEO for unnecessary runtime rendering.

## Deployment Rules
- Cloudflare Pages deployment should use static export, not Workers/SSR.
- If a feature requires runtime server execution, do not assume it is deployable on Cloudflare Pages without Workers.
- Keep the site English-only unless explicitly asked otherwise.

## Engineering Rules
- Prefer small, focused commits.
- Do not revert user changes unless explicitly asked.
- Keep the output stable and the layout unchanged unless the task is a visual refactor.
