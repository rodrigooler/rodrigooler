---
title: "Pyth Oracle: A Simple Way to Integrate Price Feeds with Bun and Elysia"
description: "A practical look at Pyth price feeds, Hermes, and how to expose them through a small Bun + TypeScript + Elysia REST API."
date: "2026-03-27"
tags: ["pyth", "oracle", "bun", "elysia", "typescript"]
readingTime: "5 min read"
featured: false
---

If you need market data in a clean, modern stack, Pyth is one of the easiest oracle systems to work with.

The reason is simple: Pyth gives you real-time price feeds, and its API surface is built for developers. For off-chain integration, Hermes exposes those updates through a web API. For on-chain use, Pyth provides the contract-side update flow you use to verify and read prices on the target chain.

That makes Pyth useful in two different places:

- as a price source for backend services
- as an oracle layer for smart contracts

For a lot of teams, the off-chain side is where the fastest value appears first.

## Why Pyth feels easy to integrate

Pyth is not trying to be a generic data platform. It is focused on market data, so the mental model stays simple:

- choose the feed you want
- fetch the latest update
- expose it in your app
- use it where your product needs a trusted price

Pyth’s Hermes service is the cleanest way to start if you want REST access. It serves the latest price update data through an API, and the docs also show that Pyth has a broader API reference for on-chain and off-chain integrations.

That is a good fit for teams that want to move quickly without wiring up a large data stack.

## Why Bun works well here

Bun is a very natural fit for this kind of integration because it gives you:

- a fast runtime
- built-in `fetch`
- TypeScript support out of the box
- easy package management

In practice, that means you can write a small service that fetches oracle data and exposes it through a REST endpoint without much ceremony.

## Why Elysia makes the REST layer nicer

Elysia is a strong match for Bun because it is built to be ergonomic, type-safe, and fast to wire up.

For a tiny oracle service, that matters more than people think:

- route definitions stay readable
- request validation is easy to add
- the code stays close to the actual API contract
- you can expose OpenAPI docs if you want the service to be self-describing

This is the kind of setup that stays pleasant even when the service grows.

## A minimal Bun + Elysia example

Here is a simple REST wrapper around Hermes:

```ts
import { Elysia, t } from 'elysia';

const app = new Elysia()
  .get(
    '/price/:feedId',
    async ({ params, set }) => {
      const url = new URL('https://hermes.pyth.network/v2/updates/price/latest');
      url.searchParams.append('ids[]', params.feedId);

      const response = await fetch(url);

      if (!response.ok) {
        set.status = 502;
        return {
          error: 'Failed to fetch price feed',
        };
      }

      const feeds = (await response.json()) as Array<{
        id: string;
        price: {
          price: string;
          conf: string;
          expo: number;
          publish_time: number;
        };
      }>;

      const feed = feeds[0];

      if (!feed) {
        set.status = 404;
        return {
          error: 'Price feed not found',
        };
      }

      return {
        id: feed.id,
        price: feed.price.price,
        confidence: feed.price.conf,
        exponent: feed.price.expo,
        publishedAt: feed.price.publish_time,
      };
    },
    {
      params: t.Object({
        feedId: t.String(),
      }),
    },
  )
  .listen(3000);

console.log(`Pyth proxy running on http://localhost:${app.server?.port}`);
```

The pattern is straightforward:

- the client calls your API
- your API calls Hermes
- your API returns a clean JSON shape to the rest of your system

That is usually enough to get a production-friendly integration started.

## When this pattern is useful

This setup works especially well for:

- dashboards that need live asset prices
- trading tools
- liquidation monitors
- risk checks
- internal services that need a stable oracle adapter

It is also a nice boundary if you do not want every frontend or service to know about oracle-specific details.

## What to keep in mind

The biggest mistake is treating oracle data like plain public JSON.

You still need to think about:

- feed freshness
- precision and decimals
- fallback behavior
- stale data handling
- whether the value is meant for display, decisions, or on-chain settlement

If the price is going into a smart contract, use the chain-side integration and follow the update flow from the docs.

If the price is only for your app or backend, Hermes through Bun + Elysia is a very clean path.

## Bottom line

Pyth is easy to integrate because it keeps the problem focused: real market data, exposed through a developer-friendly API.

With Bun and Elysia, you can turn that into a tiny REST service very quickly. That gives you a neat separation between price feeds, your backend logic, and whatever UI or smart contract consumes the data.

For teams that want to move fast without making the oracle layer complicated, this is a very practical stack.
