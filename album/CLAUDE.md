# CLAUDE.md

A keyboard-driven photo album that randomly jumps through photos, maintains a browsing history chain, and syncs love counts via Firebase Realtime Database. Zero build step — pure static HTML/JS.

## File map

| File | Purpose | Edit? |
|------|---------|-------|
| `index.html` | Entire app — CSS, HTML structure, all JS logic | Yes, for features/fixes |
| `photos.js` | Photo list (`PHOTOS` array of `{ src }` objects) | Via `update-photos.js` |
| `shortcuts-data.js` | Shortcut display rows (`SHORTCUT_ROWS`, `THANKYOU_HINT`) | Yes, to change labels/descriptions |
| `firebase-config.js` | Firebase credentials + `databaseURL` | Never change credentials |
| `update-photos.js` | Node.js script — syncs `photos.js` with the `photos/` folder | Yes, if sync logic changes |
| `photos/` | Raw image files | Add/remove images, then run the sync script |

## Architecture

### Screens
Four mutually exclusive views, all `position: absolute; inset: 0`:
- `#welcome` — shown when `pos === -1`
- `#viewer` — shown when `pos >= 0`
- `#cheatsheet` — overlay on `#viewer`, toggled by `/`
- `#thankyou` — shown when all photos have been seen

### State
```js
stack       // string[]  — ordered list of src paths visited
pos         // number    — current position (-1 = welcome)
seen        // Set       — srcs already shown (for random pick)
historyOpen // boolean   — whether the history strip is visible in the viewer
mobile      // boolean   — touch mode; always starts false (desktop) on page load
```

### History chain
- `stack` is never truncated. Navigating right from the middle advances to the next entry; a new random pick is only added when at the tail.
- `pos === -1` is the welcome screen. `→` from welcome goes to `pos = 0` (replay from start). `←` is a no-op on welcome.
- `esc` / `↺` (mobile welcome) clears `stack`, `seen`, resets `pos` to -1.

### Long-press right arrow
`keydown` starts a 500 ms timer. If `keyup` fires before the timer, it's a short press (`goRight()`). If the timer fires first, it's a long press (`goToEnd()`). Repeated `keydown` events while held are ignored.

### Love / Firebase
- **localStorage** tracks whether this browser loved a photo (`loved:<src> = '1'`).
- **Firebase Realtime Database** stores global counts under `loves/<encoded-src>`.
- Firebase key encoding: `src.replace(/[./]/g, '_')`.
- `db` is `null` when `databaseURL` is empty — all love features degrade gracefully to local-only.
- Love counts are updated via `.transaction()` to avoid race conditions.

### Key bindings
Hardcoded in `index.html` as `const KEYS = { ... }`. Display labels/descriptions are in `shortcuts-data.js` (`SHORTCUT_ROWS`, `THANKYOU_HINT`) and rendered dynamically — changing them requires no HTML edits.

## Constraints
- No build step, no npm, no bundler. Everything runs directly from `file://` or a static host.
- Do not introduce external dependencies beyond the Firebase compat SDK already loaded.
- Do not move key bindings out of `index.html` into `shortcuts-data.js` — they are code, not user-editable data.
- Do not commit real Firebase credentials changes; `firebase-config.js` is intentionally not in `.gitignore` because Firebase web API keys are safe to expose (access is controlled by Firebase security rules).
