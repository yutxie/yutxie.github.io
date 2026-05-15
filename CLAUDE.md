# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal academic homepage for Yutong Xie (yutxie.com), built with Jekyll using the [no-style-please](https://github.com/riggraz/no-style-please) theme — a minimalist, nearly CSS-free theme.

## Commands

```bash
# Install dependencies (first time or after Gemfile changes)
bundle install

# Serve locally with live reload
bundle exec jekyll serve

# Build static site to _site/
bundle exec jekyll build
```

The local server runs at `http://localhost:4000`. The `_site/` directory is the generated output and should not be edited directly.

## Site structure

- `_pages/` — main content pages (index, bio, misc). These are a Jekyll collection configured in `_config.yml` with `permalink: /:name`.
- `_data/menu.yml` — controls the navigation menu structure on the homepage. Edit this to add/remove/reorder nav links.
- `_layouts/` — HTML templates. Key layouts: `page` (standard content page), `misc` (the fun miscellaneous page), `root`, `archive`, `post`.
- `_includes/` — reusable HTML partials (head, menu items, post list, etc.)
- `_sass/` — styling overrides
- `assets/` — images and other static files
- `_config.yml` — site-wide settings including title, URL, theme appearance, jektex macros, and permalink structure

## Key configuration

- **LaTeX rendering**: The site uses `jektex` (server-side LaTeX compilation). Macros like `\Q`, `\C` are defined in `_config.yml` under `jektex.macros`. Cache lives in `.jektex-cache/`.
- **Theme appearance**: Set in `_config.yml` under `theme_config.appearance` — can be `"light"`, `"dark"`, or `"auto"`.
- **Pages collection**: `_pages/` is a Jekyll collection (not standard Jekyll pages). Files render at `/:name` (e.g., `_pages/bio.md` → `/bio`).
- **CNAME**: `CNAME` file holds the custom domain `yutxie.com` for GitHub Pages.

## Content editing

The primary content lives in `_pages/index.md` (research, news, publications) and `_pages/bio.md`. These use standard Markdown with inline HTML for styling. Publications are formatted as numbered lists with `\\` line breaks between authors/venue/links.

To add a nav link, edit `_data/menu.yml`. To add a new page, create `_pages/<name>.md` with appropriate frontmatter (`layout`, optional `title`, `show_back`).
