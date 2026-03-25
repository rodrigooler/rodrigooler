import { NextResponse } from 'next/server';

type TranslatePayload = {
  text?: unknown;
  source?: unknown;
  target?: unknown;
  format?: unknown;
};

const DEFAULT_INSTANCE = 'https://translate.cutie.dating';

function normalizeLanguage(value: unknown, fallback = 'en') {
  if (typeof value !== 'string') {
    return fallback;
  }

  const code = value.toLowerCase().trim().split('-')[0];
  return code || fallback;
}

function getInstanceUrl() {
  return (process.env.LIBRETRANSLATE_URL || DEFAULT_INSTANCE).replace(/\/+$/, '');
}

export async function POST(request: Request) {
  let payload: TranslatePayload;

  try {
    payload = (await request.json()) as TranslatePayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const text = typeof payload.text === 'string' ? payload.text.trim() : '';
  if (!text) {
    return NextResponse.json({ error: 'Missing text.' }, { status: 400 });
  }

  const source = normalizeLanguage(payload.source, 'en');
  const target = normalizeLanguage(payload.target, 'en');
  const format = payload.format === 'html' ? 'html' : 'text';
  const apiKey = process.env.LIBRETRANSLATE_API_KEY?.trim();

  try {
    const response = await fetch(`${getInstanceUrl()}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source,
        target,
        format,
        ...(apiKey ? { api_key: apiKey } : {}),
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Translation request failed with ${response.status}.`, details: errorText },
        { status: 502 },
      );
    }

    const data = (await response.json()) as { translatedText?: string };
    return NextResponse.json({ translatedText: data.translatedText ?? '' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Translation service unavailable.', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 502 },
    );
  }
}
