# hazzahex-experiments

The source code behind all the little visual experiments on my website, [hazzahex.co.uk](https://hazzahex.co.uk).

Each is a self-contained, client-side React component (Next.js App Router `page.tsx`) that draws generative / interactive art to an HTML canvas.

Feel free to use as much or as little of it as you like. Credit to anyone who has inspired these experiments. 🤝

## Experiments

| Experiment | Folder |
|---|---|
| Fields | `fields/` |
| Smears | `smears/` |
| RESSENCE 1 | `ressence1/` |
| Flowers | `flowers/` |
| Dot Spiral | `dot-spiral/` |
| Spaghetti | `spaghetti/` |
| Geometric Towers | `pattern-towers/` |
| Dynamic Gradients | `dynamic-gradients/` |
| Cursor Arcs | `cursor-arcs/` |

`page.tsx` (repo root) is the index page that lists and links to each experiment on the site.

## Notes

- These are extracted from my main website repo, so they reference shared components (`@/components/Layout`, `Thought`, `Icon`, etc.) that aren't included here — the files are meant for reading and reuse rather than running the repo standalone.
- `sync.sh` is a helper I use to copy the latest experiments from the private website repo and open/merge a sync PR. It's specific to my setup.
