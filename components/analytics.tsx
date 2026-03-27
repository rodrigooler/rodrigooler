'use client';

import { useEffect } from 'react';

let initialized = false;

export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  useEffect(() => {
    let cancelled = false;

    async function startAnalytics() {
      if (!domain || initialized) {
        return;
      }

      const { init } = await import('@plausible-analytics/tracker');

      if (cancelled || initialized) {
        return;
      }

      init({
        domain,
        autoCapturePageviews: true,
        bindToWindow: false,
      });
      initialized = true;
    }

    void startAnalytics();

    return () => {
      cancelled = true;
    };
  }, [domain]);

  if (!domain) {
    return null;
  }

  return null;
}
