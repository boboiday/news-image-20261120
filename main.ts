// News image entry (Node 22, standard library only).
// The poster for Friday 20 November 2026 is the entry.png beside this file;
// this program copies it to the grader's output directory as entry.png.
// Run locally with: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const png = readFileSync(join(here, 'entry.png'));
// The gate takes a whole PNG: refuse to copy anything that is not one,
// so a corrupt or truncated image fails loudly instead of being entered.
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (png.length < PNG_MAGIC.length || !png.subarray(0, PNG_MAGIC.length).equals(PNG_MAGIC)) {
  throw new Error('entry.png is not a PNG file');
}
writeFileSync(join(outDir, 'entry.png'), png);
