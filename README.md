# DUM — Biryani & Bar

A single-page restaurant site that follows the **same structure, motion language and colour
system** as [bar-topas.ch](https://bar-topas.ch/), rebuilt for a (fictional) Delhi biryani house
called **DUM**. Static HTML/CSS/JS — no framework, no build step needed to view it.

## Deliverable

- **`index.html`** — the whole site, ~593 KB. Fonts are embedded as base64 WOFF2, GSAP 3.12.5 +
  ScrollTrigger are vendored and inlined, all JS is inline.
- **`assets/img/`** — 18 photographs (keep this folder next to `index.html`). Paths are relative,
  so it runs from `file://`, offline, or inside a sandboxed iframe.

## Section map

| # | Section | What happens |
|---|---|---|
| — | Intro | Rouge/cream panels, DUM letters dropping, Hinglish loading lines, progress bar |
| — | Topbar | Fixed, live open/closed pill computed in Asia/Kolkata, inverts over pale sections |
| 01 | Hero | Giant Fraunces wordmark, pointer-tilted 3D print stack, orbiting stickers, price burst, live countdown |
| — | Marquees | Two rotated tickers, velocity-reactive |
| — | Definition | Perforated stamp card — *bir·ya·ni, /bɪrˈjɑː.ni/, noun* |
| 02 | Method (pinned) | Five scroll-scrubbed steps. Steps 1–3 are typed **kitchen index cards**, 4–5 are photographs; the whole deck fans in 3D, with two taped prints sitting in the dead space left and right |
| 03 | Plates (pinned) | Horizontal 3D gallery: seven photographed plates + one **"sold out" paper card** |
| 04 | The card | A **contact strip** of the day on the pass, then a real price list — four columns, dot leaders, tabular prices, house rules |
| 05 | Names | Two sticker marquees of biryani / kebab names |
| 06 | Dastarkhwan | Overhead dastarkhwan photo, a taped "pass karo" print beside the headline, chai polaroid, three-step "how it works" |
| 07 | Timings | Opening hours with the current day highlighted, rotating plate disc |
| 08 | Visit | Address, countdown, actions, amenity bubbles, hand-drawn Nizamuddin map with a rippling pin |
| — | Footer | "AA JAO" wordmark, links, small print |

## Photography

The set in `assets/img/` is one art-directed shoot: same light, same grade, same crop ratios
(4:5 for plates, 3:2 for scene shots, 3:4 and 1:1 for the props). Masters live in `assets/raw/` and
are cropped, resized and graded once by `src/img_prep.py` (the core set) and `src/img_prep2.py`
(the prints that fill the empty bands: seal, lid, saffron, pass, lane).

They are **placeholder imagery made for the mock**, not a real restaurant's food. Before this goes
anywhere near a real client, shoot the actual kitchen and drop the new files in with the same
names — nothing else needs to change. The footer line ("Shot in the DUM kitchen") is part of the
fiction; rewrite it at the same time.

## Design decisions that came from the ui-ux-pro-max skill

Queried with `search.py "biryani restaurant bar immersive editorial" --design-system --variance 8
--motion 9 --density 4` plus the `gsap` and `ux` domains. What was taken:

- **Specificity beats decoration.** The anti-pattern the skill flags for restaurants is
  "low-quality imagery + outdated hours". Both are answered head-on: one coherent photo set, and a
  live, timezone-correct open/closed state.
- **Numbers on the page.** Real prices, real plate counts, real kitchen times ("84 plates, gone by
  3:10 pm", "400 g onions, 40 minutes, one shade of brown"). This is the cheapest way to not look
  generated, and it doubles as the menu.
- **Motion is context-aware and never animates layout.** GSAP transforms only (`x/y/scale/rotate`),
  `scrub` for scrubbed scenes, `once: true` for reveals, 8–16px offsets for fades, stagger ≤ 8
  children, `prefers-reduced-motion` renders final state immediately.
- **Paper over panels.** Where a photo was missing, the answer was kitchen ephemera (typed index
  cards, stamps, checkboxes, a sold-out slip) rather than another stock image — cheaper, and far
  more human.
- **Checklist from the skill's pre-delivery pass:** SVG icons only (no emoji), `cursor: pointer` on
  everything clickable, 150–300ms hover transitions, 4.5:1 text contrast, visible focus rings,
  verified at 390 / 768 / 1440.

## Design system (inherited from the Topas token set)

```
--rouge      #B21236   --creme      #EFEFE3   --creme-fond #EDEAE0
--jaune      #FEB914   --orange     #FE8826   --orange-rouge #F03812
--bleu       #2C9FA2   --bordeaux   #7C1820   --brun       #601508
--teal-deep  #1E7073 (build section ground, AA-checked)
--jaune-lt   #FFD75E (small type on rouge, AA-checked)
--orange-deep #A8320B (small orange kickers on cream, AA-checked)
```

Type: **Archivo** (800, extended, caps display), **Fraunces** (italic/serif accents),
**Barlow Condensed** (numbers), **Kalam** (hand-written notes), **Noto Serif Devanagari** (दम).
4px spacing grid, radii 6 / 22 / 999, scalloped `.edge-wave` section joins.

## Editing

```bash
cd src
python3 img_prep.py     # crops/grades assets/raw -> assets/img (only after new photography)
python3 build.py        # regenerates ../index.html
```

- `src/index.html` — markup. `src/styles.css` — all styles (tokens at the top).
- `src/app.js` — intro, cursor, 3D hero, marquees, pinned method deck, pinned gallery, price-card
  reveals, countdown, topbar inversion.
- `src/vendor/` — GSAP + ScrollTrigger, inlined by `build.py` (no CDN, no network).
- `src/round5.py` / `round5.css` / `round5.js` — the "editorial detail" pass, already applied;
  kept as a record of what changed and why (they bail out if run twice).
- `src/round6.py` — the "photography in the empty bands" pass: taped prints in the method scene and
  the dastarkhwan headline, and a contact strip between the plates and the price card.
- `src/fonts.css` — base64 WOFF2 fonts. `src/build.py` — the bundler.

### QA harnesses

```bash
mkdir -p shots
python3 src/shots_many.py      # desktop, section by section
python3 src/shots_mobile.py    # 390x844 @2x
python3 src/shot_one.py out 4200 [w] [h]
python3 src/probe.py           # overflow at 390/768/1440 + reduced-motion pass
python3 src/shot_sec.py .s-build 420 out   # screenshot a named section at an offset
```

### Placeholders before going live

Address, phone, Instagram handle, email, timings and "since 2016" are fiction. They are plain text
in `src/index.html` (search for `Nizamuddin`, `011 4102`, `@dum.delhi`).

## Accessibility / performance notes

- Single `<h1>`, landmark sections, skip link, visible `:focus-visible` rings, `aria-live` status,
  decorative art marked `aria-hidden`, every photo has real alt text.
- `prefers-reduced-motion` renders the final state and stops the loops.
- Text contrast checked against WCAG AA; small-type accent tokens were darkened specifically.
- No external requests: no CDN, no trackers, no webfont calls.
- `ScrollTrigger.refresh()` is re-run when images decode and when webfonts settle, so pinned
  scenes never measure against half-loaded layout.
