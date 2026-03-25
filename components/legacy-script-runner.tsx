"use client";

import { useEffect } from 'react';

export function LegacyScriptRunner({ script }: { script: string }) {
  useEffect(() => {
    const registry = ((window as Window & { __legacyScriptRunnerDone?: Set<string> }).__legacyScriptRunnerDone ??=
      new Set<string>());

    if (registry.has(script)) {
      return;
    }

    registry.add(script);

    try {
      const runner = new Function(script);
      runner.call(window);
    } catch (error) {
      console.error('Legacy script execution failed', error);
    }
  }, [script]);

  return null;
}
