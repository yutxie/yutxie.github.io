# random-jump-album

A minimal, keyboard-driven photo album. It randomly jumps through your photos, remembers where you've been, and lets you mark favourites that sync across visitors in real time.

## Opening it

**Locally** — open `index.html` in any browser.

**GitHub Pages** — push the repo and enable Pages in repository settings. The site is fully static; no server required.

## Keyboard shortcuts

### Photo frame

| Key | Action |
|-----|--------|
| `→` | random jump / next in chain |
| `→` *(hold)* | jump to last in chain |
| `←` | previous in chain |
| `↑` | love / unlove this photo |
| `↓` | toggle history chain |
| `/` | toggle shortcut cheatsheet |
| `esc` | clear history chain |
| `space` | back to welcome screen |

### All-seen screen

| Key | Action |
|-----|--------|
| `←` | last photo |
| `space` | back to welcome |

## Mobile mode

A link at the bottom of the welcome screen switches to mobile mode (touch-friendly buttons, no keyboard shortcuts). The site always opens in desktop mode.

### Photo frame (mobile)

| Button | Position | Action |
|--------|----------|--------|
| `⌂` | top-left | back to welcome |
| `♥` | top-right | love / unlove |
| `←` | bottom-left | previous in chain |
| `→` *(hold)* | bottom-right | jump to last in chain |
| `→` | bottom-right | random jump / next in chain |

### Welcome screen (mobile)

| Button | Position | Action |
|--------|----------|--------|
| `↺` | top-left | clear history (shown only when history exists) |
| `→` | bottom-right | start / next in chain |

History is shown as a scrollable photo grid. Tap any thumbnail to jump to that photo.

### All-seen screen (mobile)

| Button | Position | Action |
|--------|----------|--------|
| `←` | left | last photo |
| `⌂` | right | back to welcome |

## Adding photos

1. Drop image files into the `photos/` folder.
2. Run the sync script:
   ```
   node update-photos.js
   ```
   This updates `photos.js` — new files are added, deleted files are removed, and any existing metadata is preserved.

## File structure

```
index.html            app — never needs editing for content changes
photos.js             photo list, managed by update-photos.js
shortcuts-data.js     shortcut display labels and descriptions
firebase-config.js    Firebase credentials (see below)
update-photos.js      sync script — run with Node.js
photos/               image files
```

## Customising shortcuts

Edit `shortcuts-data.js` to change the labels or descriptions shown on the welcome screen and cheatsheet. Changes are reflected immediately on reload — no other files need touching.

## Firebase (shared love counts)

Without Firebase, love state is local to each browser. To share counts across all visitors:

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. Add a web app and copy the config.
3. Go to **Build → Realtime Database → Create database**.
4. Paste your config into `firebase-config.js`.
5. In **Realtime Database → Rules**, set:

```json
{
  "rules": {
    "loves": {
      ".read": true,
      ".write": true
    }
  }
}
```

This opens only the `loves` path (which stores per-photo counts) and leaves everything else locked.
