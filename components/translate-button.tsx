'use client';

import { useEffect, useState } from 'react';

function normalizeLanguage(language: string) {
  return language.toLowerCase().split('-')[0] || 'en';
}

function displayLanguageName(language: string) {
  if (typeof Intl === 'undefined' || typeof Intl.DisplayNames === 'undefined') {
    return language.toUpperCase();
  }

  try {
    const displayNames = new Intl.DisplayNames(['en'], { type: 'language' });
    return displayNames.of(language) ?? language.toUpperCase();
  } catch {
    return language.toUpperCase();
  }
}

export function TranslateButton() {
  const [targetLanguage, setTargetLanguage] = useState('en');

  useEffect(() => {
    setTargetLanguage(normalizeLanguage(navigator.language || 'en'));
  }, []);

  const label = displayLanguageName(targetLanguage);

  function handleTranslate() {
    const language = normalizeLanguage(navigator.language || 'en');
    const url = new URL('https://translate.google.com/translate');
    url.searchParams.set('sl', 'auto');
    url.searchParams.set('tl', language);
    url.searchParams.set('u', window.location.href);
    window.open(url.toString(), '_blank', 'noopener,noreferrer');
  }

  return (
    <button
      type="button"
      onClick={handleTranslate}
      className="inline-flex items-center gap-2 rounded-[8px] border border-[rgba(0,255,200,0.22)] bg-[rgba(0,255,200,0.06)] px-4 py-2 font-mono text-[0.78rem] text-[color:var(--neon)] transition hover:-translate-y-px hover:bg-[rgba(0,255,200,0.12)] hover:shadow-[var(--glow)]"
      title={`Translate this page to ${label}`}
      aria-label={`Translate this page to ${label}`}
    >
      <span className="h-[7px] w-[7px] rounded-full bg-[color:var(--neon)] shadow-[0_0_8px_var(--neon)]" />
      Translate to {label}
    </button>
  );
}
