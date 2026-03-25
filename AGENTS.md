# Agent Operating Rules

## Always
- Write blog posts in English.
- Keep the original site theme colors intact.
- Preserve pixel-perfect layouts when refactoring existing pages.
- Prefer static SEO-friendly rendering.

## Blog Architecture
- Posts live in `content/blog` as Markdown.
- `canonical` must point to the original source when republishing.
- Use tags for discovery and internal linking.
- Keep article pages concise and technical by default.

## Translation
- Translate inside the page, not by redirecting to Google Translate.
- If a static deployment target cannot support server translation, use a client-side approach or skip the feature.

## Cloudflare Pages
- Cloudflare Pages should be treated as a static deployment target here.
- Do not assume SSR or server routes are available without Workers.
- Use static export-compatible code paths.

## Change Control
- Do not delete or rewrite user changes unless explicitly requested.
- Prefer small, reviewable commits.
- Validate with `typecheck` and `build` after meaningful changes.
