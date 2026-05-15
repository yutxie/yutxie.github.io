#!/usr/bin/env node
// Syncs photos.js with every image file found in the photos/ folder.
// - New files are added as { src }
// - Existing entries keep all their metadata fields
// - Entries whose files no longer exist are removed
// Run: node update-photos.js

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

const ROOT       = __dirname;
const PHOTOS_JS  = path.join(ROOT, 'photos.js');
const PHOTOS_DIR = path.join(ROOT, 'photos');
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.heic']);

// --- Load existing entries, keyed by src ---
const existing = new Map();
if (fs.existsSync(PHOTOS_JS)) {
  const sandbox = {};
  vm.runInNewContext(fs.readFileSync(PHOTOS_JS, 'utf8'), sandbox);
  (sandbox.PHOTOS || []).forEach(p => existing.set(p.src, p));
}

// --- Scan photos/ folder ---
const onDisk = new Set(
  fs.readdirSync(PHOTOS_DIR)
    .filter(f => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
    .map(f => 'photos/' + f)
);

// --- Merge ---
const added   = [...onDisk].filter(src => !existing.has(src));
const removed = [...existing.keys()].filter(src => !onDisk.has(src));
const merged  = [...onDisk].sort().map(src => existing.get(src) || { src });

// --- Write ---
const lines   = merged.map(p => '  ' + JSON.stringify(p) + ',');
const content = `// Run \`node update-photos.js\` to sync with the photos/ folder.
// Each entry is an object — add metadata fields here and re-running the script will preserve them.

const PHOTOS = [
${lines.join('\n')}
];
`;

fs.writeFileSync(PHOTOS_JS, content);

// --- Report ---
console.log(`photos.js updated — ${merged.length} photos total`);
if (added.length)   console.log(`  + added:   ${added.join(', ')}`);
if (removed.length) console.log(`  - removed: ${removed.join(', ')}`);
if (!added.length && !removed.length) console.log('  no changes');
