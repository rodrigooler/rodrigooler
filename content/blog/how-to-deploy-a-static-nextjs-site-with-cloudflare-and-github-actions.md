---
title: "How to Deploy a Static Next.js Site with Cloudflare and GitHub Actions"
description: "A practical guide to shipping a static Next.js site on Cloudflare Pages with GitHub Actions, plus a safe way to store deployment secrets."
date: "2026-03-27"
tags: ["nextjs", "cloudflare", "githubactions", "static-site", "devops"]
readingTime: "7 min read"
featured: false
---

If you want a simple deployment setup for a static site, a very good default is:

- Next.js for the app
- Cloudflare Pages for hosting
- GitHub Actions for CI/CD

That combination is easy to reason about, works well for static export, and keeps the deployment flow close to the codebase.

The goal here is not to build the most complex pipeline possible. The goal is to ship a small static site with a setup that is secure, repeatable, and easy to maintain.

## Why this stack works well

This stack has a few practical advantages.

### Next.js handles the site structure

Next.js gives you:

- file-based routing
- static generation
- metadata support
- image and SEO-friendly patterns

For a content site, documentation site, portfolio, or blog, that is enough to get a solid foundation without introducing unnecessary infrastructure.

### Cloudflare Pages serves the output

Cloudflare Pages is a strong fit for static sites because it is built for:

- static assets
- fast global delivery
- simple preview and production deploys
- Git-based workflows

If your site does not need SSR or custom server logic, Pages is usually the cleaner option.

### GitHub Actions automates the delivery

GitHub Actions is useful because it lets us:

- install dependencies
- build the site
- deploy the generated `out/` folder
- keep the deployment process in version control

That means every deploy is reproducible from the repository, which is exactly what we want for a static site.

## 1. Configure Next.js for static export

For Cloudflare Pages in a static setup, Next.js should export static output.

In `next.config.ts`, the important part is:

```ts
const nextConfig = {
  output: 'export',
  trailingSlash: true,
}
```

This tells Next.js to generate a static build that can be published without a Node server.

The `trailingSlash` setting is often useful for static hosting because it makes route output more predictable.

## 2. Make sure the build output is static

Your build should produce the `out/` directory.

In a static deployment, that folder is the thing Cloudflare Pages publishes.

Your CI should run something like:

```bash
npm ci
npm run build
```

And the build should end with a static export in `out/`.

## 3. Set up the GitHub Actions workflow

The workflow in this repo follows a simple pattern:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build static site
        run: npm run build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy out --project-name=${{ secrets.CLOUDFLARE_PAGES_PROJECT_NAME }} --branch=main
```

The important part is that the workflow:

- runs on `main`
- builds the project before deploying
- deploys the generated static output
- reads sensitive values from GitHub Secrets

That keeps credentials out of the codebase.

## 4. Create the Cloudflare Pages project

In Cloudflare, create a Pages project for the repository.

For this kind of setup, the key decision is simple:

- if you are using GitHub Actions to deploy, Cloudflare Pages is just the hosting target
- if you want Cloudflare to build from GitHub directly, the setup changes slightly

In this article, we are using GitHub Actions as the CI/CD entry point.

That means the build happens in GitHub, and the final static `out/` directory is pushed to Cloudflare Pages.

## 5. Save environment variables safely

This is the part that usually matters most in real projects.

Do not hardcode deployment credentials in the repository.
Instead, save them as GitHub Secrets.

Use these commands:

```bash
gh secret set CLOUDFLARE_API_TOKEN --repo rodrigooler/rodrigooler --body "SEU_TOKEN"
gh secret set CLOUDFLARE_ACCOUNT_ID --repo rodrigooler/rodrigooler --body "SEU_ACCOUNT_ID"
gh secret set CLOUDFLARE_PAGES_PROJECT_NAME --repo rodrigooler/rodrigooler --body "SEU_PROJECT_NAME"
```

That gives you a few benefits:

- secrets are not committed to Git
- the workflow can read them securely
- rotating credentials later is much easier
- the same pipeline works across environments

If you want to avoid putting values in shell history, you can also pipe them into `gh secret set` from stdin.

## 6. What each secret does

The three secrets used here are straightforward.

- `CLOUDFLARE_API_TOKEN`: authenticates the deploy
- `CLOUDFLARE_ACCOUNT_ID`: points to the correct Cloudflare account
- `CLOUDFLARE_PAGES_PROJECT_NAME`: tells Wrangler which Pages project to publish to

If any of these are missing, the deploy step will fail.

## 7. Push to `main`

Once the workflow and secrets are ready, a push to `main` should trigger the pipeline.

Typical flow:

1. commit your code
2. push to `main`
3. GitHub Actions builds the site
4. GitHub Actions deploys `out/` to Cloudflare Pages
5. Cloudflare serves the updated static site

That is enough for a clean automatic deployment loop.

## 8. Keep the site static-friendly

This is where many projects accidentally get complicated.

If the site is meant to stay static, keep an eye on features that quietly introduce server requirements:

- SSR-only pages
- server actions
- runtime-only data fetching
- API routes that assume Node server behavior

If you do not need them, do not add them.

Static sites are easier to host, easier to cache, and easier to keep stable.

## 9. A practical checklist

Before shipping, verify this list:

- `next.config.ts` uses `output: 'export'`
- the build produces `out/`
- GitHub Actions deploys from `main`
- Cloudflare Secrets are set in the repository
- Cloudflare Pages project exists
- static assets and metadata are working as expected

If all of that is true, the deployment path is usually reliable.

## Bottom line

For a simple static site, the Next.js + Cloudflare Pages + GitHub Actions combination is a very practical setup.

Next.js gives you the app structure, Cloudflare gives you the hosting, and GitHub Actions makes the deployment automatic.

The most important operational detail is security: keep deployment credentials out of the codebase and store them as GitHub Secrets using `gh secret set`.

That gives you a deployment pipeline that is simple, safe, and easy to maintain.
