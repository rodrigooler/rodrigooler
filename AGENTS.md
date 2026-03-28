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

## Cloudflare Pages
- Cloudflare Pages should be treated as a static deployment target here.
- Do not assume SSR or server routes are available without Workers.
- Use static export-compatible code paths.

## Change Control
- Do not delete or rewrite user changes unless explicitly requested.
- Prefer small, reviewable commits.
- Validate with `typecheck` and `build` after meaningful changes.

## Commits
- Use Conventional Commits: `type(scope): subject`.
- Prefer `feat`, `fix`, `chore`, `refactor`, `docs`, and `test`.
- Keep the subject short, imperative, and lowercase after the colon.
- Use a scope when it helps clarify the area changed, such as `blog`, `seo`, or `ui`.
