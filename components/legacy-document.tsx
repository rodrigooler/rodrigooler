import fs from 'node:fs';
import path from 'node:path';

import { LegacyScriptRunner } from '@/components/legacy-script-runner';

function readFileSafe(filePath: string) {
  try {
    return fs.readFileSync(path.join(process.cwd(), filePath), 'utf8');
  } catch {
    return '';
  }
}

function extractSection(html: string, tag: string) {
  const match = html.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
  return match?.[1] ?? '';
}

function extractBody(html: string) {
  return extractSection(html, 'body').replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
}

function extractStyles(html: string) {
  return html
    .match(/<style[^>]*>([\s\S]*?)<\/style>/gi)
    ?.map((styleTag) => styleTag.replace(/^[\s\S]*?<style[^>]*>/i, '').replace(/<\/style>[\s\S]*$/i, ''))
    .join('\n')
    ?? '';
}

function extractScripts(html: string) {
  const matches = html.match(/<script[^>]*>[\s\S]*?<\/script>/gi) ?? [];
  return matches
    .filter((scriptTag) => !/application\/ld\+json/i.test(scriptTag))
    .map((scriptTag) => scriptTag.replace(/^[\s\S]*?<script[^>]*>/i, '').replace(/<\/script>[\s\S]*$/i, ''))
    .join('\n');
}

export function LegacyDocument({ filePath }: { filePath: string }) {
  const html = readFileSafe(filePath);
  const body = extractBody(html);
  const styles = extractStyles(html);
  const scripts = extractScripts(html);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]" suppressHydrationWarning>
      {styles ? <style dangerouslySetInnerHTML={{ __html: styles }} /> : null}
      <div dangerouslySetInnerHTML={{ __html: body }} />
      {scripts ? <LegacyScriptRunner script={scripts} /> : null}
    </main>
  );
}
